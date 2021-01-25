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
 *  - answerQuestion:
 *      function that adds/sets user_anser property for question object. Used to record the user's selectred answer
 * 
 * App -> QuestionContainer -> QuestionCard 
 */
function QuestionContainer({ questions, answerQuestion }) {
  const [userAnswers, setUserAnswers] = useState(null);

  console.log(questions)
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
              <Button variant='contained' size='large' color='primary'>Submit Answers</Button>
            </Grid>

          </Grid>
        </Box>
      }
    </React.Fragment>
  )
}

export default QuestionContainer;