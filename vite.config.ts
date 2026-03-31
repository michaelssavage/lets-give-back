import { devtools } from "@tanstack/devtools-vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = env.VITE_SITE_URL || env.APP_BASE_URL || "";

  return {
    server: { port: 4000 },
    define: {
      "import.meta.env.VITE_SITE_URL": JSON.stringify(siteUrl),
    },
    plugins: [
      devtools({ eventBusConfig: { port: 4001 } }),
      cloudflare({ viteEnvironment: { name: "ssr" } }),
      tsconfigPaths({ projects: ["./tsconfig.json"] }),
      tailwindcss(),
      tanstackStart({
        router:
          mode === "development"
            ? { codeSplittingOptions: { defaultBehavior: [] } }
            : undefined,
      }),
      viteReact(),
    ],
  };
});
