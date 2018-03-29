import { configureStore } from "@reduxjs/toolkit";
import breedReducer from './redux-slice'

export default configureStore({
  reducer: {
    breedReducer: breedReducer
  }
})