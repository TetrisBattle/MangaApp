import { Box, Button, Typography } from '@mui/material'
import { RouteOption } from 'Routes'
import { Link } from 'react-router-dom'

export const NotFound = () => {
	return (
		<Box
			id='NotFound'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 3,
				mt: 3,
			}}
		>
			<Typography variant='h1'>Error 404!</Typography>
			<Button component={Link} to={RouteOption.Home}>
				Return to home page
			</Button>
		</Box>
	)
}
