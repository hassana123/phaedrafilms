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
      className={`overflow-hidden ${variant === 1 ? "blob-shape" : "blob-shape-2"} ${className} relative`}
      initial={{ scale: 0.85, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {/* Subtle inner shadow */}
      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]" />
    </motion.div>
  );
};

export default BlobImage;
