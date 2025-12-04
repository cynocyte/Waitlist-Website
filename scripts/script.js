const box = document.querySelector(".float-image");

let targetX = 0, targetY = 0, targetTiltX = 0, targetTiltY = 0;
let currentX = 0, currentY = 0, currentTiltX = 0, currentTiltY = 0;
const speed = 0.1; // smoothing factor

// -----------------------------------------------------
// DESKTOP MODE: MOUSE CONTROL
// -----------------------------------------------------
function enableMouseControl() {
    document.addEventListener("mousemove", mouseHandler);
    document.addEventListener("mouseleave", resetPosition);
}

function mouseHandler(event) {
    const moveSpeed = 0.25;
    const xMove = (event.clientX - window.innerWidth / 2) * moveSpeed;
    const yMove = (event.clientY - window.innerHeight / 2) * moveSpeed;

    const xTilt = (event.clientX / window.innerWidth - 0.5) * 30;
    const yTilt = (event.clientY / window.innerHeight - 0.5) * -30;

    targetX = xMove;
    targetY = yMove;
    targetTiltX = yTilt;
    targetTiltY = xTilt;
}

function resetPosition() {
    targetX = 0;
    targetY = 0;
    targetTiltX = 0;
    targetTiltY = 0;
}

// -----------------------------------------------------
// MOBILE MODE: TOUCH CONTROL
// -----------------------------------------------------
function enableTouchControl() {
    document.addEventListener("touchmove", touchHandler);
    document.addEventListener("touchend", resetPosition);
}

function touchHandler(event) {
    if (event.touches.length > 0) {
        const touch = event.touches[0];

        const moveSpeed = 0.35; // slightly stronger on touch
        const xMove = (touch.clientX - window.innerWidth / 2) * moveSpeed;
        const yMove = (touch.clientY - window.innerHeight / 2) * moveSpeed;

        const xTilt = (touch.clientX / window.innerWidth - 0.5) * 30;
        const yTilt = (touch.clientY / window.innerHeight - 0.5) * -30;

        targetX = xMove;
        targetY = yMove;
        targetTiltX = yTilt;
        targetTiltY = xTilt;
    }
}

// -----------------------------------------------------
// DEVICE MODE SWITCH (Desktop / Mobile)
// -----------------------------------------------------
if (window.innerWidth < 850) {
    enableTouchControl();
} else {
    enableMouseControl();
}

// -----------------------------------------------------
// ANIMATION LOOP
// -----------------------------------------------------
function animate() {
    currentX += (targetX - currentX) * speed;
    currentY += (targetY - currentY) * speed;
    currentTiltX += (targetTiltX - currentTiltX) * speed;
    currentTiltY += (targetTiltY - currentTiltY) * speed;

    box.style.transform = `
        perspective(1000px)
        translate(${currentX}px, ${currentY}px)
        rotateX(${currentTiltX}deg)
        rotateY(${currentTiltY}deg)
    `;

    box.style.filter = `drop-shadow(${currentTiltY / 2}px ${-currentTiltX / 2}px 25px rgba(0,0,0,0.4))`;

    requestAnimationFrame(animate);
}

animate();
