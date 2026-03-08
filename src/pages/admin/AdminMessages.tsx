import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MailOpen, Trash2, Eye, Reply, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "./AdminLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MESSAGES_PER_PAGE = 8;

const AdminMessages = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [page, setPage] = useState(1);
  const [viewMsg, setViewMsg] = useState<any>(null);

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

  const filtered = messages?.filter((msg) => {
    if (filter === "unread") return !msg.is_read;
    if (filter === "read") return msg.is_read;
    return true;
  }) ?? [];

  const totalPages = Math.max(1, Math.ceil(filtered.length / MESSAGES_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * MESSAGES_PER_PAGE, safePage * MESSAGES_PER_PAGE);

  const handleView = (msg: any) => {
    setViewMsg(msg);
    if (!msg.is_read) markRead.mutate(msg.id);
  };

  const handleReply = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-heading font-bold mb-6">Messages</h1>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6">
        <Filter size={16} className="text-muted-foreground" />
        {(["all", "unread", "read"] as const).map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "outline"}
            onClick={() => { setFilter(f); setPage(1); }}
            className="rounded-full capitalize text-xs"
          >
            {f}
            {f === "unread" && messages && (
              <span className="ml-1.5 bg-primary-foreground/20 text-primary-foreground px-1.5 py-0.5 rounded-full text-[10px]">
                {messages.filter(m => !m.is_read).length}
              </span>
            )}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground">No {filter !== "all" ? filter : ""} messages.</p>
      ) : (
        <>
          <div className="space-y-3">
            {paginated.map((msg) => (
              <div
                key={msg.id}
                className={`bg-card rounded-xl p-5 shadow-sm border-l-4 ${
                  msg.is_read ? "border-l-muted" : "border-l-primary"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {msg.is_read ? (
                        <MailOpen size={16} className="text-muted-foreground shrink-0" />
                      ) : (
                        <Mail size={16} className="text-primary shrink-0" />
                      )}
                      <span className="font-semibold truncate">{msg.name}</span>
                      {!msg.is_read && (
                        <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">NEW</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1 truncate">{msg.email}</p>
                    <p className="text-sm mt-1 line-clamp-2 text-foreground/70">{msg.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(msg.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleView(msg)}
                      title="View details"
                      className="h-8 w-8 p-0"
                    >
                      <Eye size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReply(msg.email)}
                      title="Reply via email"
                      className="h-8 w-8 p-0"
                    >
                      <Reply size={14} />
                    </Button>
                    {!msg.is_read && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markRead.mutate(msg.id)}
                        title="Mark as read"
                        className="h-8 w-8 p-0"
                      >
                        <MailOpen size={14} />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteMsg.mutate(msg.id)}
                      title="Delete"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <Button
                size="sm"
                variant="outline"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft size={16} />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {safePage} of {totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="h-8 w-8 p-0"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </>
      )}

      {/* View Details Dialog */}
      <Dialog open={!!viewMsg} onOpenChange={(open) => !open && setViewMsg(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">Message from {viewMsg?.name}</DialogTitle>
          </DialogHeader>
          {viewMsg && (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm">{viewMsg.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">Date</p>
                <p className="text-sm">{new Date(viewMsg.created_at).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">Message</p>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{viewMsg.message}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={() => handleReply(viewMsg.email)} className="rounded-full" size="sm">
                  <Reply size={14} className="mr-1.5" /> Reply via Email
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="rounded-full"
                  onClick={() => { deleteMsg.mutate(viewMsg.id); setViewMsg(null); }}
                >
                  <Trash2 size={14} className="mr-1.5" /> Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminMessages;
