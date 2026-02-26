import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Filter, Eye, UserPlus, CheckCircle, MapPin, Clock } from "lucide-react";
import { mockAdminReports } from "@/data/mockData";

const statusColors: Record<string, string> = {
  Pending: "bg-accent text-accent-foreground",
  "In Progress": "bg-primary text-primary-foreground",
  Resolved: "bg-muted text-foreground",
};

const severityVariants: Record<string, "destructive" | "default" | "secondary"> = {
  High: "destructive",
  Medium: "default",
  Low: "secondary",
};

const AdminReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<typeof mockAdminReports[0] | null>(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const filteredReports = mockAdminReports.filter((report) => {
    const matchesSearch =
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">All Reports</h1>
        <p className="text-muted-foreground">View and manage all citizen reports</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="flex flex-wrap items-center gap-4 pt-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by ID, area, or type..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Reports ({filteredReports.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Waste Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-mono text-sm">{report.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      {report.area}
                    </div>
                  </TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>
                    <Badge variant={severityVariants[report.severity]}>{report.severity}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${statusColors[report.status]}`}>
                      {report.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {report.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => setSelectedReport(report)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Button>
                      {report.status !== "Resolved" && (
                        <Button
                          size="sm"
                          className="gap-1"
                          onClick={() => {
                            setSelectedReport(report);
                            setAssignModalOpen(true);
                          }}
                        >
                          <UserPlus className="h-3.5 w-3.5" />
                          Assign
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Report Modal */}
      <Dialog open={!!selectedReport && !assignModalOpen} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
            <DialogDescription>Report ID: {selectedReport?.id}</DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">Location</Label>
                  <p className="font-medium">{selectedReport.area}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Waste Type</Label>
                  <p className="font-medium">{selectedReport.type}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Severity</Label>
                  <Badge variant={severityVariants[selectedReport.severity]} className="mt-1">
                    {selectedReport.severity}
                  </Badge>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p className={`inline-block mt-1 rounded px-2 py-0.5 text-sm font-medium ${statusColors[selectedReport.status]}`}>
                    {selectedReport.status}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Reporter</Label>
                  <p className="font-medium">{selectedReport.reporter}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <p className="font-medium">{selectedReport.date}</p>
                </div>
              </div>
              {selectedReport.assignedTo && (
                <div>
                  <Label className="text-muted-foreground">Assigned To</Label>
                  <p className="font-medium">{selectedReport.assignedTo}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedReport(null)}>
              Close
            </Button>
            {selectedReport?.status !== "Resolved" && (
              <Button
                onClick={() => setAssignModalOpen(true)}
                className="gap-1"
              >
                <UserPlus className="h-4 w-4" />
                Assign Worker
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Modal */}
      <Dialog open={assignModalOpen} onOpenChange={setAssignModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Worker</DialogTitle>
            <DialogDescription>
              Assign a field worker to handle report {selectedReport?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Select Worker</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose worker" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="worker-a">Worker A - Available</SelectItem>
                  <SelectItem value="worker-b">Worker B - Available</SelectItem>
                  <SelectItem value="worker-c">Worker C - Busy</SelectItem>
                  <SelectItem value="worker-d">Worker D - Available</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Priority</Label>
              <Select defaultValue="normal">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Notes (Optional)</Label>
              <Textarea placeholder="Add any special instructions for the worker..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="gap-1"
              onClick={() => {
                setAssignModalOpen(false);
                setSelectedReport(null);
              }}
            >
              <CheckCircle className="h-4 w-4" />
              Assign & Notify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminReports;
