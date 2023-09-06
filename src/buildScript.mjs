import * as esbuild from "esbuild";
import babel from "esbuild-plugin-babel";

const context = await esbuild.context({
    entryPoints: ["./src/index.js","./src/background.js"],
    bundle: true,
    jsx: "automatic",
    platform: "browser",
    bundle: true,
    outdir: "./public/popup/",
    plugins: [babel()],
    loader: {
        ".js": "jsx",
    
    },
    minify: true,
    target: ["chrome58", "firefox57", "safari11", "edge16"],
    logLevel: "info",

});

const result = await context.rebuild();

await context.watch();

console.log("Watching...");
