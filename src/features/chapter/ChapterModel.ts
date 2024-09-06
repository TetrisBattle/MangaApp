import { makeAutoObservable } from 'mobx'
import { ChapterDto } from './ChapterDto'

export class Chapter {
	constructor(
		public id = '',
		public chapter = '',
		public pages = 0,
		public published = '',
		public readable = '',
		public created = '',
		public updated = ''
	) {
		makeAutoObservable(this)
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
