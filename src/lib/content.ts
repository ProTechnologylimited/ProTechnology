export const company = {
  name: "ProTechnology Limited", short: "ProTech",
  email: "protech.limited.co@gmail.com", whatsapp: "2347031497499", whatsappDisplay: "+234 703 149 7499",
  address: "22 Yusuf Oyero Street, Ketu-Alapere, Kosofe, Lagos, Nigeria",
};
export const whatsappUrl = `https://wa.me/${company.whatsapp}`;

export interface Service { slug: string; name: string; summary: string; problem: string; customer: string;
  deliverables: string[]; process: string[]; outcomes: string; pricing: string; faqs: { q: string; a: string }[] }
const process = ["Discovery call to understand your goals and constraints", "Written scope and quote", "Build in small, reviewed milestones", "Launch, handover and agreed support"];
const mk = (s: Omit<Service, "process" | "outcomes" | "pricing"> & Partial<Pick<Service, "outcomes" | "pricing">>): Service => ({
  process, outcomes: "We aim to reduce repetitive work and improve consistency. Results depend on your business, data and adoption, and we do not guarantee specific figures.",
  pricing: "Pricing is scoped per project or offered as a monthly plan. Contact us for a quote.", ...s });
export const services: Service[] = [
  mk({ slug: "ai-automation", name: "AI Agents & Business Automation", summary: "Automate repetitive workflows with AI-assisted tools.",
    problem: "Teams lose time to repetitive follow-ups, data entry and routine communication.", customer: "Small and growing businesses with manual, repeatable processes.",
    deliverables: ["Workflow review", "Automation design and implementation", "Documentation and handover"],
    faqs: [{ q: "Will automation replace my staff?", a: "The goal is to remove repetitive tasks so people can focus on higher-value work." }] }),
  mk({ slug: "marketing-automation", name: "Marketing Automation", summary: "Organise campaigns, follow-ups and lead handling.",
    problem: "Leads go cold because follow-up is inconsistent.", customer: "Businesses running regular marketing or sales outreach.",
    deliverables: ["Campaign workflow setup", "Lead capture and follow-up sequences", "Reporting setup"],
    faqs: [{ q: "Do you send messages on our behalf?", a: "Only with your explicit configuration and appropriate recipient consent." }] }),
  mk({ slug: "seo-digital-marketing", name: "SEO & Digital Marketing", summary: "Improve discoverability and digital presence.",
    problem: "Customers cannot find your business online.", customer: "Businesses that want steadier inbound enquiries.",
    deliverables: ["Site and search audit", "On-page optimisation", "Content and tracking plan"],
    faqs: [{ q: "Can you guarantee rankings?", a: "No. Search rankings are not something anyone can honestly guarantee." }] }),
  mk({ slug: "web-development", name: "Website Development", summary: "Fast, secure, responsive business websites.",
    problem: "An outdated or slow website costs trust and enquiries.", customer: "Businesses launching or rebuilding their website.",
    deliverables: ["Design and build", "Mobile-first responsive layouts", "Hosting and launch support"],
    faqs: [{ q: "Can I update the content myself?", a: "Yes, we can include a content management approach in scope." }] }),
  mk({ slug: "mobile-development", name: "Mobile Application Development", summary: "Apps for iOS and Android.",
    problem: "Customers or staff need a purpose-built mobile experience.", customer: "Businesses with a defined mobile use case.",
    deliverables: ["Product scoping", "App design and development", "Store submission guidance"],
    faqs: [{ q: "iOS, Android or both?", a: "We scope this with you based on your users and budget." }] }),
  mk({ slug: "custom-software", name: "Custom Software Development", summary: "Bespoke internal tools and platforms.",
    problem: "Off-the-shelf software does not fit how you operate.", customer: "Organisations with specific operational needs.",
    deliverables: ["Requirements analysis", "Architecture and implementation", "Testing and documentation"],
    faqs: [{ q: "Who owns the code?", a: "Ownership terms are agreed in writing before work begins." }] }),
  mk({ slug: "ai-consulting", name: "AI Integration & Consulting", summary: "Practical advice on using AI safely in your business.",
    problem: "It is unclear where AI will genuinely help and where it will not.", customer: "Leaders evaluating AI adoption.",
    deliverables: ["Opportunity assessment", "Integration roadmap", "Risk and data-handling guidance"],
    faqs: [{ q: "Do we need lots of data?", a: "Not always. The assessment covers what your use case actually needs." }] }),
];
export const faqs = [
  { q: "Who is ProTechnology Limited for?", a: "Businesses in Nigeria and internationally that want to automate work, build digital products or improve their digital presence." },
  { q: "How do I get started?", a: "Create an account or send an enquiry. We will follow up to understand your needs." },
  { q: "Are prices fixed?", a: "Listed subscription prices are starting prices and may change. Custom projects are quoted individually." },
];
export const productCategories = ["AI Prompts", "AI Automation Templates", "Marketing Resources", "Business Toolkits", "Website Templates", "Developer Resources", "Educational Materials"];
