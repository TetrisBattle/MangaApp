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
import { Manga } from './MangaModel'

export const MangaChapterNav = observer(() => {
	const { mangaStore, chapterStore } = useStore()
	const [firstChapter, setFirstChapter] = useState(new Chapter())
	const [lastChapter, setLastChapter] = useState(new Chapter())

	useEffect(() => {
		const onLoad = async (manga: Manga) => {
			const firstChapter = await chapterStore.getFirstChapter(manga)
			setFirstChapter(firstChapter)

			const lastChapter = await chapterStore.getLastChapter(manga)
			setLastChapter(lastChapter)
		}

		if (mangaStore.manga.id) onLoad(mangaStore.manga)
	}, [chapterStore, mangaStore.manga])

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
