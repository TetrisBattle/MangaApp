import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Logo } from 'assets/Logo'
import { Account } from './AccountIcon'
import { Search } from './search/SearchIcon'
import { NavLink } from 'react-router-dom'
import { RouteOption } from 'Routes'
import { SearchResults } from './search/SearchResults'
import { useStore } from 'hooks/useStore'
import { observer } from 'mobx-react-lite'

export const Header = observer(() => {
	const { appStore } = useStore()

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
				<Toolbar sx={{ height: 64, pr: 1 }}>
					<Button
						variant='text'
						component={NavLink}
						to={RouteOption.Home}
						disableFocusRipple
						disableRipple
						sx={{
							fontSize: 24,
							bgcolor: 'transparent',
						}}
					>
						<Logo size={48} />
					</Button>

					<Typography
						variant='h1'
						component={NavLink}
						to={RouteOption.Home}
						sx={{
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
						<Search />
						<Account />
					</Box>
				</Toolbar>
			</AppBar>
			<SearchResults />
		</Box>
	)
})
