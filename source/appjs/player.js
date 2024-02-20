const player = document.getElementById("player");
const floor = document.getElementById('floorID');
const ctxd = player.getContext("2d");

const value = document.querySelector("#value");
const input = document.querySelector("#pi_input");

var max_floor_width = floor.offsetWidth - 10;
var max_floor_height = floor.offsetHeight - 30;
var min_floor_width = 0;
var min_floor_height = -20;



var playerspeed = 10;

const playerP = 10;


function calcularComandos(xAtual, yAtual, xFinal, yFinal) {
    let comandos = [];

    // calcular diferenças
    let diffX = xFinal - xAtual;
    let diffY = yFinal - yAtual;

    // gera comandos baseados nos valores binários
    while (xAtual !== xFinal || yAtual !== yFinal) {
        if (xAtual !== xFinal && Math.abs(diffX) > Math.abs(diffY)) {
            xAtual += Math.sign(diffX);
            comandos.push({ x: xAtual, y: yAtual });
        } else if (yAtual !== yFinal && Math.abs(diffY) > Math.abs(diffX)) {
            yAtual += Math.sign(diffY);
            comandos.push({ x: xAtual, y: yAtual });
        } else {
            // Caso os eixos tenham a mesma diferença, priorize um aleatório
            let random = Math.random();
            if (random < 0.5 && xAtual !== xFinal) {
                xAtual += Math.sign(diffX);
                comandos.push({ x: xAtual, y: yAtual });
            } else if (yAtual !== yFinal) {
                yAtual += Math.sign(diffY);
               comandos.push({ x: xAtual, y: yAtual });
            }
        }
    }

    return comandos;
}




var duracao = 500;

var xCAMINHO;
var yCAMINHO;
var comandosY;
var comandosX;
var comandos;
function updatePosRamdom() {
    // gera um caminho aleatorio
     xCAMINHO = Math.floor(Math.random() * (max_floor_width - (min_floor_width)) + min_floor_width);
     yCAMINHO = Math.floor(Math.random() * (max_floor_height - (min_floor_height)) + min_floor_height);
     //calcular o caminho
     comandosY = calcularComandos(player.offsetLeft, player.offsetTop, player.offsetLeft, yCAMINHO);
     comandosX = calcularComandos(player.offsetLeft, player.offsetTop, xCAMINHO, player.offsetLeft);

     comandos = calcularComandos(player.offsetLeft, player.offsetTop, xCAMINHO, yCAMINHO);
    }

// mover o player suavemente
function moverPlayer(destX, destY, duration) {
    var startX = player.offsetLeft;
    var startY = player.offsetTop;
    var startTime = Date.now();

    function move() {
        var currentTime = Date.now();
        var elapsedTime = currentTime - startTime;
        var progress = Math.min(elapsedTime / duration, 1); // Limita o progresso a 1
        var newX = startX + (destX - startX) * progress;
        var newY = startY + (destY - startY) * progress;

        player.style.left = newX + 'px';
        player.style.top = newY + 'px';

        if (progress < 1) {
            requestAnimationFrame(move);
        }
    }

    move();
}


//moverPlayer(destinoX, destinoY, duracao);




function moveUP() {
        /*
        inputs, 1. verifica se o player esta no limite de altura
        se 1 nao esta
        se 0 esta
        */
         let i1 = player.offsetTop > min_floor_height ? 1 : 0;

         const threshold = 0.4;
         const inputs = [i1];
         const weights = [0.5];

         let sum = 0;

         for (let i = 0; i < inputs.length; i++) {
           sum += inputs[i] * weights[i];
        }

        let output = sum > threshold ? 1 : 0;
        if(output == 1){
            
            moverPlayer(player.offsetLeft, player.offsetTop - playerP, duracao );
          //  player.style.top = (player.offsetTop - playerspeed) + 'px';
        }

        return { a: output, b: player.style.top};
}
function moveDAWN(){
    let i1 = player.offsetTop < max_floor_height ? 1 : 0;

    const threshold = 0.4;
    const inputs = [i1];
    const weights = [0.5];

    let sum = 0;

    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * weights[i];
   }

   let output = sum > threshold ? 1 : 0;
   if(output == 1){
    moverPlayer(player.offsetLeft,player.offsetTop + playerP, duracao );
    //player.style.top = (player.offsetTop + playerspeed) + 'px';
}


   return { a: output, b: player.style.top};

}
function moveLEFT() {
    let i1 =  player.offsetLeft > min_floor_width ? 1 : 0;
    

    const threshold = 0.4;
    const inputs = [i1];
    const weights = [0.5];

    let sum = 0;

    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * weights[i];
   }

   let output = sum > threshold ? 1 : 0;
   if(output ==1){
    moverPlayer(player.offsetLeft - playerP, player.offsetTop, duracao );
    //player.style.left = (player.offsetLeft - playerspeed) + 'px';
   }
   return { a: output, b: player.style.left};
}
function moveRIGHT(){
    let i1 = player.offsetLeft < max_floor_width ? 1 : 0;

    const threshold = 0.4;
    const inputs = [i1];
    const weights = [0.5];

    let sum = 0;

    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * weights[i];
   }

   let output = sum > threshold ? 1 : 0;
   if(output ==1){
    moverPlayer( player.offsetLeft + playerP, player.offsetTop, duracao );
    //player.style.left = (player.offsetLeft + playerspeed) + 'px';
   }

   return { a: output, b: player.style.left };
}

