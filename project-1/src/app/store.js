import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./todoSlice/todoSlice";

export let store=configureStore({
    reducer:{
        todo:todoReducer
    }
})