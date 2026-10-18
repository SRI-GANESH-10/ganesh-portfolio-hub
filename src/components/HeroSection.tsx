import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import profileImage from "@/assets/profile-cutout.png";
import { OrbitingCircles } from "./ui/orbiting-circles";
import { href } from "@/data/profile";

const links = [
  { icon: Linkedin, label: "LinkedIn", href: href.linkedin },
  { icon: Github, label: "GitHub", href: href.github },
  { icon: Mail, label: "Email", href: href.email },
];

const Dot = () => (
  <span className="h-full w-full rounded-full bg-primary/70 shadow-[0_0_10px_hsl(var(--primary)/0.6)]" />
);

export const HeroSection = () => {
  return (
    <section className="relative h-[100dvh] flex items-center justify-center overflow-x-hidden overflow-y-auto">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20" />

      <div className="container-custom relative z-10 pt-10 md:pt-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 lg:min-w-[34rem] text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-3 sm:mb-4"
            >
              Hi, I'm{" "}
              <span className="gradient-text">Sri Ganesh Sankuratri</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground mb-3 font-medium xl:whitespace-nowrap"
            >
              Frontend Engineer · Micro-Frontends &amp; Design Systems · MERN Stack
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mb-4"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-xs font-medium text-primary">
                Google UX Certified · Figma → Code
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground hidden sm:block max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed"
            >
              2.5+ years building production React + TypeScript apps. Currently building a
              micro-frontend privacy governance platform at PrivaSapien, with Track3D.ai
              before that.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-3 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 glow-effect"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={href.resume}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold border border-border hover:bg-accent transition-all duration-300"
              >
                Download Resume
                <Download className="w-4 h-4" />
              </motion.a>

              <span className="hidden sm:block w-px h-8 bg-border mx-1" />

              {links.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-xl bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-1.5 mt-5 text-sm text-muted-foreground justify-center lg:justify-start"
            >
              <MapPin className="w-3.5 h-3.5" />
              Bengaluru, India
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-56 sm:w-72 lg:w-[22rem] xl:w-[26rem]">
              {/* Orbiting dots around the portrait */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center scale-[0.45] sm:scale-[0.6] lg:scale-100">
                <OrbitingCircles radius={200} duration={34} path={false} iconSize={10}>
                  <Dot />
                  <Dot />
                  <Dot />
                </OrbitingCircles>
                <OrbitingCircles radius={145} duration={26} path={false} iconSize={8} reverse>
                  <Dot />
                  <Dot />
                </OrbitingCircles>
              </div>

              {/* Teal glow behind the portrait */}
              <div className="absolute inset-x-0 top-[12%] bottom-0 rounded-full bg-primary/25 blur-3xl" />

              {/* Cutout portrait, edges faded into the background */}
              <motion.img
                src={profileImage}
                alt="Sri Ganesh Sankuratri"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full drop-shadow-2xl [mask-image:linear-gradient(to_bottom,black_68%,transparent_97%),linear-gradient(to_right,transparent_2%,black_18%)] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
