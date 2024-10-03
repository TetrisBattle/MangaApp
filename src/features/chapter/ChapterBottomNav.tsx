import { Button, MenuItem, TextField, Toolbar, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { useStore } from 'store/useStore'

export const BottomNav = observer(() => {
	const { appStore, mangaStore } = useStore()
	const navigate = useNavigate()

	if (!mangaStore.selectedChapter) return <></>

	const moveTo = async (direction: 'prev' | 'next') => {
		if (!mangaStore.selectedChapter) throw new Error('Chapter not found!')

		const targetChapter =
			mangaStore.selectedChapter?.number + (direction === 'prev' ? -1 : 1)

		const chapter = mangaStore.manga.chapters.find(
			(chapter) => chapter.number === targetChapter
		)

		if (!chapter) throw new Error('Chapter not found!')

		navigate(
			`/${mangaStore.source}/manga/${mangaStore.manga.id}/chapter/${chapter.id}`
		)
	}

	return (
		<Toolbar
			sx={{
				visibility: appStore.showHeader ? 'visible' : 'hidden',
				width: 1,
				position: 'sticky',
				bottom: 0,
				justifyContent: 'space-evenly',
				bgcolor: '#171717',
				py: 1.5,
				'.MuiButton-root': {
					width: 0.25,
				},
			}}
		>
			<Button
				onClick={async () => moveTo('prev')}
				disabled={
					mangaStore.selectedChapter?.id ===
					mangaStore.manga.chapters[0].id
				}
			>
				Prev
			</Button>
			<TextField
				value={mangaStore.selectedChapter.id}
				onChange={(e) => {
					const chapter = mangaStore.manga.chapters.find(
						(chapter) => chapter.id === e.target.value
					)
					if (!chapter) throw new Error('Chapter not found!')
					navigate(
						`/${mangaStore.source}/manga/${mangaStore.manga.id}/chapter/${chapter.id}`
					)
				}}
				select
				sx={{ width: 0.25, '.MuiSelect-select': { py: 1 } }}
			>
				{mangaStore.manga.chapters.map((chapter) => (
					<MenuItem key={chapter.id} value={chapter.id}>
						<Typography>{chapter.number}</Typography>
					</MenuItem>
				))}
			</TextField>
			<Button
				onClick={async () => moveTo('next')}
				disabled={
					mangaStore.selectedChapter?.id ===
					mangaStore.manga.chapters[
						mangaStore.manga.chapters.length - 1
					].id
				}
			>
				Next
			</Button>
		</Toolbar>
	)
})
