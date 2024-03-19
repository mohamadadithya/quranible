import { getAllAsmaulHusna } from '@lib/handlers';

export const load = async () => {
	const allAsmaulHusna = getAllAsmaulHusna();

	return {
		allAsmaulHusna
	};
};
