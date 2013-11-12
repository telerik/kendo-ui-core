$(function () {
    var kendo = window.kendo,
        Class = kendo.Class,
        diagram = kendo.diagram;

    var ShapeTool = Class.extend({
        init: function () {
        },
        tryActivate: function () {
            return this.toolService.hoveredItem === undefined;
        },
        start: function (p) {
            var diagram = this.toolService.diagram;
            this.sp = p;
            diagram.select(false);
            diagram.selector.start(p);
        },
        move: function (p) {
            var diagram = this.toolService.diagram;
            diagram.selector.move(p);
        },
        end: function (p, meta) {
            var d = this.toolService.diagram,
                rect = diagram.Rect.fromPoints(this.sp, p);
            d.addShape(rect.topLeft(), {width: rect.width, height: rect.height});
        },
        getCursor: function () {
            return diagram.Cursors.arrow;
        }
    });

    var LinkTool = Class.extend({
        init: function () {
        },
        tryActivate: function () {
            return this.toolService.hoveredItem === undefined;
        },
        start: function (p) {
            var diagram = this.toolService.diagram;
            this.sp = p;
            diagram.select(false);
            diagram.selector.start(p);
        },
        move: function (p) {
            var diagram = this.toolService.diagram;
            diagram.selector.move(p);
        },
        end: function (p, meta) {
            var d = this.toolService.diagram,
                rect = diagram.Rect.fromPoints(this.sp, p);
            d.addShape(rect.topLeft(), {width: rect.width, height: rect.height});
        },
        getCursor: function () {
            return diagram.Cursors.arrow;
        }
    });

    var TextTool = Class.extend({
        init: function () {
        },
        tryActivate: function () {
            return this.toolService.hoveredItem === undefined;
        },
        start: function (p) {
            var diagram = this.toolService.diagram;
            this.sp = p;
            diagram.select(false);
            diagram.selector.start(p);
        },
        move: function (p) {
            var diagram = this.toolService.diagram;
            diagram.selector.move(p);
        },
        end: function (p, meta) {
            var d = this.toolService.diagram,
                rect = diagram.Rect.fromPoints(this.sp, p);
            d.addShape(rect.topLeft(), {width: rect.width, height: rect.height});
        },
        getCursor: function () {
            return diagram.Cursors.arrow;
        }
    });

    kendo.deepExtend(diagram, {
        ShapeTool: ShapeTool,
        LinkTool: LinkTool,
        TextTool: TextTool
    });
})();