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

export const SearchResult = observer(() => {
	const { searchStore } = useStore()

	const open = !!(searchStore.isSearching && searchStore.search)
	if (!open) return <></>

	return (
		<>
			<Stack
				sx={{
					px: 2,
					mx: 5,
					bgcolor: '#171717',
					gap: 1,
					zIndex: (theme) => theme.zIndex.appBar,
					position: 'absolute',
					left: 145,

					maxHeight: 400,
					flexShrink: 0,
					overflowY: 'scroll',

					'::-webkit-scrollbar': {
						width: 8,
					},

					'::-webkit-scrollbar-track': {
						boxShadow: 'inset 0 0 5px grey',
						borderRadius: 10,
					},

					'::-webkit-scrollbar-thumb': {
						background: (theme) => theme.palette.primary.main,
						borderRadius: 10,
					},

					'::-webkit-scrollbar-thumb:hover': {
						background: (theme) => theme.palette.primary.dark,
					},
				}}
			>
				{searchStore.searchResults.map((searchResult: any) => (
					<Card key={searchResult.id} sx={{ flexShrink: 0 }}>
						<CardActionArea
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
								{/* <Typography
									variant='body2'
									sx={{ color: 'text.secondary' }}
								>
									{searchResult.description}
								</Typography> */}
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
