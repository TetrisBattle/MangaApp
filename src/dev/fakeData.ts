const noImageUrl =
	'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
const chapterImageUrls = [
	'https://cdn.pixabay.com/photo/2017/01/31/14/19/birthday-2024492_1280.png',
	'https://cdn.pixabay.com/photo/2017/01/31/14/19/birthday-2024494_1280.png',
	'https://cdn.pixabay.com/photo/2017/01/31/14/19/birthday-2024495_1280.png',
]

export const fakeData = {
	manga: {
		id: '1',
		title: 'Title',
		description: 'Description',
		coverUrl: noImageUrl,
		chapters: [
			{
				id: '1',
				number: 1,
				imageUrls: chapterImageUrls,
			},
			{
				id: '2',
				number: 2,
				imageUrls: chapterImageUrls,
			},
		],
		status: 'Ongoing',
		tags: ['Action', 'Adventure', 'Comedy', 'Drama'],
		created: '2021-01-01',
		updated: '2021-01-01',
	},
}
