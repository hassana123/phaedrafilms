import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/phaedra_films_logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img src={logo} alt="Phaedra Films" className="h-8 mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Where creative vision meets impactful storytelling to elevate every message.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "About", to: "/about" },
                { label: "Portfolio", to: "/portfolio" },
                { label: "Contact", to: "/contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="mailto:phaedrafilmsproductions@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail size={16} /> phaedrafilmsproductions@gmail.com
              </a>
              <a href="https://wa.me/2349067538985" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone size={16} /> +234 906 753 8985
              </a>
              <a href="https://instagram.com/phaedrafilms" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Instagram size={16} /> @phaedrafilms
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={16} /> Nigeria
              </span>
            </div>
          </div>
        </div>

        <div className="line-accent mt-10 mb-6" />
        <p className="text-muted-foreground/40 text-xs text-center">
          © {new Date().getFullYear()} Phaedra Films. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
