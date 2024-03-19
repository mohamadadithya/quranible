interface QuranData {
	license: string;
	source: string;
	audioEdition: string;
	data: Surah[];
}

interface JuzData {
	license: string;
	source: string;
	data: Juz[];
}

interface Juz {
	index: number;
	start: {
		index: number;
		verse: number;
	};
	end: {
		index: number;
		verse: number;
	};
}

interface Transliteration {
	en: string;
	id: string;
}

interface Verse {
	number: {
		inQuran: number;
		inSurah: number;
	};
	meta: {
		juz: number;
		page: number;
		manzil: number;
		ruku: number;
		hizbQuarter: number;
		sajda: {
			recommended: boolean;
			obligatory: boolean;
		};
	};
	text: {
		arab: string;
		transliteration: Transliteration;
	};
	translation: Transliteration;
	audio: {
		primary: string;
		secondary: string[];
	};
	tafsir: {
		id: {
			short: string;
			long: string;
		};
	};
}

interface Surah {
	number: number;
	sequence: number;
	numberOfVerses: number;
	name: {
		short: string;
		long: string;
		transliteration: Transliteration;
		translation: Transliteration;
	};
	revelation: {
		arab: string;
		en: string;
		id: string;
	};
	tafsir: {
		id: string;
	};
	preBismillah?: string | null;
	verses?: Verse[];
	names?: string;
}

interface SavedVerse {
	surahId?: number;
	id?: number;
}

interface PrayerIntention {
	id: number;
	arab: string;
	name: string;
	transliteration: string;
	translation: string;
}

interface DailyPrayer {
	id: number;
	name: string;
	arab: string;
	transliteration: string;
	translation: string;
}

interface AsmaulHusna {
	id: number;
	arab: string;
	translation: string;
	transliteration: string;
}

type AudioState = 'playing' | 'paused' | 'loading';

export type {
	QuranData,
	JuzData,
	Juz,
	Surah,
	Verse,
	SavedVerse,
	PrayerIntention,
	DailyPrayer,
	AsmaulHusna,
	AudioState
};
