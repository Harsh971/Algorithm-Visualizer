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

            // Draw the weight in the center of the edge
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

    // Add a remove button next to each edge
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

function findShortestPath(start, end) {
    const distances = {};
    const previous = {};
    const queue = [];

    nodes.forEach(node => {
        distances[node.id] = Infinity;
        previous[node.id] = null;
        queue.push(node.id);
    });

    distances[start] = 0;

    while (queue.length > 0) {
        queue.sort((a, b) => distances[a] - distances[b]);
        const closest = queue.shift();

        if (closest === end) {
            let path = [];
            let u = end;
            while (previous[u] !== null) {
                path.unshift(u);
                u = previous[u];
            }
            path.unshift(start);
            return { path, distance: distances[end] };
        }

        edges.forEach(edge => {
            if (edge.start === closest || edge.end === closest) {
                const neighbor = edge.start === closest ? edge.end : edge.start;
                const alt = distances[closest] + edge.weight;
                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    previous[neighbor] = closest;
                }
            }
        });
    }
    return null;
}

document.getElementById('find-path').addEventListener('click', function () {
    const start = parseInt(document.getElementById('start-vertex').value);
    const end = parseInt(document.getElementById('end-vertex').value);

    if (isNaN(start) || isNaN(end)) {
        alert('Please enter valid start and end vertices.');
        return;
    }

    const result = findShortestPath(start, end);

    if (result) {
        document.getElementById('result').textContent = `Shortest Path: ${result.path.join(' -> ')} | Total Weight: ${result.distance}`;
        highlightPath(result.path);
    } else {
        document.getElementById('result').textContent = 'No path found.';
    }
});

function highlightPath(path) {
    drawGraph();
    for (let i = 0; i < path.length - 1; i++) {
        const start = path[i];
        const end = path[i + 1];
        edges.forEach(edge => {
            if ((edge.start === start && edge.end === end) || (edge.start === end && edge.end === start)) {
                edge.color = 'red';
            }
        });
    }
    drawGraph();
}
