import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/phaedra_films_logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <img src={logo} alt="Phaedra Films" className="h-8 mb-4" />
            <p className="text-background/60 text-sm leading-relaxed max-w-xs">
              Where creative vision meets impactful storytelling to elevate every message.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {["About", "Services", "Portfolio", "Gallery", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-background/60 text-sm hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3 text-sm text-background/60">
              <a
                href="mailto:phaedrafilmsproductions@gmail.com"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail size={16} />
                phaedrafilmsproductions@gmail.com
              </a>
              <a
                href="https://wa.me/2349067538985"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone size={16} />
                +234 906 753 8985
              </a>
              <a
                href="https://instagram.com/phaedrafilms"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Instagram size={16} />
                @phaedrafilms
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={16} />
                Nigeria
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 text-center">
          <p className="text-background/40 text-xs">
            © {new Date().getFullYear()} Phaedra Films. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
