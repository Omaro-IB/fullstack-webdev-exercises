import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Hello = () => {  return (    <div>      <p>Hello world</p>    </div>  )}

const App = () => {
    return (
        <div>
            <h1>Greetings</h1>
            <Hello />
            <Hello />
            <Hello />
        </div>
    )
}

export default App
