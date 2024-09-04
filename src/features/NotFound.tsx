import { Box, Typography } from '@mui/material'

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
			<Typography
				variant='h1'
				sx={{
					fontWeight: (theme) => theme.typography.fontWeightMedium,
				}}
			>
				Error 404!
			</Typography>
		</Box>
	)
}
