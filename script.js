function drawall(ctx, e, coords, canv, colour){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canv.width, canv.height );
    ctx.beginPath();
    coords.forEach(function(b){
        ctx.lineWidth = 20;
        ctx.fillStyle = colour;
        ctx.strokeStyle = colour;
        if (!b.break ) {
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
    });
    ctx.lineWidth = 1;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
    ctx.stroke();
}

$(function(){
    var
        canv = document.getElementById('canvas'),
        ctx = canv.getContext('2d'),
        colour = 'black',
        isMouseDown = false,
        coords = [];
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
    document.getElementById('color').oninput = function(){
        colour = this.value;
    }
    document.getElementById('clear').onclick = function(){
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canv.width, canv.height );
        ctx.beginPath();
        coords.length = 0;
    }
    canv.addEventListener('mousedown', function(e){
        isMouseDown = true;
        coords.push({x: e.clientX, y: e.clientY, break: true, z : colour});
    });
    canv.addEventListener('mouseup', function(e){
        isMouseDown = false;
    });
    canv.addEventListener('mousemove', function(e){
        drawall(ctx, e, coords, canv, colour);
        if (isMouseDown){
            coords.push({x: e.clientX, y: e.clientY,});
        }
    });
});