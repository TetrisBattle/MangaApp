import SearchIcon from '@mui/icons-material/Search'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'

export const Search = observer(
	({
		isSearching,
		setIsSearching,
		searchInputValue,
		setSearchInputValue,
	}: {
		isSearching: boolean
		setIsSearching: React.Dispatch<React.SetStateAction<boolean>>
		searchInputValue: string
		setSearchInputValue: React.Dispatch<React.SetStateAction<string>>
	}) => {
		const { appStore } = useStore()

		return (
			<>
				{isSearching || searchInputValue ? (
					<>
						<TextField
							value={searchInputValue}
							onChange={(e) =>
								setSearchInputValue(e.target.value)
							}
							onFocus={() => setIsSearching(true)}
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
							onClick={() => setIsSearching(false)}
							sx={{
								zIndex: (theme) => theme.zIndex.appBar,
								position: 'absolute',
								height: 'calc(100vh - 64px)',
								mt: appStore.headerHeight / 8,
								width: 1,
								display: isSearching ? 'block' : 'none',
							}}
						/>
					</>
				) : (
					<IconButton onClick={() => setIsSearching(true)}>
						<SearchIcon />
					</IconButton>
				)}
			</>
		)
	}
)
