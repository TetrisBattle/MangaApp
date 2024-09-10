import { makeAutoObservable } from 'mobx'
import { MangaDto } from './MangaDto'
import { Chapter } from 'dev/mangaDex/Chapter'

export class Manga {
	chapter = new Chapter()
	chapters: Chapter[] = []
	coverUrl = ''
	firstChapterNumber = ''

	constructor(
		public id = '',
		public title = '',
		public description = '',
		public coverId = '',
		public lastChapterNumber = '',
		public status = '',
		public tags: string[] = [],
		public created = '',
		public updated = ''
	) {
		makeAutoObservable(this)
	}

	setChapter = (chapter: Chapter) => {
		this.chapter = chapter
	}

	setChapters = (chapters: Chapter[]) => {
		this.chapters = chapters
	}

	setCoverUrl = (coverUrl: string) => {
		this.coverUrl = coverUrl
	}

	setFirstChapterNumber = (firstChapterNumber: string) => {
		this.firstChapterNumber = firstChapterNumber
	}

	static convertFromDto = (mangaDto: MangaDto) => {
		const coverId =
			mangaDto.relationships.find((r) => r.type === 'cover_art')?.id || ''

		return new Manga(
			mangaDto.id,
			mangaDto.attributes.title.en,
			mangaDto.attributes.description.en,
			coverId,
			mangaDto.attributes.lastChapter,
			mangaDto.attributes.status,
			mangaDto.attributes.tags.map((tag) => tag.attributes.name.en),
			mangaDto.attributes.createdAt,
			mangaDto.attributes.updatedAt
		)
	}
}
