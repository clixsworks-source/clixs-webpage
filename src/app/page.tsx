import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-brand-blue selection:bg-white selection:text-brand-blue">
        <Navbar />
        <Hero />
      </main>
    </SmoothScroll>
  );
}
