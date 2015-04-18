//# sourceMappingURL=phaser.map
var game = new Phaser.Game(800,618, Phaser.AUTO, 'phaser-demo', {preload: preload, create: create, update: update, render: render});

var player;
var background;
var blues;
var blueLaunchTimer;
var blueSpacing = 1500;
var jumpButton;
var GROUND = 150;
var JUMP = 300;
var GRAVITY = 1200;



function preload() {
    game.load.image('background', '/img/background.png');
    game.load.image('blue', '/img/blue.png');
    game.load.image('bullet', '/img/bullet.png');
    game.load.image('orange', '/img/orange.png');
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = GRAVITY;

    background = game.add.tileSprite(0, 0, 800, 618, 'background');

    this.cursor = game.input.keyboard.createCursorKeys();

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

    blues = game.add.group();
    blues.enableBody = true;
    blues.createMultiple(10, 'blue');
    blues.setAll('scale.x', 0.3);
    blues.setAll('scale.y', 0.3);
    blues.setAll('outOfBoundsKill', true);
    blues.setAll('checkWorldBounds', true);

    game.time.events.add(1000, launchBlue);

    player = game.add.sprite(200, 250, 'orange');
    player.anchor.setTo(0.5, 0);
    player.scale.setTo(0.75, 0.75);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.arcade.enableBody(player);
    player.body.collideWorldBounds = false;

    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update() {
    background.tilePosition.x -= 4;

    //player.velocity.y = -3;
    
    if (player.body.velocity.y > 0 )
    {
        if (player.y >= GROUND)
        {
            player.body.position.y = GROUND;
            
        }
    }
    if (jumpButton.isDown) {
            jump();
    }

    if (game.input.activePointer.isDown) {
        fireBullet();
    }
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

function jump() {
    //player.body.position.y -= 1;
    player.body.velocity.y = -JUMP;
}

function fireBullet() {
    var BULLET_SPEED = 6000;
    var BULLET_SPACING = 250;

    var bullet = bullets.getFirstExists(false);
    if (bullet) {

        bullet.reset(player.body.x + 152, player.body.y+113);
        bullet.body.velocity.x = BULLET_SPEED;
        bullet.body.velocity.y = -90;

        //  Update function for each enemy ship to update rotation etc
        /*enemy.update = function(){
          enemy.angle = 180 - game.math.radToDeg(Math.atan2(enemy.body.velocity.x, enemy.body.velocity.y));

          enemy.trail.x = enemy.x;
          enemy.trail.y = enemy.y -10;

          //  Kill enemies once they go off screen
          if (enemy.y > game.height + 200) {
            enemy.kill();
          }
        }*/
    }
}

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

function runInitialAnimation() {
    jump();
}

//calls editor.js's compile code to compile code
$(".compileBtn").click(function() {
    compileCode();
});

