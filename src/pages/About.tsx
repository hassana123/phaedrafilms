import { motion } from "framer-motion";
import { Heart, Eye, Target, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import BlobImage from "@/components/BlobImage";
import SectionHeading from "@/components/SectionHeading";
import GeoShapes from "@/components/GeoShapes";
import headshot from "@/assets/headshot.png";

const values = [
  { icon: Heart, title: "Authentic Storytelling", description: "Every project is rooted in honesty and genuine human connection.", num: "01" },
  { icon: Eye, title: "Intentional Vision", description: "I approach each story with clarity, purpose, and a keen eye for detail.", num: "02" },
  { icon: Target, title: "Impact-Driven", description: "My work aims to move people and create meaningful, lasting impressions.", num: "03" },
];

const milestones = [
  { year: "2020", event: "Started spoken word journey — discovering the power of narrative" },
  { year: "2021", event: "Transitioned into videography and scriptwriting" },
  { year: "2022", event: "Founded Phaedra Films as a creative studio" },
  { year: "2023", event: "Expanded into documentary and social impact storytelling" },
];

const About = () => {
  const { data: aboutContent } = useQuery({
    queryKey: ["site-content-about"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("*").eq("section_key", "about").maybeSingle();
      if (error) throw error;
      return data?.content as { name?: string; about_description?: string; headshot_image?: string } | null;
    },
  });

  const name = aboutContent?.name || "Fatimah Abdulazeez";
  const description = aboutContent?.about_description || "Visual storyteller, voice-over artist, and aspiring filmmaker based in Nigeria. I believe stories, when told well, have the power to move people and shape how we see the world.";
  const aboutHeadshot = aboutContent?.headshot_image || headshot;
  const nameParts = name.split(" ");
  const firstName = nameParts[0] || "Fatimah";
  const lastName = nameParts.slice(1).join(" ") || "Abdulazeez";

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 md:py-36 relative overflow-hidden">
        <GeoShapes variant={3} />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-5 relative flex justify-center"
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-6 rounded-full border border-primary/[0.08]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -inset-12 rounded-full border border-primary/[0.04]"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
                <BlobImage src={aboutHeadshot} alt={name} className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="md:col-span-7"
            >
              <p className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary mb-4">About Me</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-[1.05]">
                {firstName}<br />
                <span className="text-gradient">{lastName}</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-lg">
                {description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-32 bg-card/50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <SectionHeading label="Origin" title="My Story" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg"
          >
            <p>
              I started this journey out of a deep love for storytelling. I first found my voice through spoken word, 
              but over time I became curious about how stories could move beyond a stage and live on screen.
            </p>
            <p>
              That curiosity pushed me to learn videography and eventually directing, so I could bring the ideas 
              in my head to life myself. What began as experimentation slowly grew into a purpose: telling stories 
              that capture real moments, real people, and the emotions that connect them.
            </p>
            <p>
              Through my work, I hope to create visuals that are not just watched, but <em className="text-primary not-italic font-medium">felt</em>. 
              I believe stories, when told well, have the power to move people and shape how we see the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <SectionHeading label="Journey" title="Milestones" />
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 md:gap-8 items-start relative"
                >
                  <div className="relative z-10 w-8 md:w-12 h-8 md:h-12 rounded-full bg-background border border-border flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div className="pt-1 md:pt-2">
                    <p className="text-xs font-mono tracking-widest uppercase text-primary mb-1">{m.year}</p>
                    <p className="text-foreground/80 text-sm md:text-base leading-relaxed">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-32 bg-card/50 relative overflow-hidden">
        <GeoShapes variant={2} className="opacity-25" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading label="Philosophy" title="My Approach" subtitle="Guiding principles behind every project." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="glass-card p-8 md:p-10 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <value.icon size={22} className="text-primary" />
                    </div>
                    <span className="text-4xl font-heading font-bold text-foreground/[0.04] group-hover:text-primary/10 transition-colors">
                      {value.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary mb-4">Collaborate</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6">
              Let's create something<br />
              <span className="text-gradient">beautiful together</span>
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-base hover:bg-primary/90 transition-colors group glow-sm"
            >
              Get in Touch
              <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
