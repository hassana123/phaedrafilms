import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

const testimonials = [
  { quote: "Testimonial coming soon — this space will showcase real client feedback.", client: "Client 1", role: "Brand Partner" },
  { quote: "Testimonial coming soon — this space will showcase real client feedback.", client: "Client 2", role: "Event Organizer" },
  { quote: "Testimonial coming soon — this space will showcase real client feedback.", client: "Client 3", role: "NGO Director" },
];

const Testimonials = () => {
  return (
    <Layout>
      <section className="bg-foreground text-background py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary font-medium tracking-wider uppercase text-sm mb-3">Testimonials</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">What Clients Say</h1>
            <p className="text-background/70 text-lg max-w-2xl mx-auto">
              Kind words from those I've had the pleasure of working with.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-secondary rounded-2xl p-8 relative"
              >
                <Quote size={32} className="text-primary/20 absolute top-6 right-6" />
                <p className="text-muted-foreground italic leading-relaxed mb-6">{t.quote}</p>
                <div>
                  <p className="font-heading font-semibold">{t.client}</p>
                  <p className="text-muted-foreground text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
