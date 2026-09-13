import { configureStore } from "@reduxjs/toolkit";

import {userApi} from '../api/userApi.js'
import { planApi } from "../api/planApi.js";
import { exerciseApi } from "../api/exerciseApi.js";
import { trainerApi } from "../api/trainerApi.js";
import {adminApi} from '../api/adminApi.js'
import {achievementApi} from '../api/achivementApi.js'
import {purchaseApi} from '../api/purchaseApi.js'
import {personalInfoApi} from '../api/personalinfoApi.js'
import {membershipApi} from '../api/membershipApi.js'


const store = configureStore({

    reducer: {

        [userApi.reducerPath]: userApi.reducer,
        [planApi.reducerPath]: planApi.reducer,
        [exerciseApi.reducerPath]: exerciseApi.reducer,
        [trainerApi.reducerPath]: trainerApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [achievementApi.reducerPath]: achievementApi.reducer,
        [purchaseApi.reducerPath]: purchaseApi.reducer,
        [personalInfoApi.reducerPath]: personalInfoApi.reducer,
        [membershipApi.reducerPath]: membershipApi.reducer,

       

    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(

            userApi.middleware,
            planApi.middleware,
            exerciseApi.middleware,
            trainerApi.middleware,
            adminApi.middleware,
            achievementApi.middleware,
            membershipApi.middleware,
            purchaseApi.middleware,
            personalInfoApi.middleware,


           

        ),

});

export default store;