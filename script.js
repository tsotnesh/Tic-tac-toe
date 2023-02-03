'use strict';

const logoturn = document.querySelector(".first-line-turn-svg");
const boxbutton = document.querySelectorAll(".box");
const boxpic = document.querySelectorAll(".box-pic");
const resultwindow = document.querySelector(".result-alert");
const gamewinnerpic = document.querySelector(".middle-box-alert-svg");
const alertHeader = document.querySelector(".first-box-alert");
const middleboxalert = document.querySelector(".middle-box-alert-text");
const righttablo = document.getElementById("#lastlineo");
const lefttablo = document.querySelector("#lastlinex");
const restartalert=document.querySelector('.restart-alert');

const quitbutton = document.querySelector('.quit-button');
const nextroundbutton = document.querySelector('.next-round-button');
const restartbutton = document.querySelector('.restart-button');
const resumebutton = document.querySelector('.resume');
const restartgame = document.querySelector('.restart');

// starting positions
let p1 = 0;
let p2=1;
let p3;
let gamecounter = 1;
let gameovercounter = 0;
let ifgamedraw=9;
const gamebox = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
//es aris array imistvis rom davimaxsovrot ra ujrebia shevsebuli.
const savebox = [];

// count2 mchirdba rom klikisas rendomic klikis adgils ar daemtxves.
let count2=0;
let saveboxcount = 0;


// es tamashis shesvlamde arsebuli blokis gilakebze gveubneba ras da rogor viwkebt tamashs.
document.querySelector(".o-block").addEventListener('click', function() {
    oBlock.classList.add('hidden');
    xBlock.classList.remove('hidden');
    p1=0;
    p2=1;
}) 


document.querySelector(".x-block").addEventListener('click', function() {
    oBlock.classList.remove('hidden');
    xBlock.classList.add('hidden');
    p1=1;
    p2=0;
}) 

document.querySelector("#button1").addEventListener('click', function() {
    maincard.classList.add('dissapear');
    activeblock.classList.remove('dissapear');
    if (p1===1) {
    p3=0;
    document.getElementById(`lastlineo`).textContent = "CPU";
    document.getElementById(`lastlinex`).textContent = "YOU";
    }
    if (p1===0) {
        p3=1;
        document.getElementById(`lastlineo`).textContent = "YOU";
        document.getElementById(`lastlinex`).textContent = "CPU";
    }

    if (p3===1 ){
        cpustartgame();
    }
})

document.querySelector("#button2").addEventListener('click', function() {
        maincard.classList.add('dissapear');
        activeblock.classList.remove('dissapear');
        if(p1 === 0 && p2 ===1) {
        document.getElementById(`lastlineo`).textContent = "O(P1)";
        document.getElementById(`lastlinex`).textContent = "X(P2)";
        }
        if(p1===1 && p2===0) {
        document.getElementById(`lastlinex`).textContent = "X(P1)";
        document.getElementById(`lastlineo`).textContent = "O(P2)";
        }
})

// quit button dacheris shemdeg rac xdeba eg aris agwerili qvemot.
quitbutton.addEventListener('click', function() {
         for (let i=0; i<gamebox.length; i++) {
            gamebox[i] = -1;
         }
         for(let i=0; i<boxpic.length; i++) {
            boxpic[i].src="";
         }
         
         for(let i=0; i<boxbutton.length; i++) {
            boxbutton[i].style.backgroundColor = "#1f3641"
         }

        
        saveboxcount = savebox.length;
        for (let i=0; i < saveboxcount; i++) {
            savebox.shift(savebox[i]);
        }
            
        
        gamecounter = 1;
        gameovercounter = 0;
        p1=0;
        p2=1;
        p3=21;
        ifgamedraw=9;
        maincard.classList.remove('dissapear');
        activeblock.classList.add('dissapear');
        document.getElementById(`xtablo`).textContent = '0';
        document.getElementById(`otablo`).textContent = '0';
        document.getElementById(`draws`).textContent = '0';
        resultwindow.classList.remove('appear');
})

