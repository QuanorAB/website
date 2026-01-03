"use client";

/**
 * Contact Section Component
 * 
 * Displays a contact form with Supabase integration for email submission.
 * Also shows contact info cards (email, location, LinkedIn).
 * Uses inline translations for Swedish/English bilingual content.
 * 
 * @param {Object} props
 * @param {string} props.lang - Language code ('sv' or 'en')
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact({ lang }: { lang: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    sv: {
      title: "Redo att förändra sättet du investerar?",
      subtitle: "Kontakta vårt team för att lära dig hur Quanor Analys kan förbättra din investeringsprocess.",
      getInTouch: {
        title: "Kom i kontakt",
        description: "Har du frågor om vår AI-drivna finansiella analysplattform? Vi är här för att hjälpa dig förstå hur Quanor kan effektivisera din investeringsprocess."
      },
      form: {
        name: "Namn",
        email: "E-post",
        subject: "Ämne",
        subjectOptions: ["Allmän förfrågan", "Produktdemo", "Teknisk support", "Prissättning", "Övrigt"],
        message: "Meddelande",
        submit: "Skicka meddelande",
        sending: "Skickar..."
      },
      contactInfo: {
        email: "E-post",
        location: "Plats",
        locationDesc: "Stockholm, Sverige"
      },
      success: "Tack för ditt meddelande! Vi återkommer snart.",
      error: "Något gick fel. Försök igen senare."
    },
    en: {
      title: "Ready to change how you invest?",
      subtitle: "Contact our team to learn how Quanor Analysis can improve your investment process.",
      getInTouch: {
        title: "Get in touch",
        description: "Have questions about our AI-driven financial analysis platform? We're here to help you understand how Quanor can streamline your investment process."
      },
      form: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        subjectOptions: ["General inquiry", "Product demo", "Technical support", "Pricing", "Other"],
        message: "Message",
        submit: "Send message",
        sending: "Sending..."
      },
      contactInfo: {
        email: "Email",
        location: "Location",
        locationDesc: "Stockholm, Sweden"
      },
      success: "Thank you for your message! We'll get back to you soon.",
      error: "Something went wrong. Please try again later."
    }
  };

  const t = lang === "sv" ? content.sv : content.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSupabaseConfigured() && supabase) {
        await supabase.functions.invoke('send-contact-email', {
          body: {
            name: formData.name,
            email: formData.email,
            company: formData.subject, // Map subject to company field for compatibility
            message: formData.message,
          }
        });
      }

      toast.success(t.success);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>{t.getInTouch.title}</CardTitle>
                <CardDescription>{t.getInTouch.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.form.name}</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.form.email}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t.form.subject}</Label>
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">---</option>
                      {t.form.subjectOptions.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t.form.message}</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t.form.sending : t.form.submit}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">{t.contactInfo.email}</h3>
                    <a href="mailto:hello@quanor.com" className="text-muted-foreground hover:text-primary transition-colors">
                      hello@quanor.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">{t.contactInfo.location}</h3>
                    <p className="text-muted-foreground">{t.contactInfo.locationDesc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Linkedin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">LinkedIn</h3>
                    <a
                      href="https://www.linkedin.com/company/quanor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      linkedin.com/company/quanor
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
