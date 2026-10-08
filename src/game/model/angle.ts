import {Vector} from "./vector"

export class Angle {
    public static fromRad(angle: number): Vector {
        return new Vector(Math.cos(angle), Math.sin(angle));
    }

    public static fromDegre(angle: number) {
        return this.fromRad(angle / 180.0 * Math.PI);
    }

    public static getRad(direction: Vector): number {
        if (direction.y >= 0)
            return Math.acos(direction.x);
        return -Math.acos(direction.x);
    }

    public static getDegre(direction: Vector): number {
        return Angle.getRad(direction) * 180.0 / Math.PI;
    }
}

