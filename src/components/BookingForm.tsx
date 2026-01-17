import { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

interface Service {
  id: string;
  nameKey: string;
  price: string;
  duration: string;
  requiresDeposit: boolean;
  depositAmount?: string;
}

const services: Service[] = [
  { id: 'microblading', nameKey: 'services.microblading', price: 'Consultar', duration: '2-3h', requiresDeposit: true, depositAmount: '$100' },
  { id: 'lip-tattoo', nameKey: 'services.lipTint', price: 'Consultar', duration: '2h', requiresDeposit: true, depositAmount: '$100' },
  { id: 'facials', nameKey: 'services.facials', price: 'Consultar', duration: '60-90min', requiresDeposit: true, depositAmount: '$25' },
  { id: 'teeth-whitening', nameKey: 'services.teethWhitening', price: 'Consultar', duration: '60min', requiresDeposit: true, depositAmount: '$50' },
  { id: 'laser-hair-removal', nameKey: 'services.laserHairRemoval', price: 'Consultar', duration: '30-60min', requiresDeposit: true, depositAmount: '$50' },
  { id: 'eyebrow-design', nameKey: 'services.eyebrowDesign', price: 'Consultar', duration: '30min', requiresDeposit: true, depositAmount: '$15' },
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'
];

const BookingForm = () => {
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
  const { t, i18n } = useTranslation();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedServiceData = services.find(service => service.id === selectedService);
  const totalPrice = selectedServiceData?.price || '';
  const requiresDeposit = selectedServiceData?.requiresDeposit || false;
  const depositAmount = selectedServiceData?.depositAmount || '';
  
  const dateLocale = i18n.language === 'es' ? es : enUS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !selectedService) {
      alert(t('booking.fillAllFields'));
      return;
    }

    const bookingData = {
      ...formData,
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      requiresDeposit,
      depositAmount
    };

    console.log('Booking data:', bookingData);
    alert(t('booking.bookingSuccess'));
  };

  return (
    <section id="reservar" className="py-20 bg-elegant-gray-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
            {t('booking.title')} <span className="text-luxury-gold">{t('booking.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-elegant-gray max-w-3xl mx-auto">
            {t('booking.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-primary to-elegant-gray text-pure-white">
              <CardTitle className="text-2xl font-bold flex items-center">
                <Calendar className="mr-3 h-6 w-6" />
                {t('booking.bookingInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selection */}
                <div>
                  <Label className="text-base font-semibold text-primary mb-2 block">
                    {t('booking.selectService')} *
                  </Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={t('booking.chooseService')} />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          <div className="flex justify-between items-center w-full">
                            <span>{t(service.nameKey)}</span>
                            <span className="text-luxury-gold font-semibold ml-4">
                              {t('booking.requiresDeposit')}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedServiceData && (
                    <div className="mt-2 p-3 bg-luxury-gold/10 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-elegant-gray">
                          {t('booking.duration')}: {selectedServiceData.duration}
                        </span>
                        <Badge className="bg-luxury-gold text-primary">
                          {t('booking.deposit')}: {depositAmount}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>

                {/* Date Selection */}
                <div>
                  <Label className="text-base font-semibold text-primary mb-2 block">
                    {t('booking.selectDate')} *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                          format(selectedDate, "PPP", { locale: dateLocale })
                        ) : (
                          <span>{t('booking.selectDatePlaceholder')}</span>
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
                  <Label className="text-base font-semibold text-primary mb-2 block">
                    {t('booking.selectTime')} *
                  </Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="h-12">
                      <Clock className="mr-2 h-4 w-4" />
                      <SelectValue placeholder={t('booking.selectTimePlaceholder')} />
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-base font-semibold text-primary">
                      {t('booking.firstName')} *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="h-12 mt-1"
                      placeholder={t('booking.firstNamePlaceholder')}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-base font-semibold text-primary">
                      {t('booking.lastName')} *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="h-12 mt-1"
                      placeholder={t('booking.lastNamePlaceholder')}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-semibold text-primary">
                    {t('booking.email')} *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-12 mt-1"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base font-semibold text-primary">
                    {t('booking.phone')} *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="h-12 mt-1"
                    placeholder="(813) 555-0123"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-base font-semibold text-primary">
                    {t('booking.additionalNotes')}
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="mt-1"
                    placeholder={t('booking.notesPlaceholder')}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full btn-luxury text-lg py-4">
                  {t('booking.confirmBooking')}
                  <Calendar className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Booking Summary & Info */}
          <div className="space-y-8">
            {/* Booking Summary */}
            <Card className="shadow-xl">
              <CardHeader className="bg-luxury-gold text-primary">
                <CardTitle className="text-xl font-bold">
                  {t('booking.bookingSummary')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {selectedServiceData ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{t('booking.service')}:</span>
                      <span className="text-luxury-gold font-bold">
                        {t(selectedServiceData.nameKey)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{t('booking.duration')}:</span>
                      <span>{selectedServiceData.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{t('booking.price')}:</span>
                      <span className="text-luxury-gold font-bold text-lg">
                        {t('booking.priceConsult')}
                      </span>
                    </div>
                    {selectedDate && (
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{t('booking.date')}:</span>
                        <span>{format(selectedDate, "PPP", { locale: dateLocale })}</span>
                      </div>
                    )}
                    {selectedTime && (
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{t('booking.time')}:</span>
                        <span>{selectedTime}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="bg-luxury-gold/10 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CreditCard className="h-5 w-5 text-luxury-gold" />
                        <span className="font-semibold text-primary">
                          {t('booking.depositRequired')}
                        </span>
                      </div>
                      <p className="text-sm text-elegant-gray mb-2">
                        {t('booking.depositNote', { amount: depositAmount })}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{t('booking.deposit')}:</span>
                        <span className="text-luxury-gold font-bold">
                          {depositAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-elegant-gray text-center py-8">
                    {t('booking.selectServiceForSummary')}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">
                  {t('booking.contactInfo')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-luxury-gold" />
                    <div>
                      <p className="font-semibold">{t('footer.phone')}</p>
                      <p className="text-elegant-gray">813-539-7294 (English) / 813-436-1395</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-luxury-gold" />
                    <div>
                      <p className="font-semibold">{t('footer.email')}</p>
                      <p className="text-elegant-gray">yvaldes450@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-luxury-gold" />
                    <div>
                      <p className="font-semibold">{t('booking.hours')}</p>
                      <p className="text-elegant-gray">{t('booking.hoursValue')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="shadow-xl border-luxury-gold/30">
              <CardContent className="p-6">
                <h4 className="font-bold text-primary mb-4 flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-luxury-gold" />
                  {t('booking.importantNotes')}
                </h4>
                <ul className="space-y-2 text-sm text-elegant-gray">
                  <li>• {t('booking.note1')}</li>
                  <li>• {t('booking.note2')}</li>
                  <li>• {t('booking.note3')}</li>
                  <li>• {t('booking.note4')}</li>
                  <li>• {t('booking.note5')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
