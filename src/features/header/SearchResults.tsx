import {
	Backdrop,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Stack,
	Typography,
} from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import { Manga } from 'features/manga/MangaStore'
import { useEffect, useState } from 'react'

export const SearchResults = observer(
	({ name, reset }: { name: string; reset: () => void }) => {
		const { appStore, mangaStore } = useStore()
		const [searchResults, setsearchResults] = useState<Manga[]>([])

		useEffect(() => {
			const search = async (name: string) => {
				const mangas = await mangaStore.search(name)
				setsearchResults(mangas)
			}
			search(name)
		}, [name, mangaStore])

		const onMangaClick = () => {
			setsearchResults([])
			reset()
		}

		return (
			<>
				<Stack
					sx={{
						px: 2,
						pb: 2,
						mx: 5,
						bgcolor: '#171717',
						gap: 1,
						zIndex: (theme) => theme.zIndex.appBar,
						position: 'absolute',
						left: { xs: 16, md: 145 },

						maxHeight: 400,
						flexShrink: 0,
						overflowY: 'auto',
					}}
				>
					{searchResults?.map((manga) => (
						<Card key={manga.id} sx={{ flexShrink: 0 }}>
							<CardActionArea
								component={NavLink}
								to={`/${mangaStore.source}/manga/${manga.id}`}
								onClick={() => onMangaClick()}
								sx={{
									display: 'flex',
									justifyContent: 'left',
								}}
							>
								<CardMedia
									component='img'
									src={manga.coverUrl}
									alt='image'
									sx={{ width: 'auto', height: 50, px: 1 }}
								/>
								<CardContent>
									<Typography>{manga.title}</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					))}
				</Stack>

				<Backdrop open={true} sx={{ top: appStore.headerHeight }} />
			</>
		)
	}
)
