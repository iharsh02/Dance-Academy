document.addEventListener('DOMContentLoaded', () => {
  // Get all elements with class "scroll-link"
  const scrollLinks = document.querySelectorAll('.scroll-link');

  // Add click event listener to each scroll link
  scrollLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault(); // Prevent default link behavior

      // Get the target ID from the link's href attribute
      const targetId = link.getAttribute('href');
      
      // Find the target element by its ID
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Scroll to the target element smoothly
        targetElement.scrollIntoView({
          behavior: 'smooth', // Smooth scrolling animation
          block: 'start' // Scroll to the top of the target element
        });
      }
    });
  });
});
