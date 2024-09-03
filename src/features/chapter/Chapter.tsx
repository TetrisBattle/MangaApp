import { Box, Stack } from '@mui/material'
import { useStore } from 'hooks/useStore'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { SetupScroll } from './SetupScroll'

export const Chapter = observer(() => {
	const { id: chapterId } = useParams()
	if (!chapterId) throw new Error('Id not found!')

	const { appStore, chapterStore } = useStore()

	useEffect(() => {
		chapterStore.onChapterLoad(chapterId)
	}, [chapterStore, chapterId])

	return (
		<>
			<Box
				onClick={() => {
					if (chapterStore.scrollPos === 'middle') {
						appStore.toggleShowHeader()
					}
				}}
			>
				<Stack
					sx={{
						maxWidth: 800,
						mx: 'auto',
					}}
				>
					{chapterStore.selectedChapterImages.map((image, index) => (
						<img key={index} src={image} alt='image' />
					))}
				</Stack>
			</Box>
			<BottomNav />
			<SetupScroll />
		</>
	)
})
