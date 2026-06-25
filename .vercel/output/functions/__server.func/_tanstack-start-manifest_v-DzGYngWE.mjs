//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-DzGYngWE.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "C:/project/Portfolio/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth"
		],
		preloads: ["/assets/index-ByF8a9Lp.js", "/assets/useRouter-CAeNMlbO.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-ByF8a9Lp.js"
		} }]
	},
	"/": {
		filePath: "C:/project/Portfolio/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-C9NOwv17.js",
			"/assets/portfolio-data-BIINUJqi.js",
			"/assets/createLucideIcon-DozLgVP3.js",
			"/assets/proxy-ROGfMDrU.js"
		]
	},
	"/_authenticated": {
		filePath: "C:/project/Portfolio/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-Dp-8SE6G.js"]
	},
	"/auth": {
		filePath: "C:/project/Portfolio/src/routes/auth.tsx",
		children: void 0,
		preloads: [
			"/assets/auth-BLOCGvFH.js",
			"/assets/createLucideIcon-DozLgVP3.js",
			"/assets/proxy-ROGfMDrU.js"
		]
	},
	"/_authenticated/admin": {
		filePath: "C:/project/Portfolio/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: [
			"/assets/admin-Djw6IvER.js",
			"/assets/portfolio-data-BIINUJqi.js",
			"/assets/createLucideIcon-DozLgVP3.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
