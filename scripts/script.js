const box = document.querySelector(".float-image");

let targetX = 0, targetY = 0, targetTiltX = 0, targetTiltY = 0;
let currentX = 0, currentY = 0, currentTiltX = 0, currentTiltY = 0;
const speed = 0.1; // 0 = instant, 1 = no movement

// Update target values on mouse move
document.addEventListener("mousemove", (event) => {
    const moveSpeed = 0.25;
    const xMove = (event.clientX - window.innerWidth / 2) * moveSpeed;
    const yMove = (event.clientY - window.innerHeight / 2) * moveSpeed;

    const xTilt = (event.clientX / window.innerWidth - 0.5) * 30;
    const yTilt = (event.clientY / window.innerHeight - 0.5) * -30;

    targetX = xMove;
    targetY = yMove;
    targetTiltX = yTilt;
    targetTiltY = xTilt;
});

// Reset target values when cursor leaves window
document.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
    targetTiltX = 0;
    targetTiltY = 0;
});

// Animate smoothly
function animate() {
    // Lerp current values towards target values
    currentX += (targetX - currentX) * speed;
    currentY += (targetY - currentY) * speed;
    currentTiltX += (targetTiltX - currentTiltX) * speed;
    currentTiltY += (targetTiltY - currentTiltY) * speed;

    // Apply transform
    box.style.transform = `
        perspective(1000px)
        translate(${currentX}px, ${currentY}px)
        rotateX(${currentTiltX}deg)
        rotateY(${currentTiltY}deg)
    `;

    // Apply dynamic shadow
    box.style.filter = `drop-shadow(${currentTiltY / 2}px ${-currentTiltX / 2}px 25px rgba(0,0,0,0.4))`;

    requestAnimationFrame(animate);
}

// Start animation loop
animate();