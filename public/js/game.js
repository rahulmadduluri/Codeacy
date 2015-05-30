//# sourceMappingURL=phaser.map
var game = new Phaser.Game(1200, 848, Phaser.AUTO, 'phaser-demo', {preload: preload, create: create, update: update, render: render});

var player;
var background;
var start_flag = 0;
var counter = 0;
var ROTATOR = 0;
var blues;
var haloLaunchTimer;
var haloRemoveTimer;
var blueSpacing = 1500;
var jumpButton;
var halo_counter;
var auraTween;
var GROUND = 150;
var JUMP = 300;
var GRAVITY = 0;
var timeCheck;
var waiting = 0;
var ring_state = 0;
var aura_cycle = 0;
var ring_counter = 5;
var paint_cycle = 0;
var compile_good = 0;
var stages_completed = 0;
var type = "";

function preload() {

    game.load.image('background', '/img/template.png');
    game.load.image('whiteback', '/img/screenbg.png');
    game.load.image('platform', '/img/platformfloat.png');
    game.load.image('platform1', '/img/platform1char.png');
    game.load.image('platform2', '/img/platform2char.png');
    game.load.image('platform3', '/img/platform3char.png');
    game.load.image('green', '/img/green.png');
    game.load.image('fscreen', '/img/screen_tech.png');
    game.load.image('redring', '/img/redring.png');
    game.load.image('bluering', '/img/bluering.png');
    game.load.image('greenring', '/img/greenring.png');
    game.load.image('orangering', '/img/orangering.png');
    game.load.image('purplering', '/img/purplering.png');
    game.load.image('greenhalo', '/img/green_halo.png');
    game.load.image('greenaura', '/img/green_aura.png');
    game.load.image('techart', '/img/techcorner.png');
    game.load.image('red_paint', '/img/red_paint.png');
    game.load.image('blue_paint', '/img/blue_paint.png');
    game.load.image('yellow_paint', '/img/yellow_paint.png');
    game.load.image('green_paint', '/img/green_paint.png');
    game.load.image('mixer', '/img/mixer.png');
    game.load.image('paint_box', '/img/paint_box.png');
    game.load.image('whitebottom', '/img/whitebottom.png');
    //game.load.spritesheet('smoke', '/assets/smokesprite.png', 300, 213);
}

