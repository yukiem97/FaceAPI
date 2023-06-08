import Bacterium from "../classes/Bacterium.js";
import Player from "../classes/player.js";
import Virus from "../classes/Virus.js";
import Bullet from "../classes/bullet";
import Powerup from "../classes/Powerup.js";

class Firstscene extends Phaser.Scene{

    constructor(){
        super('Firstscene');

    }

    init(){
        console.log("Firstscene");
        this.respawn = 0;
        this.respawnInterval = 3000;
        this.scoreText = 0;
        this.lifesCounter = 3;
        this.newLife = 250;
        this.enemisGlobalCounter = 0;
        this.invencible = false;
        this.ammo = 30;
        this.ammoText = "";
        this.powerupCounter = 0;

    }

    preload(){
        //cargamos los audios y las imagenes.
        this.load.image('backgroud', 'background/background')
            .image("bullet", "sprites/bullet.png")
            .image("virus", "sprites/virus.png")
            .image("bacterium", "sprites/bacterium.png")
            .image("life", "sprites/life")
            .image("soap", "sprites/soap")
            .image("reload", "sprites/reload")
            .image("powerup", "sprites/powerup")
            .sprotosheet('doggysprite','sprite/doggysprite.png',
                {frameWidth:50, frameHeigth:66}
            );

        //Cargamos los audios.    
        this.load.audio('pop',['sounds/pop.wav'])
                 .audio('shot', ['sounds/shot.wav'])
                 .audio('killed', ['sounds/killed.wav'])
                 .audio('rebound', ['sounds/rebouns.wav'])
                 .audio('bgmusic',['sounds/bgmusic.mp3']);
                }
    create(){
        //Agregar los textos
        this.scoreText = this.add.text(this.sysy.game.canvas.width / 2 -65, 0, 'SCORE :' + this.scoreText, {fontStyle:'strong', font: '19px Arial', fill: '#6368BC'});
        this.scoreText.setDepth(1);
        this.lifestext = this.add.text(50, 10, 'x' + this.lifesCounter, {fontStyle: 'strong', align: 'right', font: '24px Arial', fill:'beige'});
        this.lifestext.setDepth(1);
        this.ammoText = this.add.text(this.sys.game.canvas.width - 150, 10, 'AMMO: ' + this.ammo, { fontStyle: 'strong', align: 'rigth', font: '24px Arial', fill: 'beige' });
        this.ammoText.setDepth(1);

        //Agregar los audios
        this.popSound = this.sound.add('pop');
        this.shotSound = this.sound.add('shot');
        this.killedSound = this.sound.add('killed');
        this.reboundSound = this.sound.add('rebound');

        //Agregamos musica de  fondo
        this.backgroundMusic = this.sound.add('bgmusic');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();

        //Agregamos el keyboard cursor
        this.cursor = this.input.keyboard.createCursorKeys();

        //Agregamos los Sprites
        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background');
        this.lifeSprite = this.add.image(30, 18, 'life').setDepth(1);
        this.soapImage = this.physics.add.image(40, this.sys.game.canvas.height -30, 'soap').setActive(true).setDepth(1).setVisible(false);
        this.reloadImage = this.add.image(50, this.sys.game.canvas.height - 80, 'reload');
        this.reloadImage.setVisible(false);

        //Agregamos al jugador
        this.player = new Player(this, this.sys.game.canvas.width / 2, this.sys.game.height, 'doggysprite');

        //Agregamos los grupos
        this.virusGroup = new Virus (this.physics.world, this);
        this.bacteriumGroup = new Bacterium(this.physics.world, this);
        this.bulletGroup = new Bullet(this.physics.world, this);
        this.powerupGroup = new Powerup(this.physics.world, this);

        //Agregamos los colores entre los sprites
        this.physics.add.overlap(tgis.player, [this.virusGroup, this.bacteriumGroup, this.powerupGroup], this.hitPlayer, null, this);
        this.physics.add.collider(this.bulletGroup, [this.virusGroup, this.bacteriumGroup], this.hitEnemies, null, this);
        this.physics.add.collider(this.bulletGroup, this.powerupGroup, this.hitPowerup, null, this);
        this.physics.add.overlap(this.player, this.soapImage, this.reloadAmmo, null, this);
    }

