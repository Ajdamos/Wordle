import { useEffect ,useState, useCallback } from "react"
import { Tile } from "./Tile"
import { InputLetterContainer } from "./InputLetterContainer"

const Letters = ["A", "a", "B", "b", "C", "c", "D", "d", "E", "e", "F", "f", "G", "g", "H", "h", "I", "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "u", "V","v", "W","w", "X","x", "Y","y", "Z","z"]


export const WordleGame = (props) => {
    const [gameWin, setGameWin] = useState("")
    const [containerLetters, setContainerLetters] = useState(Array(6).fill(Array(5).fill({letter: ""})))
    const [currentPos, setCurrentPos] = useState({x: 0, y: 0})
    const word = props.word.toUpperCase().split('')

    useEffect(() => {

        const keyBoardPress = (letr) => {
            if(currentPos.x < 5 && Letters.includes(letr.key) && !gameWin) {
                let copy = JSON.parse(JSON.stringify(containerLetters)) //deep copy other not working wasteed like 2 hours on this :/
                copy[currentPos.y][currentPos.x] = {letter: letr.key.toUpperCase()}
                setCurrentPos(old => ({x: old.x + 1, y: old.y}))
                setContainerLetters(copy)
            }
            else if(currentPos.x > 0 && letr.key === "Backspace") {
                let copy = JSON.parse(JSON.stringify(containerLetters))
                copy[currentPos.y][currentPos.x - 1] = null
                setCurrentPos(old => ({x: old.x - 1, y: old.y}))
                setContainerLetters(copy)
            }
            else if(currentPos.x === 5 && currentPos.y < 6 && letr.key === "Enter"){
                
                let copy = JSON.parse(JSON.stringify(containerLetters))
                
                copy[currentPos.y] = copy[currentPos.y].map((item, index) => {
                    if(item.letter === word[index]){
                        return {letter: item.letter, state: "right"}
                    }
                    else if (word.includes(item.letter)){
                        return {letter: item.letter, state: "else"}
                    }
                    else return {letter: item.letter, state: "no"}
                })
                if(copy[currentPos.y].map(item => item.state).every(item => item === "right")){
                    setGameWin("win")
                    alert("you won the game win")
                    
                }
                else if(currentPos.y === 5){
                    alert("you lost the game")
                    setGameWin("lose")
                }
                setContainerLetters(copy)
                setCurrentPos(old => ({x: 0, y: old.y + 1}))
            }
        }
        window.addEventListener('keydown', keyBoardPress);
        return () => {
          window.removeEventListener(
            'keydown',
            keyBoardPress
          );
        };
    }, [currentPos]);

    const keyPress = (letr) => {
        if(currentPos.x < 5 && !gameWin) {
            let copy = JSON.parse(JSON.stringify(containerLetters)) //deep copy other not working wasteed like 2 hours on this :/
            copy[currentPos.y][currentPos.x] = {letter: letr}
            setCurrentPos(old => ({x: old.x + 1, y: old.y}))
            setContainerLetters(copy)
        }
    }
    const backSpacePress = () => {
        if(currentPos.x > 0) {
            let copy = JSON.parse(JSON.stringify(containerLetters)) //deep copy other not working wasteed like 2 hours on this :/
            copy[currentPos.y][currentPos.x - 1] = null
            setCurrentPos(old => ({x: old.x - 1, y: old.y}))
            setContainerLetters(copy)
        }
    }
    const enterNewRow = () => {
        if (currentPos.x === 5 && currentPos.y < 6){
            
            let copy = JSON.parse(JSON.stringify(containerLetters))
                
            copy[currentPos.y] = copy[currentPos.y].map((item, index) => {
                if(item.letter === word[index]){
                    return {letter: item.letter, state: "right"}
                }
                else if (word.includes(item.letter)){
                    return {letter: item.letter, state: "else"}
                }
                else return {letter: item.letter, state: "no"}
            })
            if(copy[currentPos.y].map(item => item.state).every(item => item === "right")){
                setGameWin("win")
                alert("you won the game win")
            }
            else if(currentPos.y === 5){
                alert("you lost the game")
                setGameWin("lose")
            }
            setContainerLetters(copy)
            setCurrentPos(old => ({x: 0, y: old.y + 1}))
        }
    }

    return (
    <div className="flex flex-col items-center h-screen w-screen bg-[#465569]">
        <h3 className="text-[#E1E1E1] m-1">WORDLEEE ! - {word}</h3>
        
        <div className="w-[450px] h-[450px] grid grid-cols-5 gap-2 justify-center">
        {
            containerLetters.map((arr, index1) => (
                arr.map((item, index2) => {
                   return <Tile letter={item?.letter} key={index1 + index2} state={item?.state} />
                })
              ))
        }
        </div>
        <div className="w-[40%] m-4 border-b-4 border-[#e1e1e1]"></div>
        <h3 className="m-2 text-[#e1e1e1]">{gameWin ? `you  ${gameWin}, word is ${word.join("")}` : ""}</h3>
        {<InputLetterContainer functions={{keyPress, backSpacePress, enterNewRow}}/>}
    </div>
    )
}  