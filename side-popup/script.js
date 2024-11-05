function openPopup() {
    document.getElementById("overlay").classList.add("active");
    document.getElementById("popup").classList.add("active");
}

function closePopup() {
    document.getElementById("overlay").classList.remove("active");
    document.getElementById("popup").classList.remove("active");
}

function showContent(contentId) {
    const sections = document.querySelectorAll('.content-section');
    const tabs = document.querySelectorAll('.tab');

    sections.forEach(section => {
        section.classList.remove('active');
    });

    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(contentId).classList.add('active');
    document.querySelector(`.tab[onclick="showContent('${contentId}')"]`).classList.add('active');
}


// Function to show code based on selected language
function showCode(language) {
    // Remove 'active' class from all buttons and code snippets
    const buttons = document.querySelectorAll('.tab-button');
    const snippets = document.querySelectorAll('.code-snippet');
    
    buttons.forEach(button => button.classList.remove('active'));
    snippets.forEach(snippet => snippet.classList.remove('active'));

    // Add 'active' class to selected language button and code snippet
    document.querySelector(`[onclick="showCode('${language}')"]`).classList.add('active');
    document.getElementById(language).classList.add('active');
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