//nextround buttonis dacheris shemdeg ganvixilot axla tumca ragaceebi igive darcheba.
//mere tu ar damezara cxadia kodsac gavamartiveb.

nextroundbutton.addEventListener('click', function(){
    for (let i=0; i<gamebox.length; i++) {
        gamebox[i] = -1;
     }
     for(let i=0; i<boxpic.length; i++) {
        boxpic[i].src="";
     }
     
     for(let i=0; i<boxbutton.length; i++) {
        boxbutton[i].style.backgroundColor = "#1f3641"
     }

     gamecounter = 1;
     gameovercounter = 0;
     ifgamedraw=9;
     resultwindow.classList.remove('appear');
     if (p3===1 && p1===0) {
        saveboxcount = savebox.length;
        for (let i=0; i < saveboxcount; i++) {
            savebox.shift(savebox[i]);
        }
        cpustartgame();
     }
     if (p3===0 && p1===1) {
        saveboxcount = savebox.length;
        for (let i=0; i < saveboxcount; i++) {
            savebox.shift(savebox[i]);
        }
     }
    
})

//ra xdeba roca restart button davachert zevit da tamashis tavidan dawyeba gvinda.
restartbutton.addEventListener('click',function(){
    if (gameovercounter!==1) {
    restartalert.classList.add('appear');
    }
})

// davwerot no,canel da yes restart buttonebis ambebic aqve.
resumebutton.addEventListener('click',function(){
       restartalert.classList.remove('appear');
})

restartgame.addEventListener('click',function() {
     gamecounter = 1;
     gameovercounter = 0;
     ifgamedraw=9;
     restartalert.classList.remove('appear');
    for (let i=0; i<gamebox.length; i++) {
        gamebox[i] = -1;
     }
     for(let i=0; i<boxpic.length; i++) {
        boxpic[i].src="";
     }
     if (p3===1 && p1===0) {
        saveboxcount = savebox.length;
        for (let i=0; i < saveboxcount; i++) {
            savebox.shift(savebox[i]);
        }
        cpustartgame();
     }

     if (p1===1 && p3===0) {
        saveboxcount = savebox.length;
        for (let i=0; i < saveboxcount; i++) {
            savebox.shift(savebox[i]);
        }
     }
     
})



// tamashis implementacia dziritadad qveda xazebshi mimdinareobs.

