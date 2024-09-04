import { Manga } from 'features/manga/MangaModel'
import { makeAutoObservable, runInAction } from 'mobx'
import { ApiStore } from 'store/ApiStore'

export class SearchStore {
	isSearching = false
	search = ''
	searchResults: Manga[] = []

	constructor(private apiStore: ApiStore) {
		makeAutoObservable(this)
	}

	resetSearch = () => {
		this.search = ''
		this.searchResults = []
	}

	setIsSearching = (isSearching: boolean) => {
		this.isSearching = isSearching
	}

	setSearch = async (search: string) => {
		if (!search) {
			this.resetSearch()
			return
		}

		this.search = search
		const mangas = await this.apiStore.getSearchResult(search)
		runInAction(() => {
			this.searchResults = mangas
		})
	}
}
