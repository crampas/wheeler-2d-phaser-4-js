import { Scene } from 'phaser';
import { Player } from '../gameobjects/Player';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;

    player: Player;

    constructor ()
    {
        super('Game');
    }


    preload() {
        console.log("Game.preload()");
        this.load.tilemapTiledJSON('wheeler', 'assets/tileset/wheeler-20x20.json');
        this.load.image('wheeler-street', 'assets/tileset/wheeler/street-100.png');
        this.load.image('wheeler-building', 'assets/tileset/wheeler/building-100.png');
        this.load.image('wheeler-factory', 'assets/tileset/wheeler/factory-100.png');
    }

    create () {
        this.camera = this.cameras.main;
        // this.camera.setBackgroundColor(0x00ff00);
        this.camera.setZoom(1);
        this.camera.setDeadzone(0, 0);

        this.physics.world.setBounds(0, 0, 2000, 2000);


        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.1);
        this.background.setVisible(false);

        const map = this.make.tilemap({ key: 'wheeler' });
        map.addTilesetImage('street-100', 'wheeler-street');
        map.addTilesetImage('building-100', 'wheeler-building');
        map.addTilesetImage('factory-100', 'wheeler-factory');
        const backgroundlayer = map.createLayer('Background', 
            ['street-100', 'building-100', 'factory-100'], 
            0, 0, false);

        // this.msg_text = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // });
        // this.msg_text.setOrigin(0.5);

        this.player = new Player({ scene: this, x: 512, y: 384 });
        this.cameras.main.startFollow(this.player, true);

        // debug grid
        const grid = this.add.grid(0, 0, 2000, 2000, 10, 10, 0x000000, 0.1);
        grid.setOrigin(0, 0);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });

    }

    public update(time: number, delta: number): void {
        const cursors = this.input!.keyboard!.createCursorKeys();

        this.camera.setZoom(3 - (this.player.carModel.velocity / 100));

        // helm control
        if (cursors.left.isDown) {
            this.player.moveLeft();
        } else if (cursors.right.isDown) {
            this.player.moveRight();
        } else {
            this.player.strait();
        }

        // velocity control
        if (cursors.up.isDown) {
            this.player.moveUp();
        } 
        if (cursors.down.isDown) {
            this.player.moveDown();
        } 

        // this.player.update(time, delta);
    }
}
