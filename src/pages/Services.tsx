import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Video, Film, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Camera,
    title: "Event Coverage",
    description:
      "Professional video coverage for conferences, workshops, community programs, and special events. The focus is on documenting key moments and producing a clean, engaging highlight that captures the atmosphere and purpose of the event.",
    features: [
      "Multi-angle video coverage",
      "Professional audio capture",
      "Highlight reel production",
      "Quick turnaround delivery",
    ],
  },
  {
    icon: Video,
    title: "Short-Form Video Production",
    description:
      "Creation of short videos (30–90 seconds) designed for social media. This includes editing, color grading, sound design, and formatting for platforms like Instagram, TikTok, and YouTube Shorts.",
    features: [
      "Social media optimized formats",
      "Professional color grading",
      "Sound design & mixing",
      "Platform-specific formatting",
    ],
  },
  {
    icon: Film,
    title: "Documentary & Impact Storytelling",
    description:
      "Production of short documentaries and narrative videos that highlight people, communities, and social impact initiatives. These stories are crafted to communicate purpose, emotion, and real-world change.",
    features: [
      "Narrative development",
      "Interview-based storytelling",
      "Impact-focused messaging",
      "Cinematic production quality",
    ],
  },
];

const Services = () => {
  return (
    <Layout>
      <section className="bg-foreground text-background py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-medium tracking-wider uppercase text-sm mb-3">Services</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              What I Can Do For You
            </h1>
            <p className="text-background/70 text-lg max-w-2xl mx-auto">
              Every project is an opportunity to create something meaningful. Here's how I can help bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 space-y-16 md:space-y-24">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-10 md:gap-16 items-center`}
            >
              <div className="flex-1">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <service.icon size={28} className="text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">{service.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="rounded-full px-6">
                  <Link to="/contact">
                    Get Started <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-secondary rounded-2xl aspect-video flex items-center justify-center">
                  <service.icon size={64} className="text-muted-foreground/30" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Services;
