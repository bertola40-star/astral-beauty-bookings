import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, MousePointer, Users, TrendingUp, Flame } from "lucide-react";
import ClickHeatmap from "@/components/ClickHeatmap";

interface ClickStats {
  element_text: string | null;
  element_id: string | null;
  element_tag: string | null;
  count: number;
}

interface ClickPosition {
  x_position: number;
  y_position: number;
}

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalViews, setTotalViews] = useState(0);
  const [uniqueSessions, setUniqueSessions] = useState(0);
  const [todayViews, setTodayViews] = useState(0);
  const [clickStats, setClickStats] = useState<ClickStats[]>([]);
  const [recentViews, setRecentViews] = useState<any[]>([]);
  const [clickPositions, setClickPositions] = useState<ClickPosition[]>([]);

  useEffect(() => {
    checkAdminAndLoadData();
  }, []);

  const checkAdminAndLoadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      navigate("/");
      return;
    }

    setIsAdmin(true);
    await loadAnalytics();
    setLoading(false);
  };

  const loadAnalytics = async () => {
    // Total page views
    const { count: totalCount } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true });
    setTotalViews(totalCount || 0);

    // Unique sessions
    const { data: sessionsData } = await supabase
      .from("page_views")
      .select("session_id");
    const uniqueSessionsSet = new Set(sessionsData?.map(s => s.session_id));
    setUniqueSessions(uniqueSessionsSet.size);

    // Today's views
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count: todayCount } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", today.toISOString());
    setTodayViews(todayCount || 0);

    // Recent views
    const { data: recent } = await supabase
      .from("page_views")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    setRecentViews(recent || []);

    // Click statistics - get raw data and aggregate in JS
    const { data: clickData } = await supabase
      .from("click_events")
      .select("element_text, element_id, element_tag, x_position, y_position")
      .not("element_text", "is", null);

    if (clickData) {
      const clickMap = new Map<string, ClickStats>();
      const positions: ClickPosition[] = [];

      clickData.forEach((click) => {
        const key = `${click.element_text}-${click.element_id}-${click.element_tag}`;
        if (clickMap.has(key)) {
          clickMap.get(key)!.count++;
        } else {
          clickMap.set(key, {
            element_text: click.element_text,
            element_id: click.element_id,
            element_tag: click.element_tag,
            count: 1,
          });
        }

        if (click.x_position && click.y_position) {
          positions.push({
            x_position: click.x_position,
            y_position: click.y_position,
          });
        }
      });

      const sortedClicks = Array.from(clickMap.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
      setClickStats(sortedClicks);
      setClickPositions(positions);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-soft-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-3xl font-bold text-primary">Analytics</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Visitas</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalViews}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueSessions}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Visitas Hoy</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayViews}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Clics Rastreados</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {clickStats.reduce((acc, stat) => acc + stat.count, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Heatmap Section */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                Mapa de Calor de Clics
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ClickHeatmap clicks={clickPositions} width={400} height={600} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Most Clicked Elements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="h-5 w-5" />
                Elementos Más Clickeados
              </CardTitle>
            </CardHeader>
            <CardContent>
              {clickStats.length === 0 ? (
                <p className="text-muted-foreground">No hay datos de clics aún</p>
              ) : (
                <div className="space-y-4">
                  {clickStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {stat.element_text?.slice(0, 40) || stat.element_id || "Sin texto"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {stat.element_tag} {stat.element_id && `#${stat.element_id}`}
                        </p>
                      </div>
                      <div className="ml-4 flex items-center gap-2">
                        <span className="text-lg font-bold">{stat.count}</span>
                        <span className="text-sm text-muted-foreground">clics</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Visits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Visitas Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentViews.length === 0 ? (
                <p className="text-muted-foreground">No hay visitas aún</p>
              ) : (
                <div className="space-y-3">
                  {recentViews.map((view) => (
                    <div key={view.id} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{view.page_path}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(view.created_at).toLocaleString("es-ES")}
                          </p>
                        </div>
                      </div>
                      {view.referrer && (
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          Desde: {view.referrer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
