import type { AudioState } from '@lib/types';
import { writable, type Writable } from 'svelte/store';

const sourceUrl = writable('');
const state: Writable<AudioState> = writable('paused');
const verseId = writable(1);

export { sourceUrl, state, verseId };
