import {configureStore} from '@reduxjs/toolkit'
import signupAndLoginReducer from './features/AdminSignupAndLoginSlice'
import  isAuthReducer from './features/IsAuthSlice'
export const store = configureStore({
    reducer:{
        signupAndLoginReducer:signupAndLoginReducer,
        isAuthReducer:isAuthReducer
    }
})