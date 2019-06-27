$(function(){
  function drawall(ctx, e, coords, canv, radius){
      ctx.fillStyle = "#090909";
      ctx.fillRect(0, 0, canv.width, canv.height );
      ctx.beginPath(),
      coords.forEach(function(b){
          ctx.lineWidth = b.radius *2;
          ctx.fillStyle = mycolor;
          ctx.strokeStyle = mycolor;
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
    var
        canv = document.getElementById('canvas'),
        ctx = canv.getContext('2d'),
        mycolor = 'yellow';
        isMouseDown = false,
        radius = 10,
        coords = [];
        document.getElementById('color').oninput = function () {
          mycolor = this.value;
        }
        coords [1] = {x: 795, y: 185, break: true, radius: 20},
coords[2]= {x: 480, y: 249, break: true, radius: 20},
coords[3]={x: 710, y: 304, break: true, radius: 20},
coords[4]= {x: 605, y: 176, break: true, radius: 70},
coords[5]= {x: 215, y: 276, break: true, radius: 45},
coords[6]= {x: 1033, y: 155, break: true, radius: 90},
coords[7]= {x: 921, y: 301, break: true, radius: 70},
coords[8]={x: 110, y: 64, break: true, radius: 25},
        canv.width = 1200;
        canv.height = 400;
    document.onwheel = function(e){
        if (e.deltaY > 0 && e.altKey){
            radius = radius - 5;
            if( radius < 2){
                radius = radius + 5;
            }
        }
        if(e.deltaY < 0 && e.altKey){
            radius = radius + 5;
        }
        drawall(ctx, e, coords, canv, radius, mycolor);
    }
    canv.addEventListener('mousedown', function(e){
        isMouseDown = true;
        coords.push({x: e.clientX -337, y: e.clientY-407, break: true, radius: radius, mycolor: mycolor});
    });
    canv.addEventListener('mouseup', function(e){
        isMouseDown = false;
        drawall(ctx, e, coords, canv, radius, mycolor);
    });
    canv.addEventListener('mousemove', function(e){
        drawall(ctx, e, coords, canv, radius, mycolor);
        if (isMouseDown){
            coords.push({x: e.clientX -337, y: e.clientY-407, radius: radius, mycolor: mycolor});
        }
    });
    document.addEventListener('keydown', function(e){
        if (e.keyCode === 46){
            coords.length = 0;
            drawall(ctx, e, coords, canv, radius);
        }
    })
});
