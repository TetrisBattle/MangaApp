import { Box, Stack } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MangaImage } from './MangaImage'
import { MangaMain } from './MangaMain'
import { MangaChapterNav } from './MangaChapterNav'
import { MangaInfo } from './MangaInfo'

export const MangaPage = observer(() => {
	const { mangaId } = useParams()
	if (!mangaId) throw new Error('mangaId not found!')

	const { mangaStore } = useStore()

	useEffect(() => {
		const onLoad = async (mangaId: string) => {
			if (mangaStore.manga.id === mangaId) return
			const manga = await mangaStore.getManga(mangaId)
			mangaStore.setManga(manga)
		}
		onLoad(mangaId)
	}, [mangaStore, mangaId])

	return (
		<Box>
			<MangaImage />
			<Stack sx={{ gap: 3, px: 2 }}>
				<MangaMain />
				<MangaChapterNav />
				<MangaInfo />
			</Stack>
		</Box>
	)
})
