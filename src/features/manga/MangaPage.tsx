import { Box, Stack } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MangaCover } from './MangaCover'
import { MangaDetails } from './MangaDetails'
import { MangaChapterNav } from './MangaChapterNav'
import { MangaInfo } from './MangaInfo'

export const MangaPage = observer(() => {
	const { mangaId } = useParams()
	if (!mangaId) throw new Error('mangaId not found!')

	const { mangaStore } = useStore()

	useEffect(() => {
		if (mangaStore.manga.id !== mangaId) {
			mangaStore.onLoad(mangaId)
		}
	}, [mangaStore, mangaId])

	if (!mangaStore.manga.chapters.length) return null

	return (
		<Box
			sx={{
				maxWidth: (theme) => theme.breakpoints.values.lg,
				mx: 'auto',
			}}
		>
			<MangaCover />
			<Stack sx={{ gap: 3, px: 2 }}>
				<MangaDetails />
				<MangaChapterNav />
				<MangaInfo />
			</Stack>
		</Box>
	)
})
