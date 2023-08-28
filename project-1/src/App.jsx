import React from 'react'
import "./index.css"
import { CustomInput } from './components/CustomInput'
import { useForm } from 'react-hook-form';
import { Button, Grid } from '@mui/material';
import { SiAddthis } from "react-icons/si"
import Todo from './components/Todo';
import TodoContainer from './components/TodoContainer';
import AddTodo from './components/AddTodo';
import Toast from './components/Toast';


export default function App() {
  return (
    <div className="w-full h-screen bg-red-500 flex flex-col justify-start items-center">
      <h1 className='p-5 text-3xl font-semibold capitalize text-white'>todos</h1>
      <Toast />
      <div className="wrapper w-4/5 h-4/5 rounded-md shadow-sm bg-white overflow-hidden">

        <AddTodo />
        
        <TodoContainer />

      </div>
    </div>
  )
}
