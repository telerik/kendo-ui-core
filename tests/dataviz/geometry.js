(function() {
    var dataviz = kendo.dataviz,

        g = dataviz.geometry,
        Circle = g.Circle,
        Point = g.Point,
        Rect = g.Rect,
        Matrix = g.Matrix;

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

    test("toArray returns x, y array", function() {
        deepEqual(point.toArray(), [10, 20]);
    });

    test("sets x", function() {
        point.set("x", 10);
        equal(point.x, 10);
    });

    test("sets y", function() {
        point.set("y", 10);
        equal(point.y, 10);
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

    test("transform returns point", function() {
        deepEqual(point.transform(Matrix.unit), point);
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
})();
