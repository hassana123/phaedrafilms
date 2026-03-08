import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Film, Video, Quote } from "lucide-react";
import Layout from "@/components/Layout";
import BlobImage from "@/components/BlobImage";
import SectionHeading from "@/components/SectionHeading";
import GeoShapes from "@/components/GeoShapes";
import { Button } from "@/components/ui/button";
import cameraPhoto from "@/assets/camera-photo.jpg";
import headshot from "@/assets/headshot.png";
import portfolio1 from "@/assets/portfolio-1.png";
import portfolio2 from "@/assets/portfolio-2.png";
import portfolio3 from "@/assets/portfolio-3.png";

const services = [
  { icon: Camera, title: "Event Coverage", description: "Professional video coverage for conferences, workshops, community programs, and special events." },
  { icon: Video, title: "Short-Form Video", description: "Creation of short videos designed for social media — Instagram, TikTok, and YouTube Shorts." },
  { icon: Film, title: "Documentary & Impact", description: "Short documentaries and narrative videos that highlight people, communities, and social impact." },
];

const featuredWork = [
  { src: portfolio1, title: "Brand Story" },
  { src: portfolio2, title: "Event Highlight" },
  { src: portfolio3, title: "Short Film" },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Index = () => {
  return (
    <Layout>
      {/* ─── HERO ─── */}
      <section className="min-h-[95vh] flex items-center relative overflow-hidden">
        <GeoShapes variant={3} />
        {/* Gradient orb behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.p
                className="text-primary font-medium tracking-[0.25em] uppercase text-sm mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Visual Storytelling Agency
              </motion.p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-[0.95] mb-6">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  Phaedra
                </motion.span>
                <motion.span
                  className="block text-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                >
                  Films
                </motion.span>
              </h1>
              <motion.div
                className="w-16 h-0.5 bg-primary mb-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                style={{ transformOrigin: "left" }}
              />
              <motion.p
                className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Where creative vision meets impactful storytelling to elevate every message.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Button asChild size="lg" className="rounded-full text-base px-8 group">
                  <Link to="/contact">
                    Book a Session
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full text-base px-8 border-foreground/20 text-foreground hover:bg-foreground/5 hover:border-primary/50 transition-all"
                >
                  <Link to="/portfolio">
                    View Work <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex justify-center lg:justify-end relative"
            >
              {/* Decorative ring behind blob */}
              <motion.div
                className="absolute inset-0 m-auto w-[85%] h-[85%] rounded-full border border-primary/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              <BlobImage
                src={cameraPhoto}
                alt="Fatimah with camera"
                className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section className="py-16 md:py-24 bg-card relative overflow-hidden">
        <div className="line-accent mb-16" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 border border-primary/10 rounded-full" />
              <BlobImage src={headshot} alt="Fatimah Abdulazeez" className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0" variant={2} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Hi, I'm <span className="text-primary">Fatimah</span> Abdulazeez
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl">
                I am a visual storyteller, voice-over artist, and aspiring filmmaker. I started my
                journey as a spoken word artist, and over time that love for storytelling grew into
                scriptwriting, videography, and filmmaking.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary font-medium mt-4 hover:gap-3 transition-all group"
              >
                Learn more about me <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <GeoShapes variant={2} className="opacity-40" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading title="What I Offer" subtitle="From events to documentaries, I craft stories that move and inspire." />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-colors group relative overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <service.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURED WORK ─── */}
      <section className="py-16 md:py-24 bg-card relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading title="Featured Work" subtitle="A glimpse into stories I've had the privilege of telling." />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredWork.map((work, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer border border-border"
              >
                <img
                  src={work.src}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                  <div>
                    <div className="w-8 h-0.5 bg-primary mb-3 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                    <p className="text-foreground font-heading text-lg font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {work.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button asChild variant="outline" className="rounded-full px-8 border-foreground/20 hover:border-primary/50">
              <Link to="/portfolio">View All Work</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <GeoShapes variant={1} className="opacity-25" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading title="What Clients Say" subtitle="Kind words from those I've had the pleasure of working with." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-2xl p-8 relative group hover:border-primary/30 transition-all"
              >
                <Quote size={28} className="text-primary/15 absolute top-6 right-6 group-hover:text-primary/30 transition-colors" />
                <p className="text-muted-foreground italic text-sm leading-relaxed mb-6">
                  "Testimonial coming soon — this space will showcase real client feedback."
                </p>
                <div className="w-8 h-0.5 bg-primary mb-3" />
                <p className="text-primary font-medium text-sm">— Client {i}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-10 left-10 w-48 h-48 border border-primary-foreground/10 rounded-full"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-72 h-72 border border-primary-foreground/10 rounded-full"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-primary-foreground">
              Let's Tell Your Story
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
              Every story deserves to be told with intention, beauty, and impact.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 text-base bg-background text-foreground hover:bg-background/90"
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
