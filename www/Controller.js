'use strict';
var h = 1920;
var w = 1080;

//var w = window.innerWidth * window.devicePixelRatio,
//    h = window.innerHeight * window.devicePixelRatio;

//var screenDims = Phaser.Utils.ScreenUtils.calculateScreenMetrics(h, w,Phaser.Utils.Orientation.PORTRAIT);

var controller = new Phaser.Game(w, h, Phaser.AUTO, 'controller_div');
//var controller = new Phaser.Game("100%", "100%", Phaser.CANVAS, 'controller_div');
var controller_state = {};

// Creates a new 'main' state that wil contain the game
controller_state.main = function() { };  
controller_state.main.prototype = new function(){
    
    var self = this;
    var id;
    
    var game = controller;
   
    var score = 0;
    
    var text = "";
    
    var sensitivity = 20;
   
    self.preload = function() {
        id = getGetParameter("id");
		if (!id)
			id = game.rnd.integerInRange(0, 1000);
				
		gameClient.connect("phaser-citsym.c9.io", 8081, id, self.clientConnected);
		
        window.addEventListener('devicemotion', deviceHandler, false);
       
		
    }
    
    var deviceHandler = function(eventData){
        
        
        var dx = eventData.rotationRate.gamma*sensitivity;
        var dy = eventData.rotationRate.alpha*sensitivity;
        var interval = eventData.interval;
        //eventData.interval;
        
        gameClient.callScreenRpc(1, "movePointer", [id, dx, dy],  self, null);
    }
    
    self.create = function(){
        
        //game.stage.backgroundColor = '#000000' 
        
        
        //game.input.maxPointers = 1;
        game.stage.disableVisibilityChange = true;

        /*
        var screenDims = Utils.ScreenUtils.screenMetrics;

        if (game.device.desktop) {
            console.log("DESKTOP");
            scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
            scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
        }
        else {
            console.log("MOBILE");
            game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
            game.scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.scale.forceOrientation(true, false);
        }
        */
  
        // Stretch to fill
        
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.setMinMax(w/2, h/2, w, h);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        //
        
        
        
        //game.scale.startFullScreen(false, false);

        text = game.add.text(game.world.centerX, game.world.centerY, "Score", { font: "65px Arial", fill: "#ff0044", align: "center" });

        text.anchor.set(0.5);
        

    }
    
 /*
    self.update = function(){
    
       
            
    }
    
    */
    
    
    self.addScore = function(point)
		{
		console.log("DemoController::addScore() "+point);
		
		score += point;
		
		text.text = "Score: "+ score;
		
		};
			
	self.setStickPosition = function(position)
		{
		console.log("DemoController::setStickPosition() "+position);
		};
	
	self.getStickPosition = function(connectionId, callback)
		{
		console.log("DemoController::getStickPosition() ");
		callback(null, [666,667]);
		};
		
	self.clientConnected = function()
		{
		
		gameClient.exposeRpcMethod("setStickPosition", self, self.setStickPosition);
		gameClient.exposeRpcMethod("getStickPosition", self, self.getStickPosition);
		
		gameClient.exposeRpcMethod("addScore", self, self.addScore);
		
		// The first parameter is the screen id
		// The last parameter is the callback, which must be null
		// if the call expects no return value. 
		// The second-last parameter is the object the callback should be 
		// invoked in. 
		
		/*
		gameClient.callScreenRpc(1, "sayHi", ["Terve teille!"],  self, null);	
		
		gameClient.callScreenRpc(1, "getGameState", [],  self, function(err, data)
			{
			console.log(data.winner);
			});
		*/			
		};
    
}

controller.state.add('main', controller_state.main);  
controller.state.start('main'); 

