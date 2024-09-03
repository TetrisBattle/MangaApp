import { makeAutoObservable, runInAction } from 'mobx'
import { AppStore } from './AppStore'
import { ApiStore } from './ApiStore'

type ScrollPos = 'top' | 'bottom' | 'middle'

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

export class ChapterStore {
	scrollPos: ScrollPos = 'top'
	showHeader = true
	selectedChapter = new Chapter()
	selectedChapterImages: string[] = []

	constructor(
		private apiStore: ApiStore,
		private appStore: AppStore
	) {
		makeAutoObservable(this)
	}

	setScrollPos = (scrollPos: ScrollPos) => {
		this.scrollPos = scrollPos

		if (scrollPos === 'top' || scrollPos === 'bottom') {
			this.appStore.setShowHeader(true)
		} else this.appStore.setShowHeader(false)
	}

	onChapterLoad = async (chapterId: string) => {
		const chapterImages = await this.apiStore.getChapterImages(chapterId)
		runInAction(() => {
			this.selectedChapterImages = chapterImages
		})
	}
}
