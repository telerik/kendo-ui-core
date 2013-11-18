(function () {
    var kendo = window.kendo,
        Class = kendo.Class,
        diagram = kendo.diagram;

    var ToolBase = Class.extend({
        init: function () {
        },
        tryActivate: function () {
            return this.toolService.hoveredItem === undefined && this.toolService.hoveredAdorner === undefined;
        },
        start: function (p) {
            var diagram = this.toolService.diagram;
            this.sp = p;
            diagram.select(false);
        },
        move: function (p) {
            var diagram = this.toolService.diagram;
            if (this.sp.distanceTo(p) > 5) {
                this._started = true;
                diagram.selector.start(this.sp);
                diagram.selector.move(p);
            }
        },
        end: function (p) {
            var d = this.toolService.diagram,
                rect;
            if (this._started) {
                rect = diagram.Rect.fromPoints(this.sp, p);
                d.addShape(rect.topLeft(), this.shapeOptions(rect));
                d.selector.end();
                this._started = undefined;
            }
        },
        shapeOptions: function () {
        },
        getCursor: function () {
            return diagram.Cursors.arrow;
        }
    });

    var ShapeTool = ToolBase.extend({
        shapeOptions: function (rect) {
            return {width: rect.width, height: rect.height};
        }
    });

    var LinkTool = ToolBase.extend({
        shapeOptions: function (rect) {
            return {width: rect.width, height: rect.height, fillOpacity: 0.2, content: "link"};
        }
    });

    var TextTool = ToolBase.extend({
        shapeOptions: function (rect) {
            return {width: rect.width, height: rect.height, fillOpacity: 0};
        }
    });

    kendo.deepExtend(diagram, {
        ShapeTool: ShapeTool,
        LinkTool: LinkTool,
        TextTool: TextTool
    });
})();