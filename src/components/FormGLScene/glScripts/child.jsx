import React from 'react'

export default function Child(props) {
  return (
    <div>
      <button onClick={props.handleThis}>Button2</button>
    </div>
  )
}
