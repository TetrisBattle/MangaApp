import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { NotFound } from 'features/NotFound'
import { SourceList } from 'features/source/SourceList'
import { SourceHomePage } from 'features/source/SourceHomePage'
import { MangaPage } from 'features/manga/MangaPage'
import { ChapterPage } from 'features/chapter/ChapterPage'
import 'scrollbar.css'

const getPages = () => {
	const pages = [
		{ path: '/404', element: <NotFound /> },
		{ path: '/', element: <SourceList /> },
		{
			path: '/:source',
			element: <SourceHomePage />,
		},
		{
			path: '/:source/manga/:mangaId',
			element: <MangaPage />,
		},
		{
			path: '/:source/manga/:mangaId/chapter/:chapterId',
			element: <ChapterPage />,
		},
	]

	const isDev = process.env.NODE_ENV === 'development'
	if (!isDev)
		pages.push({
			path: '*',
			element: <Navigate replace to='/404' />,
		})

	return pages
}

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Outlet />,
		children: getPages(),
	},
])
