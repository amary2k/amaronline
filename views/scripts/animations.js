var c = document.createElement('canvas');
div = document.getElementById("canvas-container"); 

c.id     = "animationCanvas";
c.width  = div.scrollWidth;
c.height = div.scrollHeight;
c.style.backgroundColor = "#777";
//c.style.zIndex   = 8;
c.style.position = "absolute";
div.appendChild(c)

window.addEventListener('resize', resizeCanvas, false);

//var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var canvasWidth = c.scrollWidth;
var canvasHeight = c.scrollHeight;
var angle = 90;
var heightOfWave = 50;
var yPos = Math.floor(canvasHeight/2);
var xPos = 100;
var running = true;
var prevTS = 0;
var fpsDelay = 50;
isSingleWave = true;


window.onscroll = function() {playOrStopAnimation()};

function playOrStopAnimation() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        running = false;
    } else if(!running){
        running = true;
		drawWave();
    }
}

//==========================================================================================================================
drawScreenFillWave = function(angle){
	heightOfWave = 30;
	var noOfDiv = canvasHeight/heightOfWave;
    //drawFullWaveSegments(angle, 0, 0, noOfDiv);
	drawFullTidalWaveSegments(angle, 0, 0, noOfDiv);
}
drawFullWaveSegments = function(angle, startXPos, startYPosition, noOfDiv){
    var radiansAngle = 0;
    //ctx.shadowBlur=10;
    //ctx.shadowOffsetX=20;
    //ctx.shadowColor="black";
	//var incrementValueForWaveDist = (360/4)/heightOfWave;
	//console.log(incrementValueForWaveDist);
	var yDivHeight = (canvasHeight/noOfDiv);
    for(var x=startXPos; x < (canvasWidth-startXPos); x+=heightOfWave)
    {
		var waveHeight = heightOfWave;
        radiansAngle = angle * (Math.PI/180);
		/* if(radiansAngle > ((3*Math.PI)/2) && radiansAngle < Math.PI/2)
			waveHeight-=2;
		else
			waveHeight+=2;  */ 
		//console.log(waveHeight);
        
        yPosition = startYPosition + (waveHeight * Math.sin(radiansAngle));
		xPosition = x + (waveHeight * Math.cos(radiansAngle));
        
        ctx.beginPath();
        //ctx.fillRect(xPosition,yPosition,1,1);
		for(var i=0; i <= noOfDiv; i++)
		{
			ctx.arc(xPosition + heightOfWave/2, yPosition, heightOfWave/2, 0, 2*Math.PI);
			ctx.stroke(); ctx.beginPath();
			ctx.arc(xPosition, yPosition, 1, 0, 2*Math.PI);
			yPosition += yDivHeight;
		}
        ctx.stroke();
        //ctx.fill();
        angle+=4;
		if(angle > 360)	angle -= 360;
    }
}

drawFullTidalWaveSegments = function(angle, startXPos, startYPosition, noOfDiv){
    var radiansAngle = 0;
    //ctx.shadowBlur=10;
    //ctx.shadowOffsetX=20;
    //ctx.shadowColor="black";
	//var incrementValueForWaveDist = (360/4)/heightOfWave;
	//console.log(incrementValueForWaveDist);
	var yDivHeight = (canvasHeight/noOfDiv);
    for(var x=startXPos; x < (canvasWidth-startXPos); x+=heightOfWave)
    {
		var waveHeight = heightOfWave;
        radiansAngle = angle * (Math.PI/180);
		/* if(radiansAngle > ((3*Math.PI)/2) && radiansAngle < Math.PI/2)
			waveHeight-=2;
		else
			waveHeight+=2;  */ 
		//console.log(waveHeight);
        
        
        
		var newYPosition = startYPosition;
        ctx.beginPath();
        //ctx.fillRect(xPosition,yPosition,1,1);
		for(var i=0; i <= noOfDiv; i++)
		{
			var circleX = x + heightOfWave/2;
			
			//ctx.arc( circleX, newYPosition, heightOfWave/2, 0, 2*Math.PI);
			ctx.stroke(); ctx.beginPath();
			yPosition = newYPosition + ((heightOfWave/2) * Math.sin(radiansAngle));
			xPosition = circleX + ((heightOfWave/2) * Math.cos(radiansAngle));
			ctx.arc(xPosition, yPosition, 1, 0, 2*Math.PI);
			yPosition += yDivHeight;
			newYPosition += yDivHeight
		}
        ctx.stroke();
        //ctx.fill();
        angle+=4;
		if(angle > 360)	angle -= 360;
    }
}
//==========================================================================================================================

drawWaveSegments = function(angle, smoothness){
    var radiansAngle = 0;
    ctx.shadowBlur=10;
    ctx.shadowOffsetX=20;
    ctx.shadowColor="black";
    var startPos = 50;
//var yPosition2=[];
    for(var x=startPos; x < (canvasWidth-startPos); x+=smoothness)
    {
        radiansAngle = angle * (Math.PI/180);
        
        yPosition = yPos + (heightOfWave * Math.sin(radiansAngle));

	//yPosition2.push(yPos - (heightOfWave * Math.sin(radiansAngle)));

        //if(x==startPos) ctx.fillRect(startPos-2,yPosition-2,4,4);
        if(x==startPos) {
			ctx.beginPath();
            ctx.fillText("(" + startPos + "," + Math.floor(yPosition) + ")" ,startPos,yPosition - 10);
            ctx.arc(startPos, yPosition, 2, 0, Math.PI * 2);
			ctx.fill();
			ctx.beginPath();

	//ctx.arc(startPos, yPosition2 , 2, 0, Math.PI * 2);
        }
        ctx.lineTo(x,yPosition);
        angle++;
    }
ctx.stroke();
//ctx.moveTo(startPos, yPos);
	//for(var x=startPos, i = 0; x < (canvasWidth-startPos); x++, i++){
	//ctx.lineTo(x,yPosition2[i]);
	//}
}
//==========================================================================================================================
drawWave = function()
{
	prevTS = new Date().getTime();
    //console.log("angle " + angle);
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	if(angle < 0) angle = 360;
    
    ctx.save();
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff';
    
    
	if(isSingleWave)
	{
		ctx.lineWidth = 2;
		heightOfWave = 50;
		drawWaveSegments(angle, 3);
	}
	else
	{
		ctx.lineWidth = 1;
		drawScreenFillWave(angle);
	}

	//console.log( "x = " + heightOfWave * Math.cos(radiansAngle) + " y = " +heightOfWave * Math.sin(radiansAngle ) + " Height: " + canvasHeight + " Width: " +  canvasWidth);
	angle = angle - 1;
	var curDelay = fpsDelay;
	var tSDifference = new Date().getTime() - prevTS;
	if(tSDifference < curDelay)
		curDelay = tSDifference;
	
	if(running) setTimeout(drawWave,curDelay);
};

function resizeCanvas() {
				c.width = window.innerWidth;
                canvasWidth = c.scrollWidth;
				if(!running) drawWave();
			}



drawWave();