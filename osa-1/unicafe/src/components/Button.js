const Button = ({name, stat}) => {
    return <button onClick={()=>stat.set(stat.number+1)}>{name}</button>
}

export default Button