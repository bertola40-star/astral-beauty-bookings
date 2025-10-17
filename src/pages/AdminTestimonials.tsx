import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Star, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { z } from 'zod';

const testimonialSchema = z.object({
  author_name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres').max(100, 'El nombre no puede exceder 100 caracteres'),
  rating: z.number().min(1).max(5),
  review_text: z.string().trim().min(10, 'La reseña debe tener al menos 10 caracteres').max(1000, 'La reseña no puede exceder 1000 caracteres'),
  service_type: z.string().optional(),
  is_featured: z.boolean(),
  is_published: z.boolean(),
});

interface Testimonial {
  id: string;
  author_name: string;
  rating: number;
  review_text: string;
  service_type: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    author_name: '',
    rating: 5,
    review_text: '',
    service_type: '',
    is_featured: false,
    is_published: true,
  });

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: roleData, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error || !roleData) {
        toast({
          title: 'Acceso denegado',
          description: 'No tienes permisos de administrador',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
      fetchTestimonials();
    } catch (error) {
      navigate('/auth');
    }
  };

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los testimonios',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = testimonialSchema.parse(formData);

      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(validatedData)
          .eq('id', editingTestimonial.id);

        if (error) throw error;

        toast({
          title: 'Éxito',
          description: 'Testimonio actualizado correctamente',
        });
      } else {
        const insertData = {
          author_name: validatedData.author_name,
          rating: validatedData.rating,
          review_text: validatedData.review_text,
          service_type: validatedData.service_type || null,
          is_featured: validatedData.is_featured,
          is_published: validatedData.is_published,
        };

        const { error } = await supabase
          .from('testimonials')
          .insert([insertData]);

        if (error) throw error;

        toast({
          title: 'Éxito',
          description: 'Testimonio creado correctamente',
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchTestimonials();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Error de validación',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'No se pudo guardar el testimonio',
          variant: 'destructive',
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este testimonio?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Éxito',
        description: 'Testimonio eliminado correctamente',
      });
      fetchTestimonials();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el testimonio',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      author_name: testimonial.author_name,
      rating: testimonial.rating,
      review_text: testimonial.review_text,
      service_type: testimonial.service_type || '',
      is_featured: testimonial.is_featured,
      is_published: testimonial.is_published,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      author_name: '',
      rating: 5,
      review_text: '',
      service_type: '',
      is_featured: false,
      is_published: true,
    });
    setEditingTestimonial(null);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-luxury-gold fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">
              Gestión de <span className="text-luxury-gold">Testimonios</span>
            </h1>
            <p className="text-elegant-gray">Administra las reseñas de tus clientes</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="btn-luxury">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Testimonio
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingTestimonial ? 'Editar Testimonio' : 'Nuevo Testimonio'}
                </DialogTitle>
                <DialogDescription>
                  {editingTestimonial ? 'Actualiza la información del testimonio' : 'Agrega un nuevo testimonio de cliente'}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="author_name">Nombre del Cliente *</Label>
                  <Input
                    id="author_name"
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    placeholder="María González"
                    required
                    maxLength={100}
                  />
                </div>

                <div>
                  <Label htmlFor="rating">Calificación *</Label>
                  <Select
                    value={formData.rating.toString()}
                    onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 4, 3, 2, 1].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          <div className="flex items-center gap-2">
                            {num} {renderStars(num)}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="service_type">Servicio (opcional)</Label>
                  <Select
                    value={formData.service_type}
                    onValueChange={(value) => setFormData({ ...formData, service_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Sin especificar</SelectItem>
                      <SelectItem value="Microblading">Microblading</SelectItem>
                      <SelectItem value="Tatuaje de Labios">Tatuaje de Labios</SelectItem>
                      <SelectItem value="Faciales">Faciales</SelectItem>
                      <SelectItem value="Blanqueamiento Dental">Blanqueamiento Dental</SelectItem>
                      <SelectItem value="Depilación Láser">Depilación Láser</SelectItem>
                      <SelectItem value="Diseño de Cejas">Diseño de Cejas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="review_text">Reseña *</Label>
                  <Textarea
                    id="review_text"
                    value={formData.review_text}
                    onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
                    placeholder="Escribe la reseña del cliente..."
                    rows={4}
                    required
                    maxLength={1000}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.review_text.length}/1000 caracteres
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                  <Label htmlFor="is_published">Publicado (visible en el sitio)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label htmlFor="is_featured">Destacado</Label>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="btn-luxury">
                    {editingTestimonial ? 'Actualizar' : 'Crear'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-elegant-gray">Cargando testimonios...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{testimonial.author_name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">{renderStars(testimonial.rating)}</div>
                        <span className="text-sm text-muted-foreground">{testimonial.rating}/5</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {testimonial.is_published ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {testimonial.service_type && (
                    <Badge className="mb-2">{testimonial.service_type}</Badge>
                  )}
                  {testimonial.is_featured && (
                    <Badge variant="secondary" className="mb-2 ml-2">Destacado</Badge>
                  )}
                  <p className="text-sm text-elegant-gray mb-4 line-clamp-3">
                    {testimonial.review_text}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(testimonial)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(testimonial.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && testimonials.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-elegant-gray mb-4">
                No hay testimonios todavía. Crea el primero.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminTestimonials;