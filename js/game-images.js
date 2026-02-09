// ================= GAME IMAGES DATA - game-images.js =================
// Separate image data for quiz and blur game modes
// These images should NOT show movie titles/names

window.MovieManiacGameImages = {
  // Structure for each game image entry
  // {
  //   movieId: 'movie_1', // Must match ID from data.js
  //   quizImage: 'images/game/quiz/movie_1.jpg', // Scene/poster without title
  //   blurImage: 'images/game/blur/movie_1.jpg'  // Scene for blur game
  // }

  images: [
    // ========== TOLLYWOOD MOVIES ==========
    {
      movieId: 2,
      quizImage: 'images/game/quiz/pushpa_rise.jpg',
      blurImage: 'images/game/blur/pushpa_rise.jpg'
    },
    {
      movieId: 1,
      quizImage: 'images/game/quiz/rrr.jpg',
      blurImage: 'images/game/blur/rrr.jpg'
    },
    {
      movieId: 132,
      quizImage: 'images/game/quiz/baahubali.jpg',
      blurImage: 'images/game/blur/baahubali.jpg'
    },
    {
      movieId: 3,
      quizImage: 'images/game/quiz/baahubali2.jpg',
      blurImage: 'images/game/blur/baahubali2.jpg'
    },
    {
      movieId: 15,
      quizImage: 'images/game/quiz/eega.jpg',
      blurImage: 'images/game/blur/eega.jpg'
    },

    // ========== HOLLYWOOD MOVIES ==========
    {
      movieId: 'inception',
      quizImage: 'images/game/quiz/inception.jpg',
      blurImage: 'images/game/blur/inception.jpg'
    },
    {
      movieId: 'dark_knight',
      quizImage: 'images/game/quiz/dark_knight.jpg',
      blurImage: 'images/game/blur/dark_knight.jpg'
    },
    {
      movieId: 'interstellar',
      quizImage: 'images/game/quiz/interstellar.jpg',
      blurImage: 'images/game/blur/interstellar.jpg'
    },
    {
      movieId: 'avengers_endgame',
      quizImage: 'images/game/quiz/avengers_endgame.jpg',
      blurImage: 'images/game/blur/avengers_endgame.jpg'
    },
    {
      movieId: 'titanic',
      quizImage: 'images/game/quiz/titanic.jpg',
      blurImage: 'images/game/blur/titanic.jpg'
    },

    // ========== BOLLYWOOD MOVIES ==========
    {
      movieId: '3_idiots',
      quizImage: 'images/game/quiz/3_idiots.jpg',
      blurImage: 'images/game/blur/3_idiots.jpg'
    },
    {
      movieId: 'dangal',
      quizImage: 'images/game/quiz/dangal.jpg',
      blurImage: 'images/game/blur/dangal.jpg'
    },
    {
      movieId: 'pk',
      quizImage: 'images/game/quiz/pk.jpg',
      blurImage: 'images/game/blur/pk.jpg'
    },
    {
      movieId: 'pathaan',
      quizImage: 'images/game/quiz/pathaan.jpg',
      blurImage: 'images/game/blur/pathaan.jpg'
    },
    {
      movieId: 'chhaava',
      quizImage: 'images/game/quiz/chhaava.jpg',
      blurImage: 'images/game/blur/chhaava.jpg'
    },

    // ========== KOLLYWOOD MOVIES ==========
    {
      movieId: 'vikram',
      quizImage: 'images/game/quiz/vikram.jpg',
      blurImage: 'images/game/blur/vikram.jpg'
    },
    {
      movieId: 'enthiran',
      quizImage: 'images/game/quiz/enthiran.jpg',
      blurImage: 'images/game/blur/enthiran.jpg'
    },
    {
      movieId: '2point0',
      quizImage: 'images/game/quiz/2point0.jpg',
      blurImage: 'images/game/blur/2point0.jpg'
    },
    {
      movieId: 'beast',
      quizImage: 'images/game/quiz/beast.jpg',
      blurImage: 'images/game/blur/beast.jpg'
    },
    {
      movieId: 'indian2',
      quizImage: 'images/game/quiz/indian2.jpg',
      blurImage: 'images/game/blur/indian2.jpg'
    },

    // ========== MOLLYWOOD MOVIES ==========
    {
      movieId: 'drishyam',
      quizImage: 'images/game/quiz/drishyam.jpg',
      blurImage: 'images/game/blur/drishyam.jpg'
    },
    {
      movieId: 'lucifer',
      quizImage: 'images/game/quiz/lucifer.jpg',
      blurImage: 'images/game/blur/lucifer.jpg'
    },
    {
      movieId: '2018',
      quizImage: 'images/game/quiz/2018.jpg',
      blurImage: 'images/game/blur/2018.jpg'
    },
    {
      movieId: 'big_brother',
      quizImage: 'images/game/quiz/big_brother.jpg',
      blurImage: 'images/game/blur/big_brother.jpg'
    },
    {
      movieId: 'pulimurugan',
      quizImage: 'images/game/quiz/pulimurugan.jpg',
      blurImage: 'images/game/blur/pulimurugan.jpg'
    },

    // ========== SANDALWOOD MOVIES ==========
    {
      movieId: 'kgf',
      quizImage: 'images/game/quiz/kgf.jpg',
      blurImage: 'images/game/blur/kgf.jpg'
    },
    {
      movieId: 'kgf2',
      quizImage: 'images/game/quiz/kgf2.jpg',
      blurImage: 'images/game/blur/kgf2.jpg'
    },
    {
      movieId: 'kantara',
      quizImage: 'images/game/quiz/kantara.jpg',
      blurImage: 'images/game/blur/kantara.jpg'
    },
    {
      movieId: 'vikrant_rona',
      quizImage: 'images/game/quiz/vikrant_rona.jpg',
      blurImage: 'images/game/blur/vikrant_rona.jpg'
    },
    {
      movieId: 'ugramm',
      quizImage: 'images/game/quiz/ugramm.jpg',
      blurImage: 'images/game/blur/ugramm.jpg'
    }

    // ADD MORE MOVIES HERE
    // Copy this template and fill with your movie IDs:
    // {
    //   movieId: 'your_movie_id',
    //   quizImage: 'images/game/quiz/your_movie_id.jpg',
    //   blurImage: 'images/game/blur/your_movie_id.jpg'
    // },
  ],

  // Helper function to get game image by movie ID
  getGameImage: function(movieId) {
    return this.images.find(img => img.movieId === movieId);
  },

  // Get quiz image for a movie
  getQuizImage: function(movieId) {
    const gameImage = this.getGameImage(movieId);
    return gameImage ? gameImage.quizImage : null;
  },

  // Get blur image for a movie
  getBlurImage: function(movieId) {
    const gameImage = this.getGameImage(movieId);
    return gameImage ? gameImage.blurImage : null;
  },

  // Check if movie has game images
  hasGameImages: function(movieId) {
    return this.getGameImage(movieId) !== undefined;
  },

  // Get all movies that have game images (for generating questions)
  getMoviesWithGameImages: function() {
    const { movies } = window.MovieManiacData;
    return movies.filter(movie => this.hasGameImages(movie.id));
  }
};