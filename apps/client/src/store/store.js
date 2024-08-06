import { configureStore } from "@reduxjs/toolkit";
import siginupSlice from "./siginupSlice";
import loginSlice from "./loginSlice";


const store = configureStore({
    reducer : {
        login : loginSlice,
        signup : siginupSlice,
    }
})

export default store