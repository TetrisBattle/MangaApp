import { Box } from '@mui/material'
import { Header } from 'features/header/Header'
import { Outlet } from 'react-router-dom'

export const App = () => {
	return (
		<Box
			sx={{
				minHeight: '100dvh',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Header />
			<Outlet />
		</Box>
	)
}
