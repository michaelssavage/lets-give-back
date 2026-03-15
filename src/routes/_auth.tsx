import {
  clearAppSession,
  findAdminByEmail,
  getAppSession,
  getCurrentUserFromSession,
  verifyPassword,
} from "@/api/auth.server";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email().trim().min(1).max(200),
  password: z.string().min(8).max(128),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await getCurrentUserFromSession();
    return { user };
  },
);

export const loginFn = createServerFn({ method: "POST" })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {
    const user = await findAdminByEmail(data.email);

    if (!user) {
      return {
        error: true,
        message: "Invalid email or password",
      };
    }

    const passwordValid = await verifyPassword(
      data.password,
      user.password_hash,
    );

    if (!passwordValid) {
      return {
        error: true,
        message: "Invalid email or password",
      };
    }

    const session = await getAppSession();
    await session.update({
      user: {
        id: user.id,
        email: user.email,
      },
    });

    return { success: true };
  });

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  await clearAppSession();
  return { success: true };
});

function AuthLayout() {
  return <Outlet />;
}

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
  loader: async () => {
    return null;
  },
});
