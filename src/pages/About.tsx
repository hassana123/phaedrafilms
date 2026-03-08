import { motion } from "framer-motion";
import { Heart, Eye, Target } from "lucide-react";
import Layout from "@/components/Layout";
import BlobImage from "@/components/BlobImage";
import SectionHeading from "@/components/SectionHeading";
import GeoShapes from "@/components/GeoShapes";
import headshot from "@/assets/headshot.png";

const values = [
  { icon: Heart, title: "Authentic Storytelling", description: "Every project is rooted in honesty and genuine human connection." },
  { icon: Eye, title: "Intentional Vision", description: "I approach each story with clarity, purpose, and a keen eye for detail." },
  { icon: Target, title: "Impact-Driven", description: "My work aims to move people and create meaningful, lasting impressions." },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GeoShapes />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <BlobImage src={headshot} alt="Fatimah Abdulazeez" className="w-56 h-56 md:w-72 md:h-72 flex-shrink-0" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">About Me</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">Fatimah Abdulazeez</h1>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Visual storyteller, voice-over artist, and aspiring filmmaker based in Nigeria.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <SectionHeading title="My Story" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg"
          >
            <p>I started this journey out of a deep love for storytelling. I first found my voice through spoken word, but over time I became curious about how stories could move beyond a stage and live on screen.</p>
            <p>That curiosity pushed me to learn videography and eventually directing, so I could bring the ideas in my head to life myself. What began as experimentation slowly grew into a purpose: telling stories that capture real moments, real people, and the emotions that connect them.</p>
            <p>Through my work, I hope to create visuals that are not just watched, but felt. I believe stories, when told well, have the power to move people and shape how we see the world.</p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 relative">
        <GeoShapes className="opacity-40" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading title="My Approach" subtitle="Guiding principles behind every project." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center bg-card border border-border rounded-2xl p-8"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <value.icon size={26} className="text-primary" />
                </div>
                <h3 className="text-lg font-heading font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
