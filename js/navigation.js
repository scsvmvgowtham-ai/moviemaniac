// ================= UNIVERSAL NAVIGATION WITH BACK BUTTON - navigation.js =================
// Back button goes to PREVIOUS PAGE (browser back), appears on ALL pages except home

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split('/').pop();
  
  // ONLY exclude home.html
  const excludedPages = ['home.html', ''];
  
  // Don't show on home page
  if (excludedPages.includes(currentPage)) {
    return;
  }

  // Create floating back button (will appear on ALL other pages)
  const backButton = document.createElement('button');
  backButton.className = 'floating-back-btn';
  backButton.innerHTML = '←';
  backButton.title = 'Go Back';
  backButton.setAttribute('aria-label', 'Go Back');
  
  // ✅ KEY FIX: Use browser's back() function to go to previous page
  backButton.onclick = () => {
    window.history.back();
  };
  
  document.body.appendChild(backButton);
});