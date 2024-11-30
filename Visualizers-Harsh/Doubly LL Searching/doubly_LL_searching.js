document.getElementById("startButton").addEventListener("click", startVisualizer);
document.getElementById("showCodeButton").addEventListener("click", showCode);
document.getElementById("closeModal").addEventListener("click", closeModal);

function showCode() {
    const numNodes = document.getElementById("numNodes").value;
    const listElements = document.getElementById("listElements").value.split(',').map(e => e.trim());
    const searchElement = document.getElementById("searchElement").value.trim();

    let cppCodeContent = `
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node* prev;
    Node(int x) : data(x), next(NULL), prev(NULL) {}
};

Node* createDoublyLinkedList() {
    Node* head = new Node(${listElements[0]});
    Node* curr = head;
`;
    
    for (let i = 1; i < listElements.length; i++) {
        cppCodeContent += `
    curr->next = new Node(${listElements[i]});
    curr->next->prev = curr;
    curr = curr->next; // curr -> Node(${listElements[i]})\n`;
    }

    cppCodeContent += `
    return head;
}

bool searchInDoublyLinkedList(Node* head, int target) {
    Node* curr = head;
    while (curr != NULL) {
        if (curr->data == target) {
            cout << "Found element " << target << " at Node(" << curr->data << ")" << endl;
            return true;
        }
        curr = curr->next;
    }
    return false;
}

int main() {
    Node* head = createDoublyLinkedList();
    int target = ${searchElement};
    searchInDoublyLinkedList(head, target);
    return 0;
}`;

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

    // Remove any existing popup and overlay
    const existingPopup = document.getElementById("errorPopup");
    const existingOverlay = document.getElementById("popupOverlay");
    if (existingPopup) existingPopup.remove();
    if (existingOverlay) existingOverlay.remove();

    // Check for invalid input
    if (!numNodes || !listElements || listElements.length != numNodes || !searchElement) {
        // Create an overlay to block interactions
        const overlay = document.createElement("div");
        overlay.id = "popupOverlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        overlay.style.zIndex = "999"; // Ensure it is below the popup
        document.body.appendChild(overlay);

        // Create a popup container
        const popup = document.createElement("div");
        popup.id = "errorPopup";
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.backgroundColor = "#ffe6e6";
        popup.style.border = "2px solid red";
        popup.style.padding = "20px";
        popup.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
        popup.style.borderRadius = "8px";
        popup.style.zIndex = "1000"; // Ensure it is above the overlay
        popup.style.textAlign = "center";
        popup.style.fontFamily = "'Arial', sans-serif";

        // Add error message
        const message = document.createElement("p");
        message.innerText = "Provide proper input.";
        message.style.color = "#721c24";
        message.style.marginBottom = "15px";
        message.style.fontSize = "16px";
        popup.appendChild(message);

        // Add close button
        const closeButton = document.createElement("button");
        closeButton.innerText = "Close";
        closeButton.style.backgroundColor = "red";
        closeButton.style.color = "white";
        closeButton.style.border = "none";
        closeButton.style.padding = "10px 20px";
        closeButton.style.borderRadius = "5px";
        closeButton.style.cursor = "pointer";

        closeButton.addEventListener("click", () => {
            popup.remove();
            overlay.remove();
        });

        popup.appendChild(closeButton);

        // Append popup to the body
        document.body.appendChild(popup);

        return;
    }

    const linkedListDisplay = document.getElementById("linkedListDisplay");
    linkedListDisplay.innerHTML = "";
    const operationDisplay = document.getElementById("operationDisplay");
    operationDisplay.innerHTML = "";

    listElements.forEach((element, index) => {
        const node = document.createElement("div");
        node.className = "node";
        node.innerText = element;
        linkedListDisplay.appendChild(node);

        if (index < listElements.length - 1) {
            const arrowContainer = document.createElement("div");
            arrowContainer.className = "arrow-container";
            
            // Create forward arrow
            const forwardArrow = document.createElement("div");
            forwardArrow.className = "forward-arrow arrow";
            arrowContainer.appendChild(forwardArrow);

            // Create backward arrow
            const backwardArrow = document.createElement("div");
            backwardArrow.className = "backward-arrow arrow";
            arrowContainer.appendChild(backwardArrow);

            linkedListDisplay.appendChild(arrowContainer);
        }
    });

    searchInDoublyLinkedList(listElements, searchElement);
}


function searchInDoublyLinkedList(list, searchValue) {
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

