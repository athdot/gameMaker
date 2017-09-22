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

function editImage(src,effect,percent)
{
	var image = new Image();
  image.src = src;
  image.style = "visibility: hidden;";
  document.body.appendChild(image);
	var editframe = document.createElement("canvas");
  editframe.width = image.width;
  editframe.height = image.height;
  editframe.style = "display:none;";
  document.body.appendChild(editframe);
  var ctx = editframe.getContext("2d");
  
  if(percent > 1){
  	console.log("Game Err: editImage() Percent is greater than one");
    return;
  }
  
  //effects...
  if(effect === "pixelate"){
  	var sizex = (1-percent)*image.width;
    var sizey = (1-percent)*image.height;
    ctx.drawImage(image,0,0,sizex,sizey);
    var url = editframe.toDataURL();
  }
  return url;
}
