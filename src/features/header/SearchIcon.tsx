import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'

export const Search = observer(() => {
	const { searchStore } = useStore()

	return (
		<>
			{!searchStore.isSearching ? (
				<IconButton onClick={() => searchStore.setIsSearching(true)}>
					<SearchIcon />
				</IconButton>
			) : (
				<TextField
					value={searchStore.search}
					onChange={(e) => searchStore.setSearch(e.target.value)}
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
			)}
		</>
	)
})
