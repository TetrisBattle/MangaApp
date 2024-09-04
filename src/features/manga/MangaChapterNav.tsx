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
import { useEffect, useState } from 'react'
import { Chapter } from 'features/chapter/ChapterModel'

export const MangaChapterNav = observer(() => {
	const { mangaStore, chapterStore } = useStore()
	const [firstChapter, setFirstChapter] = useState(new Chapter())
	const [lastChapter, setLastChapter] = useState(new Chapter())

	useEffect(() => {
		const onLoad = async (mangaId: string) => {
			const firstChapter = await chapterStore.getFirstChapter(mangaId)
			setFirstChapter(firstChapter)

			const lastChapter = await chapterStore.getLastChapter(mangaId)
			setLastChapter(lastChapter)
		}

		if (mangaStore.manga.id) onLoad(mangaStore.manga.id)
	}, [chapterStore, mangaStore.manga.id])

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
					<Button
						component={NavLink}
						to={`chapter/${firstChapter.id}`}
					>
						Chapter {firstChapter.chapter}
					</Button>
					<Button
						component={NavLink}
						to={`chapter/${lastChapter.id}`}
					>
						Chapter {lastChapter.chapter}
					</Button>
				</Box>
			</CardContent>
		</Card>
	)
})
