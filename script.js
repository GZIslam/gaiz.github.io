function drawall(ctx, e, coords, canv, color, radius){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canv.width, canv.height );
    ctx.beginPath();
    coords.forEach(function(b){
        ctx.lineWidth = b.radius * 2;
        ctx.fillStyle = b.color;
        ctx.strokeStyle = b.color;
        if (!b.break ) {
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
    });
    ctx.lineWidth = 1;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI * 2);
    ctx.stroke();
}

$(function(){
    var
        canv = document.getElementById('canvas'),
        ctx = canv.getContext('2d'),
        color = 'black',
        radius = 10,
        isMouseDown = false,
        coords = [];
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
    document.getElementById('color').oninput = function(){
        color = this.value;
    }
    document.getElementById('radius').oninput = function(){
        radius = this.value;
    }
    document.getElementById('clear').onclick = function(){
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canv.width, canv.height );
        ctx.beginPath();
        coords.length = 0;
    }
    canv.addEventListener('mousedown', function(e){
        isMouseDown = true;
        coords.push({x: e.clientX, y: e.clientY, break: true, color: color, radius: radius});
    });
    canv.addEventListener('mouseup', function(e){
        isMouseDown = false;
    });
    canv.addEventListener('mousemove', function(e){
        drawall(ctx, e, coords, canv, color, radius);
        if (isMouseDown){
            coords.push({x: e.clientX, y: e.clientY, color: color, radius: radius});
        }
    });
});