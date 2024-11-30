document.getElementById('visualize-button').addEventListener('click', function() {
    const startValue = parseInt(document.getElementById('start-value').value);
    const endValue = parseInt(document.getElementById('end-value').value);
    const incrementDecrement = parseInt(document.getElementById('increment-decrement').value);
    const loopBody = document.getElementById('loop-body').value;
    const visualizationContainer = document.getElementById('visualization');
    visualizationContainer.innerHTML = '';

    // Validation
    if (isNaN(startValue) || isNaN(endValue) || isNaN(incrementDecrement)) {
        alert('Please provide valid inputs.');
        return;
    }

    let i = startValue;
    let iteration = 1;

    function visualizeIteration(i, iteration) {
        // Create a container for the current iteration
        const iterationContainer = document.createElement('div');
        iterationContainer.classList.add('iteration-container', 'mb-4', 'p-3', 'border', 'rounded', 'shadow-sm');
        iterationContainer.innerHTML = `<h4>Iteration ${iteration}</h4>`;
        visualizationContainer.appendChild(iterationContainer);

        // Step 1: Initialize i
        const initStep = document.createElement('div');
        initStep.classList.add('step', 'mb-2');
        initStep.innerHTML = `<strong>Initialize:</strong> i = ${i}`;
        iterationContainer.appendChild(initStep);

        // Step 2: Check condition
        const conditionStep = document.createElement('div');
        conditionStep.classList.add('step', 'mb-2');
        const conditionMet = incrementDecrement > 0 ? i <= endValue : i >= endValue;
        conditionStep.innerHTML = `<strong>Condition:</strong> ${i} ${incrementDecrement > 0 ? '<=' : '>='} ${endValue} is ${conditionMet}`;
        iterationContainer.appendChild(conditionStep);

        // Animate the condition step
        setTimeout(() => {
            conditionStep.classList.add('highlight');
        }, 1000);

        if (!conditionMet) {
            return;  // Stop the loop if the condition is not met
        }

        // Step 3: Execute loop body
        const bodyStep = document.createElement('div');
        bodyStep.classList.add('step', 'mb-2');
        bodyStep.innerHTML = `<strong>Body:</strong> Executing custom code...`;
        iterationContainer.appendChild(bodyStep);

        // Animate the body execution step
        setTimeout(() => {
            bodyStep.classList.add('highlight');
        }, 2000);

        // Step 4: Increment/Decrement i
        const incrementStep = document.createElement('div');
        incrementStep.classList.add('step', 'mb-2');
        i += incrementDecrement;
        incrementStep.innerHTML = `<strong>Update:</strong> i = ${i}`;
        iterationContainer.appendChild(incrementStep);

        // Animate the increment/decrement step
        setTimeout(() => {
            incrementStep.classList.add('highlight');
        }, 3000);

        // Move to the next iteration if the condition is still met
        setTimeout(() => {
            iteration++;
            visualizeIteration(i, iteration);
        }, 4000);
    }

    // Start visualization with the first iteration
    visualizeIteration(i, iteration);
});

document.getElementById('view-code-button').addEventListener('click', function() {
    const startValue = parseInt(document.getElementById('start-value').value);
    const endValue = parseInt(document.getElementById('end-value').value);
    const incrementDecrement = parseInt(document.getElementById('increment-decrement').value);
    const loopBody = document.getElementById('loop-body').value;

    // Validation
    if (isNaN(startValue) || isNaN(endValue) || isNaN(incrementDecrement)) {
        alert('Please provide valid inputs.');
        return;
    }

    // Generate the C code snippet
    const snippet = `
#include <stdio.h>

int main() {
    for (int i = ${startValue}; i ${incrementDecrement > 0 ? '<=' : '>='} ${endValue}; i${incrementDecrement > 0 ? '++' : '--'}) {
        ${loopBody.trim()}
    }
    return 0;
}
    `;

    document.getElementById('code-snippet').innerText = snippet;

    // Show the modal
    $('#codeModal').modal('show');
});


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
