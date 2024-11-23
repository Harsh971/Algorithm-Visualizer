document.getElementById('visualize-button').addEventListener('click', function () {
    const n = parseInt(document.getElementById('array-size').value);
    const arrayInput = document.getElementById('array-elements').value.trim().split(' ').map(Number);
    const target = parseInt(document.getElementById('target-element').value);
    const visualizationContainer = document.getElementById('visualization');
    visualizationContainer.innerHTML = '';

    // Validation
    if (arrayInput.length !== n || isNaN(target)) {
        alert('Please provide valid inputs.');
        return;
    }

    let low = 0;
    let high = n - 1;
    let iteration = 1;
    let iterationsData = [];

    function visualizeIteration(low, high, iteration, iterationsData) {
        const mid = Math.floor((low + high) / 2);
        const currentIterationData = {
            iteration,
            low,
            mid,
            high
        };
        iterationsData.push(currentIterationData);

        // Create a container for the current iteration
        const iterationContainer = document.createElement('div');
        iterationContainer.classList.add('iteration-container');
        iterationContainer.innerHTML = `<h4>Iteration ${iteration}</h4>`;
        visualizationContainer.appendChild(iterationContainer);

        // Create a copy of the array for the current iteration with index values
        const arrayCopy = document.createElement('div');
        arrayCopy.classList.add('array-copy');
        arrayCopy.innerHTML = arrayInput.map((num, index) => {
            return `<div class="array-element-wrapper">
                        <span class="index-value">${index}</span>
                        <span class="array-element" id="element-${iteration}-${index}">${num}</span>
                    </div>`;
        }).join('');
        iterationContainer.appendChild(arrayCopy);

        // Create and position the low, mid, high values
        const pointersContainer = document.createElement('div');
        pointersContainer.classList.add('pointers-container');
        pointersContainer.innerHTML = `
            <div class="pointers-values">
                <p>Low: <span id="low-value-${iteration}">${low}</span></p>
                <p>Mid: <span id="mid-value-${iteration}">${mid}</span></p>
                <p>High: <span id="high-value-${iteration}">${high}</span></p>
            </div>
        `;
        iterationContainer.appendChild(pointersContainer);

        // Highlight the mid element
        setTimeout(() => {
            document.querySelector(`#element-${iteration}-${mid}`).classList.add('highlight-mid');
        }, 1000);

        setTimeout(() => {
            if (arrayInput[mid] === target) {
                alert(`Element found at index ${mid}`);
                return;
            } else if (arrayInput[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }

            // Update the pointers values for the next iteration
            if (low <= high) {
                iteration++;
                visualizeIteration(low, high, iteration, iterationsData);
            } else {
                alert('Element not found in the array.');
            }
        }, 2000);
    }

    // Start visualization with the first iteration
    visualizeIteration(low, high, iteration, iterationsData);
});

document.getElementById('view-code-button').addEventListener('click', function () {
    const n = parseInt(document.getElementById('array-size').value);
    const arrayInput = document.getElementById('array-elements').value.trim().split(' ').map(Number);
    const target = parseInt(document.getElementById('target-element').value);

    // Validation
    if (arrayInput.length !== n || isNaN(target)) {
        alert('Please provide valid inputs.');
        return;
    }

    const codeSnippet = `
#include <stdio.h>

int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1; // Element not found
}

int main() {
    int arr[] = {${arrayInput.join(', ')}};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = ${target};
    int result = binarySearch(arr, n, target);
    if (result != -1)
        printf("Element found at index %d\\n", result);
    else
        printf("Element not found in the array\\n");
    return 0;
}`;

    // Display the code snippet in the modal
    document.getElementById('code-snippet').textContent = codeSnippet;

    // Show the modal
    $('#codeModal').modal('show');
});

function openPopup() {
    document.getElementById("overlay").classList.add("active");
    document.getElementById("popup").classList.add("active");
}

function closePopup() {
    document.getElementById("overlay").classList.remove("active");
    document.getElementById("popup").classList.remove("active");
}

function showContent(contentId) {
    const sections = document.querySelectorAll('.content-section');
    const tabs = document.querySelectorAll('.tab');

    sections.forEach(section => {
        section.classList.remove('active');
    });

    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(contentId).classList.add('active');
    document.querySelector(`.tab[onclick="showContent('${contentId}')"]`).classList.add('active');
}


// Function to show code based on selected language
function showCode(language) {
    // Remove 'active' class from all buttons and code snippets
    const buttons = document.querySelectorAll('.tab-button');
    const snippets = document.querySelectorAll('.code-snippet');
    
    buttons.forEach(button => button.classList.remove('active'));
    snippets.forEach(snippet => snippet.classList.remove('active'));

    // Add 'active' class to selected language button and code snippet
    document.querySelector(`[onclick="showCode('${language}')"]`).classList.add('active');
    document.getElementById(language).classList.add('active');
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
