import { Manga } from 'features/manga/MangaModel'
import { makeAutoObservable, runInAction } from 'mobx'
import { ApiStore } from 'store/ApiStore'

export class SearchStore {
	searchResults: Manga[] = []
	title = ''
	isSearching = false

	constructor(private apiStore: ApiStore) {
		makeAutoObservable(this)
	}

	reset = () => {
		this.title = ''
		this.searchResults = []
		this.isSearching = false
	}

	setTitle = (title: string) => {
		this.title = title
		if (!title) return

		this.search(title)
	}

	setIsSearching = (isSearching: boolean) => {
		this.isSearching = isSearching
	}

	search = async (title: string) => {
		const mangaDtos = await this.apiStore.searchMangaDtos(title)
		const mangas = mangaDtos.map((mangaDto) =>
			Manga.convertFromDto(mangaDto)
		)

		mangas.forEach(async (manga) => {
			const coverUrl = await this.apiStore.getCoverUrl(manga)
			manga.setImageUrl(coverUrl)
		})

		runInAction(() => {
			this.searchResults = mangas
		})
	}
}
