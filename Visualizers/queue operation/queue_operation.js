const queue = [];
const operations = [];
const maxSizeInput = document.getElementById('queue-size');
const queueVisual = document.getElementById('queue-visual');
const codeSnippet = document.getElementById('code-snippet');
const outputLog = document.getElementById('output-log');
const codeModal = document.getElementById('code-modal');

function enqueueToQueue() {
    const maxSize = parseInt(maxSizeInput.value);
    const valueInput = document.getElementById('queue-value');
    const value = parseInt(valueInput.value);

    if (!maxSize || isNaN(value)) {
        alert("Give proper input");
        return;
    }

    if (queue.length < maxSize) {
        queue.push(value);
        operations.push(`queue.push(${value});`);

        const itemDiv = document.createElement('div');
        itemDiv.className = 'queue-item';
        itemDiv.textContent = value;
        queueVisual.appendChild(itemDiv);

        valueInput.value = '';
        logOperation(`Enqueued ${value}`);

        // Automatically scroll to the end of the queue
        queueVisual.scrollLeft = queueVisual.scrollWidth;
    } else {
        alert("Queue is full!");
    }
}

function dequeueFromQueue() {
    if (queue.length > 0) {
        const dequeuedValue = queue.shift();
        operations.push(`queue.pop(); // removed ${dequeuedValue}`);

        queueVisual.removeChild(queueVisual.firstChild);
        logOperation(`Dequeued ${dequeuedValue}`);
    } else {
        alert("Queue is empty!");
    }
}

function showSize() {
    operations.push(`std::cout << "Queue size: " << queue.size() << std::endl;`);
    logOperation(`Current queue size: ${queue.length}`);
}

function checkEmpty() {
    const emptyCheck = queue.length === 0 ? "empty" : "not empty";
    operations.push(`std::cout << "Queue is " << (queue.empty() ? "empty" : "not empty") << std::endl;`);
    logOperation(`Queue is ${emptyCheck}`);
}

function logOperation(message) {
    outputLog.innerHTML = ''; // Clear previous entry to display only last operation
    const logEntry = document.createElement('div');
    logEntry.className = 'output-log-entry';
    logEntry.textContent = message;
    outputLog.appendChild(logEntry);
    logEntry.style.display = 'block';
}

function showCode() {
    const n = parseInt(maxSizeInput.value) || 0;
    const codeCPlusPlus = `
#include &lt;queue&gt;
#include &lt;iostream&gt;

int main() {
    std::queue&lt;int&gt; queue;
    int n = ${n};  // Max number of elements
    
    ${operations.join('\n    ')}

    return 0;
}
    `.trim();

    codeSnippet.innerHTML = `<pre>${codeCPlusPlus}</pre>`;
    codeModal.style.display = 'block';  // Show modal
}

function closeCodeModal() {
    codeModal.style.display = 'none';  // Close modal
}

// Close modal when clicking outside of modal content
window.onclick = function(event) {
    if (event.target === codeModal) {
        codeModal.style.display = 'none';
    }
};
