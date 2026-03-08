import { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/phaedra_films_logo.png";

const AdminLogin = () => {
  const { user, isAdmin, loading, signIn } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  if (loading) return <div className="min-h-screen bg-foreground flex items-center justify-center"><div className="text-background">Loading...</div></div>;
  if (user && isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error } = await signIn(email, password);
    if (error) setError(error.message);
    setSubmitting(false);
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setSubmitting(false);
    if (error) {
      setError(error.message);
    } else {
      setResetSent(true);
      toast({ title: "Reset link sent", description: "Check your email for a password reset link." });
    }
  };

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <img src={logo} alt="Phaedra Films" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-heading font-bold text-background">
            {forgotMode ? "Reset Password" : "Admin Login"}
          </h1>
        </div>

        {forgotMode ? (
          resetSent ? (
            <div className="text-center space-y-4">
              <p className="text-background/70 text-sm">A reset link has been sent to <span className="text-background font-medium">{email}</span>. Check your inbox.</p>
              <Button variant="ghost" onClick={() => { setForgotMode(false); setResetSent(false); }} className="text-background/60 hover:text-background">
                <ArrowLeft className="mr-2" size={16} /> Back to login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleForgot} className="space-y-4">
              {error && <p className="text-sm text-red-400 text-center">{error}</p>}
              <p className="text-background/60 text-sm text-center">Enter your email and we'll send a reset link.</p>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button type="submit" className="w-full rounded-full" disabled={submitting}>
                {submitting ? "Sending..." : "Send Reset Link"}
              </Button>
              <Button variant="ghost" type="button" onClick={() => { setForgotMode(false); setError(""); }} className="w-full text-background/60 hover:text-background">
                <ArrowLeft className="mr-2" size={16} /> Back to login
              </Button>
            </form>
          )
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-sm text-red-400 text-center">{error}</p>}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
            />
            <Button type="submit" className="w-full rounded-full" disabled={submitting}>
              <LogIn className="mr-2" size={16} />
              {submitting ? "Signing in..." : "Sign In"}
            </Button>
            <button
              type="button"
              onClick={() => { setForgotMode(true); setError(""); }}
              className="w-full text-sm text-background/50 hover:text-background transition-colors"
            >
              Forgot password?
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default AdminLogin;
