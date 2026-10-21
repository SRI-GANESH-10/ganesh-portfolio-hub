import { ArrowUpRight, Copy, Github, Linkedin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { contact } from "@/data/contact";
import { href, profile } from "@/data/profile";
import { Greeting } from "./Greeting";

// Clipboard access can be refused (old browsers, some privacy settings): then show the
// address in the toast so it can still be copied by hand.
const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(profile.email);
    toast({ title: "Email copied", description: profile.email });
  } catch {
    toast({ title: "Couldn't copy automatically", description: profile.email });
  }
};

// Every link comes from profile.ts, the single source for contact details.
const links = [
  { label: "LinkedIn", href: href.linkedin, icon: Linkedin, external: true },
  { label: "GitHub", href: href.github, icon: Github, external: true },
  { label: "Résumé", href: href.resume, icon: ArrowUpRight, external: true },
  {
    label: profile.phoneDisplay,
    href: href.phone,
    icon: Phone,
    external: false,
  },
];

const btn = "h-11 rounded-xl px-5 text-[14.5px] font-semibold";

export const ContactSection = () => (
  // one screen tall (minus the fixed navbar) with the content centred in it; min-h, not h,
  // so very short screens can still scroll instead of cutting the buttons off
  // pb > pt: exact centre looks low to the eye, so sit a little above it (optical centre)
  <section
    id="contact"
    className="container-custom flex min-h-[calc(100dvh-4rem)] flex-col justify-center pt-4 pb-[10vh] text-center md:min-h-[calc(100dvh-5rem)]"
  >
    <h2 className="font-display text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.025em]">
      {contact.heading}
    </h2>
    <div className="mt-6">
      <Greeting />
    </div>
    <p className="mx-auto mt-7 max-w-[580px] leading-relaxed text-foreground/80">
      {contact.lead}
    </p>

    <div className="mt-7 flex flex-wrap justify-center gap-2.5">
      <Button onClick={copyEmail} className={btn}>
        <Copy /> Copy email
      </Button>
      {links.map(({ label, href, icon: Icon, external }) => (
        <Button
          key={label}
          asChild
          variant="outline"
          className={`${btn} hover:border-primary hover:bg-transparent hover:text-primary`}
        >
          <a
            href={href}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          >
            <Icon /> {label}
          </a>
        </Button>
      ))}
    </div>
  </section>
);
