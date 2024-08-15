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