function playerstatusmove() {
    const threshold = 0.1;
    const inputs = [moveUP().a,moveDAWN().a,moveLEFT().a,moveRIGHT().a];
    const weights = [0.5,0.4,0.3,0.2];

    let sum = 0;

    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * weights[i];
   }
   let output = sum > threshold ? 1 : 0;

   var moveOn = Math.floor(Math.random() * (inputs.length - 0) + 0);
   switch(output) {
    case 1:
            switch(moveOn) {
                case 0:
                    moveUP();
                    break;
                case 1:
                    moveDAWN();
                    break;
                case 2:
                    moveLEFT();
                    break;
                case 3:
                    moveRIGHT();
                    break;
            }
             break;
    
    case 11:

        break;
   }
}




function movePass() {
    updatePosRamdom();
    /*
    inputs, 1. verifica se o player esta no limite de altura
    se 1 nao esta
    se 0 esta
    */
     let i1 = player.offsetTop > min_floor_height ? 1 : 0;
     let ii1 = player.offsetTop < max_floor_height ? 1 : 0;

     let r1 = player.offsetTop > yCAMINHO ? 1 : 0;
     let rr2 = player.offsetTop < yCAMINHO ? 1 : 0;
     /*
     possibilidades
    i1 = 0.5
    ii1 = 0.4

     i1 + ii1 = 0.9
     i1 + ii1 + r1(se for menor aumenta) = 1.9
     i1 + ii1 + rr2(se for maior diminui) = 1.1
     i1 + r1 = 1.5
     i1 + rr2 = 0.7
     ii1 + r1 = 1.4
     ii1 + rr2 = 0.6

     i1 + r1 + rr2 = 1.7
     ii1 + r1 + rr2 = 1.6
     */
     console.log('posicao do player: '+ player.offsetTop);
     console.log('caminho final Y: ' + yCAMINHO);
     const threshold = 1.2;
     const inputs = [i1,ii1, r1,rr2];
     const weights = [0.5,0.4, 1.0,0.2];


     let sum = 0;
     for (let i = 0; i < inputs.length; i++) {
       sum += inputs[i] * weights[i];
    }

    console.log(sum);



        let p1 = player.offsetLeft > min_floor_width ? 1 : 0;
        let pp1 = player.offsetLeft < max_floor_width ? 1 : 0;

        let o1 = player.offsetLeft > xCAMINHO ? 1 : 0;
        let oo1 = player.offsetLeft < xCAMINHO ? 1 : 0;
        
        const thresholdX = 1.2;
        const inputsX = [p1,pp1, o1,oo1];
        const weightsX = [0.5,0.4, 1.0,0.2];


        console.log('posicao do player: ' + player.offsetLeft);
        console.log('caminho final X: ' + xCAMINHO);
        let sumX = 0;
        for (let i = 0; i < inputsX.length; i++) {
           sumX += inputsX[i] * weightsX[i];
        }
          console.log(sumX)



        let output = sum > threshold ? 1 : 0;

        

    switch (sum) {

        case 1.9:
                
                    for (let prop in comandos) {
                    
                    moverPlayer(comandos[prop].x, comandos[prop].y, duracao );
                   // animateSmoothMovement(player.offsetTop, comandosY[prop].y);
                    
                    }
           
        break;
        case 1.1:
            for (let prop in comandos) {

                moverPlayer(comandos[prop].x, comandos[prop].y, duracao );

             //   animateSmoothMovement(player.offsetTop, comandosY[prop].y);
                
                }
                
        break;

    }
   switch (sumX) {

        case 1.9:
            for (var prop in comandosX) {

                //moverPlayer(comandosX[prop].x, player.offsetTop, duracao);
                
                }

            break;
            case 1.1:
                for (var prop in comandosX) {
                  //  moverPlayer(comandosX[prop].x, player.offsetTop, duracao);
                    
                    }

            break;

    }



}


setInterval(() => {
    //movePass();
    movefood();
    playerstatusmove();

}, 1000);





 