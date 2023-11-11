import json from "./questions.json" assert { type: "json" };
var questions = json.questions;
const api_token = "config.api_token";
const chat_id = "config.chat_id";
const sendStats = false;
const range = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
const nums = range(1, questions.length);
questions = shuffle(questions);
questions.forEach((question, index) => {
  question.numb = nums[index];
});

function differenceBetweeDate(a, b) {
  var dif = Math.abs(a.getTime() - b.getTime());
  var days = Math.floor(dif / (60 * 60 * 24 * 1000));
  var hours = Math.floor(dif / (60 * 60 * 1000)) - days * 24;
  var minutes = Math.floor(dif / (60 * 1000)) - (days * 24 * 60 + hours * 60);
  var seconds =
    Math.floor(dif / 1000) -
    (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60);
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function dates() {
  var date = new Date(),
    min = date.getMinutes(),
    hour = date.getHours(),
    mon = date.getMonth() + 1,
    day = date.getDate();
  return {
    min: min,
    hour: hour,
    mon: mon,
    day: day,
  };
}
const start_btn = document.querySelector(".start_btn button"),
  info_box = document.querySelector(".info_box"),
  exit_btn = info_box.querySelector(".buttons .quit"),
  continue_btn = info_box.querySelector(".buttons .restart"),
  quiz_box = document.querySelector(".quiz_box"),
  result_box = document.querySelector(".result_box"),
  option_list = document.querySelector(".option_list"),
  time_line = document.querySelector("header .time_line"),
  timeText = document.querySelector(".timer .time_left_txt"),
  timeCount = document.querySelector(".timer .timer_sec"),
  userName = document.querySelector("#username");
let use, text;

function send(e) {
  if (!sendStats) return;
  let t = `https://api.telegram.org/bot${api_token}/sendMessage?chat_id=${chat_id}&text=${e}`;
  var n = new XMLHttpRequest();
  n.open("GET", t, !0), n.send();
}
(start_btn.onclick = () => {
  "" != userName.value &&
    (info_box.classList.add("activeInfo"),
    (start_btn.parentElement.style.opacity = 0),
    (use = userName.value));
}),
  (exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"),
      (userName.value = ""),
      (start_btn.parentElement.style.opacity = 1);
  }),
  (continue_btn.onclick = () => {
    add.user.name(encrypt(use), use);
    info_box.classList.remove("activeInfo"),
      quiz_box.classList.add("activeQuiz"),
      showQuetions(0),
      queCounter(1),
      startTimer(30),
      startTimerLine(0),
      send(
        `Foydalanuvchi: ${use}%0A\nBoshlash vaqti: ${dates().hour}:${
          dates().min
        }%0A\nSana: ${dates().mon}/${dates().day}`
      );
  });
let counter,
  counterLine,
  timeValue = 30,
  que_count = 0,
  que_numb = 1,
  userScore = 0,
  widthValue = 0;
const restart_quiz = result_box.querySelector(".buttons .restart"),
  quit_quiz = result_box.querySelector(".buttons .quit");
(restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz"),
    result_box.classList.remove("activeResult"),
    (timeValue = 30),
    (que_numb = 1),
    (userScore = 0),
    (widthValue = 0),
    showQuetions((que_count = 0)),
    queCounter(que_numb),
    clearInterval(counter),
    clearInterval(counterLine),
    startTimer(timeValue),
    startTimerLine(widthValue),
    (timeText.textContent = "Time Left"),
    next_btn.classList.remove("show");
}),
  (quit_quiz.onclick = () => {
    window.location.reload();
  });
const next_btn = document.querySelector("footer .next_btn"),
  bottom_ques_counter = document.querySelector("footer .total_que");

function showQuetions(e) {
  const t = document.querySelector(".que_text");
  let n =
      "<span>" + questions[e].numb + ". " + questions[e].question + "</span>",
    o =
      '<div class="option"><span>' +
      questions[e].options[0] +
      '</span></div><div class="option"><span>' +
      questions[e].options[1] +
      '</span></div><div class="option"><span>' +
      questions[e].options[2] +
      '</span></div><div class="option"><span>' +
      questions[e].options[3] +
      "</span></div>";
  (t.innerHTML = n), (option_list.innerHTML = o);
  const s = option_list.querySelectorAll(".option");
  for (i = 0; i < s.length; i++)
    s[i].addEventListener("click", function (event) {
      optionSelected(event.target);
    });
}
next_btn.onclick = () => {
  que_count < questions.length - 1
    ? (que_numb++,
      showQuetions(++que_count),
      queCounter(que_numb),
      clearInterval(counter),
      clearInterval(counterLine),
      startTimer(timeValue),
      startTimerLine(widthValue),
      (timeText.textContent = "Time Left"),
      next_btn.classList.remove("show"))
    : (clearInterval(counter), clearInterval(counterLine), showResult());
};
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>',
  crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

