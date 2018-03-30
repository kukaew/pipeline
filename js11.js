var canvas = document.getElementById('canvas'),
	canvas2 = document.getElementById('canvas2'),
	ctx = canvas.getContext('2d'),
	ctx2 = canvas2.getContext('2d'),
	step = shg= 0,
	scr1 = scr2 = 100,
	clr = 180,
	direct,prg,vert,
	blr = 100,
	rad = 3, 
	udr = 2,
	raddir = 0.1,
	clrdir = 3,
	scrlh=document.body.clientHeight,
	scrlw=document.body.clientWidth,
	centrX = x = Math.round(scrlw/4)*2,
	centrY = y = Math.round(scrlh/4)*2,
	timer = anim = 1,
	lght = 85;
canvas.setAttribute('width', scrlw);
canvas.setAttribute('height', scrlh);
canvas2.setAttribute('width', scrlw);
canvas2.setAttribute('height', scrlh);

if (scrlh<scrlw) vert = false, fsz = scrlh/5; //prg = Math.round(scrlh/2
else vert = true, fsz = scrlw/5;//prg = Math.round(scrlw/2)

if (fsz>100) fsz = 100;

canvas2.onmousedown = omdown2;
function draw() {
	ctx.lineWidth = 2;
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
	if (clr >= 300) clrdir = -3;
	else if (clr <= 180) clrdir = 3;
	if (blr == 0) blr = 100;
	if (rad > 30) raddir = -0.1;
	if (rad < 5 && rad > 0) raddir = 0.1;
	if (shg) rad=rad+raddir;
	clr = clr + clrdir;
	blr--;
	ctx.strokeStyle = 'hsl('+clr+','+rad+'%,'+rad*1.5+'%)';
	ctx.fillStyle = 'hsl('+clr+',100%,'+lght+'%)';
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
			case (x<rad*2+16): pwin(2);
			break;
			case (x>scrlw-16): pwin(1);
			break;
			case (y<rad*2|| y>scrlh):
				switch (direct) {
					case 0: direct = 2; y=y+shg;break;
					case 4: direct = 5; y=y+shg;break;
					case 7: direct = 6; y=y+shg;break;

					case 2: direct = 0; y=y-shg;break;
					case 5: direct = 4; y=y-shg;break;
					case 6: direct = 7; y=y-shg;break;					
				}; 
			break;	
		}
	}
	ctx.arc(x-rad,y-rad,rad,0,6.28,false);
	ctx.fill();
	ctx.stroke();
}
ctx.fillStyle = '#FFF';
score(scr1,scr2);
/*lghtbx('PIPELINE','PIPELINE',55,1);
lghtbx('PIPELINE','PIPELINE',55,2);*/
//lghtbx('PIPELINE','PIPELINE',55,3);
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
	udr = clr - 160;
	step = 0;
	clrdir = 0;
	ctx.lineWidth =0;
	lght = 85;
}
function omup() {
	udr = 2;
	step = 0;
	clrdir = -1;
	ctx.lineWidth = 2;
	lght = 80;
}
function omdown2() {
	canvas2.classList = '';
	udr = 2;
	shg = 4;
	canvas2.onmousedown = null;
	clearInterval(anim);
	timer = setInterval(function() {
  		draw();
	}, 10);
}
function rnd(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand;
}
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
	ctx.beginPath();
	canvas2.classList = 'viz';

	if (win==1) lghtbx(rad,1);
	else if (win==2) lghtbx(rad,2);

	ctx.lineWidth = 4;
	if (vert)
	{
		var h1 = (scrlw/100*scr1-40)/2, h2 = (scrlw/100*scr2-40)/2;

		ctx.strokeRect(10,2,scrlw-20,13);
		ctx.fillRect(10,2,scrlw-20,13);	

		ctx.strokeRect(10,scrlh-15,scrlw-20,13);
		ctx.fillRect(10,scrlh-15,scrlw-20,13);

		ctx.fillStyle = '#fff';

		ctx.strokeRect(15,6,h1,5);
		ctx.fillRect(15,6,h1,5);

		ctx.strokeRect(15,scrlh-11,h2,5);
		ctx.fillRect(15,scrlh-11,h2,5);
	}
	else 
	{
		var h1 = (scrlh/100*scr1-40)/2, h2 = (scrlh/100*scr2-40)/2;

		ctx.strokeRect(2,10,14,scrlh-20);		
		ctx.fillRect(2,10,14,scrlh-20);

		ctx.strokeRect(scrlw-16,10,14,scrlh-20);
		ctx.fillRect(scrlw-16,10,14,scrlh-20);

		ctx.fillStyle = '#fff';

		ctx.strokeRect(6,h2+25,5,h1);
		ctx.fillRect(6,h2+25,5,h1);

		ctx.strokeRect(scrlw-11,h1+25,5,h2);
		ctx.fillRect(scrlw-11,h1+25,5,h2);
	}
}
function lghtbx(col,win){
	ctx2.clearRect(0,0,scrlw,scrlh);
	var clrs=5,txt=txt2='',clr2=300,sdvs=8,xl=yl=xl2=yl2=itr=xr=yr=sdvx=sdvy=0;

	if (win==1) var xs = ys = 4, xs2 = ys2 = -4;
	else var xs = ys = -4, xs2 = ys2 = 4;

	ctx2.textAlign="center";
	ctx2.textBaseline="middle";
	ctx2.lineWidth=4;
	ctx2.font='bold italic '+fsz+'px monospace';

	anim=setInterval(function(){
		xr = scrlw/2-sdvx;
		yr = scrlh/2+sdvy;
		itr=itr+col/25;

		txt='+'+Math.round(itr);
		txt2='-'+Math.round(itr);

		ctx2.fillStyle='hsl('+clr2+',50%,80%)';
		ctx2.strokeStyle='hsl('+clr2+',50%,25%)';

		ctx2.strokeText(txt, xr+xl, yr+yl);
		ctx2.fillText(txt, xr+xl, yr+yl);

		ctx2.strokeText(txt2, xr+xl2, yr+yl2);
		ctx2.fillText(txt2, xr+xl2, yr+yl2);

		ctx2.fillStyle='#fff';

		ctx2.strokeText(txt, xr+xl+xs, yr+yl+ys);
		ctx2.fillText(txt, xr+xl+xs, yr+yl+ys);

		ctx2.strokeText(txt2, xr+xl2+xs2, yr+yl2+ys2);
		ctx2.fillText(txt2, xr+xl2+xs2, yr+yl2+ys2);

		xl=xl+xs;
		yl=yl+ys;
		xl2=xl2+xs2;
		yl2=yl2+ys2;

		if (clr2==180) clrs=5;
		if (clr2==300) clrs=-5;
		clr2=clr2+clrs;

		if (itr>=col)
		{
			itr=xl=yl=xl2=yl2=0;

			sdvx=sdvx+sdvs;
			if (sdvx < -10) sdvs=8;
			if (sdvx > 10) sdvs=-8;
			canvas2.onmousedown = omdown2;
		}

	},20);
}

function lghtbx2(txt,txt2,fsz,win) 
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