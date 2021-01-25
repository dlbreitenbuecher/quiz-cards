import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import QuestionCard from './QuestionCard';


/**Container for QuestionCards
 * 
 * props:
 *  - questions
 *      array of 10 question objects
 *          [
                {
                  "category": "Entertainment: Television",
                  "type": "multiple",
                  "difficulty": "medium",
                  "question": "In the original Doctor Who series (1963), fourth doctor Tom Baker&#039;s scarf was how long?",
                  "correct_answer": "7 Meters",
                  "incorrect_answers": [
                    "10 Meters",
                    "2 Meters",
                    "5 Meters"
                  ],
                }, ...
              ]
 *  
 * state:
 *  - userAnswers
 *      array of objects consisting of a question and a user's answer choice
 *        [{question, userAnswer}, ...]
 * 
 *  - sumCorrectAnswers
 *      (Number)
 *        
 *  - 
 * 
 * App -> QuestionContainer -> QuestionCard 
 */
function QuestionContainer({ questions }) {
  const [userAnswers, setUserAnswers] = useState([]);
  const [sumCorrectAnswers, setSumCorrectAnswers] = useState(null);
  const [submitted, setSubmitted] = useState(false);


  function answerQuestion(newAnswerChoice) {
    setUserAnswers(userAnswers => {
      const filteredAnswers = userAnswers.filter(answer => (
        answer.question !== newAnswerChoice.question
      ))

      return [...filteredAnswers, newAnswerChoice];
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    let sum = 0;

    userAnswers.forEach( answer => {
      for(let question of questions) {
        if (answer.question === question.question) {
          // Add to sum based on question difficulty
          if (answer.userAnswer === question.correct_answer) {
            if (question.difficulty === 'easy') {
              sum += 1;
            } else if (question.difficulty === 'medium') {
              sum += 2;
            } else if (question.difficulty === 'hard') {
              sum += 3;
            }
          break;
        }
      }
    })
    setSumCorrectAnswers(sum)
  }

  return (
    <React.Fragment>
      {questions &&
        <Box mt={4}>
          <Grid container spacing={3} direction='column' alignItems='center'>
            {questions.map((q, idx) => (
              <Grid item container xs={6} key={q.correct_answer}>
                <QuestionCard question={q} answerQuestion={answerQuestion} key={idx} />
              </Grid>
            ))}

            <Grid item>
              <Button variant='contained' size='large' color='primary' onClick={handleSubmit}>Submit Answers</Button>
            </Grid>

          </Grid>
        </Box>
      }
    </React.Fragment>
  )
}

export default QuestionContainer;