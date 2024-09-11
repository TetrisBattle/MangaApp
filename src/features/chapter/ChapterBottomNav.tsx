import { Button, MenuItem, TextField, Toolbar, Typography } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

export const BottomNav = observer(() => {
	const { appStore, mangaStore } = useStore()
	const navigate = useNavigate()

	const moveTo = async (direction: 'prev' | 'next') => {
		const target = (
			Number(mangaStore.manga.id) + (direction === 'prev' ? -1 : 1)
		).toString()

		const chapter = mangaStore.manga.chapters.find(
			(chapter) => chapter.id === target
		)

		if (!chapter) throw new Error('Chapter not found!')

		navigate(
			`/${mangaStore.source}/manga/${mangaStore.manga.id}/chapter/${chapter.id}`
		)
	}

	if (!mangaStore.selectedChapter) return <></>

	return (
		<Toolbar
			sx={{
				display: appStore.showHeader ? 'flex' : 'none',
				width: 1,
				position: 'sticky',
				bottom: 0,
				justifyContent: 'space-evenly',
				bgcolor: '#171717',
				py: 2,
				'.MuiButton-root': {
					width: 0.25,
					fontSize: 24,
				},
			}}
		>
			<Button onClick={async () => moveTo('prev')}>Prev</Button>
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
						<Typography sx={{ fontSize: 24 }}>
							{chapter.id}
						</Typography>
					</MenuItem>
				))}
			</TextField>
			<Button
				disabled={
					mangaStore.selectedChapter?.id ===
					mangaStore.manga.chapters[0].id
				}
				onClick={async () => moveTo('next')}
			>
				Next
			</Button>
		</Toolbar>
	)
})
