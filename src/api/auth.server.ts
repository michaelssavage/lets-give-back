import { useSession } from "@tanstack/react-start/server";
import { compare } from "bcryptjs";
import { env } from "cloudflare:workers";

export interface SessionUser {
  id: number;
  email: string;
}

interface AdminUserRecord {
  id: number;
  email: string;
  password_hash: string;
}

const SESSION_NAME = "lgb_session";

function requiredEnv<K extends keyof Env>(key: K): NonNullable<Env[K]> {
  const value = env[key];
  if (!value) {
    throw new Error(`Missing required env var: ${String(key)}`);
  }
  return value;
}

function getSessionConfig() {
  return {
    name: SESSION_NAME,
    password: requiredEnv("SESSION_SECRET"),
    maxAge: 60 * 60 * 24 * 14,
    cookie: {
      path: "/",
      httpOnly: true,
      sameSite: "lax" as const,
      secure: env.APP_BASE_URL?.startsWith("https://") ?? false,
    },
  };
}

export async function getAppSession() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSession<{ user?: SessionUser }>(getSessionConfig());
}

export async function getCurrentUserFromSession() {
  const session = await getAppSession();
  return session.data.user ?? null;
}

export async function clearAppSession() {
  const session = await getAppSession();
  await session.clear();
}

export async function verifyPassword(password: string, passwordHash: string) {
  return compare(password, passwordHash);
}

export async function findAdminByEmail(email: string) {
  return requiredEnv("DB")
    .prepare(
      "SELECT id, email, password_hash FROM admin_users WHERE lower(email) = lower(?) LIMIT 1",
    )
    .bind(email.trim())
    .first<AdminUserRecord | null>();
}

export async function findAdminById(id: number) {
  return requiredEnv("DB")
    .prepare(
      "SELECT id, email, password_hash FROM admin_users WHERE id = ? LIMIT 1",
    )
    .bind(id)
    .first<AdminUserRecord | null>();
}
