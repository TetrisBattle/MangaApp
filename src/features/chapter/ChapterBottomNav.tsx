import { Button, MenuItem, TextField, Toolbar, Typography } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

export const BottomNav = observer(() => {
	const { appStore, mangaStore } = useStore()
	const navigate = useNavigate()

	const moveTo = async (direction: 'prev' | 'next') => {
		const target = (
			Number(mangaStore.manga.chapter.number) +
			(direction === 'prev' ? -1 : 1)
		).toString()

		const chapter = mangaStore.manga.chapters.find(
			(chapter) => chapter.number === target
		)

		if (!chapter) throw new Error('Chapter not found!')

		navigate(`/manga/${mangaStore.manga.id}/chapter/${chapter.id}`)
	}

	return (
		<Toolbar
			sx={{
				display: appStore.showHeader ? 'flex' : 'none',
				width: 1,
				position: 'sticky',
				bottom: 0,
				justifyContent: 'space-evenly',
				bgcolor: '#171717',
				p: 2,
				'.MuiButton-root': {
					width: 0.25,
					fontSize: 24,
				},
			}}
		>
			<Button onClick={async () => moveTo('prev')}>Prev</Button>
			<TextField
				value={mangaStore.manga.chapter.number}
				onChange={(e) => {
					const chapter = mangaStore.manga.chapters.find(
						(chapter) => chapter.number === e.target.value
					)
					if (!chapter) throw new Error('Chapter not found!')
					navigate(
						`/manga/${mangaStore.manga.id}/chapter/${chapter.id}`
					)
				}}
				select
				sx={{ width: 0.25, '.MuiSelect-select': { py: 1 } }}
			>
				{mangaStore.manga.chapters.map((chapter) => (
					<MenuItem key={chapter.id} value={chapter.number}>
						<Typography sx={{ fontSize: 24 }}>
							{chapter.number}
						</Typography>
					</MenuItem>
				))}
			</TextField>
			<Button onClick={async () => moveTo('next')}>Next</Button>
		</Toolbar>
	)
})
