"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(true);
  
  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      setIsConfigured(false);
      setLoading(false);
      return;
    }
    
    const supabase = createClient();
    
    // Check active sessions and sets up the listener
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabaseUrl, supabaseAnonKey]);

  const signIn = async (email: string, password: string) => {
    const currentUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const currentKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!currentUrl || !currentKey) {
      return { error: new Error("Supabase is not configured. Please add environment variables.") };
    }
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const currentUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const currentKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!currentUrl || !currentKey) {
      return { error: new Error("Supabase is not configured. Please add environment variables.") };
    }
    const supabase = createClient();
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (!error && data.user) {
      // Create user profile in the profiles table
      await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
        email,
      });
    }

    return { error };
  };

  const signInWithGoogle = async () => {
    const currentUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const currentKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!currentUrl || !currentKey) {
      return { error: new Error("Supabase is not configured. Please add environment variables.") };
    }
    const supabase = createClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${window.location.origin}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${siteUrl}/auth/callback`,
      },
    });
    return { error };
  };

  const signOut = async () => {
    const currentUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const currentKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!currentUrl || !currentKey) {
      return;
    }
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isConfigured,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
