function clear() {
    $("#main").html('')
}


function displayHome() {
    clear()
    var title = document.createElement('h1');
    title.innerHTML = 'Coding Quiz Challenge';
    $("#main").append(title);
    $("#main").append(document.createElement('br'));
    var par = document.createElement('p');
    par.innerHTML = 'Try to answer the following code-related questions within the time limit. Keep in mind that the incorrect answers will penalize your score/time by ten seconds!';
    $("#main").append(par);

    $("#main").append(document.createElement('br'));
    $("#main").append('<button type="button" onclick="displayQuiz()" class="btn btn-primary">Start Quiz</button>');
}
displayHome();
var currentQuestion;
var currentQuestionNumber;
var questionDone = false;
var timeleft;
var timer;
function displayTime() {
    $('#time').html(timeleft);
}
function startTimer() {
    displayTime()
    timer = setInterval(function(){
        timeleft -= 1;
        displayTime()
        if(timeleft <= 0){
            clearInterval(timer);
            displayDone();
        }
    }, 1000);
}
function displayQuiz() {
    clear()
    currentQuestionNumber = -1;
    timeleft = questions.length * 15;
    var title = document.createElement('h1');
    title.setAttribute("id", "title")
    $("#main").append(title);
    $("#main").append(document.createElement('hr'));
    $("#main").append("<div id='questions'></div>");
    nextQuestion();
    $("#main").append(document.createElement('hr'));
    var message = document.createElement('p');
    message.setAttribute("id", "message")
    message.setAttribute("class", "float-left");
    $("#main").append(message);
    $("#main").append('<button type="button" id="continue" onclick="nextQuestion()" class="d-none float-right btn btn-primary">Continue</button>');
}
function nextQuestion() {
    if (questionDone) {
        reset();
    }
    currentQuestionNumber += 1;
    if (questions.length <= currentQuestionNumber) {
        displayDone();
        return;
    }
    currentQuestion = questions[currentQuestionNumber];
    $('#title').html(currentQuestion.title);
    var choices = currentQuestion.choices;
    startTimer();
    choices.forEach(function(choice) {
        $("#questions").append(document.createElement('br'));
        
        $("#questions").append('<button class="btn btn-primary" id="' + choices.indexOf(choice) + '" onclick="answer(this)">Submit</button>&nbsp');
        $("#" + choices.indexOf(choice)).html(choice);
        $("#questions").append(document.createElement('br'));
        
    });
}

function reset() {
    questionDone = false;
    timer = 0;
    displayTime();
    $("#questions").html('');
    $('#continue').toggleClass('d-none')
    $('#message').html('')
}
var answerButton;
function answer(e) {
    clearInterval(timer)
    answerButton = e;
    if (questionDone) {
        return;
    }
    questionDone = true;
    answerButton.classList.add('btn-primary');
    $('#continue').toggleClass('d-none')
    currentQuestion.choices.forEach(function(currentAnswer) {
        if(currentAnswer == currentQuestion.answer) {
            $("#" + currentQuestion.choices.indexOf(currentAnswer)).addClass('btn-success');
        }
        else {
            
            $("#" + currentQuestion.choices.indexOf(currentAnswer)).addClass('btn-danger');
        }
    })
    if (answerButton.innerHTML == currentQuestion.answer) {
        $('#message').html('Correct!')
    }
    else {
        $('#message').html('Wrong!')
        timeleft -= 15;
        displayTime()
    }
}
function displayDone() {
    clear()
    clearInterval(timer)
    var title = document.createElement('h1');
    title.innerHTML = 'All Done!';
    title.setAttribute("id", "title")
    $("#main").append(title);
    $("#main").append(document.createElement('br'));
    var par = document.createElement('p');
    par.innerHTML = 'Your final score is ' + timeleft + ".";
    $("#main").append(par);

    $("#main").append(document.createElement('br'));
    $("#main").append('<form onsubmit="return false" class="form-inline">' + 
        '<label for="exampleInputPassword1">Enter initials:</label>&nbsp' +
        '<input style="width:40%;" class="form-control" id="initials" placeholder="Initials">&nbsp' +
        '<button class="btn btn-primary" onclick="addScore()">Submit</button></form>');
}
