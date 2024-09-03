import { Box, Button } from '@mui/material'
import { useStore } from 'hooks/useStore'
import { observer } from 'mobx-react-lite'

export const BottomNav = observer(() => {
	const { appStore } = useStore()

	return (
		<Box
			sx={{
				display: appStore.showHeader ? 'flex' : 'none',
				width: 1,
				position: 'sticky',
				bottom: 0,
				justifyContent: 'space-evenly',
				bgcolor: '#171717',
				p: 2,

				'.MuiButton-root': {
					width: 0.3,
				},
			}}
		>
			<Button>Prev</Button>
			<Button>Next</Button>
		</Box>
	)
})
