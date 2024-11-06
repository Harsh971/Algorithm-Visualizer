const cppCodeSnippet = `
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

void deleteAtPosition(Node*& head, int position) {
    if (head == nullptr) return;
    
    if (position == 1) {
        Node* temp = head;
        head = head->next;
        delete temp;
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

    if (curr != nullptr) {
        prev->next = curr->next;
        delete curr;
    }
}
`;

document.getElementById('showCodeButton').addEventListener('click', function() {
    document.getElementById('codeText').textContent = cppCodeSnippet;
    document.getElementById('codeModal').style.display = 'block';
});

document.querySelector('.close').onclick = function() {
    document.getElementById('codeModal').style.display = 'none';
};

function startDeletionVisualizer() {
    const nodeCount = parseInt(document.getElementById('nodeCount').value);
    const nodeValues = document.getElementById('nodeValues').value.split(',').map(Number);
    const position = parseInt(document.getElementById('position').value);

    if (!nodeCount || nodeValues.length !== nodeCount || isNaN(position) || position > nodeCount || position < 1) {
        alert("Provide valid inputs.");
        return;
    }

    // Clear previous content to start fresh
    document.getElementById('linkedListContainer').innerHTML = '';
    document.getElementById('iterationContainer').innerHTML = '';

    // Display the initial linked list
    displayLinkedList(nodeValues, 'linkedListContainer');

    // Start the deletion animation
    animateDeletion(nodeValues, position);
}

function displayLinkedList(values, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    values.forEach(value => {
        const node = document.createElement('div');
        node.classList.add('node');
        node.textContent = value;
        container.appendChild(node);
    });
}

function animateDeletion(values, pos) {
    let currentNodeIndex = 0;
    const iterationContainer = document.getElementById('iterationContainer');
    const nodes = values.map(value => ({ value, isDeleted: false }));

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
            if (!(currentNodeIndex === pos - 1 && index === pos - 1)) { // Skip displaying the node in the final iteration
                const nodeDiv = document.createElement('div');
                nodeDiv.classList.add('node');
                if (index === currentNodeIndex && index !== pos - 1) nodeDiv.classList.add('highlight');
                if (index === pos - 1 && currentNodeIndex < pos - 1) nodeDiv.style.backgroundColor = "red"; // Keep the node red until the last iteration
                nodeDiv.textContent = node.value;
                iterationDiv.appendChild(nodeDiv);
            }
        });

        // Add status message
        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status-message');
        statusMessage.innerHTML = `
            <p>prev: ${currentNodeIndex > 0 ? nodes[currentNodeIndex - 1].value : "NULL"}</p>
            <p>curr: ${currentNodeIndex === pos - 1 ? nodes[currentNodeIndex + 1].value : nodes[currentNodeIndex].value}</p>
            <p>next: ${currentNodeIndex + 1 < nodes.length ? nodes[currentNodeIndex + 2].value : "NULL"}</p>
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
            // Display updated linked list after deletion, excluding the deleted node
            setTimeout(() => {
                const modifiedValues = nodes.filter(node => node.value !== nodes[pos - 1].value).map(node => node.value);

                // Display the deleted node separately
                const deletedNodeContainer = document.createElement('div');
                deletedNodeContainer.innerHTML = `<p>Deleted Node:</p>`;
                const deletedNodeDiv = document.createElement('div');
                deletedNodeDiv.classList.add('node');
                deletedNodeDiv.style.backgroundColor = "red";
                deletedNodeDiv.textContent = nodes[pos - 1].value;
                deletedNodeContainer.appendChild(deletedNodeDiv);
                iterationContainer.appendChild(deletedNodeContainer);
            }, 1000);
        }
    }

    updateIterationDisplay();
}

document.getElementById('startButton').addEventListener('click', startDeletionVisualizer);
