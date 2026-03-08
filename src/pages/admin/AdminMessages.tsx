import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "./AdminLayout";

const AdminMessages = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      queryClient.invalidateQueries({ queryKey: ["unread-messages-count"] });
      queryClient.invalidateQueries({ queryKey: ["dash-unread"] });
    },
  });

  const deleteMsg = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_messages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      queryClient.invalidateQueries({ queryKey: ["unread-messages-count"] });
      queryClient.invalidateQueries({ queryKey: ["dash-unread"] });
      toast({ title: "Message deleted" });
    },
  });

  return (
    <AdminLayout>
      <h1 className="text-3xl font-heading font-bold mb-8">Messages</h1>
      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : messages?.length === 0 ? (
        <p className="text-muted-foreground">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages?.map((msg) => (
            <div
              key={msg.id}
              className={`bg-card rounded-xl p-6 shadow-sm border-l-4 ${
                msg.is_read ? "border-l-muted" : "border-l-primary"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {msg.is_read ? (
                      <MailOpen size={16} className="text-muted-foreground" />
                    ) : (
                      <Mail size={16} className="text-primary" />
                    )}
                    <span className="font-semibold">{msg.name}</span>
                    {!msg.is_read && (
                      <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{msg.email}</p>
                  <p className="text-sm mt-2 whitespace-pre-wrap">{msg.message}</p>
                  <p className="text-xs text-muted-foreground mt-3">
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {!msg.is_read && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markRead.mutate(msg.id)}
                      className="text-xs"
                    >
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteMsg.mutate(msg.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMessages;