function create() {
    halo_counter = 0;



    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = GRAVITY;

    whiteback = game.add.sprite(0,0,'whiteback');

    platform = game.add.sprite(600, 1550, 'platform');
    platform.anchor.setTo(0.5, 0);
    game.physics.enable(platform, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(platform);
    platform.body.collideWorldBounds = false;

    raisePlatform = game.add.tween(platform).to({ x: 600, y: 500 }, 1500, Phaser.Easing.Exponential.Out);

    player = game.add.sprite(600, 1210, 'green');
    player.anchor.setTo(0.5, 0);
    player.scale.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(player);
    player.body.collideWorldBounds = false;

    raisePlayer = game.add.tween(player).to({ x: 600, y: 160 }, 1500, Phaser.Easing.Exponential.Out);

    whitebottom = game.add.sprite(600, 670, 'whitebottom');
    whitebottom.anchor.setTo(0.5,0);


    background = game.add.sprite(0, 0, 'background');



    



    //this.cursor = game.input.keyboard.createCursorKeys();

    /*
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('scale.x', 0.1);
    bullets.setAll('scale.y', 0.1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    */

    /*
    blues = game.add.group();
    blues.enableBody = true;
    blues.createMultiple(10, 'blue');
    blues.setAll('scale.x', 0.3);
    blues.setAll('scale.y', 0.3);
    blues.setAll('outOfBoundsKill', true);
    blues.setAll('checkWorldBounds', true);

    game.time.events.add(1000, launchBlue);
    */

    platform3 = game.add.sprite(920, 290, 'platform3');
    platform3.anchor.setTo(0.5, 0);
    platform3.scale.setTo(0.5, 0.5);
    game.physics.enable(platform3, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(platform3);
    platform3.body.collideWorldBounds = false;

    platform1 = game.add.sprite(595, 310, 'platform1');
    platform1.anchor.setTo(0.5, 0);
    platform1.scale.setTo(0.5, 0.5);
    game.physics.enable(platform1, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(platform1);
    platform1.body.collideWorldBounds = false;

    platform2 = game.add.sprite(270, 280, 'platform2');
    platform2.anchor.setTo(0.5, 0);
    platform2.scale.setTo(0.5, 0.5);
    game.physics.enable(platform2, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(platform2);
    platform2.body.collideWorldBounds = false;

    platform1Down = game.add.tween(platform1).to({ x: 600, y: 1200 }, 1500, Phaser.Easing.Elastic.In);
    platform2Down = game.add.tween(platform2).to({ x: 600, y: 1200 }, 1500, Phaser.Easing.Elastic.In);
    platform3Down = game.add.tween(platform3).to({ x: 600, y: 1200 }, 1500, Phaser.Easing.Elastic.In);

    platform3Down.onComplete.add(flyAwayComplete, this);


    
    

    platform1.body.position.x = 595+Math.sin(Math.PI/2) * 10;
    platform2.body.position.x = 270+Math.sin(0) * 10;
    platform3.body.position.x = 920+Math.sin(Math.PI) * 10;

    platform1.body.position.y = 310+Math.sin(Math.PI);
    platform2.body.position.y = 280+Math.sin(Math.PI/2);
    platform3.body.position.y = 290+Math.sin(Math.PI/2);

    platform1Up = game.add.tween(platform1).to({ x: platform1.body.position.x, y: platform1.body.position.y }, 1100, Phaser.Easing.Elastic.Out);
    platform2Up = game.add.tween(platform2).to({ x: platform2.body.position.x, y: platform2.body.position.y }, 1100, Phaser.Easing.Elastic.Out);
    platform3Up = game.add.tween(platform3).to({ x: platform3.body.position.x, y: platform3.body.position.y }, 1100, Phaser.Easing.Elastic.Out);

    platform1.scale.set(0.05*Math.sin(Math.PI/2)+0.6);
    platform2.scale.set(-0.05*Math.sin(Math.PI)+0.6);
    platform3.scale.set(0.05*Math.sin(Math.PI)+0.6);


    // final player position = 440, 140 scale = 0.55
    
    



    redring = game.add.sprite(225, 750, 'redring');
    redring.anchor.setTo(0, 0);
    game.physics.enable(redring, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(redring);
    redring.body.collideWorldBounds = false;

    bluering = game.add.sprite(380, 750, 'bluering');
    bluering.anchor.setTo(0, 0);
    game.physics.enable(bluering, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(bluering);
    bluering.body.collideWorldBounds = false;

    greenring = game.add.sprite(535, 750, 'greenring');
    greenring.anchor.setTo(0, 0);
    game.physics.enable(greenring, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(greenring);
    greenring.body.collideWorldBounds = false;

    orangering = game.add.sprite(690, 750, 'orangering');
    orangering.anchor.setTo(0, 0);
    game.physics.enable(orangering, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(orangering);
    orangering.body.collideWorldBounds = false;

    purplering = game.add.sprite(845, 750, 'purplering');
    purplering.anchor.setTo(0, 0);
    game.physics.enable(purplering, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(purplering);
    purplering.body.collideWorldBounds = false;


    greenAura = game.add.sprite(game.width/2, 0, 'greenaura');
    greenAura.anchor.setTo(0.5, 0);
    greenAura.scale.setTo(0.5, 0.5);
    greenAura.alpha = 0;
    auraTweenIn = game.add.tween(greenAura).to({ alpha: 1 }, 400);
    auraTweenIn.onComplete.add(removeAura, this);
    auraTweenOut = game.add.tween(greenAura).to({ alpha: 0.7 }, 600);
    auraTweenOut.onComplete.add(launchAura, this);
    auraTweenRemove = game.add.tween(greenAura).to({ alpha: 0.0 }, 600);


    greenhalo = game.add.group();
    greenhalo.enableBody = true;
    greenhalo.createMultiple(5, 'greenhalo');
    greenhalo.setAll('scale.x', 1.4);
    greenhalo.setAll('scale.y', 1.4);
    greenhalo.setAll('anchor.x', 0.5);
    greenhalo.setAll('anchor.y', 0);
    //greenhalo.setAll('checkWorldBounds', true);


    /*
    smoke = game.add.sprite(-10,-25,'smoke');
    smoke.scale.setTo(3, 3);
    var fill = smoke.animations.add('fill', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74], 15, false);
    fill.killOnComplete = true;
    */



    fscreen = game.add.sprite(10, 79, 'fscreen');


    
    techart = game.add.sprite(40, 106, 'techart');
    techart.scale.setTo(0.7, 0.7);


    red_paint = game.add.sprite(910, 125, 'red_paint');
    red_paint.anchor.setTo(0, 0);
    red_paint.alpha = 0;
    game.physics.enable(red_paint, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(red_paint);
    red_paint.body.collideWorldBounds = false;

    blue_paint = game.add.sprite(995, 125, 'blue_paint');
    blue_paint.anchor.setTo(0, 0);
    blue_paint.alpha = 0;
    game.physics.enable(blue_paint, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(blue_paint);
    blue_paint.body.collideWorldBounds = false;

    bluePaintDrop = game.add.tween(blue_paint).to({ x: 995, y: 240 }, 1000, Phaser.Easing.Exponential.In);
    bluePaintFade = game.add.tween(blue_paint).to({ alpha: 0 }, 1000, Phaser.Easing.Exponential.In);

    yellow_paint = game.add.sprite(1080, 125, 'yellow_paint');
    yellow_paint.anchor.setTo(0, 0);
    yellow_paint.alpha = 0;
    game.physics.enable(yellow_paint, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(yellow_paint);
    yellow_paint.body.collideWorldBounds = false;

    yellowPaintDrop = game.add.tween(yellow_paint).to({ x: 1080, y: 240 }, 1000, Phaser.Easing.Exponential.In);
    yellowPaintFade = game.add.tween(yellow_paint).to({ alpha: 0 }, 1000, Phaser.Easing.Exponential.In);

    green_paint = game.add.sprite(995, 245, 'green_paint');
    green_paint.anchor.setTo(0, 0);
    green_paint.alpha = 0;
    game.physics.enable(green_paint, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(green_paint);
    green_paint.body.collideWorldBounds = false;

    greenPaintDrop = game.add.tween(green_paint).to({ x: 995, y: 370 }, 1000, Phaser.Easing.Exponential.Out);
    greenPaintFade = game.add.tween(green_paint).to({ alpha: 1 }, 1000, Phaser.Easing.Exponential.Out);

    mixer = game.add.sprite(1027, 300, 'mixer');
    mixer.anchor.setTo(0.5, 0.5);
    mixer.alpha = 0;
    game.physics.enable(mixer, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(mixer);
    mixer.body.collideWorldBounds = false;

    shrinkMixer = game.add.tween(mixer.scale).to({ x: 0.8, y: 0.8 }, 400);
    shrinkMixer.onComplete.add(mixerGrow, this);
    growMixer = game.add.tween(mixer.scale).to({ x: 1, y: 1 }, 500);
    growMixer.onComplete.add(mixerShrink, this);
    resetMixer = game.add.tween(mixer.scale).to({ x: 1, y: 1 }, 500);

    paint_box = game.add.sprite(888, 100, 'paint_box');
    paint_box.anchor.setTo(0, 0);
    paint_box.alpha = 0;
    game.physics.enable(paint_box, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(paint_box);
    paint_box.body.collideWorldBounds = false;



    //jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update() {
    //background.tilePosition.x -= 2;

    //player.velocity.y = -3;

    if(waiting) {
        if (compile_good == 1) {
            if (stages_completed == 1) {
                //raiseChosen();
            }
            else if (stages_completed == 2) {
                //ring has already moved
                //console.log("wrong");
                //ringmove();
            }
            //compile_good = 0;

        }
        if (compile_good == -1) {
            //resetPlatforms();
            //compile_good = 0;
        }
    }
    

    if(start_flag==1) {

        counter++;

        ROTATOR = ROTATOR + 0.03;
        
        platform1.body.position.x = platform1.body.position.x+Math.sin(ROTATOR+Math.PI/2) * 10;
        platform2.body.position.x = platform2.body.position.x+Math.sin(ROTATOR) * 10;
        platform3.body.position.x = platform3.body.position.x+Math.sin(ROTATOR+Math.PI) * 10;

        platform1.body.position.y = platform1.body.position.y+Math.sin(ROTATOR+Math.PI);
        platform2.body.position.y = platform2.body.position.y+Math.sin(ROTATOR+Math.PI/2);
        platform3.body.position.y = platform3.body.position.y+Math.sin(ROTATOR-Math.PI/2);

        
        
        if (platform1.body.position.x < 111) {
            game.world.bringToTop(platform1);
        }

        if (platform2.body.position.x < 111 && platform1.body.position.x > 400) {
            game.world.bringToTop(platform2);
        }

        if (platform3.body.position.x < 111) {
            game.world.bringToTop(platform3);
        }

        
        platform1.scale.set(0.05*Math.sin(ROTATOR+Math.PI/2)+0.6);
        platform2.scale.set(-0.05*Math.sin(ROTATOR+Math.PI)+0.6);
        platform3.scale.set(0.05*Math.sin(ROTATOR+Math.PI)+0.6);


        if (compile_good) {
            start_flag=0;
            flyAway();
        }

    }


    /* Start Old Code

    if(platform.body.position.x+platform.body.width/2 < game.width/2) {
        platform.body.position.x += ((game.width/2)-(platform.body.position.x+platform.body.width/2))/15;
        player.body.position.x = platform.body.position.x+120;
    }


    greenhalo.forEachAlive(function(halo) {
        if (halo.body.velocity.y < 160) {
            halo.body.velocity.y = 0;
            halo.body.acceleration.y = 0;
        }
    }, this)

    End Old Code */
    
    
    /*
    if (player.body.velocity.y > 0 )
    {
        if (player.y >= GROUND)
        {
            player.body.position.y = GROUND;
            
        }
    }
    */
    /*
    if (jumpButton.isDown) {
        alert('clicked');
        ringmove();
    }
    */
    /*
    if (game.input.activePointer.isDown) {
        fireBullet();
    }
    */
    /*
    if (this.cursor.right.isDown)
        background.tilePosition.x -= 2;
    else if (this.cursor.left.isDown)
        background.tilePosition.x += 2;
    */
}

function startRotation() {

}

function launchBlue() {
    var BLUE_SPEED = 300;

    var blue = blues.getFirstExists(false);
    if (blue) {
        blue.reset(game.width, game.rnd.integerInRange(-30, game.height/2-110));
        blue.body.velocity.x = game.rnd.integerInRange(-90, -20);
        blue.scale.set(blue.body.velocity.x / -270);
        blue.body.gravity.y = -1200;
    }

    //  Send another enemy soon
    blueLaunchTimer = game.time.events.add(game.rnd.integerInRange(blueSpacing, blueSpacing+10), launchBlue);

}

function runInitialAnimation() {
    if (ring_state==0) {
        spinStart();
    }
    else if (ring_state==1) {
        ringmove();
        paintDrop();
    }
}

function spinStart() {
    start_flag = 1;
}

function flyAway() {

    //platform1Down.onComplete.add(raiseChosen, this);
    //timer = game.time.events.add(Phaser.Timer.SECOND * 3, raiseChosen, this);
    waiting = 1;

    game.world.sendToBack(platform1);
    game.world.moveUp(platform1);
    platform1Down.start();

    game.world.sendToBack(platform2);
    game.world.moveUp(platform2);
    platform2Down.start();

    game.world.sendToBack(platform3);
    game.world.moveUp(platform3);
    platform3Down.start();

}

function flyAwayComplete() {
    if (compile_good==1) {
        raiseChosen();
        createPaintArea();
    }
    else if (compile_good==-1) {
        resetPlatforms();
    }
    compile_good=0;
}


function raiseChosen() {
    setTimeout(raisePlayer.start(), 1000);
    setTimeout(raisePlatform.start(), 1000);

    ring_state=1;
    
}

function resetPlatforms() {
    counter = 0;
    ROTATOR = 0;

    platform1.scale.set(0.05*Math.sin(Math.PI/2)+0.6);
    platform2.scale.set(-0.05*Math.sin(Math.PI)+0.6);
    platform3.scale.set(0.05*Math.sin(Math.PI)+0.6);

    platform1Up.start();
    platform2Up.start();
    platform3Up.start();

}

function ringmove() {
    //player.body.position.y -= 1;
    //smoke.animations.play('fill');
    greenring.body.velocity.y = 500;
    game.time.events.add(500, launchRings);
    game.time.events.add(500, ringstop);
}

function launchRings() {
    var halo = greenhalo.getFirstExists(false);

    if(halo) {
        halo_counter++;
        halo.reset(game.width/2, -100-50*halo_counter);
        haloIn = game.add.tween(halo).to({x: game.width/2, y: 550-75*halo_counter}, 1000, Phaser.Easing.Exponential.Out);
        haloIn.start();
    }

    haloLaunchTimer = game.time.events.add(50, launchRings);
    if (halo_counter==5) {
        halo_counter++;
        game.time.events.add(800, launchAura);
    }
}

function removeRings() {
    if (ring_counter>0) {
        haloOut = game.add.tween(greenhalo.children[ring_counter-1]).to({x: game.width/2, y: -200}, 1000, Phaser.Easing.Exponential.In);
        haloOut.start();
        haloRemoveTimer = game.time.events.add(100, removeRings);
        ring_counter--;
    }
}

function launchAura() {

    auraTweenIn.start();
}

function removeAura() {
    //auraTweenIn.stop();

    aura_cycle++;

    if (compile_good==1) {
        auraTweenRemove.start();
        removeRings();
        greenring.body.position.x = 535;
        greenring.body.position.y = 750;
        compile_good=0;
    }
    else if (compile_good == -1) {
        // submitted answer is wrong
        auraTweenRemove.start();
        removeRings();
        greenring.body.position.x = 535;
        greenring.body.position.y = 750;
        compile_good=0;
    }
    else {
        auraTweenOut.start();
    }

}

function ringstop() {
    greenring.body.velocity.y = 0;
}

function createPaintArea() {
    paint_box.alpha = 1;
    mixer.alpha = 1;
    red_paint.alpha = 1;
    blue_paint.alpha = 1;
    yellow_paint.alpha = 1;
}

function paintDrop() {
    bluePaintDrop.start();
    bluePaintFade.start();
    yellowPaintDrop.start();
    yellowPaintFade.start();
    game.time.events.add(1000, mixerShrink);
}

function mixerShrink() {
    shrinkMixer.start();
}

function mixerGrow() {

    // testing
    paint_cycle++;

    if (paint_cycle == 5) {
        resetMixer.start();
        successPaint();
        //compile_good=0;
    }
    else {
        growMixer.start();
    }
    
    /*
    if (compile_good==1) {
        resetMixer.start();
        successPaint();
        compile_good=0;
    }
    else if (compile_good == -1) {
        resetMixer.start();
        failPaint();
        compile_good=0;
    }
    else {
        growMixer.start();
    }
    */

}

function successPaint() {
    greenPaintDrop.start();
    greenPaintFade.start();
}

function failPaint() {

}

/*
function fireBullet() {
    var BULLET_SPEED = 6000;
    var BULLET_SPACING = 250;

    var bullet = bullets.getFirstExists(false);
    if (bullet) {

        bullet.reset(player.body.x + 152, player.body.y+113);
        bullet.body.velocity.x = BULLET_SPEED;
        bullet.body.velocity.y = -90;

        //  Update function for each enemy ship to update rotation etc
          enemy.update = function(){
          enemy.angle = 180 - game.math.radToDeg(Math.atan2(enemy.body.velocity.x, enemy.body.velocity.y));

          enemy.trail.x = enemy.x;
          enemy.trail.y = enemy.y -10;

          //  Kill enemies once they go off screen
          if (enemy.y > game.height + 200) {
            enemy.kill();
          }
        }
    }
}
*/

function render() {
    /*
    for (var i = 0; i < greenEnemies.length; i++)
    {
        game.debug.body(greenEnemies.children[i]);
    }
    game.debug.body(player);
    */
}

function restart () {
    
}


//changes comments at top of editor
function changeComments(text) {
    var editor = ace.edit("editor");
    var pos = editor.getSession().getDocument().indexToPosition(0, 0);
    editor.getSession().getDocument().insert(pos, text);
}

//removes comments from certain lines
function clearEditor() {
    var editor = ace.edit("editor");
    editor.getSession().getDocument().setValue('');
}

//sets up editor to start code after comments -- requires line # where comments end
function setupEditor(cLineNumber) {
    var editor = ace.edit("editor");


    editor.getSession().getSelection().on('changeCursor', function(e) {
        if(editor.getCursorPosition().row>=cLineNumber) {
            editor.setReadOnly(false);
            /*
            $("div .ace_gutter .ace_gutter-active-line").css("background", "");
            $("div .ace_layer .ace_cursor").css("color", "");
            */
        }
        else {
            editor.setReadOnly(true);
            /*
            $("div .ace_gutter .ace_gutter-active-line").css("background", "transparent");
            $("div .ace_layer .ace_cursor").css("color", "transparent");
            */
        }
        if(editor.getCursorPosition().row<cLineNumber && editor.getReadOnly()) {
            editor.moveCursorTo(cLineNumber,0);
        }
    });
}



//when code has compiled
function compileOutput(info) {
    var tester = 1;
    var len = info.length;
    if (info.charAt(0) == '1') {

        //change comments to next stage
        clearEditor();
        setupEditor(11);
        var comments = '/* Now, write a function to change the character\'s color.\nHere\'s an example:\n\nvoid setType (String typeName)\n{\n  type = typeName\n}\n\nThe function you must write is called changeColor.\nIt will take a String -- the name of the color -- as an argument.\n*/\n\n';
        changeComments(comments);

        compile_good = 1;
        type = info.substring(2,len-1);
        stages_completed = 1;

    }
    else if (info.charAt(0) == '2') {
        compile_good = 1;
        stages_completed = 2;
    }
    else {
        compile_good = -1;
    }
}

$(document).ready(function () {
    var editor = ace.edit("editor");


    setupEditor(12);

    var text = '/*\nWelcome to the factory! Here you will create your very own character from scratch.\n\nCreate a new "Character" object.\n\nThen, set its type using the function setType:\nvoid setType(String typeName);\n\nYou\'ve done function calls before but here\'s an example in case you forgot:\ncharacterObject.move("right")\n*/';
    changeComments(text);

}); 

//calls editor.js's compile code to compile code
$(".compileBtn").click(function() {
    compileCode();
});

