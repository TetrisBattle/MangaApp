import { Box, Button, Toolbar } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

export const BottomNav = observer(() => {
	const { appStore, mangaStore } = useStore()
	const navigate = useNavigate()

	const moveTo = async (direction: 'prev' | 'next') => {
		const target =
			mangaStore.manga.chapter.number + direction === 'prev' ? -1 : 1

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
			<Box
				sx={{
					textAlign: 'center',
					fontSize: 24,
				}}
			>
				Chapter {mangaStore.manga.chapter.number}
			</Box>
			<Button onClick={async () => moveTo('next')}>Next</Button>
		</Toolbar>
	)
})
