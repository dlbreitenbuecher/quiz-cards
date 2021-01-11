import React from 'react';


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
                  ]
                }, ...
              ]
 *  
 *  - answerQuestion:
 *      function that adds/sets user_anser property for question object. Used to record the user's selectred answer
 * 
 * App -> QuestionContainer -> QuestionCard 
 */
function QuestionContainer({ questions }) {

  console.log(questions)
  return (
    <div>

    </div>
  )
}

export default QuestionContainer;