import { motion } from "framer-motion";
import { FileText, Github, Linkedin, Mail } from "lucide-react";
import profileImage from "@/assets/profile-cutout.png";
import { OrbitingCircles } from "./ui/orbiting-circles";

const links = [
  {
    icon: FileText,
    label: "Resume",
    href: "https://drive.google.com/file/d/1N_j2XUElaJ9YCsaDu2pNCQtUL9Cf_ncp/view?usp=sharing",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sri-ganesh-software-engineer",
  },
  { icon: Github, label: "GitHub", href: "https://github.com/SRI-GANESH-10" },
  { icon: Mail, label: "Email", href: "mailto:ganeshsri38253@gmail.com" },
];

const Dot = () => (
  <span className="h-full w-full rounded-full bg-primary/70 shadow-[0_0_10px_hsl(var(--primary)/0.6)]" />
);

export const HeroSection = () => {
  return (
    <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20" />

      <div className="container-custom relative z-10 pt-10 md:pt-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-primary/20 mb-4 sm:mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-accent-foreground">
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6"
            >
              Hi, I'm{" "}
              <span className="gradient-text">Sri Ganesh Sankuratri</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground mb-3 sm:mb-4 font-medium"
            >
              Frontend Software Engineer | MERN Stack Developer | UI/UX Enthusiast
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground hidden sm:block max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Frontend Software Engineer with 2 years of experience building scalable web 
              applications using React.js, Next.js, and Tailwind CSS. Passionate about creating 
              scalable, user-centric, high-performance applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3 justify-center lg:justify-start"
            >
              {links.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3.5 rounded-xl bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-accent transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-56 sm:w-72 lg:w-[26rem]">
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
