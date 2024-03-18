import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			runtime: 'edge',
			regions: ['sin1']
		}),
		alias: {
			'@lib': 'src/lib',
			'@components': 'src/lib/components',
			'@helpers': 'src/lib/helpers',
			'@data': 'src/lib/data',
			'@types': 'src/lib/types.ts',
			'@stores': 'src/lib/stores'
		},
		version: {
			pollInterval: 5000
		}
	}
};

export default config;
