const stack = [];
const operations = [];
const maxSizeInput = document.getElementById('stack-size');
const stackVisual = document.getElementById('stack-visual');
const codeSnippet = document.getElementById('code-snippet');

function pushToStack() {
    const maxSize = parseInt(maxSizeInput.value);
    const valueInput = document.getElementById('stack-value');
    const value = parseInt(valueInput.value);

    if (!maxSize || isNaN(value)) {
        alert("Give proper input");
        return;
    }

    if (stack.length < maxSize) {
        stack.push(value);
        operations.push(`stack.push(${value});`);

        const itemDiv = document.createElement('div');
        itemDiv.className = 'stack-item';
        itemDiv.textContent = value;
        stackVisual.appendChild(itemDiv);

        const arrow = document.createElement('div');
        arrow.className = 'arrow push';
        arrow.textContent = '↓';
        itemDiv.appendChild(arrow);

        valueInput.value = '';  // Clear the input after pushing
    } else {
        alert("Stack is full!");
    }
}

function popFromStack() {
    if (stack.length > 0) {
        const poppedValue = stack.pop();
        operations.push(`stack.pop(); // removed ${poppedValue}`);

        const lastItem = stackVisual.lastChild;
        
        const arrow = document.createElement('div');
        arrow.className = 'arrow pop';
        arrow.textContent = '↑';
        lastItem.appendChild(arrow);

        setTimeout(() => {
            stackVisual.removeChild(lastItem);
        }, 1000);
    } else {
        alert("Stack is empty!");
    }
}

function showSize() {
    operations.push(`std::cout << "Stack size: " << stack.size() << std::endl;`);
    alert("Current stack size: " + stack.length);
}

function checkEmpty() {
    const emptyCheck = stack.length === 0 ? "empty" : "not empty";
    operations.push(`std::cout << "Stack is " << (stack.empty() ? "empty" : "not empty") << std::endl;`);
    alert(stack.length === 0 ? "Stack is empty" : "Stack is not empty");
}

function showCode() {
    const n = parseInt(maxSizeInput.value) || 0;
    const codeCPlusPlus = `
#include &lt;stack&gt;
#include &lt;iostream&gt;

int main() {
    std::stack&lt;int&gt; stack;
    int n = ${n};  // Max number of elements
    
    ${operations.join('\n    ')}

    return 0;
}
    `.trim();

    codeSnippet.style.display = 'block';
    codeSnippet.innerHTML = `<pre>${codeCPlusPlus}</pre>`;
}
