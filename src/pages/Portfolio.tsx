import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import GeoShapes from "@/components/GeoShapes";
import portfolio1 from "@/assets/portfolio-1.png";
import portfolio2 from "@/assets/portfolio-2.png";
import portfolio3 from "@/assets/portfolio-3.png";
import portfolio4 from "@/assets/portfolio-4.png";
import portfolio5 from "@/assets/portfolio-5.png";

const categories = ["All", "Videos", "Photography", "Events"];

const portfolioItems = [
  { src: portfolio1, title: "Brand Campaign", category: "Videos" },
  { src: portfolio2, title: "Event Highlight Reel", category: "Events" },
  { src: portfolio3, title: "Social Media Short", category: "Videos" },
  { src: portfolio4, title: "Community Documentary", category: "Photography" },
  { src: portfolio5, title: "Workshop Coverage", category: "Events" },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  const navigateLightbox = (dir: number) => {
    if (selectedImage === null) return;
    const next = selectedImage + dir;
    if (next >= 0 && next < filtered.length) setSelectedImage(next);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 md:py-36 relative overflow-hidden">
        <GeoShapes variant={2} />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary mb-4">
              Portfolio
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.05]">
              Selected<br />
              <span className="text-gradient">Work</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed">
              A curated collection of stories I've had the privilege of telling — each crafted with purpose and care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Filter pills */}
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3 mb-12 md:mb-16"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-400 border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary glow-sm"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-primary/5"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="ml-2 text-primary-foreground/60">
                    ({filtered.length})
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Masonry grid */}
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 space-y-4 md:space-y-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid"
                  onClick={() => setSelectedImage(i)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full transition-transform duration-[800ms] ease-out group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-xs font-mono tracking-widest uppercase text-primary mb-2">{item.category}</p>
                      <p className="text-foreground font-heading text-lg font-bold">{item.title}</p>
                    </div>
                  </div>
                  {/* Corner icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/20 backdrop-blur-sm">
                    <ArrowUpRight size={14} className="text-foreground" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-all z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X size={18} />
            </button>

            {selectedImage > 0 && (
              <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/50 transition-all z-10"
                onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {selectedImage < filtered.length - 1 && (
              <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/50 transition-all z-10"
                onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
              >
                <ChevronRight size={20} />
              </button>
            )}

            <motion.div
              key={selectedImage}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[selectedImage]?.src}
                alt={filtered[selectedImage]?.title}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              <div className="text-center mt-6">
                <p className="text-foreground font-heading text-xl font-bold">{filtered[selectedImage]?.title}</p>
                <p className="text-primary text-xs font-mono tracking-widest uppercase mt-1">{filtered[selectedImage]?.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Portfolio;
