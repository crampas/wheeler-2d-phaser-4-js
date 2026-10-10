import { Scene } from 'phaser';
import { Player } from '../gameobjects/Player';
import { CarController } from './CarController'
import { Angle, Vector } from '../model';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;

    player: Player;
    npc: Player;
    npcController: CarController;

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


        this.player = new Player({ scene: this, x: 150, y: 150, config: { 
            width: 18.27, length: 47.13, axleFront: 10, axleSpacing: 28.15,
            speedMax: 150
        }});
        this.cameras.main.startFollow(this.player, true);


        this.msg_text = this.add.text(50, 150, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 2,
            align: 'center'
        });
        this.msg_text.setScrollFactor(0); // fixed position
        this.msg_text.setOrigin(0, 0);



        // debug grid
        const grid = this.add.grid(0, 0, 2000, 2000, 100, 100, 0x000000, 0.1);
        grid.setOrigin(0, 0);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });


        this.npc = new Player({ scene: this, x: 175, y: 175, config: { 
            width: 18.27, length: 47.13, axleFront: 10, axleSpacing: 28.15,
            speedMax: 150
        }});
        const way = [
            new Vector(525, 175),
            new Vector(525, 475),
            new Vector(825, 475),
            new Vector(825, 725),
            new Vector(175, 725),
            new Vector(175, 175),
        ];
        this.drawWay(way)
        this.npcController = new CarController(this.npc, way);

    }

    private drawWay(targets: Vector[], color: number = 0xff0000) {
        for (let index = 0; index <= targets.length; index++) {
            this.drawLine(targets[index % targets.length], targets[(index + 1) % targets.length]);
        }
    }


    private drawLine(p1: Vector, p2: Vector, color: number = 0xff0000) {
        const line = this.add.line(0, 0, p1.x, p2.y, p2.x, p1.y, color, 1);
        line.setOrigin(0, 0);
    }

    public update(time: number, delta: number): void {
        const cursors = this.input!.keyboard!.createCursorKeys();

        // this.camera.setZoom(0.7);
        this.camera.setZoom(3 - (this.player.carModel.velocity / 100));
        this.cameras.main.setAngle(270 - this.player.angle)

        // helm control
        if (cursors.left.isDown) {
            this.player.turnLeft();
        } 
        if (cursors.right.isDown) {
            this.player.turnRight();
        } 

        // velocity control
        if (cursors.up.isDown) {
            this.player.accelerate();
        } 
        if (cursors.down.isDown) {
            this.player.decelerate();
        } 


        this.npcController.update(time, delta);


        // this.player.update(time, delta);

        this.updateInfo(this.npc);
    }

    private updateInfo(car: Player) {
        const speed = Math.round(car.carModel.velocity);
        const speedKmh = Math.round(speed / 10 * 3.6);
        const helm =  Math.round(Angle.getDegre(car.carModel.helm));
        this.msg_text.setText(`speed: ${speed} / ${speedKmh}\nhelm: ${helm}`)
    }
}
