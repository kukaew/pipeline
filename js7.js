var canvas = document.getElementById('canvas'),
	canvas2 = document.getElementById('canvas2'),
	ctx = canvas.getContext('2d'),
	ctx2 = canvas2.getContext('2d'),
	step = shg= 0,
	scr1 = scr2 = 100,
	clr = 120,
	direct,
	blr = 100,
	rad = udr = 3,
	raddir = 0.1,
	clrdir = -1,
	scrlh=document.body.clientHeight,
	scrlw=document.body.clientWidth,
	x = scrlw/2,
	y = scrlh/2;
if (scrlh<scrlw) var prg = scrlh/10;
else  var prg = scrlw/10;
canvas.setAttribute('width', scrlw);
canvas.setAttribute('height', scrlh);
canvas2.setAttribute('width', scrlw);
canvas2.setAttribute('height', scrlh);

function draw() {
	ctx.beginPath();
	if (step == 0)
	{
		if (udr>3) step = rnd(udr/2,udr*2);
		else step = 1;
		direct = rnd(0,7);
	}
	else step--;
	switch (direct)
	{
		case 0:
			// вверх
			y = y-shg;
			break;
		case 1:
			// вправо
			x=x+shg;
			break;
		case 2:
			// вниз
			y = y+shg;
			break;
		case 3:
			// влево
			x = x-shg;
			break;
		case 4:
			// вправо вверх
			x=x+shg;
			y=y-shg;
			break;
		case 5:
			// вправо вниз
			x=x+shg;
			y=y+shg;
			break;
		case 6:
			// влево вниз
			x=x-shg;
			y=y+shg;
			break;
		case 7:
			// влево вверх
			x=x-shg;
			y=y-shg;
			break;
	}
	if (clr == 340) clrdir = 1;
	if (clr == 0) clr = 359, clrdir = -1;	
	if (clr == 360) clr = 0, clrdir = 1;	
	if (clr == 120) clrdir = -1;

	prg = prg + clrdir;

/*	console.log('clr=',clr);
	console.log(prg);*/

	if (blr == 0) blr = 100;
	if (rad > 30) raddir = -0.1;
	if (rad < 5 && rad > 0) raddir = 0.1;
	if (shg) rad=rad+raddir;
	if (y<rad*2+48)
	{
		shg = 0;
		udr = 0;
		y=scrlh/2;
		x=scrlw/2;
		rad = Math.round(rad);
		scr1=scr1+rad;
		scr2=scr2-rad;
		if (scr1 >= 200) 
		{
			scr1 = "YOU WINNER!";
			scr2 = "YOU LOSER!";
			score(scr1,scr2,1);

			scr1 = scr2 = 100;
		}
		else score(scr1,scr2,1);
		rad=3;
		step = 0;
	}
	if (y>scrlh-50)
	{
		shg = 0;
		udr = 0;
		y=scrlh/2;
		x=scrlw/2;
		rad = Math.round(rad);
		scr1=scr1-rad;
		scr2=scr2+rad;
		if (scr2 > 200) 
		{
			scr2 = "YOU WINNER!";
			scr1 = "YOU LOSER!";
			score(scr1,scr2,2);

			scr1 = scr2 = 100;
		}
		else score(scr1,scr2,2);

		rad=3;
		step = 0;
	}

	if (x<rad*2+1)
	{
		step = 0;
		x=x+3;
	}
	if (x>scrlw-1) 
	{
		step = 0;
		x=x-3;
	}
	clr = clr + clrdir;
	blr--;
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'hsl('+clr+','+rad*1.5+'%,'+rad*1.5+'%)';
	ctx.fillStyle = 'hsl('+clr+',70%,80%)';
	if (shg) ctx.arc(x-rad,y-rad,rad,0,6.28,false);
	ctx.fill();
	ctx.stroke();
	timer = setTimeout(draw,5);
}
draw();
score(scr1,scr2);
lghtbx('Druzhba pipeline',40);

