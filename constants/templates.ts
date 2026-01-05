export type TemplateCategory = "Landing" | "Saas" | "Mobile" | "Ai";

export interface Template {
    id: string;
    title: string;
    description: string;
    image: string;
    category: TemplateCategory;
}

export const templates: Template[] = [
    {
        id: "1",
        title: "Plexi Starter",
        description: "A high-performance Next.js starter kit with pre-configured Tailwind CSS, Framer Motion, and SEO best practices.",
        image: "/hero.png",
        category: "Landing",
    },
    {
        id: "2",
        title: "UI Foundry",
        description: "A comprehensive Figma design system with variables, auto-layout 5.0, and high-fidelity component libraries.",
        image: "/hero.png",
        category: "Saas",
    },
    {
        id: "3",
        title: "Clean Stack",
        description: "The ultimate frontend boilerplate for modern web apps, featuring TypeScript and shadcn/ui integration.",
        image: "/hero.png",
        category: "Saas",
    },
    {
        id: "4",
        title: "Asset Vault",
        description: "A curated collection of premium icons, textures, and fonts to elevate your visual identity projects.",
        image: "/hero.png",
        category: "Ai",
    },
    {
        id: "5",
        title: "Mobile One",
        description: "Minimalist mobile app template for designers and developers seeking a professional presence.",
        image: "/hero.png",
        category: "Mobile",
    },
    {
        id: "6",
        title: "SaaS Blueprint",
        description: "Accelerate your SaaS development with this production-ready dashboard and landing page system.",
        image: "/hero.png",
        category: "Saas",
    },
    {
        id: "7",
        title: "AI Chat Interface",
        description: "Modern chat interface optimized for large language models and cognitive search experiences.",
        image: "/hero.png",
        category: "Ai",
    },
    {
        id: "8",
        title: "Landing Pro",
        description: "Advanced landing page with high conversion sections and modular component architecture.",
        image: "/hero.png",
        category: "Landing",
    }
];
