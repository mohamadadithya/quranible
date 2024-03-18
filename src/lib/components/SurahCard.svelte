<script lang="ts">
	import { slugify } from '@lib/helpers';
	import type { Surah } from '@lib/types';

	export let surah: Surah;
</script>

<a
	href="/read/{surah.number}/{slugify(surah.name.transliteration.id)}"
	aria-label="Surah {surah.name.transliteration.id}"
	class="shadow-lg p-5 rounded-xl flex items-center hover:ring-2 hover:ring-gray-700"
>
	<p class="px-5 py-3 bg-gray-700 text-white font-bold rounded-xl mr-4">
		{surah.number}
	</p>
	<div>
		<p class="font-bold text-lg">{surah.name.transliteration.id}</p>
		<p class="text-xs text-gray-500 mt-1">
			{surah.name.translation.id} &bullet; {surah.numberOfVerses} Ayat
		</p>
	</div>
</a>
