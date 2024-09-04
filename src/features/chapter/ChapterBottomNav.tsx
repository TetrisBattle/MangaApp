import { Box, Button } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

export const BottomNav = observer(() => {
	const { appStore, mangaStore, chapterStore } = useStore()
	const navigate = useNavigate()

	const moveTo = async (direction: 'prev' | 'next') => {
		const target = direction === 'prev' ? -1 : 1
		const chapter = await chapterStore.getChapterByNumber(
			mangaStore.manga.id,
			(Number(chapterStore.chapter.chapter) + target).toString()
		)

		navigate(`/manga/${mangaStore.manga.id}/chapter/${chapter.id}`)
	}

	return (
		<Box
			sx={{
				display: appStore.showHeader ? 'flex' : 'none',
				width: 1,
				position: 'sticky',
				bottom: 0,
				justifyContent: 'space-evenly',
				bgcolor: '#171717',
				p: 2,

				'.MuiButton-root': {
					width: 0.3,
				},
			}}
		>
			<Button onClick={async () => moveTo('prev')}>Prev</Button>
			<Button onClick={async () => moveTo('next')}>Next</Button>
		</Box>
	)
})
