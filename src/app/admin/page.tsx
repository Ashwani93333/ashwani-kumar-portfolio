
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, FileText, MessageSquare, TrendingUp, Users } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Projects", value: "12", icon: FolderKanban, color: "text-blue-400" },
    { label: "Blog Posts", value: "8", icon: FileText, color: "text-purple-400" },
    { label: "Messages", value: "24", icon: MessageSquare, color: "text-emerald-400" },
    { label: "Site Visitors", value: "1.2k", icon: TrendingUp, color: "text-orange-400" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="glass-card border-white/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-400">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs">
                    JD
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground truncate">Interested in collaboration for my new SaaS project...</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground whitespace-nowrap">2h ago</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center p-6 rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all gap-2 group">
              <FolderKanban className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold">New Project</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 rounded-2xl bg-accent/10 border border-accent/20 hover:bg-accent/20 transition-all gap-2 group">
              <FileText className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold">Write Post</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
