import { useEffect, useState } from 'react'
import './App.css'

const Statistics = (props) => {
  const { good, bad, neutral } = props;
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  useEffect(() => {
    if (good === 0 && bad === 0 && neutral === 0)
      return;

    const total = good + bad + neutral;
    const averageScore = (good - bad) / total;
    const positivePercentage = (good * 100) / total;

    setAll(total);
    setAverage(isNaN(averageScore) ? 0 : averageScore); // Manejo de NaN
    setPositive(isNaN(positivePercentage) ? 0 : positivePercentage); // Manejo de NaN
  }, [good, bad, neutral]);

  return (
    <div>
      <p>Statistics</p>
      {all > 0 ? (
        <>
          <table>
            <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive + '%'} />
            </tbody>
          </table>
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const StatisticLine = (props) =>{
  const {text, value} = props

  return(
    <>
      <tr>
        <td>{text}</td> 
        <td>{value}</td>
      </tr>
    </>
  )
}

const Button = (props) =>{
  const {handleClick, text} = props

  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  const handleClickGood = () => setGood(good + 1)
  const handleClickBad = () => setBad(bad + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)


  return (
    <div>
      <p>give feedback</p>
      <Button handleClick={handleClickGood} text="good"/>
      <Button handleClick={handleClickNeutral} text="neutral"/>
      <Button handleClick={handleClickBad} text="bad"/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App

