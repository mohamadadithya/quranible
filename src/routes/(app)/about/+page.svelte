<script>
	import { PUBLIC_SITE_NAME } from '$env/static/public';
	import Heading from '@components/Heading.svelte';
	import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags title="Tentang" description="Deskripsi singkat mengenai aplikasi {PUBLIC_SITE_NAME}" />

<section class="min-h-dvh py-8">
	<Heading title="Tentang" />
	<p>{PUBLIC_SITE_NAME} adalah aplikasi web Al-Quran yang dilengkapi dengan terjemahan.</p>
</section>
