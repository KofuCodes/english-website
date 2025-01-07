// Track if we've already done the initial scroll
let hasScrolled = false;
let isScrolling = false;

// Smooth scroll to section function
function smoothScrollTo(element) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 400; // Adjust this value to control scroll speed (in milliseconds)
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth animation
        const ease = t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        
        window.scrollTo(0, startPosition + distance * ease(progress));
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            isScrolling = false;
        }
    }
    
    isScrolling = true;
    requestAnimationFrame(animation);
}

// Initial scroll handler
window.addEventListener('wheel', function(event) {
    if (!hasScrolled && event.deltaY > 0 && !isScrolling) {
        event.preventDefault();
        hasScrolled = true;
        const introSection = document.getElementById('introduction');
        if (introSection) {
            smoothScrollTo(introSection);
        }
    }
}, { passive: false });

// Navigation visibility
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > window.innerHeight * 0.5) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }

    if (currentScrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Show content for selected show
function showContent(showId) {
    if (isScrolling) return;
    
    document.querySelectorAll('.show-content').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('active');
    });

    const selectedContent = document.getElementById(showId);
    document.getElementById('content-section').classList.remove('hidden');
    selectedContent.classList.remove('hidden');

    const header = selectedContent.querySelector('.show-header h2');
    if (header) {
        header.style.textAlign = 'center';
    }

    showAnalysisImage(showId);

    setTimeout(() => {
        selectedContent.classList.add('active');
        smoothScrollTo(selectedContent);
    }, 10);
}

// Scroll to top with custom animation
scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isScrolling) return;
    
    smoothScrollTo(document.querySelector('.title-section'));
});

// Rest of your existing code for showAnalysisImage and other functions remains the same...

// Image overlay function (unchanged)
function showAnalysisImage(showId) {
    let overlay = document.getElementById('overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'overlay';
        document.body.appendChild(overlay);
    }

    let floatingImage = document.getElementById('floating-image');
    if (!floatingImage) {
        floatingImage = document.createElement('img');
        floatingImage.id = 'floating-image';
        document.body.appendChild(floatingImage);
    }

    const imageMap = {
        Parasite: 'assets/Parasite.png',
        Jaws: 'assets/JAWS.png',
        squidgame: 'assets/Squid-Game-Logo.png',
    };

    if (imageMap[showId]) {
        floatingImage.src = imageMap[showId];
    } else {
        console.error('Image not found for', showId);
        return;
    }

    overlay.classList.add('visible');
    floatingImage.style.display = 'block';

    setTimeout(() => floatingImage.classList.add('fade-in'), 10);

    setTimeout(() => {
        floatingImage.classList.remove('fade-in');
        overlay.classList.remove('visible');

        setTimeout(() => {
            floatingImage.style.display = 'none';
        }, 500);
    }, 1500);
}

// Add fade-in animation to title on load
window.addEventListener('load', () => {
    document.querySelector('.title-section h1').style.opacity = 1;
});