function drawall(ctx, e, coords, canv,){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canv.width, canv.height );
    ctx.beginPath();
    coords.forEach(function(b){
        ctx.lineWidth = 20;
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
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
        isMouseDown = false,
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
    canv.addEventListener('mousedown', function(e){
        isMouseDown = true;
        coords.push({x: e.clientX, y: e.clientY, break: true});
    });
    canv.addEventListener('mouseup', function(e){
        isMouseDown = false;
    });
    canv.addEventListener('mousemove', function(e){
        drawall(ctx, e, coords, canv);
        if (isMouseDown){
            coords.push({x: e.clientX, y: e.clientY});
        }
    });
    document.addEventListener('keydown', function(e){
        if(e.keyCode === 46){
            clear();
            console.log('Cleared');
        }
    })
});