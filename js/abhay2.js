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


const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const confirmMessage = document.getElementById('confirmMessage');
const passwordStrengthText = document.getElementById('passwordStrength');

// Check password strength
passwordInput.addEventListener('input', function() {
    const password = passwordInput.value;
    let strength = 'Weak';
    let valid = true;

    // Password strength checks
    if (password.length >= 8) {
        strength = 'Medium';
        if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
            strength = 'Strong';
        }
    } else {
        valid = false;
    }

    // Display password strength
    passwordStrengthText.textContent = `Strength: ${strength}`;
    passwordStrengthText.className = 'strength-status ' + (valid && strength === 'Strong' ? 'valid' : '');
});

// Confirm password match
confirmPasswordInput.addEventListener('input', function() {
    if (confirmPasswordInput.value === passwordInput.value) {
        confirmMessage.textContent = '✔️ Passwords match';
        confirmMessage.style.color = 'green';
    } else {
        confirmMessage.textContent = '❌ Passwords do not match';
        confirmMessage.style.color = 'red';
    }
});