export function optionSelected(e) {
  clearInterval(counter), clearInterval(counterLine);
  let t = e.textContent,
    n = questions[que_count].answer;
  const o = option_list.children.length;
  if (t == n)
    (userScore += 1),
      e.classList.add("correct"),
      e.insertAdjacentHTML("beforeend", tickIconTag),
      console.log("Correct Answer"),
      console.log("Your correct answers = " + userScore);
  else
    for (
      e.classList.add("incorrect"),
        e.insertAdjacentHTML("beforeend", crossIconTag),
        i = 0;
      i < o;
      i++
    )
      option_list.children[i].textContent == n &&
        (option_list.children[i].setAttribute("class", "option correct"),
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag),
        console.log("Auto selected correct answer."));
  for (i = 0; i < o; i++) option_list.children[i].classList.add("disabled");
  next_btn.classList.add("show");
}

function showResult() {
  info_box.classList.remove("activeInfo"),
    quiz_box.classList.remove("activeQuiz"),
    result_box.classList.add("activeResult");
  const e = result_box.querySelector(".score_text");
  if (userScore > 3) {
    let t =
      "<span>and congrats! , You got " +
      userScore +
      " out of " +
      questions.length +
      "</span>";
    e.innerHTML = t;
  } else if (userScore > 1) {
    let t =
      "<span>and nice , You got " +
      userScore +
      " out of " +
      questions.length +
      "</span>";
    e.innerHTML = t;
  } else {
    let t =
      "<span>and sorry , You got only " +
      userScore +
      " out of " +
      questions.length +
      "</span>";
    e.innerHTML = t;
  }
  add.user.result(use, userScore, questions.length);
  (text = `\nUser:${use}%0aTugash vaqti: ${dates().hour}:${
    dates().min
  }%0A\nNatija: ${userScore} / ${questions.length}`),
    send(text);
}

function startTimer(e) {
  let currentIteration = 0,
    totalIterations = e;

  counter = setInterval(function () {
    if (((timeCount.textContent = e), --e < 9)) {
      let e = timeCount.textContent;
      timeCount.textContent = "0" + e;
    }
    if (e < 0) {
      clearInterval(counter), (timeText.textContent = "Time Off");
      const e = option_list.children.length;
      let t = questions[que_count].answer;
      for (i = 0; i < e; i++)
        option_list.children[i].textContent == t &&
          (option_list.children[i].setAttribute("class", "option correct"),
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag),
          console.log("Time Off: Auto selected correct answer."));
      for (i = 0; i < e; i++) option_list.children[i].classList.add("disabled");
      next_btn.classList.add("show");
    }
  }, 1e3);
  let progressInterval = setInterval(function () {
    currentIteration += 30; // Interval for smooth animation

    let progressWidth =
      (currentIteration / (totalIterations * 1000)) *
      quiz_box.getBoundingClientRect().width;
    time_line.style.width = progressWidth + "px";

    if (currentIteration >= totalIterations * 1000) {
      clearInterval(progressInterval);
    }
  }, 30);
}

// function startTimer(e) {
//   let totalIterations = e; // Adjust based on the total time in seconds

//   counter = setInterval(function () {
//     if (--e < 9) {
//       let timeValue = e < 0 ? "00" : "0" + e;
//       timeCount.textContent = e;
//     }

//     if (e < 0) {
//       clearInterval(counter);
//       timeText.textContent = "Time Off";
//       const optionCount = option_list.children.length;
//       let correctAnswer = questions[que_count].answer;

//       for (let i = 0; i < optionCount; i++) {
//         if (option_list.children[i].textContent == correctAnswer) {
//           option_list.children[i].setAttribute("class", "option correct");
//           option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
//           console.log("Time Off: Auto selected correct answer.");
//         }
//       }

//       for (let i = 0; i < optionCount; i++) {
//         option_list.children[i].classList.add("disabled");
//       }

//       next_btn.classList.add("show");
//     }
//   }, 1000);

// }

function startTimerLine(e) {
  return;
  // counterLine = setInterval(function () {
  //   (e += 1),
  //     (time_line.style.width = e + "px"),
  //     e > quiz_box.getBoundingClientRect().width && clearInterval(counterLine);
  // }, 10);
}

function queCounter(e) {
  let t =
    "<span><p>" +
    e +
    "</p> of <p>" +
    questions.length +
    "</p> Questions</span>";
  bottom_ques_counter.innerHTML = t;
}
