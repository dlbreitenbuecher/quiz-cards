import React, { useState, useMemo } from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';



/**Get a random indteger between two numbers */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const useStyles = makeStyles({
  question: {
    lineHeight: 1.5,
    marginBottom: '.6rem'
  }
},
);

/**QuestionCard
 * 
 * state:
 *  - formData
 *      the user's current answer selection
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
 * 
 * QuestionContainer -> QuestionCard 
 */
function QuestionCard({ question, answerQuestion }) {
  const [formData, setFormData] = useState(null);

  const classes = useStyles();

  function handleChange(evt) {
    const userAnswer = evt.target.value;
    setFormData(userAnswer);
    // answerQuestion(userAnswer);
  }

  function renderAnswerChoices() {
    let answers = [...question.incorrect_answers];

    // Create random index (between 0 & 3) to insert 
    const idx = getRandomInt(0, 3);
    answers.splice(idx, 0, question.correct_answer);

    return answers.map((answer, idx) => (
      <FormControlLabel value={answer} control={<Radio />} label={answer} key={idx} />
    ))
  }

  const answerChoices = useMemo(() => (
    renderAnswerChoices()
  ),[question.incorrect_answers, question.correct_answer]);

  return (
    <Box width={1}>
      <Card>
        <CardContent>
          <FormControl component='fieldset'>
            <FormLabel component='legend' className={classes.question}>{formattedQuestion}</FormLabel>
            <RadioGroup aria-label={question.answer} name={question.answer} value={formData} onChange={handleChange}>
              {answerChoices}
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  )
};

export default QuestionCard;