// JavaScript for fade-in and slide-up animation on skills section
document.addEventListener('DOMContentLoaded', () => {
  // Get the skills section by its ID (assuming you added this ID to your skills section)
  const skillsSection = document.querySelector('section h2'); 

  if (skillsSection && skillsSection.textContent.includes('Technical Skills')) { // Check if the section with the correct heading exists
    const skillBadges = skillsSection.parentElement.querySelectorAll('.grid span');

    // Create an Intersection Observer to watch for the skills section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate each skill badge with a staggered delay
          skillBadges.forEach((badge, index) => {
            setTimeout(() => {
              badge.classList.remove('opacity-0', 'translate-y-4'); // Remove initial hidden state
              badge.classList.add('opacity-100'); // Make it visible
            }, index * 50); // Staggered delay (50ms between each badge)
          });
          observer.unobserve(entry.target); // Stop observing once animation starts
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

    observer.observe(skillsSection); // Start observing the skills section
  }
});
