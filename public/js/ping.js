var myAudio, myAudio2, myAudio3;
var play = false;
var startX, startY;
var endX, endY;
var moving = false;
var cnt = 0;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    myAudio.play(); play = true;
    alert(ev);
}

function move(ev) {
    play = true;
    moving = false;
    ev = ev || window.event;
    var x = ev.pageX, y = ev.pageY;
    var slide = 0;
    var flag = 1;
    if((startX - endX) == 0){
        if(startY < endY){
            flag = 3;
        }else{
            flag = 1;
        }
    }else{
        slide = (startY - endY) / (startX - endX);
        if(slide > -0.5 && startX > endX){
            flag = 1;
        }else if(slide < 0.5 && startX < endX){
            flag = 2;
        }else if((slide < -0.5 || slide > 0.5) && startY < endY){
            flag = 3;
        }
    }
    var color;
    cnt++;

    var draw = document.getElementById("pingcursor");
    draw.style.display = "none";  

    var ping = document.getElementById("ping");
    ping.style.zIndex = 101;
    ping.style.position = "absolute";
    ping.style.top = (startY)+"px";
    ping.style.left = (startX)+"px";
    
    callEmit(startX,startY,flag);
}

document.ondragover = function (ev) {
    ev = ev || window.event;
    var x = ev.pageX,
        y = ev.pageY;
    endX = x;
    endY = y;
    if (moving == false) {
        moving = true;
        startX = x; startY = y;
        var draw = document.getElementById("pingcursor");
        draw.style.zIndex = 100;
        draw.style.display = "inline-block";
        draw.style.position = "absolute";
        draw.style.top = (startY-75)+"px";
        draw.style.left = (startX-75)+"px";
    }
    if(moving == true){
        var flag = 0;
        if((startX - endX) == 0){
            if(startY < endY){
                flag = 3;
            }else{
                flag = 1;
            }
        }else{
            slide = (startY - endY) / (startX - endX);
            if(slide > -0.5 && startX > endX){
                flag = 1;
            }else if(slide < 0.5 && startX < endX){
                flag = 2;
            }else if((slide < -0.5 || slide > 0.5) && startY < endY){
                flag = 3;
            }
        }
        var draw = document.getElementById("pingcursor");
        if(flag == 1){
            draw.style.backgroundImage="url('images/ping1.png')";

        }else if(flag == 2){
            draw.style.backgroundImage="url('images/ping2.png')";
        }else if(flag == 3){
            draw.style.backgroundImage="url('images/ping3.png')";
        }
        draw.style.zIndex = 100;
        draw.style.display = "inline-block";
        draw.style.position = "absolute";
        draw.style.top = (startY-75)+"px";
        draw.style.left = (startX-75)+"px";
    }

    console.log(x, y);

}

// Create an <audio> element dynamically.
window.onload = function () {
    myAudio = document.getElementById("leson");
    myAudio.autoplay = false;
    myAudio.loop = false;

    myAudio2 = document.getElementById("leson2");
    myAudio2.autoplay = false;
    myAudio2.loop = false;

    myAudio3 = document.getElementById("leson3");
    myAudio3.autoplay = false;
    myAudio3.loop = false;

    //#issue2 prevent ghost image when drag imag
    // $("body > *").on("dragstart", function(e) {
    //     e.dataTransfer.setDragImage(element, -99999, -99999);
    // },false);

}