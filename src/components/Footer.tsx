import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/phaedra_films_logo.png";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Top CTA band */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary-foreground/5 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div>
              <p className="text-primary-foreground/60 text-sm font-medium tracking-widest uppercase mb-3">
                Ready to create?
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-[1.1]">
                Let's tell your<br />
                story together.
              </h2>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-primary-foreground text-primary px-8 py-4 rounded-full font-medium text-base hover:gap-5 transition-all shrink-0"
            >
              Get in Touch
              <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-background border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            {/* Brand */}
            <div className="md:col-span-5">
              <img src={logo} alt="Phaedra Films" className="h-10 mb-5" />
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                Crafting visual stories with intention, beauty, and lasting impact. Based in Nigeria, creating for the world.
              </p>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-muted-foreground mb-5">
                Navigation
              </h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Home", to: "/" },
                  { label: "About", to: "/about" },
                  { label: "Portfolio", to: "/portfolio" },
                  { label: "Contact", to: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="text-foreground/60 text-sm hover:text-primary hover:translate-x-1 transition-all inline-flex items-center gap-1 group"
                  >
                    {item.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="md:col-span-4">
              <h4 className="text-xs font-mono font-medium uppercase tracking-[0.2em] text-muted-foreground mb-5">
                Connect
              </h4>
              <div className="flex flex-col gap-4 text-sm">
                <a
                  href="mailto:phaedrafilmsproductions@gmail.com"
                  className="flex items-center gap-3 text-foreground/60 hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                    <Mail size={14} className="text-primary" />
                  </div>
                  <span className="text-xs sm:text-sm">phaedrafilmsproductions@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/2349067538985"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground/60 hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                    <Phone size={14} className="text-primary" />
                  </div>
                  +234 906 753 8985
                </a>
                <a
                  href="https://instagram.com/phaedrafilms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground/60 hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                    <Instagram size={14} className="text-primary" />
                  </div>
                  @phaedrafilms
                </a>
              </div>
            </div>
          </div>

          <div className="line-accent mt-12 mb-6" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground/40 text-xs">
              © {new Date().getFullYear()} Phaedra Films. All rights reserved.
            </p>
            <p className="text-muted-foreground/30 text-xs font-mono">
              Crafted with purpose
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
