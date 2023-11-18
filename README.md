Pixel-Site
============

Description:
-----------
Pixel-Site is a basic and stripeed down variant of r/Place.
It is written in Javascript and doesn't require much power to run.

How to configure an run  (Windows / Linux):
------------------------
-> install node.js

-> To start the server, open terminal and type: ```node server.js```. Then the server will be opened at the port 3000

-> Now you can open your browser at: https://localhost:3000 to use the page

-> The port can be changed in the ```.\server.js```:

```
const port = 3000; // (Default 3000)
```

-> The canvas Size and the Pixel size can be set in the ```.\public\script.js```:
```
    const gridSize = X; // Grid / Canvas Size (Default 1000)
    const pixelSize = X; // Pixel Size (Default 10)
```

-> The color palette can also be changed:
```
    const colorPalette = [
        '#ffffff', '#e4e4e4', '#c4c4c4', '#888888', '#4e4e4e', '#000000',
        '#f4b3ae', '#ffa7d1', '#ff54b2', '#ff6565', '#e50000', '#9a0000',
        '#fea460', '#e59500', '#a06a42', '#604028', '#f5dfb0', '#fff889',
        '#e5d900', '#94e044', '#02be01', '#688338', '#006513', '#cae3ff',
        '#00d3dd', '#0083c7', '#0000ea', '#191973', '#cf6ee4', '#820080'
    ];
```
Replace the colors with your own. Maximum 16.

Canvas editing:
---------------

-> The canvas is stored in ```.\public\main-canvas.png```

-> When the server is shut down, you can delete the main-canvas.png to reset the canvas. Manual edits can also be done.
