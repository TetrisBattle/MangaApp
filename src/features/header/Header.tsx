import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Logo } from 'assets/Logo'
import { Account } from './AccountIcon'
import { Search } from './search/SearchIcon'
import { NavLink } from 'react-router-dom'
import { RouteOption } from 'Routes'

export const Header = () => {
	return (
		<AppBar>
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
	)
}
