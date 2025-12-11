import { motion } from "framer-motion";
import { Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  {
    icon: Mail,
    href: "mailto:ganeshsri38253@gmail.com",
    label: "Email",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/sri-ganesh-192292228/",
    label: "LinkedIn",
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <span>© {currentYear} Sri Ganesh Sankuratri. Made with</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl bg-secondary hover:bg-accent transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
