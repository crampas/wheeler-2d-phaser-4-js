import {Angle} from "./angle"
import {Vector} from "./vector"
import {expect} from 'chai';



describe('Angle', function() {

    describe('#fromRad()', function() {
        it('0 shold be (1,0)', function() {
            let direction: Vector = Angle.fromRad(0);
            expect(direction.x).closeTo(1, 0.0001);
            expect(direction.y).closeTo(0, 0.0001);
        });
        it('PI/2 shold be (0,1)', function() {
            let direction: Vector = Angle.fromRad(Math.PI / 2);
            expect(direction.x).closeTo(0, 0.0001);
            expect(direction.y).closeTo(1, 0.0001);
        });
        it('PI shold be (-1,0)', function() {
            let direction: Vector = Angle.fromRad(Math.PI);
            expect(direction.x).closeTo(-1, 0.0001);
            expect(direction.y).closeTo(0, 0.0001);
        });
        it('-PI/2 shold be (1,-1)', function() {
            let direction: Vector = Angle.fromRad(-Math.PI / 2);
            expect(direction.x).closeTo(0, 0.0001);
            expect(direction.y).closeTo(-1, 0.0001);
        });
    });

    describe('#fromDegre()', function() {
        it('0 shold be (1,0)', function() {
            let direction: Vector = Angle.fromDegre(0);
            expect(direction.x).closeTo(1, 0.0001);
            expect(direction.y).closeTo(0, 0.0001);
        });
        it('90 shold be (0,1)', function() {
            let direction: Vector = Angle.fromDegre(90);
            expect(direction.x).closeTo(0, 0.0001);
            expect(direction.y).closeTo(1, 0.0001);
        });
        it('180 shold be (-1,0)', function() {
            let direction: Vector = Angle.fromDegre(180);
            expect(direction.x).closeTo(-1, 0.0001);
            expect(direction.y).closeTo(0, 0.0001);
        });
        it('-90 shold be (0,-1)', function() {
            let direction: Vector = Angle.fromDegre(-90);
            expect(direction.x).closeTo(0, 0.0001);
            expect(direction.y).closeTo(-1, 0.0001);
        });
    });

    describe('#getDegre()', function() {
        it('for (1,0) should return 0', function() {
            expect(Angle.getDegre(new Vector(1, 0)))
                .closeTo(0, 0.0001);
        });
        it('for (1,1) should return 45', function() {
            expect(Angle.getDegre(new Vector(1, 1).normalize()))
                .closeTo(45, 0.0001);
        });
        it('for (-1,1) should return 135', function() {
            expect(Angle.getDegre(new Vector(-1, 1).normalize()))
                .closeTo(135, 0.0001);
        });
        it('for (1,-1) should return -45', function() {
            expect(Angle.getDegre(new Vector(1, -1).normalize()))
                .closeTo(-45, 0.0001);
        });
        it('for (-1,-1) should return -135', function() {
            expect(Angle.getDegre(new Vector(-1, -1).normalize()))
                .closeTo(-135, 0.0001);
        });
    });


    describe('#getRad()', function() {
        it('for (1,0) should return 0', function() {
            expect(Angle.getRad(new Vector(1, 0)))
                .closeTo(0, 0.0001);
        });
        it('for (1,1) should return 1/4*PI', function() {
            expect(Angle.getRad(new Vector(1, 1).normalize()))
                .closeTo(Math.PI / 4, 0.0001);
        });
        it('for (-1,1) should return 3/4*PI', function() {
            expect(Angle.getRad(new Vector(-1, 1).normalize()))
                .closeTo(Math.PI * 3 / 4, 0.0001);
        });
        it('for (1,-1) should return -1/4*PI', function() {
            expect(Angle.getRad(new Vector(1, -1).normalize()))
                .closeTo(-Math.PI / 4, 0.0001);
        });
        it('for (-1,-1) should return -3/4*PI', function() {
            expect(Angle.getRad(new Vector(-1, -1).normalize()))
                .closeTo(-Math.PI * 3 / 4, 0.0001);
        });
    });


});