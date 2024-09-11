import axios from 'axios'
import { Chapter, Manga } from 'features/manga/MangaStore'
import { fakeData } from '../dev/fakeData'

export class Api {
	baseUrl = 'https://andyn_mega_manga_api.org'
	isDevEnv = process.env.NODE_ENV === 'development' ? true : false

	searchManga = async (name: string): Promise<Manga[]> => {
		if (this.isDevEnv) return [fakeData.manga]

		return await axios({
			method: 'GET',
			url: `${this.baseUrl}`,
			params: { name: name },
		}).then((res) => res.data)
	}

	getManga = async (mangaId: string): Promise<Manga> => {
		if (this.isDevEnv) return fakeData.manga

		return await axios({
			method: 'GET',
			url: `${this.baseUrl}/${mangaId}`,
		}).then((res) => res.data)
	}

	getChapter = async (
		mangaId: string,
		chapterId: string
	): Promise<Chapter> => {
		if (this.isDevEnv) {
			const fakeChapter = fakeData.manga.chapters.find(
				(chapter) => chapter.id === chapterId
			)
			if (!fakeChapter) throw new Error('Chapter not found')
			return fakeChapter
		}

		return await axios({
			method: 'GET',
			url: `${this.baseUrl}/${mangaId}`,
			params: { chapter: chapterId },
		}).then((res) => res.data)
	}
}
