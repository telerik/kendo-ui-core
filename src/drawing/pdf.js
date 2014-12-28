(function(f, define){
    define([
        "../kendo.core",
        "../kendo.color",
        "../kendo.pdf",
        "./shapes"
    ], f);
})(function(){

(function(kendo, $){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /*jshint eqnull:true  */

    var drawing     = kendo.drawing;
    var geo         = kendo.geometry;
    var Color       = drawing.Color;

    function PDF() {
        if (!kendo.pdf) {
            throw new Error("kendo.pdf.js is not loaded");
        }
        return kendo.pdf;
    }

    var DASH_PATTERNS = {
        dash           : [ 4 ],
        dashDot        : [ 4, 2, 1, 2 ],
        dot            : [ 1, 2 ],
        longDash       : [ 8, 2 ],
        longDashDot    : [ 8, 2, 1, 2 ],
        longDashDotDot : [ 8, 2, 1, 2, 1, 2 ],
        solid          : []
    };

    var LINE_CAP = {
        butt   : 0,
        round  : 1,
        square : 2
    };

    var LINE_JOIN = {
        miter : 0,
        round : 1,
        bevel : 2
    };

    function render(group, callback) {
        var fonts = [], images = [], options = group.options;

        function getOption(name, defval, hash) {
            if (!hash) {
                hash = options;
            }
            if (hash.pdf && hash.pdf[name] != null) {
                return hash.pdf[name];
            }
            return defval;
        }

        var multiPage = getOption("multiPage");

        group.traverse(function(element){
            dispatch({
                Image: function(element) {
                    if (images.indexOf(element.src()) < 0) {
                        images.push(element.src());
                    }
                },
                Text: function(element) {
                    var style = PDF().parseFontDef(element.options.font);
                    var url = PDF().getFontURL(style);
                    if (fonts.indexOf(url) < 0) {
                        fonts.push(url);
                    }
                }
            }, element);
        });

        function doIt() {
            if (--count > 0) {
                return;
            }

            var pdf = new (PDF().Document)({
                title     : getOption("title"),
                author    : getOption("author"),
                subject   : getOption("subject"),
                keywords  : getOption("keywords"),
                creator   : getOption("creator"),
                date      : getOption("date")
            });

            function drawPage(group) {
                var options = group.options;

                var tmp = optimize(group);
                var bbox = tmp.bbox;
                group = tmp.root;

                var paperSize = getOption("paperSize", "auto", options), addMargin = false;
                if (paperSize == "auto") {
                    if (bbox) {
                        var size = bbox.getSize();
                        paperSize = [ size.width, size.height ];
                        addMargin = true;
                        var origin = bbox.getOrigin();
                        tmp = new drawing.Group();
                        tmp.transform(new geo.Matrix(1, 0, 0, 1, -origin.x, -origin.y));
                        tmp.append(group);
                        group = tmp;
                    }
                    else {
                        paperSize = "A4";
                    }
                }

                var page;
                page = pdf.addPage({
                    paperSize : paperSize,
                    margin    : getOption("margin", getOption("margin"), options),
                    addMargin : addMargin,
                    landscape : getOption("landscape", getOption("landscape", false), options)
                });
                drawElement(group, page, pdf);
            }

            if (multiPage) {
                group.children.forEach(drawPage);
            } else {
                drawPage(group);
            }

            callback(pdf.render(), pdf);
        }

        var count = 2;
        PDF().loadFonts(fonts, doIt);
        PDF().loadImages(images, doIt);
    }

    function toDataURL(group, callback) {
        render(group, function(data){
            callback("data:application/pdf;base64," + data.base64());
        });
    }

    function toBlob(group, callback) {
        render(group, function(data){
            callback(new Blob([ data.get() ], { type: "application/pdf" }));
        });
    }

    function saveAs(group, filename, proxy, callback) {
        // XXX: Safari has Blob, but does not support the download attribute
        //      so we'd end up converting to dataURL and using the proxy anyway.
        if (window.Blob && !kendo.support.browser.safari) {
            toBlob(group, function(blob){
                kendo.saveAs({ dataURI: blob, fileName: filename });
                if (callback) {
                    callback(blob);
                }
            });
        } else {
            toDataURL(group, function(dataURL){
                kendo.saveAs({ dataURI: dataURL, fileName: filename, proxyURL: proxy });
                if (callback) {
                    callback(dataURL);
                }
            });
        }
    }

    function dispatch(handlers, element) {
        var handler = handlers[element.nodeType];
        if (handler) {
            return handler.call.apply(handler, arguments);
        }
        return element;
    }

    function drawElement(element, page, pdf) {
        if (element.DEBUG) {
            page.comment(element.DEBUG);
        }

        var transform = element.transform();
        var opacity = element.opacity();

        page.save();

        if (opacity != null && opacity < 1) {
            page.setOpacity(opacity);
        }

        setStrokeOptions(element, page, pdf);
        setFillOptions(element, page, pdf);
        setClipping(element, page, pdf);

        if (transform) {
            var m = transform.matrix();
            page.transform(m.a, m.b, m.c, m.d, m.e, m.f);
        }

        dispatch({
            Path      : drawPath,
            MultiPath : drawMultiPath,
            Circle    : drawCircle,
            Arc       : drawArc,
            Text      : drawText,
            Image     : drawImage,
            Group     : drawGroup
        }, element, page, pdf);

        page.restore();
    }

    function setStrokeOptions(element, page, pdf) {
        var stroke = element.stroke && element.stroke();
        if (!stroke) {
            return;
        }

        var color = stroke.color;
        if (color) {
            color = parseColor(color);
            if (color == null) {
                return; // no stroke
            }
            page.setStrokeColor(color.r, color.g, color.b);
            if (color.a != 1) {
                page.setStrokeOpacity(color.a);
            }
        }

        var width = stroke.width;
        if (width != null) {
            if (width === 0) {
                return; // no stroke
            }
            page.setLineWidth(width);
        }

        var dashType = stroke.dashType;
        if (dashType) {
            page.setDashPattern(DASH_PATTERNS[dashType], 0);
        }

        var lineCap = stroke.lineCap;
        if (lineCap) {
            page.setLineCap(LINE_CAP[lineCap]);
        }

        var lineJoin = stroke.lineJoin;
        if (lineJoin) {
            page.setLineJoin(LINE_JOIN[lineJoin]);
        }

        var opacity = stroke.opacity;
        if (opacity != null) {
            page.setStrokeOpacity(opacity);
        }
    }

    function setFillOptions(element, page, pdf) {
        var fill = element.fill && element.fill();
        if (!fill) {
            return;
        }

        if (fill instanceof drawing.Gradient) {
            return;
        }

        var color = fill.color;
        if (color) {
            color = parseColor(color);
            if (color == null) {
                return; // no fill
            }
            page.setFillColor(color.r, color.g, color.b);
            if (color.a != 1) {
                page.setFillOpacity(color.a);
            }
        }

        var opacity = fill.opacity;
        if (opacity != null) {
            page.setFillOpacity(opacity);
        }
    }

    function setClipping(element, page, pdf) {
        // XXX: only Path supported at the moment.
        var clip = element.clip();
        if (clip) {
            _drawPath(clip, page, pdf);
            page.clip();
            // page.setStrokeColor(Math.random(), Math.random(), Math.random());
            // page.setLineWidth(1);
            // page.stroke();
        }
    }

    function shouldDraw(thing) {
        return (thing &&
                (thing instanceof drawing.Gradient ||
                 (thing.color && !/^(none|transparent)$/i.test(thing.color) &&
                  (thing.width == null || thing.width > 0) &&
                  (thing.opacity == null || thing.opacity > 0))));
    }

    function maybeGradient(element, page, pdf, stroke) {
        var fill = element.fill();
        if (fill instanceof drawing.Gradient) {
            if (stroke) {
                page.clipStroke();
            } else {
                page.clip();
            }
            var isRadial = fill instanceof drawing.RadialGradient;
            var start, end;
            if (isRadial) {
                start = { x: fill.center().x , y: fill.center().y , r: 0 };
                end   = { x: fill.center().x , y: fill.center().y , r: fill.radius() };
            } else {
                start = { x: fill.start().x , y: fill.start().y };
                end   = { x: fill.end().x   , y: fill.end().y   };
            }
            var gradient = {
                type: isRadial ? "radial" : "linear",
                start: start,
                end: end,
                userSpace: fill.userSpace(),
                stops: fill.stops.elements().map(function(stop){
                    var offset = stop.offset();
                    if (/%$/.test(offset)) {
                        offset = parseFloat(offset) / 100;
                    } else {
                        offset = parseFloat(offset);
                    }
                    var color = parseColor(stop.color());
                    color.a *= stop.opacity();
                    return {
                        offset: offset,
                        color: color
                    };
                })
            };
            var box = element.rawBBox();
            var tl = box.topLeft(), size = box.getSize();
            box = {
                left   : tl.x,
                top    : tl.y,
                width  : size.width,
                height : size.height
            };
            page.gradient(gradient, box);
            return true;
        }
    }

    function maybeFillStroke(element, page, pdf) {
        if (shouldDraw(element.fill()) && shouldDraw(element.stroke())) {
            if (!maybeGradient(element, page, pdf, true)) {
                page.fillStroke();
            }
        } else if (shouldDraw(element.fill())) {
            if (!maybeGradient(element, page, pdf, false)) {
                page.fill();
            }
        } else if (shouldDraw(element.stroke())) {
            page.stroke();
        } else {
            // we should not get here; the path should have been
            // optimized away.  but let's be prepared.
            page.nop();
        }
    }

    function maybeDrawRect(path, page, pdf) {
        var segments = path.segments;
        if (segments.length == 4 && path.options.closed) {
            // detect if this path looks like a rectangle parallel to the axis
            var a = [];
            for (var i = 0; i < segments.length; ++i) {
                if (segments[i].controlIn()) { // has curve?
                    return false;
                }
                a[i] = segments[i].anchor();
            }
            // it's a rectangle if the y/x/y/x or x/y/x/y coords of
            // consecutive points are the same.
            var isRect = (
                a[0].y == a[1].y && a[1].x == a[2].x && a[2].y == a[3].y && a[3].x == a[0].x
            ) || (
                a[0].x == a[1].x && a[1].y == a[2].y && a[2].x == a[3].x && a[3].y == a[0].y
            );
            if (isRect) {
                // this saves a bunch of instructions in PDF:
                // moveTo, lineTo, lineTo, lineTo, close -> rect.
                page.rect(a[0].x, a[0].y,
                          a[2].x - a[0].x /*width*/,
                          a[2].y - a[0].y /*height*/);
                return true;
            }
        }
    }

    function _drawPath(element, page, pdf) {
        var segments = element.segments;
        if (segments.length === 0) {
            return;
        }
        if (!maybeDrawRect(element, page, pdf)) {
            for (var prev, i = 0; i < segments.length; ++i) {
                var seg = segments[i];
                var anchor = seg.anchor();
                if (!prev) {
                    page.moveTo(anchor.x, anchor.y);
                } else {
                    var prevOut = prev.controlOut();
                    var controlIn = seg.controlIn();
                    if (prevOut && controlIn) {
                        page.bezier(
                            prevOut.x   , prevOut.y,
                            controlIn.x , controlIn.y,
                            anchor.x    , anchor.y
                        );
                    } else {
                        page.lineTo(anchor.x, anchor.y);
                    }
                }
                prev = seg;
            }
            if (element.options.closed) {
                page.close();
            }
        }
    }

    function drawPath(element, page, pdf) {
        _drawPath(element, page, pdf);
        maybeFillStroke(element, page, pdf);
    }

    function drawMultiPath(element, page, pdf) {
        var paths = element.paths;
        for (var i = 0; i < paths.length; ++i) {
            _drawPath(paths[i], page, pdf);
        }
        maybeFillStroke(element, page, pdf);
    }

    function drawCircle(element, page, pdf) {
        var g = element.geometry();
        page.circle(g.center.x, g.center.y, g.radius);
        maybeFillStroke(element, page, pdf);
    }

    function drawArc(element, page, pdf) {
        var points = element.geometry().curvePoints();
        page.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < points.length;) {
            page.bezier(
                points[i].x, points[i++].y,
                points[i].x, points[i++].y,
                points[i].x, points[i++].y
            );
        }
        maybeFillStroke(element, page, pdf);
    }

    function drawText(element, page, pdf) {
        var style = PDF().parseFontDef(element.options.font);
        var pos = element._position;
        var mode;
        if (element.fill() && element.stroke()) {
            mode = PDF().TEXT_RENDERING_MODE.fillAndStroke;
        } else if (element.fill()) {
            mode = PDF().TEXT_RENDERING_MODE.fill;
        } else if (element.stroke()) {
            mode = PDF().TEXT_RENDERING_MODE.stroke;
        }

        page.transform(1, 0, 0, -1, pos.x, pos.y + style.fontSize);
        page.beginText();
        page.setFont(PDF().getFontURL(style), style.fontSize);
        page.setTextRenderingMode(mode);
        page.showText(element.content());
        page.endText();
    }

    function drawGroup(element, page, pdf) {
        var children = element.children;
        for (var i = 0; i < children.length; ++i) {
            drawElement(children[i], page, pdf);
        }
    }

    function drawImage(element, page, pdf) {
        var url = element.src();
        var rect = element.rect();
        var tl = rect.getOrigin();
        var sz = rect.getSize();
        page.transform(sz.width, 0, 0, -sz.height, tl.x, tl.y + sz.height);
        page.drawImage(url);
    }

    function exportPDF(group, options) {
        var defer = $.Deferred();

        group.options.set("pdf", options);
        drawing.pdf.toDataURL(group, defer.resolve);

        return defer.promise();
    }

    function parseColor(x) {
        var color = kendo.parseColor(x, true);
        return color ? color.toRGB() : null;
    }

    function optimize(root) {
        var clipbox = false;
        var matrix = geo.Matrix.unit();
        var currentBox = null;
        var changed;
        do {
            changed = false;
            root = opt(root);
        } while (root && changed);
        return { root: root, bbox: currentBox };

        function change(newShape) {
            changed = true;
            return newShape;
        }

        function visible(shape) {
            return (shape.visible() && shape.opacity() > 0 &&
                    ( shouldDraw(shape.fill()) ||
                      shouldDraw(shape.stroke()) ));
        }

        function optArray(a) {
            var b = [];
            for (var i = 0; i < a.length; ++i) {
                var el = opt(a[i]);
                if (el != null) {
                    b.push(el);
                }
            }
            return b;
        }

        function withClipping(shape, f) {
            var saveclipbox = clipbox;
            var savematrix = matrix;

            if (shape.transform()) {
                matrix = matrix.multiplyCopy(shape.transform().matrix());
            }

            var clip = shape.clip();
            if (clip) {
                clip = clip.bbox();
                if (clip) {
                    clip = clip.bbox(matrix);
                    clipbox = clipbox ? geo.Rect.intersect(clipbox, clip) : clip;
                }
            }

            try {
                return f();
            }
            finally {
                clipbox = saveclipbox;
                matrix = savematrix;
            }
        }

        function inClipbox(shape) {
            if (clipbox == null) {
                return false;
            }
            var box = shape.rawBBox().bbox(matrix);
            if (clipbox && box) {
                box = geo.Rect.intersect(box, clipbox);
            }
            return box;
        }

        function opt(shape) {
            if (!(shape instanceof drawing.Group || shape instanceof drawing.MultiPath)) {
                var box = inClipbox(shape);
                if (!box) {
                    return change(null);
                }
                currentBox = currentBox ? geo.Rect.union(currentBox, box) : box;
            }
            return dispatch({
                Path: function(shape) {
                    if (shape.segments.length === 0 || !visible(shape)) {
                        return change(null);
                    }
                    return shape;
                },
                MultiPath: function(shape) {
                    if (!visible(shape)) {
                        return change(null);
                    }
                    var el = new drawing.MultiPath(shape.options);
                    el.paths = optArray(shape.paths);
                    if (el.paths.length === 0) {
                        return change(null);
                    }
                    return el;
                },
                Circle: function(shape) {
                    if (!visible(shape)) {
                        return change(null);
                    }
                    return shape;
                },
                Arc: function(shape) {
                    if (!visible(shape)) {
                        return change(null);
                    }
                    return shape;
                },
                Text: function(shape) {
                    if (!/\S/.test(shape.content()) || !visible(shape)) {
                        return change(null);
                    }
                    return shape;
                },
                Image: function(shape) {
                    if (!(shape.visible() && shape.opacity() > 0)) {
                        return change(null);
                    }
                    return shape;
                },
                Group: function(shape) {
                    return withClipping(shape, function(){
                        var el = new drawing.Group(shape.options);
                        el.children = optArray(shape.children);
                        if (shape !== root && el.children.length === 0) {
                            return change(null);
                        }
                        return el;
                    });
                }
            }, shape);
        }
    }

    kendo.deepExtend(drawing, {
        exportPDF: exportPDF,

        pdf: {
            toDataURL  : toDataURL,
            toBlob     : toBlob,
            saveAs     : saveAs,
            toStream   : render
        }
    });

})(window.kendo, window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
