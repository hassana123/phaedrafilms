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

const AdminTestimonials = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ client_name: "", quote: "", role: "" });

  const { data: items, isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      if (editing) {
        const { error } = await supabase.from("testimonials").update(form).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").insert(form);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast({ title: editing ? "Updated" : "Added" });
      setOpen(false);
      setEditing(null);
      setForm({ client_name: "", quote: "", role: "" });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast({ title: "Deleted" });
    },
  });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold">Testimonials</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setEditing(null); setForm({ client_name: "", quote: "", role: "" }); } }}>
          <DialogTrigger asChild>
            <Button className="rounded-full"><Plus size={16} className="mr-2" /> Add Testimonial</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Testimonial</DialogTitle></DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); save.mutate(); }} className="space-y-4">
              <Input placeholder="Client Name" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} required />
              <Input placeholder="Role / Title" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
              <Textarea placeholder="Quote" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} required />
              <Button type="submit" className="w-full">{editing ? "Update" : "Add"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? <p>Loading...</p> : items?.length === 0 ? <p className="text-muted-foreground">No testimonials yet.</p> : (
        <div className="space-y-4">
          {items?.map((item) => (
            <div key={item.id} className="bg-card rounded-xl p-6 shadow-sm">
              <p className="italic text-sm mb-3">"{item.quote}"</p>
              <p className="font-semibold text-sm">— {item.client_name}{item.role && <span className="text-muted-foreground font-normal">, {item.role}</span>}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" onClick={() => { setEditing(item); setForm({ client_name: item.client_name, quote: item.quote, role: item.role || "" }); setOpen(true); }}><Edit size={14} /></Button>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove.mutate(item.id)}><Trash2 size={14} /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminTestimonials;
