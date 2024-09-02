import { makeAutoObservable, runInAction } from 'mobx'
import { MangaDexStore } from './MangaDexStore'

export type Manga = {
	id: string
	title: string
	description: string
	imageId: string
	imageUrl: string
}

export class SearchStore {
	isSearching = false
	search = ''
	searchResults: any[] = []

	constructor(private mangaDex: MangaDexStore) {
		makeAutoObservable(this)
	}

	setIsSearching = (isSearching: boolean) => {
		this.isSearching = isSearching
	}

	setSearch = async (search: string) => {
		if (!search) {
			this.search = ''
			this.searchResults = []
			return
		}

		this.search = search
		const mangas = await this.mangaDex.getMangas(search)
		runInAction(() => {
			this.searchResults = mangas
		})
	}
}
