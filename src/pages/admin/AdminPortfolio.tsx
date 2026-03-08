import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AdminLayout from "./AdminLayout";

const AdminPortfolio = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: "", description: "", category: "brand", video_url: "", thumbnail_url: "" });

  const { data: items, isLoading } = useQuery({
    queryKey: ["admin-portfolio"],
    queryFn: async () => {
      const { data, error } = await supabase.from("portfolio_items").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      if (editing) {
        const { error } = await supabase.from("portfolio_items").update(form).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("portfolio_items").insert(form);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      toast({ title: editing ? "Updated" : "Added" });
      setOpen(false);
      setEditing(null);
      setForm({ title: "", description: "", category: "brand", video_url: "", thumbnail_url: "" });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      toast({ title: "Deleted" });
    },
  });

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description || "", category: item.category, video_url: item.video_url || "", thumbnail_url: item.thumbnail_url || "" });
    setOpen(true);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold">Portfolio</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setEditing(null); setForm({ title: "", description: "", category: "brand", video_url: "", thumbnail_url: "" }); } }}>
          <DialogTrigger asChild>
            <Button className="rounded-full"><Plus size={16} className="mr-2" /> Add Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Portfolio Item</DialogTitle></DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); save.mutate(); }} className="space-y-4">
              <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-md border px-3 py-2 text-sm"
              >
                <option value="brand">Brand Videos</option>
                <option value="event">Event Highlights</option>
                <option value="short">Short Form</option>
              </select>
              <Input placeholder="Video URL" value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} />
              <Input placeholder="Thumbnail URL" value={form.thumbnail_url} onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })} />
              <Button type="submit" className="w-full">{editing ? "Update" : "Add"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? <p>Loading...</p> : items?.length === 0 ? <p className="text-muted-foreground">No portfolio items yet.</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items?.map((item) => (
            <div key={item.id} className="bg-card rounded-xl p-4 shadow-sm">
              {item.thumbnail_url && <img src={item.thumbnail_url} alt={item.title} className="w-full h-40 object-cover rounded-lg mb-3" />}
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" onClick={() => openEdit(item)}><Edit size={14} /></Button>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove.mutate(item.id)}><Trash2 size={14} /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminPortfolio;
