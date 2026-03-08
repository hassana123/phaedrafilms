import { motion } from "framer-motion";

interface BlobImageProps {
  src: string;
  alt: string;
  className?: string;
  variant?: 1 | 2;
}

const BlobImage = ({ src, alt, className = "", variant = 1 }: BlobImageProps) => {
  return (
    <motion.div
      className={`overflow-hidden ${variant === 1 ? "blob-shape" : "blob-shape-2"} ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  );
};

export default BlobImage;
