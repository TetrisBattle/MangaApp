import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material'
import { sources } from './sources'
import { useNavigate } from 'react-router-dom'

export const SourceListPage = () => {
	const navigate = useNavigate()

	return (
		<Box id='Home'>
			<List sx={{ p: 0, width: { md: 'fit-content' }, mx: 'auto' }}>
				{sources.map((server) => (
					<ListItem key={server.name} disablePadding>
						<ListItemButton onClick={() => navigate(server.path)}>
							<ListItemIcon>
								<img
									src={server.image}
									alt={server.name}
									style={{ width: 50, height: 50 }}
								/>
							</ListItemIcon>
							<ListItemText
								primary={server.name}
								secondary={
									<>
										<Typography
											component='span'
											variant='body2'
										>
											{server.description}
										</Typography>
									</>
								}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)
}
