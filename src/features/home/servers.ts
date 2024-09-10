//  import png

import mangapark from 'assets/servers/mangapark.png'
import batoto from 'assets/servers/batoto.png'
import mangafire from 'assets/servers/mangafire.png'
import mangareaderto from 'assets/servers/mangareaderto.png'
import mangahubio from 'assets/servers/mangahubio.png'
import mangadex from 'assets/servers/mangadex.png'
import mangafreak from 'assets/servers/mangafreak.png'
import aquamanga from 'assets/servers/aquamanga.png'
import asurascans from 'assets/servers/asurascans.png'
import reaperscans from 'assets/servers/reaperscans.png'
import manhuatop from 'assets/servers/manhuatop.png'
import manhwatop from 'assets/servers/manhwatop.png'
import mangakakalot from 'assets/servers/mangakakalot.png'

type Server = {
	name: string
	url: string
	path: string
	image: string
	description?: string
}

export const servers: Server[] = [
	{
		name: 'Manga Park',
		url: 'https://mangapark.com/',
		path: '/mangapark',
		image: mangapark,
		description: 'Fast, largest collection of all manga, manhua and manhwa',
	},
	{
		name: 'Bato.to',
		url: 'https://bato.to/',
		path: '/batoto',
		image: batoto,
		description: 'Large collection of Manhua',
	},
	{
		name: 'Manga Fire',
		url: 'https://mangafire.com/',
		path: '/mangafire',
		image: mangafire,
		description: 'Fast',
	},
	{
		name: 'Manga Reader',
		url: 'https://mangareader.to/',
		path: '/mangareader',
		image: mangareaderto,
		description: 'Colored manga',
	},
	{
		name: 'MangaHub',
		url: 'https://mangahub.io/',
		path: '/mangahub',
		image: mangahubio,
		description: 'Large collection of manga',
	},
	{
		name: 'MangaDex',
		url: 'https://mangadex.org/',
		path: '/mangadex',
		image: mangadex,
		description: 'Large collection of all manga, manhua and manhwa',
	},
	{
		name: 'Manga Freak',
		url: 'https://mangafreak.com/',
		path: '/mangafreak',
		image: mangafreak,
		description: 'Big collection of all manga, manhua and manhwa',
	},
	{
		name: 'Aqua Manga',
		url: 'https://aquamanga.com/',
		path: '/aquamanga',
		image: aquamanga,
	},
	{
		name: 'Asura Scans',
		url: 'https://asurascans.com/',
		path: '/asurascans',
		image: asurascans,
		description: 'Large collection of Manhwa',
	},
	{
		name: 'Reaper Scans',
		url: 'https://reaperscans.com/',
		path: '/reaperscans',
		image: reaperscans,
		description: 'Large collection of Manhwa',
	},
	{
		name: 'Manhua Top',
		url: 'https://manhuatop.com/',
		path: '/manhuatop',
		image: manhuatop,
	},
	{
		name: 'Manhwa Top',
		url: 'https://manhwatop.com/',
		path: '/manhwatop',
		image: manhwatop,
	},
	{
		name: 'Manga Kakalot',
		url: 'https://mangakakalot.com/',
		path: '/mangakakalot',
		image: mangakakalot,
	},
]
