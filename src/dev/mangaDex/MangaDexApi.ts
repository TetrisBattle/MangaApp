import axios from 'axios'
import { MangaDto } from 'dev/mangaDex/MangaDto'
import { ChapterDto } from 'dev/mangaDex/ChapterDto'
import { ChapterImagesDto } from 'dev/mangaDex/ChapterImagesModel'
import { Manga } from './Manga'
import { Chapter } from './Chapter'

type Options = {
	limit?: number
	offset?: number
	order?: 'asc' | 'desc'
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

export class MangaDexApi {
	baseUrl = 'https://api.mangadex.org'
	coversUrl = 'https://uploads.mangadex.org/covers'
	maxLimit = 500

	static convertFromChapterDto = (chapterDto: ChapterDto) => {
		return new Chapter(
			chapterDto.id,
			chapterDto.attributes.chapter,
			chapterDto.attributes.pages,
			chapterDto.attributes.publishAt,
			chapterDto.attributes.readableAt,
			chapterDto.attributes.createdAt,
			chapterDto.attributes.updatedAt
		)
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
		options?: Options
	): Promise<ChapterDto[]> => {
		const { limit, offset, order } = {
			limit: options?.limit ?? this.maxLimit,
			offset: options?.offset ?? 0,
			order: options?.order ?? 'asc',
		}

		const chapterDtos: ChapterDto[] = await axios({
			method: 'GET',
			url: `${this.baseUrl}/manga/${manga.id}/feed`,
			params: {
				offset: offset,
				limit: limit,
				translatedLanguage: ['en'],
				includes: ['manga'],
				order: {
					chapter: order === 'asc' ? 'asc' : 'desc',
					volume: 'desc',
					readableAt: 'desc',
					publishAt: 'desc',
					updatedAt: 'desc',
					createdAt: 'desc',
				},
			},
		}).then((res) => res.data.data)

		return this.filterChapters(chapterDtos)
	}

	getAllChapterDtos = async (manga: Manga, options?: Options) => {
		const { offset, order } = {
			offset: options?.offset ?? 0,
			order: options?.order ?? 'desc',
		}

		const chapterDtos = await this.getChapterDtos(manga, {
			offset: offset,
			order: order,
		})

		const lastChapter =
			order === 'asc' ? manga.lastChapterNumber : manga.firstChapterNumber

		const hasLastChapter =
			chapterDtos[chapterDtos.length - 1].attributes.chapter ===
			lastChapter

		if (!hasLastChapter) {
			const moreChapterDtos = await this.getAllChapterDtos(manga, {
				offset: offset + this.maxLimit,
				order: order,
			})

			chapterDtos.push(...moreChapterDtos)
		}

		return chapterDtos
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
