import React, { useEffect, useState } from 'react'

const Chat = () => {

  const [data,setData]=useState([]);

  useEffect(()=>{
    let fetchData=async()=>{

        let res=await fetch('http://localhost:8080/api/chatData');
        let data=await res.json();
        setData(data.data)
    }
      fetchData();

  },[]);


  return (
    <div>
    {
        data.map((item)=>{
            return(
              <div key={item._id}>
              {
                item.chatName
              }
              </div>
            )
        })
    }
    
    </div>
  )
}

export default Chat