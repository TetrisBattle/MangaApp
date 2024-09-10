import { Box } from '@mui/material'
import { Header } from 'features/header/Header'
import { Outlet } from 'react-router-dom'
import { useStore } from 'store/useStore'

import 'scrollbar.css'

export const App = () => {
	const { appStore } = useStore()

	return (
		<Box sx={{ pt: appStore.headerHeight / 8 }}>
			<Header />
			<Outlet />
		</Box>
	)
}
