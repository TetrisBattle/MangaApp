import { Box } from '@mui/material'
import { Header } from 'features/header/Header'
import { Outlet } from 'react-router-dom'

import 'scrollbar.css'

export const App = () => {
	const headerHeight = 64

	return (
		<Box sx={{ pt: headerHeight / 8 }}>
			<Header />
			<Outlet />
		</Box>
	)
}
