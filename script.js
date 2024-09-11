// Countdown Timer
const countdown = () => {
    const eventDate = new Date("Dec 10, 2024 09:00:00").getTime();
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = `
        <span>${days}</span> days 
        <span>${hours}</span> hours 
        <span>${minutes}</span> minutes 
        <span>${seconds}</span> seconds
    `;

    if (timeLeft < 0) {
        clearInterval(timer);
        document.getElementById('countdown').innerHTML = "Event Started!";
    }
};

const timer = setInterval(countdown, 1000);

// Show section based on button click
function showSection(section) {
    const currentSection = document.querySelector('.event-content:not(.d-none)');
    const newSection = document.getElementById(section);

    // Step 1: Flip all images in the current section
    const currentImages = currentSection.querySelectorAll('.flip-image');
    currentImages.forEach(image => {
        image.classList.add('flip');
    });

    // Step 2: After the flip completes (800ms), hide the current section and show the new section
    setTimeout(() => {
        currentSection.classList.add('d-none'); // Hide current section
        currentImages.forEach(image => {
            image.classList.remove('flip'); // Reset flip for next time
        });

        // Step 3: Flip new section's images into view
        newSection.classList.remove('d-none'); // Show new section
        const newImages = newSection.querySelectorAll('.flip-image');
        newImages.forEach(image => {
            image.classList.add('flip'); // Flip into view
        });

        // Remove the flip after the animation
        setTimeout(() => {
            newImages.forEach(image => {
                image.classList.remove('flip'); // Reset after animation
            });
        }, 400); // 800ms to match the flip animation duration
    }, 800); // Allow 800ms for the flip to complete
}


// cubes
document.addEventListener('DOMContentLoaded', () => {
    const cubesContainer = document.querySelector('.cubes-container');
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight * 2; // Allow it to cover double the viewport height
    const cubeSize = 45;
    const spacing = 2;
    const cols = Math.floor(containerWidth / (cubeSize + spacing));
    const rows = Math.floor(containerHeight / (cubeSize + spacing));

    for (let i = 0; i < cols * rows; i++) {
        const cube = document.createElement('div');
        cube.classList.add('cube');
        cubesContainer.appendChild(cube);
    }
});

window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    const counter = document.querySelector('.counter');
    let count = 0;

    let counterInterval = setInterval(() => {
        if (count < 100) {
            count++;
            counter.textContent = count + "%";
        } else {
            clearInterval(counterInterval);
        }
    }, 20); 
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3500);
});
