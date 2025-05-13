// JavaScript for fade-in and slide-up animation on skills section
document.addEventListener('DOMContentLoaded', () => {
  // Get the skills section by its ID (assuming you added this ID to your skills section)
  const skillsSection = document.getElementById('skills-section'); 

  if (skillsSection) { // Check if the section exists before proceeding
    const skillBadges = skillsSection.querySelectorAll('.grid span');

    // Create an Intersection Observer to watch for the skills section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate each skill badge with a staggered delay
          skillBadges.forEach((badge, index) => {
            setTimeout(() => {
              badge.classList.remove('opacity-0', 'translate-y-4'); // Remove initial hidden state
              badge.classList.add('opacity-100'); // Make it visible
            }, index * 75); // Staggered delay (75ms between each badge)
          });
          observer.unobserve(entry.target); // Stop observing once animation starts
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    observer.observe(skillsSection); // Start observing the skills section
  }
});
