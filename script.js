function drawall(ctx, e, coords, canv, radius){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canv.width, canv.height );
    ctx.beginPath();
    coords.forEach(function(b){
        ctx.lineWidth = b.radius *2;
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
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

function clear(ctx, e, coords, canv, radius)
{
    coords.forEach(function(b){
        ctx.lineWidth = b.radius *2;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';
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
    coords.length = 0;
}

$(function(){
    var
        canv = document.getElementById('canvas'),
        ctx = canv.getContext('2d'),
        isMouseDown = false,
        radius = 10;
        coords = [];
    canv.width = window.innerWidth ;
    canv.height = window.innerHeight;
    document.onwheel = function(e){
        if (e.deltaY > 0){
            radius--;
            if( radius < 5){
                radius ++;
            }
        }
        else{
            radius++;
        }
        drawall(ctx, e, coords, canv, radius);
    }
    canv.addEventListener('mousedown', function(e){
        isMouseDown = true;
        coords.push({x: e.clientX, y: e.clientY, break: true, radius: radius});
    });
    canv.addEventListener('mouseup', function(e){
        isMouseDown = false;
        drawall(ctx, e, coords, canv, radius);
    });
    canv.addEventListener('mousemove', function(e){
        drawall(ctx, e, coords, canv, radius);
        if (isMouseDown){
            coords.push({x: e.clientX, y: e.clientY, radius: radius});
        }
    });
    document.addEventListener('keydown', function(e){
        if(e.keyCode === 46){
            clear(ctx, e, coords, canv, radius);
            console.log('Cleared');
        }
    })
});