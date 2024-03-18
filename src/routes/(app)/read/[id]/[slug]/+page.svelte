<script lang="ts">
	import Verse from '@components/Verse.svelte';
	import SurahCard from '@components/SurahCard.svelte';
	import Icon from '@iconify/svelte';
	import { isEnabledAutoScroll } from '@stores/settings';
	import { MetaTags } from 'svelte-meta-tags';
	import { toast } from 'svelte-sonner';

	export let data;

	let surah = data.surah,
		nextSurah = data.nextSurah,
		prevSurah = data.prevSurah,
		scrollY = 0,
		verseId: number,
		audioSource: string,
		audioState: 'playing' | 'paused' | 'loading',
		isPausedAudio = true;

	const playNextVerse = () => {
		verseId += 1;

		if (!surah.verses) {
			toast.error('Oops, tidak dapat memutar audio');
			return;
		}

		const nextSurah = surah.verses.find((verse) => verse.number.inSurah == verseId);

		if (nextSurah) {
			playSurah(nextSurah.audio.primary, nextSurah.number.inSurah);

			if ($isEnabledAutoScroll) window.location.hash = `#${verseId}`;
		}
	};

	const playSurah = async (source: string, verseId: number) => {
		verseId = verseId;
		audioSource = source;

		isPausedAudio = !isPausedAudio;
		audioState = isPausedAudio ? 'paused' : 'playing';
	};

	$: {
		surah = data.surah;
		prevSurah = data.prevSurah;
		nextSurah = data.nextSurah;
	}
</script>

<MetaTags
	title="Surah {surah.name.transliteration.id}"
	keywords={[`surah ${surah.name.transliteration.id}`, `surah ke-${surah.number} dalam al-quran`]}
/>

<svelte:window bind:scrollY />

<section id="surah" class="min-h-dvh py-8">
	{#if surah.number != 1}
		<h1 class="text-center text-4xl md:text-5xl mt-5 mb-14 md:mb-20 font-arabic">
			بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
		</h1>
	{/if}

	{#if surah.verses}
		{#each surah.verses as verse}
			<Verse
				bind:audioState
				bind:verseId
				{verse}
				{surah}
				on:play={() => playSurah(verse.audio.primary, verse.number.inSurah)}
			/>
		{/each}
	{/if}

	<audio
		on:ended={playNextVerse}
		bind:paused={isPausedAudio}
		on:loadeddata={() => (audioState = 'playing')}
		on:loadstart={() => (audioState = 'loading')}
		src={audioSource}
	/>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-10">
		{#if prevSurah}
			<div>
				<div class="flex items-center gap-2 mb-3">
					<Icon class="text-2xl" icon="mdi:arrow-left" />
					<p>Surah Sebelumnya</p>
				</div>
				<SurahCard surah={prevSurah} />
			</div>
		{/if}
		{#if nextSurah}
			<div class="flex items-center justify-end gap-2 mb-3">
				<p>Surah Selanjutnya</p>
				<Icon class="text-2xl" icon="mdi:arrow-right" />
			</div>
			<SurahCard surah={nextSurah} />
		{/if}
	</div>
</section>

<button
	id="scroll-top-btn"
	title="Scroll to Top"
	on:click={() => (scrollY = 0)}
	class:over-scroll={scrollY > 500}
	class="fixed bottom-8 right-4 transition-opacity duration-300 bg-gray-800 rounded-full text-white w-12 h-12 grid place-items-center"
>
	<Icon class="text-3xl" icon="mdi:chevron-up" />
</button>

<style>
	#scroll-top-btn {
		&:is(.over-scroll) {
			@apply opacity-100;
		}

		&:not(.over-scroll) {
			@apply opacity-0 pointer-events-none;
		}
	}
</style>
