import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Camera, Film, Video, Quote, Play } from "lucide-react";
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
import { useRef } from "react";

const services = [
  { icon: Camera, title: "Event Coverage", description: "Professional video coverage for conferences, workshops, community programs, and special events.", num: "01" },
  { icon: Video, title: "Short-Form Video", description: "Creation of short videos designed for social media — Instagram, TikTok, and YouTube Shorts.", num: "02" },
  { icon: Film, title: "Documentary & Impact", description: "Short documentaries and narrative videos that highlight people, communities, and social impact.", num: "03" },
];

const featuredWork = [
  { src: portfolio1, title: "Brand Story", category: "Narrative" },
  { src: portfolio2, title: "Event Highlight", category: "Events" },
  { src: portfolio3, title: "Short Film", category: "Film" },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <Layout>
      {/* ─── HERO ─── */}
      <section ref={heroRef} className="min-h-[100vh] flex items-center relative overflow-hidden">
        <GeoShapes variant={3} />

        {/* Large gradient orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.04] rounded-full blur-[150px] pointer-events-none" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="container mx-auto px-4 sm:px-6 py-20 md:py-28 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.p
                className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary/80 mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Visual Storytelling Studio
              </motion.p>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] font-heading font-bold leading-[0.92] mb-8 tracking-tight">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  Phaedra
                </motion.span>
                <motion.span
                  className="block text-gradient"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  Films
                </motion.span>
              </h1>

              <motion.p
                className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Where creative vision meets impactful storytelling — crafting visuals that aren't just watched, but felt.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <Button asChild size="lg" className="rounded-full text-base px-8 h-12 glow-sm group">
                  <Link to="/contact">
                    Book a Session
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full text-base px-8 h-12 border-border/60 text-foreground/70 hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <Link to="/portfolio">
                    View Work
                  </Link>
                </Button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                className="flex gap-10 mt-14 pt-8 border-t border-border/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {[
                  { num: "50+", label: "Projects" },
                  { num: "30+", label: "Clients" },
                  { num: "3+", label: "Years" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">{stat.num}</p>
                    <p className="text-xs text-muted-foreground mt-1 font-mono tracking-wider uppercase">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center lg:justify-end relative"
            >
              {/* Decorative rings */}
              <motion.div
                className="absolute inset-0 m-auto w-[90%] h-[90%] rounded-full border border-primary/[0.06]"
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 m-auto w-[80%] h-[80%] rounded-full border border-primary/[0.04]"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <BlobImage
                src={cameraPhoto}
                alt="Fatimah with camera"
                className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[26rem] lg:h-[26rem] xl:w-[30rem] xl:h-[30rem]"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground">Scroll</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-primary/40 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* ─── MARQUEE DIVIDER ─── */}
      <div className="py-6 border-y border-border/30 overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="text-foreground/[0.04] text-6xl md:text-8xl font-heading font-bold mx-8 select-none">
              Phaedra Films •
            </span>
          ))}
        </div>
      </div>

      {/* ─── INTRO ─── */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-4 relative flex justify-center"
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 rounded-full border border-primary/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />
                <BlobImage src={headshot} alt="Fatimah Abdulazeez" className="w-48 h-48 md:w-60 md:h-60" variant={2} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="md:col-span-8"
            >
              <p className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary mb-4">The Creator</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6 leading-[1.1]">
                Hi, I'm <span className="text-gradient">Fatimah</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-xl">
                I am a visual storyteller, voice-over artist, and aspiring filmmaker. I started my
                journey as a spoken word artist, and over time that love for storytelling grew into
                scriptwriting, videography, and filmmaking.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary font-medium mt-6 text-sm group"
              >
                Read my story
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-20 md:py-32 bg-card/50 relative overflow-hidden">
        <GeoShapes variant={2} className="opacity-30" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading label="Services" title="What I Offer" subtitle="From events to documentaries, I craft stories that move and inspire." />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="glass-card p-8 md:p-10 group relative overflow-hidden cursor-default"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <service.icon size={22} className="text-primary" />
                    </div>
                    <span className="text-4xl font-heading font-bold text-foreground/[0.04] group-hover:text-primary/10 transition-colors">
                      {service.num}
                    </span>
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
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14 md:mb-20">
            <div>
              <p className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary mb-4">Portfolio</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold leading-[1.1]">
                Featured Work
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors group shrink-0"
            >
              View all projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {featuredWork.map((work, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
              >
                <img
                  src={work.src}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <p className="text-xs font-mono tracking-widest uppercase text-primary mb-2">{work.category}</p>
                    <p className="text-foreground font-heading text-xl font-bold">{work.title}</p>
                  </div>
                </div>
                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/20 backdrop-blur-sm">
                  <ArrowUpRight size={14} className="text-foreground" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 md:py-32 bg-card/50 relative overflow-hidden">
        <GeoShapes variant={1} className="opacity-20" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading label="Testimonials" title="What Clients Say" subtitle="Kind words from those I've had the pleasure of working with." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-card p-8 relative group"
              >
                <Quote size={32} className="text-primary/[0.08] absolute top-6 right-6 group-hover:text-primary/15 transition-colors" />
                <div className="flex gap-1 mb-5">
                  {[1,2,3,4,5].map(s => (
                    <div key={s} className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  ))}
                </div>
                <p className="text-foreground/70 italic text-sm leading-relaxed mb-6">
                  "Testimonial coming soon — this space will showcase real client feedback."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-xs font-bold">C{i}</span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium text-sm">Client {i}</p>
                    <p className="text-muted-foreground text-xs">Project Partner</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
