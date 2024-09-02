import { MangaDexStore } from './MangaDexStore'
import { SearchStore } from './SearchStore'

export class RootStore {
	mangaDexStore = new MangaDexStore()
	searchStore = new SearchStore(this.mangaDexStore)
}
