import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock, LogOut, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookingDialog } from '@/components/BookingDialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Session } from '@supabase/supabase-js';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    });
    navigate('/');
  };

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Galería', href: '/galeria' },
    { name: 'Tienda', href: '/tienda' },
    { name: 'Reservar Cita', href: '#reservar' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className="bg-pure-white shadow-lg relative z-50">
      {/* Top Bar */}
      <div className="bg-primary text-pure-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>813-539-7294 (English) / 813-436-1395</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>7730 Palm River Rd office 100, Tampa, FL 33619</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Lun-Vie: 9AM-5PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-3xl font-bold">
              <span className="text-primary">Astral</span>
              <span className="text-luxury-gold mx-2">Beauty</span>
              <span className="text-elegant-gray">Spa</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-elegant-gray hover:text-luxury-gold transition-colors duration-300 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button & Auth */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              className="btn-luxury"
              onClick={() => setIsBookingOpen(true)}
            >
              Reservar Ahora
            </Button>
            
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <UserIcon className="h-4 w-4" />
                  {user.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Salir
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate('/auth')}
              >
                Iniciar Sesión
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-elegant-gray hover:text-luxury-gold"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-pure-white shadow-lg border-t">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-elegant-gray hover:text-luxury-gold transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Button 
              className="btn-luxury w-full mt-4"
              onClick={() => {
                setIsMenuOpen(false);
                setIsBookingOpen(true);
              }}
            >
              Reservar Ahora
            </Button>
            
            {user ? (
              <div className="space-y-2 pt-4 border-t">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <UserIcon className="h-4 w-4" />
                  {user.email}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Salir
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/auth');
                }}
              >
                Iniciar Sesión
              </Button>
            )}
          </div>
        </div>
      )}
      
      <BookingDialog open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </header>
  );
};

export default Header;