// ================= DIRECTOR DETAILS PAGE - director-details.js =================

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const directorId = params.get("id");
  
  // Get all DOM elements
  const directorName = document.getElementById("directorName");
  const directorImage = document.getElementById("directorImage");
  const directorIndustry = document.getElementById("directorIndustry");
  const directorFullName = document.getElementById("directorFullName");
  const directorBorn = document.getElementById("directorBorn");
  const directorBirthPlace = document.getElementById("directorBirthPlace");
  const directorSpouse = document.getElementById("directorSpouse");
  const directorParents = document.getElementById("directorParents");
  const directorSiblings = document.getElementById("directorSiblings");
  const directorAchievements = document.getElementById("directorAchievements");
  const directorBio = document.getElementById("directorBio");
  const directorMoviesDiv = document.getElementById("directorMovies");

  if (!directorId) {
    if (directorName) directorName.textContent = "No director selected";
    return;
  }

  const director = window.getDirector(directorId);

  if (!director) {
    if (directorName) directorName.textContent = "Director not found";
    return;
  }

  // ================= DISPLAY DIRECTOR INFO =================
  if (directorName) directorName.textContent = director.name;
  if (directorImage) {
    directorImage.src = director.photo;
    directorImage.alt = director.name;
  }
  if (directorIndustry) directorIndustry.textContent = director.industry;
  
  // Display full name (just the value, no label)
  if (directorFullName) {
    directorFullName.textContent = director.fullName || "Not available";
  }
  
  // Display personal information (just values, labels are in HTML)
  if (directorBorn) {
    directorBorn.textContent = director.born || "Not available";
  }
  
  if (directorBirthPlace) {
    directorBirthPlace.textContent = director.birthPlace || "Not available";
  }
  
  if (directorSpouse) {
    directorSpouse.textContent = director.spouse || "Not available";
  }
  
  if (directorParents) {
    if (director.parents && director.parents.length > 0) {
      directorParents.textContent = director.parents.join(", ");
    } else {
      directorParents.textContent = "Not available";
    }
  }
  
  if (directorSiblings) {
    if (director.siblings && director.siblings.length > 0) {
      directorSiblings.textContent = director.siblings.join(", ");
    } else {
      directorSiblings.textContent = "Not available";
    }
  }
  
  if (directorAchievements) {
    directorAchievements.textContent = director.achievements || "Not available";
  }
  
  if (directorBio) {
    directorBio.textContent = director.bio || "Biography not available.";
  }

  // ================= GET AND DISPLAY RELATED MOVIES =================
  const relatedMovies = window.getMoviesByDirector(directorId);

  if (!directorMoviesDiv) return;

  if (relatedMovies.length === 0) {
    directorMoviesDiv.innerHTML = "<p style='text-align:center;color:#e0e0e0;padding:2rem;'>No movies available yet.</p>";
  } else {
    directorMoviesDiv.innerHTML = ""; // Clear any existing content
    
    relatedMovies.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>${movie.year} • ${movie.genre}</p>
      `;
      
      card.onclick = () => {
        window.location.href = `movie-details.html?id=${movie.id}`;
      };
      
      directorMoviesDiv.appendChild(card);
    });
  }
});