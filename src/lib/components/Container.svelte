<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	let className: string = '';
	export { className as class };
</script>

<div class={twMerge('container mx-auto px-5 md:px-6 xl:px-12', className)}>
	<slot />
</div>