    update(time, delta){

        //Reaparecer los enemigos despues de game over
        if(time > this.respawnInterval && this.respawn == 0){
            this.respawn = Math.trunc(time);
        }
        if(time > this.respawn){
            if(this.enemisGlobalCounter %15 == 0 && this.enemisGlobalCounter != 0){
                this.powerupCounter.newItem();
            }
            if(this.enemisGlobalCounter %5 == 0 && this.enemisGlobalCounter != 0){
                if(this.respawnInterval>600){
                    this.respawnInterval-=100;
                }
                this.addEnemy(0);
            }else{
                this.addEnemy(1);
            }
            this.respawn+= this.respawnInterval;
        }

        //Input control
        if(this.input.keyboard.checkDown(this.cursors.space, 250)){
            this.player.setVelocity(0,0)
                        .anims.play('turn');
                this.fire();        
        }else if(this.cursors.left.isDown){
            this.player.setVelocity(-160)
                 .anims.play('left', true);
        } else if (this.cursors.right.isdown) {
            this.player.setVelocityX(160)
                .anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0)
            .anims.play('turn');
        }
    }

    //Funciones del cliente
    reloadAmmo(){
        if(this.ammo === 0){
            this.ammo = 30;
            var randomX = Phaser.Math.Between(40, this.sys.game.canvas.width-50);
            this.reloadImage.setX(randomX).setActive(false).setVisible(false);
            this.soapImage.setX(randomX).setActive(false).setVisible(false);
            this.ammoText.setText('AMMO: '+ this.ammo);
        }
    }

    hitPlayer(player, enemy){
        if (!this.invencible) {
            this.invencible = true;
            this.killedSound.play();
            this.lifesCounter--;
            this.lifestext.setText('x ' + this.lifesCounter);
            enemy.destroy();
            player.setTint(0x1abc9c);
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.invencible = false;
                    player.clearTint();
                }
            });
            if (this.lifesCounter < 0) {
                this.virusGroup.clear(true, true);
                this.bacteriumGroup.clear(true, true);
                this.bulletGroup.clear(true, true);
                this.scene.start("Intro");
            }
        }
    }

    hitEnemies(bullet, enemy) {
        bullet.setVisible(false);
        bullet.setActive(false);
        bullet.destroy();
        enemy.hitsToKill--;
        if (enemy.hitsToKill == 0) {
            enemy.destroy();
            this.popSound.play();
            this.score += 10;
            this.scoreText.setText('SCORE: ' + this.score);
            if (this.score % this.newLife == 0) {
                this.lifesCounter++;
                this.lifestext.setText('X ' + this.lifesCounter);
            }
        }
    }

    hitPowerup(bullet, bubble) {
        this.hitEnemies(bullet, bubble);
        this.powerupCounter = 10;
    }

    addEnemy(type) {
        this.reboundSound.play();
        this.enemisGlobalCounter++;
        switch (type) {
            case 0:
                this.bacteriumGroup.newItem();
                break;
            default:
                this.virusGroup.newItem();
        }
    }

    fire() {
        if (this.ammo >= 1 && this.powerupCounter === 0) {
            this.bulletGroup.newItem();
            this.shotSound.play();
            this.ammo--;
            this.ammoText.setText('AMMO: ' + this.ammo);
        } if (this.ammo == 0 && this.powerupCounter === 0) {
            this.reloadImage.setVisible(true).setActive(true);
            this.soapImage.setVisible(true).setActive(true);
        } if (this.powerupCounter > 0) {
            this.bulletGroup.newDoubleItem();
            this.shotSound.play();
            this.powerupCounter--;
        }
    }
}

export default Firstscene;

