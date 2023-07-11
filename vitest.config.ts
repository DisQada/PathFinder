import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        exclude: ["**/node_modules", ".vscode", ".github", ".git", ".cache"],
        passWithNoTests: true,
        coverage: {
            enabled: true,
            all: true,
            reporter: ["text"],
            provider: "c8",
            include: ["dist"],
            exclude: ["**/index.{js,ts}", "**/exports.{js,ts}"]
        }
    }
});
