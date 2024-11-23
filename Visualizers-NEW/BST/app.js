class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(value, x = 400, y = 50, depth = 1) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            this.animateNode(newNode, x, y);
        } else {
            this.insertNode(this.root, newNode, x, y, depth);
        }
    }

    insertNode(currentNode, newNode, x, y, depth) {
        if (newNode.value < currentNode.value) {
            // Move to the left
            if (currentNode.left === null) {
                currentNode.left = newNode;
                this.animateNode(newNode, x - 100 / depth, y + 70, currentNode);
            } else {
                this.insertNode(currentNode.left, newNode, x - 100 / depth, y + 70, depth + 1);
            }
        } else {
            // Move to the right
            if (currentNode.right === null) {
                currentNode.right = newNode;
                this.animateNode(newNode, x + 100 / depth, y + 70, currentNode);
            } else {
                this.insertNode(currentNode.right, newNode, x + 100 / depth, y + 70, depth + 1);
            }
        }
    }

    animateNode(node, x, y, parentNode = null) {
        const treeContainer = document.getElementById('tree-container');
        const svgContainer = document.getElementById('svg-container');
        
        // Create node element and append it
        const nodeElement = document.createElement('div');
        nodeElement.classList.add('node');
        nodeElement.innerText = node.value;
        nodeElement.style.transform = `translate(${x}px, ${y}px)`;
        treeContainer.appendChild(nodeElement);

        // Update node position
        node.x = x;
        node.y = y;

        // Draw edge if there is a parent node
        if (parentNode) {
            this.drawEdge(svgContainer, parentNode.x, parentNode.y, x, y);
        }
    }

    drawEdge(svgContainer, parentX, parentY, childX, childY) {
        // Create an SVG line element
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", parentX + 15); // Center the line at the node
        line.setAttribute("y1", parentY + 15);
        line.setAttribute("x2", childX + 15);
        line.setAttribute("y2", childY + 15);
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "2");
        svgContainer.appendChild(line);
    }
}

// Initialize BST
const bst = new BST();

// Start button logic
document.getElementById('start-btn').addEventListener('click', () => {
    const input = document.getElementById('values').value.trim();
    const values = input.split(',').map(Number).filter(n => !isNaN(n));

    // Reset tree container and SVG for new visualization
    document.getElementById('tree-container').innerHTML = '<svg id="svg-container"></svg>';

    // Insert each value with a delay to visualize the steps
    values.forEach((value, index) => {
        setTimeout(() => {
            bst.insert(value);
        }, index * 1000); // 1-second delay between each insertion
    });
});

// C++ Code button logic
const cppModal = document.getElementById('cpp-modal');
const cppCodeBtn = document.getElementById('cpp-code-btn');
const closeBtn = document.getElementById('close-btn');

// When the user clicks the button, open the modal
cppCodeBtn.addEventListener('click', () => {
    cppModal.style.display = 'block';
});

// When the user clicks on the close button (x), close the modal
closeBtn.addEventListener('click', () => {
    cppModal.style.display = 'none';
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
    if (event.target === cppModal) {
        cppModal.style.display = 'none';
    }
});
