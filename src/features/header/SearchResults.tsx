import {
	Backdrop,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Stack,
	Typography,
} from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'

export const SearchResults = observer(() => {
	const { searchStore } = useStore()

	const open = !!(searchStore.isSearching && searchStore.title)
	if (!open) return <></>

	return (
		<>
			<Stack
				sx={{
					px: 2,
					pb: 2,
					mx: 5,
					bgcolor: '#171717',
					gap: 1,
					zIndex: (theme) => theme.zIndex.appBar,
					position: 'absolute',
					left: 145,

					maxHeight: 400,
					flexShrink: 0,
					overflowY: 'scroll',
				}}
			>
				{searchStore.searchResults.map((manga) => (
					<Card key={manga.id} sx={{ flexShrink: 0 }}>
						<CardActionArea
							component={NavLink}
							to={`/manga/${manga.id}`}
							onClick={() => searchStore.reset()}
							sx={{
								display: 'flex',
								justifyContent: 'left',
							}}
						>
							<CardMedia
								component='img'
								src={manga.coverUrl}
								alt='image'
								sx={{ width: 'auto', height: 50, px: 1 }}
							/>
							<CardContent>
								<Typography>{manga.title}</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				))}
			</Stack>

			<Backdrop
				open={open}
				sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}
			/>
		</>
	)
})
