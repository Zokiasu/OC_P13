import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./login"
import userReducer from "./user"

export const store = configureStore({
	reducer: {
		login: loginReducer,
		user: userReducer
	}
})