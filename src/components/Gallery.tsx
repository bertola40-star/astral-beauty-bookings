import { useState } from 'react';
import { Upload, X, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface GalleryImage {
  id: string;
  url: string;
  name: string;
  category: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: '1',
      url: '/src/assets/microblading.jpg',
      name: 'Microblading Natural',
      category: 'Microblading'
    },
    {
      id: '2', 
      url: '/src/assets/lip-tattoo.jpg',
      name: 'Tatuaje de Labios',
      category: 'Tatuaje de Labios'
    },
    {
      id: '3',
      url: '/src/assets/eyebrow-design.jpg', 
      name: 'Diseño de Cejas',
      category: 'Diseño de Cejas'
    }
  ]);
  
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories = ['Todos', 'Microblading', 'Tatuaje de Labios', 'Diseño de Cejas', 'Faciales', 'Blanqueamiento Dental'];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage: GalleryImage = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            url: e.target?.result as string,
            name: file.name.split('.')[0],
            category: 'Microblading' // Default category, could be made selectable
          };
          setImages(prev => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const deleteImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const filteredImages = selectedCategory === 'Todos' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Galería de <span className="text-luxury-gold">Trabajos</span>
          </h1>
          <p className="text-xl text-elegant-gray max-w-3xl mx-auto">
            Explora nuestros trabajos realizados y sube nuevas imágenes para mostrar tu arte
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <div className="bg-pure-white rounded-lg shadow-elegant p-6 border border-elegant-gray/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-primary">Subir Nuevas Imágenes</h2>
            </div>
            <div className="border-2 border-dashed border-luxury-gold/30 rounded-lg p-8 text-center hover:border-luxury-gold/50 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-luxury-gold mx-auto mb-4" />
                <p className="text-lg font-medium text-primary mb-2">
                  Haz clic para subir imágenes
                </p>
                <p className="text-elegant-gray">
                  Arrastra y suelta archivos aquí, o haz clic para seleccionar
                </p>
              </label>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="bg-pure-white rounded-lg shadow-elegant overflow-hidden hover:shadow-elegant-hover transition-all duration-300 group"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setSelectedImage(image)}
                          className="bg-pure-white/90 hover:bg-pure-white"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl w-full">
                        <div className="p-4">
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                          />
                          <div className="mt-4">
                            <h3 className="text-xl font-bold text-primary">{image.name}</h3>
                            <p className="text-elegant-gray">{image.category}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteImage(image.id)}
                      className="bg-red-500/90 hover:bg-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-primary mb-1">{image.name}</h3>
                <p className="text-sm text-elegant-gray">{image.category}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-elegant-gray">
              No hay imágenes en esta categoría. ¡Sube algunas para empezar!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;