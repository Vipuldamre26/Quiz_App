import { useEffect, useState } from "react";
import "./quiz.css";


const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [time, setTime] = useState(10);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        console.log('call useeffect');

        async function fetchData() {
        console.log('call fetechdata');

            try {
                let rawData = await fetch(
                    "https://opentdb.com/api.php?amount=10&type=multiple"
                );
                let daata = await rawData.json();
                let arrData = daata.results;
                setData(arrData);
                console.log('====================================');
                console.log(arrData);
                console.log('====================================');
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);



    useEffect(() => {
        const timer = setTimeout(() => {
            if (time > 0) {
                setTime(time - 1);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [time]);
    
    // *******************************************************************


    const checkAnswer = (e) => {
        console.log(e.target.innerText);

        
        if(index + 1 < 10 && data[index].correct_answer === e.target.innerText){
            setTotal(prev => prev + 1);
            setIndex(prev => prev + 1);
            setTime(10);
        }
        else if(index + 1 <= 10 && data[index].correct_answer === e.target.innerText){
            setTotal(prev => prev + 1);
            let div = document.querySelector('.quizapp');
            div.innerHTML = `Your Score is ${total+1}`;
        }
        else if(index + 1 < 10 && data[index].correct_answer !== e.target.innerText){
            setIndex(prev => prev + 1);
            setTime(10);
        }
        else{
            let div = document.querySelector('.quizapp');
            div.innerHTML = `Your Score is ${total}`;
        }

    }


    // *******************************************************************

    const skipQuestion = () => {
        // setIndex(prev => prev + 1);
    
        if(index < 9){
            setIndex(prev => prev + 1);
            setTime(10);
        }
        else if(index === 9){
            console.log('done');
        }
    }
    
    // *******************************************************************




    return (
        <div className="quiz">
            <h1>Quiz App</h1>
            <div className="quizapp">
                <h2>Question {index + 1}</h2>
                {
                    data.length === 0 ? (
                        <div>Loading...</div>
                    ) : (

                        <div className="options">
                        <p>{data[index].question}</p>
                       
                            {
                                data[index].incorrect_answers.map((answer, index) => {
                                    return <button onClick={(e) => checkAnswer(e)} key={index}>{answer}</button>
                                })
                                
                            }
                            <button onClick={(e) => checkAnswer(e)}>{data[index].correct_answer}</button>
                        </div>
                       
                       
                    )
                }

                <strong>Time left: {time} seconds</strong>

                <button onClick={skipQuestion}>Skip Question</button>
            </div>
        </div>
    );
};

export default Quiz;
