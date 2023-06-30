import { configureStore } from '@reduxjs/toolkit'

import matchReducer from './matchSlice.js'

export const store = configureStore({
  reducer: {
    match: matchReducer
  },
})