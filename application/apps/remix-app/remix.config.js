/** @type {import('@remix-run/dev').AppConfig} */
const config =
	// eslint-disable-next-line no-undef
	process.env.NODE_ENV === "production"
		? {
				appDirectory: "app",
				cacheDirectory: "./node_modules/.cache/remix",
				assetsBuildDirectory: "public/static/build",
				publicPath: "/static/build/",
				serverBuildTarget: "arc",
				server: "./server.ts",
				ignoredRouteFiles: ["/.", "**/.css", "/*.test.{js,jsx,ts,tsx}"],
			}
		: {
				ignoredRouteFiles: ["/*.css"],
				publicPath: "/_static/build/",
				server: "server.ts",
				serverBuildPath: "server/index.mjs",
				// appDirectory: "app",
				// assetsBuildDirectory: "public/build",
				serverModuleFormat: "esm",
			};

export default config;
