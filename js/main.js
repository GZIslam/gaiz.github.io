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
    ctx.arc(e.clientX - 340, e.clientY - 475, radius, 0, Math.PI * 2);
    ctx.stroke();
}
$(function(){
    var
        canv = document.getElementById('canvas'),
        ctx = canv.getContext('2d'),
        isMouseDown = false,
        radius = 10;
        coords = [];
        canv.width = 1800;
        canv.height = 700;
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
        coords.push({x: e.clientX - 340, y: e.clientY- 475, break: true, radius: radius});
    });
    canv.addEventListener('mouseup', function(e){
        isMouseDown = false;
        drawall(ctx, e, coords, canv, radius);
    });
    canv.addEventListener('mousemove', function(e){
        drawall(ctx, e, coords, canv, radius);
        if (isMouseDown){
            coords.push({x: e.clientX - 340, y: e.clientY- 475, radius: radius});
        }
    });
    document.addEventListener('keydown', function(e){
        if (e.keyCode === 46){
            coords.length = 0;
            drawall(ctx, e, coords, canv, radius);
        }
    })
});
window.onload = function() {
    document.addEventListener('keydown', changeDirection);
    setInterval(loop, 1000/60); // 60 FPS
}
    var
        canver = document.getElementById('canvassnake'),
        ctxer = canver.getContext('2d'),
        gamestart = firstkeypress = false,
        cooldown = false,
        deltax = 850,
        tail = 400,
        xv = 0,
        yv = 0,
        speed = 10,
        playerw = 20,
        playerh = 20,
        deltay = 0;
        canver.width = 1800;
        canver.height = 700;
        coordser = [];
    function loop(){
        ctxer.fillStyle = '#090909';
        ctxer.fillRect(0, 0, canver.width, canver.height);

        deltax += xv;
        deltay += yv;

        if (deltax > canver.width)
            {deltax = 0;}
        if (deltax < 0)
            {deltax = canver.width}
        if (deltay > canver.height)
            {deltay = 0;}
        if (deltay < 0)
            {deltay = canerv.height;}

        ctxer.fillStyle = 'lime';
        for (let i = 0; i < coordser.length; i++){
            ctxer.fillStyle = coordser[i].color || 'lime';
            ctxer.fillRect(coords[i].x, coordser[i].y, playerw, playerh);
        }
        coordser.push({x: deltax, y: deltay, color: ctxer.fillStyle});

        if (coordser.length > tail){
            coordser.shift();
        }
    }
    function changeDirection(evt) {
        if( !firstkeypress && [37,38,39,40].indexOf(evt.keyCode) > -1 )
        {
            setTimeout(function() {gamestart = true;}, 1000);
            firstkeypress = true;
        }
        if( cooldown )
        {return false;}

        /*
          4 directional movement.
         */
        if( evt.keyCode == 37 && !(xv > 0) ) // left arrow
        {xv = -speed; yv = 0;}

        if( evt.keyCode == 38 && !(yv > 0) ) // top arrow
        {xv = 0; yv = -speed;}

        if( evt.keyCode == 39 && !(xv < 0) ) // right arrow
        {xv = speed; yv = 0;}

        if( evt.keyCode == 40 && !(yv < 0) ) // down arrow
        {xv = 0; yv = speed;}

        cooldown = true;
        setTimeout(function() {cooldown = false;}, 100);

    }
