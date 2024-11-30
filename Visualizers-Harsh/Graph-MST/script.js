const canvas = document.getElementById('visualizer-canvas');
const ctx = canvas.getContext('2d');

let nodes = [];
let edges = [];
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;

function generateNodes(n) {
    nodes = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < n; i++) {
        const angle = (2 * Math.PI * i) / n;
        const x = centerX + 150 * Math.cos(angle);
        const y = centerY + 150 * Math.sin(angle);

        nodes.push({ id: i + 1, x: x, y: y, radius: 20 });
    }
    drawGraph();
}

function drawNode(node) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#3498db';
    ctx.fill();
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.id, node.x, node.y);
}

function drawEdges() {
    edges.forEach(edge => {
        const startNode = nodes.find(node => node.id === edge.start);
        const endNode = nodes.find(node => node.id === edge.end);

        if (startNode && endNode) {
            ctx.beginPath();
            ctx.moveTo(startNode.x, startNode.y);
            ctx.lineTo(endNode.x, endNode.y);
            ctx.strokeStyle = edge.color || '#2c3e50';
            ctx.lineWidth = 2;
            ctx.stroke();

            const midX = (startNode.x + endNode.x) / 2;
            const midY = (startNode.y + endNode.y) / 2;
            ctx.fillStyle = '#000';
            ctx.font = '12px Arial';
            ctx.fillText(edge.weight, midX, midY);
        }
    });
}

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawEdges();
    nodes.forEach(node => drawNode(node));
}

document.getElementById('start-visualizer').addEventListener('click', function () {
    const nodeCount = parseInt(document.getElementById('nodes').value);
    if (isNaN(nodeCount) || nodeCount < 1) {
        alert('Please enter a valid number of nodes.');
        return;
    }
    generateNodes(nodeCount);
});

function addEdgeToList(start, end, weight) {
    const edgeListElement = document.getElementById('edge-list');
    const newEdgeDiv = document.createElement('div');
    newEdgeDiv.classList.add('edge-entry');
    newEdgeDiv.textContent = `Edge: ${start} - ${end} | Weight: ${weight}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = function () {
        removeEdge(start, end, newEdgeDiv);
    };

    newEdgeDiv.appendChild(removeButton);
    edgeListElement.appendChild(newEdgeDiv);
}

document.getElementById('add-edge').addEventListener('click', function () {
    const edgeInput = document.getElementById('edge-input').value;
    const weightInput = parseInt(document.getElementById('weight').value);
    const [start, end] = edgeInput.split('-').map(Number);
    if (!isNaN(start) && !isNaN(end) && start !== end && !isNaN(weightInput)) {
        edges.push({ start, end, weight: weightInput });
                document.getElementById('edge-input').value = '';
        document.getElementById('weight').value = '';

        addEdgeToList(start, end, weightInput);
        drawGraph();
    } else {
        alert('Please enter a valid edge format (e.g., 1-2) and a weight.');
    }
});

function removeEdge(start, end, edgeDiv) {
    edges = edges.filter(edge => !(edge.start === start && edge.end === end));
    edgeDiv.remove();
    drawGraph();
}

// Helper function to find the parent of a node (for Kruskal's algorithm)
function findParent(parent, i) {
    if (parent[i] === i) return i;
    return parent[i] = findParent(parent, parent[i]);
}

// Helper function to union two subsets (for Kruskal's algorithm)
function union(parent, rank, x, y) {
    const rootX = findParent(parent, x);
    const rootY = findParent(parent, y);

    if (rank[rootX] < rank[rootY]) {
        parent[rootX] = rootY;
    } else if (rank[rootX] > rank[rootY]) {
        parent[rootY] = rootX;
    } else {
        parent[rootY] = rootX;
        rank[rootX]++;
    }
}

function kruskalMST() {
    // Sort edges by weight
    edges.sort((a, b) => a.weight - b.weight);

    const parent = [];
    const rank = [];
    const mst = [];

    // Initialize each node as its own parent (for union-find)
    nodes.forEach(node => {
        parent[node.id] = node.id;
        rank[node.id] = 0;
    });

    for (const edge of edges) {
        const { start, end, weight } = edge;

        const rootStart = findParent(parent, start);
        const rootEnd = findParent(parent, end);

        // Check if adding this edge creates a cycle
        if (rootStart !== rootEnd) {
            mst.push(edge);
            union(parent, rank, rootStart, rootEnd);

            // Color the edges in the MST for visualization
            edge.color = '#27ae60'; // Green color for MST edges
            drawGraph();
        }
    }

    return mst;
}

document.getElementById('find-path').addEventListener('click', function () {
    const mst = kruskalMST();

    // Display the result
    const resultDiv = document.getElementById('result');
    if (mst.length > 0) {
        const totalWeight = mst.reduce((sum, edge) => sum + edge.weight, 0);
        resultDiv.textContent = `Minimum Spanning Tree Total Weight: ${totalWeight}`;
    } else {
        resultDiv.textContent = 'No MST found (check connectivity of the graph)';
    }
});

// Initial draw of the graph (in case nodes are added before clicking start)
drawGraph();

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
