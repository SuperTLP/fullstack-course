import StatisticsLine from "./statisticsLine"

const Statistics = ({stats}) => {
    let sum=(stats.good.number-stats.bad.number)
    let total=(stats.good.number+stats.neutral.number+stats.bad.number)
    if (total===0) {
        return <p>No feedback given</p>
    }
    return (
        <table>
            <tbody>
            <StatisticsLine name="good" value={stats.good.number}></StatisticsLine>
            <StatisticsLine name="neutral" value={stats.neutral.number}></StatisticsLine>
            <StatisticsLine name="bad" value={stats.bad.number}></StatisticsLine>
            <StatisticsLine name="all" value={total}></StatisticsLine>
            <StatisticsLine name="average" value={sum/total}></StatisticsLine>
            <StatisticsLine name="positive" value={((stats.good.number/total)*100).toString()+"%"}></StatisticsLine>
            </tbody>
        </table>
    )
}

export default Statistics