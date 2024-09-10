import { AppStore } from './AppStore'
import { MangaStore } from '../features/manga/MangaStore'
import { UserStore } from './UserStore'
// import { MangaDexStore } from 'dev/mangaDex/MangaDexStore'

class RootStore {
	appStore = new AppStore()
	userStore = new UserStore()
	mangaStore: MangaStore = new MangaStore()

	constructor() {
		// if (process.env.NODE_ENV === 'development') {
		// 	this.mangaStore = new MangaDexStore()
		// }
	}
}

export const rootStore = new RootStore()
