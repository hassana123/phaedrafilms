import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
}

const SectionHeading = ({ title, subtitle, className = "", align = "center" }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg max-w-2xl text-muted-foreground ${align === 'center' ? 'mx-auto' : ''}">
          {subtitle}
        </p>
      )}
      <div className={`w-16 h-0.5 bg-primary mt-6 rounded-full ${align === "center" ? "mx-auto" : ""}`} />
    </motion.div>
  );
};

export default SectionHeading;
