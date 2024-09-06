import { createBrowserRouter, Navigate } from 'react-router-dom'
import { App } from 'App'
import { NotFound } from 'features/NotFound'
import { HomePage } from 'features/HomePage'
import { MangaPage } from 'features/manga/MangaPage'
import { ChapterPage } from 'features/chapter/ChapterPage'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/404', element: <NotFound /> },
			{
				path: '*',
				element: <Navigate replace to='/404' />,
			},
			{ path: '/', element: <HomePage /> },
			{
				path: '/manga/:mangaId',
				element: <MangaPage />,
			},
			{
				path: '/manga/:mangaId/chapter/:chapterId',
				element: <ChapterPage />,
			},
		],
	},
])
