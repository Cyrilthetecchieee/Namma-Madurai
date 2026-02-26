import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Thermometer, MapPin, AlertTriangle, TrendingUp, Calendar } from "lucide-react";

const hotspotZones = [
  { name: "Vaigai River Bank - South", reports: 24, severity: "High", trend: "up" },
  { name: "Market Area - Puthu Mandapam", reports: 18, severity: "High", trend: "up" },
  { name: "Teppakulam Lake Side", reports: 15, severity: "Medium", trend: "stable" },
  { name: "Railway Station Approach", reports: 12, severity: "Medium", trend: "down" },
  { name: "Periyar Bus Stand", reports: 10, severity: "Medium", trend: "stable" },
  { name: "Vilakkuthoon Market", reports: 8, severity: "Low", trend: "down" },
];

const severityColors: Record<string, string> = {
  High: "bg-destructive text-destructive-foreground",
  Medium: "bg-accent text-accent-foreground",
  Low: "bg-muted text-foreground",
};

const AdminHeatmap = () => {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Heatmap Intelligence</h1>
          <p className="text-muted-foreground">Visualize report density and identify problem areas</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Custom Range
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Heatmap Visualization */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Thermometer className="h-5 w-5 text-primary" />
              Report Density Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-80 items-center justify-center rounded-lg bg-gradient-to-br from-primary/5 via-accent/10 to-destructive/10">
              <div className="text-center">
                <MapPin className="mx-auto h-16 w-16 text-primary/30" />
                <p className="mt-4 text-lg font-medium text-foreground">Heatmap Visualization</p>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Interactive heatmap showing report concentration across Madurai districts
                </p>
                <div className="mt-4 flex justify-center gap-6 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="h-4 w-4 rounded-full bg-primary" /> Low (&lt;10)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-4 w-4 rounded-full bg-accent" /> Medium (10-20)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-4 w-4 rounded-full bg-destructive" /> High (20+)
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hotspot Zones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-5 w-5 text-accent" />
              Hotspot Zones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {hotspotZones.map((zone) => (
              <div
                key={zone.name}
                className="rounded-lg border p-3 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{zone.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{zone.reports} reports</p>
                  </div>
                  <Badge className={severityColors[zone.severity]}>{zone.severity}</Badge>
                </div>
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <TrendingUp
                    className={`h-3.5 w-3.5 mr-1 ${
                      zone.trend === "up"
                        ? "text-destructive"
                        : zone.trend === "down"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                  {zone.trend === "up" && "Increasing"}
                  {zone.trend === "down" && "Decreasing"}
                  {zone.trend === "stable" && "Stable"}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Zone Details */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Zone Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Hotspots", value: "6", change: "+2 this week" },
              { label: "Critical Zones", value: "2", change: "Needs attention" },
              { label: "Avg Reports/Zone", value: "14", change: "+3 vs last week" },
              { label: "Resolution Rate", value: "78%", change: "Improving" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHeatmap;
