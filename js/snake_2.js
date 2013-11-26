var SnakeClass = (function () {
  var SnakeClass = function(){};
  SnakeClass.prototype.head ={"y" : 4,"x":0};
  SnakeClass.prototype.face = "n";
  SnakeClass.prototype.body = [];
  
  SnakeClass.prototype.paintSankeBody = function(x,y){
        partOfBodies = document.getElementById(y+'_'+x);
        
        if( document.getElementById(y+'_'+x+"_B")){
            return false
        }
        
        if(partOfBodies!=null) {
          partOfBodies.id+="_B";
          partOfBodies.style.background = "yellow";
        }
          return true;};
  SnakeClass.prototype.clear = function(cell){
        partOfBodies = document.getElementById(cell.y+'_'+cell.x+'_B');
        if(partOfBodies!=null){
          partOfBodies.style.background = "blue";
          partOfBodies.id=cell.y+'_'+cell.x;
        }};
  SnakeClass.prototype.move = function(){
        this.body.unshift({x:this.head.x,y:this.head.y});
        if (this.face == "n") {

      
          if(this.head.y>=0){
            this.head.y-=1;
            
          }
          else
            return false;
        }
        else if (this.face == "w") {
          if(this.head.x>=0){
            this.head.x-=1;
          }
          else
            return false;
        }
        else if (this.face == "e") {
          if(this.head.x<=19){
            this.head.x+=1;
          }
          else
            return false;
        }

        else if (this.face == "s") {
          if(this.head.y<=7){
            this.head.y+=1;      
          }
          else
            return false;
        } 
        if(!this.paintSankeBody(this.head.x,this.head.y)){
           return false;
        }
       var that = this;
        setTimeout(function() {
          if( (document.getElementById(that.head.y+'_'+that.head.x+'_F') ) ){

            var d=document.getElementById(that.head.y+'_'+that.head.x+'_F');
            that.body.unshift({x : that.head.x,y:that.head.y}); 
            d.style.background = "yellow";
            d.id = head.y+'_'+head.x+"_B";
            
            that/randomFood();
          
          }
          that.clear(that.body.pop());
          if(!that.move()){
            alert("lose");
            return ;
          }
        }, 300);

      };   
  SnakeClass.prototype.start = function() {
        var bord =document.getElementById('bord');       
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
      };
  SnakeClass.prototype.randomFood= function (){
        var x = parseInt( Math.random()*19),
           y =parseInt( Math.random()*8),
           cell = document.getElementById(y+'_'+x);

           if(cell==null){
                 this.randomFood();
           }
           else{
                cell.style.background="black";
                cell.id+="_F";
            }};
  SnakeClass.prototype.startGame = function(){
        this.start();
        this.randomFood();
        this.paintSankeBody(0,4);

        document.onkeydown = function(e){
         //alert(e.keyCode);  
          if (e.keyCode == 38) {
            this.face = "n";
          }//up
          else if(e.keyCode == 37){
            this.face = "w";
          }//left
          else if(e.keyCode == 39){
            this.face = "e";
          }//right
          else if(e.keyCode == 40){
            this.face = "s";
          }//down  
        }
        this.move(); };     
  return SnakeClass;
})();
var snake = new SnakeClass();