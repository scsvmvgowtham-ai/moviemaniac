// ================= ENHANCED ACTORS PAGE WITH TIMELINE - actors.js =================

document.addEventListener("DOMContentLoaded", () => {
  const industryHub = document.getElementById("industryHub");
  const container = document.getElementById("actorsContainer");
  const backBtn = document.getElementById("backToIndustries");

  const { actors } = window.MovieManiacData;

  // ================= INDUSTRY HUB =================
  const industries = ["Tollywood", "Hollywood", "Bollywood", "Kollywood", "Mollywood", "Sandalwood"];

  industries.forEach(industry => {
    const hubCard = document.createElement("div");
    hubCard.className = "card hubCard";
    hubCard.textContent = industry;
    hubCard.onclick = () => openIndustry(industry);
    industryHub.appendChild(hubCard);
  });

  // ================= HELPER: GET DECADE FROM BIRTH YEAR =================
  function getDecadeFromBorn(bornString) {
    if (!bornString) return "Unknown Era";
    
    // Extract year from various date formats
    const yearMatch = bornString.match(/\d{4}/);
    if (!yearMatch) return "Unknown Era";
    
    const year = parseInt(yearMatch[0]);
    const decade = Math.floor(year / 10) * 10;
    
    return `${decade}s`;
  }

  // ================= CATEGORIZE ACTORS BY DECADE =================
  function categorizeActorsByDecade(actorsList) {
    const decades = {};
    
    actorsList.forEach(actor => {
      const decade = getDecadeFromBorn(actor.born);
      
      if (!decades[decade]) {
        decades[decade] = [];
      }
      decades[decade].push(actor);
    });
    
    // Sort decades in chronological order
    const sortedDecades = Object.keys(decades).sort((a, b) => {
      if (a === "Unknown Era") return 1;
      if (b === "Unknown Era") return -1;
      return parseInt(a) - parseInt(b);
    });
    
    return { decades, sortedDecades };
  }

  // ================= OPEN INDUSTRY =================
  function openIndustry(industry) {
    industryHub.style.display = "none";
    if (backBtn) backBtn.style.display = "block";
    showActorsByIndustry(industry);
  }

  // ================= DISPLAY ACTORS BY INDUSTRY WITH TIMELINES =================
  function showActorsByIndustry(selectedIndustry) {
    container.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = `${selectedIndustry} Actors`;
    title.style.cssText = "color: var(--primary-gold); margin: 30px 0; text-align: center; font-family: var(--font-heading); font-size: 2.5rem; text-shadow: var(--shadow-glow);";
    container.appendChild(title);

    // Add search box
    const searchBox = document.createElement("div");
    searchBox.style.cssText = "text-align: center; margin-bottom: 30px;";
    searchBox.innerHTML = `
      <input
        type="text"
        id="actorSearch"
        placeholder="Search actors..."
        style="padding: 12px 20px; width: 300px; max-width: 90%; background: rgba(255,255,255,0.04); border: 1px solid var(--border-primary); border-radius: var(--radius-full); color: var(--text-primary); font-size: 1rem; font-family: var(--font-body);"
      >
    `;
    container.appendChild(searchBox);

    const filteredActors = actors.filter(a => a.industry.includes(selectedIndustry));
    
    // Categorize by decade
    const { decades, sortedDecades } = categorizeActorsByDecade(filteredActors);

    // Display actors by decade
    sortedDecades.forEach(decade => {
      const timelineSection = document.createElement("div");
      timelineSection.className = "timeline-section";
      
      const decadeTitle = document.createElement("h3");
      decadeTitle.textContent = `Born in the ${decade}`;
      decadeTitle.style.cssText = "color: var(--primary-gold); font-size: 2rem; margin-bottom: 2rem; text-shadow: var(--shadow-glow);";
      timelineSection.appendChild(decadeTitle);
      
      const grid = document.createElement("div");
      grid.className = "timeline-grid actor-grid";
      grid.dataset.decade = decade;
      
      displayActors(decades[decade], grid);
      
      timelineSection.appendChild(grid);
      container.appendChild(timelineSection);
    });

    // Add search functionality
    const searchInput = document.getElementById("actorSearch");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();
        
        if (value === "") {
          // Show all timeline sections
          document.querySelectorAll('.timeline-section').forEach(section => {
            section.style.display = 'block';
          });
        } else {
          // Filter across all decades
          const searchResults = filteredActors.filter(a =>
            a.name.toLowerCase().includes(value)
          );
          
          // Hide all sections first
          document.querySelectorAll('.timeline-section').forEach(section => {
            section.style.display = 'none';
          });
          
          // Group search results by decade
          const { decades: searchDecades, sortedDecades: searchSortedDecades } = categorizeActorsByDecade(searchResults);
          
          // Show only sections with matching actors
          searchSortedDecades.forEach(decade => {
            const grid = container.querySelector(`[data-decade="${decade}"]`);
            if (grid) {
              const section = grid.closest('.timeline-section');
              section.style.display = 'block';
              displayActors(searchDecades[decade], grid);
            }
          });
        }
      });
    }
  }

  // ================= DISPLAY ACTORS FUNCTION =================
  function displayActors(actorList, gridElement) {
    gridElement.innerHTML = "";
    
    actorList.forEach(actor => {
      const card = document.createElement("div");
      card.className = "actor-card";
      card.innerHTML = `
        <img src="${actor.photo}" alt="${actor.name}">
        <h4>${actor.name}</h4>
        ${actor.born ? `<p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">Born: ${actor.born}</p>` : ''}
      `;
      card.onclick = () => {
        window.location.href = `actor-details.html?id=${actor.id}`;
      };
      gridElement.appendChild(card);
    });

    // Show message if no actors found
    if (actorList.length === 0) {
      gridElement.innerHTML = "<p style='text-align:center;color:var(--text-secondary);padding:2rem;'>No actors found.</p>";
    }
  }

  // ================= BACK BUTTON =================
  if (backBtn) {
    backBtn.onclick = () => {
      container.innerHTML = "";
      industryHub.style.display = "grid";
      backBtn.style.display = "none";
    };
  }

  // ================= URL PARAMETER HANDLING =================
  const params = new URLSearchParams(window.location.search);
  const urlIndustry = params.get("industry");

  if (urlIndustry) {
    const formatted = urlIndustry.charAt(0).toUpperCase() + urlIndustry.slice(1).toLowerCase();
    openIndustry(formatted);
  }

  // Initialize high scores display
  displayHighScores();
});

function displayHighScores() {
  // This function was in original code but not implemented
  // Can be used for actor-related achievements if needed
}