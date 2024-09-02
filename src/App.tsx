import { Box } from '@mui/material'
import { Header } from 'features/header/Header'
import { Outlet } from 'react-router-dom'
import 'scrollbar.css'

export const App = () => {
	return (
		<Box
			sx={{
				minHeight: '100dvh',
				display: 'flex',
				flexDirection: 'column',
				pb: 3,
			}}
		>
			<Header />
			<Outlet />
		</Box>
	)
}
