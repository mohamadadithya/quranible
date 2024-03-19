<script lang="ts">
	import { transliterationState } from '@stores/settings';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import { savedVerses } from '@lib/stores/bookmarks';
	import type { SavedVerse, Surah, Verse } from '@lib/types';

	const dispatch = createEventDispatcher();

	export let verse: Verse,
		surah: Surah,
		verseId = verse.number.inSurah,
		audioState: 'playing' | 'paused' | 'loading' = 'paused';

	let bookmarkedVerse: SavedVerse;

	const saveVerse = () => {
		let filteredVerses: SavedVerse[] = [],
			savedVerse: SavedVerse = {
				surahId: surah.number,
				id: verse.number.inSurah
			};

		if ($savedVerses) {
			const sameVerse = $savedVerses.find(
				(verse) => verse.id === savedVerse?.id && verse.surahId === savedVerse?.surahId
			);

			if (sameVerse) {
				filteredVerses = $savedVerses.filter((verse) => verse.surahId !== sameVerse.surahId);
				savedVerse = {};
			} else {
				filteredVerses = $savedVerses.filter(
					(verse) => verse.surahId !== savedVerse?.surahId && Object.keys(verse).length > 0
				);
			}

			if (savedVerse) $savedVerses = [...filteredVerses, savedVerse];
		} else {
			$savedVerses = [...$savedVerses, savedVerse];
		}
	};

	$: bookmarkedVerse = $savedVerses.find(
		(singleVerse) => singleVerse.id == verse.number.inSurah && singleVerse.surahId == surah.number
	) as SavedVerse;
</script>

<div id="verse-{verse.number.inSurah}" class="py-8 mb-10 border-b-2 border-gray-300">
	<p class="text-3xl md:text-4xl mb-14 text-right font-arabic leading-extra">
		{verse.text.arab}
	</p>
	{#if $transliterationState === 'show'}
		<p class="text-sm mb-2">
			{verse.number.inSurah}. {verse.text.transliteration.en}
		</p>
	{/if}
	<p class="text-gray-500">{verse.translation.id}</p>
	<div id="actions" class="flex items-center gap-2 mt-5 text-xl">
		<button
			type="button"
			class="btn btn-sm rounded-3xl"
			on:click={() => dispatch('play')}
			title="Mainkan"
		>
			{#if audioState === 'loading' && verseId === verse.number.inSurah}
				<Icon class="text-lg animate-spin" icon="gg:spinner" />
			{:else}
				<Icon
					class="text-lg"
					icon={audioState === 'playing' && verseId == verse.number.inSurah
						? 'ph:pause'
						: 'ph:play'}
				/>
			{/if}
		</button>
		<button type="button" class="btn btn-sm rounded-3xl" on:click={saveVerse} title="Simpan">
			<Icon
				class="text-lg"
				icon={bookmarkedVerse ? 'ph:bookmark-simple-fill' : 'ph:bookmark-simple'}
			/>
		</button>
	</div>
</div>
