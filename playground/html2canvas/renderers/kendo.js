var drawing = kendo.dataviz.drawing;
var geo = kendo.dataviz.geometry;

function KendoRenderer(width, height) {
    var self = this;
    Renderer.apply(self, arguments);
    self.canvas = new drawing.Group();
    self._state = {
        root: self.canvas
    };
    self._stateStack = [];

    self.ctx = {
        save: function() {
            //console.log("renderer.ctx.save?  wtf encapsulation.");
            self.save();
        },
        restore: function() {
            //console.log("renderer.ctx.restore?  wtf encapsulation.");
            self.restore();
        }
    };
}

KendoRenderer.prototype = Object.create(Renderer.prototype);

function define(name, func) {
    KendoRenderer.prototype[name] = function() {
        //console.log("*** %s", name, arguments);
        try {
            return func.apply(this, arguments);
        } catch(ex) {
            console.error(ex);
            console.log(ex.stack);
        }
    };
    // KendoRenderer.prototype[name] = func;
}

define("save", function(){
    var copy = {};
    for (var i in this._state) {
        if (Object.prototype.hasOwnProperty.call(this._state, i)) {
            copy[i] = this._state[i];
        }
    }
    this._stateStack.push(this._state);
    copy.root = new drawing.Group();
    this.add(copy.root);
    this._state = copy;
});

define("restore", function(){
    this._state = this._stateStack.pop();
});

define("add", function(node) {
    this._state.root.append(node);
    return node;
});

define("rectangle", function(left, top, width, height, color) {
    var path = new drawing.Path({
        fill: {
            color   : color,
            opacity : this._state.opacity
        }
    });
    path.stroke().color = "none";
    path.stroke().opacity = 0;
    path.stroke().width = 0;
    path.moveTo(left, top)
        .lineTo(left + width, top)
        .lineTo(left + width, top + height)
        .lineTo(left, top + height)
        .close();
    this.add(path);
});

define("drawShape", function(shape, color) {
    var path = this.shape(shape);
    this.add(path);
    path.fill(color);
});

define("drawImage", function(imageContainer, sx, sy, sw, sh, dx, dy, dw, dh) {
    var rect = new geo.Rect([ dx, dy ], [ dw, dh ]);
    var image = new drawing.Image(imageContainer.src, rect);
    this.add(image);
});

define("clip", function(shape, callback, context) {
    callback.call(context);
});

define("shape", function(shape) {
    var path = new drawing.Path({ stroke: null });
    shape.forEach(function(p, i){
        var cmd = p.shift();
        if (i == 0) cmd = "move";
        switch (cmd) {
          case "move":
            path.moveTo(p[0], p[1]);
            break;
          case "line":
            path.lineTo(p[0], p[1]);
            break;
          case "bezierCurve":
            path.curveTo([ p[0], p[1] ],
                         [ p[2], p[3] ],
                         [ p[4], p[5] ]);
            break;
        }
    });
    path.close();
    return path;
});

define("font", function(color, style, variant, weight, size, family) {
    this._state.font = {
        color: color,
        style: [ style, variant, weight, size, family ].join(" ")
    };
});

define("fontShadow", function(color, offsetX, offsetY, blur) {
    //console.error("fontShadow", arguments);
    // XXX: shadows not supported
});

define("clearShadow", function() {
    //console.error("clearShadow", arguments);
    // XXX: shadows not supported
});

define("setOpacity", function(o) {
    this._state.opacity = o;
});

define("setTransform", function() {
});

define("setVariable", function(property, value) {
});

define("text", function(str, left, bottom) {
    // XXX: left and bottom can be null!
    if (left != null && bottom != null) {
        str = str.replace(/\r|\n/g, "");
        var text = this.add(new drawing.Text(str, new geo.Point(left, bottom)));
        if (this._state.font) {
            text.options.font = this._state.font.style;
            text.fill(this._state.font.color);
        }
    }
});

define("backgroundRepeatShape", function(imageContainer, backgroundPosition, size, bounds, left, top, width, height, borderData) {
    // XXX: pattern fill support in the drawing API first?
});

define("renderBackgroundGradient", function(gradientImage, bounds) {
    if (gradientImage instanceof LinearGradientContainer) {
        // XXX: gradient support in the drawing API.

        // handling it as an image is wasteful and won't look properly
        // in PDF anyway because we only support JPEG images (no
        // transparency).
        return;

        // make an image for this gradient
        var self = this;
        kendo.PDF.withCanvas(bounds.width, bounds.height, function(ctx, canvas){
            var gradient = ctx.createLinearGradient(
                canvas.width * gradientImage.x0, canvas.height * gradientImage.y0,
                canvas.width * gradientImage.x1, canvas.height * gradientImage.y1
            );
            gradientImage.colorStops.forEach(function(colorStop) {
                gradient.addColorStop(colorStop.stop, colorStop.color);
            });
            ctx.fillStyle = gradient;
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fill();
            var rect = new geo.Rect(
                [ bounds.left, bounds.top ],
                [ bounds.width, bounds.height ]
            );
            var url = canvas.toDataURL("image/png");
            var img = new drawing.Image(url, rect);
            self.add(img);
        });
    }
});

define("resizeImage", function(imageContainer, size) {
});
