import { ApiStore } from './ApiStore'
import { AppStore } from './AppStore'
import { SearchStore } from 'features/header/SearchStore'
import { MangaStore } from '../features/manga/MangaStore'

class RootStore {
	apiStore = new ApiStore()
	appStore = new AppStore()
	searchStore = new SearchStore(this.apiStore)
	mangaStore = new MangaStore(this.apiStore)
}

export const rootStore = new RootStore()
