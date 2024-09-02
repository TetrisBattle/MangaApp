import { Card, CardContent, Stack, Typography } from '@mui/material'
import { useStore } from 'hooks/useStore'
import { observer } from 'mobx-react-lite'

export const DetailsInfo = observer(() => {
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
						Chapters: {mangaStore.selectedManga.chapters}
					</Typography>

					<Typography>
						Status: {mangaStore.selectedManga.status}
					</Typography>

					<Typography>
						Tags:{' '}
						{mangaStore.selectedManga.tags.map((tag: string, i) => {
							return (
								<Typography
									key={'details-' + i}
									component='span'
									sx={{
										width: 'max-content !important',
										display: 'inline-block',
									}}
								>
									<Typography component='span'>
										{tag}
									</Typography>
									{i <
										mangaStore.selectedManga!.tags.length -
											1 && (
										<Typography component='span'>
											,{'\xa0'}
										</Typography>
									)}
								</Typography>
							)
						})}
					</Typography>

					<Typography>
						Created: {convertDate(mangaStore.selectedManga.created)}
					</Typography>

					<Typography>
						Updated: {convertDate(mangaStore.selectedManga.updated)}
					</Typography>
				</Stack>
			</CardContent>
		</Card>
	)
})
