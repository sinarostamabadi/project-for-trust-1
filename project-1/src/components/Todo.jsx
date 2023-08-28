import { Box, Button, Grid, Modal } from '@mui/material'
import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { MdDelete } from "react-icons/md"
import { AiFillEdit } from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { deleteTodo, editTodo, toggleTodo } from '../app/todoSlice/thunkFunctions'
import deleteLoading from "../assets/deleteLoading.gif"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { CustomInput } from './CustomInput'
import { useForm } from 'react-hook-form'
import editLoading from "../assets/editLoading.gif"

let option={
    year: "numeric",
    month: "long",
    day: "numeric",
    hour:"2-digit",
    minute:"numeric",
    second:"numeric"
    }

export default function Todo({title , description , dateAdd , id , completed}) {
    const[isOpen , setIsOpen]=useState(false);
    const [loading , setLoading]=useState(false);
    const [isEditing , setIsEditing]=useState(false);
    const [toggleLoading , setToggleLoading]=useState(false);

    const { register, handleSubmit, reset, control, setValue } = useForm({
        defaultValues:{
            title,
            description
        }
    });

    let dispatch=useDispatch();


    
    function handleDelete(id) {
        setLoading(true);
        dispatch(deleteTodo({id , setLoading}))
    }


    function handleCancelEdit() {
        setIsOpen(false);

        reset();
    }


    function handleEdit(data) {
        setIsEditing(true);
        let editValue={
            ...data,
            id,
            setIsEditing,
            setIsOpen
        }

        dispatch(editTodo(editValue));
    }


    function toggleHandle(id , completed) {
        setToggleLoading(true);
        dispatch(toggleTodo({id , completed , setToggleLoading}));
    }


  return (
    <div className='w-full p-4 border-b border-gray-200 mb-4'>
        <Box sx={{}}>
            <Box sx={{display:"flex" , justifyContent:"space-between" , alignItems:"center"}}>
                <Box>
                <div className='text-base font-semibold capitalize'>{title}</div>
                <div className='text-sm font-semibold capitalize text-gray-400'>{description}</div>
                </Box>
                <Box sx={{display:"flex" , gap:2}}>
                    <IconContext.Provider value={{className:"w-6 h-6 text-red-500 cursor-pointer"}}>
                        {loading ? <AiOutlineLoading3Quarters /> : <MdDelete onClick={() => handleDelete(id)} />}
                    </IconContext.Provider>
                    <IconContext.Provider value={{className:"w-6 h-6 text-green-700 cursor-pointer"}}>
                        <AiFillEdit onClick={() => setIsOpen(true)} />
                    </IconContext.Provider>
                </Box>
            </Box>
            <Box sx={{display:"flex" , justifyContent:"space-between" , alignItems:"center" , "mt":2.5}}>
                <div className='text-xs capitalize text-gray-400'>
                {new Date(dateAdd).toLocaleString("en-US" , option)}
                </div>
                <div onClick={() => toggleHandle(id , !completed)} className={`text-xs capitalize cursor-pointer ${completed ? "bg-green-500" : "bg-red-500"} rounded-sm text-white font-semibold p-1`}>{toggleLoading ? <AiOutlineLoading3Quarters /> : completed ? "completed" : "active"}</div>
            </Box>
            {isOpen ? <Box sx={{"mt":4}}>
            <form action="">
        <Grid container spacing={3}>
          <Grid item xs>
            <CustomInput name={"title"} control={control} label={"title"} idDisabled={loading} />
          </Grid>
          <Grid item xs>
            <CustomInput name={"description"} control={control} label={"description"} idDisabled={loading} />
          </Grid>
          <Grid item xs>
          {isEditing ? <div>
            <img className='w-10 h-10 ml-4' src={editLoading} alt="" />
          </div> : 
          <>
            <Button onClick={handleSubmit((data) => handleEdit(data))} sx={{px:2 , fontWeight:600}} variant="outlined">
                    edit
                </Button>
                <Button onClick={handleCancelEdit} sx={{"ml":2 , "px":2 , "fontWeight":600}} variant="outlined" color='error'>
                    cancel
                </Button>
          </>
                }
          </Grid>
        </Grid>
      </form>
            </Box> : null}
        </Box>
    </div>
  )
}