// var myQuestions = [{
//     question: "What is 10/2?",
//     answers: {
//       a: '3',
//       b: '5',
//       c: '115'
//     },
//     correctAnswer: 'b'
//   },
//   {
//     question: "What is 30/3?",
//     answers: {
//       a: '3',
//       b: '5',
//       c: '10'
//     },
//     correctAnswer: 'c'
//   }, {
//     question: "What is 5 * 10",
//     answers: {
//       a: '50',
//       b: '5',
//       c: '10'
//     },
//     correctAnswer: 'a'
//   },

// ];

// var quizContainer = document.getElementById('quiz');
// var resultsContainer = document.getElementById('results');

// generateQuiz(myQuestions, quizContainer, resultsContainer);

// function generateQuiz(questions, quizContainer, resultsContainer) {

//   function showQuestions(questions, quizContainer) {
//     // we'll need a place to store the output and the answer choices
//     var output = [];
//     var answers;

//     // for each question...
//     for (var i = 0; i < questions.length; i++) {

//       // first reset the list of answers
//       answers = [];

//       // for each available answer...
//       for (letter in questions[i].answers) {

//         // ...add an html radio button
//         answers.push(
//           '<label class=s3><div class=bob>' +
//           '<input type="radio" name="question' + i + '" value="' + letter + '">' +
//           '<span class="circle">' /* + letter*/ + '<span>' +
//           questions[i].answers[letter] +
//           '</div></label>'
//         );
//       }

//       // add this question and its answers to the output
//       output.push(
//         '<div class=main>' + '<div class="question"> <span>' + questions[i].question + '</span></div>' +
//         '<div class="answers">' + answers.join('') + '</div>' + '<div class=navigators>' +
//         '<div><button class="btn pr" onclick=pre()>Previous</button></div>' +
//         '<div><button class="btn ne" onclick=sa()>Next</button></div></div>' + '</div>'
//       );
//     }

//     // finally combine our output list into one string of html and put it on the page
//     quizContainer.innerHTML = output.join('');
//   }


//   function showResults(questions, quizContainer, resultsContainer) {

//     // gather answer containers from our quiz
//     var answerContainers = quizContainer.querySelectorAll('.answers');

//     // keep track of user's answers
//     var userAnswer = '';
//     var numCorrect = 0;

//     // for each question...
//     for (var i = 0; i < questions.length; i++) {

//       // find selected answer
//       userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

//       // if answer is correct
//       if (userAnswer === questions[i].correctAnswer) {
//         numCorrect++;
//         answerContainers[i].setAttribute('true', userAnswer)
//       }
//       // if answer is wrong or blank
//       else {
//         // color the answers red
//       }
//     }

//     // show number of correct answers out of total
//     resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
//   }

//   // show questions right away
//   showQuestions(questions, quizContainer);
//   document.querySelectorAll('[type=radio]').forEach(them => {
//     them.onclick = function () {
//       showResults(questions, quizContainer, resultsContainer);
//     }
//   })
// }

var myQuestions = [{
    question: "What is 10/2?",
    answers: {
      a: '3',
      b: '5',
      c: '115'
    },
    correctAnswer: 'b'
  },
  {
    question: "What is 30/3?",
    answers: {
      a: '3',
      b: '5',
      c: '10'
    },
    correctAnswer: 'c'
  }, {
    question: "What is 5 * 10",
    answers: {
      a: '50',
      b: '5',
      c: '10'
    },
    correctAnswer: 'a'
  },

];

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');

generateQuiz(myQuestions, quizContainer, resultsContainer);

function generateQuiz(questions, quizContainer, resultsContainer) {

  function showQuestions(questions, quizContainer) {
    // we'll need a place to store the output and the answer choices
    var output = [];
    var answers;

    // for each question...
    for (var i = 0; i < questions.length; i++) {

      // first reset the list of answers
      answers = [];

      // for each available answer...
      for (letter in questions[i].answers) {

        // ...add an html radio button
        answers.push(
          '<label class=s3><div class=bob>' +
          '<input type="radio" name="question' + i + '" value="' + letter + '">' +
          '<span class="circle">' /* + letter*/ + '<span>' +
          questions[i].answers[letter] +
          '</div></label>'
        );
      }

      // add this question and its answers to the output
      output.push(
        '<div class=main>' + '<div class="question"> <span>' + questions[i].question + '</span></div>' +
        '<div class="answers">' + answers.join('') + '</div>' + '<div class=navigators>' +
        '<div><button class="btn pr" onclick=pre()>Previous</button></div>' +
        '<div><button class="btn ne" onclick=sa()>Next</button></div></div>' + '</div>'
      );
    }

    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
  }


  function showResults(questions, quizContainer, resultsContainer) {

    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');
    var labels = document.querySelectorAll('.answers label');

    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;

    // for each question...
    for (var i = 0; i < questions.length; i++) {

      // find selected answer
      userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

      // if answer is correct
      let tr = 0;
      if (userAnswer === questions[i].correctAnswer) {
        numCorrect++;
          event.target.parentElement.parentElement.classList.add('true-answer')
          event.target.parentElement.parentElement.classList.remove('false-answer');
      }
      else {
        if (!(event.target.parentElement.parentElement.className.toString().includes('true-answer'))) {
          event.target.parentElement.parentElement.classList.add('false-answer')
          event.target.parentElement.parentElement.classList.remove('true-answer');
          
        }
      }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
  }

  // show questions right away
  showQuestions(questions, quizContainer);
  document.querySelectorAll('[type=radio]').forEach(them => {
    them.onclick = function () {
      showResults(questions, quizContainer, resultsContainer);
    }
  })
}
