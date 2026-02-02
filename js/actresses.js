// ================= ACTRESSES PAGE - actresses.js =================

document.addEventListener("DOMContentLoaded", () => {
  const industryHub = document.getElementById("industryHub");
  const container = document.getElementById("actressesContainer");
  const backBtn = document.getElementById("backToIndustries");

  const { actresses } = window.MovieManiacData;

  // ================= INDUSTRY HUB =================
  const industries = ["Tollywood", "Hollywood", "Bollywood", "Kollywood", "Mollywood", "Sandalwood"];

  industries.forEach(industry => {
    const hubCard = document.createElement("div");
    hubCard.className = "card hubCard";
    hubCard.textContent = industry;
    hubCard.onclick = () => openIndustry(industry);
    industryHub.appendChild(hubCard);
  });

  // ================= OPEN INDUSTRY =================
  function openIndustry(industry) {
    industryHub.style.display = "none";
    backBtn.style.display = "block";
    showActressesByIndustry(industry);
  }

  // ================= DISPLAY ACTRESSES =================
  function showActressesByIndustry(selectedIndustry) {
    container.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = `${selectedIndustry} Actresses`;
    title.style.color = "#d4af37";
    title.style.margin = "30px 0";
    title.style.textAlign = "center";
    title.style.fontFamily = "'Cinzel', serif";
    container.appendChild(title);

    // Add search box
    const searchBox = document.createElement("div");
    searchBox.style.textAlign = "center";
    searchBox.style.marginBottom = "30px";
    searchBox.innerHTML = `
      <input
        type="text"
        id="actressSearch"
        placeholder="Search actresses..."
        style="padding:12px 20px;width:300px;background:rgba(255,255,255,0.05);border:2px solid rgba(212,175,55,0.3);border-radius:50px;color:#e0e0e0;font-size:1rem;"
      >
    `;
    container.appendChild(searchBox);

    const grid = document.createElement("div");
    grid.className = "actor-grid";
    grid.id = "actressGrid";

    const filteredActresses = actresses.filter(a => a.industry === selectedIndustry);

    // Display all actresses initially
    displayActresses(filteredActresses, grid);

    container.appendChild(grid);

    // Add search functionality
    const searchInput = document.getElementById("actressSearch");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();
        const searchResults = filteredActresses.filter(a =>
          a.name.toLowerCase().includes(value)
        );
        displayActresses(searchResults, grid);
      });
    }
  }

  // ================= DISPLAY ACTRESSES FUNCTION =================
  function displayActresses(actressList, gridElement) {
    gridElement.innerHTML = "";
    
    actressList.forEach(actress => {
      const card = document.createElement("div");
      card.className = "actor-card";
      card.innerHTML = `
        <img src="${actress.photo}" alt="${actress.name}">
        <h4>${actress.name}</h4>
      `;
      card.onclick = () => {
        window.location.href = `actress-details.html?id=${actress.id}`;
      };
      gridElement.appendChild(card);
    });

    // Show message if no actresses found
    if (actressList.length === 0) {
      gridElement.innerHTML = "<p style='text-align:center;color:#e0e0e0;'>No actresses found.</p>";
    }
  }

  // ================= BACK BUTTON =================
  backBtn.onclick = () => {
    container.innerHTML = "";
    industryHub.style.display = "grid";
    backBtn.style.display = "none";
  };

  // ================= URL PARAMETER HANDLING =================
  const params = new URLSearchParams(window.location.search);
  const urlIndustry = params.get("industry");

  if (urlIndustry) {
    const formatted = urlIndustry.charAt(0).toUpperCase() + urlIndustry.slice(1).toLowerCase();
    openIndustry(formatted);
  }
});