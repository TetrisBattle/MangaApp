import { Box, Stack } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'

export const ChapterImages = observer(() => {
	const { appStore, mangaStore } = useStore()

	return (
		<Box
			onClick={() => {
				if (appStore.scrollPos === 'middle') {
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
				{mangaStore.manga.chapter.imageUrls.map((image) => (
					<img key={image} src={image} alt='image' />
				))}
			</Stack>
		</Box>
	)
})
