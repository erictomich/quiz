
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
    this.abertura = true;
    this.nome = "";
    this.email = "";
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {

    /*if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }*/
    this.score+=answer;
    this.questionIndex++;
}

Quiz.prototype.isOpened = function() {
    return this.abertura === true;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

Quiz.prototype.iniciar = function() {
    var nome = document.getElementById('nome').value;  
    var email = document.getElementById('email').value;  

    if(nome==="") {
        alert("Preencha o seu nome");
        return false;
    }
    if(email==="") {
        alert("Preencha o seu email");
        return false;
    }

    this.abertura = false;
    this.nome = nome; 
    this.email = email; 
    document.getElementById("abertura").style.display = "none";
    populate();
    document.getElementById("quiz").style.display = "block";
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isOpened()) {
        showAbertura();
    } else if(quiz.isEnded()) {
        showScores();
    }
    else {
        /* show question */
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        /* show options */
        var choices = quiz.getQuestionIndex().choices;
        
        for(var i = 1; i <= 5; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = i;
            guess("btn" + i, i);
        }
/*
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
*/
        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

function showAbertura() {
    var aberturaHTML = "<h1>Método Quantum</h1>"; 
    aberturaHTML += "<div class='abertura'>";
    aberturaHTML += "<h2> Como você reage a dificuldades inesperadas? </h2>";
    aberturaHTML += "<div><h3> Faça o teste....<br><br>Classifique cada questão de 1 a 5<br>(1 = muito pouco, 5 = muito forte)</h3></div>";
    aberturaHTML += "<input id='nome' class='campo' placeholder='Nome'>";
    aberturaHTML += "<input id='email' class='campo' placeholder='Email'>";
    aberturaHTML += "<button class='btnIniciar' onclick='quiz.iniciar()'>Iniciar teste</button></div>";
    var element = document.getElementById("abertura");
    element.innerHTML = aberturaHTML;
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "<div class='questoes'><div>Questão <strong>" + currentQuestionNumber + "</strong> de " + quiz.questions.length + "</div><div>Classifique cada questão de 1 a 5 <br>(1 = muito pouco, 5 = muito forte)</div></div>";

};


function showScores() {
    var gameOverHTML = "<h1>Resultado</h1>";
    gameOverHTML += "<h2 id='score'> Sua pontuação de resiliência é: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
    document.getElementById("tabela").style.display = "flex";
};



/* create questions here */
var questions = [
    new Question("1. Em uma situação de crise ou caótica, eu me acalmo e me concentro em praticar ações úteis.", ["JavaScript", "XHTML","CSS", "HTML"], "HTML"),
    new Question("2. Eu sou geralmente otimista. Eu vejo dificuldades como temporárias e espero superá-las", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("3. Eu consigo tolerar altos níveis de ambiguidade e incerteza sobre as situações.", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("4. Eu me adapto rapidamente a novas situações. Eu sou bom em me recuperar das dificuldades.", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("5. Eu sou divertido. Eu encontro o humor em situações difíceis e consigo rir de mim.", ["Web Design", "Graphic Design", "SEO & Development", "All"], "All")
];

/* create quiz */
var quiz = new Quiz(questions);

/* display quiz */
populate();