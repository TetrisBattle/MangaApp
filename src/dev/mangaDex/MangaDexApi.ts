import axios from 'axios'
import { MangaDto } from './dto/MangaDto'
import { CoverDto } from './dto/CoverDto'
import { ChapterDto } from 'dev/mangaDex/dto/ChapterDto'
import { ChapterImagesDto } from './dto/ChapterImagesDto'
import { Manga, Chapter } from 'features/manga/MangaStore'

export class MangaDexApi {
	baseUrl = 'https://api.mangadex.org'
	coversUrl = 'https://uploads.mangadex.org/covers'

	searchManga = async (title: string): Promise<Manga[]> => {
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
		})
			.then((res) => res.data.data)
			.then((mangaDtos: MangaDto[]) =>
				Promise.all(
					mangaDtos.map(async (mangaDto) => {
						return this.convertFromMangaDto(mangaDto)
					})
				)
			)
	}

	getManga = async (mangaId: string): Promise<Manga> => {
		return await axios({
			method: 'GET',
			url: `${this.baseUrl}/manga/${mangaId}`,
		})
			.then((res) => res.data.data)
			.then((mangaDto: MangaDto) => this.convertFromMangaDto(mangaDto))
			.then(async (manga: Manga) => {
				manga.chapters = await this.getChapters(manga.id)
				return manga
			})
	}

	getChapters = async (mangaId: string): Promise<Chapter[]> => {
		return await this.getChapterDtos(mangaId)
			.then((chapterDtos: ChapterDto[]) =>
				chapterDtos
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
			)
			.then((chapterDtos) =>
				chapterDtos.map((chapterDto) =>
					this.convertFromChapterDto(chapterDto)
				)
			)
	}

	getChapterImageUrls = async (chapterId: string) => {
		const chapterImagesDto: ChapterImagesDto = await axios({
			method: 'GET',
			url: `${this.baseUrl}/at-home/server/${chapterId}`,
		}).then((res) => res.data)

		const chapterImagesData: {
			host: string
			hash: string
			images: string[]
		} = {
			host: chapterImagesDto.baseUrl,
			hash: chapterImagesDto.chapter.hash,
			images: chapterImagesDto.chapter.data,
		}

		return chapterImagesData.images.map(
			(image) =>
				`${chapterImagesData.host}/data/${chapterImagesData.hash}/${image}`
		)
	}

	private convertFromMangaDto = async (
		mangaDto: MangaDto
	): Promise<Manga> => {
		return {
			id: mangaDto.id,
			title: mangaDto.attributes.title.en,
			description: mangaDto.attributes.description.en,
			coverUrl: await this.getCoverUrl(mangaDto),
			chapters: [],
			status: mangaDto.attributes.status,
			tags: mangaDto.attributes.tags.map((tag) => tag.attributes.name.en),
			created: mangaDto.attributes.createdAt,
			updated: mangaDto.attributes.updatedAt,
		}
	}

	private convertFromChapterDto = (chapterDto: ChapterDto): Chapter => {
		return {
			id: chapterDto.id,
			number: Number(chapterDto.attributes.chapter),
			imageUrls: [],
		}
	}

	private getCoverUrl = async (mangaDto: MangaDto) => {
		const coverId =
			mangaDto.relationships.find((r) => r.type === 'cover_art')?.id || ''

		const coverDto: CoverDto = await axios({
			method: 'GET',
			url: `${this.baseUrl}/cover/${coverId}`,
		}).then((res) => res.data.data)

		return `${this.coversUrl}/${mangaDto.id}/${coverDto.attributes.fileName}`
	}

	private async getChapterDtos(
		mangaId: string,
		offset: number = 0,
		arr: ChapterDto[] = []
	): Promise<ChapterDto[]> {
		const maxLimit = 50

		const chapterDtos: ChapterDto[] = await axios({
			method: 'GET',
			url: `${this.baseUrl}/manga/${mangaId}/feed`,
			params: {
				offset: offset,
				limit: maxLimit,
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
		}).then((res) => res.data.data)

		arr.push(...chapterDtos)

		if (arr.length === offset + maxLimit) {
			return await this.getChapterDtos(mangaId, offset + maxLimit, arr)
		} else return arr
	}
}
