import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
  label?: string;
}

const SectionHeading = ({ title, subtitle, className = "", align = "center", label }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-14 md:mb-20 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {label && (
        <p className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary mb-4">
          {label}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl text-muted-foreground mt-5 leading-relaxed ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
      <motion.div
        className={`w-12 h-[2px] bg-primary mt-6 rounded-full ${align === "center" ? "mx-auto" : ""}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ transformOrigin: align === "center" ? "center" : "left" }}
      />
    </motion.div>
  );
};

export default SectionHeading;
