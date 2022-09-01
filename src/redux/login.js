import { createSlice } from "@reduxjs/toolkit"

export const loginSlice = createSlice({
	name: "login",
	
	initialState: {
		isConnected : false,
		token : null
	},

	reducers : {
		startSession: (state, action) => {
			state.isConnected = true 
			state.token = action.payload
		},

		stopSession: (state) => {
			state.isConnected = false
			state.token = null
		}
	}
})

export const { startSession, stopSession } = loginSlice.actions
export default loginSlice.reducer