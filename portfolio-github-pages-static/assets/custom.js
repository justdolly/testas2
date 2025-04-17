// Custom JavaScript that will run alongside the original JavaScript
// This file is intentionally left mostly empty for you to add your customizations
// without modifying the original compiled JS file

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
  // Update Discord Status (if available)
  updateDiscordStatus();
  
  // Set up click handlers for navigation
  setupNavigation();
  
  // Handle theme initialization
  initializeTheme();
});

// Initialize theme based on stored preference
function initializeTheme() {
  const theme = localStorage.getItem('theme') || 'dark';
  if (theme === 'light') {
    document.documentElement.classList.add('light');
    updateThemeIcon('light');
  } else {
    updateThemeIcon('dark');
  }
}

// Update all theme icons
function updateThemeIcon(theme) {
  const themeButtons = document.querySelectorAll('.theme-toggle i');
  themeButtons.forEach(btn => {
    btn.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  });
}

// Handle theme toggle
window.toggleTheme = function() {
  const isDark = !document.documentElement.classList.contains('light');
  
  if (isDark) {
    document.documentElement.classList.add('light');
    localStorage.setItem('theme', 'light');
    updateThemeIcon('light');
  } else {
    document.documentElement.classList.remove('light');
    localStorage.setItem('theme', 'dark');
    updateThemeIcon('dark');
  }
};

// Update Discord status from the data file
function updateDiscordStatus() {
  if (typeof discordStatus === 'undefined') return;
  
  const statusElement = document.getElementById('discord-status');
  if (!statusElement) return;
  
  const statusIndicator = statusElement.querySelector('.status-indicator');
  const statusText = statusElement.querySelector('.discord-status-text span');
  const activityText = statusElement.querySelector('.discord-activity');
  
  // Update status indicator color
  if (statusIndicator) {
    statusIndicator.className = 'status-indicator';
    statusIndicator.classList.add(`status-${discordStatus.discord_status || 'offline'}`);
  }
  
  // Update status text
  if (statusText) {
    statusText.textContent = discordStatus.discord_status || 'Offline';
  }
  
  // Update activity if available
  if (activityText && discordStatus.activities && discordStatus.activities.length > 0) {
    const activity = discordStatus.activities[0];
    activityText.textContent = activity.details ? 
      `${activity.name} – ${activity.details}` : 
      activity.name;
  } else if (activityText) {
    activityText.textContent = '';
  }
}

// Set up navigation click handlers
function setupNavigation() {
  document.addEventListener('click', function(e) {
    // Find closest anchor tag if the click was on a child element
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    // Skip non-internal links, links with target, or links with modifiers
    if (
      !href || 
      href.startsWith('http') || 
      href.startsWith('#') || 
      link.getAttribute('target') || 
      e.ctrlKey || 
      e.metaKey || 
      e.shiftKey || 
      e.altKey || 
      e.button !== 0
    ) {
      return;
    }
    
    // Prevent default navigation
    e.preventDefault();
    
    // Handle navigation
    window.location.href = href;
  });
}