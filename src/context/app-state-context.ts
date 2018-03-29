import { createContext } from "react";

export interface AppState {
  breeds: object
}

export const initialState: AppState = {
  breeds: {}
}

const AppStateContext = createContext<AppState>(initialState)

export default AppStateContext