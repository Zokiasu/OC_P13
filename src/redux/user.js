import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
	name: "user",

	initialState: {
		email: null,
		firstName: null,
		lastName: null,
		createdAt: null,
		updatedAt: null,
		id: null
	},

	reducers : {
		getUserInfos : (state, action) => {
			state.email = action.payload.email
			state.firstName = action.payload.firstName
			state.lastName = action.payload.lastName
			state.createdAt = action.payload.createdAt
			state.updatedAt = action.payload.updatedAt
			state.id = action.payload.id
		},

		cleanUser : (state) => {
			state.email = null
			state.firstName = null
			state.lastName = null
			state.createdAt = null
			state.updatedAt = null
			state.id = null
		}
	}
})

export const { getUserInfos, cleanUser } = userSlice.actions
export default userSlice.reducer 