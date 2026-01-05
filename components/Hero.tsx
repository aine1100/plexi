import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
    const partners = [
        { name: "Figma", icon: "Figma" },
        { name: "attio", icon: "attio" },
        { name: "Graphite", icon: "Graphite" },
        { name: "IIElevenLabs", icon: "IIElevenLabs" },
        { name: "replit", icon: "replit" },
        { name: "Gamma", icon: "Gamma" },
        { name: "SUPERHUMAN", icon: "SUPERHUMAN" },
        { name: "Framer", icon: "Framer" },
    ];

    return (
        <section 
            style={{ background: "linear-gradient(to bottom, transparent, #FDFCF9)" }}
            className="relative flex flex-col items-center justify-center px-6 text-center pt-12 pb-20"
        >
            {/* Content */}
            <div className="mx-auto max-w-[900px] py-2 text-center md:py-20 lg:py-24">
                {/* Badge */}
                <div className="mb-8 flex justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-white)] px-3 py-1 text-[13px] font-bold text-[#666]">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        Hand-picked resources for professionals
                    </span>
                </div>

                {/* Headline */}
                <h1 className="mb-6 animate-fade-in text-5xl font-black leading-[1.05] tracking-tighter text-black md:text-[84px]">
                    The curated hub for <br />designers & devs
                </h1>

                {/* Subheadline */}
                <p className="mx-auto mb-12 max-w-[620px] text-[18px] font-medium leading-relaxed text-[#666] md:text-[20px]">
                    Access a hand-picked collection of high-end design assets, 
                    frontend libraries, and professional templates to accelerate your workflow.
                </p>

                {/* Actions */}
                <div className="flex flex-col items-center justify-center gap-4 px-4 sm:flex-row">
                    <Button 
                        variant="primary" 
                        width={220} 
                        height={49} 
                        className="rounded-full text-[15px]"
                    >
                        Browse Assets
                    </Button>
                    <Button 
                        variant="outline" 
                        width={220} 
                        height={49} 
                        className="rounded-full text-[15px] border-black/10"
                    >
                        Read Docs
                    </Button>
                </div>
            </div>
            <div className="relative w-full max-w-7xl px-4 mb-20">
                <div className="overflow-hidden rounded-2xl border border-black/5 transition-transform duration-700 hover:scale-[1.01]">
                    <Image
                        src="/hero.png"
                        alt="Plexi Templates Showcase"
                        width={1300}
                        height={800}
                        className="h-auto w-full object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Trust Section */}
            <div className="w-full max-w-7xl px-4 text-center">
                <p className="mb-10 text-[14px] font-medium text-[#666]">
                    Powering thousands of designing teams at the fastest growing companies in tech
                </p>
                
                <div className="relative overflow-hidden py-4">
                    <div className="flex animate-marquee items-center gap-20 whitespace-nowrap opacity-40 grayscale transition-all ">
                        {/* Loop 1 */}
                        {partners.map((partner) => (
                            <span 
                                key={partner.name} 
                                className="text-xl hover:grayscale-0 hover:opacity-100 font-bold tracking-tighter text-black md:text-2xl"
                            >
                                {partner.name}
                            </span>
                        ))}
                        {/* Loop 2 */}
                        {partners.map((partner) => (
                            <span 
                                key={`${partner.name}-dup`} 
                                className="text-xl font-bold tracking-tighter text-black md:text-2xl"
                            >
                                {partner.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
