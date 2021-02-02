import React, { useState, useMemo, useCallback, useEffect } from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';



/**Get a random indteger between two numbers */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const useStyles = makeStyles({
  question: {
    lineHeight: 1.5,
    marginBottom: '.6rem',
  }
},
);

/**QuestionCard
 * 
 * state:
 *  - formData
 *      the user's current answer selection
 *  - error
 *      true/false - used to style card if the submits a wrong answer
 *  - helperText
 *      correct answer text (displayed when user submits an incorrect answer)
 * 
 * props:
 *  - question
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
      }
 *  - answerQuestion:
 *      function that adds/sets user_anser property for question object. Used to record the user's selectred answer
 *  - submitted:
 *      true/false (value is true once the user submits the quiz)
 * 
 * QuestionContainer -> QuestionCard 
 */
function QuestionCard({ question, answerQuestion, submitted }) {
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState(' ');

  const classes = useStyles();

  /*Set helper text upon submission */
  useEffect(() => {
    if (submitted) {
      if (formData !== question.correct_answer) {
        setHelperText(question.correct_answer);
        setError(true);
      }
    }
  }, [submitted, formData, question.correct_answer]
  );

  /** Sets form data upon user selection */
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(evt.target.value);

    const answerChoice = {
      question: name,
      userAnswer: value
    }

    answerQuestion(answerChoice);
  }

  /** Creates radio group choices */
  const renderAnswerChoices = useCallback(() => {
    let answers = [...question.incorrect_answers];

    // Create random index (between 0 & 3) to insert 
    const idx = getRandomInt(0, 3);
    answers.splice(idx, 0, question.correct_answer);

    return answers.map((answer, idx) => (
      <FormControlLabel value={answer} control={<Radio />} label={answer} key={idx} disabled={submitted} />
    ))
  }, [question.incorrect_answers, question.correct_answer, submitted]);

  // TODO: Clean Up Dependancy Array
  const answerChoices = useMemo(() => (
    renderAnswerChoices()
  ), [renderAnswerChoices]);

  console.log('submitted:', submitted)

  return (
    <Box width={1}>
      <Card>
        <CardContent>
          <FormControl component='fieldset' error={error} fullWidth>
            <FormLabel component='legend' className={classes.question}>{question.question}</FormLabel>
            <RadioGroup aria-label={question.question} name={question.question} value={formData} onChange={handleChange}>
              {answerChoices}
            </RadioGroup>

            <FormHelperText>{helperText}</FormHelperText>

            {/* Difficulty and Category */}
            <Typography color='textSecondary' variant='caption' display='inline' align='right'>
              Difficulty: {question.difficulty[0].toUpperCase() + question.difficulty.slice(1)}
            </Typography>

            <Typography color='textSecondary' variant='caption' display='inline' align='right'>
              Category: {question.category}
            </Typography>

          </FormControl>
        </CardContent>
      </Card>
    </Box>
  )
};

export default QuestionCard;