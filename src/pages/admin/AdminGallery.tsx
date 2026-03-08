import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AdminLayout from "./AdminLayout";

const AdminGallery = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: images, isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery_images").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `gallery/${Date.now()}.${ext}`;
    const { error: uploadErr } = await supabase.storage.from("media").upload(path, file);
    if (uploadErr) { toast({ title: "Upload failed", variant: "destructive" }); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
    const { error } = await supabase.from("gallery_images").insert({ image_url: publicUrl, caption });
    if (error) { toast({ title: "Save failed", variant: "destructive" }); setUploading(false); return; }
    queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
    toast({ title: "Image added" });
    setOpen(false);
    setCaption("");
    setFile(null);
    setUploading(false);
  };

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gallery_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      toast({ title: "Deleted" });
    },
  });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold">Gallery</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full"><Plus size={16} className="mr-2" /> Upload Image</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Upload Image</DialogTitle></DialogHeader>
            <form onSubmit={upload} className="space-y-4">
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required className="text-sm" />
              <Input placeholder="Caption (optional)" value={caption} onChange={(e) => setCaption(e.target.value)} />
              <Button type="submit" className="w-full" disabled={uploading}>{uploading ? "Uploading..." : "Upload"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? <p>Loading...</p> : images?.length === 0 ? <p className="text-muted-foreground">No images yet.</p> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images?.map((img) => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden">
              <img src={img.image_url} alt={img.caption || ""} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button size="sm" variant="destructive" onClick={() => remove.mutate(img.id)}><Trash2 size={14} /></Button>
              </div>
              {img.caption && <p className="text-xs text-muted-foreground p-2">{img.caption}</p>}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminGallery;
