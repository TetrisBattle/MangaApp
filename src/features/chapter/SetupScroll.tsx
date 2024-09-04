import { useScrollListener } from './useScrollListener'
import { useStore } from 'store/useStore'
import { useEffect } from 'react'

export const SetupScroll = () => {
	const { chapterStore } = useStore()
	const scroll = useScrollListener()

	useEffect(() => {
		if (scroll === 0) chapterStore.setScrollPos('top')
		else if (scroll === 100) chapterStore.setScrollPos('bottom')
		else chapterStore.setScrollPos('middle')
	}, [chapterStore, scroll])

	return <></>
}
