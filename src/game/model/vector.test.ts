import {Angle} from "./angle"
import {Vector} from "./vector"
import {expect} from 'chai';

function assertPoint(actual: Vector, expected: Vector, interval: number) {
    expect(actual.x).closeTo(expected.x, interval);
    expect(actual.y).closeTo(expected.y, interval);
}

describe('Vector', function() {
    describe('#add()', function() {
        it('should move relative', function() {
            let v1 = new Vector(14, -11);
            let v2 = v1.add(new Vector(-3, 5));
            assertPoint(v2, new Vector(11, -6), 0.001);
        });
    });

    describe('#mul()', function() {
        it('should stretch relative', function() {
            let v1 = new Vector(14, -11);
            let v2 = v1.mul(2);
            assertPoint(v2, new Vector(28, -22), 0.001);
        });
    });

    describe('#normalize()', function() {
        it('should return vector to same direction', function() {
            let norm = new Vector(14, -11).normalize();
            assertPoint(norm, new Vector(0.786, -0.617), 0.001);
        });
        it('should return vector of lebgth 1', function() {
            let norm = new Vector(14, -11).normalize();
            expect(norm.x * norm.x + norm.y * norm.y).closeTo(1, 0.001);
        });
    });

    describe('#length()', function() {
        it('should return length of vector', function() {
            expect(new Vector(14, -11).length())
                .closeTo(Math.sqrt(14 * 14 + 11 * 11), 0.001);
        });
    });
    
});

