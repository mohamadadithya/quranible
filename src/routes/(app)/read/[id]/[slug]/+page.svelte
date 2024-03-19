<script lang="ts">
	import Verse from '@components/Verse.svelte';
	import SurahCard from '@components/SurahCard.svelte';
	import Icon from '@iconify/svelte';
	import { isEnabledAutoScroll } from '@stores/settings';
	import { MetaTags } from 'svelte-meta-tags';
	import { toast } from 'svelte-sonner';
	import { state, sourceUrl, verseId } from '@stores/audio';

	export let data;

	let surah = data.surah,
		nextSurah = data.nextSurah,
		prevSurah = data.prevSurah,
		scrollY = 0,
		isPausedAudio = true;

	const playNextVerse = () => {
		$verseId += 1;

		if (!surah.verses) {
			toast.error('Oops, tidak dapat memutar audio');
			return;
		}

		const nextSurah = surah.verses.find((verse) => verse.number.inSurah === $verseId);

		if (nextSurah) {
			playSurah(nextSurah.audio.primary, nextSurah.number.inSurah);

			if ($isEnabledAutoScroll) location.hash = `#verse-${$verseId}`;
		}
	};

	const playSurah = async (source: string, id: number) => {
		$verseId = id;
		$sourceUrl = source;

		isPausedAudio = !isPausedAudio;
		$state = isPausedAudio ? 'paused' : 'playing';
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

<section id="surah" class="min-h-dvh pt-8 pb-24">
	{#if surah.number != 1}
		<div class="text-center mt-5 mb-10 md:mb-16">
			<h1 class="text-4xl md:text-5xl font-arabic">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
			<p class="text-sm mt-8 text-gray-500">Bismillaahir Rahmaanir Raheem</p>
		</div>
	{/if}

	{#if surah.verses}
		{#each surah.verses as verse}
			{@const audioUrl = verse.audio.primary}
			{@const verseId = verse.number.inSurah}
			<Verse {verse} {surah} on:play={() => playSurah(audioUrl, verseId)} />
		{/each}
	{/if}

	<audio
		bind:paused={isPausedAudio}
		on:ended={playNextVerse}
		on:loadeddata={() => ($state = 'playing')}
		on:loadstart={() => ($state = 'loading')}
		src={$sourceUrl}
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
			<div>
				<div class="flex items-center justify-end gap-2 mb-3">
					<p>Surah Selanjutnya</p>
					<Icon class="text-2xl" icon="mdi:arrow-right" />
				</div>
				<SurahCard surah={nextSurah} />
			</div>
		{/if}
	</div>
</section>

<button
	id="scroll-top-btn"
	title="Scroll to Top"
	on:click={() => (scrollY = 0)}
	class:over-scroll={scrollY > 500}
	class="fixed bottom-5 right-5 transition-opacity duration-300 bg-gray-700 rounded-full text-white w-12 h-12 grid place-items-center"
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
