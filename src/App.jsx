import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {useState, useEffect} from 'react'
import Die from "./components/Die.jsx"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [numberRoll, setNumberRoll] = useState(0)
  const [time, setTime] = useState(new Date())
  
  useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if (allHeld && allSameValue) {
          setTenzies(true)
      }
  }, [dice])

  function generateNewDie() {
      return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
      }
  }
  
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(generateNewDie())
      }
      return newDice
  }
  
  function rollDice() {
      if(!tenzies) {
          setDice(oldDice => oldDice.map(die => {
              return die.isHeld ? 
                  die :
                  generateNewDie()
          }))
          setNumberRoll(prevNumber => prevNumber + 1)
      } else {
          setTenzies(false)
          setDice(allNewDice())
          setNumberRoll(0)
          setTime(new Date())
      }
  }

  
  function holdDice(id) {
      setDice(oldDice => oldDice.map(die => {
          return die.id === id ? 
              {...die, isHeld: !die.isHeld} :
              die
      }))
  }
  
  const diceElements = dice.map(die => (
      <Die 
          key={die.id} 
          value={die.value} 
          isHeld={die.isHeld} 
          holdDice={() => holdDice(die.id)}
      />
  ))

  function theTime() {

    let endDate   = new Date();
    let seconds = (endDate.getTime() - time.getTime()) / 1000;

    console.log(seconds)
    return seconds
  }





  return (
      <main onClick={theTime}>
          {tenzies && <Confetti />}
          <h1 className='title'>Tenzies</h1>
          <p className='instructions'>Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.</p>
          <div className='diceContainer'>
              {diceElements}
          </div>
          <button 
              className='rollDice' 
              onClick={rollDice}
          >
              {tenzies ? "New Game" : "Roll"}
          </button>
          { tenzies &&
              <>
                  <p>the number of roll is {numberRoll}</p>
                  <p>You took {theTime()} seconds to complete the game</p>
              </>
          }
      </main>
  )
}

export default App
