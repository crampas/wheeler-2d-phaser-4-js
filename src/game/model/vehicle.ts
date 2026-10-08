import {Vector} from "./vector"


export class Vehicle {
    public position: Vector;
    public direction: Vector;
    public axis: number = -3;
    public tender: Vehicle | null = null;
    
    constructor(position: Vector = new Vector(0, 0), direction: Vector = new Vector(1, 0)) {
        this.position = position;
        this.direction = direction;
    }

    public getRelative(p: Vector) : Vector {
        let dx = p.x - this.position.x;
        let dy = p.y - this.position.y;

        let x =  dx * this.direction.x + dy * this.direction.y;
        let y = -dx * this.direction.y + dy * this.direction.x;

        return new Vector(x, y);
    }

    public getAbsolute(p: Vector) : Vector {
        let x = p.x * this.direction.x - p.y * this.direction.y + this.position.x;
        let y = p.x * this.direction.y + p.y * this.direction.x + this.position.y;
        return new Vector(x, y);
    }

    public pull(d: Vector): void {

        let tenderPositionRelative: Vector = new Vector();
        if (this.tender) {
            tenderPositionRelative = this.getRelative(this.tender.position);
        }

        this.position = this.position.add(d);
        let axis = this.direction.mul(-this.axis);
        this.direction = axis.add(d).normalize();

        if (this.tender) {
            let tenderPositionNew = this.getAbsolute(tenderPositionRelative);
            let tenderDelta = tenderPositionNew.sub(this.tender.position);
            this.tender.pull(tenderDelta);
        }

    }
}

