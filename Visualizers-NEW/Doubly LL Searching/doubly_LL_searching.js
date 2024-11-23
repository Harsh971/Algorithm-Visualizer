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

    if (!numNodes || !listElements || listElements.length != numNodes || !searchElement) {
        alert("Provide proper input.");
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
