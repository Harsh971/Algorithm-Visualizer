document.getElementById('visualize-button').addEventListener('click', function() {
    const arraySize = parseInt(document.getElementById('array-size').value);
    const arrayValues = document.getElementById('array-values').value.split(',').map(Number);
    const searchElement = parseInt(document.getElementById('search-element').value);
    const visualizationContainer = document.getElementById('visualization');
    visualizationContainer.innerHTML = '';

    // Validation
    if (isNaN(arraySize) || arraySize <= 0 || arrayValues.length !== arraySize || isNaN(searchElement)) {
        alert('Please provide valid inputs.');
        return;
    }

    // Create blocks for visualization
    arrayValues.forEach((value, index) => {
        const block = document.createElement('div');
        block.classList.add('block');
        block.setAttribute('data-index', index);
        block.innerText = value;
        visualizationContainer.appendChild(block);
    });

    let i = 0;

    function highlightBlock(index) {
        const blocks = document.querySelectorAll('.block');
        blocks.forEach(block => block.classList.remove('highlight', 'found'));

        if (index < arraySize) {
            const currentBlock = blocks[index];
            currentBlock.classList.add('highlight');

            if (arrayValues[index] === searchElement) {
                currentBlock.classList.add('found');
            } else {
                setTimeout(() => highlightBlock(index + 1), 1000); // Delay between iterations
            }
        } else {
            alert('Element not found in the array.');
        }
    }

    highlightBlock(i);
});

document.getElementById('view-code-button').addEventListener('click', function() {
    const arraySize = parseInt(document.getElementById('array-size').value);
    const arrayValues = document.getElementById('array-values').value.split(',').map(Number);
    const searchElement = parseInt(document.getElementById('search-element').value);

    // Validation
    if (isNaN(arraySize) || arraySize <= 0 || arrayValues.length !== arraySize || isNaN(searchElement)) {
        alert('Please provide valid inputs.');
        return;
    }

    // Generate the C code snippet
    const arrayStr = arrayValues.join(', ');
    const snippet = `
#include <stdio.h>

int main() {
    int arr[] = {${arrayStr}};
    int n = ${arraySize};
    int x = ${searchElement};
    int i;
    
    for (i = 0; i < n; i++) {
        if (arr[i] == x) {
            printf("Element %d found at index %d\\n", x, i);
            return 0;
        }
    }
    
    printf("Element %d not found in the array\\n", x);
    return 0;
}
    `;

    document.getElementById('code-snippet').innerText = snippet;

    // Show the modal
    $('#codeModal').modal('show');
});
