"use client";

import type { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const publicRoutes = new Set(["/login", "/cadastro"]);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const isPublicRoute = publicRoutes.has(pathname);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || loading) return;

    if (!session && !isPublicRoute) {
      router.replace("/login");
      return;
    }

    if (session && isPublicRoute) {
      router.replace("/");
    }
  }, [isPublicRoute, loading, router, session]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      loading,
      signOut: async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
        setSession(null);
        router.replace("/login");
      },
    }),
    [loading, router, session],
  );

  if (!isSupabaseConfigured) {
    return (
      <main className="grid min-h-screen place-items-center bg-abyss px-4 text-white">
        <section className="panel max-w-xl rounded-[30px] p-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-neonRed/80">Supabase</p>
          <h1 className="mt-3 text-3xl font-semibold text-gradient">Configuração necessária</h1>
          <p className="mt-4 text-sm leading-6 text-white/65">
            Defina as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY para habilitar a autenticação.
          </p>
        </section>
      </main>
    );
  }

  const shouldBlockRender = loading || (!session && !isPublicRoute) || (session && isPublicRoute);

  return (
    <AuthContext.Provider value={value}>
      {shouldBlockRender ? (
        <main className="grid min-h-screen place-items-center bg-abyss px-4 text-white">
          <div className="panel rounded-[28px] px-8 py-6 text-center">
            <div className="mx-auto h-11 w-11 animate-spin rounded-full border-2 border-electric/20 border-t-electric" />
            <p className="mt-4 text-sm text-white/60">Carregando sessão...</p>
          </div>
        </main>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
