import { Box, Stack } from '@mui/material'
import { useStore } from 'hooks/useStore'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const Chapter = observer(() => {
	const { id: chapterId } = useParams()
	if (!chapterId) throw new Error('Id not found!')

	const { mangaStore } = useStore()

	useEffect(() => {
		mangaStore.onChapterLoad(chapterId)
	}, [mangaStore, chapterId])

	return (
		<Box>
			<Stack
				sx={{
					maxWidth: 800,
					mx: 'auto',
				}}
			>
				{mangaStore.selectedChapterImages.map((image, index) => (
					<img key={index} src={image} alt='image' />
				))}
			</Stack>
		</Box>
	)
})
