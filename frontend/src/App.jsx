import React from 'react'
import { pingServer } from './services/api'
import { useState } from 'react'
import { useEffect } from 'react';
const App = () => {
  const [msg,setMsg] = useState("");
  useEffect(()=>{
    pingServer().then(data=>setMsg(data.msg))
  },[])
  return (
    <div className='text-2xl'>Ap  {msg || 'Loading...'}p</div>
  )
}

export default App