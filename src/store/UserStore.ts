import { makeAutoObservable } from 'mobx'

export class UserStore {
	id = ''

	constructor() {
		makeAutoObservable(this)
	}

	setId = (id: string) => {
		this.id = id
	}
}
