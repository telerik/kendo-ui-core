(function() {
    var dataviz = kendo.dataviz,

        g = dataviz.geometry,
        Circle = g.Circle,
        Point = g.Point,
        Rect = g.Rect,
        Matrix = g.Matrix,
        Arc = g.Arc,
        Transformation = g.Transformation;

    function compareBoundingBox(bBox, values, tolerance) {
        tolerance = tolerance || 0;

        close(bBox.p0.x, values[0], tolerance);
        close(bBox.p0.y, values[1], tolerance);
        close(bBox.p1.x, values[2], tolerance);
        close(bBox.p1.y, values[3], tolerance);
    }

    // ------------------------------------------------------------
    var point;

    module("Point", {
        setup: function() {
            point = new Point(10, 20);
        }
    });

    test("constructor sets x", function() {
        equal(point.x, 10);
    });

    test("constructor sets y", function() {
        equal(point.y, 20);
    });

    test("x defaults to 0", function() {
        equal(new Point().x, 0);
    });

    test("y defaults to 0", function() {
        equal(new Point().y, 0);
    });

    test("create from x, y", function() {
        ok(Point.create(10, 20).equals(new Point(10, 20)));
    });

    test("create from x, y array", function() {
        ok(Point.create([10, 20]).equals(new Point(10, 20)));
    });

    test("create from Point", function() {
        ok(Point.create(new Point(10, 20)).equals(new Point(10, 20)));
    });

    test("create from Point clones instance", function() {
        var loc = new Point(10, 20);
        ok(Point.create(loc) !== loc);
    });

    test("create from undefined", function() {
        equal(Point.create(undefined), undefined);
    });

    test("sets x", function() {
        point.set("x", 10);
        equal(point.x, 10);
    });

    test("sets y", function() {
        point.set("y", 10);
        equal(point.y, 10);
    });

    test("set is chainable", function() {
        equal(point.set("x", 10), point);
    });

    test("gets x", function() {
        equal(point.get("x"), 10);
    });

    test("gets y", function() {
        equal(point.get("y"), 20);
    });

    test("returns undefined for other fields", function() {
        equal(point.get("foo"), undefined);
    });

    test("changing x triggers geometryChange", function() {
        point.observer = {
            geometryChange: function() {
                ok(true);
            }
        };

        point.set("x", 1);
    });

    test("changing y triggers geometryChange", function() {
        point.observer = {
            geometryChange: function() {
                ok(true);
            }
        };

        point.set("y", 1);
    });

    test("changing any other field does not trigger geometryChange", 0, function() {
        point.observer = {
            geometryChange: function() {
                ok(false);
            }
        };

        point.set("foo", 1);
    });

    test("setting x to same value does not trigger geometryChange", 0, function() {
        point.observer = {
            geometryChange: function() {
                ok(false);
            }
        };

        point.set("x", 10);
    });

    test("setting y to same value does not trigger geometryChange", 0, function() {
        point.observer = {
            geometryChange: function() {
                ok(false);
            }
        };

        point.set("y", 20);
    });

    test("clone returns new point instance", function() {
        var clone = point.clone();
        notEqual(clone, point);
        ok(clone instanceof Point);
    });

    test("clone copies x and y", function() {
        var clone = point.clone();
        equal(clone.x, point.x);
        equal(clone.y, point.y);
    });

    test("rotate rotates x and y around center", function() {
        point.rotate(new Point(0, 0), 90);
        close(point.x, 20, 1, 0.1);
        close(point.y, -10, 1, 0.1);
    });

    test("rotate returns point", function() {
        deepEqual(point.rotate(new Point(0, 0), 90), point);
    });

    test("rotate triggers geometryChange", function() {
        point.observer = {
            geometryChange: function() {
                ok(true);
            }
        };

        point.rotate(new Point(0, 0), 90)
    });

    test("equals is true for same coordinates", function() {
        ok(new Point(1, 1).equals(new Point(1, 1)));
    });

    test("equals is false for different x coordinates", function() {
        ok(!new Point(1, 1).equals(new Point(2, 1)));
    });

    test("equals is false for different y coordinates", function() {
        ok(!new Point(1, 1).equals(new Point(1, 2)));
    });

    test("equals is false for undefined point", function() {
        ok(!new Point(1, 1).equals());
    });

    test("distanceTo calculates distance", function() {
        equal(new Point(1, 1).distanceTo(new Point(2, 2)), Math.sqrt(2));
    });

    test("multiply applies to x and y", function() {
        deepEqual(point.multiply(2), new Point(20, 40));
    });

    test("multiply returns point", function() {
        deepEqual(point.multiply(2), point);
    });

    test("multiplyCopy does not change point", function() {
        var original = point.clone();
        point.multiplyCopy(2);
        deepEqual(point, original);
    });

    test("multiplyCopy does not trigger geometry change", 0, function() {
        point.observer = {
            geometryChange: function() {
                ok(false);
            }
        };
        point.multiplyCopy(2);
    });

    test("multiplyCopy returns point with x and y multiplied", function() {
        deepEqual(point.multiplyCopy(2), new Point(20, 40));
    });

    test("subtract x and y", function() {
        deepEqual(point.subtract(new Point(5, 10)), new Point(5, 10));
    });

    test("subtract returns point", function() {
        deepEqual(point.subtract(new Point(5, 10)), point);
    });

    test("add x and y", function() {
        deepEqual(point.add(new Point(5, 10)), new Point(15, 30));
    });

    test("add returns point", function() {
        deepEqual(point.add(new Point(5, 10)), point);
    });

    test("transform applies matrix", function() {
        deepEqual(point.transform(Matrix.translate(10, 10)), new Point(20, 30));
    });

    test("transform applies transformation matrix", function() {
        deepEqual(point.transform(new Transformation(Matrix.translate(10, 10))), new Point(20, 30));
    });

    test("transform returns point", function() {
        deepEqual(point.transform(Matrix.unit), point);
    });

    test("transformCopy applies matrix to new point", function() {
        var matrix = Matrix.translate(10, 10),
            original = point.clone(),
            transformedPoint = point.transformCopy(Matrix.translate(10, 10));
        deepEqual(point, original);
        deepEqual(transformedPoint, new Point(20, 30));
    });

    test("transformCopy returns new point", function() {
        var transformedPoint = point.transformCopy(Matrix.unit);
        ok(transformedPoint instanceof Point);
        ok(transformedPoint !== point);
    });

    test("transformCopy returns clone of the point if no matrix is passed", function() {
        var transformedPoint = point.transformCopy();
        ok(transformedPoint instanceof Point);
        ok(transformedPoint  !== point);
    });

    test("transformCopy does not trigger geometry change", 0, function() {
        point.observer = {
            geometryChange: function() {
                ok(false);
            }
        };
        point.transformCopy(Matrix.unit);
    });

    test("round rounds x", function() {
        point.x = 5.5;
        point.round();

        equal(point.x, 6);
    });

    test("round rounds x to precision", function() {
        point.x = 5.151;
        point.round(2);

        equal(point.x, 5.15);
    });

    test("round rounds y", function() {
        point.y = 5.5;
        point.round();

        equal(point.y, 6);
    });

    test("round rounds y to precision", function() {
        point.y = 5.151;
        point.round(2);

        equal(point.y, 5.15);
    });

    test("round returns point", function() {
        deepEqual(point.round(), point);
    });

    test("toString concatenates x and y", function() {
        equal(point.toString(), "10 20");
    });

    test("toString rounds x and y", function() {
        point.x = 10.1;
        point.y = 20.1;

        equal(point.toString(0), "10 20");
    });

    test("toString rounds x and y to precision", function() {
        point.x = 10.567;
        point.y = 20.567;

        equal(point.toString(1), "10.6 20.6");
    });

    test("min returns a new point with minmum x y", function() {
        point.x = 10;
        point.y = 20;
        var other = new Point(20, 10),
            minPoint = point.min(other);

        equal(minPoint.x, 10);
        equal(minPoint.y, 10);
    });

    test("max returns a new point with maximum x y", function() {
        point.x = 10;
        point.y = 20;
        var other = new Point(20, 10),
            maxPoint = point.max(other);

        equal(maxPoint.x, 20);
        equal(maxPoint.y, 20);
    });

    // ------------------------------------------------------------
    var rect;

    module("Rect", {
        setup: function() {
            rect = new Rect(
                new Point(0, 0),
                new Point(10, 20)
            );
        }
    });

    test("constructor sets p0", function() {
        ok(rect.p0.equals(new Point(0, 0)));
    });

    test("constructor sets p1", function() {
        ok(rect.p1.equals(new Point(10, 20)));
    });

    test("returns width", function() {
        equal(rect.width(), 10);
    });

    test("returns height", function() {
        equal(rect.height(), 20);
    });

    test("modifying p0 triggers geometryChange", function() {
        rect.observer = {
            geometryChange: function() {
                ok(true);
            }
        };

        rect.p0.set("x", 1);
    });

    test("modifying p1 triggers geometryChange", function() {
        rect.observer = {
            geometryChange: function() {
                ok(true);
            }
        };

        rect.p1.set("x", 1);
    });

    test("wrap returns new rect with minimum p0 and maximum p1", function() {
        var other = new Rect(new Point(-1, 5), new Point(15, 15)),
            wrap =  rect.wrap(other);
        equal(wrap.p0.x, -1);
        equal(wrap.p0.y, 0);
        equal(wrap.p1.x, 15);
        equal(wrap.p1.y, 20);
    });

    test("center returns center point", function() {
        deepEqual(rect.center(), new Point(5,10));
    });

    // ------------------------------------------------------------
    var circle;

    module("Circle", {
        setup: function() {
            circle = new Circle(new Point(0, 0), 10);
        }
    });

    test("constructor sets center", function() {
        ok(circle.center.equals(new Point(0, 0)));
    });

    test("constructor sets radius", function() {
        equal(circle.radius, 10);
    });

    test("modifying center triggers geometryChange", function() {
        circle.observer = {
            geometryChange: function() {
                ok(true);
            }
        };

        circle.center.set("x", 1);
    });

    test("sets radius", function() {
        circle.set("radius", 1);
        equal(circle.radius, 1);
    });

    test("gets radius", function() {
        equal(circle.get("radius"), 10);
    });

    test("setting radius triggers geometryChange", function() {
        circle.observer = {
            geometryChange: function() {
                ok(true);
            }
        };

        circle.set("radius", 1);
    });

    test("setting any other field does not trigger geometryChange", 0, function() {
        circle.observer = {
            geometryChange: function() {
                ok(false);
            }
        };

        circle.set("foo", 1);
    });

    test("setting radius to same value does not trigger geometryChange", 0, function() {
        circle.observer = {
            geometryChange: function() {
                ok(false);
            }
        };

        circle.set("radius", 10);
    });

    test("equals is true for same center and radius", function() {
        ok(new Circle(new Point(0, 0), 10).equals(circle));
    });

    test("equals is false for different centers", function() {
        ok(!new Circle(new Point(1, 1), 10).equals(circle));
    });

    test("equals is false for different radius", function() {
        ok(!new Circle(new Point(0, 0), 1).equals(circle));
    });

    test("equals is false for undefined circle", function() {
        ok(!new Circle(new Point(1, 1), 10).equals());
    });

    test("clone returns new instance", function() {
        var clone = circle.clone();
        notEqual(clone, circle);
        ok(clone instanceof Circle);
    });

    test("clone returns new center instance", function() {
        var clone = circle.clone();
        notEqual(clone.center, circle.center);
    });

    test("clone copies center", function() {
        var clone = circle.clone();
        ok(clone.center.equals(clone.center));
    });

    test("clone copies radius", function() {
        var clone = circle.clone();
        equal(clone.radius, circle.radius);
    });

    test("boundingBox returns the circle bounding Rect", function() {
        var rect = circle.bBox();
        compareBoundingBox(rect, [-10,-10,10,10]);
    });

    test("boundingBox returns the transformed circle bounding Rect", function() {
        var rect = circle.bBox(Matrix.scale(2,1));
        compareBoundingBox(rect, [-20,-10,20,10]);
    });

    // ------------------------------------------------------------
    var arc,
        ARC_POINT_TOLERANCE = 0.1;

    module("Arc", {
        setup: function() {
            arc = new Arc(new Point(100, 100), {
                startAngle: 0,
                endAngle: 180,
                radiusX: 50,
                radiusY: 100
            });
        }
    });

    test("constructor sets center", function() {
        ok(arc.center.equals(new Point(100, 100)));
        ok(arc.center.observer === arc);
    });

    test("constructor inits center if not passed", function() {
        arc = new Arc();
        ok(arc.center instanceof Point);
    });

    test("constructor sets options", function() {
        equal(arc.radiusX, 50);
        equal(arc.radiusY, 100);
        equal(arc.startAngle, 0);
        equal(arc.endAngle, 180);
    });

    test("counterClockwise is false by default", function() {
        equal(arc.counterClockwise, false);
    });

    test("modifying center triggers geometryChange", function() {
        arc.observer = {
            geometryChange: function() {
                ok(true);
            }
        };

        arc.center.set("x", 1);
    });

    test("sets fields", function() {
        arc.set("radiusX", 10);
        arc.set("radiusY", 20);
        arc.set("startAngle", 30);
        arc.set("endAngle", 40);
        arc.set("counterClockwise", true);

        equal(arc.radiusX, 10);
        equal(arc.radiusY, 20);
        equal(arc.startAngle, 30);
        equal(arc.endAngle, 40);
        equal(arc.counterClockwise, true);
    });

    test("setting a field triggers geometryChange", function() {
        arc.observer = {
            geometryChange: function() {
                ok(true);
            }
        };

        arc.set("radiusX", 10);
    });

    test("setting a field to the same value does not trigger geometryChange", 0, function() {
        arc.observer = {
            geometryChange: function() {
                ok(false);
            }
        };

        arc.set("radiusX", 50);
    });

    test("setting an invalid field does not trigger geometryChange", 0, function() {
        arc.observer = {
            geometryChange: function() {
                ok(false);
            }
        };

        arc.set("foo", 10);
    });

    test("gets fields", function() {
        equal(arc.get("radiusX"), 50);
        equal(arc.get("radiusY"), 100);
        equal(arc.get("startAngle"), 0);
        equal(arc.get("endAngle"), 180);
        equal(arc.get("counterClockwise"), false);
    });

    test("pointAt returns the point on the elipse for a given angle", function() {
        var point1 = arc.pointAt(0),
            point2 = arc.pointAt(180),
            point3 = arc.pointAt(360);

        close(point1.x, 150, ARC_POINT_TOLERANCE);
        close(point1.y, 100, ARC_POINT_TOLERANCE);
        close(point2.x, 50, ARC_POINT_TOLERANCE);
        close(point2.y, 100, ARC_POINT_TOLERANCE);
        close(point3.x, 150, ARC_POINT_TOLERANCE);
        close(point3.y, 100, ARC_POINT_TOLERANCE);
    });

    test("boundingBox returns the arc bounding Rect", function() {
        var rect = arc.bBox();
        compareBoundingBox(rect, [50,100,150,200]);
    });

    test("boundingBox returns the transformed arc bounding Rect", function() {
        var rect = arc.bBox(Matrix.scale(2,1));
        compareBoundingBox(rect, [100,100,300,200]);
    });

    test("curvePoints returns points for a curve that approximate the arc", function() {
        var points = arc.curvePoints(),
            expected = [Point.create(150, 100), Point.create(150, 152.4), Point.create(126.2, 200),
                Point.create(100, 200), Point.create(73.8, 200), Point.create(50, 152.4), Point.create(50, 100)];

        if (points.length !== expected.length) {
            ok(false);
        }

        for (var i = 0; i < points.length; i++) {
            close(points[i].x, expected[i].x, ARC_POINT_TOLERANCE);
            close(points[i].y, expected[i].y, ARC_POINT_TOLERANCE);
        }
    });

    // ------------------------------------------------------------
    (function() {
        var matrix,
            result;

        function compareMatrices(m1, m2, tolerance) {
            tolerance = tolerance  || 0;
            close(m1.a, m2.a, tolerance);
            close(m1.b, m2.b, tolerance);
            close(m1.c, m2.c, tolerance);
            close(m1.d, m2.d, tolerance);
            close(m1.e, m2.e, tolerance);
            close(m1.f, m2.f, tolerance);
        }

        function initMatrix(a,b,c,d,e,f) {
            return {a: a, b: b, c: c, d: d, e: e, f: f};
        }

        module("Matrix", {});

        test("sets passed parameters", function() {
            matrix = new Matrix(2,2,2,2,2,2);
            compareMatrices(matrix, initMatrix(2,2,2,2,2,2));
        });

        test("sets undefined values to zero", function() {
            matrix = new Matrix(undefined,2,2,undefined,2,2);
            compareMatrices(matrix, initMatrix(0,2,2,0,2,2));
        });

        test("times multiplies matrix", function() {
            matrix = new Matrix(2,2,2,2,2,2);
            compareMatrices(matrix.times(new Matrix(3,3,3,3,3,3)), initMatrix(12,12,12,12,14,14));
        });

        test("times returns a new matrix", function() {
            matrix = new Matrix(2,2,2,2,2,2);
            result = matrix.times(new Matrix(3,3,3,3,3,3));
            ok(result !== matrix);
            ok(result instanceof Matrix);
        });

        test("clone returns a new matrix with the same values", function() {
            matrix = new Matrix(2,2,2,2,2,2);
            result = matrix.clone();
            compareMatrices(result, initMatrix(2,2,2,2,2,2));
        });

        test("unit returns the identity matrix", function() {
            matrix = Matrix.unit();
            compareMatrices(matrix, initMatrix(1,0,0,1,0,0));
        });

        test("Matrix.IDENTITY is equal to the unit matrix", function() {
            compareMatrices(Matrix.IDENTITY, Matrix.unit());
        });

        test("translate returns the identity matrix translated with x y", function() {
            matrix = Matrix.translate(10, 20);
            compareMatrices(matrix, initMatrix(1,0,0,1,10,20));
        });

        test("rotate returns the rotated matrix for the specified angle", function() {
            matrix = Matrix.rotate(45);
            compareMatrices(matrix, initMatrix(0.7071067811865476,0.7071067811865475,-0.7071067811865475,0.7071067811865476,0,0), 0.000001);
        });

        test("rotate returns the rotated around point matrix for the specified angle, x and y values", function() {
            matrix = Matrix.rotate(45, 100, 100);

            compareMatrices(matrix, initMatrix(0.7071067811865476,0.7071067811865475,-0.7071067811865475,
                0.7071067811865476, 100,-41.421356237309496), 0.000001);
        });

        test("scale returns the identity matrix scaled by x y", function() {
            matrix = Matrix.scale(1.5, 1.1);
            compareMatrices(matrix, initMatrix(1.5,0,0,1.1,0,0));
        });

        module("Matrix / toString", {
            setup: function() {
                matrix = new Matrix(1.2345678,0,0,1.2345, 2, 3);
            }
        });

        test("returns a string with the values separated by comma", function() {
            result = matrix.toString();
            equal(result, "1.2345678,0,0,1.2345,2,3");
        });

        test("returns a string with the values separated by the specified separator", function() {
            result = matrix.toString(undefined, ";");
            equal(result, "1.2345678;0;0;1.2345;2;3");
        });

        test("returns a string with the values rounded to the specified precision", function() {
            result = matrix.toString(3);
            equal(result, "1.235,0,0,1.235,2,3");
        });

    })();

    // ------------------------------------------------------------
    (function() {
        var transform = g.transform,
            transformation,
            matrix = Matrix.rotate(30),
            IDENTITY = new Matrix(1, 0, 0, 1, 0, 0);;

        module("Transformation", {});

        test("sets passed matrix", function() {
            transformation = new Transformation(matrix);
            deepEqual(transformation._matrix, matrix);
        });

        test("sets identity matrix if no matrix is passed", function() {
            transformation = new Transformation();
            deepEqual(transformation._matrix, IDENTITY);
        });

        test("matrix returns current matrix", function() {
            transformation = new Transformation(matrix);
            deepEqual(transformation.matrix(), matrix);
        });

        test("transform returns a new Transformation", function() {
            transformation = transform();
            ok(transformation instanceof Transformation);
        });

        test("transform returns new Transformation with the specified matrix set", function() {
            transformation = transform(matrix);
            deepEqual(transformation.matrix(), matrix);
        });

        module("Transformation / operations", {
            setup: function() {
                transformation = new Transformation();
            }
        });

        test("translate returns transformation", function() {
            result = transformation.translate(10, 20);
            ok(result === transformation);
        });

        test("translate applies translate to matrix", function() {
            transformation.translate(10, 20);
            deepEqual(transformation.matrix(), Matrix.translate(10, 20));
        });

        test("scale returns transformation", function() {
            result = transformation.scale(1, 2);
            ok(result === transformation);
        });

        test("scale applies scale to matrix", function() {
            transformation.scale(1, 2);
            deepEqual(transformation.matrix(), Matrix.scale(1, 2));
        });

        test("scale applies scale to both x and y if only one parameter is passed", function() {
            transformation.scale(2);
            deepEqual(transformation.matrix(), Matrix.scale(2, 2));
        });

        test("rotate returns transformation", function() {
            result = transformation.rotate(30);
            ok(result === transformation);
        });

        test("rotate applies rotation to matrix", function() {
            transformation.rotate(30);
            deepEqual(transformation.matrix(), Matrix.rotate(30));
        });

        test("rotate applies rotation around point to matrix if x and y are passed", function() {
            transformation.rotate(30, 100, 100);
            deepEqual(transformation.matrix(), Matrix.rotate(30, 100, 100));
        });

        test("multiply multiplies matrix by the passed transformation matrix", function() {
            transformation = new Transformation(new Matrix(2,2,2,2,2,2));
            transformation.multiply(new Transformation(new Matrix(3,3,3,3,3,3)));
            deepEqual(transformation.matrix(), new Matrix(12,12,12,12,14,14));
        });

        test("multiply multiplies matrix by the passed matrix", function() {
            transformation = new Transformation(new Matrix(2,2,2,2,2,2));
            transformation.multiply(new Matrix(3,3,3,3,3,3));
            deepEqual(transformation.matrix(), new Matrix(12,12,12,12,14,14));
        });

    })();

})();
