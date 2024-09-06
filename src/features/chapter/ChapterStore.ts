import { makeAutoObservable } from 'mobx'
import { AppStore } from '../../store/AppStore'
import { ApiStore } from '../../store/ApiStore'
import { Chapter } from './ChapterModel'
import { Manga } from 'features/manga/MangaModel'
import { ChapterImages } from './ChapterImagesModel'

type ScrollPos = 'top' | 'bottom' | 'middle'

export class ChapterStore {
	chapter = new Chapter()
	chapterImageUrls: string[] = []
	scrollPos: ScrollPos = 'top'

	constructor(
		private apiStore: ApiStore,
		private appStore: AppStore
	) {
		makeAutoObservable(this)
	}

	setChapter = (chapter: Chapter) => {
		this.chapter = chapter
	}

	setChapterImageUrls = (chapterImageUrls: string[]) => {
		this.chapterImageUrls = chapterImageUrls
	}

	setScrollPos = (scrollPos: ScrollPos) => {
		this.scrollPos = scrollPos

		if (scrollPos === 'top' || scrollPos === 'bottom') {
			this.appStore.setShowHeader(true)
		} else this.appStore.setShowHeader(false)
	}

	getChapter = async (chapterId: string) => {
		const chapterDto = await this.apiStore.getChapterDto(chapterId)
		return Chapter.convertFromDto(chapterDto)
	}

	getChapterByNumber = async (mangaId: string, chapterNumber: string) => {
		const chapterDto = await this.apiStore.getChapterDtoByNumber(
			mangaId,
			chapterNumber
		)
		return Chapter.convertFromDto(chapterDto)
	}

	getFirstChapter = async (manga: Manga) => {
		const chapterDtos = await this.apiStore.getChapterDtos(manga, {
			order: 'asc',
		})
		return Chapter.convertFromDto(chapterDtos[0])
	}

	getLastChapter = async (manga: Manga) => {
		const chapterDtos = await this.apiStore.getChapterDtos(manga, {
			order: 'desc',
		})
		return Chapter.convertFromDto(chapterDtos[0])
	}

	getChapterImageUrls = async (chapterId: string) => {
		const chapterImagesDtos =
			await this.apiStore.getChapterImageDtos(chapterId)

		const chapterImages = ChapterImages.convertFromDto(chapterImagesDtos)

		return chapterImages.data.map(
			(image) =>
				`${chapterImages.host}/data/${chapterImages.hash}/${image}`
		)
	}
}
