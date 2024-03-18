import { getSurahs } from '@lib/handlers';

export const load = async () => {
	const surahs = getSurahs();

	return {
		surahs
	};
};
