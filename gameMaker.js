//Make Screen
var loaded = false;
function setupScreen()
{
  var screen = document.createElement("canvas");
  screen.width = window.innerWidth;
  screen.height = window.innerHeight;
  screen.id = "gamescreen";
  screen.style = "border: none; position:absolute; top:0; left:0;";
  document.body.appendChild(screen);
  var screenctx = screen.getContext("2d");
  screenctx.fillStyle = "black";
  screenctx.fillRect(0,0,screen.width,screen.height);
}
setupScreen();

var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}

window.onresize = fixHeight;

//Callable functions
function randInt(min,max){
	var rnd = Math.floor((Math.random() * (max-(min-1))) + min);
	return rnd;
}

function fixHeight()
{
	var a = document.getElementById("gamescreen");
  a.width = window.innerWidth;
  a.height = window.innerHeight;
  var b = a.getContext("2d");
  rect(0,0,a.width,a.height,"rgb(0,0,0)","filled");
}

function randPerc(){
	return Math.random();
}

function rect(x,y,width,height,color,filled)
{
	if(color.substring(0,1) != "#" && color.substring(0,3) != "rgb")
  {
  	console.log("Game Warning: Color "+color+" is not rgb or hex")
  }
	var a = document.getElementById("gamescreen");
  var b = a.getContext("2d");
  if(filled === "filled"){
  	b.fillStyle=color;
  	b.fillRect(x,y,width,height);
  }else if(filled.substring(0,6) === "nofill" && filled.length > 7){
		b.beginPath();
		b.lineWidth=filled.substring(7,filled.length);
		b.strokeStyle=color;
		b.rect(x,y,width,height); 
		b.stroke();
  }else{
  	console.log("Game Err: Rectange fill statement incorrect");
  }
}

function pixel(x,y,color)
{
	if(color.substring(0,1) != "#" || color.substring(0,3) != "rgb")
  {
  	console.log("Game Warning: Color '"+color+"' is not rgb or hex")
  }
	var a = document.getElementById("gamescreen");
  var b = a.getContext("2d");
	b.fillStyle=color;
  b.fillRect(x,y,1,1);
}

function clearScreen()
{
	var a = document.getElementById("gamescreen");
  var b = a.getContext("2d");
  b.fillStyle = "black";
  b.fillRect(0,0,window.innerWidth,window.innerHeight);
}

function buttonPressed(x,y,width,height)
{
	var boolean = false;
	if(mouseDown){
  	var x1 = event.clientX;     // Get the horizontal coordinate
		var y1 = event.clientY;     // Get the vertical coordinate
    if(x1 > x && x1 < x+width && y1 > y && y1 < y+height)
    {
    	boolean = true;
    }else{
    	boolean = false;
    }
  }else{
  	boolean = false;
  }
}
