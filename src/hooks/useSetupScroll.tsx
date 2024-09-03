import { useEffect, useState } from 'react'

export const useScrollListener = () => {
	const [scrollNum, setScrollNum] = useState(0)
	const scrollArea = document.body.scrollHeight - window.innerHeight

	useEffect(() => {
		window.addEventListener('scroll', () => setScrollNum(window.scrollY), {
			passive: true,
		})

		return () => {
			window.removeEventListener('scroll', () =>
				setScrollNum(window.scrollY)
			)
		}
	}, [])

	const scrollPercent = (scrollNum / scrollArea) * 100

	if (scrollNum === 0) return 0
	else if (Math.round(scrollPercent) === 100) return 100
	else return scrollPercent
}
