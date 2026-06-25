//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CKnlJ6i5.js
var manifest = { "ed2b1ee67756e5419ef921e73a3919bd00e9f16fc672b55175005116126c2d96": {
	functionName: "sendContactEmailFn_createServerFn_handler",
	importer: () => import("./_ssr/email-server-Caxkh5xC.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
