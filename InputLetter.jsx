export const InputLetter = (props) => {
    const getBackgroundByState = () => {
        if(props.takenState === true) return "bg-[#95a2b2] text-[1e1e1e]"
        else return "text-[#e1e1e1]"
    }
    return (
            <button onClick={() => props.functions.keyPress(props.letter)} className={"w-10 h-9 rounded-lg border-2 flex items-center justify-center  " + getBackgroundByState()}>{props.letter}</button>
    )
}