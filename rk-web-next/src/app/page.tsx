import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section Placeholder */}
      <section className="h-screen flex items-center justify-center bg-black">
        <h1 className="text-6xl font-heading font-bold text-white">
          Migración <span className="text-primary">Next.js</span> en progreso
        </h1>
      </section>

      <Footer />
    </main>
  );
}
