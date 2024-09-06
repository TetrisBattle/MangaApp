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

	const { mangaStore, chapterStore } = useStore()

	useEffect(() => {
		const onLoad = async (mangaId: string, chapterId: string) => {
			if (mangaStore.manga.id !== mangaId) {
				const manga = await mangaStore.getManga(mangaId)
				mangaStore.setManga(manga)
			}

			if (chapterStore.chapter.id !== chapterId) {
				const chapter = await chapterStore.getChapter(chapterId)
				chapterStore.setChapter(chapter)
			}

			if (chapterStore.chapterImageUrls.length === 0) {
				const chapterImages =
					await chapterStore.getChapterImageUrls(chapterId)
				chapterStore.setChapterImageUrls(chapterImages)
			}
		}
		onLoad(mangaId, chapterId)
	}, [mangaId, chapterId, mangaStore, chapterStore])

	return (
		<Box>
			<ChapterImages />
			<BottomNav />
			<SetupScroll />
		</Box>
	)
})
