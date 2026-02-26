import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Shield, Star, Medal } from "lucide-react";
import { mockLeaderboard, badgeColors } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

const badgeIcons: Record<string, typeof Trophy> = {
  "Green Warrior": Shield,
  "Civic Guardian": Award,
  "Street Hero": Star,
  "Segregation Star": Trophy,
};

const UserLeaderboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Civic Leaderboard</h1>
        <p className="text-muted-foreground">
          Top contributors making Madurai cleaner. Keep reporting to climb the ranks!
        </p>
      </div>

      {/* Your Rank Card */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardContent className="flex items-center justify-between py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
              {user?.avatar || "U"}
            </div>
            <div>
              <p className="font-semibold text-foreground">{user?.name || "You"}</p>
              <p className="text-sm text-muted-foreground">Your current ranking</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">#42</p>
              <p className="text-xs text-muted-foreground">Rank</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">320</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Reports</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Podium */}
      <div className="mb-8 flex items-end justify-center gap-4">
        {/* 2nd Place */}
        <div className="flex flex-col items-center">
          <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-xl font-bold text-slate-700">
            {mockLeaderboard[1].avatar}
          </div>
          <div className="flex h-24 w-28 flex-col items-center justify-center rounded-t-lg bg-slate-200">
            <Medal className="h-6 w-6 text-slate-500" />
            <p className="mt-1 text-sm font-semibold">{mockLeaderboard[1].name.split(" ")[0]}</p>
            <p className="text-xs text-muted-foreground">{mockLeaderboard[1].points} pts</p>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center">
          <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-2xl font-bold text-accent-foreground">
            {mockLeaderboard[0].avatar}
          </div>
          <div className="flex h-32 w-32 flex-col items-center justify-center rounded-t-lg bg-accent">
            <Trophy className="h-8 w-8 text-accent-foreground" />
            <p className="mt-1 font-semibold text-accent-foreground">{mockLeaderboard[0].name.split(" ")[0]}</p>
            <p className="text-sm text-accent-foreground/80">{mockLeaderboard[0].points} pts</p>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center">
          <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-800">
            {mockLeaderboard[2].avatar}
          </div>
          <div className="flex h-20 w-28 flex-col items-center justify-center rounded-t-lg bg-amber-100">
            <Medal className="h-5 w-5 text-amber-600" />
            <p className="mt-1 text-sm font-semibold text-amber-800">{mockLeaderboard[2].name.split(" ")[0]}</p>
            <p className="text-xs text-amber-600">{mockLeaderboard[2].points} pts</p>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockLeaderboard.map((user) => {
          const Icon = badgeIcons[user.badge] || Trophy;
          return (
            <Card
              key={user.rank}
              className={`transition-all hover:shadow-md ${user.rank <= 3 ? "border-accent/30" : ""}`}
            >
              <CardContent className="pt-6">
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${
                      user.rank === 1
                        ? "bg-accent text-accent-foreground"
                        : user.rank === 2
                        ? "bg-slate-200 text-slate-700"
                        : user.rank === 3
                        ? "bg-amber-100 text-amber-800"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">Rank #{user.rank}</p>
                  </div>
                </div>
                <div className="mb-3 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-accent" />
                  <Badge className={badgeColors[user.badge]}>{user.badge}</Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Points</span>
                    <span className="font-semibold text-foreground">{user.points.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reports</span>
                    <span className="font-semibold text-foreground">{user.reports}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UserLeaderboard;
