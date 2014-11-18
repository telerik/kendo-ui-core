var SANS = "Arial,Helvetica,sans-serif",
    SANS11 = "11px " + SANS,
    SANS12 = "12px " + SANS,
    SANS16 = "16px " + SANS;

var close = QUnit.close,
    notClose = QUnit.notClose;

function ViewStub() {
    var view = this,
        log = view.log = { };

    log.rect = [];
    log.text = [];
    log.group = [];
    log.line = [];
    log.path = [];
    log.circle = [];
    log.sector = [];
    log.ring = [];
    log.cubicCurve = [];
    log.multiLine = [];
    log.clipPath = [];
    log.textbox = [];
}

ViewStub.prototype = {
    findInLog: function(elementsName, callback) {
        var elements = this.log[elementsName];
        var element;
        if (elements) {
            for (var i = 0; i < elements.length; i++) {
                if (callback(elements[i])) {
                    return elements[i];
                }
            }
        }
    },

    createRect: function(box, style) {
        this.log.rect.push({
            x1: box.x1,
            y1: box.y1,
            x2: box.x2,
            y2: box.y2,
            style: style
        });

        return new kendo.dataviz.ViewElement(style);
    },

    createText: function(content, style) {
        this.log.text.push({
            content: content,
            style: style
        });

        return new kendo.dataviz.ViewElement(style);
    },

    createTextBox: function(options) {
        this.log.textbox.push({
            options: options
        });
        return new kendo.dataviz.ViewElement(options);
    },

    createGroup: function(options) {
        this.log.group.push({options: options});
        return new kendo.dataviz.ViewElement(options);
    },

    createClipPath: function(id, box) {
        this.log.clipPath.push({id: id, box: box});
        return new kendo.dataviz.ViewElement({});
    },

    createLine: function(x1, y1, x2, y2, options) {
        this.log.line.push({ x1: x1, y1: y1, x2: x2, y2: y2, options: options });
        return new kendo.dataviz.ViewElement(options);
    },

    createMultiLine: function(elements, options) {
        this.log.multiLine.push({lines: elements, options: options});
        return new kendo.dataviz.ViewElement(options);
    },

    createPolyline: function(points, closed, style) {
        this.log.path.push({ points: points, closed: closed, style: style });
        var element = new kendo.dataviz.ViewElement(style);
        element.points = points;
        element.closed = closed;
        element.clone = function() {
            return this;
        };
        return element;
    },

    createCircle: function(c, r, style) {
        this.log.circle.push({
            c: c, r: r, style: style });

        var element = new kendo.dataviz.ViewElement(style);
        element.c = c;
        element.r = r;

        return element;
    },

    createSector: function(sector, style) {
        this.log.sector.push({ sector: sector, style: style });

        return new kendo.dataviz.ViewElement(style);
    },

    createRing: function(ring, style) {
        this.log.ring.push({ ring: ring, style: style });

        return new kendo.dataviz.ViewElement(style);
    },

    createCubicCurve: function (points, options, areaPoints) {
        this.log.cubicCurve.push({ points: points, options: options, areaPoints: areaPoints });
        return new kendo.dataviz.ViewElement(options);
    }
};

function ViewElementStub() {
    this.children = [];
}

function makeStub(methods) {
    var stub = function() {
        this.log = {};
    };

    $.each(methods, function(i, m) {
        var name = m[0] || m;
        var argNames = m[1] || [];

        stub.prototype[name] = function() {
            var entry = {};
            var args = arguments || [];
            $.each(argNames, function(i, argName) {
                 entry[argName] = args[i];
            });

            var log = this.log[name] = this.log[name] || [];
            log.push(entry);
        }
    });

    return stub;
}

function arrayClose(a, b, tolerance) {
    if (a.length != b.length) {
        ok(false, "Arrays differ in size " + "(expected " + b.length + ", got " + a.length + " elements)");
    } else if (a.length) {
        for (var i = 0; i < a.length; i++) {
            if (a[i].length) {
                arrayClose(a[i], b[i], tolerance, "Values at index " + i);
            } else {
                QUnit.close(a[i], b[i], tolerance, "Values at index " + i);
            }
        }
    } else {
        ok(true);
    }
}

