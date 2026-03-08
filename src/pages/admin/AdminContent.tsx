import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "./AdminLayout";

const defaultContent = {
  hero: { tagline: "Visual Storytelling Agency", headline: "Phaedra Films", subtitle: "Where creative vision meets impactful storytelling to elevate every message.", cta_text: "Book a Session" },
  about: { title: "Hi, I'm Fatimah Abdulazeez", bio: "I am a visual storyteller, voice-over artist, and aspiring filmmaker..." },
  contact: { email: "phaedrafilmsproductions@gmail.com", phone: "+234 906 753 8985", instagram: "@phaedrafilms", whatsapp: "2349067538985", location: "Nigeria" },
};

const AdminContent = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "contact">("hero");

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
      setForm(content[activeTab]);
    } else {
      setForm(defaultContent[activeTab]);
    }
  }, [activeTab, content]);

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
    return Object.entries(form).map(([key, value]) => (
      <div key={key}>
        <label className="text-sm font-medium capitalize mb-1.5 block">{key.replace(/_/g, " ")}</label>
        {String(value).length > 100 ? (
          <Textarea value={String(value)} onChange={(e) => setForm({ ...form, [key]: e.target.value })} rows={4} />
        ) : (
          <Input value={String(value)} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
        )}
      </div>
    ));
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
