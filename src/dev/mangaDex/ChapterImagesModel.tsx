import { makeAutoObservable } from 'mobx'

export type ChapterImagesDto = {
	result: string
	baseUrl: string
	chapter: {
		hash: string
		data: Array<string>
		dataSaver: Array<string>
	}
}

export class ChapterImages {
	constructor(
		public host: string,
		public hash: string,
		public data: string[]
	) {
		makeAutoObservable(this)
	}

	static convertFromDto = (chapterImageDto: ChapterImagesDto) => {
		return new ChapterImages(
			chapterImageDto.baseUrl,
			chapterImageDto.chapter.hash,
			chapterImageDto.chapter.data
		)
	}
}
