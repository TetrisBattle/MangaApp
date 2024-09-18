import { Box, Typography } from '@mui/material'
import { Header } from 'features/header/Header'
import { useParams } from 'react-router-dom'
import { useStore } from 'store/useStore'

export const SourcePage = () => {
	const { source } = useParams()
	if (!source) throw new Error('Source not found!')

	const { mangaStore } = useStore()

	return (
		<>
			<Header />
			<Box sx={{ p: 3 }}>
				<Typography variant='h1'>Source</Typography>
			</Box>
		</>
	)
}
