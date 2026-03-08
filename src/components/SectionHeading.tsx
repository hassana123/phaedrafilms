import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
}

const SectionHeading = ({ title, subtitle, light = false, className = "" }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`text-center mb-12 md:mb-16 ${className}`}
    >
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 ${light ? "text-background" : "text-foreground"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl mx-auto ${light ? "text-background/70" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
      <div className="w-16 h-1 bg-primary mx-auto mt-6 rounded-full" />
    </motion.div>
  );
};

export default SectionHeading;
