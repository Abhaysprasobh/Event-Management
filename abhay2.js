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

