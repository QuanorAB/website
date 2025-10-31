import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/client";
import { ArrowRight, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  // Memoized contact info and social links for performance
  const contactInfo = useMemo(() => [
    {
      id: 'email',
      icon: Mail,
      title: t('contact.info.email.title'),
      description: "hello@quanor.com",
      link: "mailto:hello@quanor.com"
    },
    {
      id: 'location', 
      icon: MapPin,
      title: t('contact.info.location.title'),
      description: t('contact.info.location.description'),
      link: null
    }
  ], [t]);

  const socialLinks = useMemo(() => [
    {
      id: 'linkedin',
      icon: Linkedin,
      href: "https://www.linkedin.com/company/quanor",
      label: "LinkedIn"
    },
    {
      id: 'instagram',
      icon: Instagram, 
      href: "https://www.instagram.com/quanorfinance/",
      label: "Instagram"
    },
    {
      id: 'twitter',
      icon: FaXTwitter,
      href: "https://x.com/QuanorFinance", 
      label: "X"
    }
  ], []);

  const validateForm = useCallback(() => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = t('contact.form.validation.required.description');
    }
    
    if (!formData.email.trim()) {
      errors.email = t('contact.form.validation.required.description');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = t('contact.form.validation.email.description');
      }
    }
    
    if (!formData.message.trim()) {
      errors.message = t('contact.form.validation.required.description');
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, t]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: t('contact.form.validation.required.title'),
        description: t('contact.form.validation.required.description'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured() || !supabase) {
        // Fallback: Just show success message in development
        // In production, this should be configured
        console.warn('Supabase not configured. Skipping form submission.');
        toast({
          title: t('contact.success'),
          description: t('contact.successDescription'),
        });
        setFormData({ name: "", email: "", company: "", message: "" });
        setValidationErrors({});
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        throw new Error(error.message || 'Failed to send message');
      }

      toast({
        title: t('contact.success'),
        description: t('contact.successDescription'),
      });
      setFormData({ name: "", email: "", company: "", message: "" });
      setValidationErrors({});

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: t('contact.form.validation.error.title'),
        description: t('contact.form.validation.error.description'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData, t, toast, validateForm]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [validationErrors]);

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-surface/30 mobile-optimized">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="glass-card order-2 lg:order-1">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">{t('contact.form.title')}</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {t('contact.form.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      {t('contact.form.name')} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.form.namePlaceholder')}
                      required
                      maxLength={100}
                      autoComplete="name"
                      aria-describedby={validationErrors.name ? "name-error" : undefined}
                      aria-invalid={!!validationErrors.name}
                      className={`bg-surface-elevated border-border/50 transition-colors ${
                        validationErrors.name ? 'border-destructive focus:border-destructive' : ''
                      }`}
                    />
                    {validationErrors.name && (
                      <p id="name-error" className="text-sm text-destructive" role="alert">
                        {validationErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      {t('contact.form.email')} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.form.emailPlaceholder')}
                      required
                      maxLength={254}
                      autoComplete="email"
                      aria-describedby={validationErrors.email ? "email-error" : undefined}
                      aria-invalid={!!validationErrors.email}
                      className={`bg-surface-elevated border-border/50 transition-colors ${
                        validationErrors.email ? 'border-destructive focus:border-destructive' : ''
                      }`}
                    />
                    {validationErrors.email && (
                      <p id="email-error" className="text-sm text-destructive" role="alert">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">
                    {t('contact.form.company')}
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t('contact.form.companyPlaceholder')}
                    maxLength={200}
                    autoComplete="organization"
                    className="bg-surface-elevated border-border/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    {t('contact.form.message')} <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.messagePlaceholder')}
                    required
                    maxLength={5000}
                    rows={4}
                    aria-describedby={validationErrors.message ? "message-error" : undefined}
                    aria-invalid={!!validationErrors.message}
                    className={`bg-surface-elevated border-border/50 resize-none transition-colors ${
                      validationErrors.message ? 'border-destructive focus:border-destructive' : ''
                    }`}
                  />
                  {validationErrors.message && (
                    <p id="message-error" className="text-sm text-destructive" role="alert">
                      {validationErrors.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formData.message.length}/5000
                  </p>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  aria-describedby="submit-status"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary group disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  {isLoading ? t('contact.form.sending') : t('contact.form.send')}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6 lg:space-y-8 order-1 lg:order-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 lg:mb-4">{t('contact.getInTouch.title')}</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                {t('contact.getInTouch.description')}
              </p>
            </div>

            <div className="space-y-3 lg:space-y-4">
              {contactInfo.map((info) => (
                <div key={info.id} className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl bg-surface-elevated/50 hover:bg-surface-elevated transition-colors">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <info.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base">{info.title}</div>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                      >
                        {info.description}
                      </a>
                    ) : (
                      <div className="text-muted-foreground text-xs sm:text-sm">{info.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="flex gap-3 lg:gap-4 pt-2">
              {socialLinks.map((social) => (
                <a 
                  key={social.id}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`${social.label} - Opens in new tab`}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <social.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
