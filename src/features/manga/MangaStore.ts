import { makeAutoObservable } from 'mobx'
import { ApiStore } from '../../store/ApiStore'
import { Manga } from './MangaModel'

export class MangaStore {
	manga = new Manga()

	constructor(private apiStore: ApiStore) {
		makeAutoObservable(this)
	}

	setManga = (manga: Manga) => {
		this.manga = manga
	}

	getManga = async (mangaId: string) => {
		const manga = await this.apiStore.getManga(mangaId)
		return manga
	}
}
