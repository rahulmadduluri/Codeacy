var game = new Phaser.Game(1200, 848, Phaser.AUTO, 'phaser-demo', {preload: preload, create: create, update: update, render: render});
var flag = 0;
var level = 1;
var text;

function preload() {
	game.load.image('background', '/img/ifthen/background.png');
	game.load.image('start', '/img/ifthen/start.png');
	game.load.image('centerhigh', '/img/ifthen/centerhigh.png');
	game.load.image('corner', '/img/ifthen/corner.png');
	game.load.image('sensor', '/img/ifthen/sensor.png');
	game.load.image('end', '/img/ifthen/end.png');
	game.load.image('orangeball', '/img/ifthen/orangeball.png');
	//game.load.image('whitecircle', '/img/ifthen/whitecircle.png');
	game.load.image('shadow', '/img/ifthen/shadow.png');
	game.load.image('success', '/img/ifthen/success.png');
}
function create(){
	background = game.add.sprite(0,0,'background');

	var style = { font: "32px Gill Sans", fill: "#ffffff", align: "center" };

    text = game.add.text(600, 30, "Level: " + level, style);
    text.anchor.set(0.5);

	start = game.add.sprite(380,400,'start');
	start.anchor.setTo(0.5,0.5);

	end = game.add.sprite(820,400,'end');
	end.anchor.setTo(0.5,0.5);

	

	//whitecircle = game.add.sprite(600,700,'whitecircle');
	//whitecircle.anchor.setTo(0.5,0.5);
	//whitecircle.input.enabled = true;
	//whitecircle.input.onDown.add(startAnimation, this);

	cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);




    shadow = game.add.sprite(600,400,'shadow');
    shadow.anchor.setTo(0.5,0.5);
    shadow.alpha = 0.3;
    shadowRotate1 = game.add.tween(shadow).to({ angle: 90 }, 1100, Phaser.Easing.Exponential.Out);
	shadowGrow1 = game.add.tween(shadow.scale).to({ x: 1.6, y: 1.6}, 1100, Phaser.Easing.Exponential.Out);
	shadowShrink1 = game.add.tween(shadow.scale).to({ x: 1, y: 1}, 1100, Phaser.Easing.Exponential.Out);

	centerhigh = game.add.sprite(600,400,'centerhigh');
	centerhigh.anchor.setTo(0.5,0.5);
	centerRotate1 = game.add.tween(centerhigh).to({ angle: 90 }, 1100, Phaser.Easing.Exponential.Out);
	centerGrow1 = game.add.tween(centerhigh.scale).to({ x: 1.3, y: 1.3}, 1100, Phaser.Easing.Exponential.Out);
	centerGrow1.onComplete.add(endAnimation, this);
	centerShrink1 = game.add.tween(centerhigh.scale).to({ x: 1, y: 1}, 1100, Phaser.Easing.Exponential.Out);
	centerShrink1.onComplete.add(ballTravel, this);

	orangeball = game.add.sprite(352,400,'orangeball');
	orangeball.anchor.setTo(0.5,0.5);
	orangeTravel1 = game.add.tween(orangeball).to({ x: 867, y: 400 }, 1500, Phaser.Easing.Exponential.InOut);
	orangeTravel1.onComplete.add(successfully, this);


	success = game.add.sprite(820,400,'success');
	success.anchor.setTo(0.5,0.5);
	success.alpha = 0;
	successful = game.add.tween(success).to({ alpha: 1 }, 800, Phaser.Easing.Exponential.In);

}
function update(){
	if (fireButton.isDown && flag == 0)
    {
        startAnimation();
    }
    else if (cursors.right.isDown && flag == 2)
    {
    	switchLevel();
    }
}
function render(){

}
function startAnimation() {
	flag = 1;
	if (level==1) {
		centerGrow1.start();
		shadowGrow1.start();
	}
	if (level==2) {
		orangeTravel2a = game.add.tween(orangeball).to({ x:820, y:400}, 1000, Phaser.Easing.Exponential.InOut);
		orangeTravel2b = game.add.tween(orangeball).to({ x:820, y:620}, 500, Phaser.Easing.Exponential.InOut);
		orangeTravel2c = game.add.tween(orangeball).to({ x:603, y:617}, 500, Phaser.Easing.Exponential.InOut);
		orangeTravel2d = game.add.tween(orangeball).to({x: 600, y:133}, 1000, Phaser.Easing.Exponential.InOut);

		centerGrow2 = game.add.tween(centerhigh.scale).to({ x: 1.3, y: 1.3}, 1100, Phaser.Easing.Exponential.Out);
		shadowGrow2 = game.add.tween(shadow.scale).to({ x: 1.6, y: 1.6}, 1100, Phaser.Easing.Exponential.Out);

		centerShrink2 = game.add.tween(centerhigh.scale).to({ x: 1, y: 1}, 1100, Phaser.Easing.Exponential.Out);
		centerRotate2 = game.add.tween(centerhigh).to({ angle: 0 }, 1100, Phaser.Easing.Exponential.Out);
		shadowRotate2 = game.add.tween(shadow).to({ angle: 0 }, 1100, Phaser.Easing.Exponential.Out);
		shadowShrink2 = game.add.tween(shadow.scale).to({ x: 1, y: 1}, 1100, Phaser.Easing.Exponential.Out);

		orangeTravel2a.onComplete.add(function () {orangeTravel2b.start();}, this);
		orangeTravel2b.onComplete.add(function () {orangeTravel2c.start();}, this);
		orangeTravel2c.onComplete.add(function () {centerGrow2.start(); shadowGrow2.start();}, this);
		orangeTravel2d.onComplete.add(function () {successful.start();}, this);

		centerGrow2.onComplete.add(function () {centerRotate2.start(); centerShrink2.start(); shadowRotate2.start(); shadowShrink2.start();}, this);
		centerShrink2.onComplete.add(function () {orangeTravel2d.start();}, this);
		orangeTravel2a.start();
	}
	
}
function endAnimation() {
	if (level==1) {
		centerRotate1.start();
		centerShrink1.start();
		shadowRotate1.start();
		shadowShrink1.start();
	}

}
function ballTravel() {
	orangeTravel1.start();
}
function successfully() {
	flag = 2;
	successful.start();
}
function switchLevel() {
	level++;
	flag=0;
	clearLevel();
	createLevel();
}
function clearLevel() {
	if (level==2) {
		success.alpha = 0;
		success.angle = -90;
		success.position.x = 600;
		success.position.y = 180;
	}
}
function createLevel() {
	if (level==2) {
		corner = game.add.sprite(820,400,'corner');
    	corner.anchor.setTo(0.5,0.5);

    	corner1 = game.add.sprite(820,400,'corner');
    	corner1.anchor.setTo(0.5,0.5);

    	corner2 = game.add.sprite(820,620,'corner');
    	corner2.anchor.setTo(0.5,0.5);
    	corner2.angle = 90;

    	corner3 = game.add.sprite(600,620,'corner');
    	corner3.anchor.setTo(0.5,0.5);
    	corner3.angle = 180;

    	sensor = game.add.sprite(603,617,'sensor');
    	sensor.anchor.setTo(0.5,0.5);

    	end.angle = -90;
		end.position.x = 600;
		end.position.y = 180;

		centerhigh.position.x = 600;
		centerhigh.position.y = 400;

		orangeball.position.x = 352;
		orangeball.position.y = 400;

		game.world.bringToTop(shadow);
		game.world.bringToTop(centerhigh);
		game.world.bringToTop(orangeball);
		game.world.bringToTop(success);

		text.setText("Level: " + level);
	}
}
