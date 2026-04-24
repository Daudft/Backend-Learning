import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {

  const [note, setNote] = useState([
    {
    title:"title 1",
    description:"description 1"
  },
   {
    title:"title 2",
    description:"description 2"
  },
   {
    title:"title 3",
    description:"description 3"
  }
])

axios.get("http://localhost:3000/api/notes")
.then((res)=>{
  setNote(res.data.notes)
})
  return (
    <>
    <div className="notes">
     {note.map((note)=>{
      return  <div className="note">
        <h2>{note.title}</h2>
        <p>{note.description}</p>
      </div>
     })}
    </div>
      
    </>
  )
}

export default App
