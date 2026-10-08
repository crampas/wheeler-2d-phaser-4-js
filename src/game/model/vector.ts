
export class Vector {
    public x: number;
    public y: number;

    public constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public add(rhs: Vector): Vector {
        return new Vector(this.x + rhs.x, this.y + rhs.y);
    }

    public sub(rhs: Vector): Vector {
        return new Vector(this.x - rhs.x, this.y - rhs.y);
    }

    public mul(rhs: number): Vector {
        return new Vector(this.x * rhs, this.y * rhs);
    }

    public normalize(): Vector {
        return this.mul(1.0 / this.length());
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}



