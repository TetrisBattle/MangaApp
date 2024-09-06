import { rootStore } from './RootStore'
import { StoreContext } from './StoreContext'

type StoreContextProviderProps = {
	children: React.ReactNode
}

export function StoreProvider({ children }: StoreContextProviderProps) {
	return (
		<StoreContext.Provider value={rootStore}>
			{children}
		</StoreContext.Provider>
	)
}
