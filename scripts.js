// Track if we've already done the initial scroll
let hasScrolled = false;

// Smooth scroll fix
window.addEventListener('wheel', function (event) {
    if (!hasScrolled && event.deltaY > 0) {
        hasScrolled = true;
        document.getElementById('introduction').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// Navigation visibility
let lastScrollY = 0;
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

    // Start the fade-in effect
    setTimeout(() => floatingImage.classList.add('fade-in'), 10);

    // Remove the fade-in effect after 1.5 seconds
    setTimeout(() => {
        floatingImage.classList.remove('fade-in');
        overlay.classList.remove('visible');

        // Hide the floating image after fading out
        setTimeout(() => {
            floatingImage.style.display = 'none';
        }, 500);
    }, 1500);
}

// Show content for selected show
function showContent(showId) {
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
    // Trigger only image animation; header remains static
    showAnalysisImage(showId);

    setTimeout(() => {
        selectedContent.classList.add('active');
    }, 10);

    selectedContent.scrollIntoView({ behavior: 'smooth' });
}
// Scroll to top functionality with smooth scroll
scrollTopBtn.addEventListener('click', () => {
    document.querySelector('.title-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Add fade-in animation to title on load
window.addEventListener('load', () => {
    document.querySelector('.title-section h1').style.opacity = 1;
});