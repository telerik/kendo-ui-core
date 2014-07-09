(function(f, define){
    define([ "./shapes" ], f);
})(function(){

(function () {

    // Imports ================================================================
    var $ = jQuery,
        noop = $.noop,
        doc = document,
        math = Math,

        kendo = window.kendo,
        Class = kendo.Class,
        Observable = kendo.Observable,
        ObservableArray = kendo.data.ObservableArray,
        ObservableObject = kendo.data.ObservableObject,
        getter = kendo.getter,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        alignToPixel = dataviz.util.alignToPixel,
        append = dataviz.append,
        defined = dataviz.defined,
        round = dataviz.round,
        renderTemplate = dataviz.renderTemplate,

        util = dataviz.util,
        valueOrDefault = util.valueOrDefault,

        d = dataviz.drawing,
        BaseNode = d.BaseNode,
        Group = d.Group,
        Box2D = dataviz.Box2D,
        Color = dataviz.Color,
        Path = d.Path;

    // Constants ==============================================================
    var BUTT = "butt",
        DASH_ARRAYS = dataviz.DASH_ARRAYS,
        SOLID = "solid";

    // Canvas Surface ==========================================================
    var Surface = d.Surface.extend({
        init: function(element, options) {
            d.Surface.fn.init.call(this, element, options);
            this.options.type = "canvas";

            this.element[0].innerHTML = this._template(this);
            var canvas = this.element[0].firstElementChild;
            canvas.width = $(element).width();
            canvas.height = $(element).height();

            this._rootElement = canvas;

            this._root = new RootNode(canvas);
            this._root.invalidate();
        },

        draw: function(element) {
            this._root.load([element]);
        },

        clear: function() {
            this._root.clear();
        },

        _resize: function() {
            this._rootElement.width = this._size.width;
            this._rootElement.height = this._size.height;

            this._root.invalidate();
        },

        _template: renderTemplate(
            "<canvas style='position: relative; " +
            "width: 100%; height: 100%;'></canvas>"
        )
    });

    // Nodes ===================================================================
    var Node = BaseNode.extend({
        renderTo: function(ctx) {
            var childNodes = this.childNodes,
                i;

            for (i = 0; i < childNodes.length; i++) {
                childNodes[i].renderTo(ctx);
            }
        },

        load: function(elements) {
            var node = this,
                childNode,
                srcElement,
                children,
                i;

            for (i = 0; i < elements.length; i++) {
                srcElement = elements[i];
                children = srcElement.children;

                // TODO: Node registration
                if (srcElement instanceof Path) {
                    childNode = new PathNode(srcElement);
                } else if (srcElement instanceof d.MultiPath) {
                    childNode = new MultiPathNode(srcElement);
                } else if (srcElement instanceof d.Circle) {
                    childNode = new CircleNode(srcElement);
                } else if (srcElement instanceof d.Arc) {
                    childNode = new ArcNode(srcElement);
                } else if (srcElement instanceof d.Text) {
                    childNode = new TextNode(srcElement);
                } else if (srcElement instanceof d.Image) {
                    childNode = new ImageNode(srcElement);
                } else {
                    childNode = new Node(srcElement);
                }

                if (children && children.length > 0) {
                    childNode.load(children);
                }

                node.append(childNode);
            }

            node.invalidate();
        }
    });

    var RootNode = Node.extend({
        init: function(canvas) {
            Node.fn.init.call(this);

            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
        },

        invalidate: function() {
            this.canvas.width = this.canvas.width;
            this.renderTo(this.ctx);
        }
    });

    var PathNode = Node.extend({
        renderTo: function(ctx) {
            ctx.save();

            ctx.beginPath();

            this.setTransform(ctx);
            this.renderPoints(ctx, this.srcElement);

            this.setLineDash(ctx);
            this.setLineCap(ctx);
            this.setLineJoin(ctx);

            this.setFill(ctx);
            this.setStroke(ctx);

            ctx.restore();
        },

        setFill: function(ctx) {
            var fill = this.srcElement.options.fill;
            if (fill && fill.color !== "transparent") {
                ctx.fillStyle = fill.color;
                ctx.globalAlpha = fill.opacity;
                ctx.fill();
            }
        },

        setStroke: function(ctx) {
            var stroke = this.srcElement.options.stroke;
            if (stroke) {
                ctx.strokeStyle = stroke.color;
                ctx.lineWidth = valueOrDefault(stroke.width, 1);
                ctx.globalAlpha = stroke.opacity;
                ctx.stroke();
            }
        },

        dashType: function() {
            var stroke = this.srcElement.options.stroke;
            if (stroke && stroke.dashType) {
                return stroke.dashType.toLowerCase();
            }
        },

        setLineDash: function(ctx) {
            var dashType = this.dashType();
            if (dashType && dashType != SOLID) {
                var dashArray = DASH_ARRAYS[dashType];
                if (ctx.setLineDash) {
                    ctx.setLineDash(dashArray);
                } else {
                    ctx.mozDash = dashArray;
                    ctx.webkitLineDash = dashArray;
                }
            }
        },

        setLineCap: function(ctx) {
            var dashType = this.dashType();
            var stroke = this.srcElement.options.stroke;
            if (dashType && dashType !== SOLID) {
                ctx.lineCap = BUTT;
            } else if (stroke && stroke.lineCap) {
                ctx.lineCap = stroke.lineCap;
            }
        },

        setLineJoin: function(ctx) {
            var stroke = this.srcElement.options.stroke;
            if (stroke && stroke.lineJoin) {
                ctx.lineJoin = stroke.lineJoin;
            }
        },

        setTransform: function(ctx) {
            var transform = this.srcElement.transform();
            if (transform) {
                ctx.transform.apply(ctx, transform.matrix().toArray(6));
            }
        },

        renderPoints: function(ctx, path) {
            var segments = path.segments;

            if (segments.length === 0) {
                return;
            }

            var seg = segments[0];
            var anchor = seg.anchor();
            ctx.moveTo(anchor.x, anchor.y);

            for (var i = 1; i < segments.length; i++) {
                seg = segments[i];
                anchor = seg.anchor();

                var prevSeg = segments[i - 1];
                var prevOut = prevSeg.controlOut();
                var controlIn = seg.controlIn();

                if (prevOut && controlIn) {
                    ctx.bezierCurveTo(prevOut.x, prevOut.y,
                                      controlIn.x, controlIn.y,
                                      anchor.x, anchor.y);
                } else {
                    ctx.lineTo(anchor.x, anchor.y);
                }
            }

            if (path.options.closed) {
                ctx.closePath();
            }
        }
    });

    var MultiPathNode = PathNode.extend({
        renderPoints: function(ctx) {
            var paths = this.srcElement.paths;
            for (var i = 0; i < paths.length; i++) {
                PathNode.fn.renderPoints(ctx, paths[i]);
            }
        }
    });

    var CircleNode = PathNode.extend({
        renderPoints: function(ctx) {
            var geometry = this.srcElement.geometry();
            var c = geometry.center;
            var r = geometry.radius;

            ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
        }
    });

    var ArcNode = PathNode.extend({
        renderPoints: function(ctx) {
            var path = this.srcElement.toPath();
            PathNode.fn.renderPoints.call(this, ctx, path);
        }
    });

    var TextNode = PathNode.extend({
        renderTo: function(ctx) {
            var text = this.srcElement;
            var pos = text.position();
            var size = text.measure();

            ctx.save();

            this.setFill(ctx);
            this.setTransform(ctx);

            ctx.font = text.options.font;
            ctx.fillText(text.content(), pos.x, pos.y + size.baseline);

            ctx.restore();
        }
    });

    var ImageNode = PathNode.extend({
        init: function(srcElement) {
            PathNode.fn.init.call(this, srcElement);

            this.onLoad = $.proxy(this.onLoad, this);
            this._loaded = false;

            this.img = new Image();
            this.img.onload = this.onLoad;

            this.img.src = srcElement.src();
        },

        renderTo: function(ctx) {
            if (this._loaded) {
                ctx.save();

                this.setTransform(ctx);
                this.drawImage(ctx);

                ctx.restore();
            }
        },

        optionsChange: function(e) {
            if (e.field === "src") {
                this._loaded = false;
                this.img.src = this.srcElement.src();
            } else {
                PathNode.fn.optionsChange.call(this, e);
            }
        },

        onLoad: function() {
            this._loaded = true;
            this.invalidate();
        },

        drawImage: function(ctx) {
            var rect = this.srcElement.rect();
            var tl = rect.topLeft();

            ctx.drawImage(
                this.img, tl.x, tl.y, rect.width(), rect.height()
            );
        }
    });

    // Exports ================================================================
    kendo.support.canvas = (function() {
        return !!doc.createElement("canvas").getContext;
    })();

    if (kendo.support.canvas) {
        d.SurfaceFactory.current.register("canvas", Surface, 20);
    }

    deepExtend(dataviz.drawing, {
        canvas: {
            ArcNode: ArcNode,
            CircleNode: CircleNode,
            ImageNode: ImageNode,
            MultiPathNode: MultiPathNode,
            Node: Node,
            PathNode: PathNode,
            Surface: Surface,
            TextNode: TextNode
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
