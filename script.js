let gameseq=[];

let userseq=[];
let highscr=[];

let btns=["red" , "yellow", "green" , "purple"];

let started=false;

let level=0;

let p=document.querySelector("p");

let h1guide=document.querySelector("#guide");

document.addEventListener("keydown",function(){
    h1guide.classList.add("dispnone");
    if(started==false){
       started=true;
        levelup();
    }
});

function levelup(){
    userseq=[];
    level++;
    p.innerText=`Level ${level}`;
    let randnum=Math.floor(Math.random()*4);
    let randbtn=btns[randnum];
    let flashbtn=document.querySelector(`.${randbtn}`);
    gameseq.push(randbtn);
    gameflash(flashbtn);
}
    
function gameflash(btn){
    btn.classList.add("gameflash");
    setTimeout(function() {
        btn.classList.remove("gameflash");
    },200);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(()=>{
        btn.classList.remove("userflash");
    },200);
}

function check(idx){
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length==gameseq.length){
           setTimeout(levelup,1000);
        }
    }else{
        endflash();
        highscr.push(level-1);  
        let highscore=disphs();
        p.innerHTML=`<b>Game over!!!Your score is ${level-1}</br></br>Your highest 
                      score till now  is ${highscore}</b>
                     </br></br><b>Hint :</b> You must first click the color blinked
                     in the previous levels followed by the color blinked in the present level
                     </br></br><b>Press any key to restart the game</b>`;
        h1guide.classList.remove("dispnone");
            reset();
    }
}

function disphs(){
    for(let i=0;i<highscr.length;i++){
        for(let j=i+1;j<highscr.length;j++){
            if(highscr[i]>highscr[j]){
                let temp;
                temp=highscr[i];
                highscr[i]=highscr[j];
                highscr[j]=temp;
            }
        }
    }
    let highscore=highscr[highscr.length-1];
    return highscore;
}

function reset(){
    level=0;
    gameseq=[];
    userseq=[];
    started=false;
}

function endflash(){
    let body=document.querySelector("body");
    body.classList.add("endflash");
    setTimeout(function(){
        body.classList.remove("endflash")},300);
}

let userbtns=document.querySelectorAll(".btn");
for(let userbtn of userbtns){
    userbtn.addEventListener("click",btnpress);
}

function btnpress(){
    let btn=this;
    userflash(btn);
    let usercolor=btn.getAttribute("id");
    userseq.push(usercolor);
    check(userseq.length-1);
}