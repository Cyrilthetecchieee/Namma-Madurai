import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { MapPin, Trash2, AlertTriangle, Thermometer, Star, Navigation } from "lucide-react";
import { mockToilets, mockBins, mockHotspots } from "@/data/mockData";

const fillColor: Record<string, string> = { Low: "bg-primary", Medium: "bg-accent", Full: "bg-destructive" };
const severityColor: Record<string, string> = { Low: "bg-primary", Medium: "bg-accent", High: "bg-destructive" };

const UserSmartMap = () => {
  const [heatmap, setHeatmap] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<{
    type: string;
    data: typeof mockToilets[0] | typeof mockBins[0] | typeof mockHotspots[0];
  } | null>(null);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
      {/* Left Panel - Filters */}
      <aside className="w-full shrink-0 overflow-y-auto border-b bg-background p-4 lg:w-80 lg:border-b-0 lg:border-r">
        <h2 className="mb-4 text-lg font-bold text-foreground">Civic Filters</h2>

        <Accordion type="multiple" defaultValue={["toilets"]} className="space-y-1">
          <AccordionItem value="toilets" className="border-none">
            <AccordionTrigger className="rounded-lg bg-muted/50 px-3 py-2 text-sm font-semibold hover:no-underline">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Public Toilets
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-1 pt-2">
              <div className="space-y-2">
                {mockToilets.map((t) => (
                  <Card
                    key={t.id}
                    className="cursor-pointer p-3 transition-colors hover:bg-muted/30"
                    onClick={() => setSelectedMarker({ type: "toilet", data: t })}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium">{t.name}</p>
                      <Badge variant={t.open ? "default" : "secondary"} className="text-xs">
                        {t.open ? "Open" : "Closed"}
                      </Badge>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-accent" />
                        {t.rating}
                      </span>
                      <span>{t.distance}</span>
                      <span>{t.cleanliness}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="bins" className="border-none">
            <AccordionTrigger className="rounded-lg bg-muted/50 px-3 py-2 text-sm font-semibold hover:no-underline">
              <span className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-primary" /> Garbage Bins
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-1 pt-2">
              <div className="space-y-2">
                {mockBins.map((b) => (
                  <Card
                    key={b.id}
                    className="cursor-pointer p-3 transition-colors hover:bg-muted/30"
                    onClick={() => setSelectedMarker({ type: "bin", data: b })}
                  >
                    <p className="text-sm font-medium">{b.name}</p>
                    <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className={`inline-block h-2 w-2 rounded-full ${fillColor[b.fill]}`} />
                      <span>{b.fill}</span>
                      {b.smart && (
                        <Badge variant="outline" className="text-xs">
                          IoT
                        </Badge>
                      )}
                      <span>{b.distance}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="hotspots" className="border-none">
            <AccordionTrigger className="rounded-lg bg-muted/50 px-3 py-2 text-sm font-semibold hover:no-underline">
              <span className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-accent" /> Waste Hotspots
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-1 pt-2">
              <div className="space-y-2">
                {mockHotspots.map((h) => (
                  <Card
                    key={h.id}
                    className="cursor-pointer p-3 transition-colors hover:bg-muted/30"
                    onClick={() => setSelectedMarker({ type: "hotspot", data: h })}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium">{h.name}</p>
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-xs text-primary-foreground ${severityColor[h.severity]}`}
                      >
                        {h.severity}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{h.reports} reports</p>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Heatmap Toggle */}
        <div className="mt-4 flex items-center justify-between rounded-lg border bg-card p-3">
          <span className="flex items-center gap-2 text-sm font-medium">
            <Thermometer className="h-4 w-4 text-primary" /> Heatmap View
          </span>
          <Switch checked={heatmap} onCheckedChange={setHeatmap} />
        </div>

        {/* Legend */}
        <div className="mt-4 rounded-lg border bg-card p-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Legend</p>
          <div className="flex flex-wrap gap-2">
            <Badge>
              <MapPin className="mr-1 h-3 w-3" /> Toilets
            </Badge>
            <Badge variant="secondary">
              <Trash2 className="mr-1 h-3 w-3" /> Bins
            </Badge>
            <Badge variant="outline">
              <AlertTriangle className="mr-1 h-3 w-3" /> Hotspots
            </Badge>
          </div>
        </div>
      </aside>

      {/* Map Area */}
      <main className="relative flex flex-1 items-center justify-center bg-muted/20">
        {/* Placeholder for Google Maps */}
        <div className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <MapPin className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Google Maps Integration</h3>
          <p className="max-w-md text-sm text-muted-foreground">
            Interactive map will display here with markers for toilets, bins, and hotspots.
            {heatmap && " Heatmap overlay is enabled."}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge>4 Toilets</Badge>
            <Badge variant="secondary">4 Bins</Badge>
            <Badge variant="outline">3 Hotspots</Badge>
          </div>
        </div>

        {/* Selected Marker Popup */}
        {selectedMarker && (
          <div className="absolute bottom-6 left-1/2 w-80 -translate-x-1/2 rounded-xl border bg-card p-4 shadow-lg">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2">
                {selectedMarker.type === "toilet" && <MapPin className="h-5 w-5 text-primary" />}
                {selectedMarker.type === "bin" && <Trash2 className="h-5 w-5 text-primary" />}
                {selectedMarker.type === "hotspot" && <AlertTriangle className="h-5 w-5 text-accent" />}
                <h4 className="font-semibold">{selectedMarker.data.name}</h4>
              </div>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setSelectedMarker(null)}
              >
                ×
              </button>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              {"rating" in selectedMarker.data && (
                <p className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-accent" />
                  Rating: {selectedMarker.data.rating}
                </p>
              )}
              {"distance" in selectedMarker.data && (
                <p className="flex items-center gap-1">
                  <Navigation className="h-4 w-4" />
                  Distance: {selectedMarker.data.distance}
                </p>
              )}
              {"cleanliness" in selectedMarker.data && (
                <p>Cleanliness: {selectedMarker.data.cleanliness}</p>
              )}
              {"fill" in selectedMarker.data && <p>Fill Level: {selectedMarker.data.fill}</p>}
              {"severity" in selectedMarker.data && <p>Severity: {selectedMarker.data.severity}</p>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserSmartMap;
