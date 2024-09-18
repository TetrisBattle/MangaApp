import { Box, Stack } from '@mui/material'
import { useStore } from 'store/useStore'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BottomNav } from './ChapterBottomNav'
import { Header } from 'features/header/Header'

export const ChapterPage = observer(() => {
	const { source, mangaId, chapterId } = useParams()
	if (!source) throw new Error('source not found!')
	else if (!mangaId) throw new Error('mangaId not found!')
	else if (!chapterId) throw new Error('chapterId not found!')

	const { appStore, mangaStore } = useStore()
	const containerRef = useRef<HTMLDivElement>(null)
	const imageRefs = useRef<HTMLDivElement[] | null[]>([])
	const [scrollPos, setScrollPos] = useState<'top' | 'middle' | 'bottom'>(
		'top'
	)

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
		<Box
			ref={containerRef}
			onClick={() => {
				if (scrollPos === 'middle') {
					appStore.setShowHeader(!appStore.showHeader)
				}
			}}
			onScroll={() => {
				const scroll = containerRef.current?.scrollTop ?? 0
				const scrollHeight = containerRef.current?.scrollHeight ?? 0
				const clientHeight = containerRef.current?.clientHeight ?? 0
				const scrollArea = scrollHeight - clientHeight

				if (scroll === 0) {
					setScrollPos('top')
					appStore.setShowHeader(true)
				} else if (scroll >= scrollArea) {
					setScrollPos('bottom')
					appStore.setShowHeader(true)
				} else {
					setScrollPos('middle')
					appStore.setShowHeader(false)
				}
			}}
			sx={{
				overflow: 'auto',
				height: '100dvh',
			}}
		>
			<Header
				sx={{
					position: 'sticky',
					visibility: appStore.showHeader ? 'visible' : 'hidden',
				}}
			/>
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
	)
})
