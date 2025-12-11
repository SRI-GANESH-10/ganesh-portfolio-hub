import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Code2, Palette, Zap } from "lucide-react";
import profileImage from "@/assets/profile-placeholder.png";

const highlights = [
  { icon: Code2, label: "React Expert", description: "2+ years experience" },
  { icon: Palette, label: "UI/UX Focused", description: "Design systems" },
  { icon: Zap, label: "Performance", description: "Optimization" },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="floating-shape w-72 h-72 -top-36 -right-36 opacity-10" />
      
      <div className="container-custom relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            About Me
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            Get to Know Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 -rotate-6" />
              <div className="relative rounded-3xl overflow-hidden glass-card">
                <img
                  src={profileImage}
                  alt="Sri Ganesh Sankuratri"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-display text-2xl font-bold mb-4">
                Sri Ganesh Sankuratri
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm a passionate Frontend Software Engineer with over 2 years of experience 
                specializing in building scalable web applications. My expertise lies in 
                React.js, Next.js, and modern UI frameworks like Tailwind CSS and ShadCN UI. 
                I'm dedicated to creating user-centric, high-performance applications that 
                deliver exceptional user experiences.
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              I thrive on component-driven development, crafting reusable UI components and 
              design systems. My approach combines clean code practices with a keen eye for 
              design, ensuring both functionality and aesthetics work in harmony.
            </p>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-card p-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">B.Tech in Computer Science Engineering</h4>
                  <p className="text-muted-foreground text-sm">
                    Velagapudi Ramakrishna Siddhartha Engineering College
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-secondary hover:bg-accent transition-colors"
                >
                  <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
