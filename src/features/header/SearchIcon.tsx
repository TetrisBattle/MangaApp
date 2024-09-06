import SearchIcon from '@mui/icons-material/Search'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'

export const Search = observer(() => {
	const { appStore, searchStore } = useStore()

	return (
		<>
			{searchStore.isSearching || searchStore.title ? (
				<>
					<TextField
						value={searchStore.title}
						onChange={(e) => searchStore.setTitle(e.target.value)}
						onFocus={() => searchStore.setIsSearching(true)}
						autoFocus
						slotProps={{
							input: {
								endAdornment: (
									<InputAdornment position='end'>
										<SearchIcon />
									</InputAdornment>
								),
								sx: {
									borderRadius: 10,
									pr: 1,
								},
							},
						}}
						sx={{
							py: 2,
							input: {
								fontSize: 12,
								py: 1,
								px: 1.5,
							},
						}}
					/>

					<Box
						onClick={() => searchStore.setIsSearching(false)}
						sx={{
							zIndex: (theme) => theme.zIndex.appBar,
							position: 'absolute',
							height: 'calc(100vh - 64px)',
							mt: appStore.headerHeight / 8,
							width: 1,
							display: searchStore.isSearching ? 'block' : 'none',
						}}
					/>
				</>
			) : (
				<IconButton onClick={() => searchStore.setIsSearching(true)}>
					<SearchIcon />
				</IconButton>
			)}
		</>
	)
})
