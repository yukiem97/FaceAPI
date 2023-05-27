class intro extends Phaser.Scene{

    constructor(){
        super('Intro');
    }

    init(){
        console.log("Intro");
    }

    preload(){

    }

    create(){
        this.introText = this.add.text(0,0, "PRESIONA ESPACIO PARA INICIAR", {fontStyle:'strong', align:'rigth', font:'64px Arial', fill:'red'})
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(time, delta){
        if(this.input.keyboard.checkDown(this.cursors.space, 250)){
            this.scene.start('Firstscene');
        }
    }
    
}

export default intro;