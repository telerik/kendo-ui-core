/*
 * - dragdrop
 * - undoredo
 * - keyboard
 * - touch
 * - tooling
 * - snapping
 * - ?MVVM or in the DOM
 * */
kendo_module({
    id: "diagram",
    name: "Diagram Services",
    category: "diagram",
    depends: ["diagram.svg"]
});

(function ($, undefined) {
    var kendo = window.kendo,
        diagram = kendo.diagram,
        Class = kendo.Class,
        Group = diagram.Group,
        TextBlock = diagram.TextBlock,
        Rect = diagram.Rect,
        Rectangle = diagram.Rectangle,
        Point = diagram.Point,
        Circle = diagram.Circle,
        ZOOM_RATE = 1.1,
        deepExtend = kendo.deepExtend,
        Cursors = {
            arrow: "default",
            grip: "pointer",
            cross: "pointer",
            add: "pointer",
            move: "move",
            select: "pointer"
        };

    diagram.Cursors = Cursors;

    var CompositeUnit = Class.extend({
        init: function (unit) {
            this.units = [];
            this.title = "Composite unit";
            if (unit !== undefined) {
                this.units.push(unit);
            }
        },
        add: function (undoUnit) {
            this.units.push(undoUnit);
        },
        undo: function () {
            for (var i = 0; i < this.units.length; i++) {
                this.units[i].undo();
            }
        },
        redo: function () {
            for (var i = 0; i < this.units.length; i++) {
                this.units[i].redo();
            }
        }
    });

    var ContentChangedUndoUnit = Class.extend({
        init: function (element, content) {
            this.item = element;
            this._undoContent = element.content;
            this._redoContent = content;
            this.title = "Content Editing";
        },
        undo: function () {
            this.item.content(this._undoContent);
        },
        redo: function () {
            this.item.content(this._redoContent);
        }
    });

    var ConnectionEditUndoUnit = Class.extend({
        init: function (item, pevSource, pervTarget) {
            this.item = item;
            this._undoSource = pevSource;
            this._undoTarget = pervTarget;
            this._redoSource = item.source();
            this._redoTarget = item.target();
            this.title = "Connection Editing";
        },
        undo: function () {
            this.item.sourcePoint(this._undoSource);
            this.item.targetPoint(this._undoTarget);
        },
        redo: function () {
            this.item.sourcePoint(this._redoSource);
            this.item.targetPoint(this._redoTarget);
        }
    });

    var DeleteConnectionUnit = Class.extend({
        init: function (connection) {
            this.connection = connection;
            this.diagram = connection.diagram;
            this.targetConnector = connection.targetConnector;
            this.title = "Delete connection";
        },
        undo: function () {
            this.diagram.addConnection(this.connection);
        },
        redo: function () {
            this.diagram.remove(this.connection);
        }
    });

    var DeleteShapeUnit = Class.extend({
        init: function (shape) {
            this.shape = shape;
            this.diagram = shape.diagram;
            this.title = "Deletion";
        },
        undo: function () {
            this.diagram.addShape(this.shape);
            this.shape.select(false);
        },
        redo: function () {
            this.shape.select(false);
            this.diagram.remove(this.shape);
        }
    });

    var TransformUnit = Class.extend({
        init: function (shape, undoRectangle, redoRectangle) {
            this.shape = shape;
            this.undoRectangle = undoRectangle.clone();
            this.redoRectangle = redoRectangle.clone();
            this.title = "Transformation";
        },
        undo: function () {
            this.shape.bounds(this.undoRectangle);
            this.shape.refresh();
        },
        redo: function () {
            this.shape.bounds(this.redoRectangle);
            this.shape.refresh();
        }
    });

    var AddConnectionUnit = Class.extend({
        init: function (connection) {
            this.connection = connection;
            this.diagram = connection.diagram;
            this.title = "New connection";
        },
        undo: function () {
            this.diagram.remove(this.connection);
        },
        redo: function () {
            this.diagram.addConnection(this.connection);
        }
    });

    var AddShapeUnit = Class.extend({
        init: function (shape, diagram) {
            this.shape = shape;
            this.diagram = diagram;
            this.title = "insert";
        },
        undo: function () {
            this.diagram.remove(this.shape);
        },
        redo: function () {
            this.diagram.addShape(this.shape);
        }
    });

    var PanUndoUnit = Class.extend({
        init: function (initialPosition, finalPosition, diagram) {
            this.initial = initialPosition;
            this.final = finalPosition;
            this.diagram = diagram;
            this.title = "Pan Unit";
        },
        undo: function () {
            this.diagram.pan(this.initial);
        },
        redo: function () {
            this.diagram.pan(this.final);
        }
    });

    var UndoRedoService = Class.extend({
        init: function () {
            this.stack = [];
            this.index = 0;
        },
        begin: function () {
            this.composite = new CompositeUnit();
        },
        cancel: function () {
            this.composite = undefined;
        },
        commit: function () {
            if (this.composite.units.length > 0) {
                this._restart(this.composite);
            }
            this.composite = undefined;
        },
        addCompositeItem: function (undoUnit) {
            this.composite.add(undoUnit);
        },
        add: function (undoUnit) {
            this._restart(new CompositeUnit(undoUnit));
        },
        count: function () {
            return this.stack.length;
        },
        undo: function () {
            if (this.index !== 0) {
                this.index--;
                this.stack[this.index].undo();
            }
        },
        redo: function () {
            if (this.stack.length > 0 && this.index < this.stack.length) {
                this.stack[this.index].redo();
                this.index++;
            }
        },
        _restart: function (composite) {
            // throw away anything beyond this point if this is a new branch
            this.stack.splice(this.index, this.stack.length - this.index);
            this.stack.push(composite);
            this.redo();
        }
    });

    // Tools =========================================

    var EmptyTool = Class.extend({
        init: function (toolService) {
            this.toolService = toolService;
        },
        start: function () {
        },
        move: function () {
        },
        end: function () {
        },
        doubleClick: function () {
        },
        tryActivate: function () {
            return false;
        },
        getCursor: function () {
            return Cursors.arrow;
        }
    });

    var PanTool = EmptyTool.extend({
        init: function (toolService) {
            EmptyTool.fn.init.call(this, toolService);
        },
        tryActivate: function (meta) {
            return this.toolService.hoveredItem === undefined && meta.ctrlKey;
        },
        start: function (p) {
            this.toolService.isPanning = true;
            this.panStart = this.toolService.diagram._pan;
            this.panOffset = p;
            this.panDelta = new Point();	//relative to root
        },
        move: function (p) {
            var diagram = this.toolService.diagram;
            this.panDelta = p.plus(this.panDelta).minus(this.panOffset);
            diagram.pan(this.panStart.plus(this.panDelta));
        },
        end: function () {
            var diagram = this.toolService.diagram;
            diagram.undoRedoService.begin();
            diagram.undoRedoService.add(new PanUndoUnit(this.panStart, diagram._pan, diagram));
            diagram.undoRedoService.commit();
            this.toolService.isPanning = false;
        },
        getCursor: function () {
            return Cursors.move;
        }
    });

    var PointerTool = Class.extend({
        init: function (toolService) {
            this.toolService = toolService;
        },
        tryActivate: function () {
            return true; // the pointer tool is last and handles all others requests.
        },
        start: function (p, meta) {
            var diagram = this.toolService.diagram, hoveredItem = this.toolService.hoveredItem;
            if (hoveredItem) {
                if (!hoveredItem.isSelected) {
                    if (!meta.ctrlKey) {
                        diagram.select(false);
                    }
                    hoveredItem.select(true);
                } else if (meta.ctrlKey) {
                    hoveredItem.select(false);
                }

                if (hoveredItem && hoveredItem.isSelected) {
                    this._selectedItems = diagram.select();
                    this.handle = hoveredItem.adorner._hitTest(p);
                    this._selectedItems.each(function (item) {
                        item.adorner.start(p);
                    });
                }
            }
        },
        move: function (p) {
            var that = this;
            that._selectedItems.each(function (item) {
                item.adorner.move(that.handle, p);
            });
        },
        end: function (p, meta) {
            var diagram = this.toolService.diagram, unit;
            diagram.undoRedoService.begin();
            this._selectedItems.each(function (item) {
                unit = item.adorner.stop();
                if (unit) {
                    diagram.undoRedoService.addCompositeItem(unit);
                }
            });
            diagram.undoRedoService.commit();
        },
        getCursor: function (p) {
            return this.toolService.hoveredItem ? this.toolService.hoveredItem._getCursor(p) : Cursors.arrow;
        }
    });

    var SelectionTool = Class.extend({
        init: function (toolService) {
            this.toolService = toolService;
        },
        tryActivate: function () {
            return this.toolService.hoveredItem === undefined;
        },
        start: function (p, meta) {
            var diagram = this.toolService.diagram;
            diagram.select(false);
            diagram.selector.start(p);
        },
        move: function (p) {
            var diagram = this.toolService.diagram;
            diagram.selector.move(p);
        },
        end: function (p, meta) {
            var diagram = this.toolService.diagram, hoveredItem = this.toolService.hoveredItem;
            var rect = diagram.selector.bounds();
            if ((!hoveredItem || !hoveredItem.isSelected) && !meta.ctrlKey) {
                diagram.select(false);
            }
            if (!rect.isEmpty()) {
                diagram.select(true, { rect: rect });
            }
            diagram.selector.end();
        },
        getCursor: function (p) {
            return Cursors.arrow;
        }
    });

    var ConnectionTool = Class.extend({
        init: function (toolService) {
            this.toolService = toolService;
        },
        tryActivate: function (meta) {
            return this.toolService._hoveredConnector && !meta.ctrlKey; // connector it seems
        },
        start: function (p) {
            var diagram = this.toolService.diagram, connector = this.toolService._hoveredConnector, unit;
            unit = new AddConnectionUnit(diagram.connect(connector._c, p));
            this.toolService.newConnection = unit.connection;
            this.toolService.newConnection.select(true);
            diagram.undoRedoService.begin();
            diagram.undoRedoService.add(unit);
            diagram.undoRedoService.commit();
        },
        move: function (p) {
            this.toolService.newConnection.targetPoint(p);
            return true;
        },
        end: function () {
            var nc = this.toolService.newConnection, hi = this.toolService.hoveredItem, connector = this.toolService._hoveredConnector;
            if (connector && connector._c != nc.sourceConnector) {
                nc.targetPoint(connector._c);
            }
            else if (hi) {
                nc.targetPoint(hi);
            }
            this.toolService.newConnection = undefined;
        },
        getCursor: function () {
            return Cursors.arrow;
        }
    });

    var ConnectionEditTool = Class.extend({
        init: function (toolService) {
            this.toolService = toolService;
        },
        tryActivate: function () {
            var item = this.toolService.hoveredItem,
                isActive = item && item.line; // means it is connection
            if (isActive) {
                this._c = item;
                this._c.select(true);
            }
            return isActive;
        },
        start: function (p) {
            this.handle = this._c.adorner._hitTest(p);
            this._c.adorner.start(p);
        },
        move: function (p) {
            this._c.adorner.move(this.handle, p);
            return true;
        },
        end: function (p) {
            var unit = this._c.adorner.stop(p);
            this.toolService.diagram.undoRedoService.begin();
            this.toolService.diagram.undoRedoService.add(unit);
            this.toolService.diagram.undoRedoService.commit();
        },
        getCursor: function () {
            return Cursors.move;
        }
    });

    var ContentEditTool = EmptyTool.extend({
        init: function (toolService) {
            EmptyTool.fn.init.call(this, toolService);

            this.editor = new diagram.TextBlockEditor();
            this.editor.bind("finishEdit", $.proxy(this._finishEdit, this));
            this.toolService.diagram.bind("zoom", $.proxy(this._positionEditor, this));
        },
        doubleClick: function (pos) {
            var editor = this.editor;
            var shape = this.toolService.hoveredItem;

            this.toolService.editable = editor;
            this.toolService.editShape = shape;

            this._showEditor();

            var shapeContent = shape.content();
            shape.content("");
            editor.originalContent = shapeContent;
            editor.content(shapeContent);
            editor.focus();
        },
        tryActivate: function (meta) {
            return meta.doubleClick && this.toolService.hoveredItem;
        },
        _showEditor: function () {
            var diagram = this.toolService.diagram;
            var editor = this.editor;

            editor.visible(true);
            diagram.element.appendChild(editor.native);

            this._positionEditor();
        },
        _positionEditor: function () {
            if (!this.toolService.editShape) {
                return;
            }

            var diagram = this.toolService.diagram;
            var editor = this.editor;
            var native = $(editor.native);
            var bounds = this.toolService.editShape.bounds();
            var dElement = diagram.element;
            var isRelativeOrigin = /^(?:relative|absolute)$/.test(dElement.style.position);
            var diagramOffset = $(diagram.element).offset();
            var diagramPos = isRelativeOrigin ? new Point(0, 0) : new Point(diagramOffset.left, diagramOffset.top);

            var cssDim = function (prop) {
                return parseInt(native.css(prop));
            };

            var editorHeight = 20;
            var nativeOffset = new Point(cssDim("borderLeftWidth") + cssDim("paddingLeft"), cssDim("borderTopWidth") + cssDim("paddingTop"));
            var formattingOffset = new Point(10, bounds.height / 2 - editorHeight / 2).minus(nativeOffset).times(diagram.zoom());

            editor.size((bounds.width - 20) * diagram.zoom(), editorHeight * diagram.zoom());
            editor.position(diagram.pan().plus(bounds.topLeft().times(diagram.zoom())).plus(diagramPos).plus(formattingOffset));
            native.css({ fontSize: (15 * diagram.zoom()) | 0 });
        },
        _finishEdit: function () {
            this.toolService._finishEditShape();
        }
    });

    var ToolService = Class.extend({
        init: function (diagram) {
            this.diagram = diagram;
            this.tools = [new ContentEditTool(this), new PanTool(this), new ConnectionEditTool(this), new ConnectionTool(this), new SelectionTool(this), new PointerTool(this)]; // the order matters.
            this.activeTool = undefined;
        },
        start: function (p, meta) {
            meta = deepExtend({}, meta);
            this._updateHoveredItem(p);
            this._finishEditShape();
            this.diagram.focus();
            this._activateTool(meta);
            this.activeTool.start(p, meta);
            this._updateCursor(p);
            return true;
        },
        move: function (p, meta) {
            meta = deepExtend({}, meta);
            var updatedHovered = true;
            if (this.activeTool) {
                updatedHovered = this.activeTool.move(p, meta);
            }
            if (updatedHovered) {
                this._updateHoveredItem(p);
            }
            this._updateCursor(p);
            return true;
        },
        end: function (p, meta) {
            meta = deepExtend({}, meta);
            if (this.activeTool) {
                this.activeTool.end(p, meta);
            }
            this.activeTool = undefined;
            this._updateCursor(p);
            return true;
        },
        doubleClick: function (p, meta) {
            this.diagram.focus();
            this._activateTool(deepExtend(meta, { doubleClick: true }));
            this.activeTool.doubleClick(p, meta);
            this._updateCursor(p);
        },
        keyDown: function (key, meta) {
            var diagram = this.diagram;
            meta = deepExtend({ ctrlKey: false, metaKey: false, altKey: false }, meta);
            if ((meta.ctrlKey || meta.metaKey) && !meta.altKey) {	// ctrl or option
                if (key === 65) {	// A: select all
                    diagram.select(true);
                    return true;
                }
                else if (key === 90) { // Z: undo
                    diagram.undo();
                    return true;
                }
                else if (key === 90 || key === 89) {// y: redo
                    diagram.redo();
                    return true;
                }
            }
            else if (key === 46 || key === 8) {// del: deletion
                diagram.remove(diagram.select(), true);
                return true;
            }
            else if (key === 27) {	// ESC: stop any action
                if (this.newConnection) {
                    diagram.remove(this.newConnection);
                    this.newConnection = undefined;
                }
                diagram.select(false);
                diagram.refresh();
                return true;
            }
        },
        wheel: function (p, meta) {
            var diagram = this.diagram,
                delta = meta.delta,
                z = diagram.zoom();

            if (delta < 0) {
                z *= ZOOM_RATE;
            } else {
                z /= ZOOM_RATE;
            }

            diagram.zoom(z, p);
            return true;
        },
        _activateTool: function (meta) {
            for (var i = 0; i < this.tools.length; i++) {
                var tool = this.tools[i];
                if (tool.tryActivate(meta)) {
                    this.activeTool = tool;
                    break; // activating the first available tool in the loop.
                }
            }
        },
        _updateCursor: function (p) {
            this.diagram.canvas.native.style.cursor = this.activeTool ? this.activeTool.getCursor(p) : (this.hoveredItem ? this.hoveredItem._getCursor(p) : Cursors.arrow);
        },
        _updateHoveredItem: function (p) {
            var hit = this._hitTest(p);
            if (hit != this.hoveredItem) {
                if (this.hoveredItem) {
                    this.hoveredItem._hover(false);
                }
                this.hoveredItem = hit; // Shape, connection or connector
                if (this.hoveredItem) {
                    this.hoveredItem._hover(true);
                }
            }
        },
        _hitTest: function (point) {
            var i, item, hit, d = this.diagram;

            // connectors
            if (d._connectorsAdorner) {
                if (this._hoveredConnector) {
                    this._hoveredConnector._hover(false);
                    this._hoveredConnector = undefined;
                }
                hit = d._connectorsAdorner._hitTest(point);
                if (hit) {
                    return hit;
                }
            }
            // shapes
            for (i = 0; i < d.shapes.length; i++) {
                item = d.shapes[i];
                hit = item._hitTest(point);
                if (hit) {
                    return hit;
                }
            }
            // connections
            for (i = 0; i < d.connections.length; i++) {
                item = d.connections[i];
                if (item._hitTest(point)) {
                    return item;
                }
            }
        },
        _finishEditShape: function () {
            if (!this.editShape) {
                return;
            }

            this.editShape.content(this.editable.content());
            this.editable.visible(false);
            this.editable = this.editShape = undefined;
        }
    });

    // Adorners =========================================

    var AdornerBase = Class.extend({
        init: function (diagram, options) {
            var that = this;
            that.diagram = diagram;
            that.options = deepExtend({}, that.options, options);
            that.visual = new Group();
            that.diagram.bind("pan", function () {
                that.refresh();
            });
            that.diagram.bind("zoom", function () {
                that.refresh();
            });
        },
        refresh: function () {

        }
    });

    var ConnectionEditAdorner = AdornerBase.extend({
        init: function (connection, options) {
            var that = this;
            that.connection = connection;
            AdornerBase.fn.init.call(that, that.connection.diagram, options);
            var sp = that.connection.sourcePoint();
            var tp = that.connection.targetPoint();
            that.spVisual = new Circle(deepExtend(that.options.handles, { center: sp }));
            that.epVisual = new Circle(deepExtend(that.options.handles, { center: tp }));
            that.visual.append(that.spVisual);
            that.visual.append(that.epVisual);
        },
        options: {
            handles: {
                width: 8,
                height: 8,
                background: "Red"
            }
        },
        _getCursor: function () {
            return Cursors.move;
        },
        start: function (p) {
            this.handle = this._hitTest(p);
            this.startPoint = p;
            this._initialSource = this.connection.source();
            this._initialTarget = this.connection.target();
        },
        move: function (handle, p) {
            switch (handle) {
                case -1:
                    this.connection.sourcePoint(p);
                    break;
                case 1:
                    this.connection.targetPoint(p);
                    break;
                default:
                    var delta = p.minus(this.startPoint);
                    this.startPoint = p;
                    if (!this.connection.sourceConnector) {
                        this.connection.sourcePoint(this.connection.sourcePoint().plus(delta));
                    }
                    if (!this.connection.targetConnector) {
                        this.connection.targetPoint(this.connection.targetPoint().plus(delta));
                    }
                    break;
            }
            this.refresh();
        },
        stop: function (p) {
            var ts = this.diagram.toolService, item = ts.hoveredItem, target;
            if (item && !item.line) {
                target = item;
            } else if (ts._hoveredConnector) {
                target = ts._hoveredConnector._c;
            } else {
                target = p;
            }
            if (this.handle !== undefined) {
                switch (this.handle) {
                    case -1:
                        this.connection.sourcePoint(target);
                        break;
                    case 1:
                        this.connection.targetPoint(target);
                        break;
                }
            }

            this.handle = undefined;
            return new ConnectionEditUndoUnit(this.connection, this._initialSource, this._initialTarget);
        },
        _hitTest: function (p) {
            var sp = this.connection.sourcePoint(),
                tp = this.connection.targetPoint(),
                rx = this.options.handles.width / 2,
                ry = this.options.handles.height / 2,
                sb = new Rect(sp.x, sp.y).inflate(rx, ry),
                tb = new Rect(tp.x, tp.y).inflate(rx, ry);
            return sb.contains(p) ? -1 : (tb.contains(p) ? 1 : 0);
        },
        refresh: function () {
            this.spVisual.redraw({ center: this.diagram.transformPoint(this.connection.sourcePoint()) });
            this.epVisual.redraw({ center: this.diagram.transformPoint(this.connection.targetPoint()) });
        }
    });

    var ConnectorsAdorner = AdornerBase.extend({
        init: function (shape, options) {
            var that = this, ctr, i, len;
            that.shape = shape;
            AdornerBase.fn.init.call(that, that.shape.diagram, options);
            len = shape.connectors.length;
            that.connectors = [];
            for (i = 0; i < len; i++) {
                ctr = new ConnectorVisual(shape.connectors[i]);
                that.connectors.push(ctr);
                that.visual.append(ctr.visual);
            }
            that.shape.bind("boundsChange", function () {
                that.refresh();
            });

            that.refresh();
        },
        _hitTest: function (p) {
            var ctr, c, i, j;
            for (i = 0; i < this.connectors.length; i++) {
                ctr = this.connectors[i];
                if (ctr._hitTest(p)) {
                    for (j = 0; j < ctr._c.connections.length; j++) {
                        c = ctr._c.connections[j];
                        if (c.adorner) {
                            return c;
                        }
                    }
                    ctr._hover(true);
                    this.diagram.toolService._hoveredConnector = ctr;
                    break;
                }
            }
        },
        refresh: function () {
            var bounds = this.shape.actualBounds();
            this.visual.position(bounds.topLeft());
            $.each(this.connectors, function () {
                this.refresh();
            });
        }
    });

    var ResizingAdorner = AdornerBase.extend({
        init: function (shape, options) {
            var that = this;
            that.shape = shape;
            AdornerBase.fn.init.call(that, that.shape.diagram, options);
            that.isManipulating = false;
            that.map = [];
            for (var x = -1; x <= 1; x++) {
                for (var y = -1; y <= 1; y++) {
                    if ((x !== 0) || (y !== 0)) { // (0, 0) element, (-1, -1) top-left, (+1, +1) bottom-right
                        var visual = new Rectangle(that.options.handles);
                        that.map.push({ x: x, y: y, visual: visual });
                        that.visual.append(visual);
                    }
                }
            }
            that.text = new TextBlock();
            that.visual.append(that.text);
            that.rect = new Rectangle(that.options.rect);
            that.visual.append(that.rect);
            that.refresh();
        },
        options: {
            resizable: true,
            rotatable: true,
            handles: {
                width: 7,
                height: 7,
                background: "DimGray"
            },
            rect: {
                stroke: "#778899",
                strokeThickness: 1,
                strokeWidth: 1,
                strokeDashArray: "2, 2",
                background: "none"
            },
            offset: 6
        },
        bounds: function (value) {
            if (value) {
                this._bounds = value;
            }
            else {
                return this._bounds;
            }
        },
        refresh: function () {
            var sb = this.shape.bounds(),
                innerBounds = this.shape.actualBounds().clone(),
                that = this, b;
            this.bounds(innerBounds.inflate(this.options.offset, this.options.offset));
            this.visual.position(this._bounds.topLeft());
            $.each(this.map, function () {
                b = that._getHandleBounds(new Point(this.x, this.y));
                this.visual.position(b.topLeft());
            });
            this.text.position(new Point(0, this._bounds.height + 20));
            this.text.content(kendo.format("x: {0}, y: {1}, w: {2}, h: {3}", Math.round(sb.x), Math.round(sb.y), Math.round(sb.width), Math.round(sb.height)));
            this.visual.position(this._bounds.topLeft());
            if (this.options.angle) {
                this.visual.rotate(this.options.angle, new Point(this._bounds.width / 2, this._bounds.height / 2));
            }
            this.rect.redraw({width: innerBounds.width, height: innerBounds.height});
        },
        _hitTest: function (p) {
            p = this.diagram.transformPoint(p);
            var i, hit, handleBounds, handlesCount = this.map.length, handle;
            if (this.options.resizable) {
                for (i = 0; i < handlesCount; i++) {
                    handle = this.map[i];
                    hit = new Point(handle.x, handle.y);
                    handleBounds = this._getHandleBounds(hit); //local coordinates
                    handleBounds.offset(this._bounds.x, this._bounds.y);
                    if (handleBounds.contains(p)) {
                        return hit;
                    }
                }
            }
            if (this._bounds.contains(p)) {
                return new Point(0, 0);
            }
        },
        _getHandleBounds: function (p) {
            var w = this.options.handles.width, h = this.options.handles.height,
                r = new Rect(0, 0, w, h);
            if (p.x < 0) {
                r.x = -w;
            }
            else if (p.x === 0) {
                r.x = Math.floor(this._bounds.width / 2) - w / 2;
            }
            else if (p.x > 0) {
                r.x = this._bounds.width + 1.0;
            }
            if (p.y < 0) {
                r.y = -h;
            }
            else if (p.y === 0) {
                r.y = Math.floor(this._bounds.height / 2) - h / 2;
            }
            else if (p.y > 0) {
                r.y = this._bounds.height + 1.0;
            }
            return r;
        },
        _getCursor: function (point) {
            var hit = this._hitTest(point);
            if (hit && (hit.x >= -1) && (hit.x <= 1) && (hit.y >= -1) && (hit.y <= 1) && this.options.resizable) {
                if (hit.x == -1 && hit.y == -1) {
                    return "nw-resize";
                }
                if (hit.x == 1 && hit.y == 1) {
                    return "se-resize";
                }
                if (hit.x == -1 && hit.y == 1) {
                    return "sw-resize";
                }
                if (hit.x == 1 && hit.y == -1) {
                    return "ne-resize";
                }
                if (hit.x === 0 && hit.y == -1) {
                    return "n-resize";
                }
                if (hit.x === 0 && hit.y == 1) {
                    return "s-resize";
                }
                if (hit.x == 1 && hit.y === 0) {
                    return "e-resize";
                }
                if (hit.x == -1 && hit.y === 0) {
                    return "w-resize";
                }
            }
            return this.isManipulating ? Cursors.move : Cursors.select;
        },
        start: function (p) {
            this.initialState = this.shape.bounds();
            this._cp = p;
            this.isManipulating = true;
        },
        stop: function () {
            var r1 = this.initialState,
                r2 = this.shape.bounds(),
                unit;
            if (!r1.equals(r2)) {
                unit = new TransformUnit(this.shape, r1, r2);
            }
            this.isManipulating = false;
            return unit;
        },
        move: function (handle, p) {
            var dtl = new Point(), dbr = new Point(), bounds = this.shape.bounds();
            if (handle.x === -1 || (handle.x === 0 && handle.y === 0)) {
                dtl.x = p.x - this._cp.x;
            }
            if (handle.x === 1 || (handle.x === 0 && handle.y === 0)) {
                dbr.x = p.x - this._cp.x;
            }
            if (handle.y === -1 || (handle.x === 0 && handle.y === 0)) {
                dtl.y = p.y - this._cp.y;
            }
            if (handle.y === 1 || (handle.x === 0 && handle.y === 0)) {
                dbr.y = p.y - this._cp.y;
            }
            var tl = bounds.topLeft().plus(dtl);
            var br = bounds.bottomRight().plus(dbr);
            //cut-off
            if (Math.abs(br.x - tl.x) > 4 || Math.abs(br.y - tl.y) > 4) {
                this._cp = p;
                this.shape.bounds(Rect.fn.fromPoints(tl, br));
                this.refresh();
            }
        }
    });

    var Selector = Class.extend({
        init: function (diagram) {
            this.visual = new Rectangle(this.options);
            this.diagram = diagram;
        },
        options: {
            stroke: "#778899",
            strokeThickness: 1,
            strokeWidth: 1,
            strokeDashArray: "2, 2",
            background: "none"
        },
        start: function (p) {
            this._sp = this._ep = p;
            this.refresh();
            this.diagram._adorn(this, true);
        },
        end: function () {
            this._sp = this._ep = undefined;
            this.diagram._adorn(this, false);
        },
        bounds: function (value) {
            if (value) {
                this._bounds = value;
            }
            return this._bounds;
        },
        move: function (p) {
            this._ep = p;
            this.refresh();
        },
        refresh: function () {
            var actualBounds = Rect.fn.fromPoints(this.diagram.transformPoint(this._sp), this.diagram.transformPoint(this._ep));
            this.bounds(Rect.fn.fromPoints(this._sp, this._ep));
            this.visual.position(actualBounds.topLeft());
            this.visual.redraw({ height: actualBounds.height + 1, width: actualBounds.width + 1 });
        }
    });

    var ConnectorVisual = Class.extend({
        init: function (connector) {
            this.options = deepExtend({}, connector.options);
            this._c = connector;
            this.visual = new Circle(this.options);
            this.refresh();
        },
        _hover: function (value) {
            this.visual.background(value ? this.options.hoveredBackground : this.options.background);
        },
        refresh: function () {
            var p = this._c.shape.diagram.transformPoint(this._c.position()),
                relative = p.minus(this._c.shape.actualBounds().topLeft()),
                value = new Rect(p.x, p.y, 0, 0);
            value.inflate(this.options.width / 2, this.options.height / 2);
            this._actualBounds = value;
            this.visual.redraw({ center: new Point(relative.x, relative.y) });
        },
        _hitTest: function (p) {
            p = this._c.shape.diagram.transformPoint(p);
            return this._actualBounds.contains(p);
        }
    });

    deepExtend(diagram, {
        CompositeUnit: CompositeUnit,
        TransformUnit: TransformUnit,
        PanUndoUnit: PanUndoUnit,
        AddShapeUnit: AddShapeUnit,
        AddConnectionUnit: AddConnectionUnit,
        DeleteShapeUnit: DeleteShapeUnit,
        DeleteConnectionUnit: DeleteConnectionUnit,
        ContentChangedUndoUnit: ContentChangedUndoUnit,
        ConnectionEditAdorner: ConnectionEditAdorner,
        UndoRedoService: UndoRedoService,
        ResizingAdorner: ResizingAdorner,
        Selector: Selector,
        ToolService: ToolService,
        ConnectorsAdorner: ConnectorsAdorner
    });
})(window.kendo.jQuery);