import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, AlertTriangle, CheckCircle, Trash2, MapPin, TrendingUp, Clock } from "lucide-react";
import { mockAreaScores } from "@/data/mockData";

const recentAlerts = [
  { id: 1, message: "Bin #101 reaching 95% capacity", location: "South Masi St", time: "5 min ago", type: "urgent" },
  { id: 2, message: "New report: Garbage dump", location: "Vilakkuthoon", time: "12 min ago", type: "new" },
  { id: 3, message: "Worker assigned to RPT-005", location: "KK Nagar", time: "25 min ago", type: "info" },
  { id: 4, message: "Report RPT-003 resolved", location: "Sellur", time: "1 hour ago", type: "resolved" },
];

const alertStyles: Record<string, string> = {
  urgent: "border-l-destructive bg-destructive/5",
  new: "border-l-accent bg-accent/5",
  info: "border-l-primary bg-primary/5",
  resolved: "border-l-muted-foreground bg-muted/30",
};

const AdminOverview = () => {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Admin Overview</h1>
        <p className="text-muted-foreground">Municipal Administration Dashboard</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-sm text-muted-foreground">Total Reports Today</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <AlertTriangle className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">23</p>
              <p className="text-sm text-muted-foreground">Pending Complaints</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">118</p>
              <p className="text-sm text-muted-foreground">Resolved Issues</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
              <Trash2 className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Active Bin Alerts</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Report Metrics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-5 w-5 text-primary" />
              Reports by Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockAreaScores}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="area" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="reports" fill="hsl(43, 55%, 51%)" radius={[4, 4, 0, 0]} name="Reports" />
                <Bar dataKey="resolved" fill="hsl(125, 54%, 33%)" radius={[4, 4, 0, 0]} name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Live Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-5 w-5 text-accent" />
              Live Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-lg border-l-4 p-3 ${alertStyles[alert.type]}`}
              >
                <p className="text-sm font-medium">{alert.message}</p>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {alert.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Map Placeholder */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MapPin className="h-5 w-5 text-primary" />
            Live Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-lg bg-muted/30">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-primary/30" />
              <p className="mt-2 text-sm text-muted-foreground">
                Live heatmap showing report density across Madurai
              </p>
              <div className="mt-3 flex justify-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-primary" /> Low
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-accent" /> Medium
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-destructive" /> High
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
