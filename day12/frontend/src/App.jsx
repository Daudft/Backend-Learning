import React from 'react'
import { useState } from 'react'
import axios from "axios"

const App = () => {


  const [note, setNote] = useState([])


  const handleSubmit = function(e){
    e.preventDefault()

   const title = e.target.elements.title
   const description = e.target.elements.description

  
    setNote([...note, {title: title.value, description: description.value}])
  }


 axios.get("http://localhost:3000/api/notes")
 .then((res)=>{
  setNote(res.data.notes)
 })


 axios.post("http://localhost:3000/api/notes")
 .then((res)=>{
  setNote(res.data.notes)
 })
  return (
    <>

    <form onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder="Note title" />
      <input name="description" type="text" placeholder="Note description" />
      <button>Submit</button>
    </form>
      <div className="notes">
        {note.map((note)=>{
          return (<div className="note">
            <h2>{note.title}</h2>
            <p>{note.description}</p>
          </div>
          )
        })}
      </div>
    </>
  )
}

export default App