for (let i = 0; i<boxbutton.length; i++) {
    //es ujraze shesvlisas ra gamoitanos magistvisaa. aq iwereba player vs player shemtxveva.
    boxbutton[i].addEventListener('mouseover', function() {
        if (p3!==0 && p3!==1) {
        if ((gamecounter % 2 !== 0) && (gamebox[i] !== 1) && (gamebox[i] !== 0) ) {
            boxpic[i].src = "assets/icon-x-outline.svg";
        } else if ((gamecounter%2 === 0)&& (gamebox[i] !== 1) && (gamebox[i] !== 0) ){
            boxpic[i].src = "assets/icon-o-outline.svg";
        }
    }
        if (p3===0 || p3===1) {
            if (p1===1) {
                if ((gamecounter % 2 !== 0) && (gamebox[i] !== 1) && (gamebox[i] !== 0)){
                    boxpic[i].src = "assets/icon-x-outline.svg";  
                }
            }
            if(p1===0) {
                if ((gamecounter%2 === 0)&& (gamebox[i] !== 1) && (gamebox[i] !== 0) ) {
                    boxpic[i].src = "assets/icon-o-outline.svg";
                }
            }
        }
    })

    
    // es aris ujrebidan gamosvlisas rom ar gaqres chaxatuli kristiki an noliki magistvis.
    boxbutton[i].addEventListener('mouseout', function() {
        if (gamebox[i] !== 0 && gamebox[i] !== 1) {
            boxpic[i].src = "";
        } 
    })
    
    // es aris ra xdeba ujrebshi daklikebisas, anu kristiki ixateba tu noliki.
    boxbutton[i].addEventListener('click', function(){
        if (p3!==0 && p3!== 1) {
        if ((gamecounter %2 !== 0)&& (gamebox[i] !== 1) && (gamebox[i] !== 0)) {
            boxpic[i].src = "assets/icon-x.svg";
            gamebox[i] = 1;
            gamecounter++;
            ifgamedraw--;
            TurnLogo();
            gamechecker(gamebox,1);
            if(gameovercounter === 1) {
                 alertHeader.textContent = 'PLAYER WITH X WINS';
                 resultwindow.classList.add('appear');
                 gamewinnerpic.src = "assets/icon-x.svg";
                 gamewinnerpic.classList.add('appear');
                 middleboxalert.textContent = "TAKES THE ROUND";
                 middleboxalert.classList.remove('markof');
                 middleboxalert.classList.add('blue');
                 let n = Number(document.getElementById(`xtablo`).textContent);
                 n++;
                 document.getElementById(`xtablo`).textContent = `${n}`;
            }
            if (ifgamedraw===0 && gameovercounter!==1) {
                alertHeader.textContent = "";
                resultwindow.classList.add('appear');
                gamewinnerpic.classList.add('dissapear');
                middleboxalert.classList.remove('blue');
                middleboxalert.classList.remove('markof')
                middleboxalert.classList.add('abichni');
                middleboxalert.textContent = "ROUND TIED";
                let n = Number(document.getElementById(`draws`).textContent);
                n++;
                document.getElementById(`draws`).textContent = `${n}`;
            }
        } else if((gamecounter %2 ===0)&&(gamebox[i] !== 1) && (gamebox[i] !== 0)) {
            ifgamedraw--;
            boxpic[i].src = "assets/icon-o.svg";
            gamebox[i] = 0;
            gamecounter++;
            TurnLogo();
            gamechecker(gamebox,0);
            if(gameovercounter === 1) {
                alertHeader.textContent = "PLAYER WITH O WINS";
                resultwindow.classList.add('appear');
                gamewinnerpic.src = "assets/icon-o.svg";
                gamewinnerpic.classList.add('appear');
                middleboxalert.textContent = "TAKES THE ROUND";
                middleboxalert.classList.remove('blue');
                middleboxalert.classList.add('markof');
                let n = Number(document.getElementById(`otablo`).textContent);
                n++;
                document.getElementById(`otablo`).textContent = `${n}`;
           }
           if (ifgamedraw===0 && gameovercounter!==1) {
            alertHeader.textContent = "";
            resultwindow.classList.add('appear');
            gamewinnerpic.classList.add('dissapear');
            middleboxalert.classList.remove('blue');
            middleboxalert.classList.remove('markof');
            middleboxalert.classList.toggle('abichni');
            middleboxalert.textContent = "ROUND TIED";
            let n = Number(document.getElementById(`draws`).textContent);
            n++;
            document.getElementById(`draws`).textContent = `${n}`;
            }
        }
    }
        // aq iwereba kompiuteris nawili.
           if (p3===0 || p3===1)  {
           if (p1 === 0 && p3===1) {
            if((gamecounter %2 === 0)&& (gamebox[i] !== 1) && (gamebox[i] !== 0)) {
                 boxpic[i].src = "assets/icon-o.svg";
                 count2=i;
                 gamecounter++;
                 ifgamedraw--;
                 gamebox[i] = 0;
                 savebox.push(i);
                 TurnLogo();
                 gamechecker(gamebox,0);
                 if(gameovercounter === 1) {
                 alertHeader.textContent = 'YOU WIN';
                 resultwindow.classList.add('appear');
                 middleboxalert.textContent = "TAKES THE ROUND";
                 gamewinnerpic.classList.remove('dissapear');
                 gamewinnerpic.src = "assets/icon-o.svg";
                 middleboxalert.classList.remove('blue');
                 middleboxalert.classList.add('markof');
                 let n = Number(document.getElementById(`otablo`).textContent);
                 n++;
                 document.getElementById(`otablo`).textContent = `${n}`;
                }
                if (ifgamedraw===0 && gameovercounter!==1) {
                alertHeader.textContent = "";
                resultwindow.classList.add('appear');
                gamewinnerpic.classList.add('dissapear');
                middleboxalert.classList.remove('blue');
                middleboxalert.classList.remove('markof');
                middleboxalert.classList.add('abichni');
                middleboxalert.textContent = "ROUND TIED";
                let n = Number(document.getElementById(`draws`).textContent);
                n++;
                document.getElementById(`draws`).textContent = `${n}`;
            }   
                //  computer part
                 if (gameovercounter!==1) {
                 let c=0;
                 while(true) {
                    let count=0;
                    let k = Math.floor(Math.random() * 9);
                    for (let i = 0; i<savebox.length; i++) {
                            if (k === savebox[i]) {
                                count++;
                            }
                    }
                    if (count===0 && count2!==k) {
                        c=k;
                        break;
                    }
                 }
                 
                ifgamedraw--;
                boxpic[c].src = "assets/icon-x.svg";
                gamebox[c] = 1;
                savebox.push(c);
                gamecounter++;
                TurnLogo();
                gamechecker(gamebox,1);
                if(gameovercounter === 1) {
                alertHeader.textContent = "OH, NO YOU LOST";
                middleboxalert.textContent = "TAKES THE ROUND";
                resultwindow.classList.add('appear');
                gamewinnerpic.classList.remove('dissapear');
                gamewinnerpic.src = "assets/icon-x.svg";
                middleboxalert.classList.remove('markof');
                middleboxalert.classList.add('blue');
                let n = Number(document.getElementById(`xtablo`).textContent);
                n++;
                document.getElementById(`xtablo`).textContent = `${n}`;
                }
                if (ifgamedraw===0 && gameovercounter!==1) {
                alertHeader.textContent = "";
                resultwindow.classList.add('appear');
                gamewinnerpic.classList.add('dissapear');
                middleboxalert.classList.remove('blue');
                middleboxalert.classList.remove('markof');
                middleboxalert.classList.add('abichni');
                middleboxalert.textContent = "ROUND TIED";
                let n = Number(document.getElementById(`draws`).textContent);
                n++;
                document.getElementById(`draws`).textContent = `${n}`;
            }
        }
        }
           }


           if (p1===1 && p3 ===0) {
            if((gamecounter %2 !== 0)&& (gamebox[i] !== 1) && (gamebox[i] !== 0)) {
            boxpic[i].src = "assets/icon-x.svg";
            count2=i;
            gamecounter++;
            ifgamedraw--;
            gamebox[i] = 1;
            savebox.push(i);
            TurnLogo();
            gamechecker(gamebox,1);
            if(gameovercounter === 1) {
            alertHeader.textContent = 'YOU WIN';
            resultwindow.classList.add('appear');
            gamewinnerpic.classList.remove('dissapear');
            gamewinnerpic.src = "assets/icon-x.svg";
            middleboxalert.classList.remove('markof');
            middleboxalert.classList.add('blue');
            middleboxalert.textContent = "TAKES THE ROUND";
            let n = Number(document.getElementById(`xtablo`).textContent);
            n++;
            document.getElementById(`xtablo`).textContent = `${n}`;
           }
           if (ifgamedraw===0 && gameovercounter!==1) {
           alertHeader.textContent = "";
           resultwindow.classList.add('appear');
           gamewinnerpic.classList.add('dissapear');
           middleboxalert.classList.remove('markof');
           middleboxalert.classList.remove('blue')
           middleboxalert.classList.add('abichni');
           middleboxalert.textContent = "ROUND TIED";
           let n = Number(document.getElementById(`draws`).textContent);
           n++;
           document.getElementById(`draws`).textContent = `${n}`;
       }  
    
    
    if (gameovercounter!==1 && ifgamedraw!==0) {
        let c=0;
        while(true) {
           let count=0;
           let k = Math.floor(Math.random() * 9);
           for (let i = 0; i<savebox.length; i++) {
                   if (k === savebox[i]) {
                       count++;
                   }
           }
           if (count===0 && count2!==k) {
               c=k;
               console.log(k);
               break;
           }
        }
        
       ifgamedraw--;
       boxpic[c].src = "assets/icon-o.svg";
       gamebox[c] = 0;
       savebox.push(c);
       gamecounter++;
       TurnLogo();
       gamechecker(gamebox,0);
       if(gameovercounter === 1) {
       alertHeader.textContent = "OH, NO YOU LOST";
       resultwindow.classList.add('appear');
       gamewinnerpic.classList.remove('dissapear');
       gamewinnerpic.src = "assets/icon-o.svg";
       middleboxalert.classList.remove('blue');
       middleboxalert.classList.add('markof');
       middleboxalert.textContent = "TAKES THE ROUND";
       let n = Number(document.getElementById(`otablo`).textContent);
       n++;
       document.getElementById(`otablo`).textContent = `${n}`;
       }
       if (ifgamedraw===0 && gameovercounter!==1) {
       alertHeader.textContent = "";
       resultwindow.classList.add('appear');
       gamewinnerpic.classList.add('dissapear');
       middleboxalert.classList.remove('markof');
       middleboxalert.classList.remove('blue');
       middleboxalert.classList.add('abichni');
       middleboxalert.textContent = "ROUND TIED";
       let n = Number(document.getElementById(`draws`).textContent);
       n++;
       document.getElementById(`draws`).textContent = `${n}`;
   }
}

            }
           }

        }  
    })

    }




