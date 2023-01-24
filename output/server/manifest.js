export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","mockServiceWorker.js"]),
	mimeTypes: {".png":"image/png",".js":"application/javascript"},
	_: {
		entry: {"file":"_app/immutable/start-c754b5da.js","imports":["_app/immutable/start-c754b5da.js","_app/immutable/chunks/index-7c6f4c44.js","_app/immutable/chunks/singletons-d59d05ca.js","_app/immutable/chunks/index-d8678d55.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/start",
				pattern: /^\/start\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
