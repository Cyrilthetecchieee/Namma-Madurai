import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, Activity, Bell, Clock, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const recentActivity = [
  {
    id: 1,
    type: "report",
    title: "Garbage dump reported",
    location: "Vilakkuthoon Market",
    time: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    type: "resolved",
    title: "Overflowing bin resolved",
    location: "Anna Nagar Bus Stop",
    time: "5 hours ago",
    status: "resolved",
  },
  {
    id: 3,
    type: "report",
    title: "Street waste reported",
    location: "KK Nagar Main Road",
    time: "1 day ago",
    status: "in-progress",
  },
  {
    id: 4,
    type: "resolved",
    title: "E-waste collected",
    location: "Teppakulam",
    time: "2 days ago",
    status: "resolved",
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-accent text-accent-foreground",
  "in-progress": "bg-primary text-primary-foreground",
  resolved: "bg-muted text-foreground",
};

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 lg:p-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {user?.name?.split(" ")[0] || "Citizen"}!
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your civic contributions and city updates.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">My Reports</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">9</p>
              <p className="text-sm text-muted-foreground">Reports Resolved</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Activity className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">82</p>
              <p className="text-sm text-muted-foreground">City Clean Score</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
              <Bell className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Nearby Alerts</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  {item.type === "resolved" ? (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  ) : (
                    <FileText className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <Badge className={`shrink-0 ${statusColors[item.status]}`}>
                      {item.status === "in-progress" ? "In Progress" : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
