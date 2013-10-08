kendo_module({
    id: "diagram",
    name: "Diagram",
    category: "diagram",
    depends: ["diagram.svg", "diagram.services", "data", "draganddrop"]
});

(function ($, undefined) {
    // Imports ================================================================
    var kendo = window.kendo,
        diagram = kendo.diagram,
        ui = kendo.ui,
        Widget = ui.Widget,
        Class = kendo.Class,
        proxy = $.proxy,
        deepExtend = kendo.deepExtend,
        HierarchicalDataSource = kendo.data.HierarchicalDataSource,
        Canvas = diagram.Canvas,
        Group = diagram.Group,
        Rectangle = diagram.Rectangle,
        Circle = diagram.Circle,
        CompositeTransform = diagram.CompositeTransform,
        Rect = diagram.Rect,
        Path = diagram.Path,
        Line = diagram.Line,
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
        Utils = diagram.Utils,
        Observable = kendo.Observable,
        Ticker = diagram.Ticker,
        ToBackUnit = diagram.ToBackUnit,
        ToFrontUnit = diagram.ToFrontUnit;

    // Constants ==============================================================
    var NS = ".kendoDiagram",
        BOUNDSCHANGE = "boundsChange",
        CHANGE = "change",
        ERROR = "error",
        Auto = "Auto",
        bindings = {
            text: "dataTextField",
            url: "dataUrlField",
            spriteCssClass: "dataSpriteCssClassField",
            imageUrl: "dataImageUrlField"
        },
        MAXINT = 9007199254740992,
        SELECT = "select",
        ROTATE = "rotate",
        PAN = "pan",
        ZOOM = "zoom",
        DEFAULTWIDTH = 100,
        DEFAULTHEIGHT = 100;

    diagram.DefaultConnectors = [
        {
            name: "Top",
            description: "Top Connector"
        },
        {
            name: "Right",
            description: "Right Connector"
        },
        {
            name: "Bottom",
            description: "Bottom Connector"
        },
        {
            name: "Left",
            Description: "Left Connector"
        },
        {
            name: Auto,
            Description: "Auto Connector",
            position: function (shape) {
                return shape.getPosition("center");
            }
        }
    ];

    var PanAdapter = kendo.Class.extend({
        init: function (panState) {
            this.pan = panState.pan;
            this.diagram = panState.diagram;
        },
        initState: function () {
            this.from = this.diagram.pan();
            this.to = this.pan;
        },
        update: function (tick) {
            this.diagram.pan(new Point(this.from.x + (this.to.x - this.from.x) * tick, this.from.y + (this.to.y - this.from.y) * tick));
        }
    });

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
            hoveredBackground: "#70CAFF",
            cssClass: "connector"
        },
        position: function () {
            if (this.options.position) {
                return this.options.position(this.shape);
            }
            else {
                return this.shape.getPosition(this.options.name);
            }
        }
    });

    var DiagramElement = Observable.extend({
        init: function (options, model) {
            var that = this;
            Observable.fn.init.call(that);
            that.options = deepExtend({}, that.options, options);
            that.isSelected = false;
            that.model = model;
            that.visual = new Group({
                id: that.options.id || kendo.diagram.randomId(),
                cssClass: that.options.cssClass
            });
            that.options.cssClass = undefined; // Clean the class so that is not propagated toward inner elements.
            that._template();
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
            if (Utils.isUndefined(value)) {
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
        serialize: function () {
            // the options json object describes the shape perfectly. So this object can serve as shape serialization.
            return this.options;
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
                    var bounds = this.bounds();
                    if (this.contentVisual && this.contentVisual instanceof TextBlock) {
                        this.contentVisual.options.text = content.toString();
                    }
                    else {
                        this.contentVisual = new TextBlock({
                            text: content.toString(),
                            align: "center middle",
                            x: bounds.x,
                            y: bounds.y,
                            width: bounds.width,
                            height: bounds.height
                        });

                        this.visual.append(this.contentVisual);
                    }
                    this.contentVisual.redraw();
                    this.refresh();
                }
            }

            return this.contentVisual ? this.contentVisual.content() : "";
        },
        _hitTest: function (point) {
            var bounds = this.bounds();
            return this.visible() && bounds.contains(point);
        },
        _template: function () {
            var that = this;
            if (that.options.template && that.model) {
                that.options.content = kendo.template(that.options.template, {paramName: "item"})(that.model);
            }
        }
    });

    var Shape = DiagramElement.extend({
        init: function (options, model) {
            var that = this, connector, i;
            DiagramElement.fn.init.call(that, options, model);
            options = that.options;
            that.connectors = [];
            that.type = options.type;
            that.shapeVisual = Shape.createShapeVisual(that.options);
            that.visual.append(this.shapeVisual);
            that.bounds(new Rect(options.x, options.y, Math.floor(options.width), Math.floor(options.height)));
            var length = options.connectors.length;
            for (i = 0; i < length; i++) {
                connector = new Connector(that, options.connectors[i]);
                that.connectors.push(connector);
            }
            // TODO: Swa added for phase 2; included here already because the GraphAdapter takes it into account
            that.parentContainer = null;
            that.isContainer = false;
            that.isCollapsed = false;
            that.id = that.visual.native.id;
            if (Utils.isDefined(options.content)) {
                that.content(options.content);
            }
        },
        options: {
            type: "Shape",
            cssClass: "k-shape",
            data: "rectangle",
            stroke: "Black",
            strokeWidth: 1,
            strokeThickness: 1,
            strokeDashArray: "none",
            x: 0,
            y: 0,
            minWidth: 20,
            minHeight: 20,
            width: DEFAULTWIDTH,
            height: DEFAULTHEIGHT,
            resizable: true,
            rotatable: true,
            background: "steelblue",
            hoveredBackground: "#70CAFF",
            connectors: diagram.DefaultConnectors
        },
        bounds: function (value) {
            var point, size;
            if (value) {
                this._bounds = value;
                if (this.contentVisual) {
                    this.contentVisual.redraw(this._bounds);
                }
                point = value.topLeft();
                this.options.x = point.x;
                this.options.y = point.y;
                this.options.width = value.width;
                this.options.height = value.height;
                this.visual.position(point);

                this.shapeVisual.redraw({ width: value.width, height: value.height });
                this.refreshConnections();
                if (this.diagram) {
                    this.diagram.trigger(BOUNDSCHANGE, {item: this, bounds: this._bounds.clone()}); // the trigger modifies the arguments internally.
                }
            }
            if (this.contentVisual && !this.contentVisual._measured) {
                this.contentVisual.redraw(this._bounds);
            }
            if (this.options.width === DEFAULTWIDTH && this.options.height === DEFAULTHEIGHT) { // no dimensions, assuming autosize for paths, groups...
                size = this.shapeVisual._measure();
                if (size) {
                    this.bounds(new Rect(this.options.x, this.options.y, size.width, size.height));
                }
            }
            return this._bounds;
        },
        position: function (point) {
            if (point) {
                this.bounds(new Rect(point.x, point.y, this._bounds.width, this._bounds.height));
            }
            else {
                return this._bounds.topLeft();
            }
        },
        copy: function () {
            var options = this.serialize(),
                copyShape = new Shape(options);
            // TODO: Copy the model too?

            return copyShape;
        },
        visualBounds: function () {
            var bounds = this.bounds(),
                tl = bounds.topLeft(),
                br = bounds.bottomRight();
            return Rect.fromPoints(this.diagram.transformPoint(tl), this.diagram.transformPoint(br));
        },
        select: function (value) {
            if (this.isSelected != value) {
                this.isSelected = value;
                if (this.isSelected) {
                    this.adorner = new ResizingAdorner(this, { resizable: this.options.resizable, rotatable: this.options.rotatable, angle: this.rotate().angle });
                    this.diagram._adorn(this.adorner, true);
                    this.diagram._selectedItems.push(this);
                } else {
                    this.diagram._selectedItems.remove(this);
                    this.diagram._adorn(this.adorner, false);
                    this.adorner = undefined;
                }
                this.diagram.trigger(SELECT, {item: this});
            }
        },
        rotate: function (angle, center) {
            var rotate = this.visual.rotate();
            if (angle !== undefined) {
                if (center === undefined) {
                    var b = this.bounds();
                    return this.rotate(angle, new Point(b.width / 2, b.height / 2));
                }

                rotate = this.visual.rotate(angle, center);

                if (this.diagram && this.diagram._connectorsAdorner) {
                    this.diagram._connectorsAdorner.refresh();
                }
                this.refreshConnections();
                this.diagram.trigger(ROTATE, {item: this});
            }

            return rotate;
        },
        connections: function (type) { // in, out, undefined = both
            var result = [], i, j, con, cons, ctr;

            for (i = 0; i < this.connectors.length; i++) {
                ctr = this.connectors[i];
                cons = ctr.connections;
                for (j = 0, cons; j < cons.length; j++) {
                    con = cons[j];
                    if (type == "out") {
                        var source = con.source();
                        if (source.shape && source.shape == this) {
                            result.push(con);
                        }
                    }
                    else if (type == "in") {
                        var target = con.target();
                        if (target.shape && target.shape == this) {
                            result.push(con);
                        }
                    }
                    else {
                        result.push(con);
                    }
                }
            }
            return result;
        },
        _hover: function (value) {
            this.shapeVisual._hover(value);
            this.diagram._showConnectors(this, value);
        },
        refreshConnections: function () {
            $.each(this.connections(), function () {
                this.refresh();
            });
        },
        _hitTest: function (value) {
            if (this.visible()) {
                var bounds = this.bounds(), rotatedPoint,
                    angle = this.rotate().angle;
                if (value.isEmpty && !value.isEmpty()) { // rect selection
                    return Intersect.rects(value, bounds, angle ? 360 - angle : 0);
                }
                else { // point
                    rotatedPoint = value.clone().rotate(bounds.center(), 360 - angle); // cloning is important because rotate modifies the point inline.
                    if (bounds.contains(rotatedPoint)) {
                        return this;
                    }
                    if (this.adorner && this.adorner._hitTest(value)) {
                        return this;
                    }
                }
            }
        },
        getConnector: function (name, point) {
            var i, ctr;
            name = name.toLocaleLowerCase();
            for (i = 0; i < this.connectors.length; i++) {
                ctr = this.connectors[i];
                if (ctr.options.name.toLocaleLowerCase() == name) {
                    return ctr;
                }
            }
            if (point !== undefined) {
                return closestConnector(point, this);
            }
            return this.connectors[0];
        },
        getPosition: function (side) {
            var b = this.bounds(),
                fnName = side[0].toLowerCase() + side.slice(1);
            if (Utils.isFunction(b[fnName])) {
                return this.transformPoint(b[fnName]());
            }
            return b.center();
        },
        transformPoint: function (absolutePoint) {
            var rotate = this.rotate(),
                bounds = this.bounds(),
                tl = bounds.topLeft(),
                result = absolutePoint;

            if (rotate.angle) {
                result.rotate(rotate.center().plus(tl), 360 - rotate.angle);
            }
            return result;
        }
    });

    Shape.createShapeVisual = function (options) {
        var shapeOptions = deepExtend({}, options, { x: 0, y: 0 }),
            visualTemplate = shapeOptions.data; // Shape visual should not have position in its parent group.
        if (Utils.isString(visualTemplate)) {
            switch (shapeOptions.data.toLocaleLowerCase()) {
                case "rectangle":
                    return new Rectangle(shapeOptions);
                case "circle":
                    return new Circle(shapeOptions);
                default:
                    var p = new Path(shapeOptions);
                    return p;
            }
        }
        else if (Utils.isFunction(visualTemplate)) {// custom template
            return visualTemplate(shapeOptions.context);
        }
        return new Rectangle(shapeOptions);
    };

    /**
     * The types of connections.
     */
    var ConnectionType = {

        /**
         * A line segments between the endpoints with the points intermediate.
         */
        Polyline: 0,

        /**
         * A simplified rectangular style which suits the tree layouts.
         */
        Cascading: 1
    };

    /**
     * The visual link between two Shapes through the intermediate of Connectors.
     */
    var Connection = DiagramElement.extend({
        init: function (from, to, options, model) {
            var that = this;
            DiagramElement.fn.init.call(that, options, model);
            that.line = new Line(that.options);
            that.visual.append(that.line);
            that._sourcePoint = that._targetPoint = new Point();
            that.sourcePoint(from);
            that.targetPoint(to);
            that.refresh();
            that.content(that.options.content);
            that.definers = [];
        },
        options: {
            stroke: "gray",
            hoveredStroke: "#70CAFF",
            strokeThickness: 1,
            startCap: "FilledCircle",
            endCap: "ArrowEnd",
            cssClass: "k-connection"
        },

        /**
         * Gets or sets the Point where the source of the connection resides.
         * @param source The source of this connection. Can be a Point, Shape, Connector.
         * @param undoable The target of this connection. Can be a Point, Shape, Connector.
         */
        sourcePoint: function (source, undoable) {
            if (undoable && this.diagram) {
                this.diagram.undoRedoService.addCompositeItem(new kendo.diagram.ConnectionEditUnit(this, source));
            }
            else {
                if (source !== undefined) {
                    this.from = source;
                }
                if (source === null) { // detach
                    if (this.sourceConnector) {
                        this._sourcePoint = this._resolvedSourceConnector.position();
                        this._clearSourceConnector();
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
                        this._clearSourceConnector();
                    }
                    this.refresh();
                }
                else if (source instanceof Shape) {
                    this.sourceConnector = source.getConnector(Auto, this.targetPoint());
                    this.sourceConnector.connections.push(this);
                    this.refresh();
                }
            }
            return this._resolvedSourceConnector ? this._resolvedSourceConnector.position() : this._sourcePoint;
        },

        /**
         * Gets or sets the Point where the target of the connection resides.
         * @param source The source of this connection. Can be a Point, Shape, Connector.
         * @param undoable The target of this connection. Can be a Point, Shape, Connector.
         */
        targetPoint: function (target, undoable) {
            if (undoable && this.diagram) {
                this.diagram.undoRedoService.addCompositeItem(new kendo.diagram.ConnectionEditUnit(this, target));
            }
            else {
                if (target !== undefined) {
                    this.to = target;
                }
                if (target === null) { // detach
                    if (this.targetConnector) {
                        this._targetPoint = this._resolvedTargetConnector.position();
                        this._clearTargetConnector();
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
                        this._clearTargetConnector();
                    }
                    this.refresh();
                }
                else if (target instanceof Shape) {
                    this.targetConnector = target.getConnector(Auto, this.sourcePoint());
                    this.targetConnector.connections.push(this);
                    this.refresh();
                }
            }
            return this._resolvedTargetConnector ? this._resolvedTargetConnector.position() : this._targetPoint;
        },

        /**
         * Returns the source (start, initial, from) Connector if the start is attached to a Shape. If floating, this returns a position.
         */
        source: function () {
            return this.sourceConnector ? this.sourceConnector : this._sourcePoint;
        },

        /**
         * Returns the target (end, final, to, sink) Connector if the end is attached to a Shape. If floating, this returns a position.
         */
        target: function () {
            return this.targetConnector ? this.targetConnector : this._targetPoint;
        },

        /**
         * Selects or unselects this connections.
         * @param value True to select, false to unselect.
         */
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
                this.diagram.trigger(SELECT, {item: this});
                // TODO: Move this to base type.
            }
        },

        /**
         * Gets or sets the bounds of this connection.
         * @param value A Rect object.
         * @remark This is automatically set in the refresh().
         * @returns {Rect}
         */
        bounds: function (value) {
            if (value) {
                this._bounds = value;
            } else {
                return this._bounds;
            }
        },

        /**
         * Gets or sets the collection of *intermediate* points.
         * The 'allPoints()' property will return all the points.
         * The 'definers' property returns the definers of the intermediate points.
         * The 'sourceDefiner' and 'targetDefiner' return the definers of the endpoints.
         * @param value
         */
        points: function (value) {
            if (value) {
                if (value === null) {
                    this.definers = [];
                }
                else {
                    for (var i = 0; i < value.length; i++) {
                        var definition = value[i];
                        if (definition instanceof diagram.Point) {
                            this.definers.push(new diagram.PathDefiner(definition));
                        }
                        else {
                            throw "A Connection point needs to be a Point.";
                        }
                    }
                }
                this.refresh();
            } else {
                var pts = [];
                for (var k = 0; k < this.definers.length; k++) {
                    pts.push(this.definers[k].point);
                }
                return pts;
            }
        },

        /**
         * Gets all the points of this connection. This is the combination of the sourcePoint, the points and the targetPoint.
         * @returns {Array}
         */
        allPoints: function () {
            var pts = [this.sourcePoint()];
            for (var k = 0; k < this.definers.length; k++) {
                pts.push(this.definers[k].point);
            }
            pts.push(this.targetPoint());
            return pts;
        },

        /**
         * Gets or sets the PathDefiner of the sourcePoint.
         * The left part of this definer is always null since it defines the source tangent.
         * @param value
         * @returns {*}
         */
        sourceDefiner: function (value) {
            if (value) {
                if (value instanceof diagram.PathDefiner) {
                    value.left = null;
                    this._sourceDefiner = value;
                    this.sourcePoint(value.point); // refresh implicit here
                }
                else {
                    throw "The sourceDefiner needs to be a PathDefiner.";
                }
            } else {
                if (!this._sourceDefiner) {
                    this._sourceDefiner = new diagram.PathDefiner(this.sourcePoint(), null, null);
                }
                return this._sourceDefiner;
            }
        },

        /**
         * Gets or sets the PathDefiner of the targetPoint.
         * The right part of this definer is always null since it defines the target tangent.
         * @param value
         * @returns {*}
         */
        targetDefiner: function (value) {
            if (value) {
                if (value instanceof diagram.PathDefiner) {
                    value.right = null;
                    this._targetDefiner = value;
                    this.targetPoint(value.point); // refresh implicit here
                }
                else {
                    throw "The sourceDefiner needs to be a PathDefiner.";
                }
            } else {
                if (!this._targetDefiner) {
                    this._targetDefiner = new diagram.PathDefiner(this.targetPoint(), null, null);
                }
                return this._targetDefiner;
            }
        },

        /**
         * Returns whether the given Point or Rect hits this connection.
         * @param value
         * @returns {Connection}
         * @private
         */
        _hitTest: function (value) {
            if (this.visible()) {
                var p = new Point(value.x, value.y), from = this.sourcePoint(), to = this.targetPoint();
                if (value.isEmpty && !value.isEmpty() && value.contains(from) && value.contains(to)) {
                    return this;
                }
                if (p.isOnLine(from, to)) {
                    return this;
                }
            }
        },

        _hover: function (value) {
            this.line.redraw({ stroke: value ? this.options.hoveredStroke : this.options.stroke });
        },

        refresh: function () {
            resolveConnectors(this);
            var globalSourcePoint = this.sourcePoint(), globalSinkPoint = this.targetPoint(),
                boundsTopLeft, localSourcePoint, localSinkPoint, middle;
            this.bounds(Rect.fromPoints(globalSourcePoint, globalSinkPoint));
            boundsTopLeft = this._bounds.topLeft();
            localSourcePoint = globalSourcePoint.minus(boundsTopLeft);
            localSinkPoint = globalSinkPoint.minus(boundsTopLeft);
            if (this.contentVisual) {
                middle = Point.fn.middleOf(localSourcePoint, localSinkPoint);
                this.contentVisual.position(middle);
            }
            this.visual.position(boundsTopLeft);    //global coordinates!
            this.line.redraw({ from: localSourcePoint, to: localSinkPoint });
            if (this.adorner) {
                this.adorner.refresh();
            }
        },
        redraw: function (options) {
            this.options = deepExtend({}, this.options, options);
            this.line.redraw(options);
        },
        copy: function () {
            var options = this.serialize(),
                copy = new Connection(this.from, this.to, options);
            copy.diagram = this.diagram;
            // TODO: Copy the model too?

            return copy;
        },
        _clearSourceConnector: function () {
            this.sourceConnector.connections.remove(this);
            this.sourceConnector = undefined;
            this._resolvedSourceConnector = undefined;
        },
        _clearTargetConnector: function () {
            this.targetConnector.connections.remove(this);
            this.targetConnector = undefined;
            this._resolvedTargetConnector = undefined;
        }
    });

    function resolveConnectors(connection) {
        var minDist = MAXINT,
            sourcePoint, targetPoint,
            source = connection.source(),
            target = connection.target(),
            autoSourceShape, autoTargetShape,
            sourceConnector;
        if (source instanceof Point) {
            sourcePoint = source;
        }
        else if (source instanceof Connector) {
            if (source.options.name === Auto) {
                autoSourceShape = source.shape;
            }
            else {
                connection._resolvedSourceConnector = source;
                sourcePoint = source.position();
            }
        }

        if (target instanceof Point) {
            targetPoint = target;
        }
        else if (target instanceof Connector) {
            if (target.options.name === Auto) {
                autoTargetShape = target.shape;
            }
            else {
                connection._resolvedTargetConnector = target;
                targetPoint = target.position();
            }
        }

        if (sourcePoint) {
            if (autoTargetShape) {
                connection._resolvedTargetConnector = closestConnector(sourcePoint, autoTargetShape);
            }
        } else if (autoSourceShape) {
            if (targetPoint) {
                connection._resolvedSourceConnector = closestConnector(targetPoint, autoSourceShape);
            } else if (autoTargetShape) {
                for (var i = 0; i < autoSourceShape.connectors.length; i++) {
                    sourceConnector = autoSourceShape.connectors[i];
                    if (sourceConnector.options.name !== Auto) {
                        var currentSourcePoint = sourceConnector.position(),
                            currentTargetConnector = closestConnector(currentSourcePoint, autoTargetShape);
                        var dist = Math.round(currentTargetConnector.position().distanceTo(currentSourcePoint)); // rounding prevents some not needed connectors switching.
                        if (dist < minDist) {
                            minDist = dist;
                            connection._resolvedSourceConnector = sourceConnector;
                            connection._resolvedTargetConnector = currentTargetConnector;
                        }
                    }
                }
            }
        }
    }

    function closestConnector(point, shape) {
        var minimumDistance = MAXINT, resCtr, ctrs = shape.connectors;
        for (var i = 0; i < ctrs.length; i++) {
            var ctr = ctrs[i];
            if (ctr.options.name !== Auto) {
                var dist = point.distanceTo(ctr.position());
                if (dist < minimumDistance) {
                    minimumDistance = dist;
                    resCtr = ctr;
                }
            }
        }
        return resCtr;
    }

    function indicesOfItems(group, visuals) {
        var i, indices = [], visual;
        for (i = 0; i < visuals.length; i++) {
            visual = visuals[i];
            for (var j = 0; j < group.children.length; j++) {
                var other = group.children[j];
                if (other == visual.native) {
                    indices.push(j);
                    break;
                }
            }
        }
        return indices;
    }

    var Diagram = Widget.extend({
        init: function (element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            element = that.element; // the hosting element

            that.element.addClass("k-widget k-diagram").attr("role", "diagram");
            that.canvas = new Canvas(element); // the root SVG Canvas
            that._initialize();
            that.element.on("mousemove" + NS, proxy(that._mouseMove, that))
                .on("mouseup" + NS, proxy(that._mouseUp, that))
                .on("dblclick" + NS, proxy(that._doubleClick, that))
                .on("mousedown" + NS, proxy(that._mouseDown, that))
                .mousewheel(proxy(that._wheel, that), { ns: NS })
                .on("keydown" + NS, proxy(that._keydown, that));
            that.selector = new Selector(that);
            // TODO: We may consider using real Clipboard, but is very hacky to do so.
            that._clipboard = [];
            that._drop();
        },
        options: {
            name: "Diagram",
            zoomRate: 1.1,
            dataSource: {},
            dragAndDrop: false,
            template: "",
            dataTextField: null,
            autoBind: true,
            visualTemplate: null,
            tooltip: { enabled: true, format: "{0}" },
            copy: {
                enabled: true,
                offsetX: 20,
                offsetY: 20
            },
            allowDrop: true
        },
        events: [ZOOM, PAN, SELECT, ROTATE, BOUNDSCHANGE],
        destroy: function () {
            var that = this;
            Widget.fn.destroy.call(that);

            if (that.dataSource) {
                that._unbindDataSource();
            }

            that.element.off(NS);
            // TODO: Destroy all the shapes, connections and the tons of other stuff!
            that.canvas.remove(that.mainLayer);
            that.canvas.remove(that.adornerLayer);
            that.canvas.element.removeChild(that.canvas.native);
            that.canvas = undefined;
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
                this.trigger(ZOOM);
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
                this.trigger(PAN);
            }

            return this._pan;
        },
        viewport: function () {
            return this.canvas.bounds();
        },
        transformMainLayer: function () {
            var pan = this._pan,
                zoom = this._zoom;

            var transform = new CompositeTransform(pan.x, pan.y, zoom, zoom);
            transform.render(this.mainLayer.native);
            this._matrix = transform.toMatrix();
        },
        transformPoint: function (p) { // transforms point from main canvas coordinates to non-transformed (origin).
            var result = p;
            if (this._matrix) {
                result = this._matrix.apply(p);
            }
            return result;
        },
        focus: function () {
            var x = window.scrollX, y = window.scrollY;
            this.canvas.focus();
            window.scrollTo(x, y); // prevent the annoying scroll to top of the canvas (div).
        },
        clear: function () {
            this.canvas.clear();
            this._initialize();
        },
        connect: function (source, target, options) {
            var connection = new Connection(source, target, options);
            return this.addConnection(connection);
        },
        connected: function (source, target) {
            for (var i = 0; i < this.connections.length; i++) {
                var c = this.connections[i];
                if (c.from == source && c.to == target) {
                    return true;
                }
            }
            return false;
        },
        addConnection: function (connection, undoable) {
            if (undoable === undefined) {
                undoable = true;
            }
            if (undoable) {
                var unit = new kendo.diagram.AddConnectionUnit(connection, this);
                this.undoRedoService.add(unit);
            }
            else {
                connection.diagram = this;
                this.mainLayer.append(connection.visual);
                this.connections.push(connection);
            }

            return connection;
        },
        addShape: function (point, options) {
            var shape;
            options = deepExtend({undoable: true}, options);

            if (Utils.isUndefined(point)) {
                point = new Point(0, 0);
            }
            if (point instanceof Shape) {
                shape = point;
            }
            else { // consider it a point
                options = deepExtend(options, { x: point.x, y: point.y });
                shape = new Shape(options);
            }
            if (options.undoable) {
                var unit = new kendo.diagram.AddShapeUnit(shape, this);
                this.undoRedoService.add(unit);
            }
            else {
                this.shapes.push(shape);
                shape.diagram = this;
                this.mainLayer.append(shape.visual);
            }
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
        toFront: function (items, undoable) {
            var result = this._getDiagramItems(items), indices;
            if (Utils.isUndefined(undoable) || undoable) {
                indices = indicesOfItems(this.mainLayer.native, result.visuals);
                var unit = new ToFrontUnit(this, items, indices);
                this.undoRedoService.add(unit);
            }
            else {
                this.mainLayer.toFront(result.visuals);
                this._fixOrdering(result, true);
            }
        },
        toBack: function (items, undoable) {
            var result = this._getDiagramItems(items), indices;
            if (Utils.isUndefined(undoable) || undoable) {
                indices = indicesOfItems(this.mainLayer.native, result.visuals);
                var unit = new ToBackUnit(this, items, indices);
                this.undoRedoService.add(unit);
            }
            else {
                this.mainLayer.toBack(result.visuals);
                this._fixOrdering(result, false);
            }
        },
        _toIndex: function (items, indices) {
            var result = this._getDiagramItems(items);
            this.mainLayer.toIndex(result.visuals, indices);
            this._fixOrdering(result, false);
        },
        bringIntoView: function (node, options) { // jQuery|Item|Array|Rect
            var rect, viewport = this.viewport(), align, old, newPan, deltaPan;
            options = deepExtend({animate: false, align: "center middle"}, options);
            if (node instanceof DiagramElement) {
                rect = node.visualBounds();
            }
            else if (Utils.isArray(node)) {
                rect = this.getBoundingBox(node);
            }
            else if (node instanceof Rect) {
                rect = node.clone();
            }
            if (options.align !== "none" || !viewport.contains(rect.center())) {
                if (options.align === "none") {
                    options.align = "center middle";
                }
                old = rect.clone();
                align = new kendo.diagram.RectAlign(viewport);
                align.align(rect, options.align);
                deltaPan = old.topLeft().minus(rect.topLeft());
                newPan = this.pan().minus(deltaPan);
                if (options.animate) {
                    var t = new Ticker();
                    t.addAdapter(new PanAdapter({pan: newPan, diagram: this}));
                    t.play();
                } else {
                    this.pan(newPan);
                }
            }
        },
        getBoundingBox: function (items) {
            var rect, di = this._getDiagramItems(items);
            if (di.shapes.length > 0) {
                rect = di.shapes[0].visualBounds();
                for (var i = 1; i < di.shapes.length; i++) {
                    var item = di.shapes[i];
                    rect = rect.union(item.visualBounds());
                }
            }
            return rect;
        },
        _drop: function () {
            var that = this,
                options = that.options;
            if (options.allowDrop && kendo.ui.DropTarget) {
                this.element.kendoDropTarget({
                    drop: function (e) {
                        var item, pos, dp, normal;
                        if (e.draggable && e.draggable.hint) {
                            item = e.draggable.hint.data("data");
                            pos = e.draggable.hintOffset;
                            dp = that.documentToCanvasPoint(new Point(pos.left, pos.top));
                            normal = that._normalizePointZoom(dp.minus(that.pan()));

                            that.addShape(normal, item);
                        }
                    }
                });
            }
        },
        _fixOrdering: function (result, toFront) {
            var shapePos = toFront ? this.shapes.length - 1 : 0,
                conPos = toFront ? this.connections.length - 1 : 0,
                i, item;
            for (i = 0; i < result.shapes.length; i++) {
                item = result.shapes[i];
                this.shapes.remove(item);
                this.shapes.insert(item, shapePos);
            }
            for (i = 0; i < result.cons.length; i++) {
                item = result.cons[i];
                this.connections.remove(item);
                this.connections.insert(item, conPos);
            }
        },
        _getDiagramItems: function (items) {
            var i, result = {}, args = items;
            result.visuals = [];
            result.shapes = [];
            result.cons = [];
            if (!items) {
                args = this._selectedItems;
            }
            else if (!Utils.isArray(items)) {
                args = [items];
            }
            for (i = 0; i < args.length; i++) {
                var item = args[i];
                if (item instanceof Shape) {
                    result.shapes.push(item);
                    result.visuals.push(item.visual);
                }
                else if (item instanceof Connection) {
                    result.cons.push(item);
                    result.visuals.push(item.visual);
                }
            }
            return result;
        },
        _removeItem: function (item, undoable) {
            item.select(false);
            if (item instanceof Shape) {
                this._removeShape(item, undoable);
            }
            else if (item instanceof Connection) {
                this._removeConnection(item, undoable);
            }
            if (!undoable) {
                this.mainLayer.remove(item.visual);
            }
        },
        _removeShape: function (shape, undoable) {
            var i, connection, connector,
                sources = [], targets = [];
            this.toolService._removeHover();

            if (undoable) {
                this.undoRedoService.addCompositeItem(new DeleteShapeUnit(shape));
            }
            else {
                this.shapes.remove(shape);
            }
            for (i = 0; i < shape.connectors.length; i++) {
                connector = shape.connectors[i];
                for (var j = 0; j < connector.connections.length; j++) {
                    connection = connector.connections[j];
                    if (connection.sourceConnector == connector) {
                        sources.push(connection);
                    } else if (connection.targetConnector == connector) {
                        targets.push(connection);
                    }
                }
            }

            for (i = 0; i < sources.length; i++) {
                sources[i].sourcePoint(null, undoable);
            }
            for (i = 0; i < targets.length; i++) {
                targets[i].targetPoint(null, undoable);
            }
        },
        _removeConnection: function (connection, undoable) {
            if (connection.sourceConnector) {
                connection.sourceConnector.connections.remove(connection);
            }
            if (connection.targetConnector) {
                connection.targetConnector.connections.remove(connection);
            }
            if (undoable) {
                this.undoRedoService.addCompositeItem(new DeleteConnectionUnit(connection));
            }
            else {
                this.connections.remove(connection);
            }
        },
        documentToCanvasPoint: function (dPoint) {
            var containerOffset = this.element.offset();
            return new Point(dPoint.x - containerOffset.left, dPoint.y - containerOffset.top);
        },
        setDataSource: function (dataSource) {
            this.options.dataSource = dataSource;

            this._dataSource();

            if (this.options.autoBind) {
                this.dataSource.fetch();
            }
        },
        _mouseDown: function (e) {
            var p = this._calculatePosition(e);
            if (e.button === 0 && this.toolService.start(p, this._meta(e))) {
                e.preventDefault();
            }
        },
        _copy: function () {
            if (this.options.copy.enabled) {
                this._clipboard.clear();
                this._copyOffset = 1;
                for (var i = 0; i < this._selectedItems.length; i++) {
                    var item = this._selectedItems[i];
                    this._clipboard.push(item);
                }
            }
        },
        _cut: function () {
            if (this.options.copy.enabled) {
                this._clipboard.clear();
                this._copyOffset = 0;
                for (var i = 0; i < this._selectedItems.length; i++) {
                    var item = this._selectedItems[i];
                    this._clipboard.push(item);
                }
                this.remove(this._clipboard);
            }
        },
        _paste: function () {
            var offsetX, offsetY, item, copied;
            if (this._clipboard.length > 0) {
                offsetX = this._copyOffset * this.options.copy.offsetX;
                offsetY = this._copyOffset * this.options.copy.offsetY;
                this.select(false);
                for (var i = 0; i < this._clipboard.length; i++) {
                    item = this._clipboard[i];
                    copied = item.copy();
                    this._addItem(copied);
                    copied.position(new Point(item.options.x + offsetX, item.options.y + offsetY));
                    copied.select(true);
                }
                this._copyOffset += 1;
            }
        },
        _addItem: function (item) {
            if (item instanceof Shape) {
                this.addShape(item);
            }
            else if (item instanceof Connection) {
                this.addConnection(item);
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
            var p = this._calculatePosition(e),
                meta = deepExtend(this._meta(e), { delta: e.data.delta });

            if (this.toolService.wheel(p, meta)) {
                e.preventDefault();
            }
        },
        _meta: function (e) {
            return { ctrlKey: e.ctrlKey, metaKey: e.metaKey, altKey: e.altKey };
        },
        _calculatePosition: function (e) {
            var pointEvent = (e.pageX === undefined ? e.originalEvent : e),
                dPoint = new Point(pointEvent.pageX, pointEvent.pageY),
                offset = this.documentToCanvasPoint(dPoint);

            return this._normalizePointZoom(offset.minus(this.pan()));
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
                id: "main-layer"
            });
            this.dataMap = [];
            this.canvas.append(this.mainLayer);
            this.adornerLayer = new Group({
                id: "adorner-layer"
            });
            this.canvas.append(this.adornerLayer);
            this.undoRedoService = new UndoRedoService();
            this.toolService = new ToolService(this);

            /**
             * The unique identifier of this Diagram
             * @type {string}
             */
            this.id = kendo.diagram.randomId();
            this._accessors();
            this._dataSource();
            if (this.options.autoBind) {
                this.dataSource.fetch();
            }
        },
        _dataSource: function () {
            var that = this,
                options = that.options,
                dataSource = options.dataSource;

            dataSource = Utils.isArray(dataSource) ? { data: dataSource } : dataSource;

            if (!dataSource.fields) {
                dataSource.fields = [
                    { field: "text" },
                    { field: "url" },
                    { field: "spriteCssClass" },
                    { field: "imageUrl" }
                ];
            }
            if (that.dataSource && that._refreshHandler) {
                that._unbindDataSource();
            } else {
                that._refreshHandler = proxy(that.refreshSource, that);
                that._errorHandler = proxy(that._error, that);
            }

            that.dataSource = HierarchicalDataSource.create(dataSource)
                .bind(CHANGE, that._refreshHandler)
                .bind(ERROR, that._errorHandler);
        },
        _unbindDataSource: function () {
            var that = this;

            that.dataSource.unbind(CHANGE, that._refreshHandler).unbind(ERROR, that._errorHandler);
        },
        _error: function () {
            // TODO: Do something?
        },
        _accessors: function () {
            var that = this,
                options = that.options,
                i, field, textField,
                element = that.element;

            for (i in bindings) {
                if (bindings.hasOwnProperty(i)) {
                    field = options[bindings[i]];
                    textField = element.attr(kendo.attr(i + "-field"));

                    if (!field && textField) {
                        field = textField;
                    }

                    if (!field) {
                        field = i;
                    }

                    if (!Utils.isArray(field)) {
                        field = [field];
                    }

                    options[bindings[i]] = field;
                }
            }
        },
        _adorn: function (adorner, isActive) {
            if (isActive !== undefined && adorner) {
                if (isActive) {
                    this._adorners.push(adorner);
                    this.adornerLayer.append(adorner.visual);
                }
                else {
                    this._adorners.remove(adorner);
                    this.adornerLayer.remove(adorner.visual);
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
//            for (i = 0; i < this.shapes.length; i++) { // does nothing.
//                this.shapes[i].refresh();
//            }
            for (i = 0; i < this.connections.length; i++) {
                this.connections[i].refresh();
            }
        },
        findByUid: function (uid) {
            return this.element.find(".k-shape[" + kendo.attr("uid") + "=" + uid + "]");
        },
        refreshSource: function (e) {
            var that = this,
                node = e.node,
                action = e.action,
                items = e.items,
                options = that.options,
                i;

            function addShape(node) {
                var shape = that.dataMap.first(function (item) {
                    return item.uid === node.uid;
                });
                if (shape) {
                    return shape.shape;
                }

                var opt = {
                    data: options.visualTemplate,
                    template: options.template,
                    context: node
                };
                shape = new Shape(opt, node);
                that.addShape(shape);
                that.dataMap.push({uid: node.uid, shape: shape});
                return shape;
            }

            function append(parent, children) {
                for (var i = 0; i < children.length; i++) {
                    var node = children[i],
                        shape = addShape(node),
                        parentShape = addShape(parent);
                    if (parentShape && !that.connected(parentShape, shape)) { // check if connected to not duplicate connections.
                        that.connect(parentShape, shape);
                    }
                }
            }

            if (!e.field) { // field means any field in the data source has changed - like selected, expanded... We don't have to update in that case.
                if (action === "add") {
                    append(node, items);
                } else if (action === "remove") {
                    //Remove
                } else if (action === "itemchange") {
                    if (node) {
                        if (!items.length) {
                            //Update
                        } else {
                            append(node, items);
                        }
                    } else {
                        for (i = 0; i < items.length; i++) {
                            addShape(items[i]); // roots
                        }
                    }
                }

                for (i = 0; i < items.length; i++) {
                    items[i].load();
                }
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

            if (Utils.isUndefined(layoutType)) {
                layoutType = diagram.LayoutTypes.TreeLayout;
            }
            var l;
            switch (layoutType) {
                case diagram.LayoutTypes.TreeLayout:
                    l = new diagram.TreeLayout(this);
                    break;

                case diagram.LayoutTypes.LayeredLayout:
                    l = new diagram.LayeredLayout(this);
                    break;

                case diagram.LayoutTypes.ForceDirectedLayout:
                    l = new diagram.SpringLayout(this);
                    break;
                default:
                    throw "Layout algorithm '" + layoutType + "' is not supported.";
            }
            var initialState = new kendo.diagram.LayoutState(this);
            var finalState = l.layout(options);
            if (finalState) {
                var unit = new kendo.diagram.LayoutUndoUnit(initialState, finalState, options ? options.animate : null);
                this.undoRedoService.add(unit);
            }
            this.isLayouting = false;
        },

        /**
         * Generates a random diagram.
         * @param shapeCount The number of shapes the random diagram should contain.
         * @param maxIncidence The maximum degree the shapes can have.
         * @param isTree Whether the generated diagram should be a tree
         * @param layoutType The optional layout type to apply after the diagram is generated.
         */
        randomDiagram: function (shapeCount, maxIncidence, isTree, randomSize) {
            var g = kendo.diagram.Graph.Utils.createRandomConnectedGraph(shapeCount, maxIncidence, isTree);
            kendo.diagram.Graph.Utils.createDiagramFromGraph(this, g, false, randomSize);
        },

        /**
         * Gets a shape on the basis of its identifier.
         * @param id (string) the identifier of a shape.
         * @returns {Shape}
         */
        getId: function (id) {
            return this.shapes.first(function (s) {
                return s.visual.native.id === id;
            });
        }
    });

    ui.plugin(Diagram);

    kendo.deepExtend(diagram, {
        Shape: Shape,
        Connection: Connection,
        Connector: Connector
    });
})
    (window.kendo.jQuery);