function sameBox(a, b, tolerance) {
    arrayClose([a.x1, a.y1, a.x2, a.y2], [b.x1, b.y1, b.x2, b.y2], tolerance);
}

function closePoints(p1, p2, tolerance) {
    close(p1.x, p2.x, tolerance);
    close(p1.y, p2.y, tolerance);
}

function closePaths(path1, path2, tolerance) {
    var segments1 = path1.segments;
    var segments2 = path2.segments;
    var segment1, segment2;
    ok(segments1.length === segments2.length);
    for (var idx = 0; idx < segments1.length; idx++) {
        segment1 = segments1[idx];
        segment2 = segments2[idx];
        if (segment1.controlOut()) {
            closePoints(segment1.controlOut(), segment2.controlOut(), tolerance);
        }
        closePoints(segment1.anchor(), segment2.anchor(), tolerance);
        if (segment1.controlIn()) {
            closePoints(segment1.controlIn(), segment2.controlIn(), tolerance);
        }
    }
}

function sameLinePath(actual, expected, tolerance) {
    var actualSegments = actual.segments;
    var expectedSegments = expected.segments;
    var actualPoint, expectedPoint;
    if (actualSegments.length !== expectedSegments.length) {
        ok(false, "different segment lengths");
    }
    equal(!!actual.options.closed, !!expected.options.closed)

    for (var idx = 0; idx < actualSegments.length; idx++) {
        actualPoint = actualSegments[idx].anchor();
        expectedPoint = expectedSegments[idx].anchor();
        close(actualPoint.x, expectedPoint.x, tolerance);
        close(actualPoint.y, expectedPoint.y, tolerance);
    }
}

function sameRectPath(path, rectCoordinates, TOLERANCE) {
    var x1 = rectCoordinates[0],
        y1 = rectCoordinates[1],
        x2 = rectCoordinates[2],
        y2 = rectCoordinates[3];

    var rect = kendo.drawing.Path.fromRect(new kendo.geometry.Rect([x1, y1], [x2 - x1, y2 - y1]));
    sameLinePath(path, rect, TOLERANCE);
}

function equalTexts(texts, expected) {
    deepEqual($.map(texts, function(text) { return text.content() }), expected);
}

function closeTextPosition(axis, texts, expected, tolerance) {
    if ($.isArray(expected)) {
        var origin, idx,
            textPositions = [];
        for (idx = 0; idx < texts.length; idx++) {
            origin = texts[idx].rect().origin;
            if (axis) {
                textPositions.push(origin[axis]);
            } else {
                textPositions.push([origin.x, origin.y]);
            }
        }
        arrayClose(textPositions, expected, tolerance);
    } else {
        $.each(texts, function(index) {
            close(this.rect().origin[axis], $.isArray(expected) ? expected[index] : expected, tolerance);
        });
    }
}

function stubMethod(fn, methodName, stub, callback) {
    var oldMethod = fn[methodName];

    fn[methodName] = stub;

    fn._stubbed = fn.overrides || [];
    fn._stubbed[methodName] = oldMethod;

    try {
        callback();
    }
    finally {
        fn[methodName] = oldMethod;
    }
}

function mapPoints(points) {
    return $.map(points, function(p) { return [[p.x, p.y]] });
}

function mapSegments(segments) {
    return $.map(segments, function(segment) { return [[segment.anchor().x, segment.anchor().y]] });
}

function triggerEvent(eventName, element, offsetX, offsetY) {
    var offset = element.position(),
        e = new jQuery.Event(eventName);

    e.clientX = offset.left + (offsetX || 0);
    e.clientY = offset.top + (offsetY || 0);
    element.trigger(e);
}

function createChart(options) {
    var div = $("<div id='container' />").appendTo(QUnit.fixture);
    div.kendoChart(options);

    return div.data("kendoChart");
}

function destroyChart() {
    kendo.destroy(QUnit.fixture);
    QUnit.fixture.empty();
}

function clickChart(chart, element, x, y) {
    chart._userEvents.press(x || 0, y || 0, element);
    chart._userEvents.end(x || 0, y || 0);
}

kendo.drawing.util.TextMetrics.current = {
    measure: function(text, style) {
        return {
            width: text ? text.length * 8 : 0,
            height: 15,
            baseline: 12
        };
    }
};
