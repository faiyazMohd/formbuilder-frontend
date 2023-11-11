import { configureStore } from "@reduxjs/toolkit";
import questionsSlice from "./questionsSlice";
import appSlice from "./appSlice";
const store =  configureStore({
    reducer:{
        questions:questionsSlice,
        app:appSlice,

    }
})

export default store