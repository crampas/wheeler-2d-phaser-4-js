import * as Phaser from "phaser";
import { Player } from "../gameobjects/Player";
import { Angle, Vector } from "../model";

export class CarController {
    next: number = 0;

    constructor(public car: Player, public targets: Vector[]) {
    }

    public update(time: number, delta: number): void {
        const target = this.targets[this.next];

        // control helm
        const toTarget = this.car.carModel.getRelative(target);
        const distance = toTarget.length();
        const dAngle = Angle.getDegre(toTarget.normalize());
        if (dAngle > 2) {
            this.car.turnRight()
        }
        if (dAngle < -2) {
            this.car.turnLeft()
        }

        // control speed
        this.car.accelerate();
        if (distance < 100 && this.car.carModel.velocity > 10) {
            this.car.decelerate();
        }

        // goto next waypoint
        if (distance < 50) {
            this.next = (this.next + 1) % this.targets.length;
        }
    }
}
