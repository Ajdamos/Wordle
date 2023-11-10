export const Tile = (props) => { //props letter, color
    const getBackgroundByState = () => {
        if(props.state === "else") return "bg-[#FA8128]"
        else if(props.state === "right") return "bg-[#03AC13]"
        return ""
    }
    return (
        <div className={"w-[70px] h-[60px] border-4 border-[#e1e1e1] rounded-lg " + getBackgroundByState()}>
            <p className="m-0 text-3xl text-center text-[#e1e1e1]">{props?.letter}</p>
        </div>
    )
}