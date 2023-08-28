import { createReducer } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, editTodo, getTodo, toggleTodo } from "./thunkFunctions";

let initialState={
    todos:[],
    status:"idle"
}

export let todoReducer=createReducer(initialState , (builder) => {
    builder
    .addCase(getTodo.pending , (state , action) => {
        state.status="loading"
    })
    .addCase(getTodo.fulfilled , (state , action) => {
        let {todos}=action.payload;
        state.status="idle";

        state.todos=todos;
    })
    .addCase(addTodo.fulfilled , (state , action) => {
        let {todo}=action.payload;

        state.todos.push(todo);
    })
    .addCase(deleteTodo.fulfilled , (state , action) => {
        let {id}=action.payload;

        state.todos=state.todos.filter((todo) => {
            return todo.id!==id
        })
    })
    .addCase(editTodo.fulfilled , (state , action) => {
        let {title , description , id}=action.payload;

        state.todos=state.todos.map((todo) => {
            if(todo.id===id) {
                return {
                    ...todo,
                    title,
                    description
                }
            } else {
                return todo
            }
        })
    })
    .addCase(toggleTodo.fulfilled , (state , action) => {
        let {id , completed}=action.payload;

        state.todos=state.todos.map(( todo) => {
            if(todo.id===id) {
                return {
                    ...todo,
                    completed
                }
            } else {
                return todo;
            }
        })
    })
})