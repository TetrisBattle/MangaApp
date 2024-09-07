import { makeAutoObservable, runInAction } from 'mobx'
import { ApiStore } from '../../store/ApiStore'
import { Manga } from './MangaModel'
import { Chapter } from 'features/chapter/ChapterModel'
import { ChapterImages } from 'features/chapter/ChapterImagesModel'

export class MangaStore {
	manga = new Manga()

	constructor(private apiStore: ApiStore) {
		makeAutoObservable(this)
	}

	onLoad = async (mangaId: string, chapterId?: string) => {
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
		const mangaDto = await this.apiStore.getMangaDto(mangaId)
		const manga = Manga.convertFromDto(mangaDto)

		const coverUrl = await this.apiStore.getCoverUrl(manga)
		manga.setCoverUrl(coverUrl)

		const firstChapter = await this.apiStore
			.getChapterDtos(manga, {
				limit: 10,
				order: 'asc',
			})
			.then((chapterDtos) => Chapter.convertFromDto(chapterDtos[0]))

		manga.setFirstChapterNumber(firstChapter.number)

		const chapterDtos = await this.apiStore.getAllChapterDtos(manga)
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
			await this.apiStore.getChapterImageDtos(chapterId)

		const chapterImages = ChapterImages.convertFromDto(chapterImagesDtos)

		return chapterImages.data.map(
			(image) =>
				`${chapterImages.host}/data/${chapterImages.hash}/${image}`
		)
	}
}
