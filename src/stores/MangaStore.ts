import { makeAutoObservable, runInAction } from 'mobx'
import { ApiStore } from './ApiStore'

export class Manga {
	constructor(
		public id = '',
		public title = '',
		public description = '',
		public imageId = '',
		public imageUrl = '',
		public chapters = '',
		public status = '',
		public tags: string[] = [],
		public created = '',
		public updated = ''
	) {
		makeAutoObservable(this)
	}

	setImageUrl = (imageUrl: string) => {
		this.imageUrl = imageUrl
	}
}

export class MangaStore {
	selectedManga = new Manga()

	constructor(private apiStore: ApiStore) {
		makeAutoObservable(this)
	}

	setSelectedManga = async (data: Manga | string) => {
		const selectedManga =
			typeof data === 'string'
				? await this.apiStore.getMangaById(data)
				: data

		runInAction(() => {
			this.selectedManga = selectedManga
		})
	}
}
