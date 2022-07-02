import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/dl-pfcard/",
    plugins: [preact()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            react: "preact/compat",
            "react-dom": "preact/compat",
        },
    },
    server: {
        port: 3001,
    },
});
