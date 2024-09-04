import { ApiStore } from './ApiStore'
import { AppStore } from './AppStore'
import { SearchStore } from 'features/header/SearchStore'
import { MangaStore } from '../features/manga/MangaStore'
import { ChapterStore } from '../features/chapter/ChapterStore'

export class RootStore {
	apiStore = new ApiStore()
	appStore = new AppStore()
	searchStore = new SearchStore(this.apiStore)
	mangaStore = new MangaStore(this.apiStore)
	chapterStore = new ChapterStore(this.apiStore, this.appStore)
}
