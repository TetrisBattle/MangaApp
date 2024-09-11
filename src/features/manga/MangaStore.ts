import { makeAutoObservable, runInAction } from 'mobx'
import { Api } from 'api/Api'

export type Manga = {
	id: string
	title: string
	description: string
	coverUrl: string
	chapters: Chapter[]
	status: string
	tags: string[]
	created: string
	updated: string
}

export type Chapter = {
	id: string
	pages: string[]
	imageUrls: string[]
}

export class MangaStore {
	private api = new Api()
	manga: Manga = {
		id: '',
		title: '',
		description: '',
		coverUrl: '',
		chapters: [],
		status: '',
		tags: [],
		created: '',
		updated: '',
	}

	// url params
	source = 'dev'
	mangaId = ''
	chapterId = ''

	constructor() {
		makeAutoObservable(this)
	}

	get selectedChapter() {
		const chapter = this.manga.chapters.find(
			(chapter) => chapter.id === this.chapterId
		)
		return chapter
	}

	onLoad = async (source: string, mangaId: string, chapterId?: string) => {
		if (process.env.NODE_ENV !== 'development') {
			runInAction(() => {
				this.source = source
			})
		}

		if (this.manga.id !== mangaId) {
			const manga = await this.api.getManga(mangaId)
			runInAction(() => {
				this.mangaId = mangaId
				this.manga = manga
			})
		}

		if (chapterId) {
			const chapter = await this.api.getChapter(mangaId, chapterId)
			runInAction(() => {
				this.chapterId = chapterId
				if (!this.selectedChapter) {
					throw new Error('Current chapter not found')
				}
				this.selectedChapter.imageUrls = chapter.imageUrls
			})
		}
	}

	search = async (name: string) => {
		return await this.api.searchManga(name)
	}
}
