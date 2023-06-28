var level = 1;
var i=0
var CPU = [];
var user = [];
var started = false;
var chance = 3;
var isRunning = true;
var highScore = 0;
startGame();


$('.btn').on('click',function(e){
  if(!isRunning && started===true)
  {
      var clickSound = new Audio('SoundEffects/clickSound.mp3');
      var wrongSound = new Audio('SoundEffects/wrongAnswer.mp3');
      var thisclass = "."+this.id;
     
      user.push("."+this.id);
      var isCorrect = check();
      if(isCorrect)
      {
        $(thisclass).addClass("pressed");
        clickSound.play();
        setTimeout(function(){$(thisclass).removeClass("pressed");},100);
      }
      else
      {
        $(thisclass).addClass("wrong");
        wrongSound.play();
        setTimeout(function(){$(thisclass).removeClass("wrong");},100);
      }
      if(isCorrect && CPU.length===user.length)
      {
        setTimeout(function(){
          level++;                                      //Level Increment
          i=0;
          $("h1").html("Level : "+level);
          animation();
        },1000);
        
    }
  }
})

function check()
{

    if(CPU[user.length-1] === user[user.length-1])
    {
      return true;                            // Correct Click
    }
    else
    {
      chance--;
      $(".chance").html("Chance : "+chance);
      if(chance <= 0)
      {
        highScore = Math.max(highScore,level-1);
        $(".highScore").html("HighScore : "+highScore);
        gameOver();                           //Chance Khatam ... Game over
        return false
      }
      user.pop();                             // Incorrect Poping from user Array
      return false;
    }
}

function gameOver()
{
  var gameoverSound = new Audio('SoundEffects/GameOver.MP3');
  gameoverSound.play();
  // started = false;
  $("h1").html("Press any key to Restart...");
  $(".chance").html("Your Score : "+(level-1));
  setTimeout(restartGame,1000);
}

function startGame()
{
  level = 1;
  CPU = [];
  user = [];
  chance = 3;
  $(document).keypress(function(){
    if(started === false)
    {
      started = true;
      // document.querySelector("h1").innerHTML = "level : "+level;
      $("h1").html("Level : "+level);
      // $(".container").after("<h2></h2>");
      $(".chance").html("Chance : "+chance);
      animation();
    }
  })
  $(document).on('click',function(){
    if(started === false)
    {
      started = true;
      // document.querySelector("h1").innerHTML = "level : "+level;
      $("h1").html("Level : "+level);
      // $(".container").after("<h2></h2>");
      $(".chance").html("Chance : "+chance);
      animation();
    }
  })
}

function restartGame()
{
  level = 1;
  CPU = [];
  user = [];
  chance = 3;
  started = false;
  $(document).keypress(function(){
    if(started === false)
    {
      started = true;
      $("h1").html("Level : "+level);
      $(".chance").html("Chance : "+chance);
      animation();
    }
  })
  // $(document).on('click',function(){
  //   if(started === false)
  //   {
  //     started = true;
  //     // document.querySelector("h1").innerHTML = "level : "+level;
  //     $("h1").html("Level : "+level);
  //     // $(".container").after("<h2></h2>");
  //     $("h2").html("Chance : "+chance);
  //     animation();
  //   }
  // })
}




function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function animation() {
  // document.write('Hello Toturix');
  for (let i = 0; i <level ; i++) {  
      isRunning = true;
      var random_num = Math.floor(Math.random()*16)+1;
      var random_class = '.'+random_num;
      CPU.push(random_class);
      $(random_class).addClass("pressed");  
      var animationSound = new Audio('SoundEffects/animation.mp3');
      animationSound.play();    
    await sleep(700);
      $(random_class).removeClass("pressed");
    await sleep(700);
    if(i===level-1)
    {
      isRunning = false;
    }
  }
}

