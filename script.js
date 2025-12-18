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
  
  // Project Modal
  initProjectModal();
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
// Project Modal
// ========================================

// Project data structure - will be populated with user details
const projectData = {
  'ahkn': {
    title: 'AHKN Management System',
    description: 'Developed an LMS-style platform for NGO operations, including user roles, content workflows, and reporting dashboards. Web application to handle admin work and automate operations processes.',
    contributions: [
      'Built the entire application from scratch as a comprehensive NGO management system',
      'Created a robust user management system to handle organization members and roles',
      'Implemented real-time event conduction system for managing organizational events',
      'Developed slip generation and issuance functionality for event participants',
      'Built interactive dashboard to display real-time results and event statistics',
      'Implemented comprehensive reporting system for data analysis and insights',
      'Deployed the application on Heroku with proper CI/CD setup'
    ],
    tech: ['Ruby on Rails', 'PostgreSQL', 'Heroku', 'TailwindCSS'],
    links: [
      { text: 'GitHub Repository', url: 'https://github.com/Faizi512/ahkn_management_system', icon: 'fab fa-github' }
    ]
  },
  'picnui': {
    title: 'Programming Industrial Cobots (PICNUI)',
    description: 'Mapped human arm motion via Kinect to train industrial cobots for automated manufacturing processes.',
    contributions: [
      'Collaborated in a team environment for this academic final year project',
      'Implemented socket-based communication system to handle real-time data exchange between three integrated systems (Kinect sensor, URSim, and Webots)',
      'Developed multi-threaded video processing pipeline to analyze video chunks for skeleton detection and tracking',
      'Built file handling mechanisms for efficient data processing and storage of motion tracking data',
      'Contributed to the overall system architecture enabling seamless communication between hardware sensors and simulation environments'
    ],
    tech: ['Python', 'OpenCV', 'URSim', 'Webots', 'Socket Programming', 'Multi-threading'],
    links: [
      { text: 'GitHub Repository', url: 'https://github.com/Faizi512/URSim', icon: 'fab fa-github' }
    ]
  },
  'pdf-voice': {
    title: 'PDF to Voice Converter',
    description: 'Converted PDFs into audiobooks using AI APIs with background job processing for seamless conversion. Created an accessible app converting PDFs to audio e-books using AI API integration.',
    contributions: [
      'Developed the entire application from scratch as an MVP (Minimum Viable Product)',
      'Implemented OCR (Optical Character Recognition) technology to extract text from PDF documents',
      'Integrated text-to-speech (TTS) technology to convert extracted text into audio format',
      'Built seamless integration with third-party AI APIs for enhanced text processing and voice synthesis',
      'Created a user-friendly interface for uploading PDFs and generating audio books',
      'Implemented background job processing to handle large PDF files efficiently'
    ],
    tech: ['Ruby', 'Rails', 'Background Jobs', 'OCR', 'PostgreSQL', 'AI APIs', 'Text-to-Speech'],
    links: [
      { text: 'GitHub Repository', url: 'https://github.com/Faizi512/pdf_to_voice', icon: 'fab fa-github' }
    ]
  },
  'hec-olap': {
    title: 'HEC Data Analysis OLAP Cube',
    description: 'Assisted in building ETL pipelines and OLAP cubes for reporting and analytics. Created data warehouse and OLAP Cube on SQL Server Analytical Services (SSAS) to make reports for analysis.',
    contributions: [
      'Developed comprehensive Data ETL (Extract, Transform, Load) processes to prepare raw data for analysis',
      'Designed and implemented a data warehouse architecture to store cleaned and transformed data',
      'Performed data cleaning and transformation operations to ensure data quality and consistency',
      'Loaded processed data into the data warehouse for efficient querying and analysis',
      'Created OLAP (Online Analytical Processing) cubes on SQL Server Analytical Services (SSAS)',
      'Built analytical queries to support data analysis requirements for HEC professors',
      'Enabled efficient multi-dimensional data analysis for educational research and reporting'
    ],
    tech: ['Python', 'SQL Server', 'SSAS', 'OLAP Cube', 'Data Warehouse', 'ETL', 'Data Cleaning'],
    links: [
      { text: 'GitHub Repository', url: 'https://github.com/Faizi512/Data-Warehouse-ETL-with-Python', icon: 'fab fa-github' }
    ]
  },
  'automation-bot': {
    title: 'Automation Scripting Bot',
    description: 'Built a Python automation bot to automate business processes for a private small-scale business, improving sales and optimal resource usage. Integrated with Google Sheets, Selenium, and various APIs.',
    contributions: [
      'Developed an automated appointment booking bot for a private organization',
      'Implemented automated system to book visa appointments for Spain embassy/consulate',
      'Built web scraping and automation using Selenium to interact with appointment booking portals',
      'Integrated with Google Sheets API for managing appointment data and tracking bookings',
      'Implemented multi-threading to handle concurrent appointment booking processes',
      'Set up scheduled automation using Cron jobs for continuous monitoring and booking',
      'Implemented background job handling to process appointments asynchronously and manage long-running tasks',
      'Developed file handling mechanisms for storing appointment confirmations, logs, and data files',
      'Created reliable automation workflow to improve efficiency and reduce manual intervention for visa appointment bookings'
    ],
    tech: ['Python', 'Selenium', 'Cron Jobs', 'Multi-threading', 'Google Sheets API', 'API Integration', 'Web Automation', 'Background Jobs', 'File Handling'],
    links: [
      { text: 'GitHub Repository', url: 'https://github.com/Faizi512/appointments-bot', icon: 'fab fa-github' }
    ]
  },
  'lessaccounting': {
    title: 'LessAccounting',
    description: 'A comprehensive accounting management system designed to streamline financial operations and business accounting processes. Provides secure user authentication and efficient account management for businesses of all sizes.',
    contributions: [
      'Maintained and upgraded legacy application infrastructure for improved performance and security',
      'Successfully upgraded Ruby on Rails framework from version 4 to version 7, ensuring compatibility and modern features',
      'Migrated Ruby version from 2 to 3, handling breaking changes and deprecations',
      'Fixed and updated workflows and business logic to work seamlessly with the upgraded framework versions',
      'Integrated Stripe payment gateway gem for secure payment processing',
      'Integrated Plaid gem for banking and financial data connectivity',
      'Implemented admin user impersonation feature for support and debugging purposes',
      'Resolved DNS configuration issues to ensure proper domain routing and accessibility',
      'Fixed SSL certificate problems on the server to maintain secure HTTPS connections',
      'Implemented background job handling for asynchronous processing of financial transactions, report generation, and email notifications',
      'Developed file handling system for managing invoices, receipts, financial documents, and exported reports',
      'Optimized database queries throughout the application to improve performance and reduce load times',
      'Developed transaction reports for financial tracking and analysis',
      'Created weekly and monthly reporting features for comprehensive business insights'
    ],
    tech: ['Ruby on Rails', 'React', 'PostgreSQL', 'AWS', 'REST APIs', 'Stripe', 'Plaid', 'Ruby 3', 'Rails 7', 'Background Jobs', 'File Handling'],
    links: [
      { text: 'Live Site', url: 'https://welcome.lessaccounting.com/login', icon: 'fas fa-external-link-alt' }
    ]
  },
  'compliance-easy': {
    title: 'Compliance Easy',
    description: 'An electronic compliance management system for transport companies, featuring a user-friendly driver app and web portal. Manages fatigue, vehicle maintenance, driver documents, incident reporting, GPS tracking, route monitoring, job allocation, and ensures due diligence compliance for transport fleets of all sizes.',
    contributions: [
      'Onboarded to a partially developed application and contributed to its completion and enhancement',
      'Added new workflows to improve business process automation and compliance tracking',
      'Fixed UI/UX issues to enhance user experience and interface consistency',
      'Implemented comprehensive form validations to ensure data integrity and user input quality',
      'Developed new reporting features for compliance monitoring and data analysis',
      'Implemented quick link email notifications for compliance document expiry alerts',
      'Added two-factor authentication (2FA) using Devise gem for enhanced security',
      'Fixed routing issues to ensure proper navigation and application flow',
      'Implemented background job handling for processing compliance reports, sending notifications, and managing document expiry workflows',
      'Developed file handling system for managing driver documents, compliance certificates, vehicle documents, and uploaded files',
      'Optimized database queries throughout the application for improved performance'
    ],
    tech: ['Ruby on Rails', 'React', 'Mobile App', 'PostgreSQL', 'GPS Tracking', 'AWS', 'REST APIs', 'Devise', '2FA', 'Background Jobs', 'File Handling'],
    links: [
      { text: 'Live Site', url: 'https://www.complianceeasy.com.au/', icon: 'fas fa-external-link-alt' }
    ]
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.querySelector('.modal-close');
  const projectCards = document.querySelectorAll('.project-card[data-project]');

  // Open modal on project card click
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't open modal if clicking on links
      if (e.target.closest('.project-link')) {
        return;
      }
      
      const projectId = card.getAttribute('data-project');
      openModal(projectId);
    });
  });

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close modal on outside click
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
}

