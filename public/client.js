const socket = io();
console.log("connected");// Connect to server

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

console.log("test");
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Start drawing
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

// Drawing in progress
canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;

  const currentX = e.offsetX;
  const currentY = e.offsetY;

  // Draw locally
  drawLine(lastX, lastY, currentX, currentY);

  // Emit to server
  socket.emit('draw', {
    start: { x: lastX, y: lastY },
    end: { x: currentX, y: currentY }
  });

  lastX = currentX;
  lastY = currentY;
});

// Stop drawing
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

canvas.addEventListener('mouseleave', () => {
  isDrawing = false;
});

// Function to draw a line
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}

// Listen for draw events from server
socket.on('draw', (data) => {
  drawLine(data.start.x, data.start.y, data.end.x, data.end.y);
});

