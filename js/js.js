var start = document.querySelector(".start");
var reset = document.querySelector(".reset");
var initialTimer = document.querySelector(".initial-timer") ;
var theTimer =document.querySelector(".timer")
var score=document.querySelector(".score");
var IMAGES = document.querySelectorAll("img");
var text=document.querySelector("h2");
var allD =document.querySelectorAll(".grid-container div");
// add event listeners to all imgs

var timer=0;
var i =4;
var interval1;
var interval2;
var timer = [0,0,0,0];
var clickedAlt=[];
var Alt=0;
var scoring=0;
/*disable clicking on div until start time is over
------------------------------------------------
*/
function disAllow()
{
    for (let x=0; x<allD.length;x++)
    {
        allD[x].classList.toggle("e");
    }
}
var clickedrst=0;

function interval()
   {
       clickedrst++;
       if(clickedrst===1){
        interval1=setInterval(timeToStart, 1000,clicking);
        hide();
       
       }
       else{
           return ;
       }


 
    }
    function clicking(){
        document.querySelectorAll('.e').forEach(item => {
            item.addEventListener('click',whoClicked)
          })
    }
function timeToStart ()
{
    
   initialTimer.innerHTML=i;
   i--;
   if(i===-1)
   {
       clearInterval(interval1);
       clicking()
       initialTimer.innerHTML="GO!";
       intervall();
       hide();
       disAllow();

   }
   
}
start.addEventListener("click",interval,false);

/*timer ----*/
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
    if(timer[0]==01 && timer[1]==00 && timer[2]==01 )
    {
        clearInterval(interval2);
        prevent();
       if(scoring<40){
           text.innerHTML=("Game Over!!!");
           document.querySelectorAll('.e').forEach(item => {
            item.removeEventListener('click',whoClicked)
          })
           prevent();
           
       }
    }
}

function intervall()
{
    interval2=setInterval(runTimer,10);
    
}
/* hide photos
--------------
*/
function hide()
{
    for (let i=0;i<IMAGES.length;i++)
    {
        IMAGES[i].classList.toggle("hide");
    }
}

function whoClicked()
{    var id =[0,0];

    let x=this.id;
    IMAGES[x-1].classList.toggle("hide");
    this.classList.add("e");
    clickedAlt[Alt]=IMAGES[x-1].getAttribute("alt");
    Alt++;
    clickedAlt[Alt]=x-1;
    Alt++;
    if(Alt==4)
    {
        
        
        if(clickedAlt[0]==clickedAlt[2])
        {
            scoring+=10;
            score.innerHTML=scoring;
            if (scoring==60)
            {
                clearInterval(interval2) ;
                text.innerHTML=("You Win !!");
                text.style.color="green"
            }

           
        }
      
        else{
            
            var delayInMilliseconds = 1000; //3 second 
            for(let x=0;x<allD.length;x++)
            {
                if(allD[x].classList.contains("e"))
                {
                  allD[x].classList.remove("e");  
                }
            }
            setTimeout(function() {
                IMAGES[clickedAlt[1]].classList.add("hide");
                IMAGES[clickedAlt[3]].classList.add("hide");
             disAllow();
            }, delayInMilliseconds);
         disAllow();   
        }
        Alt=0;
    }
    
}


/* random order for images
----------------------------
*/
hide();
function randomOrder(){
    var r;
    for(let x=0;x<12;x++)
    {
        r=Math.floor((Math.random()*(12-0+1)),10)+0;
        allD[x].style.order=r;
        
    }

}
randomOrder();


reset.addEventListener("click",resetGame,false);
function resetGame()
{
    clickedrst=0;
    document.querySelectorAll('.e').forEach(item => {
        item.removeEventListener('click',whoClicked)
      })
    clearInterval(interval2);
    clearInterval(interval1);
    theTimer.innerHTML="00.00.00";
    timer=0;
    i =4;
    clickedAlt=[0,0];
    Alt=0;
    scoring=0;
    score.innerHTML=0;
    initialTimer.innerHTML=5;
    randomOrder();
    timer=[0,0,0,0];
    text.innerHTML=(" ");
    for( let x=0;x<IMAGES.length;x++)
    {
        if(!IMAGES[x].classList.contains("hide"))
        {
            IMAGES[x].classList.add("hide");  
        }
    }
    prevent();

}
function prevent()
{
    for(let x=0 ;x<allD.length;x++)
    {
        if (!allD[x].classList.contains("e"))
        {
            allD[x].classList.add("e"); 
        }
    }
}