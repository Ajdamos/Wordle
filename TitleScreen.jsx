import { WordleGame } from "./WordleGame"
import { useState, useEffect } from "react"
import data from './words.json'

const words = ["about", "apple", "voxtv", "beach", "table", "mouse"]

export const TitleScreen = () => {

    const [word, setWord] = useState("")

    const HandleWordGeneration = () => {
        setWord(words[Math.floor(Math.random() * 6)])
    }

    if(!word) return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-[#465569]">
            <button onClick={HandleWordGeneration}><h1 className="text-[#e1e1e1]">Start Game</h1></button>
        </div>
    )
    else return (
        <WordleGame word={word}/>
    )


}