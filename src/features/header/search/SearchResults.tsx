import {
	Backdrop,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Stack,
	Typography,
} from '@mui/material'
import { useStore } from 'hooks/useStore'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import { RouteOption } from 'Routes'

export const SearchResults = observer(() => {
	const { searchStore } = useStore()

	const open = !!(searchStore.isSearching && searchStore.search)
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
				{searchStore.searchResults.map((searchResult) => (
					<Card key={searchResult.id} sx={{ flexShrink: 0 }}>
						<CardActionArea
							component={NavLink}
							to={`${RouteOption.Details}/${searchResult.id}`}
							onClick={() => searchStore.resetSearch()}
							sx={{
								display: 'flex',
								justifyContent: 'left',
							}}
						>
							<CardMedia
								component='img'
								src={searchResult.imageUrl}
								alt='image'
								sx={{ width: 'auto', height: 50, px: 1 }}
							/>
							<CardContent>
								<Typography>{searchResult.title}</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				))}
			</Stack>

			<Backdrop
				sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}
				open={open}
				onClick={() => {
					searchStore.setIsSearching(false)
				}}
			/>
		</>
	)
})
