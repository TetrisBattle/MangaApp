import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { Manga } from 'features/manga/MangaModel'
import { MangaDto } from 'features/manga/MangaDto'
import { Chapter } from 'features/chapter/ChapterModel'
import { ChapterDto } from 'features/chapter/ChapterDto'
import { ChapterImageDto } from 'features/chapter/ChapterImageDto'

type ImageDto = {
	id: string
	type: string
	attributes: {
		description: string
		volume: string
		fileName: string
		locale: string
		createdAt: string
		updatedAt: string
		version: number
	}
	relationships: Array<{
		id: string
		type: string
	}>
}

export class ApiStore {
	baseUrl = 'https://api.mangadex.org'
	coversUrl = 'https://uploads.mangadex.org/covers'

	constructor() {
		makeAutoObservable(this)
	}

	getSearchResult = async (title: string): Promise<Manga[]> => {
		const searchRes = await axios({
			method: 'GET',
			url: `${this.baseUrl}/manga`,
			params: {
				title: title,
				order: { latestUploadedChapter: 'desc' },
				includes: ['manga'],
				availableTranslatedLanguage: ['en'],
				hasAvailableChapters: true,
			},
		})
		const mangaDtos: MangaDto[] = searchRes.data.data
		const mangas: Manga[] = mangaDtos.map((mangaDto) => {
			return Manga.convertFromDto(mangaDto)
		})

		const imageRes = await axios({
			method: 'GET',
			url: `${this.baseUrl}/cover`,
			params: { ids: mangas.map((manga) => manga.imageId) },
		})
		imageRes.data.data.forEach((imageDto: ImageDto) => {
			const manga = mangas.find((manga) => manga.imageId === imageDto.id)
			if (!manga) return
			manga.setImageUrl(
				`${this.coversUrl}/${manga.id}/${imageDto.attributes.fileName}`
			)
		})

		return mangas
	}

	getManga = async (mangaId: string): Promise<Manga> => {
		const mangaRes = await axios({
			method: 'GET',
			url: `${this.baseUrl}/manga/${mangaId}`,
		})
		const mangaDto: MangaDto = mangaRes.data.data
		const manga = Manga.convertFromDto(mangaDto)

		const imageRes = await axios({
			method: 'GET',
			url: `${this.baseUrl}/cover/${manga.imageId}`,
		})
		const imageDto: ImageDto = imageRes.data.data
		manga.setImageUrl(
			`${this.coversUrl}/${manga.id}/${imageDto.attributes.fileName}`
		)

		return manga
	}

	getChapter = async (chapterId: string) => {
		const chapterRes = await axios({
			method: 'GET',
			url: `${this.baseUrl}/chapter/${chapterId}`,
		})

		const chapterDto: ChapterDto = chapterRes.data.data
		const chapter = Chapter.convertFromDto(chapterDto)

		return chapter
	}

	getChapterByNumber = async (mangaId: string, chapterNumber: string) => {
		const chapterRes = await axios({
			method: 'GET',
			url: `${this.baseUrl}/chapter`,
			params: {
				manga: mangaId,
				limit: 1,
				chapter: chapterNumber,
				translatedLanguage: ['en'],
				includes: ['manga'],
				order: {
					chapter: 'asc',
					volume: 'desc',
					readableAt: 'desc',
					publishAt: 'desc',
					updatedAt: 'desc',
					createdAt: 'desc',
				},
			},
		})

		const chapterDto: ChapterDto = chapterRes.data.data[0]
		const chapter = Chapter.convertFromDto(chapterDto)

		return chapter
	}

	getFirstChapter = async (mangaId: string) => {
		const chapterRes = await axios({
			method: 'GET',
			url: `${this.baseUrl}/manga/${mangaId}/feed`,
			params: {
				limit: 1,
				translatedLanguage: ['en'],
				includes: ['manga'],
				order: {
					chapter: 'asc',
					volume: 'desc',
					readableAt: 'desc',
					publishAt: 'desc',
					updatedAt: 'desc',
					createdAt: 'desc',
				},
			},
		})

		const chapterDto: ChapterDto = chapterRes.data.data[0]
		const chapter = Chapter.convertFromDto(chapterDto)

		return chapter
	}

	getLastChapter = async (mangaId: string) => {
		const chapterRes = await axios({
			method: 'GET',
			url: `${this.baseUrl}/manga/${mangaId}/feed`,
			params: {
				limit: 1,
				translatedLanguage: ['en'],
				includes: ['manga'],
				order: {
					chapter: 'desc',
					volume: 'desc',
					readableAt: 'desc',
					publishAt: 'desc',
					updatedAt: 'desc',
					createdAt: 'desc',
				},
			},
		})

		const chapterDto: ChapterDto = chapterRes.data.data[0]
		const chapter = Chapter.convertFromDto(chapterDto)

		return chapter
	}

	getChapterImages = async (chapterId: string) => {
		const chapterImageRes = await axios({
			method: 'GET',
			url: `${this.baseUrl}/at-home/server/${chapterId}`,
		})

		const chapterImageDtos: ChapterImageDto = chapterImageRes.data

		const chapterImageData = {
			host: chapterImageDtos.baseUrl,
			hash: chapterImageDtos.chapter.hash,
			data: chapterImageDtos.chapter.data,
		}

		const chapterImages = chapterImageData.data.map((image) => {
			return `${chapterImageData.host}/data/${chapterImageData.hash}/${image}`
		})

		return chapterImages
	}
}
