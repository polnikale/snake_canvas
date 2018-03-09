const canvas = document.getElementById('snake');
let ctx = canvas.getContext('2d');
ctx.moveTo(0,0);
ctx.lineTo(500,500);
ctx.stroke();
ctx.moveTo(0,500);
ctx.lineTo(500,0);
ctx.stroke();