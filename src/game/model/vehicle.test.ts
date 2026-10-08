import {Vehicle} from "./vehicle"
import {Vector} from "./vector"
import {Angle} from "./angle"
import {assert, expect} from 'chai';



function assertRange(actual: number, expected: number, interval: number) {
    expect(actual).closeTo(expected, interval);
}

function assertPoint(actual: Vector, expected: Vector, interval: number) {
    assertRange(actual.x, expected.x, interval);
    assertRange(actual.y, expected.y, interval);
}



describe('Vehicle', function() {
    describe('#getRelative() with identity', function() {
        let v = new  Vehicle(new Vector(0, 0), Angle.fromDegre(0));
        it('for (1,0) should return (1,0)', function() {
            assertPoint(v.getRelative(new Vector(1, 0)), new Vector(1, 0), 0.001);
        });
        it('for (0,1) should return (0,1)', function() {
            assertPoint(v.getRelative(new Vector(0, 1)), new Vector(0, 1), 0.001);
        });
        it('for (1,1) should return (1,1)', function() {
            assertPoint(v.getRelative(new Vector(1, 1)), new Vector(1, 1), 0.001);
        });
    });

    describe('#getRelative() with identity and shift (4,5)', function() {
        let v = new  Vehicle(new Vector(4, 5), Angle.fromDegre(0));
        it('for (1,0) should return (-3,-5)', function() {
            assertPoint(v.getRelative(new Vector(1, 0)), new Vector(-3, -5), 0.001);
        });
        it('for (0,1) should return (-4,-4)', function() {
            assertPoint(v.getRelative(new Vector(0, 1)), new Vector(-4, -4), 0.001);
        });
        it('for (1,1) should return (-3,-4)', function() {
            assertPoint(v.getRelative(new Vector(1, 1)), new Vector(-3, -4), 0.001);
        });
    });

    describe('#getRelative() with 45 degree', function() {
        let v = new  Vehicle(new Vector(0, 0), Angle.fromDegre(45));
        it('for (1,0) should return (0.707,-0.707)', function() {
            assertPoint(v.getRelative(new Vector(1, 0)), new Vector(0.707, -0.707), 0.001);
        });
        it('for (0,1) should return (0.707,0.707)', function() {
            assertPoint(v.getRelative(new Vector(0, 1)), new Vector(0.707, 0.707), 0.001);
        });
        it('for (1,1) should return (1.414,0)', function() {
            assertPoint(v.getRelative(new Vector(1, 1)), new Vector(1.414, 0), 0.001);
        });
    });

    describe('#getRelative() with 90 degree', function() {
        let v = new  Vehicle(new Vector(0, 0), Angle.fromDegre(90));
        it('for (1,0) should return (0,-1)', function() {
            assertPoint(v.getRelative(new Vector(1, 0)), new Vector(0, -1), 0.001);
        });
        it('for (0,1) should return (1,0)', function() {
            assertPoint(v.getRelative(new Vector(0, 1)), new Vector(1, 0), 0.001);
        });
        it('for (1,1) should return (1,-1)', function() {
            assertPoint(v.getRelative(new Vector(1, 1)), new Vector(1, -1), 0.001);
        });
    });

    describe('#getRelative() with 90 degree and shift (4,5)', function() {
        let v = new  Vehicle(new Vector(4, 5), Angle.fromDegre(90));
        it('for (1,0) should return (-5,3)', function() {
            assertPoint(v.getRelative(new Vector(1, 0)), new Vector(-5, 3), 0.001);
        });
        it('for (0,1) should return (-4,4)', function() {
            assertPoint(v.getRelative(new Vector(0, 1)), new Vector(-4, 4), 0.001);
        });
        it('for (1,1) should return (-4,3)', function() {
            assertPoint(v.getRelative(new Vector(1, 1)), new Vector(-4, 3), 0.001);
        });
    });

    describe('#getRelative() with 180 degree', function() {
        let v = new  Vehicle(new Vector(0, 0), Angle.fromDegre(180));
        it('for (1,0) should return (-1,0)', function() {
            assertPoint(v.getRelative(new Vector(1, 0)), new Vector(-1, 0), 0.001);
        });
        it('for (0,1) should return (0,-1)', function() {
            assertPoint(v.getRelative(new Vector(0, 1)), new Vector(0, -1), 0.001);
        });
        it('for (1,1) should return (-1,-1)', function() {
            assertPoint(v.getRelative(new Vector(1, 1)), new Vector(-1, -1), 0.001);
        });
    });

    describe('#getAbsolute() with identity', function() {
        let v = new  Vehicle(new Vector(0, 0), Angle.fromDegre(0));
        it('for (1,0) should return (1,0)', function() {
            assertPoint(v.getAbsolute(new Vector(1, 0)), new Vector(1, 0), 0.001);
        });
        it('for (0,1) should return (0,1)', function() {
            assertPoint(v.getAbsolute(new Vector(0, 1)), new Vector(0, 1), 0.001);
        });
        it('for (1,1) should return (1,1)', function() {
            assertPoint(v.getAbsolute(new Vector(1, 1)), new Vector(1, 1), 0.001);
        });
    });


    describe('#getAbsolute() with 45 degree', function() {
        let v = new  Vehicle(new Vector(0, 0), Angle.fromDegre(45));
        it('for (1,0) should return (0.707,0.707)', function() {
            assertPoint(v.getAbsolute(new Vector(1, 0)), new Vector(0.707, 0.707), 0.001);
        });
        it('for (0,1) should return (-0.707,0.707)', function() {
            assertPoint(v.getAbsolute(new Vector(0, 1)), new Vector(-0.707, 0.707), 0.001);
        });
        it('for (1,1) should return (0,1.414)', function() {
            assertPoint(v.getAbsolute(new Vector(1, 1)), new Vector(0, 1.414), 0.001);
        });
    });



    describe('#pull() in facing direction', function() {
        it('shold move forward', function() {
            let v = new  Vehicle(new Vector(3, 7), Angle.fromRad(Math.PI / 4));
            v.axis = -3;
            v.pull(new Vector(4, 4));
            assertPoint(v.position, new Vector(7, 11), 0.001);
            assertRange(Angle.getRad(v.direction), Math.PI / 4, 0.001);
        });
        it('shold rotate', function() {
            let v = new  Vehicle(new Vector(0, 0), new Vector(0, 1));
            v.axis = -5;
            v.pull(new Vector(1, 0));
            assertPoint(v.position, new Vector(1, 0), 0.001);
            assertPoint(v.direction, new Vector(0.196, 0.980), 0.001);
        });
    });


    describe('#pull() with tender', function() {
        it('tender shold move forward', function() {
            let car = new Vehicle(new Vector(4, 7), Angle.fromRad(0));
            car.axis = -3;
            car.tender = new Vehicle(new Vector(0, 7), Angle.fromRad(0));
            car.tender.axis = -2;

            car.pull(new Vector(1, 0));

            assertPoint(car.tender.position, new Vector(1, 7), 0.001);
        });
    });

});



