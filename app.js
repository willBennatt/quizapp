/* The Questions for the Quiz */
var Question = {
  image: null,
  options: [],
  correct: null
};

var q1 = Object.create(Question);
q1.image = "images/rainier-crystal.jpg";
q1.options = ["Mt. Thielson", "Mt. Adams", "Granite Peak", "Mt. Shuksan", "Mt. Rainier"];
q1.correct = "Mt. Rainier";

var q2 = Object.create(Question);
q2.image = "images/mt-st-helens.jpg";
q2.options = ["Mt. Adams", "Mt. Baker", "Mt. St. Helens", "Mt. Stuart", "Mt. Shuksan"];
q2.correct = "Mt. St. Helens";

var q3 = Object.create(Question);
q3.image = "images/mt-adams.jpg";
q3.options = ["Mt. Adams", "Mt. Baker", "Mt. Bachelor", "Mt. Hood", "Mt. Stuart"];
q3.correct = "Mt. Adams";

var q4 = Object.create(Question);
q4.image = "images/mt-hood.jpg";
q4.options = ["Mt. Thielson", "Mt. Baker", "Mt. Stuart", "Mt. Hood", "Mt. Bachelor"];
q4.correct = "Mt. Hood";

/* The Quiz object that will store questions and keep track of score */
var Quiz = {
  questions: [q1, q2, q3, q4],
  currQuestion: 0,
  chosen: 0,
  score: 0,
  checkAnswer: function() {
    return this.chosen == this.questions[this.currQuestion].options.indexOf(this.questions[this.currQuestion].correct);
  },
  getCurrQuestion: function() {
    return this.questions[this.currQuestion];
  }
}

/* The quiz object that will represent the game */
var currQuiz;

/* Game play and event listeners */
$(document).ready(function() {
  currQuiz = Object.create(Quiz);
  setQuiz();
  play();
});

/* sets the game for the given quiz object */
function setQuiz() {
  $("div.feedback").hide();
  $("#end").hide();
  $(".overlay").hide();
  $("div.image-container").empty();
  $("ul.options").empty();
  $("div.image-container").append("<img src='" + currQuiz.getCurrQuestion().image + "' class='mountain-img'>");
  for (var i = 0; i < currQuiz.getCurrQuestion().options.length; i++) {
    $("ul.options").append("<li id='" + i + "'>" + currQuiz.getCurrQuestion().options[i] + "</li>\n");
  }
}

/* ends the current quiz and shows the score */
function endQuiz() {
  $(".overlay").show();
  $("div.feedback").hide();
  $("#score").text(currQuiz.score);
  $("#possible").text(currQuiz.questions.length);
  $("#end").show();
  $("#new-game-button").click(function(event) {
    currQuiz = Object.create(Quiz);
    setQuiz(currQuiz);
  });
}

/* plays most of the game functionality, including choosing answers and going to
   the next question */
function play() {
  $("ul.options").on('click', 'li', function(event) {
    $("#" + currQuiz.chosen).css('background-color', '#afdee4');
    currQuiz.chosen = $(this).attr('id');
    $(this).css('background-color', 'yellow');
  });

  $('#submit-button').click(function(event) {
    $(".overlay").show();
    if(currQuiz.checkAnswer()) {
      $("#correct").show();
      currQuiz.score++;
    } else {
      $("#incorrect").show();
    }
  });

  $('.next').click(function(event) {
    currQuiz.currQuestion++;
    if (currQuiz.currQuestion > currQuiz.questions.length - 1) {
      endQuiz(currQuiz);
    } else {
      setQuiz(currQuiz);
    }
  });
}
