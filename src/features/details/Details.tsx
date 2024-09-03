import { Box, Stack } from '@mui/material'
import { useStore } from 'hooks/useStore'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DetailsImage } from './DetailsImage'
import { DetailsMain } from './DetailsMain'
import { DetailsChapterNav } from './DetailsChapterNav'
import { DetailsInfo } from './DetailsInfo'

export const Details = observer(() => {
	const { id: mangaId } = useParams()
	if (!mangaId) throw new Error('Id not found!')

	const { mangaStore } = useStore()

	useEffect(() => {
		mangaStore.setSelectedManga(mangaId)
	}, [mangaStore, mangaId])

	return (
		<Box>
			<DetailsImage />
			<Stack sx={{ gap: 3, px: 2 }}>
				<DetailsMain />
				<DetailsChapterNav />
				<DetailsInfo />
			</Stack>
		</Box>
	)
})
