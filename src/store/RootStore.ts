import { AppStore } from './AppStore'
import { MangaStore } from '../features/manga/MangaStore'
import { UserStore } from './UserStore'

class RootStore {
	appStore = new AppStore()
	userStore = new UserStore()
	mangaStore: MangaStore = new MangaStore()
}

export const rootStore = new RootStore()
