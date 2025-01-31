import {configureStore} from '@reduxjs/toolkit'
import signupAndLoginReducer from './features/AdminSignupAndLoginSlice'
import  exhibitionReducer  from './features/ExhibitionSlice'
import  isAuthReducer from './features/IsAuthSlice'
import conferenceReducer from './features/ConferenceSlice'
export const store = configureStore({
    reducer:{
        signupAndLoginReducer:signupAndLoginReducer,
        isAuthReducer:isAuthReducer,
        exhibitionReducer:exhibitionReducer, 
        conferenceReducer:conferenceReducer
    }
})