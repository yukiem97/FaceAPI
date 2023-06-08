export default class Player extends Phaser.Physics.Arcade.Sprite{
    
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.init();
        this.animatePlayer();
        
    }

    init(){
        this
            .setBounce(0.2)
            .setCollideWorldBounds(true)
            .setGravityY(300)
            .setDepth(2)
            .body.setSize(35, 66, 35, 33);
        
    }

    animatePlayer(){
        this.anims.create({
            key:'left',
            frame: this.anims.generateFrameNumbers('doggysprite', {start: 0, end: 3}),
                frameRate: 10,
                frepeat: -1
                          
            });
            

            this.anims.create({
            key: 'rigth',
            frames: this.anims.generateFrameNumbers('doggysprite',{start: 5, end: 8}),
                frameRate: 10,
                repeat: -1
            });
            
    }
            
}
        


    
  

