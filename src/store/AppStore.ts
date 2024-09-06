import { makeAutoObservable } from 'mobx'

type ScrollPos = 'top' | 'bottom' | 'middle'

export class AppStore {
	headerHeight = 64
	showHeader = true
	scrollPos: ScrollPos = 'top'

	constructor() {
		makeAutoObservable(this)
	}

	setShowHeader = (showHeader: boolean) => {
		this.showHeader = showHeader
	}

	toggleShowHeader = () => {
		this.showHeader = !this.showHeader
	}

	setScrollPos = (scrollPos: ScrollPos) => {
		this.scrollPos = scrollPos

		if (scrollPos === 'top' || scrollPos === 'bottom') {
			this.setShowHeader(true)
		} else this.setShowHeader(false)
	}
}
