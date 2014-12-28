(function(f, define){
    define([ "./shapes", "../kendo.color" ], f);
})(function(){

(function ($) {

    // Imports ================================================================
    var noop = $.noop,
        doc = document,

        kendo = window.kendo,
        deepExtend = kendo.deepExtend,

        util = kendo.util,
        defined = util.defined,
        isTransparent = util.isTransparent,
        renderTemplate = util.renderTemplate,
        valueOrDefault = util.valueOrDefault,

        g = kendo.geometry,
        d = kendo.drawing,
        BaseNode = d.BaseNode;

    // Constants ==============================================================
    var BUTT = "butt",
        DASH_ARRAYS = d.DASH_ARRAYS,
        FRAME_DELAY = 1000 / 60,
        NONE = "none",
        SOLID = "solid";

    // Canvas Surface ==========================================================
    var Surface = d.Surface.extend({
        init: function(element, options) {
            d.Surface.fn.init.call(this, element, options);

            this.element[0].innerHTML = this._template(this);
            var canvas = this.element[0].firstElementChild;
            canvas.width = $(element).width();
            canvas.height = $(element).height();
            this._rootElement = canvas;

            this._root = new RootNode(canvas);
        },

        destroy: function() {
            d.Surface.fn.destroy.call(this);

            if (this._root) {
                this._root.destroy();
                this._root = null;
            }
        },

        type: "canvas",

        draw: function(element) {
            this._root.load([element], undefined, this.options.cors);
        },

        clear: function() {
            this._root.clear();
        },

        image: function() {
            var root = this._root;
            var rootElement = this._rootElement;

            var loadingStates = [];
            root.traverse(function(childNode) {
                if (childNode.loading) {
                    loadingStates.push(childNode.loading);
                }
            });

            var defer = $.Deferred();
            $.when.apply($, loadingStates).done(function() {
                root._invalidate();

                try {
                    var data = rootElement.toDataURL();
                    defer.resolve(data);
                } catch (e) {
                    defer.reject(e);
                }
            }).fail(function(e) {
                defer.reject(e);
            });

            return defer.promise();
        },

        _resize: function() {
            this._rootElement.width = this._size.width;
            this._rootElement.height = this._size.height;

            this._root.invalidate();
        },

        _template: renderTemplate(
            "<canvas style='width: 100%; height: 100%;'></canvas>"
        )
    });

    // Nodes ===================================================================
    var Node = BaseNode.extend({
        init: function(srcElement) {
            BaseNode.fn.init.call(this, srcElement);
            if (srcElement) {
                this.initClip();
            }
        },

        initClip: function() {
            var clip = this.srcElement.clip();
            if (clip) {
                this.clip = clip;
                clip.addObserver(this);
            }
        },

        clear: function() {
            if (this.srcElement) {
                this.srcElement.removeObserver(this);
            }

            this.clearClip();

            BaseNode.fn.clear.call(this);
        },

        clearClip: function() {
            if (this.clip) {
                this.clip.removeObserver(this);
                delete this.clip;
            }
        },

        setClip: function(ctx) {
            if (this.clip) {
                ctx.beginPath();
                PathNode.fn.renderPoints(ctx, this.clip);
                ctx.clip();
            }
        },

        optionsChange: function(e) {
            if (e.field == "clip") {
                this.clearClip();
                this.initClip();
            }

            BaseNode.fn.optionsChange.call(this, e);
        },

        setTransform: function(ctx) {
            if (this.srcElement) {
                var transform = this.srcElement.transform();
                if (transform) {
                    ctx.transform.apply(ctx, transform.matrix().toArray(6));
                }
            }
        },

        load: function(elements, pos, cors) {
            var node = this,
                childNode,
                srcElement,
                children,
                i;

            for (i = 0; i < elements.length; i++) {
                srcElement = elements[i];
                children = srcElement.children;

                childNode = new nodeMap[srcElement.nodeType](srcElement, cors);

                if (children && children.length > 0) {
                    childNode.load(children, pos, cors);
                }

                if (defined(pos)) {
                    node.insertAt(childNode, pos);
                } else {
                    node.append(childNode);
                }
            }

            node.invalidate();
        },

        setOpacity: function(ctx) {
            if (this.srcElement) {
                var opacity = this.srcElement.opacity();
                if (defined(opacity)) {
                    this.globalAlpha(ctx, opacity);
                }
            }
        },

        globalAlpha: function(ctx, value) {
            if (value && ctx.globalAlpha) {
                value *= ctx.globalAlpha;
            }
            ctx.globalAlpha = value;
        }
    });

    var GroupNode = Node.extend({
        renderTo: function(ctx) {
            var childNodes = this.childNodes,
                i;

            ctx.save();

            this.setTransform(ctx);
            this.setClip(ctx);
            this.setOpacity(ctx);

            for (i = 0; i < childNodes.length; i++) {
                childNodes[i].renderTo(ctx);
            }

            ctx.restore();
        }
    });
    d.mixins.Traversable.extend(GroupNode.fn, "childNodes");

    var RootNode = GroupNode.extend({
        init: function(canvas) {
            GroupNode.fn.init.call(this);

            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");

            this.invalidate = kendo.throttle(
                $.proxy(this._invalidate, this),
                FRAME_DELAY
            );
        },

        destroy: function() {
            GroupNode.fn.destroy.call(this);
            this.canvas = null;
            this.ctx = null;
        },

        _invalidate: function() {
            if (!this.ctx) {
                return;
            }

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.renderTo(this.ctx);
        }
    });
    d.mixins.Traversable.extend(RootNode.fn, "childNodes");

    var PathNode = Node.extend({
        renderTo: function(ctx) {
            ctx.save();

            this.setTransform(ctx);
            this.setClip(ctx);
            this.setOpacity(ctx);

            ctx.beginPath();

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
            var hasFill = false;

            if (fill) {
                if (fill.nodeType == "gradient") {
                    this.setGradientFill(ctx, fill);
                    hasFill = true;
                } else if (!isTransparent(fill.color)) {
                    ctx.fillStyle = fill.color;

                    ctx.save();
                    this.globalAlpha(ctx, fill.opacity);
                    ctx.fill();
                    ctx.restore();

                    hasFill = true;
                }
            }

            return hasFill;
        },

        setGradientFill: function(ctx, fill) {
            var bbox = this.srcElement.rawBBox();
            var gradient;

            if (fill instanceof d.LinearGradient) {
                var start = fill.start();
                var end = fill.end();
                gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
            } else if (fill instanceof d.RadialGradient) {
                var center = fill.center();
                gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, fill.radius());
            }

            addGradientStops(gradient, fill.stops);

            ctx.save();

            if (!fill.userSpace()) {
                ctx.transform(bbox.width(), 0, 0, bbox.height(), bbox.origin.x, bbox.origin.y);
            }
            ctx.fillStyle = gradient;
            ctx.fill();

            ctx.restore();
        },

        setStroke: function(ctx) {
            var stroke = this.srcElement.options.stroke;
            if (stroke && !isTransparent(stroke.color)) {
                ctx.strokeStyle = stroke.color;
                ctx.lineWidth = valueOrDefault(stroke.width, 1);

                ctx.save();
                this.globalAlpha(ctx, stroke.opacity);
                ctx.stroke();
                ctx.restore();

                return true;
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

            this.setTransform(ctx);
            this.setClip(ctx);
            this.setOpacity(ctx);

            ctx.beginPath();

            ctx.font = text.options.font;
            if (this.setFill(ctx)) {
                ctx.fillText(text.content(), pos.x, pos.y + size.baseline);
            }

            if (this.setStroke(ctx)) {
                this.setLineDash(ctx);
                ctx.strokeText(text.content(), pos.x, pos.y + size.baseline);
            }

            ctx.restore();
        }
    });

    var ImageNode = PathNode.extend({
        init: function(srcElement, cors) {
            PathNode.fn.init.call(this, srcElement);

            this.onLoad = $.proxy(this.onLoad, this);
            this.onError = $.proxy(this.onError, this);

            var img = this.img = new Image();

            if (cors) {
                img.crossOrigin = cors;
            }

            img.onload = this.onLoad;
            img.onerror = this.onError;
            var src = img.src = srcElement.src();

            // Make sure the load event fires for cached images too
            // See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
            if (img.complete || img.complete === undefined) {
                img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                img.src = src;
            }

            this.loading = $.Deferred();
        },

        renderTo: function(ctx) {
            if (this.loading.state() === "resolved") {
                ctx.save();

                this.setTransform(ctx);
                this.setClip(ctx);

                this.drawImage(ctx);

                ctx.restore();
            }
        },

        optionsChange: function(e) {
            if (e.field === "src") {
                this.loading = $.Deferred();
                this.img.src = this.srcElement.src();
            } else {
                PathNode.fn.optionsChange.call(this, e);
            }
        },

        onLoad: function() {
            this.loading.resolve();
            this.invalidate();
        },

        onError: function() {
            this.loading.reject(new Error(
                "Unable to load image '" + this.img.src +
                "'. Check for connectivity and verify CORS headers."
            ));
        },

        drawImage: function(ctx) {
            var rect = this.srcElement.rect();
            var tl = rect.topLeft();

            ctx.drawImage(
                this.img, tl.x, tl.y, rect.width(), rect.height()
            );
        }
    });

    function exportImage(group, options) {
        var defaults = {
            width: "800px", height: "600px",
            cors: "Anonymous"
        };

        var bbox = group.clippedBBox();
        if (bbox) {
            var origin = bbox.getOrigin();
            var exportRoot = new d.Group();
            exportRoot.transform(g.transform().translate(-origin.x, -origin.y));
            exportRoot.children.push(group);
            group = exportRoot;

            var size = bbox.getSize();
            defaults.width = size.width + "px";
            defaults.height = size.height + "px";
        }

        options = deepExtend(defaults, options);

        var container = $("<div />").css({
            display: "none",
            width: options.width,
            height: options.height
        }).appendTo(document.body);

        var surface = new Surface(container, options);
        surface.draw(group);

        var promise = surface.image();
        promise.always(function() {
            surface.destroy();
            container.remove();
        });

        return promise;
    }

    var nodeMap = {
        Group: GroupNode,
        Text: TextNode,
        Path: PathNode,
        MultiPath: MultiPathNode,
        Circle: CircleNode,
        Arc: ArcNode,
        Image: ImageNode
    };

    // Helpers ================================================================
    function addGradientStops(gradient, stops) {
        var color, stop, idx;

        for (idx = 0; idx < stops.length; idx++) {
            stop = stops[idx];
            color = kendo.parseColor(stop.color());
            color.a *= stop.opacity();
            gradient.addColorStop(stop.offset(), color.toCssRgba());
        }
    }

    // Exports ================================================================
    kendo.support.canvas = (function() {
        return !!doc.createElement("canvas").getContext;
    })();

    if (kendo.support.canvas) {
        d.SurfaceFactory.current.register("canvas", Surface, 20);
    }

    deepExtend(kendo.drawing, {
        exportImage: exportImage,

        canvas: {
            ArcNode: ArcNode,
            CircleNode: CircleNode,
            GroupNode: GroupNode,
            ImageNode: ImageNode,
            MultiPathNode: MultiPathNode,
            Node: Node,
            PathNode: PathNode,
            RootNode: RootNode,
            Surface: Surface,
            TextNode: TextNode
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
