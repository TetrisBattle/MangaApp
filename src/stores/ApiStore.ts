import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { Chapter, Manga } from './MangaStore'
import { MangaDto } from 'types/MangaDto'
import { ImageDto } from 'types/ImageDto'
import { ChapterDto } from 'types/ChapterDto'
import { ChapterImageDto } from 'types/ChapterImageDto'

export class ApiStore {
	baseUrl = 'https://api.mangadex.org'
	coversUrl = 'https://uploads.mangadex.org/covers'

	constructor() {
		makeAutoObservable(this)
	}

	getManga = async (mangaId: string): Promise<Manga> => {
		const mangaRes = await axios({
			method: 'GET',
			url: `${this.baseUrl}/manga/${mangaId}`,
		})
		const mangaDto: MangaDto = mangaRes.data.data
		const manga = this.convertFromMangaDto(mangaDto)

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
			return this.convertFromMangaDto(mangaDto)
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

	getChapter = async (mangaId: string, chapterNumber: string) => {
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
					createdAt: 'asc',
					updatedAt: 'asc',
					publishAt: 'asc',
					readableAt: 'asc',
					volume: 'asc',
					chapter: 'asc',
				},
			},
		})

		const chapterDto: ChapterDto = chapterRes.data.data[0]

		const chapter = new Chapter(
			chapterDto.id,
			chapterDto.attributes.chapter,
			chapterDto.attributes.pages,
			chapterDto.attributes.publishAt,
			chapterDto.attributes.readableAt,
			chapterDto.attributes.createdAt,
			chapterDto.attributes.updatedAt
		)

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
