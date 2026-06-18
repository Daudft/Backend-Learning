import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"

const App = () => {


  const [notes, setNotes] = useState([])
  function fetchData(){
axios.get("http://localhost:3000/api/notes")
  .then((res)=>{
    setNotes(res.data.notes)
  })
  }

  useEffect(()=>{
    fetchData()
  },[])


  //handle input

  function handleInput(e){
    e.preventDefault()

    const {title,description} = e.target.elements

    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    }).then((res)=>{
      fetchData()
      e.target.reset()
    })
  }

  //delete note

  function handleDelete(noteId){
    // console.log(noteId)

    axios.delete("http://localhost:3000/api/notes/"+noteId)
    .then((res)=>{
      fetchData()
    })
    
  }


  return (
    <>

    <form onSubmit={handleInput} >
      <input name='title' type="text" placeholder='enter title' />
      <input name="description" type="text" placeholder='enter description' />
      <button className='create'>Create</button>
    </form>
    <div className="notes">
      {notes.map((note)=>{
      return  <div className="note">
        <h2>{note.title}</h2>
        <h3>{note.description}</h3>
        <button onClick={()=>{handleDelete(note._id)}} id='delete'>Delete</button>
      </div>
      })}
    </div>
      
    </>
  )
}

export default App
