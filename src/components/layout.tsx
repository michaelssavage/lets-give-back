// import { PostHogProvider } from "@posthog/react";
import type { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    // <PostHogProvider
    //   apiKey="phc_D4ziHo70DXJ75mYCgqC7yxVJ3rHth6Ew20zpH2m1sDg"
    //   options={{
    //     api_host: "https://eu.i.posthog.com",
    //     defaults: "2026-01-30",
    //     capture_exceptions: true,
    //   }}
    // >
    <main>{children}</main>
    // </PostHogProvider>
  );
};
