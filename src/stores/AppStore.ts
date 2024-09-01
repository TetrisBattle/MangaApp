import { makeAutoObservable } from 'mobx'

export class AppStore {
	isSearching = false
	search = ''

	constructor() {
		makeAutoObservable(this)
	}

	setIsSearching = (isSearching: boolean) => {
		this.isSearching = isSearching
	}

	setSearch = (search: string) => {
		this.search = search
	}
}
