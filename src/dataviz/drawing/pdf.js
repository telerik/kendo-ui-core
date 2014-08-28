(function(f, define){
    define([ "./shapes", "./svg", "../../kendo.pdf" ], f);
})(function(){

    var $ = jQuery,
        kendo = window.kendo,
        dataviz = kendo.dataviz,
        PDF = kendo.PDF,
        d = dataviz.drawing,
        g = dataviz.geometry,
        BaseSurface = d.svg.Surface;

    var Surface = BaseSurface.extend({

        type: "pdf",

        init: function(element, options) {
            BaseSurface.prototype.init.apply(this, arguments);

            var self = this;
            var pdf = this._pdf = new PDF();
            this._page = pdf.addPage();
            $("<button>Get PDF</button>")
                .appendTo(element)
                .on("click", function(){
                    self._download();
                });
        },

        draw: function(element) {
            BaseSurface.prototype.draw.apply(this, arguments);

            if (element instanceof d.Path) {
                console.log("d.Path");
            } else if (element instanceof d.MultiPath) {
                console.log("d.MultiPath");
            } else if (element instanceof d.Circle) {
                var g = element.geometry();
                this._page._circle(g.center.x, g.center.y, g.radius);
                this._page._stroke();
            } else if (element instanceof d.Arc) {
                var points = element.geometry().curvePoints();
                this._page._moveTo(points[0].x, points[0].y);
                for (var i = 1; i < points.length; i += 3) {
                    this._page._bezier(
                        points[i + 0].x, points[i + 0].y,
                        points[i + 1].x, points[i + 1].y,
                        points[i + 2].x, points[i + 2].y
                    );
                }
                this._page._stroke();
            } else if (element instanceof d.Text) {
                this._page._save();
                this._page._transform(1, 0, 0, -1, element._position.x, element._position.y);
                this._page._beginText();
                this._page._setFont("./font.ttf", 12);
                this._page._showText(element.content());
                this._page._endText();
                this._page._restore();
            } else if (element instanceof d.Image) {
                console.log("d.Image");
            } else {
                console.log("UNSUPPORTED");
            }
        },

        _download: function() {
            var binary = this._pdf.render();
            var base64 = window.btoa(binary);
            var dataurl = "data:application/pdf;base64," + base64;
            window.open(dataurl);
        }

    });

    d.SurfaceFactory.current.register("pdf", Surface, 100);

    kendo.deepExtend(d, {
        pdf: {
            Surface: Surface
        }
    });

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
