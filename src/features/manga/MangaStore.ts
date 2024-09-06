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

	getManga = async (mangaId: string): Promise<Manga> => {
		const mangaDto = await this.apiStore.getMangaDto(mangaId)
		const manga = Manga.convertFromDto(mangaDto)
		const coverUrl = await this.apiStore.getCoverUrl(manga)

		manga.setImageUrl(coverUrl)

		return manga
	}
}
