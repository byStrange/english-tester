let questions = [{
  numb: 1,
  question: "A dictionary has data _____ words.",
  answer: "about",
  options: ["to", "about", "in", "at"]
}, {
  numb: 2,
  question: " _____ pass me the salt?",
  answer: "Could",
  options: ["Should", "Must", "Could", "Might"]
}, {
  numb: 3,
  question: "Did you _____ who I meant?",
  answer: "know",
  options: ["known", "knew", "know", "got"]
}, {
  numb: 4,
  question: "He _____ English much _____ he writes it.",
  answer: "speaks / better than",
  options: ["speaks / better than", "speak / worse", "speaks / clearer than", "speak /  a lot"]
}, {
  numb: 5,
  question: "What does XML stand for?",
  answer: "eXtensible Markup Language",
  options: ["eXtensible Markup Language", "eXecutable Multiple Language", "eXTra Multi-Program Language", "eXamine Multiple Language"]
}, {
  numb: 6,
  question: "What does HTML stand for?",
  answer: "Hyper Text Markup Language",
  options: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Text Multiple Language", "Hyper Tool Multi Language"]
}];

function dates() {
  date = new Date, min = date.getMinutes(), hour = date.getHours(), mon = date.getMonth() + 1, day = date.getDate();
  return {
    min: min,
    hour: hour,
    mon: mon,
    day: day
  }
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
let use;

function send(e) {
  let t = `https://api.telegram.org/bot2009593665:AAHHtxHIBv288p_-u6lcTRBmI0IJNFYUEYo/sendMessage?chat_id=-1001487455180&text=${e}`;
  var n = new XMLHttpRequest;
  n.open("GET", t, !0), n.send()
}
start_btn.onclick = (() => {
  "" != userName.value && (info_box.classList.add("activeInfo"), start_btn.parentElement.style.opacity = 0, use = userName.value)
}), exit_btn.onclick = (() => {
  info_box.classList.remove("activeInfo"), userName.value = "", start_btn.parentElement.style.opacity = 1
}), continue_btn.onclick = (() => {
  info_box.classList.remove("activeInfo"), quiz_box.classList.add("activeQuiz"), showQuetions(0), queCounter(1), startTimer(15), startTimerLine(0), send(`Foydalanuvchi: ${use}%0A\nBoshlash vaqti: ${dates().hour}:${dates().min}%0A\nSana: ${dates().mon}/${dates().day}`)
});
let counter, counterLine, timeValue = 15,
  que_count = 0,
  que_numb = 1,
  userScore = 0,
  widthValue = 0;
const restart_quiz = result_box.querySelector(".buttons .restart"),
  quit_quiz = result_box.querySelector(".buttons .quit");
restart_quiz.onclick = (() => {
  quiz_box.classList.add("activeQuiz"), result_box.classList.remove("activeResult"), timeValue = 15, que_numb = 1, userScore = 0, widthValue = 0, showQuetions(que_count = 0), queCounter(que_numb), clearInterval(counter), clearInterval(counterLine), startTimer(timeValue), startTimerLine(widthValue), timeText.textContent = "Time Left", next_btn.classList.remove("show")
}), quit_quiz.onclick = (() => {
  window.location.reload()
});
const next_btn = document.querySelector("footer .next_btn"),
  bottom_ques_counter = document.querySelector("footer .total_que");

function showQuetions(e) {
  const t = document.querySelector(".que_text");
  let n = "<span>" + questions[e].numb + ". " + questions[e].question + "</span>",
    o = '<div class="option"><span>' + questions[e].options[0] + '</span></div><div class="option"><span>' + questions[e].options[1] + '</span></div><div class="option"><span>' + questions[e].options[2] + '</span></div><div class="option"><span>' + questions[e].options[3] + "</span></div>";
  t.innerHTML = n, option_list.innerHTML = o;
  const s = option_list.querySelectorAll(".option");
  for (i = 0; i < s.length; i++) s[i].setAttribute("onclick", "optionSelected(this)")
}
next_btn.onclick = (() => {
  que_count < questions.length - 1 ? (que_numb++, showQuetions(++que_count), queCounter(que_numb), clearInterval(counter), clearInterval(counterLine), startTimer(timeValue), startTimerLine(widthValue), timeText.textContent = "Time Left", next_btn.classList.remove("show")) : (clearInterval(counter), clearInterval(counterLine), showResult())
});
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>',
  crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(e) {
  clearInterval(counter), clearInterval(counterLine);
  let t = e.textContent,
    n = questions[que_count].answer;
  const o = option_list.children.length;
  if (t == n) userScore += 1, e.classList.add("correct"), e.insertAdjacentHTML("beforeend", tickIconTag), console.log("Correct Answer"), console.log("Your correct answers = " + userScore);
  else
    for (e.classList.add("incorrect"), e.insertAdjacentHTML("beforeend", crossIconTag), console.log("Wrong Answer"), i = 0; i < o; i++) option_list.children[i].textContent == n && (option_list.children[i].setAttribute("class", "option correct"), option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag), console.log("Auto selected correct answer."));
  for (i = 0; i < o; i++) option_list.children[i].classList.add("disabled");
  next_btn.classList.add("show")
}

function showResult() {
  info_box.classList.remove("activeInfo"), quiz_box.classList.remove("activeQuiz"), result_box.classList.add("activeResult");
  const e = result_box.querySelector(".score_text");
  if (userScore > 3) {
    let t = "<span>and congrats! , You got <p>" + userScore + "</p> out of <p>" + questions.length + "</p></span>";
    e.innerHTML = t
  } else if (userScore > 1) {
    let t = "<span>and nice , You got <p>" + userScore + "</p> out of <p>" + questions.length + "</p></span>";
    e.innerHTML = t
  } else {
    let t = "<span>and sorry , You got only <p>" + userScore + "</p> out of <p>" + questions.length + "</p></span>";
    e.innerHTML = t
  }
  text = `\nUser:${use}%0aTugash vaqti: ${dates().hour}:${dates().min}%0A\nNatija: ${userScore}`, send(text)
}

function startTimer(e) {
  counter = setInterval(function () {
    if (timeCount.textContent = e, --e < 9) {
      let e = timeCount.textContent;
      timeCount.textContent = "0" + e
    }
    if (e < 0) {
      clearInterval(counter), timeText.textContent = "Time Off";
      const e = option_list.children.length;
      let t = questions[que_count].answer;
      for (i = 0; i < e; i++) option_list.children[i].textContent == t && (option_list.children[i].setAttribute("class", "option correct"), option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag), console.log("Time Off: Auto selected correct answer."));
      for (i = 0; i < e; i++) option_list.children[i].classList.add("disabled");
      next_btn.classList.add("show")
    }
  }, 1e3)
}

function startTimerLine(e) {
  counterLine = setInterval(function () {
    e += 1, time_line.style.width = e + "px", e > 549 && clearInterval(counterLine)
  }, 29)
}

function queCounter(e) {
  let t = "<span><p>" + e + "</p> of <p>" + questions.length + "</p> Questions</span>";
  bottom_ques_counter.innerHTML = t
}