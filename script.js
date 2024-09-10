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
    const sections = document.querySelectorAll('.event-content');
    sections.forEach(sec => sec.classList.add('d-none'));
    
    document.getElementById(section).classList.remove('d-none');
}

// JavaScript to dynamically generate cubes
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



