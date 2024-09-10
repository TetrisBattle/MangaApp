import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useStore } from 'store/useStore'

export const SourcePage = () => {
	const { source } = useParams()
	if (!source) throw new Error('Source not found!')

	const { mangaStore } = useStore()

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant='h1'>Source</Typography>
		</Box>
	)
}
