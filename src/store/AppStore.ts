import { makeAutoObservable } from 'mobx'

type ScrollPos = 'top' | 'bottom' | 'middle'

export class AppStore {
	headerHeight = 40
	showHeader = true
	scrollPos: ScrollPos = 'top'

	constructor() {
		makeAutoObservable(this)
	}

	setShowHeader = (showHeader: boolean) => {
		this.showHeader = showHeader
	}
}
