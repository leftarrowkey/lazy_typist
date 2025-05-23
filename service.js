async function add_to_cache(resources) {
	const cache = await caches.open("v1");
	await cache.addAll(resources);
}

self.addEventListener("install", (event) => {
	event.waitUntil(
		add_to_cache([
			"192.png",
			"512.png",
			"index.html",
			"manifest.json",
			"script.js",
			"service.js",
			"style.css"
		])
	)
})
