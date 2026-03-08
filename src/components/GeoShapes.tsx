import { motion } from "framer-motion";

/** Floating geometric shapes for visual flair */
const GeoShapes = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Large circle */}
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 geo-circle opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      {/* Small diamond */}
      <motion.div
        className="absolute top-1/3 left-8 w-6 h-6 border border-primary/30 geo-diamond"
        animate={{ y: [0, -15, 0], rotate: [45, 90, 45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Dot grid */}
      <div className="absolute bottom-10 right-10 grid grid-cols-4 gap-2 opacity-20">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-primary" />
        ))}
      </div>
      {/* Diagonal line */}
      <motion.div
        className="absolute top-20 left-1/4 w-px h-32 bg-gradient-to-b from-primary/20 to-transparent"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      {/* Small circle */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full border border-primary/40"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default GeoShapes;
