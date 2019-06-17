function drawall(ctx, e, coords, canv, count){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canv.width, canv.height );
    ctx.beginPath();
    coords.forEach(function(b){
        ctx.lineWidth = b.count *2;
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        if (!b.break ) {
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.count, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
    });
    ctx.lineWidth = 1;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, count, 0, Math.PI * 2);
    ctx.stroke();
}

$(function(){
    var
        canv = document.getElementById('canvas'),
        ctx = canv.getContext('2d'),
        isMouseDown = false,
        count = 10;
        coords = [];
    canv.width = window.innerWidth ;
    canv.height = window.innerHeight;
    function clear()
    {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canv.width, canv.height );
        ctx.beginPath();
        coords.length = 0;
    }
    document.onwheel = function(event){
        if (event.deltaY > 0){
            count--;
            if( count < 5){
                count ++;
            }
        }
        else{
            count++;
        }
    }
    canv.addEventListener('mousedown', function(e){
        isMouseDown = true;
        coords.push({x: e.clientX, y: e.clientY, break: true, count: count});
    });
    canv.addEventListener('mouseup', function(e){
        isMouseDown = false;
    });
    canv.addEventListener('mousemove', function(e){
        drawall(ctx, e, coords, canv, count);
        if (isMouseDown){
            coords.push({x: e.clientX, y: e.clientY, count: count});
        }
    });
    document.addEventListener('keydown', function(e){
        if(e.keyCode === 46){
            clear();
            console.log('Cleared');
        }
    })
});