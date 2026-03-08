import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "./AdminLayout";

const defaultContent = {
  hero: { tagline: "Visual Storytelling Agency", headline: "Phaedra Films", subtitle: "Where creative vision meets impactful storytelling to elevate every message.", cta_text: "Book a Session", hero_image: "" },
  about: {
    name: "Fatimah Abdulazeez",
    about_description: "Visual storyteller, voice-over artist, and aspiring filmmaker based in Nigeria. I believe stories, when told well, have the power to move people and shape how we see the world.",
    creator_title: "Hi, I'm Fatimah",
    creator_bio: "I am a visual storyteller, voice-over artist, and aspiring filmmaker. I started my journey as a spoken word artist, and over time that love for storytelling grew into scriptwriting, videography, and filmmaking.",
    headshot_image: "",
  },
  contact: { email: "phaedrafilmsproductions@gmail.com", phone: "+234 906 753 8985", instagram: "@phaedrafilms", whatsapp: "2349067538985", location: "Nigeria" },
};

const imageFields = ["hero_image", "headshot_image"];

const AdminContent = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "contact">("hero");
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentImageField, setCurrentImageField] = useState<string>("");

  const { data: content } = useQuery({
    queryKey: ["admin-site-content"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("*");
      if (error) throw error;
      const map: Record<string, any> = {};
      data.forEach((row) => { map[row.section_key] = row.content; });
      return map;
    },
  });

  const [form, setForm] = useState<any>(defaultContent[activeTab]);

  useEffect(() => {
    if (content?.[activeTab]) {
      setForm({ ...defaultContent[activeTab], ...content[activeTab] });
    } else {
      setForm(defaultContent[activeTab]);
    }
  }, [activeTab, content]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldKey: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(fieldKey);
    const fileExt = file.name.split(".").pop();
    const filePath = `site-content/${fieldKey}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage.from("media").upload(filePath, file);
    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      setUploading(null);
      return;
    }

    const { data: urlData } = supabase.storage.from("media").getPublicUrl(filePath);
    setForm((prev: any) => ({ ...prev, [fieldKey]: urlData.publicUrl }));
    setUploading(null);
    toast({ title: "Image uploaded!" });
  };

  const save = useMutation({
    mutationFn: async () => {
      const existing = content?.[activeTab];
      if (existing) {
        const { error } = await supabase.from("site_content").update({ content: form }).eq("section_key", activeTab);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("site_content").insert({ section_key: activeTab, content: form });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-site-content"] });
      queryClient.invalidateQueries({ queryKey: ["site-content-hero"] });
      queryClient.invalidateQueries({ queryKey: ["site-content-about"] });
      toast({ title: "Saved!" });
    },
  });

  const tabs = [
    { key: "hero" as const, label: "Hero Section" },
    { key: "about" as const, label: "About" },
    { key: "contact" as const, label: "Contact Info" },
  ];

  const renderFields = () => {
    if (!form) return null;
    return Object.entries(form).map(([key, value]) => {
      if (imageFields.includes(key)) {
        return (
          <div key={key}>
            <label className="text-sm font-medium capitalize mb-1.5 block">{key.replace(/_/g, " ")}</label>
            <div className="flex items-center gap-4">
              {String(value) && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
                  <img src={String(value)} alt={key} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setForm({ ...form, [key]: "" })}
                    className="absolute top-0.5 right-0.5 bg-background/80 rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={currentImageField === key ? fileInputRef : undefined}
                  onChange={(e) => handleImageUpload(e, key)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  disabled={uploading === key}
                  onClick={() => {
                    setCurrentImageField(key);
                    // Use a fresh file input
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (e) => handleImageUpload(e as any, key);
                    input.click();
                  }}
                >
                  <Upload size={14} className="mr-2" />
                  {uploading === key ? "Uploading..." : "Upload Image"}
                </Button>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div key={key}>
          <label className="text-sm font-medium capitalize mb-1.5 block">{key.replace(/_/g, " ")}</label>
          {String(value).length > 100 ? (
            <Textarea value={String(value)} onChange={(e) => setForm({ ...form, [key]: e.target.value })} rows={4} />
          ) : (
            <Input value={String(value)} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
          )}
        </div>
      );
    });
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-heading font-bold mb-8">Site Content</h1>
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? "default" : "outline"}
            onClick={() => setActiveTab(tab.key)}
            className="rounded-full"
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div className="bg-card rounded-xl p-6 shadow-sm max-w-2xl">
        <div className="space-y-4">
          {renderFields()}
          <Button onClick={() => save.mutate()} className="rounded-full">
            <Save size={16} className="mr-2" /> Save Changes
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminContent;
