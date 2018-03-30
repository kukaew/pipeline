var canvas = document.getElementById('canvas'),
	canvas2 = document.getElementById('canvas2'),
	ctx = canvas.getContext('2d'),
	ctx2 = canvas2.getContext('2d'),
	step = shg= 0,
	scr1 = scr2 = 100,
	clr = 120,
	direct,prg,vert,
	blr = 100,
	rad = udr = 3,
	raddir = 0.1,
	clrdir = -1,
	scrlh=document.body.clientHeight,
	scrlw=document.body.clientWidth,
	centrX = x = Math.round(scrlw/4)*2,
	centrY = y = Math.round(scrlh/4)*2,
	timer = 1;

canvas.setAttribute('width', scrlw);
canvas.setAttribute('height', scrlh);
canvas2.setAttribute('width', scrlw);
canvas2.setAttribute('height', scrlh);

if (scrlh<scrlw) vert = false; //prg = Math.round(scrlh/2
else vert = true;//prg = Math.round(scrlw/2)

function draw() {
	ctx.beginPath();
	if (step == 0)
	{
		step = udr;//rnd(udr/1.2,udr);
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
	console.log(udr,'-', clr);

	if (clr >= 120) clrdir = -1;
	else if (clr <= 0) clrdir = 1;

	if (blr == 0) blr = 100;
	if (rad > 30) raddir = -0.1;
	if (rad < 5 && rad > 0) raddir = 0.1;
	if (shg) rad=rad+raddir;

	if (vert) //ВЕРТИКАЛЬНЫЙ
	{
		switch (true) {
			case (y<rad*2+16): pwin(2); break;
			case (y>scrlh-16): pwin(1); break;
			case (x<rad*2): step = 0, x = x + 3; break;
			case (x>scrlw): step = 0, x = x - 3; break;
		}
	}
	else //ГОРИЗОНТАЛЬНЫЙ
	{
		switch (true) {
			case (x<rad*2+16): pwin(2); break;
			case (x>scrlw-16): pwin(1); break;
			case (y<rad*2): step = 0, y = y + 3; break;
			case (y>scrlh): step = 0, y = y - 3; break;
		}
	}

	clr = clr + clrdir;
	blr--;
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'hsl('+clr+','+rad+'%,'+rad*1.5+'%)';
	ctx.fillStyle = 'hsl('+clr+',50%,80%)';
	if (shg) ctx.arc(x-rad,y-rad,rad,0,6.28,false);
	ctx.fill();
	ctx.stroke();
}
ctx.fillStyle = '#FFF';
score(scr1,scr2);
lghtbx('PIPELINE','PIPELINE',55,1);
lghtbx('PIPELINE','PIPELINE',55,2);
lghtbx('PIPELINE','PIPELINE',55,3);

canvas.onmousedown = omdown;
canvas.onmouseup = omup;
canvas.addEventListener('touchstart', omdown,false);
canvas.addEventListener('touchend', omup,false);

function pwin(win){
	clearTimeout(timer);
	shg = 0;
	y=centrY;
	x=centrX;
	rad = Math.round(rad);
	if (win == 1) scr1=scr1-rad,scr2=scr2+rad;
	else scr1=scr1+rad,scr2=scr2-rad;

	if (scr2 >= 200) 
	{
		scr2 = "WINNER!";
		scr1 = "LOSER!";
		score(scr1,scr2,2);
		scr1 = scr2 = 100;
	}
	else if (scr1 >= 200) {
		scr1 = "WINNER!";
		scr2 = "LOSER!";
		score(scr1,scr2,1);
		scr1 = scr2 = 100;
	}
	else score(scr1,scr2,win);
	rad=3;
	step = 0;
}
function omdown() {
	udr = clr + 5;
	step = 0;
	clrdir = 0;
}
function omup() {
	udr = 3;
	step = 0;
	clrdir = -1;
}
function omdown2() {
	canvas2.classList = '';
	udr = 3;
	shg = 4;
	canvas2.onmousedown = null;

	timer = setInterval(function() {
  		draw();
	}, clr/100+2);
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
}
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

	canvas2.classList = 'viz';

	var h1 = (scrlh/100*scr1-20)/2, h2 = (scrlh/100*scr2-20)/2;

	if (vert)
	{
		if (win==1) lghtbx(scrst-rad+'+'+rad+'='+scrst,scrst2+rad+'-'+rad+'='+scrst2, 100,1);
		else if (win==2) lghtbx(scrst+rad+'-'+rad+'='+scrst,scrst2-rad+'+'+rad+'='+scrst2, 100,2);

		ctx.fillRect(10,0,scrlw-20,16);
		ctx.fillRect(10,scrlh-16,scrlw-20,16);
		ctx.strokeRect(10,0,scrlw-20,16);
		ctx.strokeRect(10,scrlh-16,scrlw-20,16);
	}
	else 
	{
		if (win==1) 
		{
			lghtbx('='+scrst2,scrst+rad, 100,1);
			lghtbx('-'+rad,'+'+rad, 100,3);
			lghtbx('='+scrst,scrst2-rad, 100,2);
		}
		else if (win==2)
		{			
			lghtbx('='+scrst,scrst2+rad, 100,2);
			lghtbx('+'+rad,'-'+rad, 100,3);
			lghtbx('='+scrst2,scrst-rad, 100,1);
		}

		ctx.fillRect(0,10,16,scrlh-20);
		ctx.fillRect(scrlw-16,10,16,scrlh-20);
		ctx.strokeRect(0,10,16,scrlh-20);
		ctx.strokeRect(scrlw-16,10,16,scrlh-20);

		ctx.fillStyle = '#f66';

/*		ctx.strokeRect(0,h2,16,10);
		ctx.strokeRect(scrlw-16,h1,16,10);*/
		ctx.fillRect(scrlw-16,h1,16,16);
		ctx.fillRect(0,h2,16,16);
	}
}

