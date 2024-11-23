// Get references to HTML elements
const factorialInput = document.getElementById('factorialInput');
const startAnimationButton = document.getElementById('startAnimation');
const showCCodeButton = document.getElementById('showCCode');
const visualizationContainer = document.getElementById('visualizationContainer');
const cCodeModal = document.getElementById('cCodeModal');
const closeModal = document.getElementById('closeModal');
const cCodeContent = document.getElementById('cCodeContent');

// Close Modal Function
closeModal.onclick = () => {
    cCodeModal.style.display = 'none';
};

// Show C Code Modal
showCCodeButton.onclick = () => {
    const n = factorialInput.value || 0;
    cCodeContent.textContent = `
#include <stdio.h>

int factorial(int n) {
    if(n == 0) return 1;
    return n * factorial(n-1);
}

int main() {
    int n = ${n}; // User's input value
    printf("Factorial of %d is %d", n, factorial(n));
    return 0;
}`;
    cCodeModal.style.display = 'flex';
};

// Factorial calculation and animation
function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}

function animateFactorialCalculation(n) {
    visualizationContainer.innerHTML = '';
    let steps = '';
    let result = 1;

    for (let i = 1; i <= n; i++) {
        result *= i;
        steps += `Step ${i}: ${i} * ${result / i} = ${result}<br>`;
    }

    let stepArray = steps.split('<br>');
    let index = 0;

    // Interval to show step by step
    const intervalId = setInterval(() => {
        if (index < stepArray.length - 1) {
            visualizationContainer.innerHTML += stepArray[index] + '<br>';
            index++;
        } else {
            clearInterval(intervalId);
        }
    }, 1000); // 1 second interval for animation
}

// Start Visualization
startAnimationButton.onclick = () => {
    const n = parseInt(factorialInput.value);
    if (!isNaN(n) && n >= 0) {
        animateFactorialCalculation(n);
    } else {
        alert('Please enter a valid number');
    }
};

// Close modal when clicked outside the modal content
window.onclick = function(event) {
    if (event.target == cCodeModal) {
        cCodeModal.style.display = "none";
    }
}
