import React, { useState } from 'react'

export default function parent() {
  const [value, setValue] = useState("yes")

  const changeState = () => {
    setValue("no")
  }

  const handleThis = () => {
    console.log(value)
  }

  return (
    <div>
      <button onClick={changeState}>Button1</button>
      <Child handleThis={handleThis} />
    </div>
  )
}
