window.onload = function(){
  var screen = document.createElement("canvas");
  screen.width = window.innerWidth;
  screen.height = window.innerHeight;
  screeb.id = "gamescreen";
  screen.style = "border: none; position:absolute; top:0; left:0;";
  document.body.appendChild(screen);
  var screenctx = screen.getContext("2d");
  screenctx.fillStyle = "black";
  screenctx.fillRect(0,0,screen.width,screen.height);
}
