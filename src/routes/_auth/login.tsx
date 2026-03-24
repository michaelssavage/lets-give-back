import { Button } from "@/components/button/button";
import { TextInput } from "@/components/form/text-input";
import { loginFn, type LoginFormData } from "@/routes/_auth";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState, type SubmitEvent } from "react";

export const Route = createFileRoute("/_auth/login")({
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: "/admin" });
    }
  },
  component: Login,
});

function Login() {
  const router = useRouter();

  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: async (data) => {
      if (data.error) {
        setError(data.message);
      } else {
        await router.invalidate();
        router.navigate({ to: "/admin" });
        return;
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ data: form });
    setError(null);
  };

  return (
    <section className="min-h-[70vh] grid place-items-center px-6">
      <div className="bg-white card-shadow p-8 rounded-lg xs:min-w-75 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <TextInput
            id="email"
            name="email"
            label="Email"
            type="email"
            value={form.email}
            placeholder="you@example.com"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextInput
            id="password"
            name="password"
            label="Password"
            type="password"
            value={form.password}
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {error ? <div className="text-red-400">{error}</div> : null}

          <Button type="submit" size="sm" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "..." : "Login"}
          </Button>
        </form>
      </div>
    </section>
  );
}