function lghtbx(txt,txt2,fsz,win) 
{
	ctx2.clearRect(0,0,scrlw,scrlh);

	var x=0,y=0,xs=0,ys=0,cntx=0,cnty=0,lght=50;
	var clr2 = clr+200;
	var rad2 = rad;
	ctx2.textAlign = "center";
	ctx2.textBaseline = "middle";
	ctx2.lineWidth = 4;


	if (vert)
	{	
		fsz = fsz/2;
		if (win == 2) xs = 0, ys = -4, cntx = 0, cnty = -25;
		else if (win == 1) xs = 0, ys = 4, cntx = 0, cnty = 25;
		else if (win == 3) xs = 0, ys = -4, cntx = 0, cnty = 0;
	}
	else
	{
		if (win == 2) xs = -4, ys = 4, cntx = 60, cnty = 0;
		else if (win == 1) xs = 4, ys = 4, cntx = -60, cnty = 0;
		else if (win == 3) xs = -4, ys = 0, cntx = 60, cnty = 0;
	}
	var anim = setInterval(function() {
		ctx2.font = 'bold italic '+fsz+'px monospace';
		ctx2.fillStyle = 'hsl('+clr2+',50%,80%)';
		ctx2.strokeStyle = 'hsl('+clr2+',50%,'+lght+'%)';
		ctx2.strokeText(txt, scrlw/2+x-cntx, scrlh/2+y-cnty);// +
		ctx2.fillText(txt, scrlw/2+x-cntx, scrlh/2+y-cnty);// +
		ctx2.strokeText(txt2, scrlw/2-x+cntx, scrlh/2-y+cnty);// -
		ctx2.fillText(txt2, scrlw/2-x+cntx, scrlh/2-y+cnty);// -
		x=x+xs;
		y=y+ys;
		lght--;
		clr2=clr2-8;
	}, 16);

	setTimeout(function(){
		clearInterval(anim);
		canvas2.onmousedown = omdown2;
		ctx2.fillStyle = '#FFF';

		ctx2.strokeText(txt2, scrlw/2-x+cntx, scrlh/2-y+cnty);// -
		ctx2.strokeText(txt, scrlw/2+x-cntx, scrlh/2+y-cnty);// +
		ctx2.fillText(txt, scrlw/2+x-cntx, scrlh/2+y-cnty);// +
		ctx2.fillText(txt2, scrlw/2-x+cntx, scrlh/2-y+cnty);// -

	},400);
}