function openModal(projectId) {
  const modal = document.getElementById('project-modal');
  const project = projectData[projectId];

  if (!project) return;

  // Populate modal content
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-description').textContent = project.description;

  // Populate contributions
  const contributionsContainer = document.getElementById('modal-contributions');
  if (project.contributions && project.contributions.length > 0) {
    contributionsContainer.innerHTML = `
      <h3>My Contributions</h3>
      <ul>
        ${project.contributions.map(contrib => `<li>${contrib}</li>`).join('')}
      </ul>
    `;
  } else {
    contributionsContainer.innerHTML = `
      <h3>My Contributions</h3>
      <p style="color: var(--text-light); font-style: italic;">Detailed contributions coming soon...</p>
    `;
  }

  // Populate tech stack
  const techContainer = document.getElementById('modal-tech');
  techContainer.innerHTML = `
    <h3>Technologies Used</h3>
    <div class="modal-tech-tags">
      ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
    </div>
  `;

  // Populate links
  const linksContainer = document.getElementById('modal-links');
  linksContainer.innerHTML = project.links.map(link => 
    `<a href="${link.url}" target="_blank"><i class="${link.icon}"></i> ${link.text}</a>`
  ).join('');

  // Show modal
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// Function to update project contributions (to be called when user provides details)
function updateProjectContributions(projectId, contributions) {
  if (projectData[projectId]) {
    projectData[projectId].contributions = contributions;
  }
}

// Make updateProjectContributions available globally
window.updateProjectContributions = updateProjectContributions;
window.projectData = projectData;

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