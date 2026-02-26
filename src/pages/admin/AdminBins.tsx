import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trash2, AlertTriangle, CheckCircle, RefreshCw, MapPin, Clock, Wifi } from "lucide-react";

const allBins = [
  { id: "BIN-101", location: "South Masi St", fill: 95, lastCollected: "2 hours ago", status: "Critical", smart: true, lat: 9.9180, lng: 78.1200 },
  { id: "BIN-102", location: "East Veli St", fill: 45, lastCollected: "6 hours ago", status: "Normal", smart: true, lat: 9.9205, lng: 78.1240 },
  { id: "BIN-103", location: "Vilakkuthoon", fill: 88, lastCollected: "5 hours ago", status: "Warning", smart: false, lat: 9.9230, lng: 78.1180 },
  { id: "BIN-104", location: "Tallakulam", fill: 23, lastCollected: "1 hour ago", status: "Normal", smart: true, lat: 9.9270, lng: 78.1130 },
  { id: "BIN-105", location: "Anna Nagar Main", fill: 67, lastCollected: "4 hours ago", status: "Warning", smart: true, lat: 9.9250, lng: 78.1150 },
  { id: "BIN-106", location: "KK Nagar Circle", fill: 12, lastCollected: "30 min ago", status: "Normal", smart: true, lat: 9.9300, lng: 78.1100 },
  { id: "BIN-107", location: "Teppakulam", fill: 92, lastCollected: "3 hours ago", status: "Critical", smart: true, lat: 9.9350, lng: 78.1050 },
  { id: "BIN-108", location: "Sellur Junction", fill: 55, lastCollected: "2 hours ago", status: "Normal", smart: false, lat: 9.9400, lng: 78.1000 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Critical":
      return "text-destructive";
    case "Warning":
      return "text-accent";
    default:
      return "text-primary";
  }
};

const getProgressColor = (fill: number) => {
  if (fill >= 90) return "bg-destructive";
  if (fill >= 70) return "bg-accent";
  return "bg-primary";
};

const AdminBins = () => {
  const criticalCount = allBins.filter((b) => b.status === "Critical").length;
  const warningCount = allBins.filter((b) => b.status === "Warning").length;
  const normalCount = allBins.filter((b) => b.status === "Normal").length;
  const smartCount = allBins.filter((b) => b.smart).length;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Smart Bin Monitor</h1>
          <p className="text-muted-foreground">Real-time IoT bin monitoring across Madurai</p>
        </div>
        <Button className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{criticalCount}</p>
              <p className="text-sm text-muted-foreground">Critical (90%+)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Trash2 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{warningCount}</p>
              <p className="text-sm text-muted-foreground">Warning (70-90%)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{normalCount}</p>
              <p className="text-sm text-muted-foreground">Normal (&lt;70%)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Wifi className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{smartCount}</p>
              <p className="text-sm text-muted-foreground">IoT Enabled</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bin Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allBins
          .sort((a, b) => b.fill - a.fill)
          .map((bin) => (
            <Card
              key={bin.id}
              className={`transition-all hover:shadow-md ${
                bin.status === "Critical" ? "border-destructive/50" : bin.status === "Warning" ? "border-accent/50" : ""
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{bin.id}</CardTitle>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {bin.location}
                    </p>
                  </div>
                  <Badge
                    variant={bin.status === "Critical" ? "destructive" : bin.status === "Warning" ? "default" : "secondary"}
                  >
                    {bin.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Fill Level */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Fill Level</span>
                    <span className={`font-semibold ${getStatusColor(bin.status)}`}>{bin.fill}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${getProgressColor(bin.fill)}`}
                      style={{ width: `${bin.fill}%` }}
                    />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {bin.lastCollected}
                  </span>
                  {bin.smart && (
                    <span className="flex items-center gap-1 text-primary">
                      <Wifi className="h-3 w-3" />
                      IoT
                    </span>
                  )}
                </div>

                {/* Action */}
                {bin.status === "Critical" && (
                  <Button size="sm" className="mt-4 w-full gap-1">
                    <Trash2 className="h-3.5 w-3.5" />
                    Schedule Collection
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default AdminBins;
