import { makeAutoObservable, runInAction } from 'mobx'
import { ApiStore } from './ApiStore'
import { Manga } from './MangaStore'

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
		const mangas = await this.apiStore.getMangasBySearch(search)
		runInAction(() => {
			this.searchResults = mangas
		})
	}
}
