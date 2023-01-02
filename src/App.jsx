import { useState } from 'react'
import './App.css'

function App() {

  const [list, setList] = useState([])
  const [redo, setRedo] = useState([])

  const handleGetPosition = (e) => {
    const position = {
      clientX: e.clientX,
      clientY: e.clientY
    }
    setList((prev) => [...prev, position])
    setRedo([])
  }

  const handleUndo = (e) => {
    e.stopPropagation()

    if (list.length === 0) {
      return
    }

    const lastItem = list[list.length - 1]

    setRedo((prev) => [...prev, lastItem])

    setList((prev) => {
      const newList = [...prev]
      newList.pop()
      return newList
    })
  }

  const handleRedo = (e) => {
    e.stopPropagation()

    if (redo.length === 0) {
      return
    }

    const recoveredDot = redo[redo.length - 1]

    setRedo((prev) => {
      const newArr = [...prev]
      newArr.pop()
      return newArr
    })

    setList((prev) => [...prev, recoveredDot])
  }

  const handleClear = (e) => {
    e.stopPropagation()

    if (list.length === 0) {
      return
    }

    setRedo(list)
    setList([])
  }

  return (
    <div className="App" onClick={handleGetPosition}>
      {list.map((item, index) => {
        return <span className="Dot" key={index} style={{ top: item.clientY, left: item.clientX }} />
      })}
      <div className="buttons">
        <button onClick={handleUndo}>Desfazer</button>
        <button onClick={handleRedo}>Refazer</button>
        <button onClick={handleClear}>Limpar</button>
      </div>
    </div>
  )
}

export default App
