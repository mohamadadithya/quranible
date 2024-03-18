import { writable } from '@macfja/svelte-persistent-store';
import type { SavedVerse } from '@types';
import type { Writable } from 'svelte/store';

const savedVerses: Writable<SavedVerse[]> = writable('verses', []);

export { savedVerses };
