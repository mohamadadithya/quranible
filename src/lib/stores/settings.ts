import { writable } from '@macfja/svelte-persistent-store';
import type { Writable } from 'svelte/store';

const theme: Writable<'light' | 'dark'> = writable('theme', 'dark');
const transliterationState: Writable<'show' | 'hide'> = writable('transliteration-state', 'show');
const isEnabledAutoScroll: Writable<boolean> = writable('enabled-auto-scroll', true);

export { theme, transliterationState, isEnabledAutoScroll };
