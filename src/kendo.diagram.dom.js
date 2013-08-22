kendo_module({
    id: "diagram",
    name: "Diagram",
    category: "diagram",
    depends: ["diagram.svg, diagram.services"]
});

(function ($, undefined) {
    var kendo = window.kendo,
        diagram = kendo.diagram,
        ui = kendo.ui,
        Widget = ui.Widget,
        Class = kendo.Class,
        proxy = $.proxy,
        deepExtend = kendo.deepExtend,
        NS = ".kendoDiagram",
        BOUNDSCHANGE = "boundsChange",
        Canvas = diagram.Canvas,
        Group = diagram.Group,
        Rectangle = diagram.Rectangle,
        Circle = diagram.Circle,
        CompositeTransform = diagram.CompositeTransform,
        Rect = diagram.Rect,
        Path = diagram.Path,
        Line = diagram.Line,
    //AddShapeUnit = diagram.AddShapeUnit,
        DeleteShapeUnit = diagram.DeleteShapeUnit,
        DeleteConnectionUnit = diagram.DeleteConnectionUnit,
        TextBlock = diagram.TextBlock,
        Point = diagram.Point,
        Intersect = diagram.Intersect,
        ConnectionEditAdorner = diagram.ConnectionEditAdorner,
        UndoRedoService = diagram.UndoRedoService,
        ToolService = diagram.ToolService,
        Selector = diagram.Selector,
        ResizingAdorner = diagram.ResizingAdorner,
        ConnectorsAdorner = diagram.ConnectorsAdorner,
        Cursors = diagram.Cursors,
        Observable = kendo.Observable;

    var Connector = Class.extend({
        init: function (shape, options) {
            this.options = deepExtend({}, this.options, options);
            this.connections = [];
            this.shape = shape;
        },
        options: {
            width: 8,
            height: 8,
            background: "Yellow",
            hoveredBackground: "#70CAFF"
        },
        position: function () {
            return this.options.getConnectorPosition(this.shape, this.options.width, this.options.height);
        }
    });

    var DiagramElement = Observable.extend({
        init: function (options) {
            var that = this;
            Observable.fn.init.call(that);
            that.options = deepExtend({}, that.options, options);
        },
        options: {
            background: "Green",
            hoveredBackground: "#70CAFF",
            cursor: Cursors.grip
        },
        _getCursor: function (point) {
            if (this.adorner) {
                return this.adorner._getCursor(point);
            }
            return Cursors.select;
        },
        visible: function (value) {
            if (isUndefined(value)) {
                return this.visual.visible();
            }
            else {
                this.visual.visible(value);
            }
        },
        bounds: function () {
        },
        refresh: function () {
            this.visual.redraw();
        },
        position: function (point) {
            this.options.x = point.x;
            this.options.y = point.y;
            this.visual.position(point);
        },
        toString: function () {
            return this.options.id;
        },
        content: function (content) {
            if (content !== undefined) {
                if (!content) {
                    if (this.contentVisual) {
                        this.visual.remove(this.contentVisual);
                    }
                    this.contentVisual = undefined;
                }
                else {
                    this.contentVisual = new TextBlock(deepExtend({
                        text: content.toString(),
                        align: "center middle"
                    }, this.bounds()));

                    this.visual.append(this.contentVisual);
                    this.contentVisual.redraw();

                    this.refresh();
                }
            }

            return this.contentVisual ? this.contentVisual.content() : "";
        },
        _hitTest: function (point) {
            var bounds = this.bounds();
            return bounds.contains(point);
        }
    });

    var Shape = DiagramElement.extend({
        init: function (options) {
            var that = this, connector, i;
            DiagramElement.fn.init.call(that, options);
            this.isSelected = false;
            this.connectors = [];
            this.type = "Shape";
            var shapeOptions = deepExtend({}, that.options, { x: 0, y: 0 }); // Shape visual should not have position in its parent group.
            if (isUndefined(this.options.data)) {
                this.options.data = "rectangle";
            }
            switch (this.options.data.toLocaleLowerCase()) {
                case "rectangle":
                    this.shapeVisual = new Rectangle(shapeOptions);
                    break;
                case "circle":
                    this.shapeVisual = new Circle(shapeOptions);
                    break;
                default:
                    this.shapeVisual = new Path(shapeOptions);
                    break;
            }

            this.visual = new Group({
                id: that.options.id,
                title: that.options.id ? that.options.id : "Shape"
            });
            this.visual.append(this.shapeVisual);
            this.bounds(new Rect(that.options.x, that.options.y, Math.floor(that.options.width), Math.floor(that.options.height)));
            var length = this.options.connectors.length;
            for (i = 0; i < length; i++) {
                connector = new Connector(this, this.options.connectors[i]);
                this.connectors.push(connector);
            }
            // TODO: Swa added for phase 2; included here already because the GraphAdapter takes it into account
            this.parentContainer = null;
            this.isContainer = false;
            this.isCollapsed = false;
        },
        options: {
            stroke: "gray",
            strokeWidth: 0,
            strokeThickness: 1,
            strokeDashArray: "none",
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            resizable: true,
            background: "steelblue",
            hoveredBackground: "#70CAFF",
            connectors: [{
                name: "Top",
                type: "Data [in]",
                description: "Top Connector",
                getConnectorPosition: function (shape, w, h) {
                    return getShapeConnectorPos(shape, "top").plus(new Point(0, h / 2));
                }
            },
            {
                name: "Right",
                type: "Data [in]",
                description: "Right Connector",
                getConnectorPosition: function (shape, w, h) {
                    return getShapeConnectorPos(shape, "right").minus(new Point(w / 2, 0));
                }
            },
            {
                name: "Bottom",
                type: "Data [out] [array]",
                description: "Bottom Connector",
                getConnectorPosition: function (shape, w, h) {
                    return getShapeConnectorPos(shape, "bottom").minus(new Point(0, h / 2));
                }
            },
            {
                name: "Left",
                type: "Data [in]",
                Description: "Left Connector",
                getConnectorPosition: function (shape, w, h) {
                    return getShapeConnectorPos(shape, "left").plus(new Point(w / 2, 0));
                }
            },
            {
                name: "Auto",
                type: "Auto",
                Description: "Auto Connector",
                getConnectorPosition: function (shape) {
                    return getShapeConnectorPos(shape, "center");
                }
            }]
        },
        events: [BOUNDSCHANGE],
        bounds: function (value) {
            if (value) {
                this._bounds = value;
                if (this.adorner) {
                    this.adorner.updateRectangle(value);
                }
                if (this.contentVisual) {
                    this.contentVisual.redraw(this.bounds());
                }

                this.options.width = this.shapeVisual.options.width = value.width;
                this.options.height = this.shapeVisual.options.height = value.height;
                this.position(value.topLeft());

                this.shapeVisual.redraw({ width: value.width, height: value.height });
                this.refresh();
                this.refreshConnections();
                this.trigger(BOUNDSCHANGE, this._bounds);
            }
            return this._bounds;
        },
        select: function (value) {
            if (this.isSelected != value) {
                this.isSelected = value;
                if (this.isSelected) {
                    this.adorner = new ResizingAdorner(this, { resizable: this.options.resizable, angle: this.rotate().angle });
                    this.diagram._adorn(this.adorner, true);
                    this.diagram._selectedItems.push(this);
                } else {
                    this.diagram._selectedItems.remove(this);
                    this.diagram._adorn(this.adorner, false);
                    this.adorner = undefined;
                }
            }
        },
        rotate: function (angle, center) {
            if (angle !== undefined) {
                if (center === undefined) {
                    var b = this.bounds();
                    return this.rotate(angle, new Point(b.width / 2, b.height / 2));
                }

                this.visual.rotate(angle, center);

                if (this.adorner) {
                    this.adorner.options.angle = angle;
                    this.adorner.refresh();
                }
                this.refreshConnections();
            }

            return this.visual.rotate();
        },
        connections: function () {
            var cons = [], i, j, con;
            for (i = 0; i < this.connectors.length; i++) {
                for (j = 0, con = this.connectors[i].connections; j < con.length; j++) {
                    cons.push(con[j]);
                }
            }
            return cons;
        },
        _hover: function (value) {
            this.shapeVisual.background(value ? this.options.hoveredBackground : this.options.background);
            this.diagram._showConnectors(this, value);
        },
        refresh: function () {
            var r = this.rotate();
            this.rotate(r.angle, new Point(r.x, r.y));
        },
        refreshConnections: function () {
            $.each(this.connections(), function () {
                this.refresh();
            });
        },
        _hitTest: function (value) {
            var bounds = this.bounds(), rotatedPoint,
                angle = this.rotate().angle;
            if (value.isEmpty && !value.isEmpty()) {
                return Intersect.rects(value, bounds, angle ? 360 - angle : 0);
            }
            rotatedPoint = value.rotate(bounds.center(), 360 - angle);
            if (bounds.contains(rotatedPoint)) {
                return this;
            }
            if (this.adorner && this.adorner._hitTest(value)) {
                return this;
            }
        },
        getConnector: function (name) {
            var i, ctr;
            name = name.toLocaleLowerCase();
            for (i = 0; i < this.connectors.length; i++) {
                ctr = this.connectors[i];
                if (ctr.options.name.toLocaleLowerCase() === name) {
                    return ctr;
                }
            }
        }
    });

    var Connection = DiagramElement.extend({
        init: function (from, to, options) {
            var that = this,
                g = new Group();//the group contains the line and the label
            DiagramElement.fn.init.call(that, options);
            that.line = new Line(that.options);
            g.append(that.line);
            that.visual = g;
            that.sourcePoint(from);
            that.targetPoint(to);
            that.refresh();
        },
        options: {
            stroke: "gray",
            hoveredStroke: "#70CAFF",
            strokeThickness: 1,
            startCap: "FilledCircle",
            endCap: "FilledCircle"
        },
        sourcePoint: function (source) {
            if (source === null) { // detach
                if (this.sourceConnector) {
                    this._sourcePoint = this.sourceConnector.position();
                    this.sourceConnector.connections.remove(this);
                    this.sourceConnector = undefined;
                }
            }
            else if (source instanceof Connector) {
                this.sourceConnector = source;
                this.sourceConnector.connections.push(this);
                this.refresh();
            }
            else if (source instanceof Point) {
                this._sourcePoint = source;
                if (this.sourceConnector) {
                    this.sourceConnector.connections.remove(this);
                    this.sourceConnector = undefined;
                }
                this.refresh();
            }
            else if (source instanceof Shape) {
                this.sourceConnector = source.getConnector("Auto");
                this.sourceConnector.connections.push(this);
                this.refresh();
            }
            return this.sourceConnector ? this.sourceConnector.position() : (this._sourcePoint ? this._sourcePoint : new Point());
        },
        targetPoint: function (target) {
            if (target === null) { // detach
                if (this.targetConnector) {
                    this._targetPoint = this.targetConnector.position();
                    this.targetConnector.connections.remove(this);
                    this.targetConnector = undefined;
                }
            }
            else if (target instanceof Connector) {
                this.targetConnector = target;
                this.targetConnector.connections.push(this);
                this.refresh();
            }
            else if (target instanceof Point) {
                this._targetPoint = target;
                if (this.targetConnector) {
                    this.targetConnector.connections.remove(this);
                    this.targetConnector = undefined;
                }
                this.refresh();
            }
            else if (target instanceof Shape) {
                this.targetConnector = target.getConnector("Auto");
                this.targetConnector.connections.push(this);
                this.refresh();
            }
            return this.targetConnector ? this.targetConnector.position() : (this._targetPoint ? this._targetPoint : new Point());
        },
        select: function (value) {
            if (this.isSelected !== value) {
                this.isSelected = value;
                if (this.isSelected) {
                    this.adorner = new ConnectionEditAdorner(this);
                    this.diagram._adorn(this.adorner, true);
                    this.diagram._selectedItems.push(this);
                } else {
                    if (this.adorner) {
                        this.diagram._adorn(this.adorner, false);
                        this.diagram._selectedItems.remove(this);
                        this.adorner = undefined;
                    }
                }
                this.refresh();
            }
        },
        bounds: function (value) {
            if (value) {
                this._bounds = value;
            } else {
                return this._bounds;
            }
        },
        _hitTest: function (value) {
            var p = new Point(value.x, value.y), from = this.sourcePoint(), to = this.targetPoint();
            if (value.isEmpty && !value.isEmpty()) {
                return value.contains(from) && value.contains(to);
            }
            if (p.isOnLine(from, to)) {
                return true;
            }
        },
        _hover: function (value) {
            this.line.redraw({ stroke: value ? this.options.hoveredStroke : this.options.stroke });
        },
        refresh: function () {
            var globalSourcePoint = this.sourcePoint(), globalSinkPoint = this.targetPoint(),
                boundsTopLeft, localSourcePoint, localSinkPoint, middle;
            this.bounds(Rect.fn.fromPoints(globalSourcePoint, globalSinkPoint));
            boundsTopLeft = this._bounds.topLeft();
            localSourcePoint = globalSourcePoint.minus(boundsTopLeft);
            localSinkPoint = globalSinkPoint.minus(boundsTopLeft);
            if (this.contentVisual) {
                middle = Point.fn.middleOf(localSourcePoint, localSinkPoint);
                this.contentVisual.position(middle);
            }
            this.visual.position(boundsTopLeft);	//global coordinates!
            this.line.redraw({ from: localSourcePoint, to: localSinkPoint });
            if (this.adorner) {
                this.adorner.refresh();
            }
        }
    });

    function getShapeConnectorPos(shape, side) {
        var rotate = shape.rotate();
        var bounds = shape.bounds();
        var point = bounds[side.toLowerCase()]();
        if (rotate.angle) {
            point = point.rotate(rotate.center().plus(bounds.topLeft()), 360 - rotate.angle);
        }

        return point;
    }

    var Diagram = Widget.extend({
        init: function (element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            that.element = element; // the hosting element
            that.canvas = new Canvas(that.element); // the root SVG Canvas
            that._initialize();
            $(element).on("mousemove" + NS, proxy(that._mouseMove, that))
                .on("mouseup" + NS, proxy(that._mouseUp, that))
                .on("dblclick" + NS, proxy(that._doubleClick, that))
                .on("mousedown" + NS, proxy(that._mouseDown, that))
                .mousewheel(proxy(that._wheel, that), { ns: NS })
                .on("keydown" + NS, proxy(that._keydown, that));
            that.selector = new Selector(that);
        },
        options: {
            name: "Diagram",
            zoomRate: 1.1
        },
        zoom: function (zoom, staticPoint) {
            if (zoom) {
                var currentZoom = this._zoom;
                zoom = this._zoom = this.getValidZoom(zoom);

                if (staticPoint !== undefined) {
                    var zoomRatio = zoom / currentZoom;

                    var diagramStaticPoint = staticPoint.minus(this._pan);
                    var zoomedStaticPoint = diagramStaticPoint.times(zoomRatio);
                    this._pan = staticPoint.minus(zoomedStaticPoint);
                }

                this.transformMainLayer();

                this.trigger("zoom");
            }
            return this._zoom;
        },
        getValidZoom: function (zoom) {
            return Math.min(Math.max(zoom, 0.55), 2.0); //around 0.5 something exponential happens...!?
        },
        pan: function (pan) {
            if (pan instanceof Point && !pan.equals(this._pan)) {
                this._pan = pan;
                this.transformMainLayer();
            }

            return this._pan;
        },
        transformMainLayer: function () {
            var pan = this._pan,
                zoom = this._zoom;

            var transform = new CompositeTransform(pan.x, pan.y, zoom, zoom);
            transform.render(this.mainLayer.native);
        },
        focus: function () {
            this.canvas.focus();
        },
        clear: function () {
            this.canvas.clear();
            this._initialize();
        },
        connect: function (source, target, options) {
            var connection = new Connection(source, target, options);
            return this.addConnection(connection);
        },
        addConnection: function (connection) {
            connection.diagram = this;
            this.mainLayer.append(connection.visual);
            this.connections.push(connection);
            return connection;
        },
        addShape: function (point, options) {
            var shape;
            if (isUndefined(point)) {
                point = new Point(0, 0);
            }
            if (point instanceof Shape) {
                shape = point;
            }
            else {
                options = deepExtend({}, options, { x: point.x, y: point.y });
                shape = new Shape(options);
            }
            this.shapes.push(shape);
            shape.diagram = this;
            this.mainLayer.append(shape.visual);
            return shape;
        },
        undo: function () {
            this.undoRedoService.undo();
        },
        redo: function () {
            this.undoRedoService.redo();
        },
        remove: function (items, undoable) {
            if (undoable) {
                this.undoRedoService.begin();
            }
            if (items instanceof Array) {
                items = items.slice(0);
                for (var i = 0; i < items.length; i++) {
                    this._removeItem(items[i], undoable);
                }
            }
            else if (items instanceof Shape || items instanceof Connection) {
                this._removeItem(items, undoable);
            }
            if (undoable) {
                this.undoRedoService.commit();
            }
        },
        select: function (value, options) {
            var i, item, items, rect;
            if (value !== undefined) {
                options = deepExtend({ rect: null }, options);
                rect = options.rect;
                items = this.shapes.concat(this.connections);
                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    if (!rect || item._hitTest(rect)) {
                        item.select(value);
                    }
                }
            }
            else {
                return this._selectedItems; // returns all selected items.
            }
        },
        _removeItem: function (item, undoable) {
            item.select(false);
            if (item instanceof Shape) {
                if (undoable) {
                    this.undoRedoService.addCompositeItem(new DeleteShapeUnit(item));
                }
                else {
                    this.shapes.remove(item);
                }
            }
            else if (item instanceof Connection) {
                if (item.sourceConnector) {
                    item.sourceConnector.connections.remove(item);
                }
                if (item.targetConnector) {
                    item.targetConnector.connections.remove(item);
                }
                if (undoable) {
                    this.undoRedoService.addCompositeItem(new DeleteConnectionUnit(item));
                }
                else {
                    this.connections.remove(item);
                }
            }
            if (!undoable) {
                this.mainLayer.remove(item.visual);
            }
        },
        documentToCanvasPoint: function (dPoint) {
            var containerOffset = $(this.element).offset();
            return new Point(dPoint.x - containerOffset.left, dPoint.y - containerOffset.top);
        },
        _mouseDown: function (e) {
            var p = this._calculatePosition(e);
            if (e.button === 0 && this.toolService.start(p, this._meta(e))) {
                e.preventDefault();
            }
        },
        _mouseUp: function (e) {
            var p = this._calculatePosition(e);
            if (e.button === 0 && this.toolService.end(p, this._meta(e))) {
                e.preventDefault();
            }
        },
        _mouseMove: function (e) {
            var p = this._calculatePosition(e);
            if (e.button === 0 && this.toolService.move(p, this._meta(e))) {
                e.preventDefault();
            }
        },
        _doubleClick: function (e) {
            var p = this._calculatePosition(e);
            if (e.button === 0 && this.toolService.doubleClick(p, this._meta(e))) {
                e.preventDefault();
            }
        },
        _keydown: function (e) {
            if (this.toolService.keyDown(e.keyCode, this._meta(e))) {
                e.preventDefault();
            }
        },
        _wheel: function (e) {
            var pointEvent = (e.pageX === undefined ? e.originalEvent : e),
                p = this.documentToCanvasPoint(new Point(pointEvent.pageX, pointEvent.pageY)),
                meta = deepExtend(this._meta(e), { delta: e.data.delta });

            if (this.toolService.wheel(p, meta)) {
                e.preventDefault();
            }
        },
        _meta: function (e) {
            return { ctrlKey: e.ctrlKey, metaKey: e.metaKey, altKey: e.altKey };
        },
        _calculatePosition: function (e) {
            var pan = this.pan();
            var localPosition = $(this.element).offset();
            var p = new Point(e.pageX - localPosition.left - pan.x, e.pageY - localPosition.top - pan.y);
            return this._normalizePointZoom(p);
        },
        _normalizePointZoom: function (point) {
            return point.times(1 / this.zoom());
        },
        _initialize: function () {
            this._zoom = 1.0;
            this._pan = new Point();
            this.shapes = [];
            this._selectedItems = [];
            this.connections = [];
            this._adorners = [];
            this.mainLayer = new Group({
                id: "mainLayer"
            });
            this.canvas.append(this.mainLayer);
            this.undoRedoService = new UndoRedoService();
            this.toolService = new ToolService(this);

            /**
             * The unique identifier of this Diagram
             * @type {string}
             */
            this.id = kendo.diagram.randomId();
        },
        _adorn: function (adorner, isActive) {
            if (isActive !== undefined) {
                if (isActive) {
                    this._adorners.push(adorner);
                    this.mainLayer.append(adorner.visual);
                }
                else {
                    this._adorners.remove(adorner);
                    this.mainLayer.remove(adorner.visual);
                }
            }
        },
        _showConnectors: function (shape, value) {
            if (value) {
                this._connectorsAdorner = new ConnectorsAdorner(shape);
            }
            this._adorn(this._connectorsAdorner, value);
        },
        refresh: function () {
            var i;
            for (i = 0; i < this.shapes.length; i++) {
                this.shapes[i].refresh();
            }
            for (i = 0; i < this.connections.length; i++) {
                this.connections[i].refresh();
            }
        },

        /**
         * Performs a diagram layout of the given type.
         * @param layoutType The layout algorithm to be applied (TreeLayout, LayeredLayout, SpringLayout).
         * @param options Layout-specific options.
         */
        layout: function (layoutType, options) {

            this.isLayouting = true;
            // TODO: raise layout event?

            if (isUndefined(layoutType)) {
                layoutType = diagram.LayoutTypes.TreeLayout;
            }
            var l;
            switch (layoutType) {
                case diagram.LayoutTypes.TreeLayout:
                    l = new diagram.TreeLayout(this);
                    break;

                    /*  case diagram.LayoutTypes.LayeredLayout:
                     l = new diagram.LayeredLayout(this);
                     break;*/

                case diagram.LayoutTypes.ForceDirectedLayout:
                    l = new diagram.SpringLayout(this);
                    break;
                default:
                    throw "Layout algorithm '" + layoutType + "' is not supported.";
            }
            l.layout(options);

            this.isLayouting = false;
        },

        /**
         * Generates a random diagram.
         * @param shapeCount The number of shapes the random diagram should contain.
         * @param maxIncidence The maximum degree the shapes can have.
         * @param isTree Whether the generated diagram should be a tree
         * @param layoutType The optional layout type to apply after the diagram is generated.
         */
        randomDiagram: function (shapeCount, maxIncidence, isTree) {
            var g = kendo.diagram.Graph.Utils.createRandomConnectedGraph(shapeCount, maxIncidence, isTree);
            kendo.diagram.Graph.Utils.createDiagramFromGraph(this, g, false);
        },


        /**
         * Gets a shape on the basis of its identifier.
         * @param id (string) the identifier of a shape.
         * @returns {Shape}
         */
        getId: function (id) {
            return this.shapes.first(function (s) {
                return s.shapeVisual.native.id == id;
            })
        }

    });

    ui.plugin(Diagram);

    kendo.deepExtend(diagram, {
        Shape: Shape,
        Connection: Connection,
        Connector: Connector
    });
})(window.kendo.jQuery);