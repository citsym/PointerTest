# Pointer test
Gameproto made with phaser & spaceify gamelib

##Install
npm install

cd spaceifyapplication/api/
sudo npm install 

(sqllite install fails but thats ok)


##Start gameserver
cd ../..
node gameserver.js


##Controller - Controller.js

change address in line 34
gameClient.connect("xxx.xxx.xxx.xxx", 8081, id, self.clientConnected);
where gameclient is hosted, ports are hardcoded to spaceifyapplication/api/config.js

##Screen - Game.js

change address in line 80
gameClient.connect("xxx.xxx.xxx.xxx", 8082, id, self.clientConnected);
where gameclient is hosted

##Open screen.html for screen &  controller.html for controller



