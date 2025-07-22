import { Info, ExternalLink, Settings, Code, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const GoogleReviewsConfig = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">
          Configuración de Reseñas de <span className="text-luxury-gold">Google</span>
        </h1>
        <p className="text-elegant-gray">
          Guía paso a paso para conectar las reseñas reales de Google My Business
        </p>
      </div>

      {/* Current Status */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-800">
            <Info className="mr-2 h-5 w-5" />
            Estado Actual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-700">
                Actualmente mostrando reseñas de demostración
              </p>
              <p className="text-sm text-orange-600">
                Sigue los pasos abajo para conectar tus reseñas reales de Google
              </p>
            </div>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              Demo Mode
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Google My Business */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-luxury-gold" />
            Paso 1: Configurar Google My Business
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-luxury-gold rounded-full flex items-center justify-center text-primary text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-semibold">Crear o verificar tu perfil de Google My Business</p>
                <p className="text-sm text-elegant-gray">
                  Asegúrate de que tu spa esté registrado y verificado en Google My Business
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-luxury-gold rounded-full flex items-center justify-center text-primary text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-semibold">Obtener el Place ID</p>
                <p className="text-sm text-elegant-gray">
                  Busca tu negocio en Google Maps y obtén el Place ID
                </p>
              </div>
            </div>
          </div>

          <Button className="btn-elegant" asChild>
            <a href="https://business.google.com" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Ir a Google My Business
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Step 2: Google Places API */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5 text-luxury-gold" />
            Paso 2: Configurar Google Places API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Requisitos:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Cuenta de Google Cloud Platform</li>
              <li>• Google Places API habilitada</li>
              <li>• API Key con permisos de Places API</li>
              <li>• Facturación configurada (plan gratuito disponible)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-luxury-gold rounded-full flex items-center justify-center text-primary text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-semibold">Crear proyecto en Google Cloud Console</p>
                <p className="text-sm text-elegant-gray">
                  Ve a Google Cloud Console y crea un nuevo proyecto
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-luxury-gold rounded-full flex items-center justify-center text-primary text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-semibold">Habilitar Places API</p>
                <p className="text-sm text-elegant-gray">
                  En la biblioteca de APIs, busca y habilita "Places API"
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-luxury-gold rounded-full flex items-center justify-center text-primary text-sm font-bold">
                3
              </div>
              <div>
                <p className="font-semibold">Crear API Key</p>
                <p className="text-sm text-elegant-gray">
                  Genera una nueva API Key y restringe su uso a Places API
                </p>
              </div>
            </div>
          </div>

          <Button className="btn-elegant" asChild>
            <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Ir a Google Cloud Console
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Step 3: Implementation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="mr-2 h-5 w-5 text-luxury-gold" />
            Paso 3: Implementación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-elegant-gray">
            Una vez que tengas tu API Key y Place ID, podrás implementar la conexión real:
          </p>

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm font-mono text-gray-700 mb-2">
              Ejemplo de configuración:
            </p>
            <pre className="text-xs text-gray-600 overflow-x-auto">
{`// En tu archivo de configuración
const GOOGLE_PLACES_CONFIG = {
  apiKey: 'TU_API_KEY_AQUI',
  placeId: 'TU_PLACE_ID_AQUI'
};

// Función para obtener reseñas
const fetchGoogleReviews = async () => {
  const response = await fetch(
    \`https://maps.googleapis.com/maps/api/place/details/json?place_id=\${placeId}&fields=reviews,rating,user_ratings_total&key=\${apiKey}\`
  );
  return response.json();
};`}
            </pre>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Importante:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Nunca expongas tu API Key en el frontend</li>
              <li>• Usa variables de entorno para credenciales</li>
              <li>• Implementa cache para evitar llamadas excesivas</li>
              <li>• Considera usar un backend/proxy para mayor seguridad</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">
            Beneficios de Conectar Reseñas Reales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="font-semibold text-green-800">✅ Credibilidad Aumentada</p>
              <p className="text-sm text-green-700">
                Las reseñas reales de Google generan más confianza
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="font-semibold text-green-800">✅ SEO Mejorado</p>
              <p className="text-sm text-green-700">
                Google favorece sitios con reseñas auténticas
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="font-semibold text-green-800">✅ Actualización Automática</p>
              <p className="text-sm text-green-700">
                Las nuevas reseñas aparecen automáticamente
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="font-semibold text-green-800">✅ Mayor Conversión</p>
              <p className="text-sm text-green-700">
                Más clientes confían y reservan servicios
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="text-center">
        <p className="text-elegant-gray mb-4">
          ¿Necesitas ayuda con la implementación? 
        </p>
        <Button className="btn-luxury">
          Contactar Soporte Técnico
        </Button>
      </div>
    </div>
  );
};

export default GoogleReviewsConfig;