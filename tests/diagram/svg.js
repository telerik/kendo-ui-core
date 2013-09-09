///<reference path="qunit-1.12.0.js" />

var diagram = window.kendo.diagram;

QUnit.module("Transformations");
test("scale toString", function() {
	var scale = new diagram.Scale(2, 2);

	equal(scale.toString(), "scale(2,2)");
});

test("scale matrix", function() {
	var expectedMatrix = new diagram.Matrix(2, 0, 0, 2, 0, 0);
	var scale = new diagram.Scale(2, 2);

	deepEqual(scale.toMatrix(), expectedMatrix);
});

test("translate toString", function() {
	var translate = new diagram.Translation(1, 2);

	equal(translate.toString(), "translate(1,2)");
});

test("translate toMatrix", function() {
	var expectedMatrix = new diagram.Matrix(1, 0, 0, 1, 1, 2);
	var translate = new diagram.Translation(1, 2);

	deepEqual(translate.toMatrix(), expectedMatrix);
});

test("translate toMatrixVector", function() {
	var expectedVector = new diagram.MatrixVector(0, 0, 0, 0, 1, 2);
	var translate = new diagram.Translation(1, 2);

	deepEqual(translate.toMatrixVector(), expectedVector);
});

test("translate plus delta", function() {
	var translate = new diagram.Translation(1, 3);
	var delta = new diagram.Point(3, 2);

	translate.plus(delta);

	deepEqual(translate, new diagram.Translation(4, 5));
});

test("translate multiplication", function() {
	var translate = new diagram.Translation(1, 2);

	translate.times(2);

	deepEqual(translate, new diagram.Translation(2, 4));
});

test("translate length in coordinates", function() {
	var translate = new diagram.Translation(3, 4);

	var length = translate.length();

	equal(length, 5, "vector length is sqrt(3*3 + 4*4) = 5");
});

test("translate normalize", function() {
	var translate = new diagram.Translation(2, 3);

	translate.normalize();

	equal(translate.length(), 1, "normal vectors have length of 1");
});

test("rotate toString around origin", function() {
	var rotate = new diagram.Rotation(45);

	equal(rotate.toString(), "rotate(45)");
});

test("rotate toString around arbitrary point", function() {
	var rotate = new diagram.Rotation(45, 3, 4);

	equal(rotate.toString(), "rotate(45,3,4)");
});

test("rotate toMatrix around origin", function() {
	var rotate = new diagram.Rotation(90);

	var expectedMatrix = new diagram.Matrix(0, 1, -1, 0, 0, 0);
	matrixEqual(rotate.toMatrix(), expectedMatrix);
});

test("rotate toMatrix around arbitrary point", function() {
	var rotate = new diagram.Rotation(90, 3, 4);

	var expectedMatrix = new diagram.Matrix(0, 1, -1, 0, 7, 1);
	matrixEqual(rotate.toMatrix(), expectedMatrix);
});


test("composite transform toString - single translate", function() {
    var transform = new diagram.CompositeTransform(2, 3);

    equal(transform.toString(), "translate(2,3)");
});

test("composite transform toString - translate and scale", function() {
    var transform = new diagram.CompositeTransform(2, 3, 3, 4);

    equal(transform.toString(), "translate(2,3)scale(3,4)");
});

test("composite transform toString - all", function() {
    var transform = new diagram.CompositeTransform(2, 3, 3, 4, 45, new diagram.Point(3, 2));

    equal(transform.toString(), "translate(2,3)rotate(45,3,2)scale(3,4)");
});

test("composite transform toString - all without rotation center", function() {
    var transform = new diagram.CompositeTransform(2, 3, 3, 4, 45);

    equal(transform.toString(), "translate(2,3)rotate(45)scale(3,4)");
});

test("composite tranform updates SVG node transformation", function() {
    var rect = new diagram.Rectangle();
    var transform = new diagram.CompositeTransform(2, 3);

    transform.render(rect.native);

    equal(rect.native.getAttribute("transform"), transform.toString(), "SVG node should be transformed");
});