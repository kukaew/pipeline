
var canvas=document.getElementById('canvas'),
canvas2=document.getElementById('canvas2'),
canvas3=document.getElementById('canvas3'),
img=document.getElementById('img'),
p1=document.getElementById('p1'),
p2=document.getElementById('p2'),
ctx=canvas.getContext('2d'),
ctx2=canvas2.getContext('2d'),
ctx3=canvas3.getContext('2d'),
step=shg=lvl=mltp=0,
scr1=scr2=100,
clr=180,
drct,
blr=100,
rad=3,
raddir=0.1,
clrdir=2,
scrlh=window.innerHeight,
scrlw=window.innerWidth,
centrX=x=Math.round(scrlw/4)*2,
centrY=y=Math.round(scrlh/4)*2,
timer=anim=plr=udr=1,
lght=85;

if (scrlh<scrlw) var vert=false, fsz=Math.round(scrlh/7),arw1=' \u2192 ', arw2=' \u2190 ';
else var vert=true, fsz=Math.round(scrlw/7), arw1=' \u2191 ', arw2=' \u2193 ';

if (fsz>100) fsz=100;
var sko=70-fsz;
if (sko<8) sko=8;
console.log(sko);

window.onload = function(){	
	canvas.setAttribute('width', scrlw);
	canvas.setAttribute('height', scrlh);
	canvas2.setAttribute('width', scrlw);
	canvas2.setAttribute('height', scrlh);
	canvas3.setAttribute('width', scrlw);
	canvas3.setAttribute('height', scrlh);
	lghtbx(15,0,0,9);
	canvas2.classList='viz';
	ctx.fillStyle='#FFF';
	score();
	canvas.onmousedown=omdown;
	canvas.onmouseup=omup;
	canvas.addEventListener('touchstart', omdown,false);
	canvas.addEventListener('touchend', omup,false);
}

