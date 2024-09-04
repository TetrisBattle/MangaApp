import { makeAutoObservable } from 'mobx'
import { MangaDto } from './MangaDto'

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

	static convertFromDto = (mangaDto: MangaDto) => {
		const imageId =
			mangaDto.relationships.find((r) => r.type === 'cover_art')?.id || ''

		return new Manga(
			mangaDto.id,
			mangaDto.attributes.title.en,
			mangaDto.attributes.description.en,
			imageId,
			'',
			mangaDto.attributes.lastChapter,
			mangaDto.attributes.status,
			mangaDto.attributes.tags.map((tag) => tag.attributes.name.en),
			mangaDto.attributes.createdAt,
			mangaDto.attributes.updatedAt
		)
	}
}
