var snake ={
  "lenth" : 2,
  "face"  : "n",
  "head" : {"y" : 4,"x":0},
  "body" : []
}
//   n
// w e
//   s
function start() {
   var bord =document.getElementById('bord');
    // body = document.getElementByTagName('body');
            
   
            var table = "<table id='bd'>";
            for (var i = 0;i<8 ;i++ )
            {
                table+= "<tr id =row"+ i +" >"
                
                for(var j=0; j<20;j++){
                    table+="<td id ="+i+'_'+j+" style ='background-color: blue;'></td>";
                }
                table+="</tr>";
            }
            table+= "</table>";
            if(bord != null)
                bord.innerHTML += table;
}

function  randomFood() {
    var x = parseInt( Math.random()*19),
           y =parseInt( Math.random()*8),
           cell = document.getElementById(y+'_'+x);

           if(cell==null){
                 randomFood();
           }
           else{
                cell.style.background="black";
                cell.id+="_F";
            }
}

function paintSankeBody(x,y){
  partOfBodies = document.getElementById(y+'_'+x);
  if( document.getElementById(y+'_'+x+"_B")){
      return false
  }
  
  if(partOfBodies!=null) {
    partOfBodies.id+="_B";
    partOfBodies.style.background = "yellow";
  }
    return true;
  // else
  //   return false;
}
function clear(cell){

  partOfBodies = document.getElementById(cell.y+'_'+cell.x+'_B');
  if(partOfBodies!=null){
    partOfBodies.style.background = "blue";
    partOfBodies.id=cell.y+'_'+cell.x;
  }
}

function move() {
    snake.body.unshift({x:snake.head.x,y:snake.head.y}); 

    if (snake.face == "n") {

      
      if(snake.head.y>=0){
        snake.head.y-=1;
        
      }
      else
        return false;
    }
    else if (snake.face == "w") {
      if(snake.head.x>=0){
        snake.head.x-=1;
      }
      else
        return false;
    }
    else if (snake.face == "e") {
      if(snake.head.x<=19){
        snake.head.x+=1;
      }
      else
        return false;
    }

    else if (snake.face == "s") {
      if(snake.head.y<=7){
        snake.head.y+=1;      
      }
      else
        return false;
    } 


    if(!paintSankeBody(snake.head.x,snake.head.y)){
         return false;
    }
      setTimeout(function() {
      if( (document.getElementById(snake.head.y+'_'+snake.head.x+'_F')) ){

        var d=document.getElementById(snake.head.y+'_'+snake.head.x+'_F');
        snake.body.unshift({x:snake.head.x,y:snake.head.y}); 
        d.style.background = "yellow";
        d.id = snake.head.y+'_'+snake.head.x+"_B";
        
        randomFood();
      
      }
      clear(snake.body.pop());
      if(!move())
        alert("lose");
        return ;
    }, 300);
 
  return true;
}
function startGame(){
  start();
  randomFood();
  paintSankeBody(0,4);

  document.onkeydown = function(e){
   //alert(e.keyCode);  
    if (e.keyCode == 38) {
      snake.face = "n";
    }//up
    else if(e.keyCode == 37){
      snake.face = "w";
    }//left
    else if(e.keyCode == 39){
      snake.face = "e";
    }//right
    else if(e.keyCode == 40){
      snake.face = "s";
    }//down  
  }
  move(); 

}            