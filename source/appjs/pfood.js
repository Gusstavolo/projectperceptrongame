var i = 0;

let playerPOSX = player.offsetLeft;
let playerPOSY = player.offsetTop;

var elem = document.getElementById("myBar");
var width = 1;




function food() {
    elem.style.width = elem.offsetWidth - width + 'px';
    console.log(elem.style.width);
}


function movefood() {

    if(playerPOSX != player.style.left){
        food();
        playerPOSX = player.style.left;

    }

    if(playerPOSY != player.style.top){
        
        food();
        playerPOSY = player.style.top;
        
    }   
}



