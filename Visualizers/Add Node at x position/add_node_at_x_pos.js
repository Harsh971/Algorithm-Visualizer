const cppCodeSnippet = `
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

void insertAtPosition(Node*& head, int value, int position) {
    Node* newNode = new Node(value);
    if (position == 1) { 
        newNode->next = head;
        head = newNode;
        return;
    }
    Node* curr = head;
    Node* prev = nullptr;
    int currPosition = 1;

    while (curr != nullptr && currPosition < position) {
        prev = curr;
        curr = curr->next;
        currPosition++;
    }

    if (prev != nullptr) {
        prev->next = newNode;
        newNode->next = curr;
    }
}
`;

document.getElementById('showCodeButton').addEventListener('click', function () {
    document.getElementById('codeText').textContent = cppCodeSnippet;
    document.getElementById('codeModal').style.display = 'block';
});

document.querySelector('.close').onclick = function () {
    document.getElementById('codeModal').style.display = 'none';
};

function displayErrorPopup(message) {
    const existingModal = document.getElementById('errorModal');
    if (existingModal) existingModal.remove(); // Remove any existing modals

    // Create a modal for the error message
    const modal = document.createElement('div');
    modal.id = 'errorModal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = 'white';
    modal.style.padding = '20px';
    modal.style.borderRadius = '8px';
    modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    modal.style.textAlign = 'center';
    modal.style.zIndex = '1000';

    const modalMessage = document.createElement('p');
    modalMessage.textContent = message;
    modalMessage.style.marginBottom = '20px';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.background = '#007BFF';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.padding = '10px 20px';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';

    closeButton.onclick = function () {
        modal.remove();
    };

    modal.appendChild(modalMessage);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
}

function startVisualizer() {
    const nodeCount = parseInt(document.getElementById('nodeCount').value);
    const nodeValues = document.getElementById('nodeValues').value.split(',').map(Number);
    const insertValue = parseInt(document.getElementById('insertValue').value);
    const position = parseInt(document.getElementById('position').value);

    if (!nodeCount || nodeValues.length !== nodeCount || isNaN(insertValue) || isNaN(position) || position > nodeCount + 1 || position < 1) {
        displayErrorPopup("Give proper input");
        return;
    }

    const existingModal = document.getElementById('errorModal');
    if (existingModal) existingModal.remove(); // Remove any existing modals
    
    // Clear previous content to start fresh
    document.getElementById('linkedListContainer').innerHTML = '';
    document.getElementById('insertNodeContainer').innerHTML = '';
    document.getElementById('iterationContainer').innerHTML = '';

    // Display the linked list and separate node to insert
    displayLinkedList(nodeValues);
    displayInsertNode(insertValue);

    // Start the insertion animation
    animateInsertion(nodeValues, insertValue, position);
}

function displayLinkedList(values) {
    const container = document.getElementById('linkedListContainer');
    container.innerHTML = '';
    values.forEach(value => {
        const node = document.createElement('div');
        node.classList.add('node');
        node.textContent = value;
        container.appendChild(node);
    });
}

function displayInsertNode(value) {
    const insertNodeContainer = document.getElementById('insertNodeContainer');
    insertNodeContainer.innerHTML = '';
    const node = document.createElement('div');
    node.classList.add('node', 'insert-node');
    node.textContent = value;
    insertNodeContainer.appendChild(node);
}

function animateInsertion(values, newValue, pos) {
    let currentNodeIndex = 0;
    const iterationContainer = document.getElementById('iterationContainer');
    const nodes = values.map(value => ({ value, isNew: false }));

    function updateIterationDisplay() {
        const iterationDiv = document.createElement('div');
        iterationDiv.classList.add('iteration');

        // Add iteration label
        const iterationLabel = document.createElement('p');
        iterationLabel.textContent = `Iteration ${currentNodeIndex + 1}`;
        iterationLabel.classList.add('iteration-label');
        iterationDiv.appendChild(iterationLabel);

        // Add nodes in horizontal format
        nodes.forEach((node, index) => {
            const nodeDiv = document.createElement('div');
            nodeDiv.classList.add('node');
            // Highlight current node
            if (index === currentNodeIndex && index !== pos - 1) nodeDiv.classList.add('highlight');
            nodeDiv.textContent = node.value;
            iterationDiv.appendChild(nodeDiv);
        });

        // Conditionally add new node in the insertion iteration
        if (currentNodeIndex === pos - 1) {
            const newNodeDiv = document.createElement('div');
            newNodeDiv.classList.add('node', 'highlight', 'insert-node');
            newNodeDiv.textContent = newValue;
            newNodeDiv.style.backgroundColor = 'orange';
            iterationDiv.insertBefore(newNodeDiv, iterationDiv.children[pos]);
            nodes.splice(pos - 1, 0, { value: newValue, isNew: true }); // Insert new node in the array
        }

        // Add status message
        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status-message');
        statusMessage.innerHTML = `
            <p>prev: ${currentNodeIndex > 0 ? nodes[currentNodeIndex - 1].value : "NULL"}</p>
            <p>curr: ${nodes[currentNodeIndex].value}</p>
            <p>next: ${currentNodeIndex + 1 < nodes.length ? nodes[currentNodeIndex + 1].value : "NULL"}</p>
        `;
        iterationDiv.appendChild(statusMessage);

        // Add horizontal line for separation
        const separator = document.createElement('hr');
        iterationContainer.appendChild(iterationDiv);
        iterationContainer.appendChild(separator);

        if (currentNodeIndex < pos - 1) {
            currentNodeIndex++;
            setTimeout(updateIterationDisplay, 1000);
        } else {
            document.getElementById('insertNodeContainer').innerHTML = ''; // Remove separate insert node after insertion
        }
    }

    updateIterationDisplay();
}

document.getElementById('startButton').addEventListener('click', startVisualizer);
