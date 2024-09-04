import { Box } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'

export const MangaImage = observer(() => {
	const { mangaStore } = useStore()

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Box
				component={'img'}
				src={mangaStore.manga.imageUrl}
				alt='image'
				sx={{
					maxWidth: 1,
					height: 'auto',
					mb: 3,
				}}
			/>
		</Box>
	)
})
