export type ChapterImagesDto = {
	result: string
	baseUrl: string
	chapter: {
		hash: string
		data: Array<string>
		dataSaver: Array<string>
	}
}
