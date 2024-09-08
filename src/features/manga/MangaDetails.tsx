import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Typography,
} from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

export const MangaDetails = observer(() => {
	const { mangaStore } = useStore()
	const [showDescription, setShowDescription] = useState(false)

	const overFlowStyles = {
		overflow: 'hidden',
		display: '-webkit-box',
		WebkitLineClamp: 4,
		WebkitBoxOrient: 'vertical',
		textOverflow: 'ellipsis',
	}

	return (
		<Card>
			<CardActionArea
				onClick={() => setShowDescription(true)}
				disableRipple
				{...(showDescription ? { disabled: true } : {})}
			>
				<CardContent>
					<Box sx={showDescription ? {} : { ...overFlowStyles }}>
						<Typography
							variant='h1'
							sx={{
								fontWeight: (theme) =>
									theme.typography.fontWeightMedium,
								fontSize: 32,
								mb: 1,
							}}
						>
							{mangaStore.manga.title}
						</Typography>

						<Typography
							variant='body2'
							sx={{
								color: (theme) => theme.palette.text.secondary,
							}}
						>
							{mangaStore.manga.description}
						</Typography>
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	)
})
