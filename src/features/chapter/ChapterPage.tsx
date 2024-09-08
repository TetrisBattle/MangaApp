import { Box, Stack } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { BottomNav } from './ChapterBottomNav'
import { SetupScroll } from './SetupScroll'

export const ChapterPage = observer(() => {
	const { mangaId, chapterId } = useParams()
	if (!mangaId || !chapterId) throw new Error('Id not found!')

	const { appStore, mangaStore } = useStore()
	const containerRef = useRef<HTMLDivElement>(null)
	const imageRefs = useRef<HTMLDivElement[] | null[]>([])

	useEffect(() => {
		mangaStore.onLoad(mangaId, chapterId)
	}, [mangaId, chapterId, mangaStore])

	useEffect(() => {
		const scrollToImage = (image: number) => {
			const section = imageRefs.current[image]
			containerRef.current?.scrollTo({
				top: section
					? section.offsetTop - appStore.headerHeight
					: undefined,
			})
		}
		scrollToImage(5)
	}, [appStore.headerHeight, imageRefs.current.length])

	if (!mangaStore.manga.chapters.length) return null

	return (
		<Box>
			<Box
				ref={containerRef}
				onClick={() => {
					if (appStore.scrollPos === 'middle') {
						appStore.toggleShowHeader()
					}
				}}
				sx={{
					overflow: 'auto',
					height: `calc(100vh - ${appStore.headerHeight}px)`,
				}}
			>
				<Stack
					sx={{
						maxWidth: (theme) => theme.breakpoints.values.sm,
						mx: 'auto',
					}}
				>
					{mangaStore.manga.chapter.imageUrls.map((image, index) => (
						<img
							ref={(el) => (imageRefs.current[index] = el)}
							key={image}
							src={image}
							alt='image'
						/>
					))}
				</Stack>
				<BottomNav />
			</Box>
			<SetupScroll />
		</Box>
	)
})
