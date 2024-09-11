import { Box, Stack } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { BottomNav } from './ChapterBottomNav'
import { SetupScroll } from './SetupScroll'

export const ChapterPage = observer(() => {
	const { source, mangaId, chapterId } = useParams()
	if (!source) throw new Error('source not found!')
	else if (!mangaId) throw new Error('mangaId not found!')
	else if (!chapterId) throw new Error('chapterId not found!')

	const { appStore, mangaStore } = useStore()
	const containerRef = useRef<HTMLDivElement>(null)
	const imageRefs = useRef<HTMLDivElement[] | null[]>([])

	useEffect(() => {
		mangaStore.onLoad(source, mangaId, chapterId)
	}, [source, mangaId, chapterId, mangaStore])

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

	if (!mangaStore.manga.chapters.length) return <></>

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
					{mangaStore.selectedChapter?.imageUrls.map(
						(imageUrl, index) => (
							<img
								ref={(el) => (imageRefs.current[index] = el)}
								key={imageUrl}
								src={imageUrl}
								alt='image'
							/>
						)
					)}
				</Stack>
				<BottomNav />
			</Box>
			<SetupScroll />
		</Box>
	)
})
