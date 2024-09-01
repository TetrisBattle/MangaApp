import { createTheme } from '@mui/material'
import { defaultTheme } from './defaultTheme'
import { deepmerge } from '@mui/utils'

const customTheme = {
	palette: {
		mode: 'dark',
		primary: {
			main: '#850303',
		},
		secondary: {
			main: '#003549',
		},
		background: {
			paper: '#040404',
			default: '#000',
		},
	},
}

export const theme = createTheme(deepmerge(defaultTheme, customTheme))
