import { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Service {
  id: string;
  name: string;
  price: string;
  duration: string;
  requiresDeposit: boolean;
  depositAmount?: string;
}

const services: Service[] = [
  { id: 'microblading', name: 'Microblading', price: 'Consultar', duration: '2-3h', requiresDeposit: true, depositAmount: '$100' },
  { id: 'lip-tint', name: 'LipTint', price: 'Consultar', duration: '2h', requiresDeposit: true, depositAmount: '$100' },
  { id: 'facials', name: 'Faciales', price: 'Consultar', duration: '60-90min', requiresDeposit: true, depositAmount: '$25' },
  { id: 'teeth-whitening', name: 'Blanqueamiento Dental', price: 'Consultar', duration: '60min', requiresDeposit: true, depositAmount: '$50' },
  { id: 'laser-hair-removal', name: 'Depilación Láser', price: 'Consultar', duration: '30-60min', requiresDeposit: true, depositAmount: '$50' },
  { id: 'eyebrow-design', name: 'Diseño de Cejas', price: 'Consultar', duration: '30min', requiresDeposit: true, depositAmount: '$15' },
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'
];

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BookingDialog = ({ open, onOpenChange }: BookingDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedServiceData = services.find(service => service.id === selectedService);
  const depositAmount = selectedServiceData?.depositAmount || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !selectedService) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const bookingData = {
      ...formData,
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      depositAmount
    };

    console.log('Booking data:', bookingData);
    alert('¡Reserva enviada exitosamente! Te contactaremos pronto para confirmar tu cita.');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-primary">
            Reserva Tu <span className="text-luxury-gold">Cita</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          {/* Booking Form */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary to-elegant-gray text-pure-white">
              <CardTitle className="text-xl font-bold flex items-center">
                <Calendar className="mr-3 h-5 w-5" />
                Información de la Reserva
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Service Selection */}
                <div>
                  <Label className="text-sm font-semibold text-primary mb-2 block">
                    Selecciona tu Servicio *
                  </Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Elige un servicio..." />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          <div className="flex justify-between items-center w-full">
                            <span>{service.name}</span>
                            <span className="text-luxury-gold font-semibold ml-4 text-xs">
                              Requiere seña
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedServiceData && (
                    <div className="mt-2 p-2 bg-luxury-gold/10 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-elegant-gray">
                          Duración: {selectedServiceData.duration}
                        </span>
                        <Badge className="bg-luxury-gold text-primary text-xs">
                          Seña: {depositAmount}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>

                {/* Date Selection */}
                <div>
                  <Label className="text-sm font-semibold text-primary mb-2 block">
                    Selecciona la Fecha *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-10 justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                          format(selectedDate, "PPP", { locale: es })
                        ) : (
                          <span>Selecciona una fecha...</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) =>
                          date < new Date() || date.getDay() === 0
                        }
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Selection */}
                <div>
                  <Label className="text-sm font-semibold text-primary mb-2 block">
                    Selecciona la Hora *
                  </Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="h-10">
                      <Clock className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Elige una hora..." />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-semibold text-primary">
                      Nombre *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="h-10 mt-1"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-semibold text-primary">
                      Apellido *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="h-10 mt-1"
                      placeholder="Tu apellido"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-primary">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-10 mt-1"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold text-primary">
                    Teléfono *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="h-10 mt-1"
                    placeholder="(813) 555-0123"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-sm font-semibold text-primary">
                    Notas Adicionales
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="mt-1"
                    placeholder="Información adicional, alergias, preferencias..."
                    rows={2}
                  />
                </div>

                <Button type="submit" className="w-full btn-luxury">
                  Confirmar Reserva
                  <Calendar className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Booking Summary & Info */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card className="shadow-lg">
              <CardHeader className="bg-luxury-gold text-primary">
                <CardTitle className="text-lg font-bold">
                  Resumen de tu Reserva
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {selectedServiceData ? (
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Servicio:</span>
                      <span className="text-luxury-gold font-bold">
                        {selectedServiceData.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Duración:</span>
                      <span>{selectedServiceData.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Precio:</span>
                      <span className="text-luxury-gold font-bold">
                        A consultar
                      </span>
                    </div>
                    {selectedDate && (
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Fecha:</span>
                        <span>{format(selectedDate, "PPP", { locale: es })}</span>
                      </div>
                    )}
                    {selectedTime && (
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Hora:</span>
                        <span>{selectedTime}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="bg-luxury-gold/10 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <CreditCard className="h-4 w-4 text-luxury-gold" />
                        <span className="font-semibold text-primary text-xs">
                          Seña Requerida
                        </span>
                      </div>
                      <p className="text-xs text-elegant-gray mb-2">
                        Requiere seña de {depositAmount} para confirmar la cita.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Seña:</span>
                        <span className="text-luxury-gold font-bold">
                          {depositAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-elegant-gray text-center py-6 text-sm">
                    Selecciona un servicio para ver el resumen
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-primary">
                  Información de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-luxury-gold" />
                    <div>
                      <p className="font-semibold">Teléfono</p>
                      <p className="text-elegant-gray text-xs">813-539-7294 / 813-436-1395</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-luxury-gold" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-elegant-gray text-xs">info@astralbeautyspa.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-luxury-gold" />
                    <div>
                      <p className="font-semibold">Horarios</p>
                      <p className="text-elegant-gray text-xs">Lun-Vie: 9AM-5PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="shadow-lg border-luxury-gold/30">
              <CardContent className="p-4">
                <h4 className="font-bold text-primary mb-3 flex items-center text-sm">
                  <MessageSquare className="mr-2 h-4 w-4 text-luxury-gold" />
                  Notas Importantes
                </h4>
                <ul className="space-y-1 text-xs text-elegant-gray">
                  <li>• Las citas se confirman en orden de llegada</li>
                  <li>• Cancellaciones deben hacerse 24h antes</li>
                  <li>• Llegada 15 minutos antes de la cita</li>
                  <li>• Consulta gratuita incluida en todos los servicios</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
