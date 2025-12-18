// ========================================
// Portfolio Website JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  initMobileNav();
  
  // Smooth Scrolling
  initSmoothScroll();
  
  // Scroll Animations
  initScrollAnimations();
  
  // GitHub Activity (using GitHub API)
  initGitHubActivity();
  
  // Navbar Background on Scroll
  initNavbarScroll();
  
  // Skills Animation
  initSkillsAnimation();
});

// ========================================
// Mobile Navigation
// ========================================

function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }
}

// ========================================
// Smooth Scrolling
// ========================================

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// Scroll Animations
// ========================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Observe cards
  const cards = document.querySelectorAll('.project-card, .devops-card, .education-card, .skill-category');
  cards.forEach(card => {
    observer.observe(card);
  });
}

// ========================================
// Navbar Background on Scroll
// ========================================

function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
  });
}

// ========================================
// Skills Animation
// ========================================

function initSkillsAnimation() {
  const skillsSection = document.querySelector('#skills');
  if (!skillsSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillTags = entry.target.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
          setTimeout(() => {
            tag.style.animation = 'fadeInUp 0.5s ease forwards';
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
              tag.style.opacity = '1';
              tag.style.transform = 'translateY(0)';
            }, 50);
          }, index * 50);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(skillsSection);
}

// ========================================
// GitHub Activity Integration
// ========================================

function initGitHubActivity() {
  const graphContainer = document.getElementById('github-contribution-graph');
  if (!graphContainer) return;
  
  const username = 'Faizi512';
  
  // Fetch GitHub contribution data
  // Note: GitHub's public API doesn't provide contribution graph data directly
  // We'll use a workaround with GitHub profile stats or contribution embed
  
  // Option 1: Embed GitHub contribution graph SVG (recommended)
  const contributionGraph = document.createElement('img');
  contributionGraph.src = `https://ghchart.rshah.org/${username}`;
  contributionGraph.alt = 'GitHub Contributions';
  contributionGraph.style.width = '100%';
  contributionGraph.style.maxWidth = '800px';
  contributionGraph.style.height = 'auto';
  contributionGraph.onload = () => {
    graphContainer.innerHTML = '';
    graphContainer.appendChild(contributionGraph);
  };
  contributionGraph.onerror = () => {
    // Fallback: Show GitHub profile link
    showGitHubFallback(graphContainer);
  };
  
  // Also fetch repository stats
  fetchGitHubStats(username);
}

// ========================================
// GitHub Stats
// ========================================

async function fetchGitHubStats(username) {
  try {
    // Fetch user info
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    if (!userResponse.ok) throw new Error('Failed to fetch GitHub user');
    
    const userData = await userResponse.json();
    
    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
    
    const reposData = await reposResponse.json();
    
    // Display stats if needed
    updateGitHubStatsDisplay(userData, reposData);
    
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    // Silently fail - the contribution graph will still work
  }
}

// ========================================
// Update GitHub Stats Display
// ========================================

function updateGitHubStatsDisplay(userData, reposData) {
  // You can add stats display here if needed
  // For now, we'll just log it
  console.log('GitHub User:', userData.login);
  console.log('Public Repos:', userData.public_repos);
  console.log('Followers:', userData.followers);
}

// ========================================
// GitHub Fallback
// ========================================

function showGitHubFallback(container) {
  container.innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <p style="margin-bottom: 1rem; color: #6b7280;">
        Unable to load contribution graph. Please visit my GitHub profile to see my activity.
      </p>
      <a href="https://github.com/Faizi512" target="_blank" class="btn btn-github" style="display: inline-flex; align-items: center; gap: 0.5rem;">
        <i class="fab fa-github"></i> View GitHub Profile
      </a>
    </div>
  `;
}

// ========================================
// Utility Functions
// ========================================

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ========================================
// Add CSS for fadeInUp animation
// ========================================

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);