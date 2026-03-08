import { motion } from "framer-motion";

/** Floating geometric shapes for visual flair — multiple variants */
const GeoShapes = ({ className = "", variant = 1 }: { className?: string; variant?: 1 | 2 | 3 }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Large rotating circle */}
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 geo-circle opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating diamond */}
      <motion.div
        className="absolute top-1/3 left-8 w-6 h-6 border border-primary/25 geo-diamond"
        animate={{ y: [0, -20, 0], rotate: [45, 90, 45] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dot grid pattern */}
      <div className="absolute bottom-10 right-10 grid grid-cols-5 gap-2 opacity-15">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Vertical accent line */}
      <motion.div
        className="absolute top-20 left-1/4 w-px h-40 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent"
        animate={{ opacity: [0.2, 0.6, 0.2], scaleY: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Pulsing circle */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full border border-primary/30"
        animate={{ scale: [1, 2, 1], opacity: [0.4, 0.1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {variant >= 2 && (
        <>
          {/* Second dot grid - top left */}
          <div className="absolute top-16 left-16 grid grid-cols-3 gap-3 opacity-10">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-foreground" />
            ))}
          </div>

          {/* Horizontal accent line */}
          <motion.div
            className="absolute top-2/3 right-0 h-px w-48 bg-gradient-to-l from-primary/20 to-transparent"
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          {/* Floating ring */}
          <motion.div
            className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full border border-primary/10"
            animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {variant >= 3 && (
        <>
          {/* Cross shape */}
          <motion.div
            className="absolute bottom-1/3 left-1/4"
            animate={{ rotate: [0, 90, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-px h-8 bg-primary/20 absolute left-1/2 -translate-x-1/2" />
            <div className="h-px w-8 bg-primary/20 absolute top-1/2 -translate-y-1/2" />
          </motion.div>

          {/* Arc */}
          <motion.div
            className="absolute bottom-20 left-20 w-32 h-32 border-t border-l border-primary/15 rounded-tl-full"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
        </>
      )}

      {/* Film grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default GeoShapes;
