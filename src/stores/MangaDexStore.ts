import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { Manga } from './SearchStore'

export class MangaDexStore {
	baseUrl = 'https://api.mangadex.org'

	constructor() {
		makeAutoObservable(this)
	}

	getMangas = async (search: string): Promise<Manga[]> => {
		const dexMangas = await axios({
			method: 'GET',
			url: `${this.baseUrl}/manga`,
			params: { title: search },
		})

		const dexMangaDatas: Manga[] = dexMangas.data.data.map(
			(data: any) => data
		)

		const mangas: Manga[] = dexMangaDatas.map((dexMangaData: any) => {
			const imageId = dexMangaData.relationships.find(
				(r: any) => r.type === 'cover_art'
			).id

			return {
				id: dexMangaData.id,
				title: dexMangaData.attributes.title.en,
				description: dexMangaData.attributes.description.en,
				imageId: imageId,
				imageUrl: '',
			}
		})

		const dexImages = await axios({
			method: 'GET',
			url: `${this.baseUrl}/cover`,
			params: { ids: mangas.map((manga) => manga.imageId) },
		})

		dexImages.data.data.forEach((image: any) => {
			const manga = mangas.find((manga) => manga.imageId === image.id)
			if (!manga) return
			manga.imageUrl = `https://uploads.mangadex.org/covers/${manga.id}/${image.attributes.fileName}`
		})

		return mangas
	}
}
