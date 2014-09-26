(function(f, define){
    define([
        "./shapes",
        "../../kendo.pdf",
        "../../kendo.colorpicker", // for kendo.parseColor
        "../../kendo.dataviz.core"
    ], f);
})(function(){

    "use strict";

    var kendo       = window.kendo;
    var dataviz     = kendo.dataviz;
    var PDF         = kendo.PDF;

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

    function toDataURL(group, callback) {
        var fonts = [], images = [];

        group.traverse(function(element){
            dispatch({
                Image: function(element) {
                    if (images.indexOf(element.src()) < 0) {
                        images.push(element.src());
                    }
                },
                Text: function(element) {
                    var style = PDF.parseFontDef(element.options.font);
                    var url = PDF.getFontURL(style);
                    if (fonts.indexOf(url) < 0) {
                        fonts.push(url);
                    }
                }
            }, element);
        });

        function doIt() {
            if (--count > 0) return;
            var pdf = new PDF();
            var page = pdf.addPage();
            drawElement(group, page, pdf);
            var binary = pdf.render();
            var base64 = window.btoa(binary);
            var dataurl = "data:application/pdf;base64," + base64;
            callback(dataurl);
        }

        var count = 2;
        PDF.loadFonts(fonts, doIt);
        PDF.loadImages(images, doIt);
    }

    function dispatch(handlers, element) {
        var handler = handlers[element.nodeType];
        if (handler) {
            handler.call.apply(handler, arguments);
        }
    }

    var globalAlpha = 1;

    function setGlobalAlpha(page, opacity, line, fill) {
        globalAlpha *= opacity;
        if (line) {
            page.setStrokeOpacity(globalAlpha);
        }
        if (fill) {
            page.setFillOpacity(globalAlpha);
        }
    }

    function drawElement(element, page, pdf) {
        var saveGlobalAlpha = globalAlpha;
        var transform = element.transform();
        var opacity = element.opacity();

        page.save();

        if (opacity != null) {
            setGlobalAlpha(page, opacity, true, true);
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
        globalAlpha = saveGlobalAlpha;
    }

    function setStrokeOptions(element, page, pdf) {
        var stroke = element.stroke && element.stroke();
        if (!stroke) {
            return;
        }

        var color = stroke.color;
        if (color) {
            color = parseColor(color);
            if (color == null) return; // no stroke
            page.setStrokeColor(color.r, color.g, color.b);
            if (color.a != 1) {
                page.setStrokeOpacity(globalAlpha * color.a);
            }
        }

        var width = stroke.width;
        if (width != null) {
            if (width == 0) return; // no stroke
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
            page.setStrokeOpacity(globalAlpha * opacity);
        }
    }

    function setFillOptions(element, page, pdf) {
        var fill = element.fill && element.fill();
        if (!fill) {
            return;
        }

        var color = fill.color;
        if (color) {
            color = parseColor(color);
            page.setFillColor(color.r, color.g, color.b);
            if (color.a != 1) {
                page.setFillOpacity(globalAlpha * color.a);
            }
        }

        var opacity = fill.opacity;
        if (opacity != null) {
            page.setFillOpacity(globalAlpha * opacity);
        }
    }

    function setClipping(element, page, pdf) {
        // XXX: only Path supported at the moment.
        var clip = element.clip();
        if (clip) {
            drawPath(clip, page, pdf);
            page.clip();
        }
    }

    function maybeFillStroke(element, page, pdf) {
        function should(thing) {
            return thing
                && !/^(none|transparent)$/i.test(thing.color)
                && (thing.width == null || thing.width > 0)
                && (thing.opacity == null || thing.opacity > 0);
        }
        if (should(element.fill()) && should(element.stroke())) {
            page.fillStroke();
        } else if (should(element.fill())) {
            page.fill();
        } else if (should(element.stroke())) {
            page.stroke();
        }
    }

    function drawPath(element, page, pdf) {
        var segments = element.segments;
        if (segments.length == 0) {
            return;
        }
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

        maybeFillStroke(element, page, pdf);
    }

    function drawMultiPath(element, page, pdf) {
        var paths = element.paths;
        for (var i = 0; i < paths.length; ++i) {
            drawPath(paths[i], page, pdf);
        }
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
        var style = PDF.parseFontDef(element.options.font);
        var pos = element._position;
        page.transform(1, 0, 0, -1, pos.x, pos.y + style.fontSize);
        page.beginText();
        page.setFont(PDF.getFontURL(style), style.fontSize);

        var mode;
        if (element.fill() && element.stroke()) {
            mode = PDF.TEXT_RENDERING_MODE.fillAndStroke;
        } else if (element.fill()) {
            mode = PDF.TEXT_RENDERING_MODE.fill;
        } else if (element.stroke()) {
            mode = PDF.TEXT_RENDERING_MODE.stroke;
        }
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

    function parseColor(color) {
        color = color.toLowerCase();
        if (/^(none|transparent)$/.test(color)) {
            return null;
        }
        if (dataviz.Color.namedColors.hasOwnProperty(color)) {
            color = dataviz.Color.namedColors[color];
        }
        return kendo.parseColor(color).toRGB();
    }

    kendo.deepExtend(dataviz.drawing, {
        pdf: {
            defineFont: PDF.defineFont,
            parseColor: parseColor,
            toDataURL: toDataURL
        }
    });

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
