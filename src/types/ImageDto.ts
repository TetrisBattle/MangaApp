export type ImageDto = {
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
