import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Typography,
} from '@mui/material'
import { useStore } from 'hooks/useStore'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import { RouteOption } from 'Routes'

export const DetailsChapterNav = observer(() => {
	const { mangaStore } = useStore()

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
							py: 3,
						},
					}}
				>
					<Button>Chapter 1</Button>
					<Button
						component={NavLink}
						to={`${RouteOption.Chapter}/${mangaStore.selectedChapter.id}`}
					>
						Chapter {mangaStore.selectedManga.chapters}
					</Button>
				</Box>
			</CardContent>
		</Card>
	)
})
