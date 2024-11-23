document.addEventListener("DOMContentLoaded", function() {
  const startBtn = document.getElementById("startBtn");
  const showCCodeBtn = document.getElementById("showCCodeBtn");
  const cCodePopup = document.getElementById("cCodePopup");
  const closePopup = document.querySelector(".close");
  const animationArea = document.getElementById("animationArea");
  const inputN = document.getElementById("inputN");

  // Start Visualization Button Click
  startBtn.addEventListener("click", function() {
    const n = parseInt(inputN.value);
    if (isNaN(n) || n < 1) {
      alert("Please enter a valid number!");
      return;
    }
    startFibonacciVisualization(n);
  });

  // Show C Code Button Click
  showCCodeBtn.addEventListener("click", function() {
    const n = parseInt(inputN.value);
    if (isNaN(n) || n < 1) {
      alert("Please enter a valid number!");
      return;
    }
    showCCode(n);
  });

  // Close the popup
  closePopup.addEventListener("click", function() {
    cCodePopup.style.display = "none";
  });

  // Fibonacci Visualization Animation
  function startFibonacciVisualization(n) {
    animationArea.innerHTML = ""; // Clear previous animation

    let fib = [0, 1]; // Initialize the first two Fibonacci numbers
    for (let i = 2; i < n; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
    }

    fib.forEach((num, index) => {
      setTimeout(() => {
        const stepDiv = document.createElement("div");
        stepDiv.className = "fibonacci-step";
        stepDiv.textContent = `F(${index}) = ${num}`;
        animationArea.appendChild(stepDiv);
      }, index * 1000); // Show one Fibonacci number per second
    });
  }

  // Show Fibonacci C Code in Pop
