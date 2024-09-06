import { makeAutoObservable } from 'mobx'
import { ChapterDto } from './ChapterDto'

export class Chapter {
	imageUrls: string[] = []

	constructor(
		public id = '',
		public number = '',
		public pages = 0,
		public published = '',
		public readable = '',
		public created = '',
		public updated = ''
	) {
		makeAutoObservable(this)
	}

	setNumber = (number: string) => {
		this.number = number
	}

	setImageUrls = (imageUrls: string[]) => {
		this.imageUrls = imageUrls
	}

	static convertFromDto = (chapterDto: ChapterDto) => {
		return new Chapter(
			chapterDto.id,
			chapterDto.attributes.chapter,
			chapterDto.attributes.pages,
			chapterDto.attributes.publishAt,
			chapterDto.attributes.readableAt,
			chapterDto.attributes.createdAt,
			chapterDto.attributes.updatedAt
		)
	}
}
