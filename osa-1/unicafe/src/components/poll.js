import Button from "./Button"

const Poll = ({stats}) => {
    return (
    <div>
        <h1>Feedback</h1>
        <Button name="good" stat={stats.good}></Button>
        <Button name="neutral" stat={stats.neutral}></Button>
        <Button name="bad" stat={stats.bad}></Button>
    </div>
    )
}

export default Poll

