import axios from 'axios'
import { Manga } from 'features/manga/MangaStore'
import { fakeData } from '../dev/fakeData'
import { MangaDexApi } from 'dev/mangaDex/MangaDexApi'

export class Api {
	baseUrl = 'https://andyn_mega_manga_api.org'
	isDevEnv = process.env.NODE_ENV === 'development' ? true : false
	source = ''
	mangaDexApi = new MangaDexApi()

	setSource = (source: string) => {
		this.source = source
	}

	searchManga = async (name: string): Promise<Manga[]> => {
		if (this.source === 'mangadex') {
			return await this.mangaDexApi.searchManga(name)
		}

		if (this.isDevEnv) return [fakeData.manga]

		return await axios({
			method: 'GET',
			url: `${this.baseUrl}`,
			params: { name: name },
		}).then((res) => res.data)
	}

	getManga = async (mangaId: string): Promise<Manga> => {
		if (this.source === 'mangadex') {
			return await this.mangaDexApi.getManga(mangaId)
		}

		if (this.isDevEnv) return fakeData.manga

		return await axios({
			method: 'GET',
			url: this.baseUrl,
			params: { mangaId: mangaId },
		}).then((res) => res.data)
	}

	getChapterImageUrls = async (
		mangaId: string,
		chapterId: string
	): Promise<string[]> => {
		if (this.source === 'mangadex') {
			return await this.mangaDexApi.getChapterImageUrls(chapterId)
		}

		if (this.isDevEnv) {
			const fakeChapter = fakeData.manga.chapters.find(
				(chapter) => chapter.id === chapterId
			)
			if (!fakeChapter) throw new Error('Chapter not found')
			return fakeChapter.imageUrls
		}

		return await axios({
			method: 'GET',
			url: this.baseUrl,
			params: { mangaId: mangaId, chapterId: chapterId },
		}).then((res) => res.data)
	}
}
