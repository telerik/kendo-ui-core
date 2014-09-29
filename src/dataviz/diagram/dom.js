(function (f, define) {
    define(["../../kendo.data", "../../kendo.draganddrop", "../../kendo.toolbar", "../../kendo.editable", "../../kendo.window", "../../kendo.dataviz.themes", "../kendo.util",
           "./svg",
           "./services",
           "./layout" ], f);
})(function () {

    (function ($, undefined) {
        // Imports ================================================================
        var dataviz = kendo.dataviz,
            diagram = dataviz.diagram,
            Widget = kendo.ui.Widget,
            Class = kendo.Class,
            proxy = $.proxy,
            deepExtend = kendo.deepExtend,
            HierarchicalDataSource = kendo.data.HierarchicalDataSource,
            Canvas = diagram.Canvas,
            Group = diagram.Group,
            Visual = diagram.Visual,
            Rectangle = diagram.Rectangle,
            Circle = diagram.Circle,
            CompositeTransform = diagram.CompositeTransform,
            Rect = diagram.Rect,
            Path = diagram.Path,
            DeleteShapeUnit = diagram.DeleteShapeUnit,
            DeleteConnectionUnit = diagram.DeleteConnectionUnit,
            TextBlock = diagram.TextBlock,
            Image = diagram.Image,
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
            ToFrontUnit = diagram.ToFrontUnit,
            Dictionary = diagram.Dictionary,
            PolylineRouter = diagram.PolylineRouter,
            CascadingRouter = diagram.CascadingRouter,
            isUndefined = Utils.isUndefined,
            isDefined = Utils.isDefined,
            defined = kendo.util.defined,
            isArray = $.isArray,
            isFunction = kendo.isFunction,
            isString = Utils.isString,
            isPlainObject = $.isPlainObject,

            math = Math;

        // Constants ==============================================================
        var NS = ".kendoDiagram",
            CASCADING = "Cascading",
            POLYLINE = "Polyline",
            ITEMBOUNDSCHANGE = "itemBoundsChange",
            CHANGE = "change",
            CLICK = "click",
            ERROR = "error",
            AUTO = "Auto",
            TOP = "Top",
            RIGHT = "Right",
            LEFT = "Left",
            BOTTOM = "Bottom",
            MAXINT = 9007199254740992,
            SELECT = "select",
            ITEMROTATE = "itemRotate",
            PAN = "pan",
            ZOOM_START = "zoomStart",
            ZOOM_END = "zoomEnd",
            CONNECTION_CSS = "k-connection",
            SHAPE_CSS = "k-shape",
            SINGLE = "single",
            NONE = "none",
            MULTIPLE = "multiple",
            DEFAULT_CANVAS_WIDTH = 600,
            DEFAULT_CANVAS_HEIGHT = 600,
            DEFAULT_SHAPE_TYPE = "rectangle",
            DEFAULT_SHAPE_WIDTH = 100,
            DEFAULT_SHAPE_HEIGHT = 100,
            DEFAULT_SHAPE_MINWIDTH = 20,
            DEFAULT_SHAPE_MINHEIGHT = 20,
            DEFAULT_SHAPE_POSITION = 0,
            DEFAULT_SHAPE_BACKGROUND = "SteelBlue",
            DEFAULT_CONNECTION_BACKGROUND = "Yellow",
            DEFAULT_CONNECTOR_SIZE = 8,
            DEFAULT_HOVER_COLOR = "#70CAFF",
            MAX_VALUE = Number.MAX_VALUE,
            MIN_VALUE = -Number.MAX_VALUE,
            ALL = "all",
            ABSOLUTE = "absolute",
            TRANSFORMED = "transformed",
            ROTATED = "rotated",
            TRANSPARENT = "transparent",
            WIDTH = "width",
            HEIGHT = "height",
            X = "x",
            Y = "y",
            MOUSEWHEEL_NS = "DOMMouseScroll" + NS + " mousewheel" + NS,
            MOBILE_ZOOM_RATE = 0.05,
            MOBILE_PAN_DISTANCE = 5,
            BUTTON_TEMPLATE = '<a class="k-button k-button-icontext #=className#" href="\\#"><span class="#=iconClass# #=imageClass#"></span>#=text#</a>';

        diagram.DefaultConnectors = [{
            name: TOP,
            description: "Top Connector"
        }, {
            name: RIGHT,
            description: "Right Connector"
        }, {
            name: BOTTOM,
            description: "Bottom Connector"
        }, {
            name: LEFT,
            Description: "Left Connector"
        }, {
            name: AUTO,
            Description: "Auto Connector",
            position: function (shape) {
                return shape.getPosition("center");
            }
        }];

        var defaultCommands = {
            cancel: {
                text: "Cancel",
                imageClass: "k-cancel",
                className: "k-diagram-cancel",
                iconClass: "k-icon"
            },
            update: {
                text: "Update",
                imageClass: "k-update",
                className: "k-diagram-update",
                iconClass: "k-icon"
            }
        };

        diagram.shapeDefaults = function(extra) {
            var defaults = {
                type: DEFAULT_SHAPE_TYPE,
                path: "",
                autoSize: true,
                visual: null,
                x: DEFAULT_SHAPE_POSITION,
                y: DEFAULT_SHAPE_POSITION,
                minWidth: DEFAULT_SHAPE_MINWIDTH,
                minHeight: DEFAULT_SHAPE_MINHEIGHT,
                width: DEFAULT_SHAPE_WIDTH,
                height: DEFAULT_SHAPE_HEIGHT,
                hover: {},
                editable: {
                    connect: true
                },
                connectors: diagram.DefaultConnectors,
                rotation: {
                    angle: 0
                }
            };

            Utils.simpleExtend(defaults, extra);

            return defaults;
        };

        function mwDelta(e) {
            var origEvent = e.originalEvent,
                delta = 0;

            if (origEvent.wheelDelta) {
                delta = -origEvent.wheelDelta / 40;
                delta = delta > 0 ? math.ceil(delta) : math.floor(delta);
            } else if (origEvent.detail) {
                delta = origEvent.detail;
            }

            return delta;
        }

        function isAutoConnector(connector) {
            return connector.options.name.toLowerCase() === AUTO.toLowerCase();
        }

        function resolveConnectors(connection) {
            var minDist = MAXINT,
                sourcePoint, targetPoint,
                source = connection.source(),
                target = connection.target(),
                autoSourceShape,
                autoTargetShape,
                sourceConnector,
                preferred = [0, 2, 3, 1, 4],
                k;
            if (source instanceof Point) {
                sourcePoint = source;
            }
            else if (source instanceof Connector) {
                if (isAutoConnector(source)) {
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
                if (isAutoConnector(target)) {
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
                        if (autoSourceShape.connectors.length == 5) // presuming this means the default connectors
                        {
                            // will emphasize the vertical or horizontal direction, which matters when using the cascading router and distances which are equal for multiple connectors.
                            k = preferred[i];
                        }
                        else {
                            k = i;
                        }
                        sourceConnector = autoSourceShape.connectors[k];
                        if (!isAutoConnector(sourceConnector)) {
                            var currentSourcePoint = sourceConnector.position(),
                                currentTargetConnector = closestConnector(currentSourcePoint, autoTargetShape);
                            var dist = math.round(currentTargetConnector.position().distanceTo(currentSourcePoint)); // rounding prevents some not needed connectors switching.
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
                if (!isAutoConnector(ctr)) {
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
            var children = group.drawingContainer().children;
            var length = children.length;
            for (i = 0; i < visuals.length; i++) {
                visual = visuals[i];
                for (var j = 0; j < length; j++) {
                    if (children[j] == visual.drawingContainer()) {
                        indices.push(j);
                        break;
                    }
                }
            }
            return indices;
        }

        function deserializeConnector(diagram, value) {
            var point = Point.parse(value), ctr;
            if (point) {
                return point;
            }
            ctr = Connector.parse(diagram, value);
            if (ctr) {
                return ctr;
            }
        }

        var DiagramElement = Observable.extend({
            init: function (options, dataItem) {
                var that = this;
                Observable.fn.init.call(that);
                that.options = deepExtend({ id: diagram.randomId() }, that.options, options);
                that.isSelected = false;
                that.dataItem = dataItem;
                that.visual = new Group({
                    id: that.options.id,
                    autoSize: that.options.autoSize
                });
                that._template();
            },

            options: {
                hover: {},
                cursor: Cursors.grip,
                content: {
                    align: "center middle",
                    text: ""
                },
                selectable: true,
                serializable: true,
                enable: true
            },
            _getCursor: function (point) {
                if (this.adorner) {
                    return this.adorner._getCursor(point);
                }
                return this.options.cursor;
            },
            visible: function (value) {
                if (isUndefined(value)) {
                    return this.visual.visible();
                } else {
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
                var json = deepExtend({}, {options: this.options});
                if (this.dataItem) {
                    json.dataItem = this.dataItem.toString();
                }
                return json;
            },
            content: function (content) {
                if (content !== undefined) {
                    var options = this.options;
                    var bounds = this.bounds();

                    if (diagram.Utils.isString(content)) {
                        options.content.text = content;
                    } else {
                        deepExtend(options.content, content);
                    }

                    var contentOptions = options.content;
                    var contentVisual = this._contentVisual;

                    if (!contentVisual && contentOptions.text) {
                        this._contentVisual = new TextBlock(contentOptions);
                        this._contentVisual._includeInBBox = false;
                        this.visual.append(this._contentVisual);
                    } else if (contentVisual) {
                        contentVisual.redraw(contentOptions);
                    }
                }

                return this.options.content.text;
            },

            _hitTest: function (point) {
                var bounds = this.bounds();
                return this.visible() && bounds.contains(point) && this.options.enable;
            },
            _template: function () {
                var that = this;
                if (that.options.content.template) {
                    var data = that.dataItem || {},
                        elementTemplate = kendo.template(that.options.content.template, {
                            paramName: "item"
                        });

                    that.options.content.text = elementTemplate(data);
                }
            },
            _canSelect: function () {
                return this.options.selectable !== false;
            }
        });

        var Connector = Class.extend({
            init: function (shape, options) {
                this.options = deepExtend({}, this.options, options);
                this.connections = [];
                this.shape = shape;
            },
            options: {
                width: 7,
                height: 7,
                fill: {
                    color: DEFAULT_CONNECTION_BACKGROUND
                },
                hover: {}
            },
            position: function () {
                if (this.options.position) {
                    return this.options.position(this.shape);
                } else {
                    return this.shape.getPosition(this.options.name);
                }
            },
            toJSON: function () {
                return {
                    shapeId: this.shape.toString(),
                    connector: this.options.name
                };
            }
        });

        Connector.parse = function (diagram, str) {
            var tempStr = str.split(":"),
                id = tempStr[0],
                name = tempStr[1] || AUTO;

            for (var i = 0; i < diagram.shapes.length; i++) {
                var shape = diagram.shapes[i];
                if (shape.options.id == id) {
                    return shape.getConnector(name.trim());
                }
            }
        };

        var Shape = DiagramElement.extend({
            init: function (options, dataItem) {
                var that = this;
                DiagramElement.fn.init.call(that, options, dataItem);
                this.updateOptionsFromModel();
                options = that.options;
                that.connectors = [];
                that.type = options.type;
                that.shapeVisual = Shape.createShapeVisual(that.options);
                that.visual.append(this.shapeVisual);
                that.updateBounds();
                that.content(that.content());

                // TODO: Swa added for phase 2; included here already because the GraphAdapter takes it into account
                that._createConnectors();
                that.parentContainer = null;
                that.isContainer = false;
                that.isCollapsed = false;
                that.id = that.visual.id;

                if (options.hasOwnProperty("layout") && options.layout!==undefined) {
                    // pass the defined shape layout, it overtakes the default resizing
                    that.layout = options.layout.bind(options);
                }
            },

            options: diagram.shapeDefaults(),

            updateOptionsFromModel: function(model) {
                var fields = ["text", "x", "y", "width", "height", "type", "visual"];

                if (model) {
                    this.redraw(filterDataItem(fields, model));
                } else if (this.dataItem) {
                    this.options = deepExtend({},
                        this.options,
                        filterDataItem(fields, this.dataItem)
                    );
                }
            },

            updateModel: function() {
                if (this.diagram) {
                    var bounds = this._bounds;
                    var model = this.diagram.dataSource.getByUid(this.dataItem.uid);
                    this.diagram._shouldRefresh = false;
                    model._set("x", bounds.x);
                    model._set("y", bounds.y);
                    model._set("width", bounds.width);
                    model._set("height", bounds.height);

                    this.diagram._shouldRefresh = true;
                    model.trigger("change");
                }
            },

            updateBounds: function() {
                var bounds = this.visual._measure(true);
                var options = this.options;
                this.bounds(new Rect(options.x, options.y, bounds.width, bounds.height));
                this._rotate();
                this._alignContent();
            },

            content: function(content) {
                if (defined(content)) {
                    DiagramElement.fn.content.call(this, content);
                    this._alignContent();
                    return this;
                } else {
                    return this.options.content.text;
                }
            },

            _alignContent: function() {
                var contentOptions = this.options.content || {};
                var contentVisual = this._contentVisual;
                if (contentVisual && contentOptions.align) {
                    var containerRect = this.visual._measure();
                    var aligner = new diagram.RectAlign(containerRect);
                    var contentBounds = contentVisual.drawingElement.bbox(null);

                    var contentRect = new Rect(0, 0, contentBounds.width(), contentBounds.height());
                    var alignedBounds = aligner.align(contentRect, contentOptions.align);

                    contentVisual.position(alignedBounds.topLeft());
                }
            },

            _createConnectors: function() {
                var options = this.options,
                    length = options.connectors.length,
                    connectorDefaults = options.connectorDefaults,
                    connector, i;

                for (i = 0; i < length; i++) {
                    connector = new Connector(
                        this, deepExtend({},
                            connectorDefaults,
                            options.connectors[i]
                        )
                    );
                    this.connectors.push(connector);
                }
            },

            bounds: function (value) {
                var bounds;

                if (value) {
                    if (isString(value)) {
                        switch (value) {
                            case TRANSFORMED :
                                bounds = this._transformedBounds();
                                break;
                            case ABSOLUTE :
                                bounds = this._transformedBounds();
                                var pan = this.diagram._pan;
                                bounds.x += pan.x;
                                bounds.y += pan.y;
                                break;
                            case ROTATED :
                                bounds = this._rotatedBounds();
                                break;
                            default:
                                bounds = this._bounds;
                        }
                    } else {
                        this._setBounds(value);
                        this.refreshConnections();
                        this._triggerBoundsChange();
                    }
                } else {
                    bounds = this._bounds;
                }

                return bounds;
            },

            _setBounds: function(rect) {
                var options = this.options;
                var topLeft = rect.topLeft();
                var x = options.x = topLeft.x;
                var y = options.y = topLeft.y;
                var width = options.width = math.max(rect.width, options.minWidth);
                var height = options.height = math.max(rect.height, options.minHeight);

                this._bounds = new Rect(x, y, width, height);

                this.visual.redraw({
                    x: x,
                    y: y,
                    width: width,
                    height: height
                });
            },

            position: function (point) {
                if (point) {
                    this.bounds(new Rect(point.x, point.y, this._bounds.width, this._bounds.height));
                } else {
                    return this._bounds.topLeft();
                }
            },
            /**
             * Returns a clone of this shape.
             * @returns {Shape}
             */
            clone: function () {
                var json = this.serialize();
                json.options.id = diagram.randomId();
                var clone = new Shape(json.options);
                clone.diagram = this.diagram;
                /*clone.visual.native.id = clone.id;
                 clone.visual.id = clone.id;
                 clone.options.id = clone.id;*/
                return clone;
            },
            select: function (value) {
                var diagram = this.diagram, selected, deselected;
                if (isUndefined(value)) {
                    value = true;
                }
                if (this._canSelect()) {
                    if (this.isSelected != value) {
                        selected = [];
                        deselected = [];
                        this.isSelected = value;
                        if (this.isSelected) {
                            diagram._selectedItems.push(this);
                            selected.push(this);
                        } else {
                            Utils.remove(diagram._selectedItems, this);
                            deselected.push(this);
                        }
                        if (!diagram._internalSelection) {
                            diagram._selectionChanged(selected, deselected);
                        }
                        return true;
                    }
                }
            },

            rotate: function (angle, center) { // we assume the center is always the center of the shape.
                var rotate = this.visual.rotate();
                if (angle !== undefined) {
                    var b = this.bounds(),
                        sc = new Point(b.width / 2, b.height / 2),
                        deltaAngle,
                        newPosition;

                    if (center) {
                        deltaAngle = angle - rotate.angle;
                        newPosition = b.center().rotate(center, 360 - deltaAngle).minus(sc);
                        this._rotationOffset = this._rotationOffset.plus(newPosition.minus(b.topLeft()));
                        this.position(newPosition);
                    }
                    this.visual.rotate(angle, sc);
                    this.options.rotation.angle = angle;

                    if (this.diagram && this.diagram._connectorsAdorner) {
                        this.diagram._connectorsAdorner.refresh();
                    }
                    this.refreshConnections();
                    if (this.diagram) {
                        this.diagram.trigger(ITEMROTATE, {item: this});
                    }
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
                        } else if (type == "in") {
                            var target = con.target();
                            if (target.shape && target.shape == this) {
                                result.push(con);
                            }
                        } else {
                            result.push(con);
                        }
                    }
                }
                return result;
            },
            refreshConnections: function () {
                $.each(this.connections(), function () {
                    this.refresh();
                });
            },
            /**
             * Gets a connector of this shape either by the connector's supposed name or
             * via a Point in which case the closest connector will be returned.
             * @param nameOrPoint The name of a Connector or a Point.
             * @returns {Connector}
             */
            getConnector: function (nameOrPoint) {
                var i, ctr;
                if (isString(nameOrPoint)) {
                    nameOrPoint = nameOrPoint.toLocaleLowerCase();
                    for (i = 0; i < this.connectors.length; i++) {
                        ctr = this.connectors[i];
                        if (ctr.options.name.toLocaleLowerCase() == nameOrPoint) {
                            return ctr;
                        }
                    }
                } else if (nameOrPoint instanceof Point) {
                    return closestConnector(nameOrPoint, this);
                } else {
                    return this.connectors.length ? this.connectors[0] : null;
                }
            },
            getPosition: function (side) {
                var b = this.bounds(),
                    fnName = side.charAt(0).toLowerCase() + side.slice(1);
                if (isFunction(b[fnName])) {
                    return this._transformPoint(b[fnName]());
                }
                return b.center();
            },

            redraw: function (options) {
                if (options) {
                    var shapeOptions = this.options;
                    var boundsChange;

                    this.shapeVisual.redraw(this._visualOptions(options));

                    if (this._diffNumericOptions(options, [WIDTH, HEIGHT, X, Y])) {
                        this.bounds(new Rect(shapeOptions.x, shapeOptions.y, shapeOptions.width, shapeOptions.height));
                        boundsChange = true;
                    }

                    shapeOptions = deepExtend(shapeOptions, options);

                    if  (options.rotation || boundsChange) {
                        this._rotate();
                    }

                    if (options.content) {
                        this.content(options.content);
                    }
                }
            },

            _diffNumericOptions: diagram.diffNumericOptions,

            _visualOptions: function(options) {
                return {
                    data: options.path,
                    source: options.source,
                    hover: options.hover,
                    fill: options.fill,
                    stroke: options.stroke,
                    startCap: options.startCap,
                    endCap: options.endCap
                };
            },

            _triggerBoundsChange: function () {
                if (this.diagram) {
                    this.diagram.trigger(ITEMBOUNDSCHANGE, {item: this, bounds: this._bounds.clone()}); // the trigger modifies the arguments internally.
                }
            },
            _transformPoint: function (point) {
                var rotate = this.rotate(),
                    bounds = this.bounds(),
                    tl = bounds.topLeft();

                if (rotate.angle) {
                    point.rotate(rotate.center().plus(tl), 360 - rotate.angle);
                }
                return point;
            },
            _transformedBounds: function () {
                var bounds = this.bounds(),
                    tl = bounds.topLeft(),
                    br = bounds.bottomRight();
                return Rect.fromPoints(this.diagram.modelToView(tl), this.diagram.modelToView(br));
            },
            _rotatedBounds: function () {
                var bounds = this.bounds().rotatedBounds(this.rotate().angle),
                    tl = bounds.topLeft(),
                    br = bounds.bottomRight();

                return Rect.fromPoints(tl, br);
            },
            _rotate: function () {
                var rotation = this.options.rotation;
                if (rotation && rotation.angle) {
                    this.rotate(rotation.angle);
                }
                this._rotationOffset = new Point();
            },
            _hover: function (value) {
                var options = this.options,
                    hover = options.hover,
                    stroke = options.stroke,
                    fill = options.fill;

                if (value && isDefined(hover.stroke)) {
                    stroke = deepExtend({}, stroke, hover.stroke);
                }

                if (value && isDefined(hover.fill)) {
                    fill = hover.fill;
                }

                this.shapeVisual.redraw({
                    stroke: stroke,
                    fill: fill
                });
                if (options.editable && options.editable.connect) {
                    this.diagram._showConnectors(this, value);
                }
            },
            _hitTest: function (value) {
                if (this.visible()) {
                    var bounds = this.bounds(), rotatedPoint,
                        angle = this.rotate().angle;

                    if (value.isEmpty && !value.isEmpty()) { // rect selection
                        return Intersect.rects(value, bounds, angle ? angle : 0);
                    } else { // point
                        rotatedPoint = value.clone().rotate(bounds.center(), angle); // cloning is important because rotate modifies the point inline.
                        if (bounds.contains(rotatedPoint)) {
                            return this;
                        }
                    }
                }
            }
        });

        Shape.createShapeVisual = function(options) {
            var diagram = options.diagram;
            delete options.diagram; // avoid stackoverflow and reassign later on again
            var shapeDefaults = deepExtend({}, options, { x: 0, y: 0 }),
                visualTemplate = shapeDefaults.visual, // Shape visual should not have position in its parent group.
                type = shapeDefaults.type;

            function simpleShape(name, shapeDefaults) {
                switch (name.toLocaleLowerCase()) {
                    case "rectangle":
                        return new Rectangle(shapeDefaults);
                    case "circle":
                        return new Circle(shapeDefaults);
                    case "text": // Maybe should be something else.
                        return new TextBlock(shapeDefaults);
                    case "image":
                        return new Image(shapeDefaults);
                    default:
                        var p = new Path(shapeDefaults);
                        return p;
                }
            }

            function pathShape(path, shapeDefaults) {
                shapeDefaults.data = path;

                return new Path(shapeDefaults);
            }

            function functionShape(func, context, shapeDefaults) {
                return func.call(context, shapeDefaults);
            }

            if (isFunction(visualTemplate)) { // custom template
                return functionShape(visualTemplate, this, shapeDefaults);
            } else if (shapeDefaults.path) {
                return pathShape(shapeDefaults.path, shapeDefaults);
            } else if (isString(type)) {
                return simpleShape(shapeDefaults.type.toLocaleLowerCase(), shapeDefaults);
            } else {
                return new Rectangle(shapeDefaults);
            }
        };

        /**
         * The visual link between two Shapes through the intermediate of Connectors.
         */
        var Connection = DiagramElement.extend({
            init: function (from, to, options, dataItem) {
                var that = this;
                DiagramElement.fn.init.call(that, options, dataItem);
                that._router = new PolylineRouter(this);
                that.path = new diagram.Polyline(that.options);
                that.path.fill(TRANSPARENT);
                that.visual.append(that.path);
                that._sourcePoint = that._targetPoint = new Point();
                that.source(from);
                that.target(to);
                that.content(that.options.content);
                that.definers = [];
                if (defined(options) && options.points) {
                    that.points(options.points);
                }
                that.refresh();
            },
            options: {
                hover: {
                    stroke: {}
                },
                startCap: NONE,
                endCap: NONE,
                points: [],
                selectable: true
            },

            /**
             * Gets the Point where the source of the connection resides.
             * If the endpoint in Auto-connector the location of the resolved connector will be returned.
             * If the endpoint is floating the location of the endpoint is returned.
             */
            sourcePoint: function () {
                return this._resolvedSourceConnector ? this._resolvedSourceConnector.position() : this._sourcePoint;
            },

            /**
             * Gets or sets the Point where the source of the connection resides.
             * @param source The source of this connection. Can be a Point, Shape, Connector.
             * @param undoable Whether the change or assignment should be undoable.
             */
            source: function (source, undoable) {
                if (isDefined(source)) {
                    if (undoable && this.diagram) {
                        this.diagram.undoRedoService.addCompositeItem(new diagram.ConnectionEditUnit(this, source));
                    } else {
                        if (source !== undefined) {
                            this.from = source;
                        }
                        if (source === null) { // detach
                            if (this.sourceConnector) {
                                this._sourcePoint = this._resolvedSourceConnector.position();
                                this._clearSourceConnector();
                            }
                        } else if (source instanceof Connector) {
                            this.sourceConnector = source;
                            this.sourceConnector.connections.push(this);
                            this.refresh();
                        } else if (source instanceof Point) {
                            this._sourcePoint = source;
                            if (this.sourceConnector) {
                                this._clearSourceConnector();
                            }
                            this.refresh();
                        } else if (source instanceof Shape) {
                            this.sourceConnector = source.getConnector(AUTO);// source.getConnector(this.targetPoint());
                            this.sourceConnector.connections.push(this);
                            this.refresh();
                        }
                    }
                }
                return this.sourceConnector ? this.sourceConnector : this._sourcePoint;
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
                        this.source(value.point); // refresh implicit here
                    } else {
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
             * Gets  the Point where the target of the connection resides.
             */
            targetPoint: function () {
                return this._resolvedTargetConnector ? this._resolvedTargetConnector.position() : this._targetPoint;
            },
            /**
             * Gets or sets the Point where the target of the connection resides.
             * @param target The target of this connection. Can be a Point, Shape, Connector.
             * @param undoable  Whether the change or assignment should be undoable.
             */
            target: function (target, undoable) {
                if (isDefined(target)) {
                    if (undoable && this.diagram) {
                        this.diagram.undoRedoService.addCompositeItem(new diagram.ConnectionEditUnit(this, target));
                    } else {
                        if (target !== undefined) {
                            this.to = target;
                        }
                        if (target === null) { // detach
                            if (this.targetConnector) {
                                this._targetPoint = this._resolvedTargetConnector.position();
                                this._clearTargetConnector();
                            }
                        } else if (target instanceof Connector) {
                            this.targetConnector = target;
                            this.targetConnector.connections.push(this);
                            this.refresh();
                        } else if (target instanceof Point) {
                            this._targetPoint = target;
                            if (this.targetConnector) {
                                this._clearTargetConnector();
                            }
                            this.refresh();
                        } else if (target instanceof Shape) {
                            this.targetConnector = target.getConnector(AUTO);// target.getConnector(this.sourcePoint());
                            if (this.targetConnector) {
                                this.targetConnector.connections.push(this);
                                this.refresh();
                            }
                        }
                    }
                }
                return this.targetConnector ? this.targetConnector : this._targetPoint;
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
                        this.target(value.point); // refresh implicit here
                    } else {
                        throw "The sourceDefiner needs to be a PathDefiner.";
                    }
                } else {
                    if (!this._targetDefiner) {
                        this._targetDefiner = new diagram.PathDefiner(this.targetPoint(), null, null);
                    }
                    return this._targetDefiner;
                }
            },

            content: function(content) {
                var result = DiagramElement.fn.content.call(this, content);
                if (defined(content)) {
                    this.refresh();
                }

                return result;
            },

            /**
             * Selects or unselects this connections.
             * @param value True to select, false to unselect.
             */
            select: function (value) {
                var diagram = this.diagram, selected, deselected;
                if (this._canSelect()) {
                    if (this.isSelected !== value) {
                        this.isSelected = value;
                        selected = [];
                        deselected = [];
                        if (this.isSelected) {
                            this.adorner = new ConnectionEditAdorner(this, this.options.selection);
                            diagram._adorn(this.adorner, true);
                            diagram._selectedItems.push(this);
                            selected.push(this);
                        } else {
                            if (this.adorner) {
                                diagram._adorn(this.adorner, false);
                                Utils.remove(diagram._selectedItems, this);
                                this.adorner = undefined;
                                deselected.push(this);
                            }
                        }
                        this.refresh();
                        if (!diagram._internalSelection) {
                            diagram._selectionChanged(selected, deselected);
                        }
                        return true;
                    }
                }
            },
            /**
             * Gets or sets the bounds of this connection.
             * @param value A Rect object.
             * @remark This is automatically set in the refresh().
             * @returns {Rect}
             */
            bounds: function (value) {
                if (value && !isString(value)) {
                    this._bounds = value;
                } else {
                    return this._bounds;
                }
            },
            /**
             * Gets or sets the connection type (see ConnectionType enumeration).
             * @param value A ConnectionType value.
             * @returns {ConnectionType}
             */
            type: function (value) {
                if (value) {
                    if (value !== this._type) {
                        this._type = value;
                        switch (value.toLowerCase()) {
                            case CASCADING.toLowerCase():
                                this._router = new CascadingRouter(this);
                                break;
                            case POLYLINE.toLowerCase():
                                this._router = new PolylineRouter(this);
                                break;
                            default:
                                throw "Unsupported connection type.";
                        }
                        this.refresh();
                    }
                } else {
                    return this._type;
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
                    this.definers = [];
                    for (var i = 0; i < value.length; i++) {
                        var definition = value[i];
                        if (definition instanceof diagram.Point) {
                            this.definers.push(new diagram.PathDefiner(definition));
                        } else if (definition.hasOwnProperty("x") && definition.hasOwnProperty("y")) { // e.g. Clipboard does not preserve the Point definition and tunred into an Object
                            this.definers.push(new diagram.PathDefiner(new Point(definition.x, definition.y)));
                        } else {
                            throw "A Connection point needs to be a Point or an object with x and y properties.";
                        }
                    }

                } else {
                    var pts = [];
                    if (isDefined(this.definers)) {
                        for (var k = 0; k < this.definers.length; k++) {
                            pts.push(this.definers[k].point);
                        }
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
                if (this.definers) {
                    for (var k = 0; k < this.definers.length; k++) {
                        pts.push(this.definers[k].point);
                    }
                }
                pts.push(this.targetPoint());
                return pts;
            },
            refresh: function () {
                resolveConnectors(this);
                var globalSourcePoint = this.sourcePoint(), globalSinkPoint = this.targetPoint(),
                    boundsTopLeft, localSourcePoint, localSinkPoint, middle;

                this._refreshPath();

                boundsTopLeft = this._bounds.topLeft();
                localSourcePoint = globalSourcePoint.minus(boundsTopLeft);
                localSinkPoint = globalSinkPoint.minus(boundsTopLeft);
                if (this._contentVisual) {
                    middle = Point.fn.middleOf(localSourcePoint, localSinkPoint);
                    this._contentVisual.position(new Point(middle.x + boundsTopLeft.x, middle.y + boundsTopLeft.y));
                }

                if (this.adorner) {
                    this.adorner.refresh();
                }
            },

            redraw: function (options) {
                if (options) {
                    this.options = deepExtend({}, this.options, options);

                    var points = this.options.points;

                    if (options && options.content) {
                        this.content(options.content);
                    }

                    if (defined(points) && points.length > 0) {
                        this.points(points);
                        this._refreshPath();
                    }
                    this.path.redraw({
                        fill: options.fill,
                        stroke: options.stroke,
                        startCap: options.startCap,
                        endCap: options.endCap
                    });
                }
            },
            /**
             * Returns a clone of this connection.
             * @returns {Connection}
             */
            clone: function () {
                var json = this.serialize(),
                    clone = new Connection(this.from, this.to, json.options);
                clone.diagram = this.diagram;

                return clone;
            },
            /**
             * Returns a serialized connection in json format. Consist of the options and the dataItem.
             * @returns {Connection}
             */
            serialize: function () {
                var from = this.from.toJSON ? this.from.toJSON : this.from.toString(),
                    to = this.to.toJSON ? this.to.toJSON : this.to.toString();

                var json = deepExtend({}, {
                    options: this.options,
                    from: from,
                    to: to
                });
                if (this.dataItem) {
                    json.dataItem = this.dataItem.toString();
                }
                json.options.points = this.points();
                return json;
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
                    if (this._router.hitTest(p)) {
                        return this;
                    }
                }
            },

            _hover: function (value) {
                var color = (this.options.stroke || {}).color;

                if (value && isDefined(this.options.hover.stroke.color)) {
                    color = this.options.hover.stroke.color;
                }

                this.path.redraw({
                    stroke: {
                        color: color
                    }
                });
            },

            _refreshPath: function () {
                if (!defined(this.path)) {
                    return;
                }
                this._drawPath();
                this.bounds(this._router.getBounds());
            },

            _drawPath: function () {
                if (this._router) {
                    this._router.route(); // sets the intermediate points
                }
                var source = this.sourcePoint();
                var target = this.targetPoint();
                var points = this.points();

                this.path.redraw({
                    points: [source].concat(points, [target])
                });
            },

            _clearSourceConnector: function () {
                Utils.remove(this.sourceConnector.connections, this);
                this.sourceConnector = undefined;
                this._resolvedSourceConnector = undefined;
            },
            _clearTargetConnector: function () {
                Utils.remove(this.targetConnector.connections, this);
                this.targetConnector = undefined;
                this._resolvedTargetConnector = undefined;
            }
        });

        var Diagram = Widget.extend({
            init: function (element, userOptions) {
                var that = this;

                kendo.destroy(element);
                Widget.fn.init.call(that, element, userOptions);

                that._initElements();
                that._initTheme();
                that._extendLayoutOptions(that.options);
                that._initShapeDefaults();

                that._initCanvas();

                that.mainLayer = new Group({
                    id: "main-layer"
                });
                that.canvas.append(that.mainLayer);

                that._pan = new Point();
                that._adorners = [];
                that.adornerLayer = new Group({
                    id: "adorner-layer"
                });
                that.canvas.append(that.adornerLayer);

                that._createHandlers();

                that._initialize();
                that._fetchFreshData();
                that._resizingAdorner = new ResizingAdorner(that, { editable: that.options.editable });
                that._connectorsAdorner = new ConnectorsAdorner(that);

                that._adorn(that._resizingAdorner, true);
                that._adorn(that._connectorsAdorner, true);

                that.selector = new Selector(that);
                // TODO: We may consider using real Clipboard API once is supported by the standard.
                that._clipboard = [];

                if (that.options.layout) {
                    that.layout(that.options.layout);
                }
                that.pauseMouseHandlers = false;

                that._createShapes();
                that._createConnections();
                that.zoom(that.options.zoom);

                that.canvas.draw();
                this._shouldRefresh = true;
                this._initMobile();

                this._toolBar = new DiagramToolBar(this, {
                    tools: this.options.shapeDefaults.editable.tools
                });
            },
            options: {
                name: "Diagram",
                theme: "default",
                layout: "",
                zoomRate: 0.1,
                zoom: 1,
                minZoom: 0,
                maxZoom: 2,
                dataSource: {},
                draggable: true,
                template: "",
                autoBind: true,
                editable: {
                    rotate: {},
                    resize: {},
                    text: true
                },
                tooltip: { enabled: true, format: "{0}" },
                copy: {
                    enabled: true,
                    offsetX: 20,
                    offsetY: 20
                },
                snap: {
                    enabled: true,
                    size: 10,
                    angle: 10
                },
                shapeDefaults: diagram.shapeDefaults({ undoable: true }),
                connectionDefaults: {},
                shapes: [],
                connections: []
            },

            events: [ZOOM_END, ZOOM_START, PAN, SELECT, ITEMROTATE, ITEMBOUNDSCHANGE, CHANGE, CLICK],

            _initMobile: function() {
                var options = this.options;
                var that = this;

                this._isMobile = (options.mobile === true && kendo.support.mobileOS) ||
                                    options.mobile === "phone" ||
                                    options.mobile === "tablet";

                if (this._isMobile) {
                    var html = this.wrapper.addClass("k-diagram-mobile").wrap(
                            '<div data-' + kendo.ns + 'role="view" ' +
                            'data-' + kendo.ns + 'init-widgets="false"></div>'
                        )
                        .parent();

                    this.pane = kendo.mobile.ui.Pane.wrap(html);
                    this.view = this.pane.view();
                    this._actionSheetPopupOptions = $(document.documentElement).hasClass("km-root") ? { modal: false } : {
                        align: "bottom center",
                        position: "bottom center",
                        effect: "slideIn:up"
                    };

                    if (options.height) {
                        this.pane.element.parent().css(HEIGHT, options.height);
                    }

                    this._editAnimation = "slide";

                    this.view.bind("show", function() {
                        if (that._isLocked()) {
                            that._updateTablesWidth();
                            that._applyLockedContainersWidth();
                            that._syncLockedContentHeight();
                            that._syncLockedHeaderHeight();
                            that._syncLockedFooterHeight();
                        }
                    });
                }
            },

            edit: function(item) {
                var dataItem = item.dataItem;
                var uid = dataItem.uid;

                this.cancelEdit();

                var that = this,
                    html = '<div ' + kendo.attr("uid") + '="' + dataItem.uid + '" class="k-popup-edit-form' + (this._isMobile ? ' k-mobile-list' : '') + '"><div class="k-edit-form-container">',
                    column,
                    command,
                    fields = [],
                    idx,
                    length,
                    tmpl,
                    updateText,
                    cancelText,
                    tempCommand,
                    attr,
                    editable = that.options.editable,
                    template = editable.template,
                    options = isPlainObject(editable) ? editable.window : {},
                    settings = deepExtend({}, kendo.Template, that.options.templateSettings);

                options = options || {};

                if (template) {
                    if (typeof template === "string") {
                        template = window.unescape(template);
                    }

                    html += (kendo.template(template, settings))(dataItem);
                } else {
                    var modelFields = dataItem.fields;
                    for (var field in modelFields) {
                        html += '<div class="k-edit-label"><label for="' + field + '">' + (field || "") + '</label></div>';
                        if (dataItem.editable && dataItem.editable(field)) {
                            fields.push({ field: field });
                            html += '<div ' + kendo.attr("container-for") + '="' + field + '" class="k-edit-field"></div>';
                        }
                    }
                }

                var container;

                if (!this._isMobile) {
                    html += '<div class="k-edit-buttons k-state-default">';
                    html += this._createButton("update") + this._createButton("cancel");
                    html += '</div></div></div>';

                    container = this._editContainer = $(html)
                    .appendTo(this.wrapper).eq(0)
                    .kendoWindow(deepExtend({
                        modal: true,
                        resizable: false,
                        draggable: true,
                        title: "Edit",
                        visible: false,
                        close: function(e) {
                            if (e.userTriggered) {
                                //The bellow line is required due to: draggable window in IE, change event will be triggered while the window is closing
                                e.sender.element.focus();
                                if (that.trigger("cancel", { container: container, model: dataItem })) {
                                    e.preventDefault();
                                    return;
                                }

                                that.cancelEdit();
                            }
                        }
                    }, options));
                } else {
                    html += "</div></div>";
                    that.editView = that.pane.append(
                        '<div data-' + kendo.ns + 'role="view" data-' + kendo.ns + 'init-widgets="false" class="k-grid-edit-form">'+
                            '<div data-' + kendo.ns + 'role="header" class="k-header">'+
                                that._createButton("update") +
                                (options.title || "Edit") +
                                that._createButton("cancel") +
                            '</div>'+
                            html +
                        '</div>');
                    container = that._editContainer = that.editView.element.find(".k-popup-edit-form");
                }

                that.editable = that._editContainer
                    .kendoEditable({
                        fields: fields,
                        model: dataItem,
                        clearContainer: false,
                        target: that
                    }).data("kendoEditable");

                // TODO: Replace this code with labels and for="ID"
                if (that._isMobile) {
                    container.find("input[type=checkbox],input[type=radio]")
                             .parent(".k-edit-field")
                             .addClass("k-check")
                             .prev(".k-edit-label")
                             .addClass("k-check")
                             .click(function() {
                                 $(this).next().children("input").click();
                             });
                }

                that._openPopUpEditor();

                that.trigger("edit", { container: container, model: dataItem });

                this._attachButtonEvents();
            },

            _attachButtonEvents: function() {
                var container = this.editView ? this.editView.element : this._editContainer;

                if (!this._editCancelClickHandler) {
                    this._editCancelClickHandler = proxy(this._editCancelClick, this);
                }

                container.on(CLICK + NS, "a.k-diagram-cancel", this._editCancelClickHandler);

                if (!this._editUpdateClickHandler) {
                    this._editUpdateClickHandler = proxy(this._editUpdateClick, this);
                }

                container.on(CLICK + NS, "a.k-diagram-update", this._editUpdateClickHandler);
            },

            _editUpdateClick: function(e) {
                e.preventDefault();
                e.stopPropagation();

                this.saveEdit();
            },

            _editCancelClick: function(e) {
                var model = this.editable.options.model;
                var container = this.editView ? this.editView.element : this._editContainer;

                e.preventDefault();
                e.stopPropagation();

                if (this.trigger("cancel", { container: container, model: model })) {
                    return;
                }

                this.cancelEdit();
            },

            _openPopUpEditor: function() {
                if (!this._isMobile) {
                    this._editContainer.data("kendoWindow").center().open();
                } else {
                    this.pane.navigate(this.editView, this._editAnimation);
                }
            },

            saveEdit: function() {
                if (this.editable && this.editable.end() &&
                    !this.trigger("save", { container: this._editContainer, model: this._modelFromContainer() } )) {

                    this.dataSource.sync();
                    this._destroyEditable();
                }
            },

            cancelEdit: function() {
                if (this._editContainer) {
                    this._destroyEditable();

                    this.dataSource.cancelChanges(this._modelFromContainer());
                }
            },

            _modelFromContainer: function() {
                return this.dataSource.getByUid(this._editContainer.attr(kendo.attr("uid")));
            },

            _destroyEditable: function() {
                var that = this;

                var destroy = function() {
                    if (that.editable) {

                        var container = that.editView ? that.editView.element : that._editContainer;

                        if (container) {
                            container.off(CLICK + NS, "a.k-diagram-cancel", that._editCancelClickHandler);
                            container.off(CLICK + NS, "a.k-diagram-update", that._editUpdateClickHandler);
                        }

                        that._detachModelChange();
                        that.editable.destroy();
                        that.editable = null;
                        that._editContainer = null;
                        that._destroyEditView();
                    }
                };

                if (that.editable) {
                    that._editContainer.data("kendoWindow").bind("deactivate", destroy).close();
                }
            },

            _destroyEditView: function() {
                if (this.editView) {
                    this.editView.purge();
                    this.editView = null;
                }
            },

            _attachModelChange: function(model) {
                var that = this;

                that._modelChangeHandler = function(e) {
                    that._modelChange({ field: e.field, model: this });
                };

                model.bind("change", that._modelChangeHandler);
            },

            _detachModelChange: function() {
                var that = this,
                    container = that._editContainer,
                    model = that._modelFromContainer();

                if (model) {
                    model.unbind(CHANGE, that._modelChangeHandler);
                }
            },

            _createButton: function(commandName) {
                return kendo.template(BUTTON_TEMPLATE)(defaultCommands[commandName]);
            },

            _initElements: function() {
                this.wrapper = this.element.empty()
                    .css("position", "relative")
                    .attr("tabindex", 0)
                    .addClass("k-widget k-diagram");

                this.scrollable = $("<div />").appendTo(this.element);
            },

            _initShapeDefaults: function() {
                var options = this.options;
                if (options.editable === false) {
                    deepExtend(options.shapeDefaults, {
                        editable: {
                            connect: false
                        }
                    });
                }
            },

            _initCanvas: function() {
                var canvasContainer = $("<div class='k-layer'></div>").appendTo(this.scrollable)[0];
                var viewPort = this.viewport();
                this.canvas = new Canvas(canvasContainer, {
                    width: viewPort.width || DEFAULT_CANVAS_WIDTH,
                    height: viewPort.height || DEFAULT_CANVAS_HEIGHT
                });
            },

            _createHandlers: function () {
                var that = this;
                var element = that.element;

                element.on(MOUSEWHEEL_NS, proxy(that._wheel, that));
                if (!kendo.support.touch && !kendo.support.mobileOS) {
                    that.toolService = new ToolService(that);
                    element.find(".k-layer")
                        .on("mousemove" + NS, proxy(that._mouseMove, that))
                        .on("mouseup" + NS, proxy(that._mouseUp, that))
                        .on("mousedown" + NS, proxy(that._mouseDown, that))
                        .on("keydown" + NS, proxy(that._keydown, that))
                        .on("mouseover" + NS, proxy(that._mouseover, that))
                        .on("mouseout" + NS, proxy(that._mouseout, that));
                } else {
                    that._userEvents = new kendo.UserEvents(element, {
                        multiTouch: true
                    });

                    that._userEvents.bind(["gesturestart", "gesturechange", "gestureend"], {
                        gesturestart: proxy(that._gestureStart, that),
                        gesturechange: proxy(that._gestureChange, that),
                        gestureend: proxy(that._gestureEnd, that)
                    });
                    that.toolService = new ToolService(that);
                    that.scroller.enable();
                }

                that._resizeHandler = proxy(that.resize, that);
                kendo.onResize(that._resizeHandler);
            },

            _gestureStart: function(e) {
                this.scroller.disable();
                this._gesture = e;
                this._initialCenter = this.documentToModel(new Point(e.center.x, e.center.y));
                this.trigger(ZOOM_START, {
                    point: this._initialCenter,
                    zoom: this.zoom()
                });
            },

            _gestureChange: function(e) {
                var previousGesture = this._gesture;
                var initialCenter = this._initialCenter;
                var center = this.documentToView(new Point(e.center.x, e.center.y));
                var scaleDelta = e.distance / previousGesture.distance;
                var zoom = this._zoom;
                var updateZoom = false;

                if (math.abs(scaleDelta - 1) >= MOBILE_ZOOM_RATE) {
                    this._zoom = zoom = this._getValidZoom(zoom * scaleDelta);
                    this.options.zoom = zoom;
                    this._gesture = e;
                    updateZoom = true;
                }

                var zoomedPoint = initialCenter.times(zoom);
                var pan = center.minus(zoomedPoint);
                if (updateZoom || this._pan.distanceTo(pan) >= MOBILE_PAN_DISTANCE) {
                    this._panTransform(pan);
                }

                e.preventDefault();
            },

            _gestureEnd: function() {
                this.scroller.enable();
                this.trigger(ZOOM_END, {
                    point: this._initialCenter,
                    zoom: this.zoom()
                });
            },

            _resize: function(size) {
                if (this.canvas) {
                    this.canvas.size(size);
                }
            },

            _mouseover: function(e) {
                var node = $(e.target).data("kendoNode");
                if (node && node.srcElement._hover) {
                    node.srcElement._hover(true, node.srcElement);
                }
            },

            _mouseout: function(e) {
                var node = $(e.target).data("kendoNode");
                if (node && node.srcElement._hover) {
                    node.srcElement._hover(false, node.srcElement);
                }
            },

            _initTheme: function() {
                var that = this,
                    themes = dataviz.ui.themes || {},
                    themeName = ((that.options || {}).theme || "").toLowerCase(),
                    themeOptions = (themes[themeName] || {}).diagram;

                that.options = deepExtend({}, themeOptions, that.options);
            },

            _createShapes: function() {
                var that = this,
                    options = that.options,
                    shapes = options.shapes,
                    shape, i;

                for (i = 0; i < shapes.length; i++) {
                    shape = shapes[i];
                    that.addShape(shape);
                }
            },

            _createConnections: function() {
                var diagram = this,
                    options = diagram.options,
                    defaults = options.connectionDefaults,
                    connections = options.connections,
                    conn, source, target, i;

                for(i = 0; i < connections.length; i++) {
                    conn = connections[i];
                    source = diagram._findConnectionShape(conn.from);
                    target = diagram._findConnectionShape(conn.to);

                    diagram.connect(source, target, deepExtend({}, defaults, conn));
                }
            },

            _findConnectionShape: function(options) {
                var diagram = this,
                    shapeId = isString(options) ? options : options.shapeId;

                var shape = diagram.getShapeById(shapeId);

                return shape.getConnector(options.connector || AUTO);
            },

            destroy: function () {
                var that = this;
                Widget.fn.destroy.call(that);

                if (this._userEvents) {
                    this._userEvents.destroy();
                }

                kendo.unbindResize(that._resizeHandler);

                that.clear();
                that.element.off(NS);
                that.canvas.destroy(true);
                that.canvas = undefined;

                that.destroyScroller();
            },
            destroyScroller: function () {
                var scroller = this.scroller;

                if (!scroller) {
                    return;
                }

                scroller.destroy();
                scroller.element.remove();
                this.scroller = null;
            },
            save: function () {
                var json = {}, i;

                json.shapes = [];
                json.connections = [];

                for (i = 0; i < this.shapes.length; i++) {
                    var shape = this.shapes[i];
                    if (shape.options.serializable) {
                        json.shapes.push(shape.options);
                    }
                }

                for (i = 0; i < this.connections.length; i++) {
                    var con = this.connections[i];
                    var conOptions = deepExtend({}, { from: con.from.toJSON(), to: con.to.toJSON() }, con.options);
                    json.connections.push(conOptions);
                }

                return json;
            },

            focus: function() {
                if (!this.element.is(kendo._activeElement())) {
                    var element = this.element,
                        scrollContainer = element[0],
                        containers = [],
                        offsets = [],
                        documentElement = document.documentElement,
                        i;

                    do {
                        scrollContainer = scrollContainer.parentNode;

                        if (scrollContainer.scrollHeight > scrollContainer.clientHeight) {
                            containers.push(scrollContainer);
                            offsets.push(scrollContainer.scrollTop);
                        }
                    } while (scrollContainer != documentElement);

                    element.focus();

                    for (i = 0; i < containers.length; i++) {
                        containers[i].scrollTop = offsets[i];
                    }
                }
            },

            load: function(options) {
                this.clear();

                this.setOptions(options);
                this._createShapes();
                this._createConnections();
            },

            setOptions: function(options) {
                deepExtend(this.options, options);
            },

            clear: function () {
                var that = this;

                that.select(false);
                that.mainLayer.clear();
                that._initialize();
            },
            /**
             * Connects two items.
             * @param source Shape, Connector, Point.
             * @param target Shape, Connector, Point.
             * @param options Connection options that will be passed to the newly created connection.
             * @returns The newly created connection.
             */
            connect: function (source, target, options) {
                var conOptions = deepExtend({}, this.options.connectionDefaults, options),
                    connection = new Connection(source, target, conOptions);
                return this.addConnection(connection);
            },
            /**
             * Determines whether the the two items are connected.
             * @param source Shape, Connector, Point.
             * @param target Shape, Connector, Point.
             * @returns true if the two items are connected.
             */
            connected: function (source, target) {
                for (var i = 0; i < this.connections.length; i++) {
                    var c = this.connections[i];
                    if (c.from == source && c.to == target) {
                        return true;
                    }
                }
                return false;
            },
            /**
             * Adds connection to the diagram.
             * @param connection Connection.
             * @param undoable Boolean.
             * @returns The newly created connection.
             */
            addConnection: function (connection, undoable) {
                if (undoable === undefined) {
                    undoable = true;
                }
                if (undoable) {
                    var unit = new diagram.AddConnectionUnit(connection, this);
                    this.undoRedoService.add(unit);
                } else {
                    connection.diagram = this;
                    this.mainLayer.append(connection.visual);
                    this.connections.push(connection);
                }

                return connection;
            },
            /**
             * Adds shape to the diagram.
             * @param item Shape, Point. If point is passed it will be created new Shape and positioned at that point.
             * @param options. The options to be passed to the newly created Shape.
             * @returns The newly created shape.
             */
            addShape: function (item, options) {
                var shape,
                    shapeDefaults = this.options.shapeDefaults;

                if (item instanceof Shape) {
                    shapeDefaults = deepExtend({}, shapeDefaults, options);
                    item.redraw(options);
                    shape = item;
                } else if (!(item instanceof kendo.Class)) {
                    shapeDefaults = deepExtend({}, shapeDefaults, item || {});
                    shape = new Shape(shapeDefaults);
                } else {
                    return;
                }

                if (shapeDefaults.undoable) {
                    this.undoRedoService.add(new diagram.AddShapeUnit(shape, this));
                } else {
                    this.shapes.push(shape);
                    shape.diagram = this;
                    this.mainLayer.append(shape.visual);
                }

                this.trigger(CHANGE, {
                    added: [shape],
                    removed: []
                });

                shape.redraw();

                // for shapes which have their own internal layout mechanism
                if (shape.hasOwnProperty("layout")) {
                    shape.layout(shape);
                }

                return shape;
            },
            /**
             * Removes items (or single item) from the diagram.
             * @param items DiagramElement, Array of Items.
             * @param undoable.
             */
            remove: function (items, undoable) {
                var isMultiple = isArray(items);

                if (isUndefined(undoable)) {
                    undoable = true;
                }
                if (undoable) {
                    this.undoRedoService.begin();
                }
                if (isMultiple) {
                    items = items.slice(0);
                    for (var i = 0; i < items.length; i++) {
                        this._removeItem(items[i], undoable);
                    }
                } else if (items instanceof Shape || items instanceof Connection) {
                    this._removeItem(items, undoable);
                }
                if (undoable) {
                    this.undoRedoService.commit();
                }

                this.trigger(CHANGE, {
                    added: [],
                    removed: isMultiple ? items : [items]
                });
            },
            /**
             * Executes the next undoable action on top of the undo stack if any.
             */
            undo: function () {
                this.undoRedoService.undo();
            },
            /**
             * Executes the previous undoable action on top of the redo stack if any.
             */
            redo: function () {
                this.undoRedoService.redo();
            },
            /**
             * Selects items on the basis of the given input or returns the current selection if none.
             * @param itemsOrRect DiagramElement, Array of elements, "All", false or Rect. A value 'false' will deselect everything.
             * @param options
             * @returns {Array}
             */
            select: function (item, options) {
                if (isDefined(item)) {
                    options = deepExtend({ addToSelection: false }, options);

                    var addToSelection = options.addToSelection,
                        items = [],
                        selected = [],
                        i, element;

                    if (!addToSelection) {
                        this.deselect();
                    }

                    this._internalSelection = true;

                    if (item instanceof Array) {
                        items = item;
                    } else if (item instanceof DiagramElement) {
                        items = [ item ];
                    }

                    for (i = 0; i < items.length; i++) {
                        element = items[i];
                        if (element.select(true)) {
                            selected.push(element);
                        }
                    }

                    this._selectionChanged(selected, []);

                    this._internalSelection = false;
                } else {
                    return this._selectedItems;
                }
            },

            selectAll: function() {
                this.select(this.shapes.concat(this.connections));
            },

            selectArea: function(rect) {
                var i, items, item;
                this._internalSelection = true;
                var selected = [];
                if (rect instanceof Rect) {
                    items = this.shapes.concat(this.connections);
                    for (i = 0; i < items.length; i++) {
                        item = items[i];
                        if ((!rect || item._hitTest(rect)) && item.options.enable) {
                            if (item.select(true)) {
                                selected.push(item);
                            }
                        }
                    }
                }

                this._selectionChanged(selected, []);
                this._internalSelection = false;
            },

            deselect: function(item) {
                this._internalSelection = true;
                var deselected = [],
                    items = [],
                    element, i;

                if (item instanceof Array) {
                    items = item;
                } else if (item instanceof DiagramElement) {
                    items.push(item);
                } else if (!isDefined(item)) {
                    items = this._selectedItems.slice(0);
                }

                for (i = 0; i < items.length; i++) {
                    element = items[i];
                    if (element.select(false)) {
                        deselected.push(element);
                    }
                }

                this._selectionChanged([], deselected);
                this._internalSelection = false;
            },
            /**
             * Brings to front the passed items.
             * @param items DiagramElement, Array of Items.
             * @param undoable. By default the action is undoable.
             */
            toFront: function (items, undoable) {
                if (!items) {
                    items = this._selectedItems.slice();
                }
                var result = this._getDiagramItems(items), indices;
                if (!defined(undoable) || undoable) {
                    indices = indicesOfItems(this.mainLayer, result.visuals);
                    var unit = new ToFrontUnit(this, items, indices);
                    this.undoRedoService.add(unit);
                } else {
                    this.mainLayer.toFront(result.visuals);
                    this._fixOrdering(result, true);
                }
            },
            /**
             * Sends to back the passed items.
             * @param items DiagramElement, Array of Items.
             * @param undoable. By default the action is undoable.
             */
            toBack: function (items, undoable) {
                if (!items) {
                    items = this._selectedItems.slice();
                }
                var result = this._getDiagramItems(items), indices;
                if (!defined(undoable) || undoable) {
                    indices = indicesOfItems(this.mainLayer, result.visuals);
                    var unit = new ToBackUnit(this, items, indices);
                    this.undoRedoService.add(unit);
                }
                else {
                    this.mainLayer.toBack(result.visuals);
                    this._fixOrdering(result, false);
                }
            },
            /**
             * Bring into view the passed item(s) or rectangle.
             * @param items DiagramElement, Array of Items, Rect.
             * @param options. align - controls the position of the calculated rectangle relative to the viewport.
             * "Center middle" will position the items in the center. animate - controls if the pan should be animated.
             */
            bringIntoView: function (item, options) { // jQuery|Item|Array|Rect
                var viewport = this.viewport();
                var aligner = new diagram.RectAlign(viewport);
                var current, rect, original, newPan;

                if (viewport.width === 0 || viewport.height === 0) {
                    return;
                }

                options = deepExtend({animate: false, align: "center middle"}, options);
                if (options.align == "none") {
                    options.align = "center middle";
                }

                if (item instanceof DiagramElement) {
                    rect = item.bounds(TRANSFORMED);
                } else if (isArray(item)) {
                    rect = this.boundingBox(item);
                } else if (item instanceof Rect) {
                    rect = item.clone();
                }

                original = rect.clone();

                rect.zoom(this._zoom);
                this._storePan(new Point());

                if (rect.width > viewport.width || rect.height > viewport.height) {
                    this._zoom = this._getValidZoom(math.min(viewport.width / original.width, viewport.height / original.height));
                    rect = original.clone().zoom(this._zoom);
                }
                this._zoomMainLayer();

                current = rect.clone();
                aligner.align(rect, options.align);

                newPan = rect.topLeft().minus(current.topLeft());
                this.pan(newPan.times(-1), options.animate);
            },

            alignShapes: function (direction) {
                if (isUndefined(direction)) {
                    direction = "Left";
                }
                var items = this.select(),
                    val,
                    item,
                    i;

                if (items.length === 0) {
                    return;
                }

                switch (direction.toLowerCase()) {
                    case "left":
                    case "top":
                        val = MAX_VALUE;
                        break;
                    case "right":
                    case "bottom":
                        val = MIN_VALUE;
                        break;
                }

                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    if (item instanceof Shape) {
                        switch (direction.toLowerCase()) {
                            case "left":
                                val = math.min(val, item.options.x);
                                break;
                            case "top":
                                val = math.min(val, item.options.y);
                                break;
                            case "right":
                                val = math.max(val, item.options.x);
                                break;
                            case "bottom":
                                val = math.max(val, item.options.y);
                                break;
                        }
                    }
                }
                var undoStates = [];
                var shapes = [];
                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    if (item instanceof Shape) {
                        shapes.push(item);
                        undoStates.push(item.bounds());
                        switch (direction.toLowerCase()) {
                            case "left":
                            case "right":
                                item.position(new Point(val, item.options.y));
                                break;
                            case "top":
                            case "bottom":
                                item.position(new Point(item.options.x, val));
                                break;
                        }
                    }
                }
                var unit = new diagram.TransformUnit(shapes, undoStates);
                this.undoRedoService.add(unit, false);
            },

            zoom: function (zoom, options) {
                if (zoom) {
                    var staticPoint = options ? options.point : new diagram.Point(0, 0);
                    // var meta = options ? options.meta : 0;
                    zoom = this._zoom = this._getValidZoom(zoom);

                    if (!isUndefined(staticPoint)) {//Viewpoint vector is constant
                        staticPoint = new diagram.Point(math.round(staticPoint.x), math.round(staticPoint.y));
                        var zoomedPoint = staticPoint.times(zoom);
                        var viewportVector = this.modelToView(staticPoint);
                        var raw = viewportVector.minus(zoomedPoint);//pan + zoomed point = viewpoint vector
                        this._storePan(new diagram.Point(math.round(raw.x), math.round(raw.y)));
                    }

                    if (options) {
                        options.zoom = zoom;
                    }

                    this._panTransform();

                    this._updateAdorners();
                }

                return this._zoom;
            },

            _getPan: function(pan) {
                var canvas = this.canvas;
                if (!canvas.translate) {
                    pan = pan.plus(this._pan);
                }
                return pan;
            },

            pan: function (pan, animate) {
                if (pan instanceof Point) {
                    var that = this;
                    var scroller = that.scroller;
                    pan = that._getPan(pan);
                    pan = pan.times(-1);

                    if (animate) {
                        scroller.animatedScrollTo(pan.x, pan.y, function() {
                            that._updateAdorners();
                        });
                    } else {
                        scroller.scrollTo(pan.x, pan.y);
                        that._updateAdorners();
                    }
                }
            },

            viewport: function () {
                var element = this.element;

                return new Rect(0, 0, element.width(), element.height());
            },
            copy: function () {
                if (this.options.copy.enabled) {
                    this._clipboard = [];
                    this._copyOffset = 1;
                    for (var i = 0; i < this._selectedItems.length; i++) {
                        var item = this._selectedItems[i];
                        this._clipboard.push(item);
                    }
                }
            },
            cut: function () {
                if (this.options.copy.enabled) {
                    this._clipboard = [];
                    this._copyOffset = 0;
                    for (var i = 0; i < this._selectedItems.length; i++) {
                        var item = this._selectedItems[i];
                        this._clipboard.push(item);
                    }
                    this.remove(this._clipboard);
                }
            },
            paste: function () {
                var offsetX, offsetY, item, copied, connector, shape, i;
                if (this._clipboard.length > 0) {
                    var mapping = new Dictionary();

                    offsetX = this._copyOffset * this.options.copy.offsetX;
                    offsetY = this._copyOffset * this.options.copy.offsetY;
                    this.deselect();
                    // first the shapes
                    for (i = 0; i < this._clipboard.length; i++) {
                        item = this._clipboard[i];
                        if (item instanceof Connection) {
                            continue;
                        }
                        copied = item.clone();
                        mapping.set(item.id, copied.id);
                        this._addItem(copied);
                        copied.position(new Point(item.options.x + offsetX, item.options.y + offsetY));
                        copied.select(true);
                    }
                    // then the connections
                    for (i = 0; i < this._clipboard.length; i++) {
                        item = this._clipboard[i];
                        if (item instanceof Shape) {
                            continue;
                        }
                        copied = item.clone();
                        if (item.source() instanceof Connector) { // if Point then it's a floating end
                            connector = item.source();
                            if (mapping.containsKey(connector.shape.id)) { // occurs when an attached connection is pasted with unselected shape parents
                                shape = this.getShapeById(mapping.get(connector.shape.id));
                                copied.source(shape.getConnector(connector.options.name));
                            } else {
                                copied.source(new Point(item.sourcePoint().x + offsetX, item.sourcePoint().y + offsetY));
                            }
                        }
                        if (item.target() instanceof Connector) {
                            connector = item.target();
                            if (mapping.containsKey(connector.shape.id)) {
                                shape = this.getShapeById(mapping.get(connector.shape.id));
                                copied.target(shape.getConnector(connector.options.name));
                            }
                            else {
                                copied.target(new Point(item.targetPoint().x + offsetX, item.targetPoint().y + offsetY));
                            }
                        }
                        this._addItem(copied);
                        copied.position(new Point(item.options.x + offsetX, item.options.y + offsetY));
                        copied.select(true);
                    }
                    this._copyOffset += 1;
                }
            },
            /**
             * Gets the bounding rectangle of the given items.
             * @param items DiagramElement, Array of elements.
             * @param origin Boolean. Pass 'true' if you need to get the bounding box of the shapes without their rotation offset.
             * @returns {Rect}
             */
            boundingBox: function (items, origin) {
                var rect = Rect.empty(), temp,
                    di = isDefined(items) ? this._getDiagramItems(items) : {shapes: this.shapes};
                if (di.shapes.length > 0) {
                    var item = di.shapes[0];
                    if (origin === true) {
                        rect.x -= item._rotationOffset.x;
                        rect.y -= item._rotationOffset.y;
                    }
                    rect = item.bounds(ROTATED);
                    for (var i = 1; i < di.shapes.length; i++) {
                        item = di.shapes[i];
                        temp = item.bounds(ROTATED);
                        if (origin === true) {
                            temp.x -= item._rotationOffset.x;
                            temp.y -= item._rotationOffset.y;
                        }
                        rect = rect.union(temp);
                    }
                }
                return rect;
            },
            documentToView: function(point) {
                var containerOffset = this.element.offset();

                return new Point(point.x - containerOffset.left, point.y - containerOffset.top);
            },
            viewToDocument: function(point) {
                var containerOffset = this.element.offset();

                return new Point(point.x + containerOffset.left, point.y + containerOffset.top);
            },
            viewToModel: function(point) {
                return this._transformWithMatrix(point, this._matrixInvert);
            },
            modelToView: function(point) {
                return this._transformWithMatrix(point, this._matrix);
            },
            modelToLayer: function(point) {
                return this._transformWithMatrix(point, this._layerMatrix);
            },
            layerToModel: function(point) {
                return this._transformWithMatrix(point, this._layerMatrixInvert);
            },
            documentToModel: function(point) {
                var viewPoint = this.documentToView(point);
                if (!this.canvas.translate) {
                    viewPoint.x = viewPoint.x + this.scroller.scrollLeft;
                    viewPoint.y = viewPoint.y + this.scroller.scrollTop;
                }
                return this.viewToModel(viewPoint);
            },
            modelToDocument: function(point) {
                return this.viewToDocument(this.modelToView(point));
            },
            _transformWithMatrix: function(point, matrix) {
                var result = point;
                if (point instanceof Point) {
                    if (matrix) {
                        result = matrix.apply(point);
                    }
                }
                else {
                    var tl = this._transformWithMatrix(point.topLeft(), matrix),
                        br = this._transformWithMatrix(point.bottomRight(), matrix);
                    result = Rect.fromPoints(tl, br);
                }
                return result;
            },

            setDataSource: function(dataSource) {
                // TODO: should remove this
                this.options.dataSource = dataSource;
                this.fetchFreshData();
            },
            /**
             * Performs a diagram layout of the given type.
             * @param layoutType The layout algorithm to be applied (TreeLayout, LayeredLayout, SpringLayout).
             * @param options Layout-specific options.
             */
            layout: function (options) {
                this.isLayouting = true;
                // TODO: raise layout event?
                var type;
                if(isUndefined(options)) {
                    options = this.options.layout;
                }
                if (isUndefined(options) || isUndefined(options.type)) {
                    type = "Tree";
                }
                else {
                    type = options.type;
                }
                var l;
                switch (type.toLowerCase()) {
                    case "tree":
                        l = new diagram.TreeLayout(this);
                        break;

                    case "layered":
                        l = new diagram.LayeredLayout(this);
                        break;

                    case "forcedirected":
                    case "force":
                    case "spring":
                    case "springembedder":
                        l = new diagram.SpringLayout(this);
                        break;
                    default:
                        throw "Layout algorithm '" + type + "' is not supported.";
                }
                var initialState = new diagram.LayoutState(this);
                var finalState = l.layout(options);
                if (finalState) {
                    var unit = new diagram.LayoutUndoUnit(initialState, finalState, options ? options.animate : null);
                    this.undoRedoService.add(unit);
                }
                this.isLayouting = false;
            },
            /**
             * Gets a shape on the basis of its identifier.
             * @param id (string) the identifier of a shape.
             * @returns {Shape}
             */
            getShapeById: function (id) {
                var found;
                found = Utils.first(this.shapes, function (s) {
                    return s.visual.id === id;
                });
                if (found) {
                    return found;
                }
                found = Utils.first(this.connections, function (c) {
                    return c.visual.id === id;
                });
                return found;
            },

            _extendLayoutOptions: function(options) {
                if(options.layout) {
                    options.layout = deepExtend(diagram.LayoutBase.fn.defaultOptions || {}, options.layout);
                }
            },

            _selectionChanged: function (selected, deselected) {
                if (selected.length || deselected.length) {
                    this.trigger(SELECT, { selected: selected, deselected: deselected });
                }
            },
            _getValidZoom: function (zoom) {
                return math.min(math.max(zoom, this.options.minZoom), this.options.maxZoom);
            },
            _panTransform: function (pos) {
                var diagram = this,
                    pan = pos || diagram._pan;

                if (diagram.canvas.translate) {
                    diagram.scroller.scrollTo(pan.x, pan.y);
                    diagram._zoomMainLayer();
                } else {
                    diagram._storePan(pan);
                    diagram._transformMainLayer();
                }
            },

            _finishPan: function () {
                this.trigger(PAN, {total: this._pan, delta: Number.NaN});
            },
            _storePan: function (pan) {
                this._pan = pan;
                this._storeViewMatrix();
            },
            _zoomMainLayer: function () {
                var zoom = this._zoom;

                var transform = new CompositeTransform(0, 0, zoom, zoom);
                transform.render(this.mainLayer);
                this._storeLayerMatrix(transform);
                this._storeViewMatrix();
            },
            _transformMainLayer: function () {
                var pan = this._pan,
                    zoom = this._zoom;

                var transform = new CompositeTransform(pan.x, pan.y, zoom, zoom);
                transform.render(this.mainLayer);
                this._storeLayerMatrix(transform);
                this._storeViewMatrix();
            },
            _storeLayerMatrix: function(canvasTransform) {
                this._layerMatrix = canvasTransform.toMatrix();
                this._layerMatrixInvert = canvasTransform.invert().toMatrix();
            },
            _storeViewMatrix: function() {
                var pan = this._pan,
                    zoom = this._zoom;

                var transform = new CompositeTransform(pan.x, pan.y, zoom, zoom);
                this._matrix = transform.toMatrix();
                this._matrixInvert = transform.invert().toMatrix();
            },
            _toIndex: function (items, indices) {
                var result = this._getDiagramItems(items);
                this.mainLayer.toIndex(result.visuals, indices);
                this._fixOrdering(result, false);
            },
            _fixOrdering: function (result, toFront) {
                var shapePos = toFront ? this.shapes.length - 1 : 0,
                    conPos = toFront ? this.connections.length - 1 : 0,
                    i, item;
                for (i = 0; i < result.shapes.length; i++) {
                    item = result.shapes[i];
                    Utils.remove(this.shapes, item);
                    Utils.insert(this.shapes, item, shapePos);
                }
                for (i = 0; i < result.cons.length; i++) {
                    item = result.cons[i];
                    Utils.remove(this.connections, item);
                    Utils.insert(this.connections, item, conPos);
                }
            },
            _getDiagramItems: function (items) {
                var i, result = {}, args = items;
                result.visuals = [];
                result.shapes = [];
                result.cons = [];

                if (!items) {
                    args = this._selectedItems.slice();
                }
                else if (!isArray(items)) {
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

            remove: function(item) {
                var dataSource = this.dataSource;

                if (item instanceof Connection) {
                    dataSource = this.connectionsDataSource;
                }

                dataSource.remove(item.dataItem);
            },

            _removeItem: function (item, undoable) {
                item.select(false);
                if (item instanceof Shape) {
                    this._removeShape(item, undoable);
                } else if (item instanceof Connection) {
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
                    Utils.remove(this.shapes, shape);
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
                    sources[i].source(null, undoable);
                }
                for (i = 0; i < targets.length; i++) {
                    targets[i].target(null, undoable);
                }
            },
            _removeConnection: function (connection, undoable) {
                if (connection.sourceConnector) {
                    Utils.remove(connection.sourceConnector.connections, connection);
                }
                if (connection.targetConnector) {
                    Utils.remove(connection.targetConnector.connections, connection);
                }
                if (undoable) {
                    this.undoRedoService.addCompositeItem(new DeleteConnectionUnit(connection));
                }
                else {
                    Utils.remove(this.connections, connection);
                }
            },

            _removeDataItems: function(items, recursive) {
                var item, children, shape, idx;
                items = isArray(items) ? items : [items];

                while (items.length) {
                    item = items.shift();
                    shape = this._dataMap[item.uid];
                    if (shape) {
                        this._removeShapeConnections(shape);
                        this._removeItem(shape, false);
                        delete this._dataMap[item.uid];
                        if (recursive && item.hasChildren && item.loaded()) {
                            children = item.children.data();
                            for (idx = 0; idx < children.length; idx++) {
                                items.push(children[idx]);
                            }
                        }
                    }
                }
            },

            _removeShapeConnections: function(shape) {
                var connections = shape.connections();
                var idx;

                if (connections) {
                    for (idx = 0; idx < connections.length; idx++) {
                        this._removeItem(connections[idx], false);
                    }
                }
            },

            _addDataItem: function(dataItem) {
                if (!defined(dataItem)) {
                    return;
                }
                var shape = this._dataMap[dataItem.uid];
                if (shape) {
                    return shape;
                }

                var options = deepExtend({}, this.options.shapeDefaults, {
                    dataItem: dataItem
                });
                shape = new Shape(options, dataItem);
                this.addShape(shape);
                this._dataMap[dataItem.uid] = shape;
                return shape;
            },

            _addDataItems: function(items, parent) {
                var item, idx, shape, parentShape, connection;
                for (idx = 0; idx < items.length; idx++) {
                    item = items[idx];
                    shape = this._addDataItem(item);
                    parentShape = this._addDataItem(parent);
                    if (parentShape && !this.connected(parentShape, shape)) { // check if connected to not duplicate connections.
                        connection = this.connect(parentShape, shape);
                        connection.type(CASCADING);
                    }
                }
            },

            _refreshSource: function (e) {
                var that = this,
                    node = e.node,
                    action = e.action,
                    items = e.items,
                    options = that.options,
                    idx;

                if (e.field) {
                    return;
                }

                if (action == "remove") {
                    this._removeDataItems(e.items, true);
                } else {
                    if (!action && !node) {
                         that.clear();
                    }

                    this._addDataItems(items, node);

                    for (idx = 0; idx < items.length; idx++) {
                        items[idx].load();
                    }
                }

                if (options.layout) {
                    that.layout(options.layout);
                }
            },

            _mouseDown: function (e) {
                if (this.pauseMouseHandlers) {
                    return;
                }
                var p = this._calculatePosition(e);
                if (e.which == 1 && this.toolService.start(p, this._meta(e))) {
                    e.preventDefault();
                }
            },
            _addItem: function (item) {
                if (item instanceof Shape) {
                    this.addShape(item);
                } else if (item instanceof Connection) {
                    this.addConnection(item);
                }
            },
            _mouseUp: function (e) {
                if (this.pauseMouseHandlers) {
                    return;
                }
                var p = this._calculatePosition(e);
                if (e.which == 1 && this.toolService.end(p, this._meta(e))) {
                    e.preventDefault();
                }
            },
            _mouseMove: function (e) {
                if (this.pauseMouseHandlers) {
                    return;
                }
                var p = this._calculatePosition(e);
                if ((e.which === 0 || e.which == 1)&& this.toolService.move(p, this._meta(e))) {
                    e.preventDefault();
                }
            },

            _keydown: function (e) {
                if (this.toolService.keyDown(e.keyCode, this._meta(e))) {
                    e.preventDefault();
                }
            },
            _wheel: function (e) {
                var delta = mwDelta(e),
                    p = this._calculatePosition(e),
                    meta = deepExtend(this._meta(e), { delta: delta });

                if (this.toolService.wheel(p, meta)) {
                    e.preventDefault();
                }
            },
            _meta: function (e) {
                return { ctrlKey: e.ctrlKey, metaKey: e.metaKey, altKey: e.altKey };
            },
            _calculatePosition: function (e) {
                var pointEvent = (e.pageX === undefined ? e.originalEvent : e),
                    point = new Point(pointEvent.pageX, pointEvent.pageY),
                    offset = this.documentToModel(point);

                return offset;
            },
            _normalizePointZoom: function (point) {
                return point.times(1 / this.zoom());
            },
            _initialize: function () {
                this.shapes = [];
                this._selectedItems = [];
                this.connections = [];
                this._dataMap = {};
                this._connectionsDataMap = {};
                this.undoRedoService = new UndoRedoService();
                this.id = diagram.randomId();
            },

            _fetchFreshData: function () {
                this._dataSource();

                this._connectionDataSource();
                if (this.options.autoBind) {
                    this.dataSource.fetch();
                    this.connectionsDataSource.fetch();
                }
            },

            _dataSource: function() {
                var dsOptions = this.options.dataSource || {};
                var ds = isArray(dsOptions) ? { data: dsOptions } : dsOptions;

                if (this.dataSource && this._shapesRefreshHandler) {
                    this.dataSource
                        .unbind("change", this._shapesRefreshHandler)
                        .unbind("error", this._shapesErrorHandler);
                } else {
                    this._shapesRefreshHandler = proxy(this._refreshShapes, this);
                    this._shapesErrorHandler = proxy(this._error, this);
                }

                this.dataSource = kendo.data.DiagramDataSource.create(ds)
                    .bind("change", this._shapesRefreshHandler)
                    .bind("error", this._shapesErrorHandler);
            },

            _connectionDataSource: function() {
                var dsOptions = this.options.connectionsDataSource || {};
                var ds = isArray(dsOptions) ? { data: dsOptions } : dsOptions;

                if (this.connectionsDataSource && this._connectionsRefreshHandler) {
                    this.connectionsDataSource
                        .unbind("change", this._connectionsRefreshHandler)
                        .unbind("error", this._connectionsErrorHandler);
                } else {
                    this._connectionsRefreshHandler = proxy(this._refreshConnections, this);
                    this._connectionsErrorHandler = proxy(this._error, this);
                }

                this.connectionsDataSource = kendo.data.DiagramConnectionDataSource.create(ds)
                    .bind("change", this._connectionsRefreshHandler)
                    .bind("error", this._connectionsErrorHandler);
            },

            _refreshShapes: function(e) {
                if (e.action === "remove") {
                    // remove shapes
                } if (e.action === "itemchange") {
                    if (this._shouldRefresh) {
                        this._updateShapes(e.items);
                    }
                } else {
                    this.clear();
                    this._addShapes(e.sender.view());
                    if (this.connectionsDataSource) {
                        this._addConnections(this.connectionsDataSource.view());
                    }

                    if (this.options.layout) {
                        this.layout(this.options.layout);
                    }
                }
            },

            _updateShapes: function(items) {
                for (var i = 0; i < items.length; i++) {
                    var dataItem = items[i];

                    var shape = this._dataMap[dataItem.id];
                    shape.updateOptionsFromModel(dataItem);
                }
            },

            _addShapes: function(dataItems) {
                var length = dataItems.length;

                for (var i = 0; i < length; i++) {
                    var dataItem = dataItems[i];

                    var shape = this._dataMap[dataItem.id];

                    if (shape) {
                        continue;
                    }

                    shape = new Shape(this.options.shapeDefaults, dataItem);
                    this.addShape(shape);
                    this._dataMap[dataItem.id] = shape;
                }
            },

            _refreshConnections: function(e) {
                if (e.action === "remove") {
                    // remove connections
                } else if (e.action === "itemchange") {
                    // update connections
                } else {
                    this._addConnections(e.sender.view());
                }
            },

            _addConnections: function(connections) {
                var length = connections.length;
                var defaults = this.options.connectionDefaults;

                for (var i = 0; i < length; i++) {
                    var conn = connections[i];

                    if (!this._connectionsDataMap[conn.from + "-" + conn.to]) {
                        var from = this._validateConnector(conn.from);
                        var to = this._validateConnector(conn.to);

                        if (from && to) {
                            this._connectionsDataMap[conn.from + "-" + conn.to] = this.connect(from, to, deepExtend({}, defaults, conn));
                        }
                    }
                }
            },

            _validateConnector: function(value) {
                var connector = value;

                if (isNumber(value)) {
                    connector = this._dataMap[value];
                }

                return connector;
            },

            //_dataSource: function () {
            //    var that = this,
            //        options = that.options,
            //        dataSource = options.dataSource;

            //    dataSource = isArray(dataSource) ? { data: dataSource } : dataSource;

            //    if (!dataSource.fields) {
            //        dataSource.fields = [
            //            { field: "text" },
            //            { field: "url" },
            //            { field: "spriteCssClass" },
            //            { field: "imageUrl" }
            //        ];
            //    }
            //    if (that.dataSource && that._refreshHandler) {
            //        that._unbindDataSource();
            //    }

            //    that._refreshHandler = proxy(that._refreshSource, that);
            //    that._errorHandler = proxy(that._error, that);

            //    that.dataSource = HierarchicalDataSource.create(dataSource)
            //        .bind(CHANGE, that._refreshHandler)
            //        .bind(ERROR, that._errorHandler);
            //},

            _unbindDataSource: function () {
                var that = this;

                that.dataSource.unbind(CHANGE, that._refreshHandler).unbind(ERROR, that._errorHandler);
            },
            _error: function () {
            },
            _adorn: function (adorner, isActive) {
                if (isActive !== undefined && adorner) {
                    if (isActive) {
                        this._adorners.push(adorner);
                        this.adornerLayer.append(adorner.visual);
                    }
                    else {
                        Utils.remove(this._adorners, adorner);
                        this.adornerLayer.remove(adorner.visual);
                    }
                }
            },

            _showConnectors: function (shape, value) {
                if (value) {
                    this._connectorsAdorner.show(shape);
                } else {
                    this._connectorsAdorner.destroy();
                }
            },

            _updateAdorners: function() {
                var adorners = this._adorners;

                for(var i = 0; i < adorners.length; i++) {
                    var adorner = adorners[i];

                    if (adorner.refreshBounds) {
                        adorner.refreshBounds();
                    }
                    adorner.refresh();
                }
            },

            _refresh: function () {
                for (var i = 0; i < this.connections.length; i++) {
                    this.connections[i].refresh();
                }
            }
        });

        var ShapeModel = kendo.data.Model.define({
            id: "id",

            fields: {
                id: { type: "number" },
                text: { type: "string" },
                width: { type: "number" },
                height: { type: "number" },
                x: { type: "number" },
                y: { type: "number" },
                type: { type: "string" }
            }
        });

        var DiagramDataSource = kendo.data.DataSource.extend({
            init: function(options) {
                kendo.data.DataSource.fn.init.call(this, deepExtend({}, {
                    schema: {
                        modelBase: ShapeModel,
                        model: ShapeModel
                    }
                }, options));
            }
        });

        var ConnectionModel = kendo.data.Model.define({
            id: "id",

            fields: {
                id: { type: "number" },
                text: { type: "string" },
                from: { type: "number" },
                to: { type: "number" },
                type: { type: "string" }
            }
        });

        var DiagramConnectionDataSource = kendo.data.DataSource.extend({
            init: function(options) {
                kendo.data.DataSource.fn.init.call(this, deepExtend({}, {
                    schema: {
                        modelBase: ConnectionModel,
                        model: ConnectionModel
                    }
                }, options));
            }
        });

        var createDataSource = function(type, name) {
            return function(options) {
                options = isArray(dataSource) ? { data: options } : options;

                var dataSource = options || {};
                var data = dataSource.data;

                dataSource.data = data;

                if (!(dataSource instanceof type) && dataSource instanceof kendo.data.DataSource) {
                    throw new Error("Incorrect DataSource type. Only " + name + " instances are supported");
                }

                return dataSource instanceof type ? dataSource : new type(dataSource);
            };
        };

        DiagramDataSource.create = createDataSource(DiagramDataSource, "DiagramDataSource");
        DiagramConnectionDataSource.create = createDataSource(DiagramConnectionDataSource, "DiagramConnectionDataSource");

        deepExtend(kendo.data, {
            DiagramDataSource: DiagramDataSource,
            DiagramConnectionDataSource: DiagramConnectionDataSource,
            ConnectionModel: ConnectionModel,
            ShapeModel: ShapeModel
        });

        function filterDataItem(fields, dataItem) {
            var result = {};
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                var value = dataItem[field];

                if (value !== null && value !== undefined) {
                    result[field] = value;
                }
            }

            return result;
        }

        function isNumber(val) {
            return typeof val === "number" && !isNaN(val);
        }

        var DiagramToolBar = Class.extend({
            init: function(diagram, options) {
                this.diagram = diagram;
                this.options = options;
                this.toolBarActions = new ToolBarActions(diagram);
                this.createToolBar();
                this.createTools(this.options.tools);
            },

            createToolBar: function() {
                this.element = $("<div id='diagramToolBar' style='width: 130px;'></div>");
                this._toolBar = this.element
                    .kendoToolBar({
                        click: proxy(this.click, this)
                    }).getKendoToolBar();

                this.diagram.element.append(this.element);
            },

            createTools: function(tools) {
                for (var i = 0; i < tools.length; i++) {
                    var tool = tools[i];
                    this.createTool(tool);
                }
            },

            createTool: function(tool) {
                if (isPlainObject(tool)) {
                    if (tool.type) {
                        this[tool.type + "Tool"](tool);
                    } else if (tool.template) {
                        this._toolBar.add({
                            template: tool.template
                        });
                    }
                } else {
                    var tool = this[tool + "Tool"];
                    if (tool) {
                        this[tool]({ });
                    }
                }
            },

            editTool: function(options) {
                this._toolBar.add({
                    type: "button",
                    text: "edit",
                    id: "edit"
                });
            },

            deleteTool: function(options) {
                this._toolBar.add({
                    type: "button",
                    text: "delete",
                    id: "delete"
                });
            },

            click: function(e) {
                this.toolBarActions[e.id]();
            }
        });

        var ToolBarActions = Class.extend({
            init: function(diagram) {
                this.diagram = diagram;
            },
            delete: function() {
                this.diagram.remove(this.selectedElement());
            },
            edit: function() {
                this.diagram.edit(this.selectedElement());
            },
            selectedElement: function() {
                return this.diagram.select()[0];
            }
        });

        dataviz.ui.plugin(Diagram);

        deepExtend(diagram, {
            Shape: Shape,
            Connection: Connection,
            Connector: Connector
        });
})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
