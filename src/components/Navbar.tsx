import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/phaedra_films_logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-lg shadow-background/50"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center relative z-[60]">
              <img src={logo} alt="Phaedra Films" className="h-[170px] md:h-36" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-5 py-2 text-sm font-medium tracking-wide uppercase transition-colors group"
                >
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      location.pathname === link.to
                        ? "text-primary"
                        : "text-foreground/50 group-hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </span>
                  {location.pathname === link.to && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-px bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
              <Link
                to="/contact"
                className="ml-4 px-5 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-[60] w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-4">
                <motion.span
                  className="absolute left-0 right-0 h-[1.5px] bg-foreground rounded-full"
                  animate={isOpen ? { rotate: 45, top: "50%", translateY: "-50%" } : { rotate: 0, top: 0, translateY: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-foreground rounded-full"
                  animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-0 right-0 h-[1.5px] bg-foreground rounded-full"
                  animate={isOpen ? { rotate: -45, bottom: "50%", translateY: "50%" } : { rotate: 0, bottom: 0, translateY: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] bg-background flex flex-col justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-[60] w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            {/* Decorative background */}
            <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />
            <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-primary/5 blur-[60px]" />

            <div className="container mx-auto px-6">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between py-4 border-b border-border/30 transition-colors ${
                        location.pathname === link.to
                          ? "text-primary"
                          : "text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      <span className="text-4xl sm:text-5xl font-heading font-bold tracking-tight">
                        {link.label}
                      </span>
                      <ArrowUpRight
                        size={24}
                        className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 flex flex-col gap-3 text-sm text-muted-foreground"
              >
                <a href="mailto:phaedrafilmsproductions@gmail.com" className="hover:text-primary transition-colors">
                  phaedrafilmsproductions@gmail.com
                </a>
                <a href="https://instagram.com/phaedrafilms" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  @phaedrafilms
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
