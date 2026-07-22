"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const response = await fetch("/api/admin-auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setSubmitting(false);
    if (!response.ok) {
      setError("Incorrect password.");
      return;
    }
    router.push(searchParams.get("next") || "/admin");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5">
      <h1 className="font-serif text-3xl">Admin sign-in</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-3">
        <label className="text-sm">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full border border-[var(--border)] bg-transparent p-2"
            autoFocus
          />
        </label>
        {error ? <p className="text-sm text-[var(--warning)]">{error}</p> : null}
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 border border-[var(--border)] p-2 text-sm font-semibold hover:bg-[var(--surface)]"
        >
          {submitting ? "Checking..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
