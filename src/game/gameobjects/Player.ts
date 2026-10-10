import * as Phaser from 'phaser';
import { Car, Vector, Angle } from '../model';

interface CarConfig {
    width: number;
    length: number;
    axleFront: number;
    axleSpacing: number;
    speedMax: number;
}

export class Player extends Phaser.Physics.Arcade.Sprite {
    public carModel: Car;
    public carConfig: CarConfig;
    public acceleration = 0;
    public helmShift = 0;

    constructor({scene, x, y, config}: {scene: Phaser.Scene, x: number, y: number, config: CarConfig}) {
        super(scene, x, y, 'player');

        this.carConfig = config;
        this.carModel = new Car(new Vector(x, y), new Vector(1, 0));
        this.carModel.velocity = 10;
        this.carModel.axis = -config.axleSpacing;

        // this.setSize(200, 500);
        this.setDisplaySize(config.length, config.width);
        this.setOrigin((config.length - config.axleFront) / config.length, 0.5);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        this.body!.debugShowBody = true;
        this.body!.debugBodyColor = 0xff00ff;
        // this.addToUpdateList();
    }

    public turnLeft() {
        // this.turn(-4);
        this.helmShift = -60;
    }

    public turnRight() {
        // this.turn(4); 
        this.helmShift = 60;
    }

    private turn(degrees: number) {
        this.carModel.helm = Angle.fromDegre(Phaser.Math.Clamp(Angle.getDegre(this.carModel.helm) + degrees, -35, 35)); 
    }

    public accelerate() {
        this.acceleration = 50;
    }

    public decelerate() {
        this.acceleration = -80;
    }


    public preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta);

        // update model from phser physics
        this.carModel.position.x = this.x;
        this.carModel.position.y = this.y;

        // update velocity
        const dt = delta / 1000;
        const accelerationEff = this.acceleration - 10; // friction
        this.carModel.velocity = Phaser.Math.Clamp(this.carModel.velocity + dt * accelerationEff, 0, this.carConfig.speedMax);
        this.acceleration = 0;

        // update helm
        const helmAngle = Angle.getDegre(this.carModel.helm);
        const newHelmAngle = (this.helmShift == 0) ? 0 : 
                helmAngle + this.helmShift * dt
                ;
        this.carModel.helm = Angle.fromDegre(Phaser.Math.Clamp(newHelmAngle, -35, 35)); 
        this.helmShift = 0;

        // this.carModel.helm = Angle.fromDegre(Angle.getDegre(this.carModel.helm) * 0.9); // helm roll back

        // update model and object
        // this.carModel.velocity = this.body!.velocity.length();
        //this.carModel.helm = new Vector(this.body.velocity.x, this.body.velocity.y).normalize();
        this.carModel.update(dt);
        this.setPosition(this.carModel.position.x, this.carModel.position.y);
        this.setRotation(Angle.getRad(this.carModel.direction));
        // this.rotation = Angle.getRad(this.carModel.direction);
    }

}