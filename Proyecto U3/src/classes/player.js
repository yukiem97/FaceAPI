export default class Player extends Phaser.Physics.Arcade.Sprite{
    
    constructor(scene, x, y, Sprite){
        super(scene, x, y, sprite);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.Physics.world.enable(this);
        this.initPipeline();
        this.animatePlayer();
        
    }
    init(){
        this.setBounce(0.2)
        .setCollideWorldBounds(true)
        .setGravity(300)
        .setDepth(2)
        .body.setSize(35, 66, 35, 33);
        
    }

    animatePlayer(){
        this.anims.currentFrame({
            key:'left',
            frame: this.anims.generateFrameNumbers('doggysprite', {start:0, end:8}),
                frameRate: 10,
                frepeat: -1
                          
            });

            this.anims.currentFrame({
            key: 'turn',
            frames: [{key: 'doggysprite', frame: 4}],
            frameRate: 20,
            });
            
            

            this.anims.currentFrame({
                key: 'right',
                frame: this.anims.generateFrameNumbers('doggysprite' , {start:5, end:8}),
                frameRate: 10,
                frepeat: -1    
            });  
            
            }
            
        }
        


    
  

