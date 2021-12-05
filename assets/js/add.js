$_s3s.forEach(t => {
    t.on('click', function () {
        if (t.parentElement.getAttribute('true')) {
            t.classList.remove('false-answer');
            t.classList.add('true-answer');
            t.parentElement.setAttribute('disabled', true);
            setTimeout(() => {
                next()
            }, 700)
            log(4)
        } else {
            t.classList.remove('true-answer');
            t.classList.add('false-answer');
            t.parentElement.setAttribute('disabled', true);
            setTimeout(() => {
                next()
            }, 700)
        }
    })
})
let s = 0
let c = -1

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
    $('.main-1').scroll(0, s)
}