import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Camera, MapPin, CheckCircle, Upload, Loader2, Sparkles } from "lucide-react";

const UserReportIssue = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketId] = useState(`RPT-${Math.floor(100000 + Math.random() * 900000)}`);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        // Simulate AI detection
        setTimeout(() => {
          setAiSuggestion("Garbage Dump");
          setWasteType("garbage");
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetectLocation = () => {
    // Simulate location detection
    setLocation("Vilakkuthoon Market, Madurai - 625002");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setPhotoPreview(null);
    setAiSuggestion(null);
    setLocation("");
    setWasteType("");
    setSeverity("");
    setDescription("");
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Report an Issue</h1>
          <p className="text-muted-foreground">
            Help keep Madurai clean by reporting civic issues in your area.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
            <CardDescription>
              Fill in the details below to submit your report. Our AI will help classify the waste type.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload */}
              <div>
                <Label className="mb-2 block">Upload Photo</Label>
                <div className="relative">
                  {photoPreview ? (
                    <div className="relative overflow-hidden rounded-lg border">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="h-48 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoPreview(null);
                          setAiSuggestion(null);
                        }}
                        className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-foreground hover:bg-background"
                      >
                        ×
                      </button>
                      {aiSuggestion && (
                        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                          <Sparkles className="h-3 w-3" />
                          AI Detected: {aiSuggestion}
                        </div>
                      )}
                    </div>
                  ) : (
                    <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 transition-colors hover:bg-muted/50">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="mt-2 text-sm text-muted-foreground">
                        Click to upload or drag photo here
                      </span>
                      <span className="mt-1 text-xs text-muted-foreground">
                        AI will auto-detect waste type
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <Label className="mb-2 block">Location</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Auto-detected location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="shrink-0 gap-2"
                    onClick={handleDetectLocation}
                  >
                    <MapPin className="h-4 w-4" />
                    Detect
                  </Button>
                </div>
              </div>

              {/* Waste Type */}
              <div>
                <Label className="mb-2 block">
                  Waste Type
                  {aiSuggestion && (
                    <span className="ml-2 text-xs font-normal text-primary">
                      (AI suggested: {aiSuggestion})
                    </span>
                  )}
                </Label>
                <Select value={wasteType} onValueChange={setWasteType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select waste type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="garbage">Garbage Dump</SelectItem>
                    <SelectItem value="overflow">Overflowing Bin</SelectItem>
                    <SelectItem value="street">Street Waste</SelectItem>
                    <SelectItem value="hazardous">Hazardous Waste</SelectItem>
                    <SelectItem value="ewaste">E-Waste</SelectItem>
                    <SelectItem value="construction">Construction Debris</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Severity */}
              <div>
                <Label className="mb-2 block">Severity Level</Label>
                <Select value={severity} onValueChange={setSeverity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Minor issue</SelectItem>
                    <SelectItem value="medium">Medium - Needs attention</SelectItem>
                    <SelectItem value="high">High - Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description (Optional) */}
              <div>
                <Label className="mb-2 block">Additional Details (Optional)</Label>
                <Textarea
                  placeholder="Describe the issue or add any relevant information..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full gap-2"
                size="lg"
                disabled={isSubmitting || !wasteType || !severity}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4" />
                    Submit Report
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Success Modal */}
      <Dialog open={submitted} onOpenChange={setSubmitted}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <DialogTitle className="text-center text-xl">Report Submitted Successfully</DialogTitle>
            <DialogDescription className="text-center">
              Your report has been successfully submitted. Together, we're building a cleaner Madurai.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 rounded-lg bg-muted p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ticket ID</span>
              <span className="font-mono font-medium">{ticketId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Resolution</span>
              <span className="font-medium">24–48 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-accent">Pending Assignment</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={resetForm}>
              Submit Another
            </Button>
            <Button className="flex-1" onClick={() => setSubmitted(false)}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserReportIssue;
