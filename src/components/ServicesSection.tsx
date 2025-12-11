import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Database, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Building modern, responsive, and performance-optimized web applications using React.js, Next.js, and Tailwind CSS. Focus on component-driven architecture and scalable code.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Creating intuitive user flows, wireframes, and high-fidelity prototypes. Specializing in accessible, visually appealing designs that enhance user experience.",
  },
  {
    icon: Database,
    title: "MERN Stack Development",
    description:
      "Developing full-stack applications using MongoDB, Express.js, React.js, and Node.js. End-to-end solutions from database design to frontend implementation.",
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding bg-secondary/30 relative overflow-hidden">
      <div className="floating-shape w-80 h-80 -top-40 -right-40 opacity-10" />
      
      <div className="container-custom relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            What I Do
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            My Services
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group glass-card p-8 border-2 border-transparent hover:border-primary/30 transition-all duration-300"
            >
              <div className="p-4 rounded-2xl bg-primary/10 w-fit mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="font-display font-bold text-xl mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
