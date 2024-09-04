import { makeAutoObservable } from 'mobx'
import { AppStore } from '../../store/AppStore'
import { ApiStore } from '../../store/ApiStore'
import { Chapter } from './ChapterModel'

type ScrollPos = 'top' | 'bottom' | 'middle'

export class ChapterStore {
	chapter = new Chapter()
	chapterImages: string[] = []
	scrollPos: ScrollPos = 'top'

	constructor(
		private apiStore: ApiStore,
		private appStore: AppStore
	) {
		makeAutoObservable(this)
	}

	setChapter = (chapter: Chapter) => {
		this.chapter = chapter
	}

	setChapterImages = (chapterImages: string[]) => {
		this.chapterImages = chapterImages
	}

	setScrollPos = (scrollPos: ScrollPos) => {
		this.scrollPos = scrollPos

		if (scrollPos === 'top' || scrollPos === 'bottom') {
			this.appStore.setShowHeader(true)
		} else this.appStore.setShowHeader(false)
	}

	getChapter = async (chapterId: string) => {
		const chapter = await this.apiStore.getChapter(chapterId)
		return chapter
	}

	getChapterByNumber = async (mangaId: string, chapterNumber: string) => {
		const chapter = await this.apiStore.getChapterByNumber(
			mangaId,
			chapterNumber
		)
		return chapter
	}

	getFirstChapter = async (mangaId: string) => {
		const chapter = await this.apiStore.getFirstChapter(mangaId)
		return chapter
	}

	getLastChapter = async (mangaId: string) => {
		const chapter = await this.apiStore.getLastChapter(mangaId)
		return chapter
	}

	getChapterImages = async (chapterId: string) => {
		const chapterImages = await this.apiStore.getChapterImages(chapterId)
		return chapterImages
	}
}
