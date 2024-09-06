import { createContext } from 'react'
import { rootStore } from './RootStore'

export const StoreContext = createContext(rootStore)
