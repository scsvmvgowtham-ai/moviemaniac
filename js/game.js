// ================= MOVIE QUIZ GAME - REWRITTEN - game.js =================

document.addEventListener("DOMContentLoaded", () => {
  const { movies } = window.MovieManiacData;
  
  let currentQuestionIndex = 0;
  let score = 0;
  let gameQuestions = [];
  let difficulty = 'medium';
  let questionCount = 10;
  let timeLeft = 30;
  let timerInterval;
  let gameMode = 'classic';
  let blurLevel = 3;
  let revealPenalty = 0;

  // Game Screens
  const startScreen = document.getElementById('startScreen');
  const gameScreen = document.getElementById('gameScreen');
  const resultScreen = document.getElementById('resultScreen');

  // Game Score Management
  const GameScore = {
    get: function() {
      const scores = localStorage.getItem('moviemaniac_game_scores');
      return scores ? JSON.parse(scores) : { 
        easy: { classic: 0, charades: 0, blur: 0 },
        medium: { classic: 0, charades: 0, blur: 0 },
        hard: { classic: 0, charades: 0, blur: 0 }
      };
    },
    set: function(difficulty, mode, score) {
      const scores = this.get();
      if (!scores[difficulty][mode] || score > scores[difficulty][mode]) {
        scores[difficulty][mode] = score;
        localStorage.setItem('moviemaniac_game_scores', JSON.stringify(scores));
        return true;
      }
      return false;
    },
    getHigh: function(difficulty, mode) {
      const scores = this.get();
      return (scores[difficulty] && scores[difficulty][mode]) || 0;
    }
  };

  // Display high scores
  function displayHighScores() {
    const highScoreDiv = document.getElementById('highScore');
    const scores = GameScore.get();
    highScoreDiv.innerHTML = `
      <h3>🏆 High Scores</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
        <div>
          <h4 style="color: #d4af37; margin-bottom: 0.5rem;">Easy</h4>
          <p>Classic: ${scores.easy.classic || 0}</p>
          <p>Charades: ${scores.easy.charades || 0}</p>
          <p>Blur: ${scores.easy.blur || 0}</p>
        </div>
        <div>
          <h4 style="color: #d4af37; margin-bottom: 0.5rem;">Medium</h4>
          <p>Classic: ${scores.medium.classic || 0}</p>
          <p>Charades: ${scores.medium.charades || 0}</p>
          <p>Blur: ${scores.medium.blur || 0}</p>
        </div>
        <div>
          <h4 style="color: #d4af37; margin-bottom: 0.5rem;">Hard</h4>
          <p>Classic: ${scores.hard.classic || 0}</p>
          <p>Charades: ${scores.hard.charades || 0}</p>
          <p>Blur: ${scores.hard.blur || 0}</p>
        </div>
      </div>
    `;
  }

  // Game mode selection
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gameMode = btn.dataset.mode;
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update info based on selected mode
      updateModeInfo(gameMode);
    });
  });

  // Update mode information
  function updateModeInfo(mode) {
    let modeInfoDiv = document.getElementById('modeInfo');
    if (!modeInfoDiv) {
      modeInfoDiv = document.createElement('div');
      modeInfoDiv.id = 'modeInfo';
      const modeSelect = document.querySelector('.game-mode-select');
      if (modeSelect) {
        modeSelect.appendChild(modeInfoDiv);
      }
    }
    
    const modeInfo = {
      classic: {
        title: '🎯 Classic Quiz',
        description: 'Identify movies from scene images (without titles), year, genre, and industry hints.',
        requirements: 'Requires game images to be uploaded.'
      },
      charades: {
        title: '🎭 Dumb Charades',
        description: 'Show the movie name to your team and act it out without speaking!',
        requirements: 'No special images needed - uses movie titles.'
      },
      blur: {
        title: '🔍 Blur Image',
        description: 'Identify movies from blurred scenes. Reveal more clarity for hints (costs points).',
        requirements: 'Requires blur game images to be uploaded.'
      }
    };
    
    const info = modeInfo[mode];
    modeInfoDiv.innerHTML = `
      <div style="background: rgba(212, 175, 55, 0.1); padding: 1rem; border-radius: 10px; margin-top: 1rem;">
        <h4 style="color: #d4af37; margin-bottom: 0.5rem;">${info.title}</h4>
        <p style="margin-bottom: 0.5rem;">${info.description}</p>
        <p style="font-size: 0.9rem; color: #999;">${info.requirements}</p>
      </div>
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
    revealPenalty = 0;
    blurLevel = 3;
    
    // Generate questions based on game mode
    if (gameMode === 'charades') {
      // Charades uses all movies
      gameQuestions = generateQuestions(questionCount, movies);
    } else {
      // Classic and Blur modes need game images
      if (!window.MovieManiacGameImages) {
        alert('Error: Game images not loaded! Please include game-images.js in your HTML file.');
        return;
      }
      
      const moviesWithImages = window.MovieManiacGameImages.getMoviesWithGameImages();
      
      if (moviesWithImages.length < questionCount) {
        alert(`Not enough game images!\n\nYou need at least ${questionCount} movies with game images for ${difficulty} difficulty.\n\nCurrently available: ${moviesWithImages.length} movies\n\nPlease add more images or choose an easier difficulty.`);
        return;
      }
      
      gameQuestions = generateQuestions(questionCount, moviesWithImages);
    }
    
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');

    document.getElementById('totalQuestions').textContent = questionCount;
    document.getElementById('currentScore').textContent = score;
    
    updateGameUI();
    showQuestion();
  }

  // Update game UI based on mode
  function updateGameUI() {
    const posterContainer = document.querySelector('.movie-poster-container');
    const hintsDiv = document.querySelector('.movie-hints');
    const optionsDiv = document.getElementById('movieOptions');
    
    if (gameMode === 'charades') {
      // Charades mode
      posterContainer.innerHTML = `
        <div class="charades-container">
          <div class="charades-info">
            <p><strong>How to Play:</strong></p>
            <p>1. Show the movie name to your team</p>
            <p>2. Act out the movie without speaking!</p>
            <p>3. When guessed correctly, click "Next Movie"</p>
            <p>4. Skip if needed (costs 5 points)</p>
          </div>
          <div class="movie-name-display" id="charadesMovieName"></div>
          <div class="charades-controls">
            <button class="btn-primary" onclick="handleCharadesCorrect()">✅ Guessed Correctly!</button>
            <button class="btn-secondary" onclick="handleCharadesSkip()">⏭️ Skip (-5 pts)</button>
          </div>
        </div>
      `;
      hintsDiv.style.display = 'none';
      optionsDiv.style.display = 'none';
    } else if (gameMode === 'blur') {
      // Blur mode
      posterContainer.innerHTML = `
        <div class="blur-image-container">
          <img id="blurImage" src="" alt="Blurred Movie Scene" class="blur-level-high">
          <button class="reveal-btn" onclick="revealMore()">🔍 Reveal More (-3 pts)</button>
        </div>
      `;
      hintsDiv.style.display = 'block';
      optionsDiv.style.display = 'grid';
    } else {
      // Classic mode
      posterContainer.innerHTML = `<img id="moviePoster" src="" alt="Movie Scene">`;
      hintsDiv.style.display = 'block';
      optionsDiv.style.display = 'grid';
    }
  }

  // Generate random questions
  function generateQuestions(count, availableMovies) {
    const shuffled = [...availableMovies].sort(() => Math.random() - 0.5);
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

    if (gameMode === 'charades') {
      showCharadesQuestion(currentMovie);
    } else if (gameMode === 'blur') {
      showBlurQuestion(currentMovie);
      startTimer();
    } else {
      showClassicQuestion(currentMovie);
      startTimer();
    }
  }

  // Classic mode question
  function showClassicQuestion(currentMovie) {
    const posterImg = document.getElementById('moviePoster');
    if (posterImg) {
      const quizImage = window.MovieManiacGameImages.getQuizImage(currentMovie.id);
      posterImg.src = quizImage || currentMovie.poster;
    }

    document.getElementById('movieYear').textContent = currentMovie.year;
    document.getElementById('movieGenre').textContent = currentMovie.genre;
    document.getElementById('movieIndustry').textContent = currentMovie.industry;

    generateOptions(currentMovie);
  }

  // Blur mode question
  function showBlurQuestion(currentMovie) {
    blurLevel = 3;
    revealPenalty = 0;
    
    const blurImg = document.getElementById('blurImage');
    if (blurImg) {
      const blurImage = window.MovieManiacGameImages.getBlurImage(currentMovie.id);
      blurImg.src = blurImage || currentMovie.poster;
      blurImg.className = 'blur-level-high';
    }

    const revealBtn = document.querySelector('.reveal-btn');
    if (revealBtn) {
      revealBtn.disabled = false;
      revealBtn.textContent = '🔍 Reveal More (-3 pts)';
    }

    document.getElementById('movieYear').textContent = currentMovie.year;
    document.getElementById('movieGenre').textContent = currentMovie.genre;
    document.getElementById('movieIndustry').textContent = currentMovie.industry;

    generateOptions(currentMovie);
  }

  // Charades mode question
  function showCharadesQuestion(currentMovie) {
    const nameDisplay = document.getElementById('charadesMovieName');
    if (nameDisplay) {
      nameDisplay.innerHTML = `
        <h2>${currentMovie.title}</h2>
        <p style="color: #d4af37;">${currentMovie.industry} • ${currentMovie.year}</p>
      `;
    }
    
    clearInterval(timerInterval);
    document.getElementById('timer').textContent = '∞';
  }

  // Reveal more in blur mode
  window.revealMore = function() {
    const blurImg = document.getElementById('blurImage');
    if (!blurImg || blurLevel === 0) return;
    
    blurLevel--;
    revealPenalty += 3;
    
    const blurClasses = ['blur-level-none', 'blur-level-low', 'blur-level-medium', 'blur-level-high'];
    blurImg.className = blurClasses[blurLevel];
    
    const revealBtn = document.querySelector('.reveal-btn');
    if (blurLevel === 0 && revealBtn) {
      revealBtn.disabled = true;
      revealBtn.textContent = '🔍 Fully Revealed';
    } else if (revealBtn) {
      revealBtn.textContent = `🔍 Reveal More (-3 pts) [${3 - blurLevel} left]`;
    }
  };

  // Charades handlers
  window.handleCharadesCorrect = function() {
    const points = 20;
    score += points;
    showFeedback('Correct! +' + points + ' points', true);
    
    setTimeout(() => {
      currentQuestionIndex++;
      blurLevel = 3;
      updateGameUI();
      showQuestion();
    }, 1500);
  };

  window.handleCharadesSkip = function() {
    score -= 5;
    if (score < 0) score = 0;
    showFeedback('Skipped! -5 points', false);
    
    setTimeout(() => {
      currentQuestionIndex++;
      blurLevel = 3;
      updateGameUI();
      showQuestion();
    }, 1500);
  };

  // Generate answer options
  function generateOptions(correctMovie) {
    const optionsContainer = document.getElementById('movieOptions');
    if (!optionsContainer) return;
    
    optionsContainer.innerHTML = '';

    const wrongMovies = movies
      .filter(m => m.id !== correctMovie.id && m.industry === correctMovie.industry)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

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
    
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.disabled = true;
    });

    if (isCorrect) {
      let points = 10;
      
      if (gameMode === 'classic') {
        points = Math.floor((timeLeft / 30) * 10) + 10;
      } else if (gameMode === 'blur') {
        points = 20 - revealPenalty;
        if (points < 5) points = 5;
      }
      
      score += points;
      
      if (selectedBtn) {
        selectedBtn.classList.add('correct');
      }
      
      showFeedback('Correct! +' + points + ' points', true);
    } else {
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

    setTimeout(() => {
      currentQuestionIndex++;
      blurLevel = 3;
      revealPenalty = 0;
      updateGameUI();
      showQuestion();
    }, 2000);
  }

  // Show feedback
  function showFeedback(message, isCorrect) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback-message ' + (isCorrect ? 'correct-feedback' : 'wrong-feedback');
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => feedback.remove(), 2000);
  }

  // End game
  function endGame() {
    clearInterval(timerInterval);
    gameScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    const maxPoints = questionCount * 20;
    const percentage = Math.round((score / maxPoints) * 100);
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('maxScore').textContent = maxPoints;

    const isHighScore = GameScore.set(difficulty, gameMode, score);
    
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

    const modeNames = {
      classic: 'Classic Quiz',
      charades: 'Dumb Charades',
      blur: 'Blur Image'
    };

    document.getElementById('resultTitle').textContent = resultTitle;
    document.getElementById('resultMessage').innerHTML = `
      <p>${resultMessage}</p>
      <p>Mode: ${modeNames[gameMode]}</p>
      <p>Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
      <p>You got ${Math.round((score/maxPoints) * 100)}% correct!</p>
      ${isHighScore ? '<p class="high-score-badge">🏆 New High Score for ' + difficulty.toUpperCase() + ' - ' + modeNames[gameMode] + '!</p>' : ''}
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
  updateModeInfo('classic');
  
  document.querySelector('.mode-btn[data-mode="classic"]').classList.add('active');
});