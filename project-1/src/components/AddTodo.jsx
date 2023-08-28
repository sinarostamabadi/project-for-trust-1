import { Button, Grid, Skeleton } from '@mui/material'
import React, { useState } from 'react'
import { CustomInput } from './CustomInput'
import { SiAddthis } from 'react-icons/si'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../app/todoSlice/thunkFunctions'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuid } from 'uuid';




export default function AddTodo() {

    const [loading , setLoading]=useState(false);

    let status=useSelector(state => state.todo.status);

    const { register, handleSubmit, reset, control, setValue } = useForm({
        defaultValues:{
            title:"",
            description:""
        }
    });

    let dispatch=useDispatch();

    let addTodoHandler=(data) => {
        if(!data.title) {
            toast.error('title is required', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } else {
            setLoading(true);
            let newTodo={
                ...data,
                id:uuid(),
                dateAdd:new Date().getTime(),
                completed:false
            }
    
            dispatch(addTodo({todo : newTodo , setLoading}))
    
            reset();
        }
    }

    let button=<Button onClick={handleSubmit(addTodoHandler)} sx={{px:2 , fontWeight:600}} variant="contained" endIcon={loading ? <AiOutlineLoading3Quarters /> : <SiAddthis />}>
                    {loading ? "loading" : "add"}
                </Button>;

  return (
    <>
    <div className='w-full p-4 shadow-sm backdrop-blur-2xl'>
        <form action="">
        <Grid container spacing={3}>
          <Grid item xs>
            {status==="loading" ?<Skeleton sx={{bgcolor:"gray.100" , "width":1 , "height":1}} animation={"wave"} variant="rectangular" />
            :<CustomInput name={"title"} control={control} label={"title"} idDisabled={loading} />
            }
          </Grid>
          <Grid item xs>
          {status==="loading" ?<Skeleton sx={{bgcolor:"gray.100" , "width":1 , "height":1}} animation={"wave"} variant="rectangular" /> 
          :<CustomInput name={"description"} control={control} label={"description"} idDisabled={loading} />
        }
          </Grid>
          <Grid item xs>
          {status==="loading" ?<Skeleton sx={{bgcolor:"gray.100" , "width":"90px" , "height":40}} animation={"wave"} variant="rectangular" /> : button }
          </Grid>
        </Grid>
      </form>
        </div>
    </>
  )
}
