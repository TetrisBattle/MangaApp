import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Grid2 as Grid,
	Typography,
} from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'

export const MangaChapterNav = observer(() => {
	const { mangaStore } = useStore()

	const firstChapter = mangaStore.manga.chapters[0]
	const lastChapter =
		mangaStore.manga.chapters[mangaStore.manga.chapters.length - 1]

	if (!firstChapter || !lastChapter) return <></>

	return (
		<Card>
			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
				}}
			>
				<Typography
					variant='h1'
					sx={{
						fontWeight: (theme) =>
							theme.typography.fontWeightMedium,
						fontSize: 32,
					}}
				>
					Chapters
				</Typography>

				<Divider />

				<Box
					sx={{
						mt: 1,
						display: 'flex',
						justifyContent: 'space-evenly',
						gap: 2,
						'.MuiButton-root': {
							width: 1,
							fontSize: 24,
							py: 1,
						},
					}}
				>
					<Button
						component={NavLink}
						to={`chapter/${firstChapter.id}`}
					>
						{firstChapter.number}
					</Button>
					<Button
						component={NavLink}
						to={`chapter/${lastChapter.id}`}
					>
						{lastChapter.number}
					</Button>
				</Box>

				<Grid
					container
					spacing={2}
					sx={{
						mt: 2,
						pt: 1,
						pr: 2,
						height: 200,
						overflowY: 'auto',
					}}
				>
					{mangaStore.manga.chapters
						.slice()
						.reverse()
						.map((chapter) => (
							<Grid
								key={chapter.id}
								size={{
									xs: 12 / 3,
									sm: 12 / 7,
									md: 12 / 10,
								}}
							>
								<Button
									component={NavLink}
									to={`chapter/${chapter.id}`}
									color='secondary'
									fullWidth
									sx={{ fontSize: 20, p: 0 }}
								>
									{chapter.number}
								</Button>
							</Grid>
						))}
				</Grid>
			</CardContent>
		</Card>
	)
})
