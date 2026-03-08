import { useState } from "react";
import { Navigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LayoutDashboard, Image, Mail, Star, Settings, LogOut, MessageSquare, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/phaedra_films_logo.png";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/messages", icon: Mail, label: "Messages" },
  { to: "/admin/portfolio", icon: Image, label: "Portfolio" },
  { to: "/admin/testimonials", icon: Star, label: "Testimonials" },
  { to: "/admin/services", icon: Settings, label: "Services" },
  { to: "/admin/content", icon: MessageSquare, label: "Content" },
  { to: "/admin/account", icon: User, label: "Account" },
];

// Bottom nav items for mobile (max 5)
const bottomNavItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Home" },
  { to: "/admin/messages", icon: Mail, label: "Messages" },
  { to: "/admin/portfolio", icon: Image, label: "Portfolio" },
  { to: "/admin/testimonials", icon: Star, label: "Reviews" },
  { to: "/admin/account", icon: User, label: "Account" },
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
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
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
      {/* Mobile overlay sidebar (for extra items like Services, Content) */}
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

      {/* Mobile top header - with hamburger for full menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-foreground h-14 flex items-center px-4 gap-3">
        <button onClick={() => setSidebarOpen(true)} className="text-background">
          <Menu size={22} />
        </button>
        <img src={logo} alt="Phaedra Films" className="h-7" />
        {unreadCount ? (
          <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
            {unreadCount}
          </span>
        ) : null}
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 pt-18 lg:pt-8 pb-24 lg:pb-8">
        {children}
      </main>

      {/* Mobile bottom navigation bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-foreground border-t border-background/10 flex items-center justify-around h-16 px-1 safe-bottom">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-2 rounded-lg transition-colors relative ${
                isActive ? "text-primary" : "text-background/50"
              }`}
            >
              <div className="relative">
                <item.icon size={20} />
                {item.label === "Messages" && unreadCount ? (
                  <span className="absolute -top-1.5 -right-2 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminLayout;
