<script lang="ts">
	import { slugify } from '@lib/helpers';

	interface Surah {
		id: number;
		name: string;
		translation: string;
		total_verses: number;
	}

	export let surah: Surah;
</script>

<a
	href="/read/{surah.id}/{slugify(surah.name)}"
	aria-label="Surah {surah.name}"
	class="shadow-lg p-5 rounded-xl flex items-center hover:ring-2 hover:ring-gray-700"
>
	<p class="px-5 py-3 bg-gray-700 text-white font-bold rounded-xl mr-4">
		{surah.id}
	</p>
	<div>
		<p class="font-bold text-lg">{surah.name}</p>
		<p class="text-xs text-gray-500 mt-1">
			{surah.translation} &bullet; {surah.total_verses} Ayat
		</p>
	</div>
</a>
