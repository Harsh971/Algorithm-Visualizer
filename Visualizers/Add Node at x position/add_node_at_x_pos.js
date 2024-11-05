// C++ code snippet to be displayed in the popup
const cppCodeSnippet = `
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

// Function to insert a new node at a specific position
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

// Show code in a popup
document.getElementById('showCodeButton').addEventListener('click', function() {
    document.getElementById('codeText').textContent = cppCodeSnippet;
    document.getElementById('codeModal').style.display = 'block';
});

document.querySelector('.close').onclick = function() {
    document.getElementById('codeModal').style.display = 'none';
}

// Visualization and Animation Code
function startVisualizer() {
    const nodeCount = parseInt(document.getElementById('nodeCount').value);
    const nodeValues = document.getElementById('nodeValues').value.split(',').map(Number);
    const insertValue = parseInt(document.getElementById('insertValue').value);
    const position = parseInt(document.getElementById('position').value);

    if (!nodeCount || nodeValues.length !== nodeCount || isNaN(insertValue) || isNaN(position) || position > nodeCount + 1 || position < 1) {
        alert("Give proper input");
        return;
    }

    displayLinkedList(nodeValues);
    displayInsertNode(insertValue);
    animateInsertion(nodeValues, insertValue, position);
}

// Display linked list
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

// Display standalone insert node
function displayInsertNode(value) {
    const insertNodeContainer = document.getElementById('insertNodeContainer');
    insertNodeContainer.innerHTML = '';
    const node = document.createElement('div');
    node.classList.add('node', 'insert-node');
    node.textContent = value;
    insertNodeContainer.appendChild(node);
}

// Animation function
function animateInsertion(values, newValue, pos) {
    let currentNodeIndex = 0;
    const container = document.getElementById('linkedListContainer');
    const nodes = container.getElementsByClassName('node');
    const statusMessage = document.getElementById('statusMessage');
    
    function updatePointers(prev, curr, next) {
        statusMessage.innerHTML = `
            <p>prev: ${prev ? prev : "NULL"}</p>
            <p>curr: ${curr ? curr : "NULL"}</p>
            <p>next: ${next ? next : "NULL"}</p>
        `;
    }

    function animateStep() {
        let prev = currentNodeIndex > 0 ? nodes[currentNodeIndex - 1].textContent : null;
        let curr = currentNodeIndex < nodes.length ? nodes[currentNodeIndex].textContent : null;
        let next = currentNodeIndex + 1 < nodes.length ? nodes[currentNodeIndex + 1].textContent : null;
        
        updatePointers(prev, curr, next);

        if (currentNodeIndex < pos - 1 && currentNodeIndex < nodes.length) {
            if (currentNodeIndex > 0) nodes[currentNodeIndex - 1].classList.remove('highlight');
            nodes[currentNodeIndex].classList.add('highlight');
            currentNodeIndex++;
            setTimeout(animateStep, 1000);
        } else {
            nodes[currentNodeIndex - 1]?.classList.remove('highlight');
            insertAtPosition(container, newValue, pos);
            document.getElementById('insertNodeContainer').innerHTML = '';
            statusMessage.textContent = `Inserted ${newValue} at position ${pos}`;
        }
    }

    animateStep();
}

// Insert node at position
function insertAtPosition(container, newValue, pos) {
    const newNode = document.createElement('div');
    newNode.classList.add('node', 'insert-node');
    newNode.textContent = newValue;
    newNode.style.backgroundColor = "#FFA500"; // Keep inserted node orange

    // Insert at correct position based on index
    if (pos - 1 < container.children.length) {
        container.insertBefore(newNode, container.children[pos - 1]);
    } else {
        container.appendChild(newNode);  // Append at end if position exceeds length
    }
}

document.getElementById('startButton').addEventListener('click', startVisualizer);