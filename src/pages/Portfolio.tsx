import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
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
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GeoShapes variant={2} />
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.p
              className="text-primary font-medium tracking-[0.25em] uppercase text-sm mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Portfolio
            </motion.p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">My Work</h1>
            <motion.div className="w-16 h-0.5 bg-primary mx-auto mb-6" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.5 }} />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A curated collection of stories I've had the privilege of telling.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Filter pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Masonry grid */}
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid border border-border hover:border-primary/30 transition-colors"
                  onClick={() => setSelectedImage(i)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                    >
                      <div className="w-8 h-0.5 bg-primary mb-3 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                      <p className="text-foreground font-heading text-lg font-semibold">{item.title}</p>
                      <p className="text-primary text-sm mt-1">{item.category}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox with navigation */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-foreground/60 hover:text-primary transition-colors z-10" onClick={() => setSelectedImage(null)}>
              <X size={28} />
            </button>

            {/* Nav arrows */}
            {selectedImage > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-primary transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
              >
                <ChevronLeft size={36} />
              </button>
            )}
            {selectedImage < filtered.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-primary transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
              >
                <ChevronRight size={36} />
              </button>
            )}

            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[selectedImage]?.src}
                alt={filtered[selectedImage]?.title}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="text-center mt-4">
                <p className="text-foreground font-heading text-lg">{filtered[selectedImage]?.title}</p>
                <p className="text-primary text-sm">{filtered[selectedImage]?.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Portfolio;
