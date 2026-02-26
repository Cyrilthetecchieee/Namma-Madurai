import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, FileText, BarChart3, Trash2, Sparkles } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Namma Madurai</span>
          </div>

          {/* Right: Auth buttons */}
          <div className="flex items-center gap-2">
            <Link to="/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-accent blur-3xl" />
        </div>

        <div className="container relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-4 w-4 text-accent" />
            Smart Civic Intelligence Platform
          </div>

          {/* Main Heading */}
          <h1 className="mb-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Building a Cleaner,{" "}
            <span className="text-primary">Smarter</span>{" "}
            <span className="text-accent">Madurai</span>
          </h1>

          {/* Subtext */}
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
            Locate public utilities, report cleanliness issues, and support your city using real-time civic intelligence powered by Google technologies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/signin">
              <Button size="lg" className="gap-2 text-base">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="gap-2 text-base">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container">
          <h2 className="mb-10 text-center text-2xl font-bold text-foreground">Platform Features</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-card-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container flex flex-col items-center gap-4 py-8 text-center text-sm text-muted-foreground md:flex-row md:justify-between">
          <p>© 2026 Namma Madurai – Smart Civic Intelligence Platform</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/architecture" className="hover:text-primary transition-colors">
              Architecture
            </Link>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
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
