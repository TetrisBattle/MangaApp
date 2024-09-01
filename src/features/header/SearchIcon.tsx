import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useStore } from 'hooks/useStore'
import { observer } from 'mobx-react-lite'

export const Search = observer(() => {
	const { appStore } = useStore()

	return (
		<>
			{!appStore.isSearching ? (
				<IconButton onClick={() => appStore.setIsSearching(true)}>
					<SearchIcon />
				</IconButton>
			) : (
				<TextField
					value={appStore.search}
					onChange={(e) => appStore.setSearch(e.target.value)}
					autoFocus
					onBlur={() => appStore.setIsSearching(false)}
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
