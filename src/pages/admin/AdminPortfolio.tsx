import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Edit, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminLayout from "./AdminLayout";

const ITEMS_PER_PAGE = 12;
const categories = ["all", "brand", "event", "short", "photography"];

const AdminPortfolio = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: "", description: "", category: "brand", video_url: "", thumbnail_url: "" });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);
  const [filterCat, setFilterCat] = useState("all");

  const { data: items, isLoading } = useQuery({
    queryKey: ["admin-portfolio"],
    queryFn: async () => {
      const { data, error } = await supabase.from("portfolio_items").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const filtered = items
    ? filterCat === "all"
      ? items
      : items.filter((i) => i.category === filterCat)
    : [];

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let thumbnailUrl = form.thumbnail_url;

    // Upload file if provided
    if (file) {
      const ext = file.name.split(".").pop();
      const path = `portfolio/${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("media").upload(path, file);
      if (uploadErr) {
        toast({ title: "Upload failed", variant: "destructive" });
        setUploading(false);
        return;
      }
      const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
      thumbnailUrl = publicUrl;
    }

    const payload = { ...form, thumbnail_url: thumbnailUrl };

    if (editing) {
      const { error } = await supabase.from("portfolio_items").update(payload).eq("id", editing.id);
      if (error) { toast({ title: "Update failed", variant: "destructive" }); setUploading(false); return; }
    } else {
      const { error } = await supabase.from("portfolio_items").insert(payload);
      if (error) { toast({ title: "Save failed", variant: "destructive" }); setUploading(false); return; }
    }

    queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
    toast({ title: editing ? "Updated" : "Added" });
    resetForm();
    setUploading(false);
  };

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

  const resetForm = () => {
    setOpen(false);
    setEditing(null);
    setForm({ title: "", description: "", category: "brand", video_url: "", thumbnail_url: "" });
    setFile(null);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description || "",
      category: item.category,
      video_url: item.video_url || "",
      thumbnail_url: item.thumbnail_url || "",
    });
    setFile(null);
    setOpen(true);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold">Portfolio</h1>
        <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); else setOpen(true); }}>
          <DialogTrigger asChild>
            <Button className="rounded-full" size="sm">
              <Plus size={16} className="mr-2" /> Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit" : "Add"} Portfolio Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={save} className="space-y-4">
              <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              
              <div>
                <label className="text-sm font-medium mb-1.5 block text-foreground">Category</label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brand">Brand Videos</SelectItem>
                    <SelectItem value="event">Event Highlights</SelectItem>
                    <SelectItem value="short">Short Form</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Input placeholder="Video URL (optional)" value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} />

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground block">Thumbnail</label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 px-4 py-3 border border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-secondary/50">
                    <Upload size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {file ? file.name : "Upload image file"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        setFile(e.target.files?.[0] ?? null);
                        if (e.target.files?.[0]) setForm({ ...form, thumbnail_url: "" });
                      }}
                    />
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="h-px bg-border flex-1" />
                    <span className="text-xs text-muted-foreground">or paste URL</span>
                    <div className="h-px bg-border flex-1" />
                  </div>
                  <Input
                    placeholder="https://..."
                    value={form.thumbnail_url}
                    onChange={(e) => { setForm({ ...form, thumbnail_url: e.target.value }); setFile(null); }}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full rounded-full" disabled={uploading}>
                {uploading ? "Saving..." : editing ? "Update" : "Add Item"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setFilterCat(cat); setPage(1); }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all border ${
              filterCat === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary/50"
            }`}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground">No portfolio items yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginated.map((item) => (
              <div key={item.id} className="bg-card rounded-xl overflow-hidden shadow-sm group">
                {item.thumbnail_url ? (
                  <img src={item.thumbnail_url} alt={item.title} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-secondary flex items-center justify-center text-muted-foreground text-sm">
                    No image
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                  <p className="text-xs text-muted-foreground capitalize mt-0.5">{item.category}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => openEdit(item)} className="flex-1 text-xs">
                      <Edit size={12} className="mr-1" /> Edit
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove.mutate(item.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                size="sm"
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="rounded-full"
              >
                <ChevronLeft size={16} />
              </Button>
              <span className="text-sm text-muted-foreground px-3">
                {page} / {totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="rounded-full"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
};

export default AdminPortfolio;
