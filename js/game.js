// ================= MOVIE QUIZ GAME - game.js =================

document.addEventListener("DOMContentLoaded", () => {
  const { movies } = window.MovieManiacData;
  
  let currentQuestionIndex = 0;
  let score = 0;
  let gameQuestions = [];
  let difficulty = 'medium';
  let questionCount = 10;
  let timeLeft = 30;
  let timerInterval;

  // Game Screens
  const startScreen = document.getElementById('startScreen');
  const gameScreen = document.getElementById('gameScreen');
  const resultScreen = document.getElementById('resultScreen');

  // Game Score Management
  const GameScore = {
    get: function() {
      const scores = localStorage.getItem('moviemaniac_game_scores');
      return scores ? JSON.parse(scores) : { easy: 0, medium: 0, hard: 0 };
    },
    set: function(difficulty, score) {
      const scores = this.get();
      if (score > scores[difficulty]) {
        scores[difficulty] = score;
        localStorage.setItem('moviemaniac_game_scores', JSON.stringify(scores));
        return true; // New high score
      }
      return false;
    },
    getHigh: function(difficulty) {
      return this.get()[difficulty] || 0;
    }
  };

  // Display high scores
  function displayHighScores() {
    const highScoreDiv = document.getElementById('highScore');
    const scores = GameScore.get();
    highScoreDiv.innerHTML = `
      <h3>🏆 High Scores</h3>
      <p>Easy: ${scores.easy || 0}</p>
      <p>Medium: ${scores.medium || 0}</p>
      <p>Hard: ${scores.hard || 0}</p>
    `;
  }

  // Difficulty selection
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      difficulty = btn.dataset.difficulty;
      questionCount = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15;
      startGame();
    });
  });

  // Start game
  function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    gameQuestions = generateQuestions(questionCount);
    
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');

    document.getElementById('totalQuestions').textContent = questionCount;
    document.getElementById('currentScore').textContent = score;
    
    showQuestion();
  }

  // Generate random questions
  function generateQuestions(count) {
    const shuffled = [...movies].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // Show question
  function showQuestion() {
    if (currentQuestionIndex >= gameQuestions.length) {
      endGame();
      return;
    }

    const currentMovie = gameQuestions[currentQuestionIndex];
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('currentScore').textContent = score;

    // Display movie info
    document.getElementById('moviePoster').src = currentMovie.poster;
    document.getElementById('movieYear').textContent = currentMovie.year;
    document.getElementById('movieGenre').textContent = currentMovie.genre;
    document.getElementById('movieIndustry').textContent = currentMovie.industry;

    // Generate options
    generateOptions(currentMovie);

    // Start timer
    startTimer();
  }

  // Generate answer options
  function generateOptions(correctMovie) {
    const optionsContainer = document.getElementById('movieOptions');
    optionsContainer.innerHTML = '';

    // Get 3 wrong answers from same industry
    const wrongMovies = movies
      .filter(m => m.id !== correctMovie.id && m.industry === correctMovie.industry)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    // Combine and shuffle
    const allOptions = [correctMovie, ...wrongMovies].sort(() => Math.random() - 0.5);

    allOptions.forEach(movie => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = movie.title;
      btn.onclick = () => checkAnswer(movie.id === correctMovie.id, btn);
      optionsContainer.appendChild(btn);
    });
  }

  // Timer
  function startTimer() {
    timeLeft = 30;
    document.getElementById('timer').textContent = timeLeft;
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById('timer').textContent = timeLeft;
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        checkAnswer(false);
      }
    }, 1000);
  }

  // Check answer
  function checkAnswer(isCorrect, selectedBtn) {
    clearInterval(timerInterval);
    
    // Disable all buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.disabled = true;
    });

    if (isCorrect) {
      // Calculate points (more points for faster answers)
      const points = Math.floor((timeLeft / 30) * 10) + 10;
      score += points;
      
      if (selectedBtn) {
        selectedBtn.classList.add('correct');
      }
      
      showFeedback('Correct! +' + points + ' points', true);
    } else {
      // Highlight correct answer
      const correctMovie = gameQuestions[currentQuestionIndex];
      document.querySelectorAll('.option-btn').forEach(btn => {
        if (btn.textContent === correctMovie.title) {
          btn.classList.add('correct');
        }
      });
      
      if (selectedBtn) {
        selectedBtn.classList.add('wrong');
      }
      
      showFeedback('Wrong! The correct answer was: ' + correctMovie.title, false);
    }

    // Next question after delay
    setTimeout(() => {
      currentQuestionIndex++;
      showQuestion();
    }, 2000);
  }

  // Show feedback
  function showFeedback(message, isCorrect) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback-message ' + (isCorrect ? 'correct-feedback' : 'wrong-feedback');
    feedback.textContent = message;
    document.querySelector('.game-card').appendChild(feedback);
    
    setTimeout(() => feedback.remove(), 2000);
  }

  // End game
  function endGame() {
    clearInterval(timerInterval);
    gameScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    const maxPoints = questionCount * 20; // Max points per question
    const percentage = Math.round((score / maxPoints) * 100);
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('maxScore').textContent = maxPoints;

    // Check for high score
    const isHighScore = GameScore.set(difficulty, score);
    
    let resultTitle = '';
    let resultMessage = '';
    
    if (percentage >= 90) {
      resultTitle = '🌟 Outstanding!';
      resultMessage = 'You are a true movie buff!';
    } else if (percentage >= 75) {
      resultTitle = '🎉 Great Job!';
      resultMessage = 'You really know your movies!';
    } else if (percentage >= 50) {
      resultTitle = '👍 Good Effort!';
      resultMessage = 'Keep watching and learning!';
    } else {
      resultTitle = '📚 Keep Learning!';
      resultMessage = 'Watch more movies and try again!';
    }

    if (isHighScore) {
      resultTitle += ' 🏆 NEW HIGH SCORE!';
    }

    document.getElementById('resultTitle').textContent = resultTitle;
    document.getElementById('resultMessage').innerHTML = `
      <p>${resultMessage}</p>
      <p>You got ${Math.round((score/maxPoints) * 100)}% correct!</p>
      ${isHighScore ? '<p class="high-score-badge">🏆 New High Score for ' + difficulty.toUpperCase() + '!</p>' : ''}
    `;
  }

  // Play again
  document.getElementById('playAgainBtn').addEventListener('click', () => {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    displayHighScores();
  });

  // Back to home
  document.getElementById('backHomeBtn').addEventListener('click', () => {
    window.location.href = 'home.html';
  });

  // Initialize
  displayHighScores();
});