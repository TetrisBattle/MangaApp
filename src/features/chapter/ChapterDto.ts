export type ChapterDto = {
	id: string
	type: string
	attributes: {
		volume: string
		chapter: string
		title?: string
		translatedLanguage: string
		externalUrl: any
		publishAt: string
		readableAt: string
		createdAt: string
		updatedAt: string
		pages: number
		version: number
	}
	relationships: Array<{
		id: string
		type: string
	}>
}
