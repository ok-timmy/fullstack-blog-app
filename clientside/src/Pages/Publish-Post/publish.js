import React from 'react'
import './publish.css'

function Publish() {
  return (
    <div className="publish">
      <form className="publish-form">
        <div><input type="file" accept=".png, .jpg, .jpeg .webp"/></div>
        <div><input type="text" id="title" placeholder="Type Your Article Title" /></div>
        <div><textarea placeholder="Type your article content Here...." /></div>

        <button type="submit" className='submit-btn'>Publish</button>
      </form>
    </div>
  )
}

export default Publish