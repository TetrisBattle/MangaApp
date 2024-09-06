import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Typography,
} from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'

export const MangaChapterNav = observer(() => {
	const { mangaStore } = useStore()

	if (mangaStore.manga.chapters.length === 0) return <></>

	const firstChapter = mangaStore.manga.chapters[0]
	const lastChapter =
		mangaStore.manga.chapters[mangaStore.manga.chapters.length - 1]

	return (
		<Card>
			<CardContent>
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
				<Divider sx={{ mt: 2, mb: 3 }} />

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-evenly',
						gap: 2,
						'.MuiButton-root': {
							width: 1,
							fontSize: 32,
							py: 2,
						},
					}}
				>
					<Button
						component={NavLink}
						to={`chapter/${firstChapter.id}`}
					>
						Chapter {firstChapter.number}
					</Button>
					<Button
						component={NavLink}
						to={`chapter/${lastChapter.id}`}
					>
						Chapter {lastChapter.number}
					</Button>
				</Box>
			</CardContent>
		</Card>
	)
})
