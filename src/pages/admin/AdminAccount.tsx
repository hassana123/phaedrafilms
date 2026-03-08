import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { User, Lock } from "lucide-react";
import AdminLayout from "./AdminLayout";

const AdminAccount = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    setEmailLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Confirmation sent", description: "Check your new email to confirm the change." });
      setNewEmail("");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    if (newPassword.length < 8) {
      toast({ title: "Password must be at least 8 characters", variant: "destructive" });
      return;
    }
    setPwLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPwLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password updated!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-heading font-bold mb-8">Account Settings</h1>

      <div className="max-w-lg space-y-8">
        {/* Current Info */}
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-1">Current email</p>
          <p className="font-medium">{user?.email}</p>
        </div>

        {/* Change Email */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-primary" />
            <h2 className="text-lg font-heading font-semibold">Change Email</h2>
          </div>
          <form onSubmit={handleEmailChange} className="space-y-4">
            <Input type="email" placeholder="New email address" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required className="bg-secondary border-border" />
            <Button type="submit" className="rounded-full" disabled={emailLoading}>
              {emailLoading ? "Updating..." : "Update Email"}
            </Button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={18} className="text-primary" />
            <h2 className="text-lg font-heading font-semibold">Change Password</h2>
          </div>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <Input type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} className="bg-secondary border-border" />
            <Input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="bg-secondary border-border" />
            <Button type="submit" className="rounded-full" disabled={pwLoading}>
              {pwLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAccount;
