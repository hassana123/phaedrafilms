import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Film, Video } from "lucide-react";
import Layout from "@/components/Layout";
import BlobImage from "@/components/BlobImage";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import cameraPhoto from "@/assets/camera-photo.jpg";
import headshot from "@/assets/headshot.png";
import portfolio1 from "@/assets/portfolio-1.png";
import portfolio2 from "@/assets/portfolio-2.png";
import portfolio3 from "@/assets/portfolio-3.png";

const services = [
  {
    icon: Camera,
    title: "Event Coverage",
    description:
      "Professional video coverage for conferences, workshops, community programs, and special events.",
  },
  {
    icon: Video,
    title: "Short-Form Video",
    description:
      "Creation of short videos designed for social media — Instagram, TikTok, and YouTube Shorts.",
  },
  {
    icon: Film,
    title: "Documentary & Impact Storytelling",
    description:
      "Short documentaries and narrative videos that highlight people, communities, and social impact.",
  },
];

const featuredWork = [
  { src: portfolio1, title: "Brand Story" },
  { src: portfolio2, title: "Event Highlight" },
  { src: portfolio3, title: "Short Film" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-foreground text-background min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-primary font-medium tracking-wider uppercase text-sm mb-4">
                Visual Storytelling Agency
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight mb-6">
                Phaedra
                <br />
                <span className="text-primary">Films</span>
              </h1>
              <p className="text-background/70 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                Where creative vision meets impactful storytelling to elevate every message.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full text-base px-8">
                  <Link to="/contact">Book a Session</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full text-base px-8 border-background/30 text-background hover:bg-background/10"
                >
                  <Link to="/portfolio">
                    View Work <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <BlobImage
                src={cameraPhoto}
                alt="Fatimah with camera"
                className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Strip */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <BlobImage
              src={headshot}
              alt="Fatimah Abdulazeez"
              className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0"
              variant={2}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                Hi, I'm Fatimah Abdulazeez
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl">
                I am a visual storyteller, voice-over artist, and aspiring filmmaker. I started my
                journey as a spoken word artist, and over time that love for storytelling grew into
                scriptwriting, videography, and filmmaking. Today, I work behind the camera
                documenting people, brands, and social impact stories in ways that feel honest and
                intentional.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary font-medium mt-4 hover:gap-3 transition-all"
              >
                Learn more about me <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            title="What I Offer"
            subtitle="From events to documentaries, I craft stories that move and inspire."
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <service.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="rounded-full px-8">
              <Link to="/services">Explore All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Featured Work"
            subtitle="A glimpse into stories I've had the privilege of telling."
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredWork.map((work, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
              >
                <img
                  src={work.src}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-background font-heading text-lg font-semibold">
                    {work.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-10">
            <Button asChild className="rounded-full px-8">
              <Link to="/portfolio">View All Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            title="What Clients Say"
            subtitle="Kind words from those I've had the pleasure of working with."
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background/5 border border-background/10 rounded-2xl p-8"
              >
                <p className="text-background/60 italic text-sm leading-relaxed mb-6">
                  "Testimonial coming soon — this space will showcase real client feedback."
                </p>
                <p className="text-primary font-medium text-sm">— Client {i}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              Let's Tell Your Story
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Every story deserves to be told with intention, beauty, and impact. Let's create something remarkable together.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 text-base bg-foreground text-background hover:bg-foreground/90"
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
