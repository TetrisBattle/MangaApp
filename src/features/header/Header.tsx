import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Logo } from 'assets/Logo'
import { Account } from './Account'
import { Search } from './Search'
import { NavLink } from 'react-router-dom'
import { SearchResults } from './SearchResults'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

export const Header = observer(() => {
	const { appStore } = useStore()
	const [isSearching, setIsSearching] = useState(false)
	const [searchInputValue, setSearchInputValue] = useState('')

	const reset = () => {
		setSearchInputValue('')
		setIsSearching(false)
	}

	return (
		<Box>
			<AppBar
				sx={{
					display: appStore.showHeader ? 'block' : 'none',
					background: '#171717',
					zIndex: (theme) => theme.zIndex.appBar,
					position: 'fixed',
					inset: 0,
					bottom: 'auto',
				}}
			>
				<Toolbar sx={{ height: appStore.headerHeight, pr: 1 }}>
					<Button
						variant='text'
						component={NavLink}
						to='/'
						disableFocusRipple
						disableRipple
						sx={{
							fontSize: 24,
							bgcolor: 'transparent',
						}}
					>
						<Logo size={40} />
					</Button>

					<Typography
						variant='h1'
						component={NavLink}
						to='/'
						sx={{
							display: {
								xs: 'none',
								md: 'block',
							},
							fontSize: 24,
							fontWeight: (theme) =>
								theme.typography.fontWeightRegular,
							color: (theme) => theme.palette.text.primary,
							textDecoration: 'none',
							mr: 2,
						}}
					>
						MangaApp
					</Typography>

					<Box
						sx={{
							width: 1,
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<Search
							isSearching={isSearching}
							setIsSearching={setIsSearching}
							searchInputValue={searchInputValue}
							setSearchInputValue={setSearchInputValue}
						/>
						<Account />
					</Box>
				</Toolbar>
			</AppBar>

			{isSearching && searchInputValue && (
				<SearchResults name={searchInputValue} reset={reset} />
			)}
		</Box>
	)
})
