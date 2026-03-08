import { motion } from "framer-motion";

const GeoShapes = ({ className = "", variant = 1 }: { className?: string; variant?: 1 | 2 | 3 }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Primary gradient orb */}
      <motion.div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[100px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary orb */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[80px]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Fine grid lines */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating ring */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full border border-primary/[0.08]"
        animate={{ y: [0, -15, 0], rotate: [0, 90, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {variant >= 2 && (
        <>
          {/* Accent line */}
          <motion.div
            className="absolute top-1/3 left-8 w-px h-32 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          {/* Dot cluster */}
          <div className="absolute bottom-20 right-16 grid grid-cols-3 gap-4 opacity-10">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-foreground" />
            ))}
          </div>
        </>
      )}

      {variant >= 3 && (
        <>
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-32 h-32 border-t border-l border-primary/[0.06] rounded-tl-full"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </>
      )}

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
};

export default GeoShapes;
