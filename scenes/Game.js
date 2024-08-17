// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.startball = true
  }

  preload() {
    // load assets
    this.load.image("backg", "./public/backgroundbrillo.png");
    this.load.image("ball", "./public/ball.png");
    this.load.image("brick", "./public/brick.png");
    this.load.image("plataform", "./public/plataform.png");
  }

  create() {
  this.physics.world.setBoundsCollision(true, true, true, false);
  
  this.backg = this.add.image(500, 300, "backg");

  this.plataform = this.physics.add.image(500, 550, "plataform").setScale(0.15);
  this.plataform.setImmovable();
  this.plataform.body.allowGravity = false;
  this.plataform.setCollideWorldBounds(true);

  this.ball = this.physics.add.image(500, 520, "ball").setScale(0.3);
  this.ball.setCollideWorldBounds(true);
  this.ball.setBounce(1);

  this.bricks = this.physics.add.staticGroup();
  this.bricks.create(400, 100, "brick").setScale(0.2).refreshBody();
  this.bricks.create(500, 100, "brick").setScale(0.2).refreshBody();
  this.bricks.create(600, 100, "brick").setScale(0.2).refreshBody();
  this.bricks.create(700, 100, "brick").setScale(0.2).refreshBody();
  this.bricks.create(800, 100, "brick").setScale(0.2).refreshBody();
  this.bricks.create(200, 100, "brick").setScale(0.2).refreshBody();
  this.bricks.create(300, 100, "brick").setScale(0.2).refreshBody();
  this.bricks.create(200, 200, "brick").setScale(0.2).refreshBody();
  this.bricks.create(300, 200, "brick").setScale(0.2).refreshBody();
  this.bricks.create(400, 200, "brick").setScale(0.2).refreshBody();
  this.bricks.create(500, 200, "brick").setScale(0.2).refreshBody();
  this.bricks.create(600, 200, "brick").setScale(0.2).refreshBody();
  this.bricks.create(700, 200, "brick").setScale(0.2).refreshBody();
  this.bricks.create(800, 200, "brick").setScale(0.2).refreshBody();

  //let velocity = 100 * Phaser.Math.Between(1.3, 2);
  //if (Phaser.Math.Between(0, 10) > 5) {
  //  velocity = 0  - velocity;
  //}
  //this.ball.setVelocity(velocity, 10);

  this.physics.add.collider(this.ball, this.plataform, this.plataformTouch, null, this);
  this.physics.add.collider(this.ball, this.bricks, this.brickDestroy, null, this);
  
  this.cursors = this.input.keyboard.createCursorKeys();
  this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

  }

  brickDestroy(ball, brick) {
    brick.destroy()
  }

  update() {
    const mouseX = this.input.mousePointer.x;
    const speed = 0.05; 
    const newX = this.plataform.x + (mouseX - this.plataform.x) * speed;

    this.plataform.x = newX;

    if(this.startball) {
    const speedb = 0.05; 
    const newbX = this.ball.x + (mouseX - this.ball.x) * speedb;

    this.ball.x = newbX;
    }

    if (this.enter.isDown) {
     this.ball.setVelocity(-75, -300)
     this.startball = false
    }
  }

  plataformTouch(){
  let relativetouch = this.ball.x - this.plataform.x;
  if (this.relativeTouch < 0.1 && this.relativeTouch < -0.1) {
    this.ball.setVelocityX(Phaser.Math.Between(-10, 10))
  } else {
  this.ball.setVelocityX(10 * relativetouch)
  }
  }

}
