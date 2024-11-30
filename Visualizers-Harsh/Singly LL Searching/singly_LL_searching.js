document.getElementById("startButton").addEventListener("click", startVisualizer);
document.getElementById("showCodeButton").addEventListener("click", showCode);
document.getElementById("closeModal").addEventListener("click", closeModal);

function showCode() {
    // Generate C++ code dynamically based on user inputs
    const numNodes = document.getElementById("numNodes").value;
    const listElements = document.getElementById("listElements").value.split(',').map(e => e.trim());
    const searchElement = document.getElementById("searchElement").value.trim();

    let cppCodeContent = `
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int x) : data(x), next(NULL) {}
};

// Linked list creation
Node* createLinkedList() {
    Node* head = new Node(${listElements[0]});
    Node* curr = head;
`;
    
    // Dynamically add each node creation step
    for (let i = 1; i < listElements.length; i++) {
        cppCodeContent += `
    curr->next = new Node(${listElements[i]});
    curr = curr->next; // curr -> Node(${listElements[i]})\n`;
    }

    cppCodeContent += `
    return head;
}

// Search in Linked List
bool searchInLinkedList(Node* head, int target) {
    Node* curr = head;
    while (curr != NULL) {
        if (curr->data == target) {
            cout << "Found element " << target << " at Node(" << curr->data << ")" << endl;
            return true;
        }
        cout << "Checking Node(" << curr->data << ") and moving to next node." << endl;
        curr = curr->next;
    }
    cout << "Element " << target << " not found in the list." << endl;
    return false;
}

int main() {
    Node* head = createLinkedList();
    int target = ${searchElement};
    searchInLinkedList(head, target);
    return 0;
}`;

    // Insert the generated C++ code into the modal
    document.getElementById("cppCode").innerText = cppCodeContent;
    document.getElementById("codeModal").style.display = "block";
}

function closeModal() {
    document.getElementById("codeModal").style.display = "none";
}

function startVisualizer() {
    const numNodes = document.getElementById("numNodes").value;
    const listElements = document.getElementById("listElements").value.split(',').map(e => e.trim());
    const searchElement = document.getElementById("searchElement").value.trim();

    if (!numNodes || !listElements || listElements.length != numNodes || !searchElement) {
        alert("Give proper input");
        return;
    }

    document.getElementById("linkedListDisplay").innerHTML = "";
    document.getElementById("operationDisplay").innerHTML = "";

    const linkedListDisplay = document.getElementById("linkedListDisplay");
    listElements.forEach((element, index) => {
        const node = document.createElement("div");
        node.className = "node";
        node.innerText = element;
        linkedListDisplay.appendChild(node);

        if (index < listElements.length - 1) {
            const arrow = document.createElement("div");
            arrow.className = "arrow";
            linkedListDisplay.appendChild(arrow);
        }
    });

    searchInLinkedList(listElements, searchElement);
}

function searchInLinkedList(list, searchValue) {
    const operationDisplay = document.getElementById("operationDisplay");
    let found = false;

    list.forEach((value, index) => {
        setTimeout(() => {
            if (found) return;

            const nodes = document.getElementsByClassName("node");
            nodes[index].style.backgroundColor = "#a3d8a5";
            let currDisplay = `curr -> Node(${value})`;

            if (value === searchValue) {
                operationDisplay.innerText = `Found: ${currDisplay} at node ${index + 1}`;
                nodes[index].style.backgroundColor = "#8bc34a";
                found = true;
                setTimeout(() => {
                    alert(`Element found at node ${index + 1}`);
                }, 500);
            } else {
                operationDisplay.innerText = `Checking: ${currDisplay}, searching...`;
            }

            if (index > 0 && nodes[index - 1].style.backgroundColor !== "#8bc34a") {
                nodes[index - 1].style.backgroundColor = "#ddd";
            }

            if (index === list.length - 1 && !found) {
                setTimeout(() => {
                    alert(`Element ${searchValue} not found in the list.`);
                    operationDisplay.innerText = `End of search: curr -> NULL`;
                    nodes[index].style.backgroundColor = "#ddd";
                }, 1000);
            }
        }, index * 1000);
    });
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

