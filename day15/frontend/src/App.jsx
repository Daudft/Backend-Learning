import React, { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'

const App = () => {

  const [note, setNotes] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [newDescription, setNewDescription] = useState("")

  function fetchData(){
    axios.get("http://localhost:3000/api/notes")
    .then((res)=>{
      setNotes(res.data.note)
    })
  }

  useEffect(()=>{
    fetchData()
  },[])

  function handleSubmit(e){
    e.preventDefault()
    const {title,description} = e.target.elements
    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    })
    .then((res)=>{
      fetchData()
      e.target.reset()
    })
  }

  function deleteNote(noteId){
    axios.delete("http://localhost:3000/api/notes/"+noteId)
    .then((res)=>{
      fetchData()
    })
  }

  function updateNote(noteId){
    axios.patch("http://localhost:3000/api/notes/"+noteId,{
      description:newDescription
    })
    .then((res)=>{
      fetchData()
      setEditingId(null)
      setNewDescription("")
    })
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input name='title' type="text" placeholder='enter title' />
      <input name='description' type="text" placeholder='enter description' />
      <button>Create</button>
    </form> 

    <div className="notes">
    {note.map((note)=>{
     return <div className="note" key={note._id}>
        <h2>{note.title}</h2>

        {editingId === note._id ? (
          <>
            <input value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} />
            <button onClick={()=>updateNote(note._id)}>Save</button>
            <button onClick={()=>setEditingId(null)}>Cancel</button>
          </>
        ):(
          <>
            <h4>{note.description}</h4>
            <button id='delete' onClick={()=>{
              setEditingId(note._id)
              setNewDescription(note.description)
            }}>Edit</button>
          </>
        )}

        <button onClick={()=>{deleteNote(note._id)}} id='delete'>delete</button>
      </div>
    })} 
    </div>     
    </>
  )
}

export default App