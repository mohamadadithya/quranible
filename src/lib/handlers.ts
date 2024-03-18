import quran from '@data/quran.json';
import juz from '@data/juz.json';
import prayerIntentions from '@data/prayer-intentions.json';
import dailyPrayers from '@data/daily-prayers.json';
import asmaulHusna from '@data/asmaul-husna.json';
import type {
	AsmaulHusna,
	DailyPrayer,
	JuzData,
	PrayerIntention,
	QuranData,
	Surah,
	Verse
} from '@types';

const { data: quranData } = quran as QuranData;
const { data: juzData } = juz as JuzData;
const { data: prayerIntentionData } = prayerIntentions;
const { data: dailyPrayersData } = dailyPrayers;
const { data: asmaulHusnaData } = asmaulHusna;

const getJuzById = (juzId: number) => {
	const juzMeta = juzData[juzId - 1];

	if (!juzMeta) return [];

	const startSurah = juzMeta.start.index - 1;
	const startVerse = juzMeta.start.verse - 1;

	const endSurah = juzMeta.end.index - 1;
	const endVerse = juzMeta.end.verse;

	let juzVerses: Verse[] = [],
		firstSurahVerses: Verse[] = [],
		middleSurah: Surah[] = [],
		lastSurahVerses: Verse[] = [];

	const middleSurahVerses: Verse[] = [];
	const middleSurahId = endSurah - startSurah;

	if (startSurah === endSurah) {
		juzVerses = quranData[startSurah].verses?.slice(startVerse, endVerse) as Verse[];
	} else if (middleSurahId > 1) {
		firstSurahVerses = quranData[startSurah].verses?.slice(startVerse) as Verse[];

		middleSurah = quranData.slice(startSurah + 1, endSurah);
		middleSurah.map((items) => {
			items.verses?.map((item) => middleSurahVerses.push(item));
		});

		lastSurahVerses = quranData[endSurah].verses?.slice(0, endVerse) as Verse[];
		juzVerses = [...firstSurahVerses, ...lastSurahVerses, ...lastSurahVerses];
	} else {
		firstSurahVerses = quranData[startSurah].verses?.slice(startVerse) as Verse[];
		lastSurahVerses = quranData[endSurah].verses?.slice(0, endVerse) as Verse[];
		juzVerses = [...firstSurahVerses, ...lastSurahVerses] as Verse[];
	}

	const startSurahName = quranData[startSurah].name.transliteration.id;
	const endSurahName = quranData[endSurah].name.transliteration.id;

	const data = {
		juz: juzId,
		juz_start_surah_number: juzMeta.start.index,
		juz_end_surah_number: juzMeta.end.index,
		juz_start_info: {
			surah_name: startSurahName,
			verse_id: juzMeta.start.verse
		},
		juz_end_info: {
			surah_name: endSurahName,
			verse_id: juzMeta.end.verse
		},
		total_verses: juzVerses.length,
		verses: juzVerses
	};

	return data;
};

const getSurahs = () => {
	const surahs = quranData.map((item) => {
		const surah = { ...item };

		delete surah.verses;
		delete surah.preBismillah;

		return surah;
	});

	return surahs as Surah[];
};

const getSurahById = (id: number) => {
	const surah = quranData.find((item) => item.number === id);
	return surah as Surah;
};

const getSurahsByKeyword = (keyword: string) => {
	const rawSurahs = quranData.map((item) => {
		const names = [
			...Object.values(item.name.translation),
			...Object.values(item.name.transliteration)
		]
			.map((name: string) => name.toLowerCase())
			.join(',');

		item.names = names;
		return item;
	});

	const surahs = rawSurahs.filter((item) => item.names?.includes(keyword.toLowerCase()));

	return surahs as Surah[];
};

const getVerseFromSurah = (surahId: number, verseId: number) => {
	const surah = getSurahById(surahId);

	if (surah) {
		const { verses } = surah;
		const verse = verses?.find((verse) => verse.number.inSurah === verseId);

		return verse;
	}
};

const getPrayerIntentions = () => [...prayerIntentionData] as PrayerIntention[];

const getPrayerIntentionById = (id: number) => {
	const playerIntentions = getPrayerIntentions();
	const prayerIntention = playerIntentions.find((item) => item.id === id);

	return prayerIntention as PrayerIntention;
};

const getDailyPrayers = () => [...dailyPrayersData] as DailyPrayer[];

const getDailyPrayerById = (id: number) => {
	const dailyPrayers = getDailyPrayers();
	const dailyPrayer = dailyPrayers.find((item) => item.id === id);

	return dailyPrayer as DailyPrayer;
};

const getAllAsmaulHusna = () => [...asmaulHusnaData] as AsmaulHusna[];

export {
	getSurahs,
	getSurahById,
	getSurahsByKeyword,
	getVerseFromSurah,
	getJuzById,
	getPrayerIntentions,
	getPrayerIntentionById,
	getDailyPrayers,
	getDailyPrayerById,
	getAllAsmaulHusna
};
