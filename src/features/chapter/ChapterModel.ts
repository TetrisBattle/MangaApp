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

	copy = () => {
		return new Chapter(
			this.id,
			this.chapter,
			this.pages,
			this.published,
			this.readable,
			this.created,
			this.updated
		)
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
