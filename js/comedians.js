// ================= ENHANCED COMEDIANS PAGE WITH TIMELINE - comedians.js =================

document.addEventListener("DOMContentLoaded", () => {
  const industryHub = document.getElementById("industryHub");
  const container = document.getElementById("comediansContainer");
  const backBtn = document.getElementById("backToIndustries");

  const { comedians } = window.MovieManiacData;

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
    
    const yearMatch = bornString.match(/\d{4}/);
    if (!yearMatch) return "Unknown Era";
    
    const year = parseInt(yearMatch[0]);
    const decade = Math.floor(year / 10) * 10;
    
    return `${decade}s`;
  }

  // ================= CATEGORIZE COMEDIANS BY DECADE =================
  function categorizeComediansByDecade(comediansList) {
    const decades = {};
    
    comediansList.forEach(comedian => {
      const decade = getDecadeFromBorn(comedian.born);
      
      if (!decades[decade]) {
        decades[decade] = [];
      }
      decades[decade].push(comedian);
    });
    
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
    showComediansByIndustry(industry);
  }

  // ================= DISPLAY COMEDIANS BY INDUSTRY WITH TIMELINES =================
  function showComediansByIndustry(selectedIndustry) {
    container.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = `${selectedIndustry} Comedians`;
    title.style.cssText = "color: var(--primary-gold); margin: 30px 0; text-align: center; font-family: var(--font-heading); font-size: 2.5rem; text-shadow: var(--shadow-glow);";
    container.appendChild(title);

    // Add search box
    const searchBox = document.createElement("div");
    searchBox.style.cssText = "text-align: center; margin-bottom: 30px;";
    searchBox.innerHTML = `
      <input
        type="text"
        id="comedianSearch"
        placeholder="Search comedians..."
        style="padding: 12px 20px; width: 300px; max-width: 90%; background: rgba(255,255,255,0.04); border: 1px solid var(--border-primary); border-radius: var(--radius-full); color: var(--text-primary); font-size: 1rem; font-family: var(--font-body);"
      >
    `;
    container.appendChild(searchBox);

    const filteredComedians = comedians.filter(c => c.industry.includes(selectedIndustry));
    
    const { decades, sortedDecades } = categorizeComediansByDecade(filteredComedians);

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
      
      displayComedians(decades[decade], grid);
      
      timelineSection.appendChild(grid);
      container.appendChild(timelineSection);
    });

    // Add search functionality
    const searchInput = document.getElementById("comedianSearch");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();
        
        if (value === "") {
          document.querySelectorAll('.timeline-section').forEach(section => {
            section.style.display = 'block';
          });
        } else {
          const searchResults = filteredComedians.filter(c =>
            c.name.toLowerCase().includes(value)
          );
          
          document.querySelectorAll('.timeline-section').forEach(section => {
            section.style.display = 'none';
          });
          
          const { decades: searchDecades, sortedDecades: searchSortedDecades } = categorizeComediansByDecade(searchResults);
          
          searchSortedDecades.forEach(decade => {
            const grid = container.querySelector(`[data-decade="${decade}"]`);
            if (grid) {
              const section = grid.closest('.timeline-section');
              section.style.display = 'block';
              displayComedians(searchDecades[decade], grid);
            }
          });
        }
      });
    }
  }

  // ================= DISPLAY COMEDIANS FUNCTION =================
  function displayComedians(comedianList, gridElement) {
    gridElement.innerHTML = "";
    
    comedianList.forEach(comedian => {
      const card = document.createElement("div");
      card.className = "actor-card";
      card.innerHTML = `
        <img src="${comedian.photo}" alt="${comedian.name}">
        <h4>${comedian.name}</h4>
        ${comedian.born ? `<p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">Born: ${comedian.born}</p>` : ''}
      `;
      card.onclick = () => {
        window.location.href = `comedian-details.html?id=${comedian.id}`;
      };
      gridElement.appendChild(card);
    });

    if (comedianList.length === 0) {
      gridElement.innerHTML = "<p style='text-align:center;color:var(--text-secondary);padding:2rem;'>No comedians found.</p>";
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
});