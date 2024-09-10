import { makeAutoObservable, runInAction } from 'mobx'
import { Manga } from './Manga'
import { Chapter } from 'dev/mangaDex/Chapter'
import { MangaDexApi } from './MangaDexApi'
import { ChapterImages } from './ChapterImagesModel'

export class MangaDexStore {
	private mangaDexApi = new MangaDexApi()
	manga = new Manga()
	source = 'mangaDex'

	constructor() {
		makeAutoObservable(this)
	}

	onLoad = async (source: string, mangaId: string, chapterId?: string) => {
		if (process.env.NODE_ENV !== 'development') {
			this.source = source
		}

		if (this.manga.id !== mangaId) {
			const manga = await this.getManga(mangaId)
			runInAction(() => {
				this.manga = manga
			})
		}

		if (chapterId) {
			const chapter = await this.getChapter(chapterId)
			this.manga.setChapter(chapter)
		}
	}

	private getManga = async (mangaId: string): Promise<Manga> => {
		const mangaDto = await this.mangaDexApi.getMangaDto(mangaId)
		const manga = Manga.convertFromDto(mangaDto)

		const coverUrl = await this.mangaDexApi.getCoverUrl(manga)
		manga.setCoverUrl(coverUrl)

		const firstChapter = await this.mangaDexApi
			.getChapterDtos(manga, {
				limit: 10,
				order: 'asc',
			})
			.then((chapterDtos) => Chapter.convertFromDto(chapterDtos[0]))

		manga.setFirstChapterNumber(firstChapter.number)

		const chapterDtos = await this.mangaDexApi.getAllChapterDtos(manga)
		manga.setChapters(
			chapterDtos.map((chapterDto) => Chapter.convertFromDto(chapterDto))
		)

		return manga
	}

	private getChapter = async (chapterId: string): Promise<Chapter> => {
		const chapter = this.manga.chapters.find(
			(chapter) => chapter.id === chapterId
		)
		if (!chapter) throw new Error('Chapter not found')

		const urls = await this.getChapterImageUrls(chapterId)
		chapter.setImageUrls(urls)

		return chapter
	}

	private getChapterImageUrls = async (chapterId: string) => {
		const chapterImagesDtos =
			await this.mangaDexApi.getChapterImageDtos(chapterId)

		const chapterImages = ChapterImages.convertFromDto(chapterImagesDtos)

		return chapterImages.data.map(
			(image) =>
				`${chapterImages.host}/data/${chapterImages.hash}/${image}`
		)
	}
}
