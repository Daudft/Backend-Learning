import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [note, setNote] = useState([
    {
      title:"Test Title 1",
      description:"Test Description 1"
    },
    {
      title:"Test Title 2",
      description:"Test Description 2"
    },
    {
      title:"Test Title 3",
      description:"Test Description 3"
    }
  ])

  
  function fetchNotes(){
    axios.get("http://localhost:3000/api/notes")
  .then((res)=>{
    setNote(res.data.notes)
  })

  }

  function formControl(e){
    e.preventDefault()

    const {title,description} = e.target.elements

    // console.log(title.value,description.value)

    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    }).then((res)=>{
      console.log(res.data)
      fetchNotes()
    })

  }

  function handleDelete(noteId){
  
    axios.delete("http://localhost:3000/api/notes/" +noteId)
    .then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
  }

  

  useEffect(()=>{
    fetchNotes()


  },[])


  
  return (
    <>

    <form className='notes_form' onSubmit={formControl}>
      <input name='title' type="text" placeholder='enter title' />
      <input name='description' type="text" placeholder='enter description' />
      <button>Create Note</button>
    </form>
    <div className="notes">
      {note.map((note)=>{
        return <div className="note">
        <h2>{note.title}</h2>
        <p>{note.description}</p>
        <button onClick={()=>{handleDelete(note._id)}}>Delete</button>
      </div>
      })}
    </div>
      
    </>
  )
}

export default App
