var SnakeClass = (function () {
  
  var SnakeClass = function(x,y){
    this.head ={"y" : 4,"x":0};
    this.face = "e";
    this.body = [];
    if(x!=null&&y!=null)
      this.board = {"w":x,"h":y};
    else
      this.board = {"w":20,"h":8};
  };
  
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
      partOfBodies.id=cell.y+'_'+cell.x;}};
  SnakeClass.prototype.move = function(){
    this.body.unshift({x:this.head.x,y:this.head.y});

    switch(this.face){
      case 'n':
        this.head.y-=1;
        break;
      case 'w':
        this.head.x-=1;
        break;
      case 'e':
        this.head.x+=1;
        break;
      case 's':
        this.head.y+=1;
        break;
    }
    if(this.head.x>=this.board.w||this.head.y>=this.board.h)
      return false;
    if(this.head.x<0||this.head.y<0)
      return false;
    if(!this.paintSankeBody(this.head.x,this.head.y)){
       return false;
    }

    setTimeout(function() {
      if( (document.getElementById(this.head.y+'_'+this.head.x+'_F') ) != null ){

        var d = document.getElementById(this.head.y+'_'+this.head.x+'_F');
        that.body.unshift({x : this.head.x, y : this.head.y}); 
        d.style.background = "yellow";
        d.id = this.head.y + '_' + this.head.x + "_B";
        
        that.randomFood();
      
      }
      this.clear(this.body.pop());
      if(this.move() == false){
        alert("lose");
        // return ;
      }
    }.bind(this), 100);  };   
  SnakeClass.prototype.start = function() {
    var bord =document.getElementById('board');       
        var table = "<table id='bd'>";
        for (var i = 0;i<this.board.h ;i++ )
        {
            table+= "<tr id =row"+ i +" >"
            
            for(var j=0; j<this.board.w;j++){
                table+="<td id ="+i+'_'+j+" style ='background-color: blue;'></td>";
            }
            table+="</tr>";
        }
        table+= "</table>";
        if(bord != null)
            bord.innerHTML += table;};
  SnakeClass.prototype.randomFood= function (){
    var x = (Math.random()*this.board.w-1)|0,
       y = (Math.random()*this.board.h-1)|0,
       cell = document.getElementById(y+'_'+x);

       if(cell===null){
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
    var that = this;
    document.onkeydown = function(e){
      switch(e.keyCode){
        case 38:
          this.face = "n";//up
          break;
        case 37:
          this.face = "w";//left
          break;
        case 39:
          this.face = "e";//right
          break;
        case 40:  
          this.face = "s";//down
          break;
        }
    }.bind(this);
    this.move(); };     
  
  return SnakeClass;

})();
var snake = new SnakeClass();
 