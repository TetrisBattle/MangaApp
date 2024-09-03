import { ApiStore } from './ApiStore'
import { AppStore } from './AppStore'
import { ChapterStore } from './ChapterStore'
import { MangaStore } from './MangaStore'
import { SearchStore } from './SearchStore'

export class RootStore {
	apiStore = new ApiStore()
	appStore = new AppStore()
	searchStore = new SearchStore(this.apiStore)
	mangaStore = new MangaStore(this.apiStore)
	chapterStore = new ChapterStore(this.apiStore, this.appStore)
}
