import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import postsSliceReducer from "./postsSlice";

const store = configureStore({
    reducer : {
        auth: authSliceReducer,
        posts: postsSliceReducer,
    }
})


export default store