import React from 'react'
import { useSelector } from 'react-redux'
import Todo from './Todo';
import loading from "../assets/loading.gif"

export default function TodoContainer() {
    let todos=useSelector(state => state.todo.todos);
    let status=useSelector(state => state.todo.status);


    let loadingCem=<div className='w-full h-[calc(100%-6rem)] flex justify-center items-center'>
                        <img src={loading} alt="" />
                    </div>


    let todosCem=todos.map((todo) => {
        return <Todo title={todo.title} description={todo.description} id={todo.id} dateAdd={todo.dateAdd} completed={todo.completed} />
    })

  return (
    <>
    {status==="loading" ? loadingCem : 
        <div className="w-full h-[inherit] todo-container px-4 mt-4 overflow-y-scroll">
            {todosCem}
        </div>
    }
    </>
        
  )
}
