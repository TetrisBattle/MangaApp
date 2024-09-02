import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { Manga } from './MangaStore'
import { MangaDto } from 'types/MangaDto'
import { ImageDto } from 'types/ImageDto'

export class ApiStore {
	baseUrl = 'https://api.mangadex.org'
	imagesUrl = 'https://uploads.mangadex.org/covers'

	constructor() {
		makeAutoObservable(this)
	}

	getMangaById = async (id: string): Promise<Manga> => {
		const mangaRes = await axios({
			method: 'GET',
			url: `${this.baseUrl}/manga/${id}`,
		})
		const mangaDto: MangaDto = mangaRes.data.data
		const manga = this.convertFromMangaDto(mangaDto)

		const imageRes = await axios({
			method: 'GET',
			url: `${this.baseUrl}/cover/${manga.imageId}`,
		})
		const imageDto: ImageDto = imageRes.data.data
		manga.setImageUrl(
			`${this.imagesUrl}/${manga.id}/${imageDto.attributes.fileName}`
		)

		return manga
	}

	getMangasBySearch = async (title: string): Promise<Manga[]> => {
		const searchRes = await axios({
			method: 'GET',
			url: `${this.baseUrl}/manga`,
			params: { title: title },
		})
		const mangaDtoDatas: MangaDto[] = searchRes.data.data.map(
			(data: MangaDto[]) => data
		)
		const mangas: Manga[] = mangaDtoDatas.map((mangaDto) => {
			return this.convertFromMangaDto(mangaDto)
		})

		const imageResponses = await axios({
			method: 'GET',
			url: `${this.baseUrl}/cover`,
			params: { ids: mangas.map((manga) => manga.imageId) },
		})
		imageResponses.data.data.forEach((imageDto: ImageDto) => {
			const manga = mangas.find((manga) => manga.imageId === imageDto.id)
			if (!manga) return
			manga.setImageUrl(
				`https://uploads.mangadex.org/covers/${manga.id}/${imageDto.attributes.fileName}`
			)
		})

		return mangas
	}

	convertFromMangaDto = (mangaDto: MangaDto) => {
		const imageId =
			mangaDto.relationships.find((r) => r.type === 'cover_art')?.id || ''

		return new Manga(
			mangaDto.id,
			mangaDto.attributes.title.en,
			mangaDto.attributes.description.en,
			imageId,
			'',
			mangaDto.attributes.lastChapter,
			mangaDto.attributes.status,
			mangaDto.attributes.tags.map((tag) => tag.attributes.name.en),
			mangaDto.attributes.createdAt,
			mangaDto.attributes.updatedAt
		)
	}
}
