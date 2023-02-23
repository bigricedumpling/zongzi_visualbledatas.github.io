let a=[];
let b=[];
let c=[];
let d=[];
let e=[];
let f=[];
let g=[];
let h=[];
let player,rows;

let q = 0;

let m = 300;


function preload(){
  table = loadTable('data/1.csv','header');
  player = loadSound('data/111.mp3');
}


function setup(){
    createCanvas(window.innerWidth,window.innerHeight);


    fft = new p5.FFT();
    player.amp(0.2);

    let rows = table.getRows();
    for(let r = 0;r<rows.length;r++){
      ID = rows[r].getString("RANK");
      a[r]=rows[r].getString("RANK");
      Name = rows[r].getString("NAME");
      b[r]=rows[r].getString("NAME");
      Writer = rows[r].getString("WRITER");
      c[r]=rows[r].getString("WRITER");
      PH = rows[r].getString("PRESSHOUSE");
      d[r]=rows[r].getString("PRESSHOUSE");
      PT = rows[r].getString("PRESSTIME");
      e[r]=rows[r].getString("PRESSTIME")
      Price = rows[r].getString("PRICE");
      f[r]=rows[r].getString("PRICE");
      Score = rows[r].getString("SCORE");
      g[r]=rows[r].getString("SCORE");
      NOPE = rows[r].getString("EVALUATEDPEOPLE");
      h[r]=rows[r].getString("EVALUATEDPEOPLE");
      //print("rank:"+ bytes(ID)+ " name:"+ bytes(Name) +" writer:"+bytes(Writer)+" publishinghouse:"+bytes(PH)+" publishingtime:"+bytes(PT)+" price:"+bytes(Price)+" score:"+bytes(Score)+" evaluatedpeople:"+bytes(NOPE) );
    }
        
    
    print(a);
    print(b);
    print(g);
}
    
function draw(){
  background(0);
  text(" Move the mouse across the line to change the datas", window.innerWidth*0.5,window.innerHeight*0.955)
  text("Move the mouse into the white button to check the rank", window.innerWidth*0.5,window.innerHeight*0.97)
  

  let spectrum = fft.analyze();//声音可视化
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }


//以上为声音的可视化

    
  for(let i = 0; i< 100;i++){
      fill(50)
      textSize(5)
      stroke(20);
      text(c[i],random(0,2000),random(0,1000))//背景上的随机数据
      
  }
  //rect(mouseX,mouseY,40,20,10)//鼠标位置
  fill(255)
  
  translate(0,50);
  rect(window.innerWidth*0.5,window.innerHeight*0.85,50,20,10)//按钮，
  
  
      
  textSize(12)
  stroke(255)
  line(window.innerWidth*0.5,0,window.innerWidth*0.5,800)
  noFill()
  rectMode(CENTER)//这一段为了接下来画柱状图
      
  if (mouseX>window.innerWidth*0.5) {
    // text("←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←",width/2+50,900)
     text("NAME",window.innerWidth*0.4,-20)
     text("SCORE",window.innerWidth*0.45,-20)
     for(let i = 0; i< 100;i++){//右边的柱状图
          if(i%2==0){
            textAlign(RIGHT,CENTER)
            text(b[i],window.innerWidth*0.4,8*(i))
            text(g[i],window.innerWidth*0.45,8*(i))
          }
  rect2() 
  rectMode(CENTER)
    }
  }
          
    else if (mouseX<window.innerWidth*0.5){
      text("NAME",window.innerWidth*0.6,-20)
      text("SCORE",window.innerWidth*0.55,-20)
      //text("→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→",width/2-50,900)
      for(let i = 0; i<= 100;i++){//左边的柱状图
          if(i%2==1){
            textAlign(LEFT,CENTER)
            text(b[i],window.innerWidth*0.6,8*(i+1))
            text(g[i],window.innerWidth*0.55,8*(i+1))
          }
        }
    push()
    translate(window.innerWidth*0.5,window.innerHeight*0.5)
    rotate(-10000*PI/10000)
    noFill()
    stroke(255)
    circle1()
    pop()
    }
    


    if ((mouseX>window.innerWidth*0.5-25) && (mouseX<window.innerWidth*0.5+25) && (mouseY<window.innerHeight*0.85+60) && (mouseY>window.innerHeight*0.85+40)){//按钮变化
      background(255)
      let waveform = fft.waveform();
      noFill();
      push()
      beginShape();
      stroke(0)
      for (let i = 0; i < waveform.length; i++){
        let x = map(i, 0, waveform.length, 0, width);
        let y = map( waveform[i], -1, 1, 0, height);
        vertex(x,y);
      }
      endShape();
      strokeWeight(1)
      stroke(100)
      fill(0)
      push()
      //translate(50,-50)
      rect(window.innerWidth*0.5,window.innerHeight*0.85,50,20,10)//按钮，
      pop()
      name()
      aaa()
      textSize(20)
      text("the size of those purple circles means the number of evaluated people",100, 20)
      textSize(12)  
    }
     
    else{
      strokeWeight(1)
      fill(255)
    }   

  }   


