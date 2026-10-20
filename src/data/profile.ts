import { monthsWorked } from "./experience";
/** Single source of truth for every external link and contact detail. */
export const profile = {
  name: "Sri Ganesh Sankuratri",
  location: "Bengaluru, India",
  experience: `${Math.floor(monthsWorked / 6) / 2}+ years`,
  email: "ganeshsri38253@gmail.com",
  phone: "+91 7995684899",
  phoneDisplay: "+91 7995684899",
  linkedin: "https://www.linkedin.com/in/sri-ganesh-software-engineer",
  linkedinDisplay: "Sri Ganesh",
  github: "https://github.com/SRI-GANESH-10",
  resumeUrl:
    "https://drive.google.com/file/d/15PASnkdBhs-_1Lxd8NXsPg7EjeN0XHFK/view",
};

/** Ready-made hrefs, so no component hand-builds a mailto:/tel: string. */
export const href = {
  email: `mailto:${profile.email}`,
  phone: `tel:${profile.phone.replace(/\s/g, "")}`,
  linkedin: profile.linkedin,
  github: profile.github,
  resume: profile.resumeUrl,
};
