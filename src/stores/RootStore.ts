import { ApiStore } from './ApiStore'
import { MangaStore } from './MangaStore'
import { SearchStore } from './SearchStore'

export class RootStore {
	apiStore = new ApiStore()
	searchStore = new SearchStore(this.apiStore)
	mangaStore = new MangaStore(this.apiStore)
}
