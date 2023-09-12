import React from 'react'

export default function Footer({ showCompleted, showAll, showActive, darkMode, activeButton }) {
  return (
   <div className='footer-wrapper'>
     <div className={darkMode ? 'footer dark' : 'footer'}>
      <button onClick={showAll} className={(activeButton === 1) ? 'active' : ''}>All</button>
      <button onClick={showActive} className={(activeButton === 2) ? 'active' : ''}>Active</button>
      <button onClick={showCompleted} className={(activeButton === 3) ? 'active' : ''}>Completed</button>
    </div>
    <div className='drag-instruction'>
      <p>Drag and drop to reorder list</p>
    </div>
   </div>

  )
}
