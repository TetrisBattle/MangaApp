import { Box } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BottomNav } from './ChapterBottomNav'
import { SetupScroll } from './SetupScroll'
import { ChapterImages } from './ChapterImages'

export const ChapterPage = observer(() => {
	const { mangaId, chapterId } = useParams()
	if (!mangaId || !chapterId) throw new Error('Id not found!')

	const { mangaStore } = useStore()

	useEffect(() => {
		if (mangaStore.manga.id !== mangaId) {
			mangaStore.onLoad(mangaId, chapterId)
		}
	}, [mangaId, chapterId, mangaStore])

	return (
		<Box>
			<ChapterImages />
			<BottomNav />
			<SetupScroll />
		</Box>
	)
})
