import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

export default function Toast() {
  return (
    <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
  )
}
