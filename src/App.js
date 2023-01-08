import { useEffect, useState } from "react";
import Start from "./components/Start";
import "./app.css"

function App() {
  //const [startGame, setStartGame] = useState(true)
  const [dataQuiz, setDataQuiz] = useState([])
  
  const [quizIndex, setQuizIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectAnswer, setSelectAnswer] = useState("")
  const [className, setClassName] = useState("answer")

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
    .then(res => {
      if(res.ok){
        return res.json()
      }
    })
    .then(data => {
      const formatData = data.results.map(data => {
        let inCorrectAnswerIndex = data.incorrect_answers.length + 1;
        const randomIndex = Math.floor(Math.random() * inCorrectAnswerIndex)
        data.incorrect_answers.splice(randomIndex, 0 , data.correct_answer)
        return {
          question: data.question,
          answers: data.incorrect_answers,
          correctAnswer : data.correct_answer
        }
      })
      setDataQuiz(formatData)
    })
    .catch(err => {
      console.error("Error fetching data : " + err)
    })
  },[])

  const answer = dataQuiz.map(quiz => {
    return quiz.answers
  })
  const correctAnswer = dataQuiz[quizIndex]?.correctAnswer
  console.log(correctAnswer)
  function handleClick(answer) {
    setSelectAnswer(correctAnswer)
    if(answer === correctAnswer) {
      setScore(prev => prev + 1)
    }
  }
  function nextQuestion () {
    setQuizIndex(prev => prev + 1)
  }

  return (
    <div className="App">
      <div className="container">
      <div className="score-container">
        <h1>Correct Answer {score}/5</h1>
      </div>
        <div className="question-container">
            <h1 className="question">{dataQuiz[quizIndex]?.question}</h1>
         </div>
         <div className="answer-container">{answer[quizIndex]?.map(item => (
          <button className={selectAnswer === item ? "answer correct" : "answer"} onClick={() => {
            handleClick(item)
          }}>{item}</button>
         ))}</div>
        <button onClick={nextQuestion} className="nextQuestionBtn">Next Question</button>
      </div>
    </div>
     );
    
}

export default App;
