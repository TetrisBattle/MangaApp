import { ApiStore } from './ApiStore'
import { AppStore } from './AppStore'
import { SearchStore } from 'features/header/SearchStore'
import { MangaStore } from '../features/manga/MangaStore'
import { UserStore } from './UserStore'

class RootStore {
	apiStore = new ApiStore()
	appStore = new AppStore()
	userStore = new UserStore()
	searchStore = new SearchStore(this.apiStore)
	mangaStore = new MangaStore(this.apiStore)
}

export const rootStore = new RootStore()
