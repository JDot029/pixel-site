document.addEventListener('DOMContentLoaded', function () {
    const canvasContainer = document.getElementById('canvasContainer');
    const canvas = document.getElementById('pixelCanvas');
    const ctx = canvas.getContext('2d');
    const colorPaletteDiv = document.getElementById('colorPalette');
    const gridSize = 1000; //CANVAS GRÖßE
    const pixelSize = 10; //PIXEL GRÖßE
    const cellSize = gridSize / pixelSize;
    let selectedColor = '#000000';
    let isDrawing = false;

    canvas.width = gridSize;
    canvas.height = gridSize;

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('mouseleave', handleEnd);

    canvas.addEventListener('touchstart', handleStart);
    canvas.addEventListener('touchmove', handleMove);
    canvas.addEventListener('touchend', handleEnd);
    canvas.addEventListener('touchcancel', handleEnd);

    const colorPalette = [
        '#ffffff', '#e4e4e4', '#c4c4c4', '#888888', '#4e4e4e', '#000000',
        '#f4b3ae', '#ffa7d1', '#ff54b2', '#ff6565', '#e50000', '#9a0000',
        '#fea460', '#e59500', '#a06a42', '#604028', '#f5dfb0', '#fff889',
        '#e5d900', '#94e044', '#02be01', '#688338', '#006513', '#cae3ff',
        '#00d3dd', '#0083c7', '#0000ea', '#191973', '#cf6ee4', '#820080'
    ];

    colorPalette.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = color;
        colorBox.addEventListener('click', () => {
            selectedColor = color;
        });
        colorPaletteDiv.appendChild(colorBox);
    });
    
    function handleColorClick(e) {
        selectedColor = e.target.style.backgroundColor;
    }
    
    colorPaletteDiv.addEventListener('click', handleColorClick);
  
    function handleStart(e) {
        isDrawing = true;
        drawPixel(getEventX(e), getEventY(e));
        e.preventDefault();
    }

    function handleMove(e) {
        if (isDrawing) {
            drawPixel(getEventX(e), getEventY(e));
            e.preventDefault();
        }
    }

    function handleEnd() {
        isDrawing = false;
        // Fügen Sie hier den Aufruf zum Speichern des Bildes hinzu
        saveImage();
    }

    function drawPixel(x, y) {
        const rect = canvas.getBoundingClientRect();
        const pixelX = Math.floor((x - rect.left) / pixelSize) * pixelSize;
        const pixelY = Math.floor((y - rect.top) / pixelSize) * pixelSize;

        ctx.fillStyle = selectedColor;
        ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize);

        socket.emit('drawPixel', { x: pixelX, y: pixelY, color: selectedColor });
    }

    const socket = io();

    socket.on('drawPixel', (data) => {
        ctx.fillStyle = data.color;
        ctx.fillRect(data.x, data.y, pixelSize, pixelSize);
    });

    setInterval(loadImage, 5000);

    function loadImage() {
        const image = new Image();
        image.src = `/image/main-canvas?_=${new Date().getTime()}`;

        image.onload = function () {
            ctx.drawImage(image, 0, 0, gridSize, gridSize);
        };
    }

    function saveImage() {
        const imageData = canvas.toDataURL('image/png');
        fetch('/save/main-canvas.png', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: imageData }),
        })
            .then(response => {
                if (!response.ok) {
                    console.error('Failed to save image');
                }
            })
            .catch(error => console.error(error));
    }

    loadImage();

    function getEventX(event) {
        return event.clientX || (event.touches && event.touches[0].clientX);
    }

    function getEventY(event) {
        return event.clientY || (event.touches && event.touches[0].clientY);
    }
});
