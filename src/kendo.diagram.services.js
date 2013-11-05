kendo_module({
    id: "diagram.services",
    name: "Diagram Services",
    category: "diagram",
    depends: ["diagram.svg"]
});

(function ($, undefined) {
    // Imports ================================================================
    var kendo = window.kendo,
        diagram = kendo.diagram,
        Class = kendo.Class,
        Group = diagram.Group,
        TextBlock = diagram.TextBlock,
        Rect = diagram.Rect,
        Rectangle = diagram.Rectangle,
        Utils = diagram.Utils,
        Point = diagram.Point,
        Circle = diagram.Circle,
        Path = diagram.Path,
        deepExtend = kendo.deepExtend,
        Movable = kendo.ui.Movable;
    // Constants ==============================================================
    var Cursors = {
            arrow: "default",
            grip: "pointer",
            cross: "pointer",
            add: "pointer",
            move: "move",
            select: "pointer"
        },
        HITTESTDISTANCE = 10,
        AUTO = "Auto",
        TOP = "Top",
        RIGHT = "Right",
        LEFT = "Left",
        BOTTOM = "Bottom",
        DEFAULTCONNECTORNAMES = [TOP, RIGHT, BOTTOM, LEFT, AUTO],
        ZOOM_RATE = 1.1;

    diagram.Cursors = Cursors;

    function selectSingle(item, meta) {
        if (item.isSelected) {
            if (meta.ctrlKey) {
                item.select(false);
            }
        } else {
            item.diagram.select(item, {addToSelection: meta.ctrlKey});
        }
    }

    var LayoutUndoUnit = Class.extend({
        init: function (initialState, finalState, animate) {
            if (Utils.isUndefined(animate)) {
                this.animate = false;
            }
            else {
                this.animate = animate;
            }
            this._initialState = initialState;
            this._finalState = finalState;
            this.title = "Diagram layout";
        },
        undo: function () {
            this.setState(this._initialState);
        },
        redo: function () {
            this.setState(this._finalState);
        },
        setState: function (state) {
            var diagram = state.diagram;
            if (this.animate) {
                state.linkMap.forEach(
                    function (id, points) {
                        var conn = diagram.getId(id);
                        conn.visible(false);
                        if (conn) {
                            conn.points(points);
                        }
                    }
                );
                var ticker = new kendo.diagram.Ticker();
                ticker.addAdapter(new kendo.diagram.PositionAdapter(state));
                ticker.onComplete(function () {
                    state.linkMap.forEach(
                        function (id) {
                            var conn = diagram.getId(id);
                            conn.visible(true);
                        }
                    );
                });
                ticker.play();
            }
            else {
                state.nodeMap.forEach(function (id, bounds) {
                    var shape = diagram.getId(id);
                    if (shape) {
                        shape.position(bounds.topLeft());
                    }
                });
                state.linkMap.forEach(
                    function (id, points) {
                        var conn = diagram.getId(id);
                        if (conn) {
                            conn.points(points);
                        }
                    }
                );
            }

            /*for (var i = 0; i < graph.links.length; i++) {
             var link = graph.links[i];
             var p = []
             if (link.points != null) {
             p.addRange(link.points);
             }
             */
            /* var sb = link.source.associatedShape.bounds();
             p.prepend(new diagram.Point(sb.x, sb.y));
             var eb = link.target.associatedShape.bounds();
             p.append(new diagram.Point(eb.x, eb.y));*/
            /*

             link.associatedConnection.points(p);
             }*/

        }
    });

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

    /**
     * Unit for content editing.
     */
    var ContentChangedUndoUnit = Class.extend({
        /**
         * Instantiates the unit.
         * @param element The element being edited.
         * @param newcontent The new content.
         * @param oldcontent The old content.
         */
        init: function (element, oldcontent, newcontent) {
            this.item = element;
            this._undoContent = oldcontent;
            this._redoContent = newcontent;
            this.title = "Content Editing";
        },
        undo: function () {
            this.item.content(this._undoContent);
        },
        redo: function () {
            this.item.content(this._redoContent);
        }
    });

    var ConnectionEditUnit = Class.extend({
        init: function (item, redoSource, redoTarget) {
            this.item = item;
            this._redoSource = redoSource;
            this._redoTarget = redoTarget;
            this._undoSource = item.source();
            this._undoTarget = item.target();
            this.title = "Connection Editing";
        },
        undo: function () {
            if (this._undoSource !== undefined) {
                this.item.source(this._undoSource, false);
            }
            if (this._undoTarget !== undefined) {
                this.item.target(this._undoTarget, false);
            }
        },
        redo: function () {
            if (this._redoSource !== undefined) {
                this.item.source(this._redoSource, false);
            }
            if (this._redoTarget !== undefined) {
                this.item.target(this._redoTarget, false);
            }
        }
    });

    var ConnectionEditUndoUnit = Class.extend({
        init: function (item, undoSource, undoTarget) {
            this.item = item;
            this._undoSource = undoSource;
            this._undoTarget = undoTarget;
            this._redoSource = item.source();
            this._redoTarget = item.target();
            this.title = "Connection Editing";
        },
        undo: function () {
            this.item.source(this._undoSource, false);
            this.item.target(this._undoTarget, false);
        },
        redo: function () {
            this.item.source(this._redoSource, false);
            this.item.target(this._redoTarget, false);
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
            this.diagram.addConnection(this.connection, false);
        },
        redo: function () {
            this.diagram.remove(this.connection, false);
        }
    });

    var DeleteShapeUnit = Class.extend({
        init: function (shape) {
            this.shape = shape;
            this.diagram = shape.diagram;
            this.title = "Deletion";
        },
        undo: function () {
            this.diagram.addShape(this.shape, {undoable: false});
            this.shape.select(false);
        },
        redo: function () {
            this.shape.select(false);
            this.diagram.remove(this.shape, false);
        }
    });
    /**
     * Holds the undoredo state when performing a rotation, translation or scaling. The adorner is optional.
     * @type {*}
     */
    var TransformUnit = Class.extend({
        init: function (shapes, undoStates, adorner) {
            this.shapes = shapes;
            this.undoStates = undoStates;
            this.title = "Transformation";
            this.redoStates = [];
            this.adorner = adorner;
            for (var i = 0; i < this.shapes.length; i++) {
                var shape = this.shapes[i];
                this.redoStates.push(shape.bounds());
            }
        },
        undo: function () {
            for (var i = 0; i < this.shapes.length; i++) {
                var shape = this.shapes[i];
                shape.bounds(this.undoStates[i]);
            }
            if (this.adorner) {
                this.adorner.refreshBounds();
                this.adorner.refresh();
            }
        },
        redo: function () {
            for (var i = 0; i < this.shapes.length; i++) {
                var shape = this.shapes[i];
                shape.bounds(this.redoStates[i]);
            }
            if (this.adorner) {
                this.adorner.refreshBounds();
                this.adorner.refresh();
            }
        }
    });

    var AddConnectionUnit = Class.extend({
        init: function (connection, diagram) {
            this.connection = connection;
            this.diagram = diagram;
            this.title = "New connection";
        },
        undo: function () {
            this.diagram.remove(this.connection, false);
        },
        redo: function () {
            this.diagram.addConnection(this.connection, false);
        }
    });

    var AddShapeUnit = Class.extend({
        init: function (shape, diagram) {
            this.shape = shape;
            this.diagram = diagram;
            this.title = "New shape";
        },
        undo: function () {
            this.diagram.remove(this.shape, false);
        },
        redo: function () {
            this.diagram.addShape(this.shape, {undoable: false});
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

    var RotateUnit = Class.extend({
        init: function (adorner, shapes, undoRotates) {
            this.shapes = shapes;
            this.undoRotates = undoRotates;
            this.title = "Rotation";
            this.redoRotates = [];
            this.redoAngle = adorner._angle;
            this.adorner = adorner;
            this.center = adorner._innerBounds.center();
            for (var i = 0; i < this.shapes.length; i++) {
                var shape = this.shapes[i];
                this.redoRotates.push(shape.rotate().angle);
            }
        },
        undo: function () {
            var i, shape;
            for (i = 0; i < this.shapes.length; i++) {
                shape = this.shapes[i];
                shape.rotate(this.undoRotates[i], this.center);
            }
            if (this.adorner) {
                this.adorner._initialize();
                this.adorner.refresh();
            }
        },
        redo: function () {
            var i, shape;
            for (i = 0; i < this.shapes.length; i++) {
                shape = this.shapes[i];
                shape.rotate(this.redoRotates[i], this.center);
            }
            if (this.adorner) {
                this.adorner._initialize();
                this.adorner.refresh();
            }
        }
    });

    var ToFrontUnit = Class.extend({
        init: function (diagram, items, initialIndices) {
            this.diagram = diagram;
            this.indices = initialIndices;
            this.items = items;
            this.title = "Rotate Unit";
        },
        undo: function () {
            this.diagram._toIndex(this.items, this.indices);
        },
        redo: function () {
            this.diagram.toFront(this.items, false);
        }
    });

    var ToBackUnit = Class.extend({
        init: function (diagram, items, initialIndices) {
            this.diagram = diagram;
            this.indices = initialIndices;
            this.items = items;
            this.title = "Rotate Unit";
        },
        undo: function () {
            this.diagram._toIndex(this.items, this.indices);
        },
        redo: function () {
            this.diagram.toBack(this.items, false);
        }
    });

    /**
     * Undo-redo service.
     */
    var UndoRedoService = Class.extend({
        init: function () {
            this.stack = [];
            this.index = 0;
            this.capacity = 100;
        },

        /**
         * Starts the collection of units. Add those with
         * the addCompositeItem method and call commit. Or cancel to forget about it.
         */
        begin: function () {
            this.composite = new CompositeUnit();
        },

        /**
         * Cancels the collection process of unit started with 'begin'.
         */
        cancel: function () {
            this.composite = undefined;
        },

        /**
         * Commits a batch of units.
         */
        commit: function () {
            if (this.composite.units.length > 0) {
                this._restart(this.composite);
            }
            this.composite = undefined;
        },

        /**
         * Adds a unit as part of the begin-commit batch.
         * @param undoUnit
         */
        addCompositeItem: function (undoUnit) {
            if (this.composite) {
                this.composite.add(undoUnit);
            } else {
                this.add(undoUnit);
            }
        },

        /**
         * Standard addition of a unit. See also the batch version; begin-addCompositeUnit-commit methods.
         * @param undoUnit The unit to be added.
         * @param execute If false, the unit will be added but not executed.
         */
        add: function (undoUnit, execute) {
            this._restart(undoUnit, execute);
        },

        /**
         * Returns the number of undoable unit in the stack.
         * @returns {Number}
         */
        count: function () {
            return this.stack.length;
        },

        /**
         * Rollback of the unit on top of the stack.
         */
        undo: function () {
            if (this.index > 0) {
                this.index--;
                this.stack[this.index].undo();
            }
        },

        /**
         * Redo of the last undone action.
         */
        redo: function () {
            if (this.stack.length > 0 && this.index < this.stack.length) {
                this.stack[this.index].redo();
                this.index++;
            }
        },

        _restart: function (composite, execute) {
            // throw away anything beyond this point if this is a new branch
            this.stack.splice(this.index, this.stack.length - this.index);
            this.stack.push(composite);
            if (Utils.isUndefined(execute) || (execute && (execute === true))) {
                this.redo();
            }
            else {
                this.index++;
            }
            // check the capacity
            if (this.stack.length > this.capacity) {
                this.stack.splice(0, this.stack.length - this.capacity);
                this.index = this.capacity; //points to the end of the stack
            }
        },

        /**
         * Clears the stack.
         */
        clear: function () {
            this.stack = [];
            this.index = 0;
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
            var tool = this;
            EmptyTool.fn.init.call(tool, toolService);

            var diagram = tool.toolService.diagram,
                canvas = diagram.canvas;

            diagram.scroller = tool.scroller = $(diagram.scrollable).kendoMobileScroller({
                scroll: $.proxy(tool._move, tool)
            }).data("kendoMobileScroller");

            tool.movableCanvas = new Movable(canvas.element);

            tool.scroller.disable();
        },
        tryActivate: function (meta) {
            return this.toolService.hoveredItem === undefined && meta.ctrlKey;
        },
        start: function () {
            var diagram = this.toolService.diagram,
                canvas = diagram.canvas,
                canvasSize = canvas.size();

            this.scroller.enable();
            this.currentCanvasSize = canvasSize;
        },
        move: function () {
        },//the tool itself should not handle the scrolling. Let kendo scroller take care of this part. Check _move
        _move: function (args) {
            var tool = this,
                diagram = tool.toolService.diagram,
                canvas = diagram.canvas,
                canvasSize = tool.currentCanvasSize || canvas.size(),
                scrollPos = new Point(args.scrollLeft, args.scrollTop),
                viewBox = new Rect(scrollPos.x, scrollPos.y, parseInt(canvasSize.width, 10), parseInt(canvasSize.height, 10));

            diagram._storePan(scrollPos.times(-1));
            tool.movableCanvas.moveTo(scrollPos);
            canvas.viewBox(viewBox);
        },
        end: function () {
            this.scroller.disable();
        },
        getCursor: function () {
            return Cursors.move;
        }
    });

    /**
     * The tool handling the transformations via the adorner.
     * @type {*}
     */
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
                selectSingle(hoveredItem, meta);
                if (hoveredItem.adorner) { //connection
                    this.adorner = hoveredItem.adorner;
                    this.handle = this.adorner._hitTest(p);
                }
            }
            if (!this.handle) {
                this.handle = diagram._resizingAdorner._hitTest(p);
                if (this.handle) {
                    this.adorner = diagram._resizingAdorner;
                }
            }
            if (this.adorner) {
                this.adorner.start(p);
            }
        },
        move: function (p) {
            var that = this;
            if (this.adorner) {
                this.adorner.move(that.handle, p);
            }
        },
        end: function () {
            var diagram = this.toolService.diagram, unit;
            if (this.adorner) {
                //diagram.undoRedoService.begin();
                unit = this.adorner.stop();
                if (unit) {
                    diagram.undoRedoService.add(unit, false);
                }
                //diagram.undoRedoService.commit();
            }
            this.adorner = undefined;
            this.handle = undefined;
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
            return this.toolService.hoveredItem === undefined && this.toolService.hoveredAdorner === undefined;
        },
        start: function (p) {
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
                diagram.select(rect);
            }
            diagram.selector.end();
        },
        getCursor: function () {
            return Cursors.arrow;
        }
    });

    var ConnectionTool = Class.extend({
        init: function (toolService) {
            this.toolService = toolService;
            this.type = "ConnectionTool";
        },
        tryActivate: function (meta) {
            return this.toolService._hoveredConnector && !meta.ctrlKey; // connector it seems
        },
        start: function (p, meta) {
            var diagram = this.toolService.diagram, connector = this.toolService._hoveredConnector,
                connection = diagram.connect(connector._c, p);
            this.toolService._connectionManipulation(connection, connector._c.shape, true);
            this.toolService._removeHover();
            selectSingle(this.toolService.activeConnection, meta);
        },
        move: function (p) {
            this.toolService.activeConnection.target(p);
            return true;
        },
        end: function () {
            var nc = this.toolService.activeConnection, hi = this.toolService.hoveredItem, connector = this.toolService._hoveredConnector;
            if (connector && connector._c != nc.sourceConnector) {
                nc.target(connector._c);
            }
            else if (hi) {
                nc.target(hi);
            }
            this.toolService._connectionManipulation();
        },
        getCursor: function () {
            return Cursors.arrow;
        }
    });

    var ConnectionEditTool = Class.extend({
        init: function (toolService) {
            this.toolService = toolService;
            this.type = "ConnectionTool";
        },
        tryActivate: function () {
            var item = this.toolService.hoveredItem,
                isActive = item && item.path; // means it is connection
            if (isActive) {
                this._c = item;
            }
            return isActive;
        },
        start: function (p, meta) {
            selectSingle(this._c, meta);
            this.handle = this._c.adorner._hitTest(p);
            this._c.adorner.start(p);
        },
        move: function (p) {
            this._c.adorner.move(this.handle, p);
            return true;
        },
        end: function (p) {
            var unit = this._c.adorner.stop(p);
            this.toolService.diagram.undoRedoService.add(unit, false);
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
        doubleClick: function () {
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
            var diagram = this.toolService.diagram,
                editor = this.editor;

            editor.visible(true);
            diagram.element.context.appendChild(editor.native);

            this._positionEditor();
        },
        _positionEditor: function () {
            if (!this.toolService.editShape) {
                return;
            }

            var diagram = this.toolService.diagram,
                editor = this.editor,
                nativeEditor = $(editor.native),
                bounds = this.toolService.editShape.bounds();

            var cssDim = function (prop) {
                return parseInt(nativeEditor.css(prop), 10);
            };

            var editorHeight = 20;
            var nativeOffset = new Point(cssDim("borderLeftWidth") + cssDim("paddingLeft"), cssDim("borderTopWidth") + cssDim("paddingTop"));
            var formattingOffset = new Point(10, bounds.height / 2 - editorHeight / 2).minus(nativeOffset).times(diagram.zoom());

            editor.size((bounds.width - 20) * diagram.zoom(), editorHeight * diagram.zoom());

            var tp = diagram.transformPoint(bounds.topLeft());

            editor.position(tp.plus(formattingOffset));
            nativeEditor.css({ fontSize: (15 * diagram.zoom()) || 0 });
        },
        _finishEdit: function () {
            this.toolService._finishEditShape();
        }
    });

    function testKey(key, str) {
        return str.charCodeAt(0) == key || str.toUpperCase().charCodeAt(0) == key;
    }

    /**
     * The service managing the tools.
     * @type {*}
     */
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
            this._activateTool(meta);
            this.activeTool.start(p, meta);
            this._updateCursor(p);
            this.diagram.focus();
            return true;
        },
        move: function (p, meta) {
            meta = deepExtend({}, meta);
            var updateHovered = true;
            if (this.activeTool) {
                updateHovered = this.activeTool.move(p, meta);
            }
            if (updateHovered) {
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
            this._activateTool(deepExtend(meta, { doubleClick: true }));
            if (this.activeTool.doubleClick) {
                this.activeTool.doubleClick(p, meta);
            }
            this._updateCursor(p);
        },
        keyDown: function (key, meta) {
            var diagram = this.diagram;
            meta = deepExtend({ ctrlKey: false, metaKey: false, altKey: false }, meta);
            if ((meta.ctrlKey || meta.metaKey) && !meta.altKey) {// ctrl or option
                if (testKey(key, "a")) {// A: select all
                    diagram.select("All");
                    return true;
                }
                else if (testKey(key, "z")) {// Z: undo
                    diagram.undo();
                    return true;
                }
                else if (testKey(key, "y")) {// y: redo
                    diagram.redo();
                    return true;
                }
                else if (testKey(key, "c")) {
                    diagram.copy();
                }
                else if (testKey(key, "x")) {
                    diagram.cut();
                }
                else if (testKey(key, "v")) {
                    diagram.paste();
                }
                else if (testKey(key, "l")) {
                    diagram.layout();
                }
                else if (testKey(key, "d")) {
                    diagram.copy();
                    diagram.paste();
                }
            }
            else if (key === 46 || key === 8) {// del: deletion
                diagram.remove(diagram.select(), true);
                return true;
            }
            else if (key === 27) {// ESC: stop any action
                this._discardNewConnection();
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
        _discardNewConnection: function () {
            if (this.newConnection) {
                this.diagram.remove(this.newConnection);
                this.newConnection = undefined;
            }
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
            var cursor = this.activeTool ? this.activeTool.getCursor(p) : (this.hoveredAdorner ? this.hoveredAdorner._getCursor(p) : (this.hoveredItem ? this.hoveredItem._getCursor(p) : Cursors.arrow));

            $(this.diagram.canvas.native).css({cursor: cursor});
        },
        _connectionManipulation: function (connection, disabledShape, isNew) {
            this.activeConnection = connection;
            this.disabledShape = disabledShape;
            if (isNew) {
                this.newConnection = this.activeConnection;
            } else {
                this.newConnection = undefined;
            }
        },
        _updateHoveredItem: function (p) {
            var hit = this._hitTest(p);

            if (hit != this.hoveredItem && (!this.disabledShape || hit != this.disabledShape)) {
                if (this.hoveredItem) {
                    this.hoveredItem._hover(false);
                }
                this.hoveredItem = hit; // Shape, connection or connector
                if (this.hoveredItem) {
                    this.hoveredItem._hover(true);
                }
            }
        },
        _removeHover: function () {
            if (this.hoveredItem) {
                this.hoveredItem._hover(false);
                this.hoveredItem = undefined;
            }
        },
        _hitTest: function (point) {
            var hit, d = this.diagram, item, i;

            // connectors
            if (this._hoveredConnector) {
                this._hoveredConnector._hover(false);
                this._hoveredConnector = undefined;
            }
            if (d._connectorsAdorner._visible) {
                hit = d._connectorsAdorner._hitTest(point);
                if (hit) {
                    return hit;
                }
            }

            hit = this.diagram._resizingAdorner._hitTest(point);
            if (hit) {
                this.hoveredAdorner = d._resizingAdorner;
                if (hit.x !== 0 && hit.y !== 0) { // hit testing for resizers or rotator, otherwise if (0,0) than pass through.
                    return;
                }
                hit = undefined;
            }
            else {
                this.hoveredAdorner = undefined;
            }

            if (!this.activeTool || this.activeTool.type !== "ConnectionTool") {
                var selectedConnections = []; // only the connections should have higher presence because the connection edit point is on top of connector.
                // TODO: This should be reworked. The connection adorner should be one for all selected connections and should be hit tested prior the connections and shapes itself.
                for (i = 0; i < d._selectedItems.length; i++) {
                    item = d._selectedItems[i];
                    if (item instanceof diagram.Connection) {
                        selectedConnections.push(item);
                    }
                }
                hit = this._hitTestItems(selectedConnections, point);
            }
            // Shapes | Connectors
            return hit || this._hitTestItems(d.shapes, point) || this._hitTestItems(d.connections, point);
        },
        _hitTestItems: function (array, point) {
            var i, item, hit;
            for (i = array.length - 1; i >= 0; i--) {
                item = array[i];
                hit = item._hitTest(point);
                if (hit) {
                    return hit;
                }
            }
        },
        _finishEditShape: function () {
            if (!this.editShape) {
                return;
            }

            var unit = new ContentChangedUndoUnit(this.editShape, this.editable.originalContent, this.editable.content());
            this.diagram.undoRedoService.add(unit);
            this.editable.visible(false);
            this.editable = this.editShape = undefined;
        }
    });

// Routing =========================================

    /**
     * Base class for connection routers.
     */
    var ConnectionRouterBase = kendo.Class.extend({
        init: function () {
        }
        /*route: function (connection) {
         },
         hitTest: function (p) {

         },
         getBounds: function () {

         }*/
    });

    /**
     * Base class for polyline and cascading routing.
     */
    var LinearConnectionRouter = ConnectionRouterBase.extend({
        init: function (connection) {
            var that = this;
            ConnectionRouterBase.fn.init.call(that);
            this.connection = connection;
        },
        /**
         * Hit testing for polyline paths.
         */
        hitTest: function (p) {
            var rec = this.getBounds().inflate(10);
            if (!rec.contains(p)) {
                return false;
            }
            return kendo.diagram.Geometry.distanceToPolyline(p, this.connection.allPoints()) < HITTESTDISTANCE;
        },

        /**
         * Bounds of a polyline.
         * @returns {kendo.diagram.Rect}
         */
        getBounds: function () {
            var points = this.connection.allPoints(),
                s = points[0],
                e = points[points.length - 1],
                right = Math.max(s.x, e.x),
                left = Math.min(s.x, e.x),
                top = Math.min(s.y, e.y),
                bottom = Math.max(s.y, e.y);

            for (var i = 1; i < points.length - 1; ++i) {
                right = Math.max(right, points[i].x);
                left = Math.min(left, points[i].x);
                top = Math.min(top, points[i].y);
                bottom = Math.max(bottom, points[i].y);
            }

            return new Rect(left, top, right - left, bottom - top);
        }
    });

    /**
     * A simple poly-linear routing which does not alter the intermediate points.
     * Does hold the underlying hit, bounds....logic.
     * @type {*|Object|void|extend|Zepto.extend|b.extend}
     */
    var PolylineRouter = LinearConnectionRouter.extend({
        init: function (connection) {
            var that = this;
            LinearConnectionRouter.fn.init.call(that);
            this.connection = connection;
        },
        route: function () {
            // just keep the points as is
        }
    });

    var CascadingRouter = LinearConnectionRouter.extend({
        init: function (connection) {
            var that = this;
            LinearConnectionRouter.fn.init.call(that);
            this.connection = connection;
        },
        route: function () {
            var link = this.connection;
            var start = this.connection.sourcePoint();
            var end = this.connection.targetPoint(),
                points = [start, start, end, end],
                deltaX = end.x - start.x, // can be negative
                deltaY = end.y - start.y,
                l = points.length,
                shiftX,
                shiftY,
                sourceConnectorName = null,
                targetConnectorName = null;

            if (Utils.isDefined(link._resolvedSourceConnector)) {
                sourceConnectorName = link._resolvedSourceConnector.options.name;
            }
            if (Utils.isDefined(link._resolvedTargetConnector)) {
                targetConnectorName = link._resolvedTargetConnector.options.name;
            }
            function startHorizontal() {
                if (sourceConnectorName !== null) {
                    if (sourceConnectorName === RIGHT || sourceConnectorName === LEFT) {
                        return true;
                    }
                    if (sourceConnectorName === TOP || sourceConnectorName === BOTTOM) {
                        return false;
                    }
                }
                //fallback for custom connectors
                return Math.abs(start.x - end.x) > Math.abs(start.y - end.y);
            }

            if (sourceConnectorName !== null && targetConnectorName !== null && DEFAULTCONNECTORNAMES.contains(sourceConnectorName) && DEFAULTCONNECTORNAMES.contains(targetConnectorName)) {
                // custom routing for the default connectors
                if (sourceConnectorName === TOP || sourceConnectorName == BOTTOM) {
                    if (targetConnectorName == TOP || targetConnectorName == BOTTOM) {
                        this.connection.points([new Point(start.x, start.y + deltaY / 2), new Point(end.x, start.y + deltaY / 2)]);
                    } else {
                        this.connection.points([new Point(start.x, start.y + deltaY)]);
                    }
                } else { // LEFT or RIGHT
                    if (targetConnectorName == LEFT || targetConnectorName == RIGHT) {
                        this.connection.points([new Point(start.x + deltaX / 2, start.y), new Point(start.x + deltaX / 2, start.y + deltaY)]);
                    } else {
                        this.connection.points([new Point(end.x, start.y)]);
                    }
                }

            }
            else { // general case for custom and floating connectors
                this.connection.cascadeStartHorizontal = startHorizontal(this.connection);

                // note that this is more generic than needed for only two intermediate points.
                for (var k = 1; k < l - 1; ++k) {
                    if (link.cascadeStartHorizontal) {
                        if (k % 2 !== 0) {
                            shiftX = deltaX / (l / 2);
                            shiftY = 0;
                        }
                        else {
                            shiftX = 0;
                            shiftY = deltaY / ((l - 1) / 2);
                        }
                    }
                    else {
                        if (k % 2 !== 0) {
                            shiftX = 0;
                            shiftY = deltaY / (l / 2);
                        }
                        else {
                            shiftX = deltaX / ((l - 1) / 2);
                            shiftY = 0;
                        }
                    }
                    points[k] = new Point(points[k - 1].x + shiftX, points[k - 1].y + shiftY);
                }
                // need to fix the wrong 1.5 factor of the last intermediate point
                k--;
                if ((link.cascadeStartHorizontal && (k % 2 !== 0)) || (!link.cascadeStartHorizontal && (k % 2 === 0))) {
                    points[l - 2] = new Point(points[l - 1].x, points[l - 2].y);
                }
                else {
                    points[l - 2] = new Point(points[l - 2].x, points[l - 1].y);
                }

                this.connection.points([points[1], points[2]]);
            }
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
                if (that.refreshBounds) {
                    that.refreshBounds();
                }
                that.refresh();
            });
            that.diagram.bind("zoom", function () {
                if (that.refreshBounds) {
                    that.refreshBounds();
                }
                that.refresh();
            });
        },
        refresh: function () {

        }
    });

    var ConnectionEditAdorner = AdornerBase.extend({
        init: function (connection, options) {
            var that = this, diagram;
            that.connection = connection;
            diagram = that.connection.diagram;
            that._ts = diagram.toolService;
            AdornerBase.fn.init.call(that, diagram, options);
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
            switch (this.handle) {
                case -1:
                    if (this.connection.targetConnector) {
                        this._ts._connectionManipulation(this.connection, this.connection.targetConnector.shape);
                    }
                    break;
                case 1:
                    if (this.connection.sourceConnector) {
                        this._ts._connectionManipulation(this.connection, this.connection.sourceConnector.shape);
                    }
                    break;
            }
        },
        move: function (handle, p) {
            switch (handle) {
                case -1:
                    this.connection.source(p);
                    break;
                case 1:
                    this.connection.target(p);
                    break;
                default:
                    var delta = p.minus(this.startPoint);
                    this.startPoint = p;
                    if (!this.connection.sourceConnector) {
                        this.connection.source(this.connection.sourcePoint().plus(delta));
                    }
                    if (!this.connection.targetConnector) {
                        this.connection.target(this.connection.targetPoint().plus(delta));
                    }
                    break;
            }
            this.refresh();
            return true;
        },
        stop: function (p) {
            var ts = this.diagram.toolService, item = ts.hoveredItem, target;
            if (ts._hoveredConnector) {
                target = ts._hoveredConnector._c;
            } else if (item && !item.line) {
                target = item;
            }
            else {
                target = p;
            }
            if (this.handle !== undefined) {
                switch (this.handle) {
                    case -1:
                        this.connection.source(target);
                        break;
                    case 1:
                        this.connection.target(target);
                        break;
                }
            }

            this.handle = undefined;
            this._ts._connectionManipulation();
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
        init: function (diagram, options) {
            var that = this;
            AdornerBase.fn.init.call(that, diagram, options);
            that._refreshHandler = function (e) {
                if (e.item == that.shape) {
                    that.refresh();
                }
            };
        },
        show: function (shape) {
            var that = this, len, i, ctr;
            that._visible = true;
            that.shape = shape;
            that.diagram.bind("boundsChange", that._refreshHandler);
            len = shape.connectors.length;
            that.connectors = [];
            that.visual.clear();
            for (i = 0; i < len; i++) {
                ctr = new ConnectorVisual(shape.connectors[i]);
                that.connectors.push(ctr);
                that.visual.append(ctr.visual);
            }
            that.visual.visible(true);
            that.refresh();
        },
        destroy: function () {
            var that = this;
            that.diagram.unbind("boundsChange", that._refreshHandler);
            that.shape = undefined;
            that._visible = undefined;
            that.visual.visible(false);
        },
        _hitTest: function (p) {
            var ctr, i;
            for (i = 0; i < this.connectors.length; i++) {
                ctr = this.connectors[i];
                if (ctr._hitTest(p)) {
                    ctr._hover(true);
                    this.diagram.toolService._hoveredConnector = ctr;
                    break;
                }
            }
        },
        refresh: function () {
            if (this.shape) {
                var bounds = this.shape.visualBounds();
                this.visual.position(bounds.topLeft());
                $.each(this.connectors, function () {
                    this.refresh();
                });
            }
        }
    });

    function hitToOppositeSide(hit, bounds) {
        if (hit.x == -1 && hit.y == -1) {
            return bounds.bottomRight();
        }
        else if (hit.x == 1 && hit.y == 1) {
            return bounds.topLeft();
        }
        else if (hit.x == -1 && hit.y == 1) {
            return bounds.topRight();
        }
        else if (hit.x == 1 && hit.y == -1) {
            return bounds.bottomLeft();
        }
        else if (hit.x === 0 && hit.y == -1) {
            return bounds.bottom();
        }
        else if (hit.x === 0 && hit.y == 1) {
            return bounds.top();
        }
        else if (hit.x == 1 && hit.y === 0) {
            return bounds.left();
        }
        else if (hit.x == -1 && hit.y === 0) {
            return bounds.right();
        }
    }

    var ResizingAdorner = AdornerBase.extend({
        init: function (diagram, options) {
            var that = this;
            AdornerBase.fn.init.call(that, diagram, options);
            that._manipulating = false;
            that.map = [];
            this.shapes = [];
            if (that.options.resizable) {
                for (var x = -1; x <= 1; x++) {
                    for (var y = -1; y <= 1; y++) {
                        if ((x !== 0) || (y !== 0)) { // (0, 0) element, (-1, -1) top-left, (+1, +1) bottom-right
                            var visual = new Rectangle(that.options.handles);
                            that.map.push({ x: x, y: y, visual: visual });
                            that.visual.append(visual);
                        }
                    }
                }
            }
            that.text = new TextBlock();
            that.visual.append(that.text);
            that.rect = new Rectangle(that.options.rect);
            that.visual.append(that.rect);
            if (that.options.rotatable) {
                that.rotationThumb = new Path(that.options.rotationThumb);
                that.visual.append(that.rotationThumb);
            }
            that.diagram.bind("select", function (e) {
                that._initialize(e.items);
            });

            that._refreshHandler = function () {
                if (!that._internalChange) {
                    that.refreshBounds();
                    that.refresh();
                }
            };

            that._rotatedHandler = function () {
                if (that.shapes.length == 1) {
                    that._angle = that.shapes[0].rotate().angle;
                }
                that._refreshHandler();
            };

            that.diagram.bind("boundsChange", that._refreshHandler).bind("rotate", that._rotatedHandler);
            that.refreshBounds();
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
                strokeWidth: 1,
                strokeDashArray: "2, 2",
                background: "none"
            },
            rotationThumb: {
                data: "M6.50012,0C8.21795,2.56698e-009 9.78015,0.666358 10.9423,1.75469L11.0482,1.85645L12.6557,0.541992L12.697,6.41699L7,5.16667L8.69918,3.77724L8.68162,3.76281C8.08334,3.28539 7.32506,3 6.50012,3C4.56709,3 3.00006,4.567 3.00006,6.5C3.00006,8.433 4.56709,10 6.50012,10C7.82908,10 8.98505,9.25935 9.57775,8.16831L9.59433,8.13594L12.333,9.37087L12.2891,9.45914C11.2124,11.5613 9.02428,13 6.50012,13C2.9102,13 -7.45058e-008,10.0899 0,6.5C-7.45058e-008,2.91015 2.9102,2.93369e-009 6.50012,0z",
                y: -50,
                thumbWidth: 10
            },
            offset: 6
        },
        bounds: function (value) {
            if (value) {
                this._innerBounds = value.clone();
                this._bounds = this.diagram.transformRect(value).inflate(this.options.offset, this.options.offset);
            }
            else {
                return this._bounds;
            }
        },
        _hitTest: function (p) {
            var tp = this.diagram.transformPoint(p),
                i, hit, handleBounds, handlesCount = this.map.length, handle;
            if (this._angle) {
                tp = tp.clone().rotate(this._bounds.center(), this._angle);
            }
            if (this.options.rotatable && this._rotationThumbBounds) {
                if (this._rotationThumbBounds.contains(tp)) {
                    return new Point(-1, -2);
                }
            }
            if (this.options.resizable) {
                for (i = 0; i < handlesCount; i++) {
                    handle = this.map[i];
                    hit = new Point(handle.x, handle.y);
                    handleBounds = this._getHandleBounds(hit); //local coordinates
                    handleBounds.offset(this._bounds.x, this._bounds.y);
                    if (handleBounds.contains(tp)) {
                        return hit;
                    }
                }
            }
            if (this._bounds.contains(tp)) {
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
                var angle = this._angle;
                if (angle) {
                    angle = 360 - angle;
                    hit.rotate(new Point(0, 0), angle);
                    hit = new Point(Math.round(hit.x), Math.round(hit.y));
                }
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
            return this._manipulating ? Cursors.move : Cursors.select;
        },
        _initialize: function (items) {
            var that = this, i, item;
            if (!items) {
                items = this.diagram.select();
            }
            that.shapes = [];
            for (i = 0; i < items.length; i++) {
                item = items[i];
                if (item instanceof diagram.Shape) {
                    that.shapes.push(item);
                    item._rotationOffset = new Point();
                }
            }

            that._angle = that.shapes.length == 1 ? that.shapes[0].rotate().angle : 0;
            that._startAngle = that._angle;
            that._rotates();
            that._positions();
            that.refreshBounds();
            that.refresh();
        },
        _rotates: function () {
            var that = this, i, shape;
            that.initialRotates = [];
            for (i = 0; i < that.shapes.length; i++) {
                shape = that.shapes[i];
                that.initialRotates.push(shape.rotate().angle);
            }
        },
        _positions: function () {
            var that = this, i, shape;
            that.initialStates = [];
            for (i = 0; i < that.shapes.length; i++) {
                shape = that.shapes[i];
                that.initialStates.push(shape.bounds());
            }
        },
        _hover: function () {
        },
        start: function (p) {
            this._sp = p;
            this._cp = p;
            this._manipulating = true;
            this._internalChange = true;
            this.shapeStates = [];
            for (var i = 0; i < this.shapes.length; i++) {
                var shape = this.shapes[i];
                this.shapeStates.push(shape.bounds());
            }
        },
        move: function (handle, p) {
            var delta = p.minus(this._cp), dragging,
                dtl = new Point(), dbr = new Point(), bounds,
                center, shape, i, angle, newBounds, changed = 0, staticPoint, scaleX, scaleY;
            if (handle.y === -2 && handle.x === -1) {
                center = this._innerBounds.center();
                this._angle = Math.findAngle(center, p);
                for (i = 0; i < this.shapes.length; i++) {
                    shape = this.shapes[i];
                    angle = (this._angle + this.initialRotates[i] - this._startAngle) % 360;
                    shape.rotate(angle, center);
                    this._rotating = true;
                }
                this.refresh();
            } else {
                if (handle.x === 0 && handle.y === 0) {
                    dbr = dtl = delta; // dragging
                    dragging = true;
                }
                else {
                    if (this._angle) { // adjust the delta so that resizers resize in the correct direction after rotation.
                        delta.rotate(new Point(0, 0), this._angle);
                    }
                    if (handle.x == -1) {
                        dtl.x = delta.x;
                    }
                    else if (handle.x == 1) {
                        dbr.x = delta.x;
                    }
                    if (handle.y == -1) {
                        dtl.y = delta.y;
                    }
                    else if (handle.y == 1) {
                        dbr.y = delta.y;
                    }
                }

                if (!dragging) {
                    staticPoint = hitToOppositeSide(handle, this._innerBounds);
                    scaleX = (this._innerBounds.width + delta.x * handle.x) / this._innerBounds.width;
                    scaleY = (this._innerBounds.height + delta.y * handle.y) / this._innerBounds.height;
                }
                for (i = 0; i < this.shapes.length; i++) {
                    shape = this.shapes[i];
                    bounds = shape.bounds();
                    if (dragging) {
                        newBounds = this._displaceBounds(bounds, dtl, dbr, dragging);
                    }
                    else {
                        newBounds = bounds.clone();
                        newBounds.scale(scaleX, scaleY, staticPoint, this._innerBounds.center(), shape.rotate().angle);
                        var newCenter = newBounds.center(); // fixes the new rotation center.
                        newCenter.rotate(bounds.center(), -this._angle);
                        newBounds = new Rect(newCenter.x - newBounds.width / 2, newCenter.y - newBounds.height / 2, newBounds.width, newBounds.height);
                    }
                    if (newBounds.width >= shape.options.minWidth && newBounds.height >= shape.options.minHeight) {
                        shape.bounds(newBounds);
                        shape.rotate(shape.rotate().angle); // forces the rotation to update it's rotation center
                        changed += 1;
                    }
                }

                if (changed == i) {
                    newBounds = this._displaceBounds(this._innerBounds, dtl, dbr, dragging);
                    this.bounds(newBounds);
                    this.refresh();
                }
                this._positions();
            }

            this._cp = p;
        },
        _displaceBounds: function (bounds, dtl, dbr, dragging) {
            var tl = bounds.topLeft().plus(dtl),
                br = bounds.bottomRight().plus(dbr),
                newBounds = Rect.fromPoints(tl, br),
                newCenter;
            if (!dragging) {
                newCenter = newBounds.center();
                newCenter.rotate(bounds.center(), -this._angle);
                newBounds = new Rect(newCenter.x - newBounds.width / 2, newCenter.y - newBounds.height / 2, newBounds.width, newBounds.height);
            }
            return newBounds;
        },
        stop: function () {
            var unit;
            if (this._cp != this._sp) {
                if (this._rotating) {
                    unit = new RotateUnit(this, this.shapes, this.initialRotates);
                    this._rotating = false;
                }
                else {
                    unit = new TransformUnit(this.shapes, this.shapeStates, this);
                }
            }

            this._manipulating = undefined;
            this._internalChange = undefined;
            this._rotating = undefined;
            return unit;
        },
        refreshBounds: function () {
            var bounds = this.shapes.length == 1 ? this.shapes[0].bounds().clone() : this.diagram.getOriginBoundingBox(this.shapes);
            this.bounds(bounds);
        },
        refresh: function () {
            var that = this, b, bounds;
            bounds = this.bounds();
            if (this.shapes.length > 0) {
                this.visual.visible(true);
                this.visual.position(bounds.topLeft());
                $.each(this.map, function () {
                    b = that._getHandleBounds(new Point(this.x, this.y));
                    this.visual.position(b.topLeft());
                });
                this.text.position(new Point(0, bounds.height + 20));
                this.text.content(kendo.format("x: {0}, y: {1}, w: {2}, h: {3} a: {4}",
                    Math.round(bounds.x), Math.round(bounds.y), Math.round(bounds.width), Math.round(bounds.height), Math.round(this._angle)
                ));
                this.visual.position(bounds.topLeft());

                var center = new Point(bounds.width / 2, bounds.height / 2);
                this.visual.rotate(this._angle, center);
                this.rect.redraw({width: bounds.width, height: bounds.height});
                if (this.rotationThumb) {
                    this._rotationThumbBounds = new Rect(bounds.center().x, bounds.y + this.options.rotationThumb.y, 0, 0).inflate(this.options.rotationThumb.thumbWidth);
                    this.rotationThumb.redraw({x: bounds.width / 2 - this.options.rotationThumb.thumbWidth / 2});
                }
            }
            else {
                this.visual.visible(false);
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
            var visualBounds = Rect.fromPoints(this.diagram.transformPoint(this._sp), this.diagram.transformPoint(this._ep));
            this.bounds(Rect.fromPoints(this._sp, this._ep));
            this.visual.position(visualBounds.topLeft());
            this.visual.redraw({ height: visualBounds.height + 1, width: visualBounds.width + 1 });
        }
    });

    var ConnectorVisual = Class.extend({
        init: function (connector) {
            this.options = deepExtend({}, connector.options);
            this._c = connector;
            this.visual = new Circle(this.options);
            this.refresh();
            this.visual.setAtr("class", "cssClass");
        },
        _hover: function (value) {
            this.visual.background(value ? this.options.hoveredBackground : this.options.background);
        },
        refresh: function () {
            var p = this._c.shape.diagram.transformPoint(this._c.position()),
                relative = p.minus(this._c.shape.visualBounds().topLeft()),
                value = new Rect(p.x, p.y, 0, 0);
            value.inflate(this.options.width / 2, this.options.height / 2);
            this._visualBounds = value;
            this.visual.redraw({ center: new Point(relative.x, relative.y) });
        },
        _hitTest: function (p) {
            var tp = this._c.shape.diagram.transformPoint(p);
            return this._visualBounds.contains(tp);
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
        ConnectorsAdorner: ConnectorsAdorner,
        LayoutUndoUnit: LayoutUndoUnit,
        ConnectionEditUnit: ConnectionEditUnit,
        ToFrontUnit: ToFrontUnit,
        ToBackUnit: ToBackUnit,
        ConnectionRouterBase: ConnectionRouterBase,
        PolylineRouter: PolylineRouter,
        CascadingRouter: CascadingRouter
    });
})(window.kendo.jQuery);
