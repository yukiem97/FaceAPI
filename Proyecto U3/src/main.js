import { Physics } from "phaser";
import Firstscene from "./scenes/Firstscene";
import intro from "./scenes/Intro";

const config = {

    //OPCIONALES
    title: 'HCI',
    url: 'http://hci.com',
    version: '0.0.1',

    //OPCIONAL
    pixelArt: true, //REMARCAR LOS PIXELES DE LAS IMAGENES

    //OBLIGATORIO
    type: Phaser.AUTO, //WEBGL O CANVAS O AUTOMATICO
    backgroundColor: '#34495E',
    scale: {
        width: 900, //TAMAÑO DEL LIENZO
        height: 360,
        parent: 'container', //ID DEL CONTENEDOR
        mode: Phaser.Scale.FIT,
        //AUTOCENTER:phaser.scale.center_both
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },

    //INFORMACION DE LA CONSOLA
    banner: {
        hidePhaser: true, //OCULTAR TEXTO DE PHASER EN CONSOLA 
        text: '#000000', //CAMBIA COLOR DEL TEXTO DEL TITULO DEL JUEGO EN CONSOLA
        //PALETA DE COLORES DE ADORNO EN CONSOLA
        background: [
            'red',
            'yellow',
            'red',
            'transparent'
        ]
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    //ESCENAS DEL JUEGO
    scene: [
        Intro,
        Firstscene
    ]
};

//CREAR LA INSTANCIA DEL JUEGO
const game = new Phaser.Game(config);