function name(){//写书名
  for(let i = 0; i<= 100;i++){
        if(i%2==0){ 
          textAlign(RIGHT,CENTER)
          text(b[i],980,8*(i+1))
          text(a[i],997,8*(i+1))
        }
        else{
          textAlign(LEFT,CENTER)
          text(b[i],1020,8*i)
          text(a[i],1003,8*i)
        }       
  }
    noFill()
    ellipseMode(CORNER)
    ellipse(380,16,1200,1200) 
}



function ring(a,b,c,d){//画圆弧
  n=int((c-d)/TAU*1000)//开始减去结束的圆弧在360度中的占比，就是数据的占比率
  m=(d-c)/n//结束减去开始的圆弧长度除以占比率
  beginShape()
  for(let i = 0; i< 100;i++){
    x=cos(c+i*m)*a
    y=sin(c+i*m)*a
    vertex(x,y)
  }
  for(let i = 1; i<=n;i++){
    x=cos(d-i*m)*b
    y=sin(d-i*m)*b
    vertex(x,y)
  }
  endShape(CLOSE)
          
}
function circle1(){//画左边的圈圈柱形图
  let r1
  let r2
  let begin
  let finish
  let radius=0
  for(let i = 0; i< 100;i++){
        r1=radius//r1初始值为0
        r2=r1+4//r2初始值为4
        begin=HALF_PI//图像开始位置为-180
        finish=map(int(g[i]),80,94,-HALF_PI,HALF_PI)//图像结束位置为列表数据在360°中的占比
        if (i%2==1){
          ring(r1,r2,begin,finish)//画圆弧
          radius+=8//画下一个圆弧
        }
    }
}

function rect2(){
  
  for(let i = 0; i< 100;i++){
      let k=map(int(g[i]),69,99,0,window.innerWidth*0.5)
      if (i%2==0){
        if(q<k){
            rectMode(CORNER)
            rect(window.innerWidth*0.5,8*(i+1),q,5)
            q=q+0.003; 
       }else{
          rectMode(CORNER)
          rect(window.innerWidth*0.5,8*(i+1),k,5)
          
       }
      
      }  
      
  }
}


print(j)
        
function aaa(){
  
  let j,k,l
  noStroke()
  for(let i = 0; i< 100;i++){
    j=map(int(h[i]),100000,341260,100,0)//深度
    k=map(int(h[i]),10000,341260,20,200)//半径
    l=map(int(h[i]),17,341259,0,PI)//弧度
    fill(100,70,180,j)
    if(i%2==0){
      if( m > k){
        push()
        translate(0,-25)
        fill(0)
        text(a[i],1000-25*b[i].length,10*(i+1))
        fill(100,70,180,j)
        ellipse(1000-25*b[i].length,10*(i+1),m,m)
        pop()
        m=m-0.1
      }
      else if (m<=k){
        push()
        translate(0,-25)
        fill(0)
        text(a[i],1000-25*b[i].length,10*(i+1))
        fill(100,70,180,j)
        ellipse(1000-25*b[i].length,10*(i+1),k,k)
        pop()
      }
    }
    else if (i%2==1){
      if (m > k){
        push()
        translate(0,-25)
        fill(0)
        text(a[i],1000+25*b[i].length,10*i)
        fill(100,70,180,j)
        ellipse(1000+25*b[i].length,10*i,m,m)
        pop()
        m=m-0.1
      }
      else if (m<=k){
        push()
        translate(0,-25)
        fill(0)
        text(a[i],1000+25*b[i].length,10*i)
        fill(100,70,180,j)
        ellipse(1000+25*b[i].length,10*i,k,k)
        pop()
      }
    }
  } 
  noFill()
  strokeWeight(1)
} 
function mousePressed() {
  if (player.isPlaying()) {
    player.pause();
  } else {
    player.loop();
  }
}
   
          

 
            
    
    
