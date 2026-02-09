// ================= AUTHENTICATION SYSTEM - auth.js =================

// User Authentication Management
window.MovieManiacAuth = {
  // Get current user from localStorage
  getCurrentUser: function() {
    const user = localStorage.getItem('moviemaniac_user');
    return user ? JSON.parse(user) : null;
  },

  // Set current user
  setCurrentUser: function(user) {
    localStorage.setItem('moviemaniac_user', JSON.stringify(user));
  },

  // Check if user is logged in
  isLoggedIn: function() {
    return this.getCurrentUser() !== null;
  },

  // Sign up new user
  signUp: function(username, email, password, favoriteCharacter) {
    // Get all users
    const users = this.getAllUsers();
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    // Check if username already exists
    if (users.find(u => u.username === username)) {
      return { success: false, message: 'Username already taken' };
    }

    // Create new user
    const newUser = {
      id: 'user_' + Date.now(),
      username: username,
      email: email,
      password: password, // In real app, this should be hashed
      favoriteCharacter: favoriteCharacter,
      createdAt: new Date().toISOString(),
      watchlist: []
    };

    // Add to users array
    users.push(newUser);
    localStorage.setItem('moviemaniac_users', JSON.stringify(users));

    // Auto login after signup
    this.setCurrentUser(newUser);

    return { success: true, message: 'Account created successfully!' };
  },

  // Login user
  login: function(emailOrUsername, password) {
    const users = this.getAllUsers();
    
    // Find user by email or username
    const user = users.find(u => 
      (u.email === emailOrUsername || u.username === emailOrUsername) && 
      u.password === password
    );

    if (user) {
      this.setCurrentUser(user);
      return { success: true, message: 'Login successful!' };
    }

    return { success: false, message: 'Invalid credentials' };
  },

  // Logout user
  logout: function() {
    localStorage.removeItem('moviemaniac_user');
  },

  // Get all users
  getAllUsers: function() {
    const users = localStorage.getItem('moviemaniac_users');
    return users ? JSON.parse(users) : [];
  },

  // Update user profile
  updateProfile: function(updates) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { success: false, message: 'Not logged in' };

    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex !== -1) {
      // Update user
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem('moviemaniac_users', JSON.stringify(users));
      
      // Update current user
      this.setCurrentUser(users[userIndex]);
      
      return { success: true, message: 'Profile updated!' };
    }

    return { success: false, message: 'User not found' };
  }
};

// Update navbar based on auth status
function updateNavbar() {
  const authNav = document.getElementById('authNav');
  
  // Only update if authNav element exists on the page
  // This prevents issues on pages like index.html, watchlist.html, game.html that don't have #authNav
  if (!authNav) return;

  const user = window.MovieManiacAuth.getCurrentUser();

  if (user) {
    // User is logged in - show profile
    authNav.innerHTML = `
      <a href="profile.html" class="profile-link">
        ${user.favoriteCharacter} 
        <span style="font-size: 0.8rem; opacity: 0.7;">(${user.username})</span>
      </a>
    `;
  } else {
    // User is not logged in - show sign in
    authNav.innerHTML = `<a href="signin.html">Sign In</a>`;
  }
}

// Initialize navbar on page load
document.addEventListener('DOMContentLoaded', updateNavbar);