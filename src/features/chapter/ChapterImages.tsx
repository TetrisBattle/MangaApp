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
					maxWidth: (theme) => theme.breakpoints.values.sm,
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
