window.addEventListener('load', () => {
    resize();
    document.addEventListener('mousemove', sketch);
    window.addEventListener('resize', resize);
});
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}
let coord = { x: 0, y: 0 };
let paint = true;
function getPosition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}
function startPainting(event) {
    paint = true;
    getPosition(event);
}
function stopPainting() {
    paint = false;
}
function sketch(event) {
    if (!paint) return;
    ctx.beginPath();
    ctx.lineWidth = 0.3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'grey';
    ctx.moveTo(coord.x, coord.y);
    getPosition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
}
