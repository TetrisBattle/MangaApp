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
	source = ''
	mangaId = ''
	chapterId = ''

	constructor() {
		makeAutoObservable(this)
	}

	onLoad = async (source: string, mangaId: string, chapterId?: string) => {
		if (process.env.NODE_ENV !== 'development') {
			this.source = source
		}

		if (this.manga.id !== mangaId) {
			const manga = await this.api.getManga(mangaId)
			runInAction(() => {
				this.manga = manga
			})
		}

		if (chapterId) {
			const chapter = await this.api.getChapter(mangaId, chapterId)

			const selectedChapter = this.manga.chapters.find(
				(chapter) => chapter.id === chapterId
			)
			if (!selectedChapter) return

			selectedChapter.imageUrls = chapter.imageUrls
		}
	}

	search = async (name: string) => {
		return await this.api.searchManga(name)
	}
}
