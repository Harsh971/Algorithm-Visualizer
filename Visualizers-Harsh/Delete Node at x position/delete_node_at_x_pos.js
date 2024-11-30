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
        const prevNode = currentNodeIndex > 0 ? nodes[currentNodeIndex - 1] : null;
        const currNode = nodes[currentNodeIndex];
        const nextNode = currentNodeIndex + 1 < nodes.length ? nodes[currentNodeIndex + 1] : null;
        const nextAfterNextNode = currentNodeIndex + 2 < nodes.length ? nodes[currentNodeIndex + 2] : null;

        statusMessage.innerHTML = `
            <p>prev: ${prevNode ? prevNode.value : "NULL"}</p>
            <p>curr: ${currentNodeIndex === pos - 1 ? (nextNode ? nextNode.value : "NULL") : currNode.value}</p>
            <p>next: ${nextAfterNextNode ? nextAfterNextNode.value : "NULL"}</p>
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
                const modifiedValues = nodes.filter((_, index) => index !== pos - 1).map(node => node.value);

                // Display the deleted node separately
                const deletedNodeContainer = document.createElement('div');
                deletedNodeContainer.innerHTML = `<p>Deleted Node:</p>`;
                const deletedNodeDiv = document.createElement('div');
                deletedNodeDiv.classList.add('node');
                deletedNodeDiv.style.backgroundColor = "red";
                deletedNodeDiv.textContent = nodes[pos - 1].value;
                deletedNodeContainer.appendChild(deletedNodeDiv);
                iterationContainer.appendChild(deletedNodeContainer);

                // Update linked list display after deletion
                displayLinkedList(modifiedValues, 'linkedListContainer');
            }, 1000);
        }
    }

    updateIterationDisplay();
}


document.getElementById('startButton').addEventListener('click', startDeletionVisualizer);


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
