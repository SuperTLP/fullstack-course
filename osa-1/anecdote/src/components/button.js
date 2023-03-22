const Button =({name, setter}) => {
    return (
        <button onClick={setter}>{name}</button>
    )
}
export default Button