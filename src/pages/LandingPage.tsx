import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, FileText, BarChart3, Trash2, Sparkles } from "lucide-react";
import { ScrollHero } from "@/components/ScrollHero";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#050510]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050510]/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-[0_0_15px_rgba(76,175,80,0.4)]">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-white">Namma Madurai</span>
          </div>

          {/* Right: Auth buttons */}
          <div className="flex items-center gap-2">
            <Link to="/select-role?mode=signin">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link to="/select-role?mode=signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(76,175,80,0.4)] border border-white/10">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <ScrollHero />

      {/* Features Preview Section */}
      <section className="border-t border-white/10 bg-[#050510] py-24 relative overflow-hidden">
        {/* Decorative elements for transition */}
        <div className="absolute top-0 left-1/2 w-3/4 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute top-0 left-1/2 w-1/4 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

        <div className="container relative z-10">
          <h2 className="mb-16 text-center text-3xl font-bold text-white tracking-tight">Platform Features</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: MapPin,
                title: "Smart Civic Map",
                desc: "Interactive map to locate public utilities across the city",
              },
              {
                icon: FileText,
                title: "AI Waste Reporting",
                desc: "Report civic issues with AI-powered waste classification",
              },
              {
                icon: BarChart3,
                title: "Clean Score Dashboard",
                desc: "Track area-wise cleanliness with real-time analytics",
              },
              {
                icon: Trash2,
                title: "Smart Bin Monitoring",
                desc: "IoT-enabled bins with real-time fill level tracking",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-primary/30"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary transition-colors group-hover:bg-primary/30 group-hover:shadow-[0_0_15px_rgba(76,175,80,0.5)]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#020205]">
        <div className="container flex flex-col items-center gap-6 py-12 text-center text-sm text-white/50 md:flex-row md:justify-between">
          <p>© 2026 Namma Madurai – Smart Civic Intelligence Platform</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/architecture" className="hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(76,175,80,0.8)]">
              Architecture
            </Link>
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Powered by Google Cloud
            </span>
            <span>Smart City Initiative</span>
            <span>Hackathon Project</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
