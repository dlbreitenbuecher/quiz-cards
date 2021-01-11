import React, { useState, useEffect, useCallback } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import './App.css';
import QuestionContainer from './questions/QuestionContainer';

const GENERAL_QUIZ_API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

const useStyles = makeStyles({
  spinnerContainer: {
    height: '40vh'
  }
},
);




/**Quiz Application
 * 
 * Users take a multiple choice triva quiz. Upon submitting their answers, their score is calculated
 * 
 * State: 
 *  - isLoading:
 *      loading spinner logic (default false)
 *  - fetchingQs:
 *      determines when to fetch questions from external API. (default false)  
 *  - questions:
 *      questions object from external API
              [
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
                  ]
                }, ...
              ]

  * App -> QuestionContainer -> QuestionCard     
 */
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingQs, setFetchingQs] = useState(false);
  const [questions, setQuestions] = useState(null);

  const classes = useStyles();

  /** Fetch quiz questions from API */
  useEffect(function fetchQuestionsOnCall() {
    async function fetchQuestions() {
      setIsLoading(true);
      try {
        const response = await fetch(GENERAL_QUIZ_API_URL);
        const questionsFromAPI = await response.json();

        setQuestions(questionsFromAPI.results);
        setIsLoading(false);
        setFetchingQs(false);
      } catch (err) {
        console.error('Error fetching quiz questions!', err);
        setIsLoading(false);
        setFetchingQs(false);
      }
    }

    if (fetchingQs) {
      fetchQuestions();
    }
  }, [fetchingQs])

  function answerQuestion() {
    return
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed height='100vh'>
        <Box mt={3} mb={3}>
          <Typography component='h1' variant='h2' align='center'>Quiz Time!</Typography>
        </Box>

        <Box display='flex' justifyContent='center' mt={4}>
          <Button variant='contained' color='primary' onClick={() => setFetchingQs(true)}>
            Generate Questions
          </Button>
        </Box>

        {/* Loading Spinner */}
        {isLoading &&
          <Box display='flex' alignItems='center' justifyContent='center' className={classes.spinnerContainer}>
            <CircularProgress className={classes.root} size={50} />
          </Box>
        }

        {/* Questions Component */}
        {!isLoading &&
        <QuestionContainer questions={questions} answerQuestion={answerQuestion} />
        }
      </Container>
    </React.Fragment>
  );
}

export default App;
