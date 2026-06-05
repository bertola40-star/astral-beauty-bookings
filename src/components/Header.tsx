import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock, LogOut, User as UserIcon, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { BookingDialog } from '@/components/BookingDialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Session } from '@supabase/supabase-js';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();
    
    setIsAdmin(!!data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: t('header.logoutSuccess'),
      description: t('header.logoutMessage'),
    });
    navigate('/');
  };

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.services'), href: '#servicios' },
    { name: t('nav.gallery'), href: '/galeria' },
    { name: t('nav.shop'), href: '/tienda' },
    { name: t('nav.booking'), href: '#reservar' },
    { name: t('nav.contact'), href: '#contacto' },
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
              <div className="hidden md:flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>7730 Palm River Rd office 100, Tampa, FL 33619</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{t('header.hours')}</span>
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
            <LanguageSwitcher />
            <Button 
              className="btn-luxury"
              onClick={() => setIsBookingOpen(true)}
            >
              {t('header.bookNow')}
            </Button>
            
            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/admin/testimonios')}
                    >
                      {t('header.testimonials')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/admin/analytics')}
                    >
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Analytics
                    </Button>
                  </div>
                )}
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
                  {t('header.logout')}
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate('/auth')}
              >
                {t('header.login')}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-elegant-gray hover:text-luxury-gold"
              aria-label={isMenuOpen ? t('header.closeMenu', { defaultValue: 'Close menu' }) : t('header.openMenu', { defaultValue: 'Open menu' })}
              aria-expanded={isMenuOpen}
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
              {t('header.bookNow')}
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
                  {t('header.logout')}
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
                {t('header.login')}
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
