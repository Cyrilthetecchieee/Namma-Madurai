import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, UserPlus, CheckCircle, Clock, MapPin, Phone } from "lucide-react";

const workers = [
  { id: "W-001", name: "Rajan Kumar", phone: "+91 98765 43210", zone: "Anna Nagar", status: "Available", tasksToday: 5, tasksCompleted: 4 },
  { id: "W-002", name: "Murugan S", phone: "+91 98765 43211", zone: "KK Nagar", status: "Busy", tasksToday: 6, tasksCompleted: 3 },
  { id: "W-003", name: "Selvi M", phone: "+91 98765 43212", zone: "Vilakkuthoon", status: "Available", tasksToday: 4, tasksCompleted: 4 },
  { id: "W-004", name: "Pandian R", phone: "+91 98765 43213", zone: "Teppakulam", status: "On Leave", tasksToday: 0, tasksCompleted: 0 },
  { id: "W-005", name: "Lakshmi D", phone: "+91 98765 43214", zone: "Sellur", status: "Busy", tasksToday: 7, tasksCompleted: 5 },
  { id: "W-006", name: "Velu N", phone: "+91 98765 43215", zone: "Tallakulam", status: "Available", tasksToday: 3, tasksCompleted: 3 },
];

const statusColors: Record<string, string> = {
  Available: "bg-primary text-primary-foreground",
  Busy: "bg-accent text-accent-foreground",
  "On Leave": "bg-muted text-muted-foreground",
};

const AdminWorkers = () => {
  const availableCount = workers.filter((w) => w.status === "Available").length;
  const busyCount = workers.filter((w) => w.status === "Busy").length;
  const totalTasks = workers.reduce((acc, w) => acc + w.tasksToday, 0);
  const completedTasks = workers.reduce((acc, w) => acc + w.tasksCompleted, 0);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Assign Workers</h1>
          <p className="text-muted-foreground">Manage field workers and task assignments</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Worker
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{workers.length}</p>
              <p className="text-sm text-muted-foreground">Total Workers</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{availableCount}</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{busyCount}</p>
              <p className="text-sm text-muted-foreground">Currently Busy</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{completedTasks}/{totalTasks}</p>
              <p className="text-sm text-muted-foreground">Tasks Today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Field Workers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Worker</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tasks</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {worker.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{worker.name}</p>
                        <p className="text-xs text-muted-foreground">{worker.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      {worker.zone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      {worker.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[worker.status]}>{worker.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{
                            width: worker.tasksToday > 0 ? `${(worker.tasksCompleted / worker.tasksToday) * 100}%` : "0%",
                          }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {worker.tasksCompleted}/{worker.tasksToday}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      {worker.status === "Available" && (
                        <Button size="sm">Assign Task</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminWorkers;
