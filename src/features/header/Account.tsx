import { Button, Divider, Drawer, IconButton, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonIcon from '@mui/icons-material/Person'
import { useState } from 'react'

export const Account = () => {
	const [open, setOpen] = useState(false)
	const toggleOpen = () => setOpen((prev) => !prev)

	return (
		<>
			<IconButton onClick={toggleOpen}>
				<AccountCircleIcon />
			</IconButton>

			<Drawer
				anchor='right'
				open={!!open}
				onClose={toggleOpen}
				sx={{
					'> .MuiPaper-root': {
						minWidth: 200,
						p: 2,
					},
				}}
			>
				<IconButton
					onClick={toggleOpen}
					disabled
					sx={{ width: 'fit-content', mx: 'auto' }}
				>
					<PersonIcon fontSize='large' />
				</IconButton>
				<Typography sx={{ textAlign: 'center' }}>Guest</Typography>
				<Divider sx={{ my: 2 }} />
				<Button sx={{ fontWeight: 'bold' }}>Login</Button>
			</Drawer>
		</>
	)
}
