import { configureStore } from '@reduxjs/toolkit'

import teamReducer from './teamSlice.js'

export const store = configureStore({
  reducer: {
    team: teamReducer
  },
})