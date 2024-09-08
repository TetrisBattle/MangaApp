import { useScrollListener } from './useScrollListener'
import { useStore } from 'store/useStore'
import { useEffect } from 'react'

export const SetupScroll = () => {
	const { appStore } = useStore()
	const scroll = useScrollListener()

	useEffect(() => {
		if (scroll === 0) appStore.setScrollPos('top')
		else if (scroll === 100) appStore.setScrollPos('bottom')
		else appStore.setScrollPos('middle')
	}, [appStore, scroll])

	return null
}
