import * as esbuild from "esbuild";



const context = await esbuild.context({
    entryPoints: [
        {
            out: "./popup/index",
            in: "./src/index.js",
        },
        {
            out: "./background/background",
            in: "./src/background.js",
        },
        {
            out: "./options/options",
            in: "./src/options.js",
        }
    ],
    bundle: true,
    jsx: "automatic",
    platform: "browser",

    outdir: "./public",
    plugins: [
        //CssModulesPlugin(), 
    ],
    loader: {
        ".js": "jsx",
    },
    minify: true,
    target: ["chrome58", "firefox57", "safari11"],
    logLevel: "info",
});

const result = await context.rebuild();

await context.watch();

console.log("Watching...");
