import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram, MapPin, Send, ArrowUpRight } from "lucide-react";
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
      {/* Hero */}
      <section className="py-24 md:py-36 relative overflow-hidden">
        <GeoShapes variant={3} />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary mb-4">Contact</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.05]">
              Let's Work<br />
              <span className="text-gradient">Together</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed">
              Have a project in mind? I'd love to hear your story and bring it to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 md:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <p className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary mb-6">Send a Message</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-mono tracking-wider uppercase text-muted-foreground mb-2 block">
                      Your Name
                    </label>
                    <Input
                      placeholder="Fatimah Abdulazeez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      maxLength={100}
                      className="rounded-xl bg-card border-border/60 h-12 focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono tracking-wider uppercase text-muted-foreground mb-2 block">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      maxLength={255}
                      className="rounded-xl bg-card border-border/60 h-12 focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-mono tracking-wider uppercase text-muted-foreground mb-2 block">
                    Your Message
                  </label>
                  <Textarea
                    placeholder="Tell me about your project, your vision, and the story you want to tell..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    maxLength={1000}
                    rows={6}
                    className="rounded-xl bg-card border-border/60 focus:border-primary/50 transition-colors resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="rounded-full px-8 h-12 w-full sm:w-auto glow-sm group"
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Send Message"}
                  <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <p className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary mb-6">Get in Touch</p>
              <p className="text-muted-foreground mb-10 leading-relaxed text-sm md:text-base">
                Whether you're looking to document an event, create content for your brand, or tell an impactful story — I'm here to help bring your vision to life.
              </p>
              <div className="space-y-5">
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.label}
                    whileHover={{ x: 4 }}
                    className="group"
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="flex items-center gap-4"
                      >
                        <div className="w-11 h-11 rounded-xl border border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all shrink-0">
                          <info.icon size={18} className="text-primary" />
                        </div>
                        <span className="text-sm text-foreground/60 group-hover:text-foreground transition-colors break-all">
                          {info.label}
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl border border-border flex items-center justify-center shrink-0">
                          <info.icon size={18} className="text-primary" />
                        </div>
                        <span className="text-sm text-foreground/60">{info.label}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social CTA */}
              <div className="mt-12 p-6 glass-card">
                <p className="text-sm font-medium mb-2">Follow the journey</p>
                <p className="text-xs text-muted-foreground mb-4">Behind-the-scenes, new projects, and creative process.</p>
                <a
                  href="https://instagram.com/phaedrafilms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium group"
                >
                  <Instagram size={16} />
                  @phaedrafilms
                  <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
