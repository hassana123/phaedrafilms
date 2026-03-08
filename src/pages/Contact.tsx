import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram, MapPin, Send } from "lucide-react";
import Layout from "@/components/Layout";
import GeoShapes from "@/components/GeoShapes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });
    setSending(false);
    if (error) {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
      return;
    }
    toast({ title: "Message sent!", description: "Thank you for reaching out. I'll get back to you soon." });
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    { icon: Mail, label: "phaedrafilmsproductions@gmail.com", href: "mailto:phaedrafilmsproductions@gmail.com" },
    { icon: Phone, label: "+234 906 753 8985", href: "https://wa.me/2349067538985" },
    { icon: Instagram, label: "@phaedrafilms", href: "https://instagram.com/phaedrafilms" },
    { icon: MapPin, label: "Nigeria", href: undefined },
  ];

  return (
    <Layout>
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GeoShapes />
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Contact</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">Let's Work Together</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-heading font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm font-medium mb-1.5 block text-foreground/70">Your Name</label>
                  <Input placeholder="Fatimah Abdulazeez" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required maxLength={100} className="rounded-lg bg-card border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block text-foreground/70">Email Address</label>
                  <Input type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required maxLength={255} className="rounded-lg bg-card border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block text-foreground/70">Your Message</label>
                  <Textarea placeholder="Tell me about your project..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required maxLength={1000} rows={5} className="rounded-lg bg-card border-border" />
                </div>
                <Button type="submit" className="rounded-full px-8 w-full sm:w-auto" disabled={sending}>
                  {sending ? "Sending..." : "Send Message"} <Send className="ml-2" size={16} />
                </Button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-heading font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you're looking to document an event, create content for your brand, or tell an impactful story — I'm here to help bring your vision to life.
              </p>
              <div className="space-y-5">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon size={20} className="text-primary" />
                    </div>
                    {info.href ? (
                      <a href={info.href} target={info.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {info.label}
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">{info.label}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
