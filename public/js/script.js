$(document).ready(function(){
    function isNumber(s) {
      s += ''; // 문자열로 변환
      s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
      if (s == '' || isNaN(s)) return false;
      return true;
    }

    var roomNumber = document.location.pathname.substring(1);

    var title_id = roomNumber % 11 + 1;
    if(isNumber(title_id))
        $("#top_intro").css("background-image","url('images/room_title_"+title_id+".png')");
    else
        $("#top_intro").css("background-image","url('images/room_title_1.png')");
    var editors = $(".editor_div");
    var editor_arr = [];
    $("#roomNumber_lb").text("Room No."+roomNumber);

    $.each(editors,function(key,obj){
        var roomName = "room" + document.location.pathname.substring(1);
        var padName = "pad" + key;
        var documentName = roomName + padName;
        var editor = ace.edit(obj.id);
        editor_arr.push(editor);
        editor.$blockScrolling = Infinity;
        editor.setTheme("ace/theme/xcode");
        editor.session.setMode("ace/mode/java");
        editor.setOptions({
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true
        });
        var editor_num = eval(key+1);
        $('#mode_selector'+editor_num).on('change',function(){
          editor.getSession().setMode('ace/mode/' +$(this).val().toLowerCase());
        });

        $('#theme_selector'+editor_num).on('change',function(){
          editor.setTheme('ace/theme/' +$(this).val().toLowerCase());
        });

        sharejs.open(documentName, 'text', function(error, doc) {
             doc.attach_ace(editor);
        });
    })
})

var socket = io.connect();
socket.on('connect', function(data){
    socket.emit('join',"no"+document.location.pathname.substring(1))

    socket.on('ping',function(data){
        triggerping(data.xPos,data.yPos,data.number);
    })
})

function callEmit(x,y,flag){
    socket.emit('ping',{
        xPos : x,
        yPos : y,
        number : flag,
    });
}

function triggerping(x,y,flag){
    var color;
    var ping = document.getElementById("ping");

    if (flag == 1) {
        ping.style.top = (y-20)+"px";
        ping.style.left = (x-35)+"px";
        myAudio.play();
        color = "url('images/finger_icon.png')";
    } else if (flag == 2) {
        myAudio2.play();
        ping.style.top = (y-85)+"px";
        ping.style.left = (x-25)+"px";
        color = "url('images/flag_icon.png')";
    } else if(flag == 3){
        myAudio3.play();
        ping.style.top = (y-60)+"px";
        ping.style.left = (x-50)+"px";
        color = "url('images/exclamation_icon.png')";
    }
    ping.style.backgroundImage = color;
    ping.style.display = "inline-block";

    var ping2 = $("#ping");
    ping2.fadeIn(300);
    ping2.fadeOut(600);
}