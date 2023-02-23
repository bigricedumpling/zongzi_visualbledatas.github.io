fr = 30
let kMax; // maximal value for the parameter "k" of the blobs
let step = 0.01; // difference in time between two consecutive blobs
let n = 100; // total number of blobs
let radius = 0; // radius of the base circle
let inter = 0.05; // difference of base radii of two consecutive blobs
let maxNoise = 200; // maximal value for the parameter "noisiness" for the blobs


let capture;
var cellsize = 20; // Dimensions of each cell in the grid
var cols, rows;
var w = 1240;
var h =1240;
var f = 1;


function setup(){
   
   var width = 1024;
   var height = 600;
   var w = 1400;
	 var h =1240;
   createCanvas(1240,1240,WEBGL);
   background(0);
  //frameRate(600);
	 //
	 //angleMode(DEGREES);
   //noFill();
	 //noLoop();
	 kMax = random(0.6, 1.0);
	 video = createCapture(VIDEO);
	 video.hide();
   video.size(width, height);
}    


function draw(){
	//f = 1;
	
	if (f === 1){
		//colorMode(HSB, 1);
		eye();
		//fill(255);
		rect(-50,300,100,50,50)		
	}
	if (f === 0){
		//colorMode(RGB);
		pixel();
		rect(-50,300,100,50,50)	
	}
	

}

function mousePressed() {
 
 if((mouseX >9*width/10) && (mouseX<9*width/10+60) && (mouseY > 8*height/10) && (mouseY < 8*height/10+20)){
    cellsize = cellsize+3;
	}
	
	if((mouseX >9*width/10) && (mouseX<9*width/10+60) && (mouseY > 8.5*height/10) && (mouseY < 8.5*height/10+20)){
    cellsize = cellsize-3;
		}
	
	if ((mouseX >-1000) && (mouseX<1000) && (mouseY > 920) && (mouseY <970)){
	  if (f === 1) {
    f = 0 ;
  } else if (f===0) {
    f=1;
  }
	}
	//fill(255);
}


function eye(){
	var r = 50;
  background(0);
  
	
 
  dirY = (mouseY / float(height) - 0.5) * 50;
  dirX = (mouseX / float(width) - 0.5) * 50;
  directionalLight(204, 204, 204, -dirX, -dirY, -1);
  //translate(width / 2, height / 2);
	noFill();
	strokeWeight(0.1);
	stroke(255);
	push();
	rotateY(dirX);
	sphere(r,8,8);
	pop();
  
	strokeWeight(10);
  ellipse(0,0,r*2,r*2);
	
	strokeWeight(1);
	
	
	ellipse(0,0,r*2.5,r*2.5);

	
	
	ellipse(dirX,dirY,30,30)
	
	let t = frameCount/100;
	let alpha = 0 ;
	fill((alpha/5 + 0.75)%1, 1, 1, alpha);
	let size = radius 
	let k = kMax 
	let noisiness = maxNoise
  blob(size,0,0, k/2, t/2 , noisiness);
	
	fill(255);
	push();
	rotateZ(millis() / 1000);
	strokeWeight(1);
	
	ellipse(1.3*r,0,r*0.2,r*0.2);
	
	ellipse(-1.3*r,0,r*0.2,r*0.2);
	pop();
}


function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
	let angleStep = 360 / 10;
  for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
    let r1, r2;
		
		r1 = cos(theta)+1;
		r2 = sin(theta)+1; // +1 because it has to be positive for the function noise
    let r = size + noise(k * r1,  k * r2, t) * noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape();
}


function pixel() {
	//translate(500,300);
  scale(-1,1);
  background(0);
	
  //noStroke();
  //fill(0);
  cols = width/cellsize;             // Calculate # of columns
  rows = height/cellsize;
  if (video.width > 0) {
    let img = video.get(0, 0, video.width, video.height);
    img.loadPixels();
    //image(img,0,0);
    for ( var i = 0; i < cols;i++) {
      // Begin loop for rows
      for ( var j = 0; j < rows;j++) {
        var x = i*cellsize + cellsize/2; // x position
        var y = j*cellsize + cellsize/2; // y position
        var loc = x + y*width;           // Pixel array location
        let c = img.get(x,y);    // Grab the color
        // Calculate a z position as a function of mouseX and pixel brightness
        var z = (mouseX/width)* brightness(c)*2 ;
        // Translate to the location, set fill and stroke, and draw the rect
        push();
        translate(x-500,y-300,z);
        noStroke();
			
				
        fill(red(c),green(c),blue(c));
        //rectMode(CENTER);
        
        rect(0,0,cellsize,cellsize);
        pop();
			
    //int step = 15;
    //for (int y = step; y < img.height; y += step) {
      //for (int x = step; x < img.width; x += step) {
       // float darkness = getPixelDarknessAtPosition(img, x, y);
        //float radius = 10 * darkness;
        //float sX = x * width / img.width;
        //float sY = y * height / img.height;
        //circle(sX, sY, radius);
        
      }
    }
  }
	scale(-1,1);
	button();
}

//ignore this, initially
//int getPixelDarknessAtPosition(PImage img,int x,int y) {
 // Boolean mirroring = true;
  //int i = y * img.width +  (mirroring ? (img.width - x - 1) : x);
  //return (255 - img.pixels[i]) / 255;
//}
function keyPressed() {
 if (f === 1) {
    f = 0 ;
  } else if (f===0) {
    f=1;
  }
	
  
}


function button() {
	//textFont(myFont);
	//textSize(24);	
  //text("UP",4*w/10, 3*h/10);
	//text("DOWN",4*w/10, 3.5*h/10);
	//rect(9*width/10, 8*height/10, 60, 20,2,2);
	//rect(9*width/10, 8.5*height/10, 60, 20,2,2);
	if((mouseX >9*w/10) && (mouseX<9*w/10+60) && (mouseY > 8*h/10) && (mouseY < 8*h/10+20)){
    fill(255);
	  rect(4*w/10, 3*h/10, 60, 20,2,2);
	}
	else{
		fill(100);
		rect(4*w/10, 3*h/10, 60, 20,2,2);
  }
	if((mouseX >9*w/10) && (mouseX<9*w/10+60) && (mouseY > 8.5*h/10) && (mouseY < 8.5*h/10+20)){
    fill(255);
	  rect(4*w/10, 3.5*h/10, 60, 20,2,2);
		}
	else{
		fill(100);
		rect(4*w/10, 3.5*h/10, 60, 20,2,2);
	
  }
	//fill(255);
	
	
}
