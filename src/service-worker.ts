/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;
const ASSETS = [...build, ...files];

// Install service worker;
self.addEventListener('install', (event) => {
	const addFilesToCache = async () => {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	};

	event.waitUntil(addFilesToCache());
});

// Activate service worker
self.addEventListener('activate', (event) => {
	const deleteOldCaches = async () => {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	};

	event.waitUntil(deleteOldCaches());
});

// Listen to fetch events
self.addEventListener('fetch', async (event) => {
	if (event.request.method !== 'GET') return;

	const respond = async () => {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		// Serve build files from the cache
		if (ASSETS.includes(url.pathname)) {
			const cachedResponse = await cache.match(url.pathname);

			if (cachedResponse) return cachedResponse;
		}

		try {
			const response = await fetch(event.request);
			const isNotExtensions = url.protocol === 'http';
			const isSuccess = response.status === 200;

			if (isNotExtensions && isSuccess) cache.put(event.request, response.clone());

			return response;
		} catch (error) {
			const cachedResponse = await cache.match(url.pathname);

			if (cachedResponse) return cachedResponse;
		}

		return new Response('Not Found', { status: 404 });
	};

	event.respondWith(respond());
});
