// $_s3s.forEach(t => {
//     t.on('click', function () {
//         if (t.parentElement.getAttribute('true')) {
//             t.classList.remove('false-answer');
//             t.classList.add('true-answer');
//             t.parentElement.setAttribute('disabled', true);
//             setTimeout(() => {
//                 next()
//             }, 700)
//             log(4)
//         } else {
//             t.classList.remove('true-answer');
//             t.classList.add('false-answer');
//             t.parentElement.setAttribute('disabled', true);
//             setTimeout(() => {
//                 next()
//             }, 700)
//         }
//     })
// })
// let s = 0
// let c = -1

// function next() {
//     s += 200
//     log(s)
//     $('.main-1').scroll(0, s)
// }

// function sa() {
//     s += 400;
//     $('.main-1').scroll(0, s)
// }

// function pre() {
//     if (s <= 0) {
//         s = 400
//     }
//     s -= 400
//     $('.main-1').scroll(0, s)
// }

// $_s3s.forEach(t => {
//     t.on('click', function () {
//         if (this.getAttribute('disabled') != 'true') {
//             if (t.parentElement.getAttribute('checked')) {
//                 t.classList.remove('false-answer');
//                 t.classList.add('true-answer');
//                 // t.parentElement.setAttribute('disabled', true);
//                 t.setAttribute('disabled', true);
//                 setTimeout(() => {
//                     next()
//                 }, 700)
//                 log(4)
//             } else {
//                 t.classList.remove('true-answer');
//                 t.classList.add('false-answer');
//                 // t.parentElement.setAttribute('disabled', true);
//                 t.setAttribute('disabled', true);
//                 setTimeout(() => {
//                     next()
//                 }, 700)
//             }
//         }
//     })
// })
$_s3s.forEach(they => {
    they.on('click', function (){
        setTimeout(()=>{
            next()
        },500) 
    })
})
let s = 0
let c = -1
function scrollStart () {
    $('.main-1').scroll(0, 0)
}
function scrollEnd() {
        $('.main-1').scroll(0,$('.main-1').scrollHeight )
}
scrollStart()
function next() {
    s += 200
    log(s)
    $('.main-1').scroll(0, s)
}

function sa() {
    s += 400;
    $('.main-1').scroll(0, s)
}

function pre() {
    if (s <= 0) {
        s = 400
    }
    s -= 400
}
// window.on('keyup', e => {
//     switch (e.keyCode) {
//         case 32:
//             next();
//         break;
//         case 38:
//             pre();
//         break;
//         case 40:
//             sa();
//         break;


//     }
// })
