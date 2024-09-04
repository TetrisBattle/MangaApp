import { Card, CardContent, Stack, Typography } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'

export const MangaInfo = observer(() => {
	const { mangaStore } = useStore()

	const convertDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('fi-Fi')
	}

	return (
		<Card>
			<CardContent>
				<Typography
					variant='h1'
					sx={{
						fontWeight: (theme) =>
							theme.typography.fontWeightMedium,
						fontSize: 32,
						mb: 1,
					}}
				>
					Information
				</Typography>

				<Stack gap={1}>
					<Typography>
						Chapters: {mangaStore.manga.chapters}
					</Typography>

					<Typography>Status: {mangaStore.manga.status}</Typography>

					<Typography>
						Tags:{' '}
						{mangaStore.manga.tags.map((tag: string, i) => {
							return (
								<Typography
									key={'manga-tag-' + i}
									component='span'
									sx={{
										width: 'max-content !important',
										display: 'inline-block',
									}}
								>
									<Typography component='span'>
										{tag}
									</Typography>
									{i < mangaStore.manga!.tags.length - 1 && (
										<Typography component='span'>
											,{'\xa0'}
										</Typography>
									)}
								</Typography>
							)
						})}
					</Typography>

					<Typography>
						Created: {convertDate(mangaStore.manga.created)}
					</Typography>

					<Typography>
						Updated: {convertDate(mangaStore.manga.updated)}
					</Typography>
				</Stack>
			</CardContent>
		</Card>
	)
})
