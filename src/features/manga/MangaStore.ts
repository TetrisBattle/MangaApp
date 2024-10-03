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
	number: number
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
	mangaId = ''
	chapterId = ''
	selectedChapter: Chapter | undefined

	constructor() {
		makeAutoObservable(this)
	}

	get source() {
		return this.api.source
	}

	onLoad = async (source: string, mangaId?: string, chapterId?: string) => {
		this.api.setSource(source)

		if (!mangaId) return

		if (this.manga.id !== mangaId) {
			const manga = await this.api.getManga(mangaId)
			runInAction(() => {
				this.mangaId = mangaId
				this.manga = manga
			})
		}

		if (chapterId) {
			runInAction(() => {
				this.chapterId = chapterId
				this.selectedChapter = this.manga.chapters.find(
					(chapter) => chapter.id === this.chapterId
				)
			})

			const chapterImageUrls = await this.api.getChapterImageUrls(
				mangaId,
				chapterId
			)

			runInAction(() => {
				if (!this.selectedChapter) {
					throw new Error('Current chapter not found')
				}
				this.selectedChapter.imageUrls = chapterImageUrls
			})
		}
	}

	search = async (name: string) => {
		return await this.api.searchManga(name)
	}
}
