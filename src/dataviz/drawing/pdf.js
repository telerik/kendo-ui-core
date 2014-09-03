(function(f, define){
    define([
        "./shapes",
        "./svg",
        "../../kendo.pdf",
        "../../kendo.colorpicker", // for kendo.parseColor
        "../../kendo.dataviz.core"
    ], f);
})(function(){

    var kendo       = window.kendo;
    var $           = kendo.jQuery;
    var dataviz     = kendo.dataviz;
    var PDF         = kendo.PDF;
    var d           = dataviz.drawing;
    var g           = dataviz.geometry;
    var BaseSurface = d.svg.Surface;

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

    var Surface = BaseSurface.extend({

        type: "pdf",

        init: function(element, options) {
            BaseSurface.prototype.init.apply(this, arguments);

            var self = this;
            this._pdfElements = [];
            $("<button>Get PDF</button>")
                .appendTo(element)
                .on("click", function(){
                    self._download();
                });
        },

        draw: function(element) {
            BaseSurface.prototype.draw.apply(this, arguments);
            this._pdfElements.push(element);
        },

        _download: function() {
            var pdf = new PDF();
            var page = pdf.addPage();

            for (var i = 0; i < this._pdfElements.length; ++i) {
                var element = this._pdfElements[i];
                this._drawElement(element, page, pdf);
            }

            var binary = pdf.render();
            var base64 = window.btoa(binary);
            var dataurl = "data:application/pdf;base64," + base64;
            window.open(dataurl);
        },

        _drawElement: function(element, page, pdf) {
            page.save();
            this._setStrokeOptions(element, page, pdf);
            this._setFillOptions(element, page, pdf);

            var transform = element.transform();
            if (transform) {
                var m = transform.matrix();
                page.transform(m.a, m.b, m.c, m.d, m.e, m.f);
            }

            if (element instanceof d.Path) {
                this._drawPath(element, page, pdf);
            }
            else if (element instanceof d.MultiPath) {
                this._drawMultiPath(element, page, pdf);
            }
            else if (element instanceof d.Circle) {
                this._drawCircle(element, page, pdf);
            }
            else if (element instanceof d.Arc) {
                this._drawArc(element, page, pdf);
            }
            else if (element instanceof d.Text) {
                this._drawText(element, page, pdf);
            }
            else if (element instanceof d.Image) {
                this._drawImage(element, page, pdf);
            }
            else if (element instanceof d.Group) {
                this._drawGroup(element, page, pdf);
            }
            else {
                console.error("Unsupported PDF element");
                console.error(element);
            }
            page.restore();
        },

        _setStrokeOptions: function(element, page, pdf) {
            var stroke = element.stroke && element.stroke();
            if (!stroke) {
                return;
            }

            var color = stroke.color;
            if (color) {
                color = parseColor(color);
                page.setStrokeColor(color.r, color.g, color.b);
            }

            var width = stroke.width;
            if (width != null) {
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
        },

        _setFillOptions: function(element, page, pdf) {
            var fill = element.fill && element.fill();
            if (!fill) {
                return;
            }

            var color = fill.color;
            if (color) {
                color = parseColor(color);
                page.setFillColor(color.r, color.g, color.b);
            }

            var opacity = fill.opacity;
            if (opacity != null) {
                page.setFillOpacity(opacity);
            }
        },

        _maybeFillStroke: function(element, page, pdf) {
            if (element.fill() && element.stroke()) {
                page.fillStroke();
            } else if (element.fill()) {
                page.fill();
            } else if (element.stroke()) {
                page.stroke();
            }
        },

        _drawPath: function(element, page, pdf) {
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

            this._maybeFillStroke(element, page, pdf);
        },

        _drawMultiPath: function(element, page, pdf) {
            var paths = element.paths;
            for (var i = 0; i < paths.length; ++i) {
                this._drawPath(paths[i], page, pdf);
            }
        },

        _drawCircle: function(element, page, pdf) {
            var g = element.geometry();
            page.circle(g.center.x, g.center.y, g.radius);
            this._maybeFillStroke(element, page, pdf);
        },

        _drawArc: function(element, page, pdf) {
            var points = element.geometry().curvePoints();
            page.moveTo(points[0].x, points[0].y);
            for (var i = 1; i < points.length; i += 3) {
                page.bezier(
                    points[i + 0].x, points[i + 0].y,
                    points[i + 1].x, points[i + 1].y,
                    points[i + 2].x, points[i + 2].y
                );
            }
            this._maybeFillStroke(element, page, pdf);
        },

        _drawText: function(element, page, pdf) {
            var fontdef = element.options.font;
            var m = fontdef.match(/^([0-9.-]+)(px|pt)\s+(.*)/);
            var fontSize = m ? parseFloat(m[1]) : 12, fontFamily = m ? m[2] : "Helvetica";
            if (!m) {
                console.error("Can't parse", fontdef);
            }
            var pos = element._position;
            page.transform(1, 0, 0, -1, pos.x, pos.y + fontSize);
            page.beginText();

            // XXX: custom font mapping?
            page.setFont("./font.ttf", fontSize);

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
        },

        _drawGroup: function(element, page, pdf) {
            var children = element.children;
            for (var i = 0; i < children.length; ++i) {
                this._drawElement(children[i], page, pdf);
            }
        },

        _drawImage: function(element, page, pdf) {
            var url = element.src();
            var rect = element.rect();
            var tl = rect.getOrigin();
            var sz = rect.getSize();
            page.transform(sz.width, 0, 0, -sz.height, tl.x, tl.y + sz.height);
            page.drawImage(url);
        }

    });

    function parseColor(color) {
        color = color.toLowerCase();
        if (dataviz.Color.namedColors.hasOwnProperty(color)) {
            color = dataviz.Color.namedColors[color];
        }
        return kendo.parseColor(color).toRGB();
    }

    d.SurfaceFactory.current.register("pdf", Surface, 100);

    kendo.deepExtend(d, {
        pdf: {
            Surface: Surface
        }
    });

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
