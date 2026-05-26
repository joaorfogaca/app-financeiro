"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type AuthFormProps = {
  mode: "login" | "signup";
};

const authCopy = {
  login: {
    eyebrow: "Acesso seguro",
    title: "Entrar no Pulse Finance",
    description: "Use seu email e senha para acessar seu painel financeiro em tempo real.",
    button: "Entrar",
    loading: "Entrando...",
    success: "Login realizado. Redirecionando para o dashboard...",
    switchText: "Ainda não tem conta?",
    switchLink: "Criar cadastro",
    switchHref: "/cadastro",
  },
  signup: {
    eyebrow: "Novo acesso",
    title: "Criar sua conta",
    description: "Cadastre um email e senha para proteger seu dashboard financeiro.",
    button: "Criar conta",
    loading: "Criando conta...",
    success: "Cadastro realizado. Verifique seu email se a confirmação estiver ativa.",
    switchText: "Já tem conta?",
    switchLink: "Entrar agora",
    switchHref: "/login",
  },
} as const;

function translateAuthError(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) return "Email ou senha inválidos.";
  if (normalized.includes("email not confirmed")) return "Confirme seu email antes de entrar.";
  if (normalized.includes("password should be")) return "A senha precisa ter pelo menos 6 caracteres.";
  if (normalized.includes("user already registered")) return "Este email já está cadastrado.";

  return message;
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const copy = authCopy[mode];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) return;

    setStatus("loading");
    setMessage("");

    const credentials = { email: email.trim(), password };
    const { error } =
      mode === "login"
        ? await supabase.auth.signInWithPassword(credentials)
        : await supabase.auth.signUp(credentials);

    if (error) {
      setStatus("error");
      setMessage(translateAuthError(error.message));
      return;
    }

    setStatus("success");
    setMessage(copy.success);

    if (mode === "login") {
      router.replace("/");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-abyss px-4 py-10 text-white">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.45)] lg:grid-cols-[0.92fr_1fr]">
        <div className="relative hidden min-h-[560px] overflow-hidden border-r border-white/10 bg-black/25 p-8 lg:block">
          <div className="absolute inset-0 grid-bg opacity-60" />
          <div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-neonPurple/25 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-electric/20 blur-3xl" />
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-white/35">Pulse</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight text-gradient">Finanças protegidas por autenticação real.</h2>
            </div>
            <div className="panel rounded-[28px] p-5">
              <p className="text-sm text-white/55">Sessão persistente, rotas protegidas e experiência neon preservada para o dashboard.</p>
              <div className="mt-5 h-2 rounded-full bg-white/10">
                <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-neonRed via-neonPurple to-electric" />
              </div>
            </div>
          </div>
        </div>

        <div className="panel rounded-none border-0 p-6 sm:p-10 lg:p-12">
          <p className="text-xs uppercase tracking-[0.35em] text-electric/80">{copy.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">{copy.title}</h1>
          <p className="mt-4 text-sm leading-6 text-white/60">{copy.description}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-white/70">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-electric/50 focus:ring-4 focus:ring-electric/10"
                placeholder="voce@email.com"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-white/70">Senha</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-neonPurple/50 focus:ring-4 focus:ring-neonPurple/10"
                placeholder="No mínimo 6 caracteres"
              />
            </label>

            {message ? (
              <div
                className={[
                  "rounded-2xl border px-4 py-3 text-sm",
                  status === "error"
                    ? "border-neonRed/25 bg-neonRed/10 text-neonRed"
                    : "border-electric/25 bg-electric/10 text-electric",
                ].join(" ")}
              >
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-neonRed via-neonPurple to-electric px-5 text-sm font-semibold text-white shadow-red transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:scale-100"
            >
              {status === "loading" ? copy.loading : copy.button}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-white/50">
            {copy.switchText} {" "}
            <Link href={copy.switchHref} className="font-semibold text-electric hover:text-white">
              {copy.switchLink}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
