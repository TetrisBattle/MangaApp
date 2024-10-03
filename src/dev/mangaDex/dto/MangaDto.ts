export type MangaDto = {
	id: string
	type: string
	attributes: {
		title: {
			en: string
		}
		altTitles: Array<{
			ko?: string
			en?: string
			'ko-ro'?: string
			'ja-ro'?: string
			ru?: string
			ja?: string
			zh?: string
			'zh-hk'?: string
			la?: string
			tr?: string
			'pt-br'?: string
			ro?: string
			uk?: string
			fa?: string
			hi?: string
			ne?: string
			id?: string
			ka?: string
			ar?: string
			bn?: string
			he?: string
			hu?: string
			ta?: string
		}>
		description: {
			de: string
			en: string
			fr: string
			id: string
			it: string
			ja: string
			ka: string
			ko: string
			pl: string
			ru: string
			th: string
			zh: string
			'es-la': string
			'pt-br': string
			'zh-hk': string
		}
		isLocked: boolean
		links: {
			al: string
			ap: string
			bw: string
			kt: string
			mu: string
			nu: string
			amz: string
			ebj: string
			mal: string
			raw: string
			engtl: string
		}
		originalLanguage: string
		lastVolume: string
		lastChapter: string
		publicationDemographic: any
		status: string
		year: number
		contentRating: string
		tags: Array<{
			id: string
			type: string
			attributes: {
				name: {
					en: string
				}
				description: object
				group: string
				version: number
			}
			relationships: Array<any>
		}>
		state: string
		chapterNumbersResetOnNewVolume: boolean
		createdAt: string
		updatedAt: string
		version: number
		availableTranslatedLanguages: Array<string>
		latestUploadedChapter: string
	}
	relationships: Array<{
		id: string
		type: string
		related?: string
	}>
}
