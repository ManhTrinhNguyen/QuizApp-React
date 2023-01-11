import {useState, useEffect} from 'react'

export default function Timer({quizIndex, setSwitchNextQuestion}) {
    const [timer, setTimer] = useState(3)
  
    useEffect(()=> {
        if(timer === 0) return setSwitchNextQuestion(true)
        const interval = setInterval(()=>{
            setTimer(prev => prev - 1)
        },1000)
        //return clearInterval(interval )
    },[])

    useEffect(() => {
        setTimer(3)
    },[quizIndex])
    
    return timer
}
