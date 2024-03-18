<script lang="ts">
	import Heading from '@components/Heading.svelte';
	import { transliterationState, isEnabledAutoScroll, theme } from '@stores/settings';
	import { MetaTags } from 'svelte-meta-tags';

	const themes = [
		{
			name: 'Terang',
			value: 'light'
		},
		{
			name: 'Gelap',
			value: 'dark'
		}
	];
</script>

<MetaTags title="Pengaturan" />

<section class="min-h-dvh py-8">
	<Heading title="Pengaturan" />
	<h5 class="mb-4 font-medium mt-8">Pilihan Tema</h5>
	<select name="theme" id="theme" class="select select-bordered w-full mb-5" bind:value={$theme}>
		{#each themes as theme}
			<option value={theme.value}>{theme.name}</option>
		{/each}
	</select>
	<h5 class="mb-4 font-medium">Tampilkan Ayat Latin</h5>
	<div id="latin-radios" class="flex items-center gap-4">
		<label class="flex items-center gap-2" for="yes-transliteration">
			<input
				type="radio"
				name="transliteration"
				id="yes-transliteration"
				class="mr-1 radio"
				bind:group={$transliterationState}
				value="show"
			/>
			Ya
		</label>
		<label class="flex items-center gap-2" for="no-transliteration">
			<input
				type="radio"
				name="transliteration"
				id="no-transliteration"
				class="mr-1 radio"
				bind:group={$transliterationState}
				value="hide"
			/>
			Tidak
		</label>
	</div>
	<h5 class="mb-4 font-medium mt-8">Otomatis Scroll Audio</h5>
	<div id="auto-scroll-radios" class="flex items-center gap-4">
		<label class="flex items-center gap-2" for="yes-auto-scroll">
			<input
				type="radio"
				name="auto_scroll"
				id="yes-auto-scroll"
				class="mr-1 radio"
				bind:group={$isEnabledAutoScroll}
				value={true}
			/>
			Ya
		</label>
		<label class="flex items-center gap-2" for="no-auto-scroll">
			<input
				type="radio"
				name="auto_scroll"
				id="no-auto-scroll"
				class="mr-1 radio"
				bind:group={$isEnabledAutoScroll}
				value={false}
			/>
			Tidak
		</label>
	</div>
</section>

<style>
	label {
		cursor: pointer;
	}
</style>
