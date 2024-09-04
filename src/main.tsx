import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from 'Routes'
import { StoreProvider } from 'store/StoreProvider'
import { MuiThemeProvider } from 'theme/MuiThemeProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<StoreProvider>
			<MuiThemeProvider>
				<RouterProvider router={router} />
			</MuiThemeProvider>
		</StoreProvider>
	</React.StrictMode>
)
