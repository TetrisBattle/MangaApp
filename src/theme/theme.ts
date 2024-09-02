import { createTheme, ThemeOptions } from '@mui/material'
import { defaultTheme } from './defaultTheme'
import { deepmerge } from '@mui/utils'

const customTheme: ThemeOptions = {
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
		text: {
			primary: '#dedede',
		},
	},
}

export const theme = createTheme(deepmerge(defaultTheme, customTheme))
