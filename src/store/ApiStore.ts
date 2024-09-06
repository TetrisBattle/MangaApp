import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { Manga } from 'features/manga/MangaModel'
import { MangaDto } from 'features/manga/MangaDto'
import { ChapterDto } from 'features/chapter/ChapterDto'
import { ChapterImagesDto } from 'features/chapter/ChapterImagesModel'

type Options = {
	limit?: number
	offset?: number
	order?: 'asc' | 'desc'
	chapter?: string
}

type CoverDto = {
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

	getMangaDto = async (mangaId: string): Promise<MangaDto> => {
		return await axios({
			method: 'GET',
			url: `${this.baseUrl}/manga/${mangaId}`,
		}).then((res) => res.data.data)
	}

	searchMangaDtos = async (title: string): Promise<MangaDto[]> => {
		return await axios({
			method: 'GET',
			url: `${this.baseUrl}/manga`,
			params: {
				title: title,
				order: { latestUploadedChapter: 'desc' },
				includes: ['manga'],
				availableTranslatedLanguage: ['en'],
				hasAvailableChapters: true,
			},
		}).then((res) => res.data.data)
	}

	getCoverDto = async (mangas: Manga[]): Promise<CoverDto> => {
		return await axios({
			method: 'GET',
			url: `${this.baseUrl}/cover`,
			params: { ids: mangas.map((manga) => manga.coverId) },
		})
	}

	getCoverUrl = async (manga: Manga): Promise<string> => {
		const coverDto: CoverDto = await axios({
			method: 'GET',
			url: `${this.baseUrl}/cover/${manga.coverId}`,
		}).then((res) => res.data.data)
		return `${this.coversUrl}/${manga.id}/${coverDto.attributes.fileName}`
	}

	getChapterDtos = async (
		manga: Manga,
		options: Options = { limit: 100, offset: 0 }
	): Promise<ChapterDto[]> => {
		const { limit, offset, order, chapter } = {
			limit: options?.limit ?? 100,
			offset: options?.offset ?? 0,
			order: options?.order ?? 'asc',
			chapter: options?.chapter,
		}

		const chapterDtos: ChapterDto[] = await axios({
			method: 'GET',
			url: `${this.baseUrl}/manga/${manga.id}/feed`,
			params: {
				chapter: chapter,
				offset: offset,
				limit: limit,
				translatedLanguage: ['en'],
				includes: ['manga'],
				order: {
					chapter: order ?? 'asc',
					volume: 'desc',
					readableAt: 'desc',
					publishAt: 'desc',
					updatedAt: 'desc',
					createdAt: 'desc',
				},
			},
		}).then((res) => res.data.data)

		const hasAllChapters =
			chapterDtos[chapterDtos.length - 1].attributes.chapter ===
			manga.lastChapter.toString()

		if (!hasAllChapters) {
			const moreChapterDtos = await this.getChapterDtos(manga, {
				limit: limit,
				offset: offset + 100,
			})

			chapterDtos.push(...moreChapterDtos)
		}

		return this.filterChapters(chapterDtos)
	}

	getChapterImageDtos = async (
		chapterId: string
	): Promise<ChapterImagesDto> => {
		return await axios({
			method: 'GET',
			url: `${this.baseUrl}/at-home/server/${chapterId}`,
		}).then((res) => res.data)
	}

	private filterChapters = (chapterDtos: ChapterDto[]) => {
		return chapterDtos
			.filter((chapterDto) => {
				const hasNoPages = chapterDto.attributes.pages === 0
				return !hasNoPages
			})
			.filter((chapterDto, index, arr) => {
				if (index === 0) return true

				const isSameChapter =
					chapterDto.attributes.chapter ===
					arr[index - 1].attributes.chapter

				return !isSameChapter
			})
	}
}
