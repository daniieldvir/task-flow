import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // Repository name is "task-flow"
  base: "/task-flow/",
});
