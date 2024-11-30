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

// Function to copy the code to clipboard
function copyCode() {
    const activeSnippet = document.querySelector('.code-snippet.active');
    if (activeSnippet) {
        const code = activeSnippet.innerText;

        // Copy to clipboard
        navigator.clipboard.writeText(code)
            .then(() => {
                alert('Code copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }
}

function openPopup_o() {
    document.getElementById("overlay-o").classList.add("active-o");
    document.getElementById("popup-o").classList.add("active-o");
}

function closePopup_o() {
    document.getElementById("overlay-o").classList.remove("active-o");
    document.getElementById("popup-o").classList.remove("active-o");
}

function showContent_o(contentId) {
    const sections = document.querySelectorAll('.content-section-o');
    const tabs = document.querySelectorAll('.tab-o');

    sections.forEach(section => {
        section.classList.remove('active-o');
    });

    tabs.forEach(tab => {
        tab.classList.remove('active-o');
    });

    document.getElementById(contentId).classList.add('active-o');
    document.querySelector(`.tab-o[onclick="showContent_o('${contentId}')"]`).classList.add('active-o');
}

// Function to show code based on selected language
function showCode_o(language) {
    // Remove 'active-o' class from all buttons and code snippets
    const buttons = document.querySelectorAll('.tab-button-o');
    const snippets = document.querySelectorAll('.code-snippet-o');
    
    buttons.forEach(button => button.classList.remove('active-o'));
    snippets.forEach(snippet => snippet.classList.remove('active-o'));

    // Add 'active-o' class to selected language button and code snippet
    document.querySelector(`[onclick="showCode_o('${language}')"]`).classList.add('active-o');
    document.getElementById(language).classList.add('active-o');
}

// Function to copy the code to clipboard
function copyCode_o() {
    const activeSnippet = document.querySelector('.code-snippet-o.active-o');
    if (activeSnippet) {
        const code = activeSnippet.innerText;

        // Copy to clipboard
        navigator.clipboard.writeText(code)
            .then(() => {
                alert('Code copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }
}

