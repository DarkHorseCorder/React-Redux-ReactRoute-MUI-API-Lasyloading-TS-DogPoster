import { createSlice } from "@reduxjs/toolkit";
import { StoreType } from "types";

export interface ReducerSetBreedsActionType {
  payload: {
    message: object
    status: string
  }
}

let initBreedsValueFromLocalStorage: object = {};
// const localStorageData = window.localStorage.getItem('MY_APP_STATE')
// if (localStorageData) {
//   initBreedsValueFromLocalStorage = JSON.parse(localStorageData)
// }

export const reduxSlice: any = createSlice({
  name: 'reduxSlice',
  initialState: {
    breeds: initBreedsValueFromLocalStorage
  },
  reducers: {
    setBreeds: (state: StoreType, action: ReducerSetBreedsActionType) => {
      state.breeds = action.payload.message
      window.localStorage.setItem('MY_APP_STATE', JSON.stringify(state.breeds));
    }
  }
})

export const { setBreeds } = reduxSlice.actions

export default reduxSlice.reducer