<script lang="ts">
	import { getSurahById } from '@lib/handlers';
	import { slugify } from '@lib/helpers';
	import type { SavedVerse } from '@types';

	export let index: number, verse: SavedVerse;

	const surah = getSurahById(verse.surahId!);
</script>

<a
	href="/read/{verse.surahId}/{slugify(surah.name.transliteration.id)}#verse-{verse.id}"
	class="py-4 border-b-2 border-gray-300 flex items-start"
>
	{#if !verse.id}
		<span class="md:text-xl text-lg mr-2 font-medium">{index + 1}.</span>
	{/if}
	<div class="flex-column">
		<p class="md:text-xl text-lg font-medium block capitalize">{surah.name.transliteration.id}</p>
		{#if verse.id}
			<p class="text-xs mt-1">Terakhir dibaca ayat {verse.id}</p>
		{/if}
	</div>
</a>
