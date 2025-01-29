import {configureStore} from '@reduxjs/toolkit'
import signupAndLoginReducer from './features/AdminSignupAndLoginSlice'
import  exhibitionReducer  from './features/ExhibitionSlice'
import  isAuthReducer from './features/IsAuthSlice'
export const store = configureStore({
    reducer:{
        signupAndLoginReducer:signupAndLoginReducer,
        isAuthReducer:isAuthReducer,
        exhibitionReducer:exhibitionReducer, 
    }
})