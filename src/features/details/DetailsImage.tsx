import { Box } from '@mui/material'
import { useStore } from 'hooks/useStore'
import { observer } from 'mobx-react-lite'

export const DetailsImage = observer(() => {
	const { mangaStore } = useStore()

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Box
				component={'img'}
				src={mangaStore.selectedManga.imageUrl}
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