canvas.onmousedown = omdown;
canvas.onmouseup = omup;
canvas.addEventListener('touchstart', omdown,false);
canvas.addEventListener('touchend', omup,false);

function omdown() {
	udr = prg;
	step = 0;
	console.log(udr);
}
function omup() {
	udr = 3;
	step = 0;

}
function omdown2() {
	canvas2.classList = '';
	shg = 4;
	canvas2.onmousedown = null;
}

function rnd(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand;
}
var addEvent = function(object, type, callback) {
	if (object == null || typeof(object) == 'undefined') return;
	if (object.addEventListener) {
		object.addEventListener(type, callback, false);
	} else if (object.attachEvent) {
		object.attachEvent("on" + type, callback);
	} else {
		object["on"+type] = callback;
	}
};
addEvent(window, "resize", function(event) {
	scrlh=document.body.clientHeight;
	canvas.setAttribute('height', scrlh);
	scrlw=document.body.clientWidth;
	canvas.setAttribute('width', scrlw);
});

function getImage(canvas){
	var imageData = canvas.toDataURL();
	var image = new Image();
	image.src = imageData;
	return image;
}

function saveCanvasAsImageFile(){
	var image = getImage(canvas),
		link = document.createElement("a");
	link.setAttribute("href", image.src);
	link.setAttribute("download", "madball");
	link.click();
}

function score(scrst,scrst2,win){
	lghtbx(rad,160,win);
	canvas2.classList = 'viz';
	var hst = scrlh-46;
	ctx.textAlign = "center";
	ctx.font = 'bold italic 40px monospace';
	ctx.fillRect(0,0,scrlw,46);
	ctx.fillRect(0,hst,scrlw,46);
	ctx.lineWidth = 8;
	ctx.strokeRect(0,0,scrlw,46);
	ctx.strokeRect(0,hst,scrlw,46);
	ctx.lineWidth = 2;
	ctx.fillStyle = '#f0e375';
	ctx.fillText(scrst, scrlw/2, 35);
	ctx.strokeText(scrst, scrlw/2, 35);
	ctx.fillText(scrst2, scrlw/2, hst+35);	
	ctx.strokeText(scrst2, scrlw/2, hst+35);
}

function lghtbx(txt,fsz,win){
	ctx2.clearRect(0,0,scrlw,scrlh);

	var x=0,y=0,xs=0,ys=0,cntx=0,cnty=0,lght=35;
	var clr2 = 270;
	var rad2 = rad;
	ctx2.textAlign = "center";
	ctx2.textBaseline = "middle";
	ctx2.lineWidth = 5;
	if (win == 1) var xs = 4, ys = -4, cntx = 115, cnty = -115;
	else if (win == 2) xs = 4, ys = 4, cntx = 115, cnty = 115;
	var anim = setInterval(function() {
		ctx2.font = 'bold italic '+fsz+'px monospace';
		ctx2.fillStyle = 'hsl('+clr2+',80%,70%)';
		ctx2.strokeStyle = 'hsl('+clr2+',70%,'+lght+'%)';
		ctx2.strokeText('+'+txt, scrlw/2+x-cntx, scrlh/2+y-cnty);// +
		ctx2.fillText('+'+txt, scrlw/2+x-cntx, scrlh/2+y-cnty);// +
		ctx2.strokeText('-'+txt, scrlw/2-x+cntx, scrlh/2-y+cnty);// -
		ctx2.fillText('-'+txt, scrlw/2-x+cntx, scrlh/2-y+cnty);// -
		x=x+xs;
		y=y+ys;
		lght=lght-0.5;
		clr2=clr2+3;
		if (clr2 >= 360) clr2 = 0;

	}, 7);
	setTimeout(function(){
		clearInterval(anim);
		canvas2.onmousedown = omdown2;
	},350);
}