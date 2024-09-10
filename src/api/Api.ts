import axios from 'axios'
import { Chapter, Manga } from 'features/manga/MangaStore'

export class Api {
	baseUrl = 'https://andyn_mega_manga_api.org'
	isDevEnv = process.env.NODE_ENV === 'development' ? true : false

	searchManga = async (name: string): Promise<Manga[]> => {
		if (this.isDevEnv) return []

		return await axios({
			method: 'GET',
			url: `${this.baseUrl}`,
			params: { name: name },
		}).then((res) => res.data)
	}

	getManga = async (mangaId: string): Promise<Manga> => {
		if (this.isDevEnv) return {} as Manga

		return await axios({
			method: 'GET',
			url: `${this.baseUrl}/${mangaId}`,
		}).then((res) => res.data)
	}

	getChapter = async (
		mangaId: string,
		chapterId: string
	): Promise<Chapter> => {
		if (this.isDevEnv) return {} as Chapter

		return await axios({
			method: 'GET',
			url: `${this.baseUrl}/${mangaId}`,
			params: { chapter: chapterId },
		}).then((res) => res.data)
	}
}
