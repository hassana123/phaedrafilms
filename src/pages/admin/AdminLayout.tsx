import { useState } from "react";
import { Navigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LayoutDashboard, Image, Briefcase, MessageSquare, Star, Settings, LogOut, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/phaedra_films_logo.png";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/messages", icon: Mail, label: "Messages" },
  { to: "/admin/portfolio", icon: Briefcase, label: "Portfolio" },
  { to: "/admin/gallery", icon: Image, label: "Gallery" },
  { to: "/admin/testimonials", icon: Star, label: "Testimonials" },
  { to: "/admin/services", icon: Settings, label: "Services" },
  { to: "/admin/content", icon: MessageSquare, label: "Site Content" },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: unreadCount } = useQuery({
    queryKey: ["unread-messages-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("contact_messages")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);
      return count ?? 0;
    },
    refetchInterval: 30000,
  });

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;

  const sidebar = (
    <>
      <div className="p-6 border-b border-background/10 flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Phaedra Films" className="h-10" />
        </Link>
        <button className="lg:hidden text-background" onClick={() => setSidebarOpen(false)}>
          <X size={20} />
        </button>
      </div>
      <p className="text-background/50 text-xs px-6 pt-2">Admin Panel</p>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? "bg-primary text-primary-foreground" : "text-background/70 hover:text-background hover:bg-background/10"
              }`}
            >
              <item.icon size={18} />
              {item.label}
              {item.label === "Messages" && unreadCount ? (
                <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-background/10">
        <Button
          variant="ghost"
          onClick={signOut}
          className="w-full justify-start text-background/70 hover:text-background hover:bg-background/10"
        >
          <LogOut size={18} className="mr-3" /> Sign Out
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-foreground h-14 flex items-center px-4 gap-3">
        <button onClick={() => setSidebarOpen(true)} className="text-background">
          <Menu size={24} />
        </button>
        <img src={logo} alt="Phaedra Films" className="h-7" />
        {unreadCount ? (
          <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
            {unreadCount}
          </span>
        ) : null}
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 bg-foreground text-background flex flex-col h-full z-10">
            {sidebar}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-foreground text-background flex-col fixed h-full z-40">
        {sidebar}
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 pt-18 lg:pt-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
