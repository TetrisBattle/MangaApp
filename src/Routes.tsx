import { Navigate, createBrowserRouter } from 'react-router-dom'
import { App } from 'App'
import { NotFound } from 'features/NotFound'
import { Home } from 'features/Home'
import { Details } from 'features/details/Details'

export enum RouteOption {
	NotFound = '/404',
	Home = '/',
	Details = '/details',
}

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: RouteOption.NotFound, element: <NotFound /> },
			{
				path: '*',
				element: <Navigate replace to={RouteOption.NotFound} />,
			},
			{ path: RouteOption.Home, element: <Home /> },
			{
				path: RouteOption.Details + '/:id',
				element: <Details />,
			},
		],
	},
])
