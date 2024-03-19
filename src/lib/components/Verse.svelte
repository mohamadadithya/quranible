<script lang="ts">
	import { transliterationState } from '@stores/settings';
	import Icon from '@iconify/svelte';
	import { afterUpdate, createEventDispatcher } from 'svelte';
	import { savedVerses } from '@lib/stores/bookmarks';
	import { state, verseId } from '@stores/audio';
	import type { SavedVerse, Surah, Verse } from '@lib/types';
	import Container from './Container.svelte';
	import { fade, fly } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let verse: Verse, surah: Surah;

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

	let isOpenTafsirPanel = false;

	afterUpdate(() => {
		document.body.style.overflow = isOpenTafsirPanel ? 'hidden' : 'auto';
	});
</script>

<div id="verse-{verse.number.inSurah}" class="py-5 mb-5 border-b-2 border-gray-300">
	<p class="text-3xl md:text-4xl mb-6 text-right font-arabic leading-extra">
		{verse.text.arab}
	</p>
	{#if $transliterationState === 'show'}
		<p class="text-sm mb-2">
			{verse.number.inSurah}. {verse.text.transliteration.en}
		</p>
	{/if}
	<p class="text-gray-500 whitespace-pre-wrap">{verse.translation.id}</p>
	<div id="actions" class="flex items-center gap-2 mt-5 text-xl">
		<button
			type="button"
			class="btn btn-sm rounded-3xl"
			on:click={() => dispatch('play')}
			title="Mainkan"
		>
			{#if $state === 'loading' && $verseId === verse.number.inSurah}
				<Icon class="text-lg animate-spin" icon="gg:spinner" />
			{:else}
				<Icon
					class="text-lg"
					icon={$state === 'playing' && $verseId == verse.number.inSurah ? 'ph:pause' : 'ph:play'}
				/>
			{/if}
		</button>
		<button
			type="button"
			class="btn btn-sm rounded-3xl"
			on:click={() => (isOpenTafsirPanel = true)}
			title="Tafsir"
		>
			<Icon class="text-lg" icon="ph:book" />
		</button>
		<button type="button" class="btn btn-sm rounded-3xl" on:click={saveVerse} title="Simpan">
			<Icon
				class="text-lg"
				icon={bookmarkedVerse ? 'ph:bookmark-simple-fill' : 'ph:bookmark-simple'}
			/>
		</button>
	</div>
</div>

{#if isOpenTafsirPanel}
	<div
		transition:fade={{ duration: 450, delay: 100 }}
		class="min-h-dvh w-full fixed top-0 left-0 bg-black bg-opacity-50 backdrop-blur-sm"
	></div>
	<div
		transition:fly={{ duration: 450, y: 500 }}
		class="w-full max-w-xl bg-base-100 fixed bottom-0 left-2/4 -translate-x-2/4 overflow-y-auto max-h-[60dvh] z-[1] shadow-xl rounded-t-3xl"
	>
		<div class="p-5 pt-0">
			<div class="flex justify-between items-center gap-3 sticky top-0 py-4 bg-base-100">
				<p class="text-lg font-semibold">Tafsir Ayat</p>
				<button type="button" class="Back" on:click={() => (isOpenTafsirPanel = false)}>
					<Icon icon="mdi:close" class="text-3xl" />
				</button>
			</div>
			<p class="text-sm whitespace-pre-wrap">{verse.tafsir.id.long}</p>
		</div>
	</div>
{/if}
