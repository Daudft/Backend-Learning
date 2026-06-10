import React, { useState } from 'react'
import axios from "axios"

const App = () => {


axios.get("http://localhost:3000/api/notes")
.then((res)=>{
  setNote(res.data.notez)
})

  const [note, setNote] = useState([])
  return (
    <>
    <div className="notes">
      {note.map((note)=>{
        return <div className="note">
        <h1>{note.title}</h1>
        <h2>{note.description}</h2>
      </div>

      })}
       
      
    </div>
      
    </>
  )
}

export default App
