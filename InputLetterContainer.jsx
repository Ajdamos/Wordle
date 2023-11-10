import { InputLetter } from "./InputLetter"


export const InputLetterContainer = (props) => {
    const Letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    return (
        <>
        <div className="w-[500px] h-[200px] m-4 grid grid-cols-8 grid-rows-3 gap-x-2">
            {
                Letters.map((item, index) => {
                    return <InputLetter functions={props.functions} letter={item} takenState={false} key={index} /> 
                })
            }
        </div>
        <div className="flex w-[200px] justify-between text-[#e1e1e1]">
        <button onClick={() => props.functions.backSpacePress()}>Back</button>
        <button onClick={() => props.functions.enterNewRow()}>Enter</button>
        </div>
        </>

    )
}