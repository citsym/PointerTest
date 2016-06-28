'use strict';

var Pointer = function(id, game, x, y) {  
    
    
    var starBitmap = game.add.bitmapData(64, 64);
    
    
     this.drawStar(starBitmap, 5, 25,12);
    //console.log("draw");
    
    Phaser.Sprite.call(this, game, x, y,starBitmap);
    
    this.filters = [ game.add.filter('Glow') ];
    //pointer =  game.add.sprite(game.width/2, game.height/2, 'star');
    this.anchor.setTo(0.5, 0.5);
        
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    
    this.id = id;
    
    this.dx = 0;
    this.dy = 0;
    
   
    
};

Pointer.prototype = Object.create(Phaser.Sprite.prototype);  
    
Pointer.prototype.constructor = Pointer;

Pointer.prototype.move = function(dx, dy) {
     //this.input = input;
     
    //this.position.x -= dx;
    //this.position.y -= dy;
    
    this.dx = dx;
    this.dy = dy;

  // write your prefab's specific update code here

};

Pointer.prototype.drawStar = function(bmd, spikes, outerRadius, innerRadius) {
    
   
    var cx = bmd.width/2;
    var cy = bmd.height/2;
    var rot=Math.PI/2*3;
    var x=cx;
    var y=cy;
    var step=Math.PI/spikes;
    
    bmd.ctx.strokeSyle="#000";
    bmd.ctx.beginPath();
    bmd.ctx.moveTo(cx,cy-outerRadius)
    for(var i=0;i<spikes;i++){
        x=cx+Math.cos(rot)*outerRadius;
        y=cy+Math.sin(rot)*outerRadius;
        bmd.ctx.lineTo(x,y)
        rot+=step
        
        x=cx+Math.cos(rot)*innerRadius;
        y=cy+Math.sin(rot)*innerRadius;
        bmd.ctx.lineTo(x,y)
        rot+=step
    }
    bmd.ctx.lineTo(cx,cy-outerRadius)
    bmd.ctx.stroke();
    bmd.ctx.closePath();
    
    bmd.ctx.lineWidth=4;
    bmd.ctx.strokeStyle='yellow';
    bmd.ctx.stroke();
    bmd.ctx.fillStyle='yellow';
    bmd.ctx.fill();
    
 
};

Pointer.prototype.update = function(){
    this.position.x -= this.dx;
    this.position.y -= this.dy;
}