function draw()
{
	ctx.lineWidth=2;
	ctx.beginPath();
	if (step == 0)
	{
		step=udr;
		drct=rnd(0,38+lvl);
	}
	else step--;

	switch (true)
	{
		case (drct < 5):
			// вверх
			y=y-shg;
			break;
		case (drct < 10):
			// вправо
			x=x+shg;
			break;
		case (drct < 15):
			// вниз
			if (vert) x=x-shg;
			else y=y+shg;
			break;
		case (drct < 20):
			// вправо вверх
			x=x+shg;
			y=y-shg;
			break;
		case (drct < 25):
			// вправо вниз
			x=x+shg;
			y=y+shg;
			break;
		case (drct < 30):
			// влево вниз
			x=x-shg;
			y=y+shg;
			break;
		case (drct < 35):
			// влево вверх
			x=x-shg;
			y=y-shg;
			break;
		default:
			// влево
			if (!vert) x=x-shg;
			else y=y+shg;
			break;
	}
	if (clr>=300 && clrdir != 0) clrdir=-2;
	else if (clr<=180 && clrdir != 0) clrdir=2;
	if (blr == 0) blr=100;
	if (rad>30) raddir=-0.1;
	if (rad < 5 && rad>0) raddir=0.1;
	if (shg) rad=rad+raddir;
	clr=clr+clrdir;
	blr--;
	ctx.strokeStyle='hsl('+clr+','+rad+'%,'+rad*1.5+'%)';
	ctx.fillStyle='hsl('+clr+',100%,'+lght+'%)';
	if (vert) switch (true) 
	{
		case (y<rad*2+16): pwin(1); break;
		case (y>scrlh-16): pwin(2); break;
		case (x<rad*2): step=0, x=x+3; break;
		case (x>scrlw): step=0, x=x-3; break;
	}
	else switch (true)
	{
		case (x<rad*2+16): pwin(1);	break;
		case (x>scrlw-16): pwin(2);	break;
		case (y<rad*2): step=0, y=y+3; break;
		case (y>scrlh): step=0, y=y-3; break;
	}

	ctx.arc(x-rad,y-rad,rad,0,6.28,false);
	ctx.fill();
	ctx.stroke();
}
function pwin(win)
{
	img.classList='viz';
	clearTimeout(timer);
	shg=0;
	y=centrY;
	x=centrX;
	rad=Math.round(rad);
	if (win == 1) scr1=scr1-rad,scr2=scr2+rad;
	else scr1=scr1+rad,scr2=scr2-rad;

	if (scr2>=200) 
	{
		if (mltp) if (vert) lghtbx(15,0,0,4); else lghtbx(15,0,0,3);
		else if (vert) lghtbx(15,0,0,8); else lghtbx(15,0,0,5);
		scr1=scr2=100;
	}
	else if (scr1>=200)
	{
		if (mltp) if (vert) lghtbx(15,0,0,3); else lghtbx(15,0,0,4);
		else if (vert) lghtbx(15,0,0,5); else lghtbx(15,0,0,8);
		scr1=scr2=100;
	}
	else 
	{
		score();
		if (win==1) lghtbx(rad,scr1,scr2,1);
		else lghtbx(rad,scr1,scr2,2);
	}

	rad=3;
	step=0;
}
function omdown()
{
	udr=clr-165;
	step=0;
	clrdir=0;
	ctx.lineWidth =0;
	lght=85;
}
function omup()
{
	udr=1;
	step=0;
	clrdir=2;
	ctx.lineWidth=2;
	lght=80;
}
function omdown2(win,e)
{
	if (win==9)	if (e.offsetY > scrlh/2) mltp = 1; else {mltp = 0; snow();}

	if (mltp) switch (win) {
		case 1:
		case 2:
			if (plr==1) plr=2; else plr=1;
			lghtbx(15,0,0,plr+5);
			break;
		case 3: 
		case 4:
			scr1=scr2=100;
			score();
			if (plr==1) plr=2; else plr=1;
			lghtbx(15,0,0,plr+5);
			break;
		case 5:
		case 6:
		case 7:
			go();
			break;
		case 8:
		case 9:
			lghtbx(15,0,0,6);
			break;
	}
	else switch (win) {
		case 3:
			scr1=scr2=100;
			score();
			if (plr==1) plr=2; else plr=1;
			lghtbx(15,0,0,5);
			break;
		case 8: score(); go(); break;
		case 4:
		case 5:
		case 9:
			scr1=scr2=100;
			score();
			lghtbx(15,0,0,8);
			break;
		default:
			go();
			break;
	}
}
function go()
{
	img.classList='';
	clearInterval(anim);
	canvas2.classList='';
	udr=1;
	shg=4;
	canvas2.onmousedown=null;
	timer=setInterval(function() {
  		draw();
	}, sko);
}
function rnd(min,max)
{
	var rand=min-0.5+Math.random() * (max-min+1)
	rand=Math.round(rand);
	return rand;
}
function getImage(canvas)
{
	var imageData=canvas.toDataURL();
	var image=new Image();
	image.src=imageData;
	return image;
}
function saveCanvasAsImageFile()
{
	var image=getImage(canvas),
		link=document.createElement("a");
	link.setAttribute("href", image.src);
	link.setAttribute("download", "pipeline");
	link.click();
}
function score()
{
	ctx.beginPath();
	ctx.lineWidth=4;
	if (vert)
	{
		var h1=(scrlw/100*scr1-40)/2, h2=(scrlw/100*scr2-40)/2;

		ctx.strokeRect(10,2,scrlw-20,13);
		ctx.fillRect(10,2,scrlw-20,13);	

		ctx.strokeRect(10,scrlh-15,scrlw-20,13);
		ctx.fillRect(10,scrlh-15,scrlw-20,13);

		ctx.fillStyle='#fff';


		if (h1 < 0) h1=10;
		if (h2 < 0) h2=10;

		ctx.strokeRect(15,6,h1-10,5);
		ctx.fillRect(15,6,h1-10,5);

		ctx.strokeRect(15,scrlh-11,h2-10,5);
		ctx.fillRect(15,scrlh-11,h2-10,5);
	}
	else 
	{    
		var h1=(scrlh/100*scr1-40)/2, h2=(scrlh/100*scr2-40)/2;

		ctx.strokeRect(2,10,15,scrlh-20);		
		ctx.fillRect(2,10,15,scrlh-20);

		ctx.strokeRect(scrlw-16,10,15,scrlh-20);
		ctx.fillRect(scrlw-16,10,15,scrlh-20);

		ctx.fillStyle='#fff';

		ctx.strokeRect(7,h2+25,5,h1-5);
		ctx.fillRect(7,h2+25,5,h1-5);

		ctx.strokeRect(scrlw-11,h1+25,5,h2-5);
		ctx.fillRect(scrlw-11,h1+25,5,h2-5);
	}
}
function snow() 
{
	ctx3.lineWidth=1;
	canvas3.classList='viz';
	for(var i=0; i<scrlw/100;i++)
		window['x'+i] = rnd(scrlw/2,scrlw), 
		window['y'+i] = rnd(0,scrlh),
		window['d'+i] = rnd(0,99),
		window['c'+i] = rnd(180,360);
	var snow=setInterval(function()
	{	
		ctx3.clearRect(0,0,scrlw,scrlh);
		for(var i=0; i<scrlw/100;i++)
		{
			ctx3.strokeStyle = 'hsl('+window['c'+i]+',100%,10%)';
			ctx3.fillStyle='hsl('+(window['c'+i]-window['d'+i]) +',100%,'+lght+'%)';
			window['c'+i]++;

			if (!vert) 
			{
				if (window['x'+i] > scrlw/2) window['d'+i] = window['d'+i] + (lvl*2+1);
				else if (window['d'+i] > 0) window['d'+i] = window['d'+i] - (lvl*2+1);
				else window['x'+i] = scrlw, window['y'+i] = rnd(0,scrlh), window['d'+i] = rnd(0,100), window['c'+i] = rnd(180,360);
				window['x'+i] = window['x'+i] - (lvl*3+1);
				ctx3.strokeRect(window['x'+i],window['y'+i],window['d'+i]/4,5);
				ctx3.fillRect(window['x'+i],window['y'+i],window['d'+i]/4,5);
			}
			else 
			{
				if (window['y'+i] < scrlh/2) window['d'+i] = window['d'+i] + (lvl*2+1);
				else if (window['d'+i] > 0) window['d'+i] = window['d'+i] - (lvl*2+1);
				else window['y'+i] = 0, window['x'+i] = rnd(0,scrlw), window['d'+i] = rnd(0,100), window['c'+i] = rnd(180,360);
				window['y'+i] = window['y'+i] + (lvl*3+1);
				ctx3.strokeRect(window['x'+i],window['y'+i],5,window['d'+i]/4);
				ctx3.fillRect(window['x'+i],window['y'+i],5,window['d'+i]/4);
			}
		}
	},40)
}
function lghtbx(col,s1,s2,win)
{
	clearInterval(anim);
	canvas2.classList='viz';

	ctx2.clearRect(0,0,scrlw,scrlh);
	var xs=ys=-4,xs2=ys2=4,clrs=5,txt=txt2='',clr2=300,xl=yl=xl2=yl2=itr=0,txt0=txt02='';

	if (win>2) var xr=xr0=scrlw/2-fsz,xr2=xr02=scrlw/2+fsz,yr=yr0=scrlh/2-fsz/2,yr2=yr02=scrlh/2+fsz/2,spd=5;
	else var xr=xr0=scrlw/2,xr2=xr02=scrlw/2,yr=yr0=scrlh/2,yr2=yr02=scrlh/2,spd=15;

	switch (win)
	{
		case 1:
			s1=s1+col; s2=s2-col;
			break;
		case 2:
			s2=s2+col; s1=s1-col;
			break;
		case 3:
			txt0='A winner ________', txt02='!dnoces si ______';
			break;
		case 4:
			txt0='A winner _______', txt02='!tsrif si ______';
			break;
		case 5:
			txt0='Game ________', txt02='revo ________';
			lvl=0;
			break;
		case 6:
			txt0='Player '+arw1+arw1+arw1+arw1+arw1+arw1, txt02=' eno '+arw1+arw1+arw1+arw1+arw1+arw1+arw1;
			break;
		case 7:
			txt0='Player '+arw2+arw2+arw2+arw2+arw2+arw2+arw2, txt02=' owt '+arw2+arw2+arw2+arw2+arw2+arw2+arw2+arw2;
			break;
		case 8:
			txt0=lvl++ +1+'    '+arw1+arw1+arw1, txt02='level '+arw1+arw1+arw1;
			//sko=sko+lvl/5;
			break;
		case 9:
			txt0='1-player   ', txt02='reyalp-2   ';
			break;
	}

	ctx2.textAlign="center";
	ctx2.textBaseline="middle";
	ctx2.lineWidth=4;
	ctx2.font='bold '+fsz+'px monospace';

	anim=setInterval(function(){

		itr=itr+col/(spd*3.5);

		switch (win) {
			case 1:
				txt=Math.round(s1-itr), txt2=Math.round(s2+itr);
				break;
			case 2:
				txt=Math.round(s1+itr), txt2=Math.round(s2-itr);
				break;
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
				txt=txt0[s1], txt2=txt02[s2];
				break;
		}

		ctx2.fillStyle='hsl('+clr2+',50%,80%)';
		ctx2.strokeStyle='hsl('+clr2+',50%,25%)';

		ctx2.strokeText(txt, xr+xl, yr+yl);
		ctx2.fillText(txt, xr+xl, yr+yl);

		ctx2.strokeText(txt2, xr2+xl2, yr2+yl2);
		ctx2.fillText(txt2, xr2+xl2, yr2+yl2);

		ctx2.fillStyle='#fff';
		ctx2.strokeText(txt, xr+xl+xs, yr+yl+ys);
		ctx2.fillText(txt, xr+xl+xs, yr+yl+ys);

		ctx2.strokeText(txt2, xr2+xl2+xs2, yr2+yl2+ys2);
		ctx2.fillText(txt2, xr2+xl2+xs2, yr2+yl2+ys2);

		if(!vert || win>2) xl=xl+xs,xl2=xl2+xs2;
		else yl=yl+ys,yl2=yl2+ys2;

		if (clr2==180) clrs=5;
		if (clr2==300) clrs=-5;
		clr2=clr2+clrs;
		if (itr>=col && win < 3) itr=xl=yl=xl2=yl2=0;
		else if (itr>=col && win>2) {
			s2++, s1++, itr=xl=yl=xl2=yl2=0, xr=xr+fsz/1.75, xr2=xr2-fsz/1.75;
			if (s1>=txt0.length) s1=s2=0,xr=xr0,xr2=xr02,yr=yr0,yr2=yr02;
		}
		canvas2.onmousedown=function(e) {
			omdown2(win,e);
		}
	},spd)
}