// tamashis shemowmeba xom ar dafiksirda mogeba sadme romelime mxridan.
//qveda funkcai amowmebs amas yvelafers rom mogeba ar gamogvrches.


function gamechecker(gamebox,a) {
    if(gamebox[0]===a && gamebox[1]===a && gamebox[2]===a) {
        fillgamewinnerline(0,1,2);
        gameovercounter++;
    } else if(gamebox[3]===a && gamebox[4]===a && gamebox[5]===a) {
        fillgamewinnerline(3,4,5);
        gameovercounter++;
    } else if (gamebox[6]===a && gamebox[7]===a && gamebox[8]===a) {
        fillgamewinnerline(6,7,8);
        gameovercounter++;
    } else if (gamebox[0]===a && gamebox[3]===a && gamebox[6]===a) {
        fillgamewinnerline(0,3,6);
        gameovercounter++;
    } else if (gamebox[1]===a && gamebox[4]===a && gamebox[7]===a) {
        fillgamewinnerline(1,4,7);
        gameovercounter++;
    } else if (gamebox[2]===a && gamebox[5]===a && gamebox[8]===a) {
        fillgamewinnerline(2,5,8);
        gameovercounter++;
    } else if(gamebox[0]===a && gamebox[4]===a && gamebox[8]===a) {
        fillgamewinnerline(0,4,8);
        gameovercounter++;
    } else if(gamebox[2]===a && gamebox[4]===a && gamebox[6]===a){
        fillgamewinnerline(2,4,6);
        gameovercounter++;
    }

}


// mogebuli mxaris svetis gaferadeba ert svetad shesabamis fershi. efekti mogebis roca gvinda.

function fillgamewinnerline (a,b,c) {
    if (gamecounter % 2 === 0) {
        boxbutton[a].style.backgroundColor = '#65e9e4';
        boxbutton[b].style.backgroundColor = '#65e9e4';
        boxbutton[c].style.backgroundColor = '#65e9e4';
    } else {
        boxbutton[a].style.backgroundColor = '#ffc860';
        boxbutton[b].style.backgroundColor = '#ffc860';
        boxbutton[c].style.backgroundColor = '#ffc860';
    }
}

// funkcia sxvadasxva turnze gadasvlisas fotos rom unda cvlides imistvis, es zeda shua fanjarashi.
function TurnLogo() {
    if(gamecounter %2 !== 0) {
        logoturn.src = 'assets/icon-x.svg';
    } else {
        logoturn.src = 'assets/icon-o.svg';
    }
}

function cpustartgame () {
    let k = Math.floor(Math.random() * 9);
    boxpic[k].src = "assets/icon-x.svg";
    gamecounter++;
    ifgamedraw--;
    gamebox[k] = 1;
    savebox.push(k);
}










    