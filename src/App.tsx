import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Public pages
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SelectRole from "./pages/SelectRole";
import Architecture from "./pages/Architecture";
import NotFound from "./pages/NotFound";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// User pages
import UserDashboard from "./pages/user/UserDashboard";
import UserSmartMap from "./pages/user/UserSmartMap";
import UserReportIssue from "./pages/user/UserReportIssue";
import UserCleanScore from "./pages/user/UserCleanScore";
import UserLeaderboard from "./pages/user/UserLeaderboard";
import UserAssistant from "./pages/user/UserAssistant";
import UserProfile from "./pages/user/UserProfile";

// Admin pages
import AdminOverview from "./pages/admin/AdminOverview";
import AdminReports from "./pages/admin/AdminReports";
import AdminBins from "./pages/admin/AdminBins";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminWorkers from "./pages/admin/AdminWorkers";
import AdminHeatmap from "./pages/admin/AdminHeatmap";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: "citizen" | "admin" }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (!user?.role) {
    return <Navigate to="/select-role" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/user"} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/select-role" element={<SelectRole />} />
      <Route path="/architecture" element={<Architecture />} />

      {/* User routes */}
      <Route
        path="/user"
        element={
          <ProtectedRoute requiredRole="citizen">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="map" element={<UserSmartMap />} />
        <Route path="report" element={<UserReportIssue />} />
        <Route path="clean-score" element={<UserCleanScore />} />
        <Route path="leaderboard" element={<UserLeaderboard />} />
        <Route path="assistant" element={<UserAssistant />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="bins" element={<AdminBins />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="workers" element={<AdminWorkers />} />
        <Route path="heatmap" element={<AdminHeatmap />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
