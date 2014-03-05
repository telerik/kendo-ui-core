(function() {
    var dataviz = kendo.dataviz,
        d = dataviz.drawing,
        g = dataviz.geometry,
        Point = g.Point,
        parser = d.PathParser.current,
        multiPath,
        path,
        segment,
        point,
        TOLERANCE = 0.1;
    
    module("Parser", {});
    
    test("throws error for invalid command letter", function() {
        throws(function() {
            parser.parse("M 100 100 k 10 10");
        });
    });

    test("returns MultiPath", function() {
        ok(parser.parse("") instanceof d.MultiPath);
    });
    
    module("Parser / Move", {
        setup: function() {
            multiPath = parser.parse("M 100 100 m 50 50");
        }    
    });
    
    test("moves path", function() {
        path = multiPath.paths[0];
        point = path.segments[0].anchor;        
        equal(point.x, 100);
        equal(point.y, 100);
    });
    
    test("moves path with relative coordinates", function() {
        path = multiPath.paths[1];
        point = path.segments[0].anchor;
        equal(point.x, 150);
        equal(point.y, 150);
    });
    
    test("parses move with comma as separator", function() {
        multiPath = parser.parse("M 100,100");
        point = multiPath.paths[0].segments[0].anchor;
        equal(point.x, 100);
        equal(point.y, 100);
    });
    
    test("parses move without between the command and the coordinates", function() {
        multiPath = parser.parse("M100,100");
        point = multiPath.paths[0].segments[0].anchor;
        equal(point.x, 100);
        equal(point.y, 100);        
    });    

    module("Parser / Line", {
        setup: function() {
            multiPath = parser.parse("M 100 100 L 300 300 l 50 -50 0 30 H 400 V 300 h 50 v 50");
            path = multiPath.paths[0];
        }
    });
    
    test("parses line", function() {
        segment = path.segments[1];
        point = segment.anchor;
        equal(point.x, 300);
        equal(point.y, 300);
    });

    test("parses line with relative coordinates", function() {
        segment = path.segments[2];
        point = segment.anchor;
        equal(point.x, 350);
        equal(point.y, 250);
    });

    test("parses multiple coordinates", function() {
        segment = path.segments[3];
        point = segment.anchor;
        equal(point.x, 350);
        equal(point.y, 280);
    });
    
    test("parses horizontal line", function() {
        segment = path.segments[4];
        point = segment.anchor;
        equal(point.x, 400);
        equal(point.y, 280);
    });
    
    test("parses vertical line", function() {
        segment = path.segments[5];
        point = segment.anchor;
        equal(point.x, 400);
        equal(point.y, 300);
    });
    
    test("parses horizontal line with relative coordinates", function() {
        segment = path.segments[6];
        point = segment.anchor;
        equal(point.x, 450);
        equal(point.y, 300);
    });

    test("parses vertical line with relative coordinates", function() {
        segment = path.segments[7];
        point = segment.anchor;
        equal(point.x, 450);
        equal(point.y, 350);
    });
    
    test("parses line with comma as separator", function() {
        multiPath = parser.parse("M 100,100 L 300,300");       
        point = multiPath.paths[0].segments[1].anchor;
        equal(point.x, 300);
        equal(point.y, 300);
    });
    
    test("parses line without spaces between the command and the coordinates", function() {
        multiPath = parser.parse("M 100,100 L300,300");       
        point = multiPath.paths[0].segments[1].anchor;
        equal(point.x, 300);
        equal(point.y, 300);
    });       
    
    var endSegment;
    
    module("Parser / Curve", {
        setup: function() {
            multiPath = parser.parse("M 100 100 C 150 150 200 300 150 100 c 10 -20 50 30 100 100 10 10 50 50 30 -20");
            path = multiPath.paths[0];
        }
    });

    test("parses curve", function() {
        var controlOut = Point.create(150, 150),
            controlIn = Point.create(200, 300),
            anchor = Point.create(150, 100);
            
        segment = path.segments[0];
        endSegment = path.segments[1];   
        
        ok(segment.controlOut.equals(controlOut));
        ok(endSegment.controlIn.equals(controlIn));
        ok(endSegment.anchor.equals(anchor));
    });

    test("parses curve with relative coordinates", function() {
        var controlOut = Point.create(160, 80),
            controlIn = Point.create(200, 130),
            anchor = Point.create(250, 200);

        segment = path.segments[1];
        endSegment = path.segments[2];   
        
        ok(segment.controlOut.equals(controlOut));
        ok(endSegment.controlIn.equals(controlIn));
        ok(endSegment.anchor.equals(anchor));
    });

    test("parses multiple coordinates", function() {
        var controlOut = Point.create(260, 210),
            controlIn = Point.create(300, 250),
            anchor = Point.create(280, 180);

        segment = path.segments[2];
        endSegment = path.segments[3];   
        
        ok(segment.controlOut.equals(controlOut));
        ok(endSegment.controlIn.equals(controlIn));
        ok(endSegment.anchor.equals(anchor));
    });
    
    test("parses curve with comma as separator", function() {
        multiPath = parser.parse("M 100,100 C 150,150 200,300 150,100");       
        path = multiPath.paths[0];
        segment = path.segments[0];
        endSegment = path.segments[1];        
        
        var controlOut = Point.create(150, 150),
            controlIn = Point.create(200, 300),
            anchor = Point.create(150, 100);
            
        ok(segment.controlOut.equals(controlOut));
        ok(endSegment.controlIn.equals(controlIn));
        ok(endSegment.anchor.equals(anchor));
    });
    
    test("parses curve without spaces between the command and the coordinates", function() {
        multiPath = parser.parse("M100,100 C150,150 200,300 150,100");
        path = multiPath.paths[0];
        segment = path.segments[0];
        endSegment = path.segments[1];        
        
        var controlOut = Point.create(150, 150),
            controlIn = Point.create(200, 300),
            anchor = Point.create(150, 100);
            
        ok(segment.controlOut.equals(controlOut));
        ok(endSegment.controlIn.equals(controlIn));
        ok(endSegment.anchor.equals(anchor));
    });

    function closePoints(point1, point2, tolerance) {
        if (point1) {
            if (!point2) {
                ok(false);
            } else {
                close(point1.x, point2.x, tolerance);
                close(point1.y, point2.y, tolerance);
            }
        }
    }
    
    function closePaths(path1, path2, tolerance) {
        var segments1 = path1.segments,
            segments2 = path2.segments,
            length = segments1.length,
            i;
        if (segments1.length !== segments2.length) {
            ok(false);
        }
        
        for (i = 0; i < length; i++) {
            closePoints(segments1[i].anchor, segments2[i].anchor, tolerance);
            closePoints(segments1[i].controlOut, segments2[i].controlOut, tolerance);
            closePoints(segments1[i].controlIn, segments2[i].controlIn, tolerance);
        }
    }
    
    module("P=arser / Arc", {});
     
    test("parses arc to curve", function() {
        multiPath = parser.parse("M 300 300 A 50 100 0 1 1 350 300");
        path = multiPath.paths[0];
        var expectedPath = new d.Path();
        expectedPath.moveTo(300, 300);
        expectedPath.curveTo(Point.create(277.3,273.8), Point.create(268.6, 208.7), Point.create(281.7,163.4));
        expectedPath.curveTo(Point.create(294.8,118.1), Point.create(327.3, 100.6), Point.create(350, 126.8));
        expectedPath.curveTo(Point.create(372.7, 153), Point.create(381.4, 218.1), Point.create(368.3, 263.4));
        expectedPath.curveTo(Point.create(363.9, 278.5), Point.create(357.6, 291.3), Point.create(350, 300));
        
        closePaths(path, expectedPath, TOLERANCE);
    });

    // test("parses arc with relative coordinates", function() {
        // multiPath = parser.parse("M 340 265.4 a 80 40 0 0 1 29.3 54.6");
        // path = multiPath.paths[0];
        
        // var expectedPath = new d.Path();
        // expectedPath.moveTo(340, 265.4);
        // expectedPath.curveTo(Point.create(376.3, 275.8), Point.create(390.2, 301.9), Point.create(369.3, 320));
        
        // closePaths(path, expectedPath, TOLERANCE);
    // });    
    
})();    