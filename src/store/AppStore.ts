import { makeAutoObservable } from 'mobx'

export class AppStore {
	showHeader = true
	headerHeight = 64

	constructor() {
		makeAutoObservable(this)
	}

	setShowHeader = (showHeader: boolean) => {
		this.showHeader = showHeader
	}

	toggleShowHeader = () => {
		this.showHeader = !this.showHeader
	}
}
