import { ParallaxSection } from "@/components/ui/parallax-section";
import { LiveConditions } from "@/components/live-conditions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <ParallaxSection imageSrc="/images/surf-hero.png" className="h-screen">
        <div className="flex flex-col items-center text-center space-y-6">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white drop-shadow-2xl opacity-90">
            SURF & SAGE
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-light tracking-wide uppercase">
            Where the ocean meets clarity
          </p>
        </div>
      </ParallaxSection>

      <section className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
            Precision Flows
          </h2>
          <p className="text-xl text-neutral-400 leading-relaxed font-light">
            Real-time data from the world's most reliable sources. We combine deep
            ocean analytics with local knowledge to bring you the most accurate
            surf reports, straight to your device.
          </p>
        </div>
        <LiveConditions />
      </section>

      <ParallaxSection imageSrc="/images/ocean-aerial.png">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">Deep Dive</h2>
          <p className="text-xl text-white/80 font-light">
            Explore the science behind the swell.
          </p>
        </div>
      </ParallaxSection>

      <section className="min-h-[60vh] flex items-center justify-center bg-neutral-950 border-t border-white/5">
        <div className="text-center space-y-8 p-12 border border-white/10 rounded-full aspect-square flex flex-col justify-center items-center hover:bg-white/5 transition-colors duration-500 cursor-pointer">
          <h3 className="text-3xl font-semibold tracking-wide">Start Tracking</h3>
          <div className="w-12 h-1 bg-white/20" />
        </div>
      </section>

      <ParallaxSection imageSrc="/images/calm-beach.png" className="min-h-[80vh]">
        <div className="text-right w-full pr-6 md:pr-24">
          <h2 className="text-7xl md:text-9xl font-serif italic text-amber-100/90 drop-shadow-lg">
            Golden<br />Hour
          </h2>
        </div>
      </ParallaxSection>

      <footer className="w-full py-12 text-center text-neutral-600 text-xs uppercase tracking-widest border-t border-white/10">
        © 2026 Surf & Sage. All rights reserved.
      </footer>
    </main>
  );
}
