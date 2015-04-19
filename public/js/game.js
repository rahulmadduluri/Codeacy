//# sourceMappingURL=phaser.map
var game = new Phaser.Game(900,636, Phaser.AUTO, 'phaser-demo', {preload: preload, create: create, update: update, render: render});

var player;
var background;
var blues;
var haloLaunchTimer;
var blueSpacing = 1500;
var jumpButton;
var halo_counter;
var auraTween;
var GROUND = 150;
var JUMP = 300;
var GRAVITY = 0;


function preload() {
    game.load.image('background', '/img/function_background.png');
    game.load.image('whiteback', '/img/white_back.png');
    game.load.image('platform', '/img/platform.png');
    game.load.image('green', '/img/green.png');
    game.load.image('fscreen', '/img/screen.png');
    game.load.image('leftarm', '/img/left_arm.png');
    game.load.image('rightarm', '/img/right_arm.png');
    game.load.image('redring', '/img/red_ring.png');
    game.load.image('bluering', '/img/blue_ring.png');
    game.load.image('greenring', '/img/green_ring.png');
    game.load.image('orangering', '/img/orange_ring.png');
    game.load.image('purplering', '/img/purple_ring.png');
    game.load.image('greenhalo', '/img/green_halo.png');
    game.load.image('greenaura', '/img/green_aura.png');
    //game.load.spritesheet('smoke', '/assets/smokesprite.png', 300, 213);
}

function create() {
    halo_counter = 0;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = GRAVITY;

    whiteback = game.add.sprite(0,0,'whiteback');

    leftarm = game.add.sprite(-100, 68, 'leftarm');
    leftarm.anchor.setTo(0.5, 0);
    leftarm.scale.setTo(0.5, 0.5);

    rightarm = game.add.sprite(1000, 68, 'rightarm');
    rightarm.anchor.setTo(0.5, 0);
    rightarm.scale.setTo(0.46, 0.46);

    background = game.add.tileSprite(0, 0, 900, 636, 'background');

    



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

    platform = game.add.sprite(-400, 410, 'platform');
    platform.anchor.setTo(0.5, 0);
    platform.scale.setTo(0.22, 0.22);
    game.physics.enable(platform, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(platform);
    platform.body.collideWorldBounds = false;

    player = game.add.sprite(-400, 222, 'green');
    player.anchor.setTo(0.5, 0);
    player.scale.setTo(0.28, 0.28);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(player);
    player.body.collideWorldBounds = false;

    redring = game.add.sprite(219, 570, 'redring');
    redring.anchor.setTo(0.5, 0);
    redring.scale.setTo(0.5, 0.5);
    game.physics.enable(redring, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(redring);
    redring.body.collideWorldBounds = false;

    bluering = game.add.sprite(333, 570, 'bluering');
    bluering.anchor.setTo(0.5, 0);
    bluering.scale.setTo(0.5, 0.5);
    game.physics.enable(bluering, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(bluering);
    bluering.body.collideWorldBounds = false;

    greenring = game.add.sprite(447, 570, 'greenring');
    greenring.anchor.setTo(0.5, 0);
    greenring.scale.setTo(0.5, 0.5);
    game.physics.enable(greenring, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(greenring);
    greenring.body.collideWorldBounds = false;

    orangering = game.add.sprite(561, 570, 'orangering');
    orangering.anchor.setTo(0.5, 0);
    orangering.scale.setTo(0.5, 0.5);
    game.physics.enable(orangering, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(orangering);
    orangering.body.collideWorldBounds = false;

    purplering = game.add.sprite(675, 570, 'purplering');
    purplering.anchor.setTo(0.5, 0);
    purplering.scale.setTo(0.5, 0.5);
    game.physics.enable(purplering, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(purplering);
    purplering.body.collideWorldBounds = false;

    greenAura = game.add.sprite(game.width/2, 80, 'greenaura');
    greenAura.anchor.setTo(0.5, 0);
    greenAura.scale.setTo(0.35, 0.35);
    greenAura.alpha = 0;
    auraTweenIn = game.add.tween(greenAura).to({ alpha: 1 }, 400);
    auraTweenIn.onComplete.add(removeAura, this);
    auraTweenOut = game.add.tween(greenAura).to({ alpha: 0.7 }, 600);
    auraTweenOut.onComplete.add(launchAura, this);


    greenhalo = game.add.group();
    greenhalo.enableBody = true;
    greenhalo.createMultiple(5, 'greenhalo');
    greenhalo.setAll('scale.x', 0.3);
    greenhalo.setAll('scale.y', 0.3);
    greenhalo.setAll('anchor.x', 0.5);
    greenhalo.setAll('anchor.y', 0);
    //greenhalo.setAll('checkWorldBounds', true);


    /*
    smoke = game.add.sprite(-10,-25,'smoke');
    smoke.scale.setTo(3, 3);
    var fill = smoke.animations.add('fill', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74], 15, false);
    fill.killOnComplete = true;
    */

    fscreen = game.add.sprite(450, 68, 'fscreen');
    fscreen.anchor.setTo(0.5, 0);
    fscreen.scale.setTo(0.26, 0.26);




    //jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update() {
    //background.tilePosition.x -= 2;

    //player.velocity.y = -3;



    if(platform.body.position.x+platform.body.width/2 < game.width/2) {
        platform.body.position.x += ((game.width/2)-(platform.body.position.x+platform.body.width/2))/15;
        player.body.position.x = platform.body.position.x+90;
    }

    if(platform.body.position.x > 100) {
        if(leftarm.position.x<250)
            leftarm.position.x += 4;
        if(rightarm.position.x>630)
            rightarm.position.x -= 4;
    }


    greenhalo.forEachAlive(function(halo) {
        if (halo.body.velocity.y < 160) {
            halo.body.velocity.y = 0;
            halo.body.acceleration.y = 0;
        }
    }, this)
    
    
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
    ringmove();
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
        halo.body.velocity.y = 900;
        halo.body.acceleration.y = -700;
    }

    haloLaunchTimer = game.time.events.add(50, launchRings);
    if (halo_counter==5) {
        halo_counter++;
        game.time.events.add(800, launchAura);
    }
}

function launchAura() {

    auraTweenIn.start();
}

function removeAura() {
    //auraTweenIn.stop();
    
    auraTweenOut.start();
    
}

function ringstop() {
    greenring.body.velocity.y = 0;
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

//calls editor.js's compile code to compile code
$(".compileBtn").click(function() {
    compileCode();
});

