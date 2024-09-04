import { Box, Stack } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'

export const ChapterImages = observer(() => {
	const { appStore, chapterStore } = useStore()

	return (
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
				{chapterStore.chapterImages.map((image) => (
					<img key={image} src={image} alt='image' />
				))}
			</Stack>
		</Box>
	)
})
