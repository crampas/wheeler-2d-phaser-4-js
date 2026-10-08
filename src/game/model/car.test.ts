import {Car} from "./car"
import {Vehicle} from "./vehicle"
import {Vector} from "./vector"
import {Angle} from "./angle"
import {assert, expect} from 'chai';


describe('Car', function() {
    describe('#update() shold move car forward', function() {
        it('shold move car forward', function() {
            let car = new Car(new Vector(0, 0), Angle.fromDegre(0));
            car.velocity = 3;
            car.helm = Angle.fromDegre(0);

            car.update(1);

            expect(car.position.x).closeTo(3, 0.001);
            expect(car.position.y).closeTo(0, 0.001);
        });
    });
});