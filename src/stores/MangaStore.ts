import { makeAutoObservable, runInAction } from 'mobx'
import { ApiStore } from './ApiStore'

export class Manga {
	constructor(
		public id = '',
		public title = '',
		public description = '',
		public imageId = '',
		public imageUrl = '',
		public chapters = '',
		public status = '',
		public tags: string[] = [],
		public created = '',
		public updated = ''
	) {
		makeAutoObservable(this)
	}

	setImageUrl = (imageUrl: string) => {
		this.imageUrl = imageUrl
	}
}

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
}

export class MangaStore {
	selectedManga = new Manga()
	selectedChapter = new Chapter()
	selectedChapterImages: string[] = []

	constructor(private apiStore: ApiStore) {
		makeAutoObservable(this)
	}

	setSelectedManga = async (data: Manga | string) => {
		const selectedManga =
			typeof data === 'string' ? await this.apiStore.getManga(data) : data

		runInAction(() => {
			this.selectedManga = selectedManga
		})
	}

	onChapterLoad = async (chapterId: string) => {
		const chapterImages = await this.apiStore.getChapterImages(chapterId)
		runInAction(() => {
			this.selectedChapterImages = chapterImages
		})
	}

	onChapterClick = async (chapterNumber: string) => {
		const chapter = await this.apiStore.getChapter(
			this.selectedManga.id,
			chapterNumber
		)

		runInAction(() => {
			this.selectedChapter = chapter
		})

		const chapterImages = await this.apiStore.getChapterImages(chapter.id)

		runInAction(() => {
			this.selectedChapterImages = chapterImages
		})
	}
}
