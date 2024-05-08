import React,{useEffect,useMemo,useState} from 'react'
import { io } from 'socket.io-client'
const Socket = () => {

    const socket=useMemo(()=>io('http://localhost:8080'));

    useEffect(()=>{
        socket.on('connect',()=>{
            console.log('a user connected');
        });



    },[])
  return (
    <div>Socket</div>
  )
}

export default Socket