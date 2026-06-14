import React, { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {



function fetchNotes(){
  axios.get("http://localhost:3000/api/notes")
.then((res)=>{
  setNote(res.data.notez)
})
}  


function handleSubmit(e){
  e.preventDefault()

  const {title,description} = e.target.elements;

  console.log(title.value,description.value)

  axios.post("http://localhost:3000/api/notes",{
    title:title.value,
    description:description.value
  }).then((res)=>{
    console.log(res.data)
  })

  fetchNotes()
}


function deleteNote(noteId){
  console.log(noteId)

  axios.delete("http://localhost:3000/api/notes/"+noteId)
  .then((res)=>{
    console.log(res.data)
  })
  fetchNotes()

}


useEffect(()=>{
  fetchNotes()

},[])


  const [note, setNote] = useState([])
  return (
    <>


    <form  onSubmit={handleSubmit}>
      <input name='title' type="text" placeholder='enter title' />
      <input name='description' type="text"  placeholder='enter description'/>
      <button>Create Note</button>

    </form>
    <div className="notes">
      {note.map((note)=>{
        return <div className="note">
        <h1>{note.title}</h1>
        <h2>{note.description}</h2>
        <button onClick={()=>{deleteNote(note._id)}}>Delete</button>
      </div>

      })}
       
      
    </div>
      
    </>
  )
}

export default App
