import {Vector} from "./vector"
import {Vehicle} from "./vehicle"


export class Car extends Vehicle {
    public velocity: number = 0;
    public helm: Vector = new Vector(1, 0);

    constructor(position: Vector = new Vector(0, 0), direction: Vector = new Vector(1, 0)) {
        super(position, direction);
    }

    public update(timeStep: number) {
        let helmPull = this.helm.mul(this.velocity * timeStep);
        let pull = this.getAbsolute(helmPull).sub(this.position);
        this.pull(pull);
    }
}

