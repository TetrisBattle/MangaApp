import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Typography,
} from '@mui/material'
import { useStore } from 'hooks/useStore'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

export const DetailsMain = observer(() => {
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
							{mangaStore.selectedManga.title}
						</Typography>

						<Typography
							variant='body2'
							sx={{
								color: (theme) => theme.palette.text.secondary,
							}}
						>
							{mangaStore.selectedManga.description}
						</Typography>
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	)
})
