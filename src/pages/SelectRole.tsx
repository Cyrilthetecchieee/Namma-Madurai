import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, User, Shield, ArrowRight } from "lucide-react";

const SelectRole = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "signin"; // signin or signup

  const handleRoleSelect = (role: "citizen" | "admin") => {
    // Store the selected role in sessionStorage for use after authentication
    sessionStorage.setItem("pending_role", role);
    
    // Navigate to sign in or sign up based on mode
    if (mode === "signup") {
      navigate("/signup");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      {/* Logo */}
      <Link to="/" className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <MapPin className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold text-foreground">Namma Madurai</span>
      </Link>

      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">How will you use the platform?</CardTitle>
          <CardDescription>
            Select your role to continue to {mode === "signup" ? "create your account" : "sign in"}.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {/* Citizen Role */}
          <button
            onClick={() => handleRoleSelect("citizen")}
            className="group flex flex-col items-center gap-4 rounded-xl border-2 border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-foreground">Citizen</h3>
              <p className="text-sm text-muted-foreground">
                Report issues, explore the map, track cleanliness scores
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-primary">
              Continue as Citizen
              <ArrowRight className="h-4 w-4" />
            </div>
          </button>

          {/* Admin Role */}
          <button
            onClick={() => handleRoleSelect("admin")}
            className="group flex flex-col items-center gap-4 rounded-xl border-2 border-border bg-card p-6 text-center transition-all hover:border-accent hover:shadow-md"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 transition-colors group-hover:bg-accent/20">
              <Shield className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-foreground">Administrator</h3>
              <p className="text-sm text-muted-foreground">
                Manage reports, monitor bins, assign workers, view analytics
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-accent">
              Continue as Admin
              <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <Link to="/select-role?mode=signin" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <Link to="/select-role?mode=signup" className="font-medium text-primary hover:underline">
              Create one
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

export default SelectRole;
