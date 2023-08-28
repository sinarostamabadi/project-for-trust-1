import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import axios from "axios";
import { toast } from "react-toastify";
import { toastSuccess } from "../../utils/toastSuccess";


export let getTodo=createAsyncThunk(actionTypes.getTodos ,
    async (params , thunkApi) => {
        let response=await axios.get("http://localhost:5050/todos");

        if(response.status=200) {
            return {
                todos:response.data
            }
        }
        
    }
    )




export let addTodo=createAsyncThunk(actionTypes.addTodo ,
        async (params , thunkApi) => {
            let {todo , setLoading}=params;

            let response=await axios.post("http://localhost:5050/todos" , todo)
            
            if(response.statusText="created") {
                setLoading(false);
                toastSuccess("todo added successfully");
                return {
                    todo
                }
            }

        }
        )





export let deleteTodo=createAsyncThunk(actionTypes.deleteTodo ,
            async (params , thunkApi) => {
                let {id , setLoading}=params;

                let response=await axios.delete(`http://localhost:5050/todos/${id}`);

                if(response.status==200) {
                    setLoading(false);
                    return {
                        id
                    }
                }
            }
            )





export let editTodo=createAsyncThunk(actionTypes.editTodo ,
                async (params , thunkApi) => {
                    let {id , title , description , setIsEditing , setIsOpen}=params;

                    let response=axios.patch(`http://localhost:5050/todos/${id}` , {title , description})

                    if((await response).status===200) {
                        setIsEditing(false);
                        setIsOpen(false);
                        toastSuccess("todo edited successfully");
                        return {
                            id,
                            title,
                            description
                        }
                    }
                }
                )






export let toggleTodo=createAsyncThunk(actionTypes.toggleTodo ,
                    async (params , thunkApi) => {
                        let {id , completed , setToggleLoading}=params;
                        let response=await axios.patch(`http://localhost:5050/todos/${id}` , {completed})

                        console.log(response);

                        if(response.status===200) {
                            setToggleLoading(false);
                            return {
                                id,
                                completed
                            }
                        }
                    }
                    )