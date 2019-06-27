function drawall(ctx, e, coords, canv, radius){
    ctx.fillStyle = "#090909";
    ctx.fillRect(0, 0, canv.width, canv.height );
    ctx.beginPath();
    coords.forEach(function(b){
        ctx.lineWidth = b.radius *2;
        ctx.fillStyle = 'yellow';
        ctx.strokeStyle = 'yellow';
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
    ctx.arc(e.clientX -337, e.clientY - 407, radius, 0, Math.PI * 2);
    ctx.stroke();
}
$(function(){
    var
        canv = document.getElementById('canvas'),
        ctx = canv.getContext('2d'),
        isMouseDown = false,
        radius = 10;
        coords = [];
        canv.width = 1200;
        canv.height = 400;
    document.onwheel = function(e){
        if (e.deltaY > 0){
            radius = radius - 5;
            if( radius < 2){
                radius = radius + 5;
            }
        }
        else{
            radius = radius + 5;
        }
        drawall(ctx, e, coords, canv, radius);
    }
    canv.addEventListener('mousedown', function(e){
        isMouseDown = true;
        coords.push({x: e.clientX -337, y: e.clientY-407, break: true, radius: radius});
    });
    canv.addEventListener('mouseup', function(e){
        isMouseDown = false;
        drawall(ctx, e, coords, canv, radius);
    });
    canv.addEventListener('mousemove', function(e){
        drawall(ctx, e, coords, canv, radius);
        if (isMouseDown){
            coords.push({x: e.clientX -337, y: e.clientY-407, radius: radius});
        }
    });
    document.addEventListener('keydown', function(e){
        if (e.keyCode === 46){
            coords.length = 0;
            drawall(ctx, e, coords, canv, radius);
        }
    })
});
