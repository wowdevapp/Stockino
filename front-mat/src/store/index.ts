// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import calendar from 'src/store/apps/calendar'
import chat from 'src/store/apps/chat'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import permissions from 'src/store/apps/permissions'
import settings from 'src/store/apps/settings'
import user from 'src/store/apps/user'
import category from './apps/product/category'
import errors from './slices/errorSlice'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    settings,
    category,
    errors
  },
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
