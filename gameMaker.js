var mouseX = 0;
var mouseY = 0;

onmousemove = function(e){
mouseX = e.clientX;
mouseY = e.clientY;
}

var mouseDown = 0;
document.body.onmousedown = function() { 
  mouseDown = 1;
}
document.body.onmouseup = function() {
  mouseDown = 0;
}

window.onresize = fixHeight;

//KeyPressed
var map = {}; // You could also use an array
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    /* insert conditional here */
}

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
  	var x1 = mouseX;
		var y1 = mouseY;
    if(x1 > x && x1 < x+width && y1 > y && y1 < y+height)
    {
    	boolean = true;
    }else{
    	boolean = false;
    }
  }else{
  	boolean = false;
  }
  return boolean;
}

function tempSave(name,string)
{
	var check = document.getElementById(name);
  if(check == null){
  	var checky = document.createElement("div");
    checky.id = name;
    checky.style = "display:none;";
  	  checky.innerHTML = (string+"");
  	  document.body.appendChild(checky);
 	 }else{
  		check.innerHTML = string;
  	}
	}

	function longSave(name,string)
	{
  		var d = new Date();
  	  d.setTime(d.getTime() + ((30)*24*60*60*1000));
  	  var expires = "expires="+ d.toUTCString();
 	   document.cookie = name + "=" + string + ";" + expires + ";path=/";
	}

	function getSave(namen)
	{
		var non = null;
		var name = namen + "=";
 	   var decodedCookie = decodeURIComponent(document.cookie);
 	   var ca = decodedCookie.split(';');
 	   for(var i = 0; i <ca.length; i++) {
  	      var c = ca[i];
  	      while (c.charAt(0) == ' ') {
   	         c = c.substring(1);
   	     }
  	      if (c.indexOf(name) == 0) {
  	          var non = c.substring(name.length, c.length);
   	     }
  	  }
  
		var yen = document.getElementById(namen);
 	 if(yen != null){
  		return	yen.innerHTML;
	  }else if(non != null){
  		return non;
 	 }else{
 	 		console.log("Game Err: Input Name '" + namen + "' is missing or inncorect");
 	   return "";
	  }
	}

	function loadImage(src,x,y,width,height)
	{
		var a = document.getElementById("gamescreen");
	  var b = a.getContext("2d");
 	 var img = new Image();
		img.onload = function() {
 	   b.drawImage(img, x, y, width, height);
		};
		img.src = src;
	}

	function loadMap(src,x,y,scale)
	{
   if(scale == null){
 	  	scale = 1;
 	 }
   var a = document.getElementById("gamescreen");
 	 var b = a.getContext("2d");
		var img = new Image();
		img.onload = function() {
	    var w = img.width/2;
	    var h = img.height/2;
 	   b.drawImage(img, x-w, y-h,img.width*scale,img.height*scale);
		};
		img.src = src;
	}
	
	function keyDown(key)
	{
		if(key == " "){
	  	var key = 32;
	  }
		if(isNaN(key)){
  		var kay = key.charCodeAt(0);
  	}else{
	  	var kay = key;
	  }
	  if(map[kay]){
	  	return true;
	  }
	  return false;
	}
  
  if(document.getElementById("2d")){

//Make Screen
var loaded = false;
  var screen = document.createElement("canvas");
  screen.width = window.innerWidth;
  screen.height = window.innerHeight;
  screen.id = "gamescreen";
  screen.style = "border: none; position:absolute; top:0; left:0;";
  document.body.appendChild(screen);
  var screenctx = screen.getContext("2d");
  screenctx.fillStyle = "black";
  screenctx.fillRect(0,0,screen.width,screen.height);

	if (typeof setup == 'function') { 
 	 setup(); 
	}else{
		console.log("Game Err: void setup() was not found");
	}

	if (typeof run == 'function') { 
		setInterval(function(){
			run();
		},10);
		}else{
		console.log("Game Err: void run() was not found");
	}
}else{
	console.log("Game Err: No Gamescript Specified")
}
