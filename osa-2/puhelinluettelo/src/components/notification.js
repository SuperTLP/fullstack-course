const Notification = ({ message, setMessage}) => {
    if (message["type"] === null) {
      return <div className="placeholder"></div>
    }
    setTimeout(() => {
      setMessage({message:"", type:null})
    }, 3000)
    return (
      <div className={`notification ${message["type"]}`}>
        {message["message"]}
      </div>
    )
  }
  export default Notification
