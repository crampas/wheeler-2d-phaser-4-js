import * as Phaser from 'phaser';
import { Car, Vector, Angle } from '../model';

export class Player extends Phaser.Physics.Arcade.Sprite {
    public carModel: Car;

    constructor({scene, x, y}: {scene: Phaser.Scene, x: number, y: number}) {
        super(scene, x, y, 'player');

        this.carModel = new Car(new Vector(x, y), new Vector(1, 0));
        this.carModel.velocity = 100;
        this.carModel.axis = -30;

        this.setScale(0.1);
        this.setOrigin(0.8, 0.5);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        // this.addToUpdateList();
    }

    public strait() {
        // this.carModel.helm = Angle.fromDegre(0);
    }

    public moveLeft() {
        // this.carModel.helm = Angle.fromDegre(-20);
        this.carModel.helm = Angle.fromDegre(Angle.getDegre(this.carModel.helm) - 2); 
    }

    public moveRight() {
        // this.carModel.helm = Angle.fromDegre(20);
        this.carModel.helm = Angle.fromDegre(Angle.getDegre(this.carModel.helm) + 2); 
    }

    public moveUp() {
        this.carModel.velocity += 1;
    }

    public moveDown() {
        this.carModel.velocity = Math.max(0, this.carModel.velocity -= 1);
    }

    public preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        const timeStep = delta / 1000;

        this.carModel.velocity *= 0.99; // friction
        this.carModel.helm = Angle.fromDegre(Angle.getDegre(this.carModel.helm) * 0.9); // helm friction

        // this.carModel.velocity = this.body.velocity.length();
        //this.carModel.helm = new Vector(this.body.velocity.x, this.body.velocity.y).normalize();
        this.carModel.update(timeStep);
        this.setPosition(this.carModel.position.x, this.carModel.position.y);
        this.rotation = Angle.getRad(this.carModel.direction);
    }

}