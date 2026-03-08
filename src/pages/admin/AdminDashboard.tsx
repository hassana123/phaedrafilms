import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Image, Briefcase, Star } from "lucide-react";
import AdminLayout from "./AdminLayout";

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) => (
  <div className="bg-card rounded-2xl p-6 shadow-sm">
    <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center mb-3`}>
      <Icon size={20} className="text-primary-foreground" />
    </div>
    <p className="text-2xl font-heading font-bold">{value}</p>
    <p className="text-muted-foreground text-sm">{label}</p>
  </div>
);

const AdminDashboard = () => {
  const { data: unread } = useQuery({
    queryKey: ["dash-unread"],
    queryFn: async () => {
      const { count } = await supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false);
      return count ?? 0;
    },
  });

  const { data: portfolio } = useQuery({
    queryKey: ["dash-portfolio"],
    queryFn: async () => {
      const { count } = await supabase.from("portfolio_items").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: gallery } = useQuery({
    queryKey: ["dash-gallery"],
    queryFn: async () => {
      const { count } = await supabase.from("gallery_images").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: testimonials } = useQuery({
    queryKey: ["dash-testimonials"],
    queryFn: async () => {
      const { count } = await supabase.from("testimonials").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  return (
    <AdminLayout>
      <h1 className="text-3xl font-heading font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Mail} label="Unread Messages" value={unread ?? 0} color="bg-primary" />
        <StatCard icon={Briefcase} label="Portfolio Items" value={portfolio ?? 0} color="bg-foreground" />
        <StatCard icon={Image} label="Gallery Images" value={gallery ?? 0} color="bg-foreground" />
        <StatCard icon={Star} label="Testimonials" value={testimonials ?? 0} color="bg-foreground" />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
