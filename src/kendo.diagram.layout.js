kendo_module({
    id: "diagram",
    name: "Diagram Layout",
    category: "diagram",
    depends: ["diagram.math"]
});
(function ($, undefined) {
    var kendo = window.kendo,
        diagram = kendo.diagram,
        Graph = kendo.diagram.Graph,
        Node = kendo.diagram.Node,
        Link = kendo.diagram.Link,
        deepExtend = kendo.deepExtend,
        dataviz = kendo.dataviz,
        Size = kendo.diagram.Size,
        Rect = kendo.diagram.Rect,
        Dictionary = kendo.diagram.Dictionary,
        HashTable = kendo.diagram.HashTable,
        Queue = kendo.diagram.Queue,
        Set = kendo.diagram.Set,
        Point = dataviz.Point2D;

    /**
     * Base class for layout algorithms.
     * @type {*}
     */
    var LayoutBase = kendo.Class.extend({
        defaultOptions: null,
        init: function () {
            this.defaultOptions = {
                /**
                 * Force-directed option: whether the motion of the nodes should be limited by the boundaries of the diagram surface.
                 */
                limitToView: false,
                /**
                 * Force-directed option: the amount of friction applied to the motion of the nodes.
                 */
                friction: 0.9,

                requiresSimpleGraph: true,
                nodeDistance: 50,
                iterations: 300,
                treeLayoutType: kendo.diagram.TreeLayoutType.TreeDown,
                horizontalSeparation: 90,
                verticalSeparation: 50,
                underneathVerticalTopOffset: 15,
                underneathHorizontalOffset: 15,
                underneathVerticalSeparation: 15,
                radialSeparation: 150,
                radialFirstLevelSeparation: 200,
                componentsGridWidth: 5000, // TODO: default should be 800
                totalMargin: new Size(50, 50),
                componentMargin: new Size(20, 20),
                keepComponentsInOneRadialLayout: false,
                animateTransitions: false,
                startRadialAngle: 0,
                roots: null,
                layerDistance: 25,
                layeredLayoutType: kendo.diagram.LayeredLayoutType.Right,
                siftingRounds: 2,
                keepGroupLayout: false,
                endRadialAngle: 2 * Math.PI,
                // TODO: ensure to change this to false when containers are around
                ignoreContainers: true,
                layoutContainerChildren: false,
                ignoreInvisible: true
            };
        },

        /**
         * Organizes the components in a grid.
         * @param components
         */
        gridLayoutComponents: function (components) {
            if (components == null) {
                throw "No components supplied.";
            }

            // calculate and cache the bounds of the components
            components.forEach(function (c) {
                c.calcBounds();
            })

            // order by decreasing width
            components.sort(function (a, b) {
                return b.bounds.width - a.bounds.width;
            })

            var maxWidth = this.options.componentsGridWidth,
                offsetX = this.options.componentMargin.width,
                offsetY = this.options.componentMargin.height,
                height = 0,
                startX = this.options.totalMargin.width,
                startY = this.options.totalMargin.height,
                x = startX,
                y = startY;
            while (components.length > 0) {
                if (x >= maxWidth) {
                    // start a new row
                    x = startX;
                    y += height + offsetY;
                    // reset the row height
                    height = 0;
                }
                var component = components.pop();
                this.moveToOffset(component, new Point(x, y));

                for (var j = 0; j < component.nodes.length; j++) {
                    var node = component.nodes[j];
                    if (node.associatedShape) {// not virtual
                        var shape = node.associatedShape;
                        shape.bounds(new Rect(node.x, node.y, node.width, node.height));
                    }
                }

                var boundingRect = component.bounds;
                var currentHeight = boundingRect.height;
                if (currentHeight <= 0 || isNaN(currentHeight)) {
                    currentHeight = 0;
                }
                var currentWidth = boundingRect.width;
                if (currentWidth <= 0 || isNaN(currentWidth)) {
                    currentWidth = 0;
                }

                if (currentHeight >= height) {
                    height = currentHeight;
                }
                x += currentWidth + offsetX;
            }

        },

        moveToOffset: function (component, p) {
            var bounds = component.bounds;
            var deltax = p.x - bounds.x;
            var deltay = p.y - bounds.y;

            for (var i = 0, len = component.nodes.length; i < len; i++) {
                var node = component.nodes[i];
                var nodeBounds = node.bounds();
                if (nodeBounds == Rect.Empty) {
                    nodeBounds = new Rect(0, 0, 0, 0);
                }
                nodeBounds.x += deltax;
                nodeBounds.y += deltay;
                node.bounds(nodeBounds);
            }
            for (var i = 0; i < component.links.length; i++) {
                var link = component.links[i];
                if (link.points != null) {
                    var newpoints = [];
                    var points = link.points;
                    for (var j = 0; j < points.length; j++) {
                        var p = points[j];
                        p.x += deltax;
                        p.y += deltay;
                        newpoints.push(p);
                    }
                    link.points = newpoints;
                }
            }
            this.currentHorizontalOffset += bounds.width + this.options.totalMargin.width;
            return new Point(deltax, deltay);
        },

        transferOptions: function (options) {

            // Size options lead to stackoverflow and need special handling

            this.options = this.defaultOptions;
            if (isUndefined(options)) {
                return;
            }
            if (options) {
                if (options["totalMargin"]) {
                    this.options["totalMargin"] = options["totalMargin"];
                    delete options["totalMargin"];
                }
                if (options["componentMargin"]) {
                    this.options["componentMargin"] = options["componentMargin"];
                    delete options["componentMargin"];
                }
            }
            this.options = kendo.deepExtend(this.options, options || {})
        }
    })

    /**
     * The data bucket a hypertree holds in its nodes.     *
     * @type {*}
     */
    var ContainerGraph = kendo.Class.extend({
        init: function (diagram) {
            this.diagram = diagram;
            this.graph = new Graph(diagram);
            this.container = null;
            this.containerNode = null;
        }

    });

    /**
     * Adapter between the diagram control and the graph representation. It converts shape and connections to nodes and edges taking into the containers and their collapsef state,
     * the visibility of items and more. If the layoutContainerChildren is true a hypertree is constructed which holds the hierarchy of containers and many conditions are analyzed
     * to investigate how the effective graph structure looks like and how the layout has to be performed.
     * @type {*}
     */
    var DiagramToHyperTreeAdapter = kendo.Class.extend({
        init: function (diagram) {

            /**
             * The mapping to/from the original nodes.
             * @type {Dictionary}
             */
            this.nodeMap = new Dictionary();

            /**
             * Gets the mapping of a shape to a container in case the shape sits in a collapsed container.
             * @type {Dictionary}
             */
            this.shapeMap = new Dictionary();

            /**
             * The nodes being mapped.
             * @type {Dictionary}
             */
            this.nodes = [];

            /**
             * The connections being mapped.
             * @type {Dictionary}
             */
            this.edges = [];

            // the mapping from an edge to all the connections it represents, this can be both because of multiple connections between
            // two shapes or because a container holds multiple connections to another shape or container.
            this.edgeMap = new Dictionary();

            /**
             * The resulting set of Nodes when the analysis has finished.
             * @type {Array}
             */
            this.finalNodes = [];

            /**
             * The resulting set of Links when the analysis has finished.
             * @type {Array}
             */
            this.finalLinks = [];

            /**
             * The items being omitted because of multigraph edges.
             * @type {Array}
             */
            this.ignoredConnections = [];

            /**
             * The items being omitted because of containers, visibility and other factors.
             * @type {Array}
             */
            this.ignoredShapes = [];

            /**
             * The map from a node to the partition/hypernode in which it sits. This hyperMap is null if 'options.layoutContainerChildren' is false.
             * @type {Dictionary}
             */
            this.hyperMap = new Dictionary();

            /**
             * The hypertree contains the hierarchy defined by the containers.
             * It's in essence a Graph of Graphs with a tree structure defined by the hierarchy of containers.
             * @type {HyperTree}
             */
            this.hyperTree = new Graph();

            /**
             * The resulting graph after conversion. Note that this does not supply the information contained in the
             * ignored connection and shape collections.
             * @type {null}
             */
            this.finalGraph = null;

            this.diagram = diagram;
        },

        /**
         * The hyperTree is used when the 'options.layoutContainerChildren' is true. It contains the hierarchy of containers whereby each node is a ContainerGraph.
         * This type of node has a Container reference to the container which holds the Graph items. There are three possible situations during the conversion process:
         *  - Ignore the containers: the container are non-existent and only normal shapes are mapped. If a shape has a connection to a container it will be ignored as well
         *    since there is no node mapped for the container.
         *  - Do not ignore the containers and leave the content of the containers untouched: the top-level elements are being mapped and the children within a container are not altered.
         *  - Do not ignore the containers and organize the content of the containers as well: the hypertree is constructed and there is a partitioning of all nodes and connections into the hypertree.
         *    The only reason a connection or node is not being mapped might be due to the visibility, which includes the visibility change through a collapsed parent container.
         * @param options
         */
        convert: function (options) {

            if (isUndefined(this.diagram)) {
                throw "No diagram to convert.";
            }

            this.options = kendo.deepExtend({
                    ignoreInvisible: true,
                    ignoreContainers: true,
                    layoutContainerChildren: false
                },
                options || {}
            );

            this.clear();
            // create the nodes which participate effectively in the graph analysis
            this._renormalizeShapes();

            // recreate the incoming and outgoing collections of each and every node
            this._renormalizeConnections();

            // export the resulting graph
            this.finalNodes = new Dictionary(this.nodes);
            this.finalLinks = new Dictionary(this.edges);

            this.finalGraph = new Graph();
            this.finalNodes.forEach(function (n) {
                this.finalGraph.addNode(n);
            }, this)
            this.finalLinks.forEach(function (l) {
                this.finalGraph.addExistingLink(l);
            }, this)
            return this.finalGraph;
        },

        /**
         * Maps the specified connection to an edge of the graph deduced from the given diagram.
         * @param connection
         * @returns {*}
         */
        mapConnection: function (connection) {
            return this.edgeMap.first(function (edge) {
                return this.edgeMap.get(edge).contains(connection);
            });
        },

        /**
         * Maps the specified shape to a node of the graph deduced from the given diagram.
         * @param shape
         * @returns {*}
         */
        mapShape: function (shape) {
            var keys = this.nodeMap.keys();
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                if (this.nodeMap.get(key).contains(shape)) {
                    return key;
                }
            }
        },

        /**
         * Gets the edge, if any, between the given nodes.
         * @param a
         * @param b
         */
        getEdge: function (a, b) {
            return a.links.first(function (link) {
                return link.getComplement(a) == b;
            })
        },

        /**
         * Clears all the collections used by the conversion process.
         */
        clear: function () {
            this.finalGraph = null;
            this.hyperTree = (!this.options.ignoreContainers && this.options.layoutContainerChildren) ? new HyperTree() : null;
            this.hyperMap = (!this.options.ignoreContainers && this.options.layoutContainerChildren) ? new Dictionary() : null;
            this.nodeMap = new Dictionary();
            this.shapeMap = new Dictionary();
            this.nodes = [];
            this.edges = [];
            this.edgeMap = new Dictionary();
            this.ignoredConnections = [];
            this.ignoredShapes = [];
            this.finalNodes = [];
            this.finalLinks = [];
        },

        /**
         * The path from a given ContainerGraph to the root (container).
         * @param containerGraph
         * @returns {Array}
         */
        listToRoot: function (containerGraph) {
            var list = [];
            var s = containerGraph.container;
            if (s == null) {
                return list;
            }
            list.add(s);
            while (s.parentContainer != null) {
                s = s.parentContainer;
                list.add(s);
            }
            list.reverse();
            return list;
        },

        firstNonIgnorableContainer: function (shape) {

            if (shape.isContainer && !this._isIgnorableItem(shape)) {
                return shape;
            }
            return shape.parentContainer == null ? null : this.firstNonIgnorableContainer(shape.parentContainer);
        },
        isContainerConnection: function (a, b) {
            if (a.isContainer && this.isDescendantOf(a, b)) {
                return true;
            }
            return b.isContainer && this.isDescendantOf(b, a);
        },

        /**
         * Returns true if the given shape is a direct child or a nested container child of the given container.
         * If the given container and shape are the same this will return false since a shape cannot be its own child.
         * @param scope
         * @param a
         * @returns {boolean}
         */
        isDescendantOf: function (scope, a) {
            if (!scope.isContainer) {
                throw "Expecting a container.";
            }
            if (scope == a) {
                return false;
            }
            if (scope.children.contains(a)) {
                return true;
            }
            var containers = [];
            for (var i = 0, len = scope.children.length; i < len; i++) {
                var c = scope.children[i];
                if (c.isContainer && this.isDescendantOf(c, a)) {
                    containers.push(c);
                }
            }

            return containers.length > 0
        },
        isIgnorableItem: function (shape) {
            if (this.options.ignoreInvisible) {
                if (shape.isCollapsed && this._isVisible(shape)) {
                    return false;
                }
                if (!shape.isCollapsed && this._isVisible(shape)) {
                    return false;
                }
                return true;
            }
            else {
                return shape.isCollapsed && !this._isTop(shape);
            }
        },

        /**
         *  Determines whether the shape is or needs to be mapped to another shape. This occurs essentially when the shape sits in
         * a collapsed container hierarchy and an external connection needs a node endpoint. This node then corresponds to the mapped shape and is
         * necessarily a container in the parent hierarchy of the shape.
         * @param shape
         */
        isShapeMapped: function (shape) {
            shape.isCollapsed && !this._isVisible(shape) && !this._isTop(shape);
        },

        leastCommonAncestor: function (a, b) {
            if (a == null) {
                throw "Parameter should not be null.";
            }
            if (b == null) {
                throw "Parameter should not be null.";
            }

            if (this.hyperTree == null) {
                throw "No hypertree available.";
            }
            var al = this.listToRoot(a);
            var bl = this.listToRoot(b);
            var found = null;
            if (al.isEmpty() || bl.isEmpty()) {
                return this.hyperTree.root.data;
            }
            var xa = al[0];
            var xb = bl[0];
            var i = 0;
            while (xa == xb) {
                found = al[i];
                i++;
                if (i >= al.length || i >= bl.length) {
                    break;
                }
                xa = al[i];
                xb = bl[i];
            }
            if (found == null) {
                return this.hyperTree.root.data
            }
            else {
                return this.hyperTree.nodes.where(function (n) {
                    n.data.container == found;
                });
            }
        },
        /**
         * Determines whether the specified item is a top-level shape or container.
         * @param item
         * @returns {boolean}
         * @private
         */
        _isTop: function (item) {
            return item.parentContainer == null;
        },

        /**
         * Determines iteratively (by walking up the container stack) whether the specified shape is visible.
         * This does NOT tell whether the item is not visible due to an explicit Visibility change or due to a collapse state.
         * @param shape
         * @returns {*}
         * @private
         */
        _isVisible: function (shape) {

            if (!shape.visible()) {
                return false;
            }
            return shape.parentContainer == null ? shape.visible() : this._isVisible(shape.parentContainer);
        },

        _isCollapsed: function (shape) {

            if (shape.isContainer && shape.isCollapsed) {
                return true;
            }
            return shape.parentContainer != null && this._isCollapsed(shape.parentContainer);
        },

        /**
         * First part of the graph creation; analyzing the shapes and containers and deciding whether they should be mapped to a Node.
         * @private
         */
        _renormalizeShapes: function () {
            // add the nodes, the adjacency structure will be reconstructed later on
            if (this.options.ignoreContainers) {
                for (var i = 0, len = this.diagram.shapes.length; i < len; i++) {
                    var shape = this.diagram.shapes[i];

                    // if not visible (and ignoring the invisible ones) or a container we skip
                    if ((this.options.ignoreInvisible && !this._isVisible(shape)) || shape.isContainer) {
                        this.ignoredShapes.add(shape);
                        continue;
                    }
                    var node = new Node(shape.id, shape);
                    node.isVirtual = false;

                    // the mapping will always contain singletons and the hyperTree will be null
                    this.nodeMap.add(node, [shape]);
                    this.nodes.add(node);
                }
            }
            else {
                throw "Containers are not supported yet, but stay tuned.";
            }
        },

        /**
         * Second part of the graph creation; analyzing the connections and deciding whether they should be mapped to an edge.
         * @private
         */
        _renormalizeConnections: function () {
            if (this.diagram.connections.length == 0) {
                return;
            }
            for (var i = 0, len = this.diagram.connections.length; i < len; i++) {
                var conn = this.diagram.connections[i];

                if (this.isIgnorableItem(conn)) {
                    this.ignoredConnections.add(conn);
                    continue;
                }

                var source = conn.sourceConnector == null ? null : conn.sourceConnector.shape;
                var sink = conn.targetConnector == null ? null : conn.targetConnector.shape;

                // no layout for floating connections
                if (source == null || sink == null) {
                    this.ignoredConnections.add(conn);
                    continue;
                }

                if (this.ignoredShapes.contains(source) && !this.shapeMap.containsKey(source)) {
                    this.ignoredConnections.add(conn);
                    continue;
                }
                if (this.ignoredShapes.contains(sink) && !this.shapeMap.containsKey(sink)) {
                    this.ignoredConnections.add(conn);
                    continue;
                }

                // if the endpoint sits in a collapsed container we need the container rather than the shape itself
                if (this.shapeMap.containsKey(source)) {
                    source = this.shapeMap[source];
                }
                if (this.shapeMap.containsKey(sink)) {
                    sink = this.shapeMap[sink];
                }

                var sourceNode = this.mapShape(source);
                var sinkNode = this.mapShape(sink);
                if ((sourceNode == sinkNode) || this.areConnectedAlready(sourceNode, sinkNode)) {
                    this.ignoredConnections.add(conn);
                    continue;
                }

                if (sourceNode == null || sinkNode == null) {
                    throw "A shape was not mapped to a node.";
                }
                if (this.options.ignoreContainers) {
                    // much like a floating connection here since at least one end is attached to a container
                    if (sourceNode.isVirtual || sinkNode.isVirtual) {
                        this.ignoredConnections.add(conn);
                        continue;
                    }
                    var newEdge = new Link(sourceNode, sinkNode, conn.id, conn);

                    this.edgeMap.add(newEdge, [conn]);
                    this.edges.add(newEdge);
                }
                else {
                    throw "Containers are not supported yet, but stay tuned.";
                }
            }
        },

        areConnectedAlready: function (n, m) {
            return this.edges.any(function (l) {
                return l.source == n && l.target == m || l.source == m && l.target == n;
            })
        },

        /**
         * Depth-first traversal of the given container.
         * @param container
         * @param action
         * @param includeStart
         * @private
         */
        _visitContainer: function (container, action, includeStart) {

            /*if (container == null) throw new ArgumentNullException("container");
             if (action == null) throw new ArgumentNullException("action");
             if (includeStart) action(container);
             if (container.children.isEmpty()) return;
             foreach(
             var item
             in
             container.children.OfType < IShape > ()
             )
             {
             var childContainer = item
             as
             IContainerShape;
             if (childContainer != null) this.VisitContainer(childContainer, action);
             else action(item);
             }*/
        }


    })

    /**
     * The classic spring-embedder (aka force-directed, Fruchterman-Rheingold, barycentric) algorithm.
     * http://en.wikipedia.org/wiki/Force-directed_graph_drawing
     *  - Chapter 12 of Tamassia et al. "Handbook of graph drawing and visualization".
     *  - Kobourov on preprint arXiv; http://arxiv.org/pdf/1201.3011.pdf
     *  - Fruchterman and Rheingold in SOFTWARE-PRACTICE AND EXPERIENCE, VOL. 21(1 1), 1129-1164 (NOVEMBER 1991)
     * @type {*}
     */
    var SpringLayout = LayoutBase.extend({
        init: function (diagram) {
            var that = this;
            LayoutBase.fn.init.call(that);
            if (isUndefined(diagram)) {
                throw "Diagram is not specified.";
            }
            this.diagram = diagram;
        },

        layout: function (options) {

            this.transferOptions(options);

            var adapter = new DiagramToHyperTreeAdapter(this.diagram);
            var graph = adapter.convert(options);
            if (graph.isEmpty()) {
                return;
            }
            // split into connected components
            var components = graph.getConnectedComponents();
            if (components.isEmpty()) {
                return;
            }
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                this.layoutGraph(component, options);
            }
            this.gridLayoutComponents(components);
            for (var i = 0, len = graph.nodes.length; i < len; i++) {
                var node = graph.nodes[i];
                var shape = node.associatedShape;
                shape.bounds(new Rect(node.x, node.y, node.width, node.height));
            }
        },

        layoutGraph: function (graph, options) {

            if (isDefined(options)) {
                this.transferOptions(options);
            }
            this.graph = graph;

            var initialTemperature = this.options.nodeDistance * 9;
            this.temperature = initialTemperature;

            var guessBounds = this._expectedBounds();
            this.width = guessBounds.width;
            this.height = guessBounds.height;

            for (var step = 0; step < this.options.iterations; step++) {
                this.refineStage = step >= this.options.iterations * 5 / 6;
                this.tick();
                // exponential cooldown
                this.temperature = this.refineStage ?
                    initialTemperature / 30 :
                    initialTemperature * (1 - step / (2 * this.options.iterations ));
            }
        },

        /**
         * Single iteration of the simulation.
         */
        tick: function () {
            // collect the repulsive forces on each node
            for (var i = 0; i < this.graph.nodes.length; i++) {
                this._repulsion(this.graph.nodes[i]);
            }

            // collect the attractive forces on each node
            for (var i = 0; i < this.graph.links.length; i++) {
                this._attraction(this.graph.links[i]);
            }
            // update the positions
            for (var i = 0, len = this.graph.nodes.length; i < len; i++) {
                var node = this.graph.nodes[i];
                var offset = Math.sqrt(node.dx * node.dx + node.dy * node.dy);
                if (offset == 0) {
                    return;
                }
                node.x += Math.min(offset, this.temperature) * node.dx / offset;
                node.y += Math.min(offset, this.temperature) * node.dy / offset;
                if (this.options.limitToView) {
                    node.x = Math.min(this.width, Math.max(node.width / 2, node.x));
                    node.y = Math.min(this.height, Math.max(node.height / 2, node.y));
                }
            }
        },

        /**
         * Shakes the node away from its current position to escape the deadlock.
         * @param node A Node.
         * @private
         */
        _shake: function (node) {
            // just a simple polar neighborhood
            var rho = Math.random() * this.options.nodeDistance / 4;
            var alpha = Math.random() * 2 * Math.PI;
            node.x += rho * Math.cos(alpha);
            node.y -= rho * Math.sin(alpha);
        },

        /**
         * The typical Coulomb-Newton force law F=k/r^2
         * @remark This only works in dimensions less than three.
         * @param d
         * @param n A Node.
         * @param m Another Node.
         * @returns {number}
         * @private
         */
        _InverseSquareForce: function (d, n, m) {
            var force;
            if (!this.refineStage) {
                force = Math.pow(d, 2) / Math.pow(this.options.nodeDistance, 2);
            }
            else {
                var deltax = n.x - m.x;
                var deltay = n.y - m.y;

                var wn = n.width / 2;
                var hn = n.height / 2;
                var wm = m.width / 2;
                var hm = m.height / 2;

                force = (Math.pow(deltax, 2) / Math.pow(wn + wm + this.options.nodeDistance, 2)) + (Math.pow(deltay, 2) / Math.pow(hn + hm + this.options.nodeDistance, 2));
            }
            return force * 4 / 3;
        },

        /**
         * The typical Hooke force law F=kr^2
         * @param d
         * @param n
         * @param m
         * @returns {number}
         * @private
         */
        _SquareForce: function (d, n, m) {
            return 1 / this._InverseSquareForce(d, n, m);
        },

        _repulsion: function (n) {
            n.dx = 0;
            n.dy = 0;
            this.graph.nodes.forEach(function (m) {
                if (m == n) {
                    return;
                }
                while (n.x == m.x && n.y == m.y) {
                    this._shake(m);
                }
                var vx = n.x - m.x;
                var vy = n.y - m.y;
                var distance = Math.sqrt(vx * vx + vy * vy);
                var r = this._SquareForce(distance, n, m) * 2;
                n.dx += (vx / distance) * r;
                n.dy += (vy / distance) * r;
            }, this);
        },
        _attraction: function (link) {
            var t = link.target;
            var s = link.source;
            if (s == t) {
                // loops induce endless shakes
                return;
            }
            while (s.x == t.x && s.y == t.y) {
                this._shake(t);
            }

            var vx = s.x - t.x;
            var vy = s.y - t.y;
            var distance = Math.sqrt(vx * vx + vy * vy);

            var a = this._InverseSquareForce(distance, s, t) * 5;
            var dx = (vx / distance) * a;
            var dy = (vy / distance) * a;
            t.dx += dx;
            t.dy += dy;
            s.dx -= dx;
            s.dy -= dy;
        },

        /**
         * Calculates the expected bounds after layout.
         * @returns {*}
         * @private
         */
        _expectedBounds: function () {

            var size, N = this.graph.nodes.length, /*golden ration optimal?*/ ratio = 1.5, multiplier = 4;
            if (N == 0) {
                return size;
            }
            size = this.graph.nodes.fold(function (s, node) {
                var area = node.width * node.height;
                if (area > 0) {
                    s += Math.sqrt(area);
                    return s;
                }
                return 0;
            }, 0, this);
            var av = size / N;
            var squareSize = av * Math.ceil(Math.sqrt(N));
            var width = squareSize * Math.sqrt(ratio);
            var height = squareSize / Math.sqrt(ratio);
            return { width: width * multiplier, height: height * multiplier };
        }

    })

    var TreeLayoutProcessor = kendo.Class.extend({

        init: function (options) {
            this.center = null;
            this.options = options;
        },
        layout: function (treeGraph, root) {
            this.graph = treeGraph;
            if (this.graph.nodes == null || this.graph.nodes.length == 0) {
                return;
            }

            if (!this.graph.nodes.contains(root)) {
                throw "The given root is not in the graph.";
            }

            this.center = root;
            this.graph.cacheRelationships();
            /* var nonull = this.graph.nodes.where(function (n) {
             return n.associatedShape != null;
             });*/

            // transfer the rects
            /*nonull.forEach(function (n) {
             n.Location = n.associatedShape.Position;
             n.NodeSize = n.associatedShape.ActualBounds.ToSize();
             }

             );*/

            // caching the children
            /* nonull.forEach(function (n) {
             n.children = n.getChildren();
             });*/

            this.layoutSwitch();

            // apply the layout to the actual visuals
            // nonull.ForEach(n => n.associatedShape.Position = n.Location);
        },

        layoutLeft: function (left) {
            this.setChildrenDirection(this.center, kendo.diagram.TreeDirection.Left, false);
            this.setChildrenLayout(this.center, kendo.diagram.ChildrenLayout.Default, false);
            var h = 0, w = 0, y;
            for (var i = 0, len = left.length; i < len; i++) {
                var node = left[i];
                node.TreeDirection = kendo.diagram.TreeDirection.Left;
                var s = this.measure(node, Size.Empty);
                w = Math.max(w, s.Width);
                h += s.height + this.options.verticalSeparation;
            }

            h -= this.options.verticalSeparation;
            var x = this.center.x - this.options.horizontalSeparation;
            y = this.center.y + ((this.center.height - h) / 2);
            for (var i = 0, len = left.length; i < len; i++) {
                var node = left[i];
                var p = new Point(x - node.Size.width, y);

                this.arrange(node, p);
                y += node.Size.height + this.options.verticalSeparation;
            }
        },

        layoutRight: function (right) {
            this.setChildrenDirection(this.center, kendo.diagram.TreeDirection.Right, false);
            this.setChildrenLayout(this.center, kendo.diagram.ChildrenLayout.Default, false);
            var h = 0, w = 0, y;
            for (var i = 0, len = right.length; i < len; i++) {
                var node = right[i];
                node.TreeDirection = kendo.diagram.TreeDirection.Right;
                var s = this.measure(node, Size.Empty);
                w = Math.max(w, s.Width);
                h += s.height + this.options.verticalSeparation;
            }

            h -= this.options.verticalSeparation;
            var x = this.center.x + this.options.horizontalSeparation + this.center.width;
            y = this.center.y + ((this.center.height - h) / 2);
            for (var i = 0, len = right.length; i < len; i++) {
                var node = right[i];
                var p = new Point(x, y);
                this.arrange(node, p);
                y += node.Size.height + this.options.verticalSeparation;
            }
        },

        layoutUp: function (up) {
            this.setChildrenDirection(this.center, kendo.diagram.TreeDirection.Up, false);
            this.setChildrenLayout(this.center, kendo.diagram.ChildrenLayout.Default, false);
            var w = 0, y;
            for (var i = 0; i < up.length; i++) {
                var node = up[i];
                node.TreeDirection = kendo.diagram.TreeDirection.Up;
                var s = this.measure(node, Size.Empty);
                w += s.width + this.options.horizontalSeparation;
            }

            w -= this.options.horizontalSeparation;
            var x = this.center.x + (this.center.width / 2) - (w / 2);

            // y = this.center.y -verticalSeparation -this.center.height/2 - h;
            for (var i = 0; i < up.length; i++) {
                var node = up[i];
                y = this.center.y - this.options.verticalSeparation - node.Size.height;
                var p = new Point(x, y);
                this.arrange(node, p);
                x += node.Size.width + this.options.horizontalSeparation;
            }
        },

        layoutDown: function (down) {
            this.setChildrenDirection(this.center, kendo.diagram.TreeDirection.Down, false);
            this.setChildrenLayout(this.center, kendo.diagram.ChildrenLayout.Default, false);
            var w = 0, y;
            for (var i = 0; i < down.length; i++) {
                var node = down[i];
                node.treeDirection = kendo.diagram.TreeDirection.Down;
                var s = this.measure(node, Size.Empty);
                w += s.width + this.options.horizontalSeparation;
            }

            w -= this.options.horizontalSeparation;
            var x = this.center.x + (this.center.width / 2) - (w / 2);
            y = this.center.y + this.options.verticalSeparation + this.center.height;
            for (var i = 0; i < down.length; i++) {
                var node = down[i];
                var p = new Point(x, y);
                this.arrange(node, p);
                x += node.Size.width + this.options.horizontalSeparation;
            }
        },

        layoutRadialTree: function () {
            // var rmax = children.Aggregate(0D, (current, node) => Math.max(node.SectorAngle, current));
            this.setChildrenDirection(this.center, kendo.diagram.TreeDirection.Radial, false);
            this.setChildrenLayout(this.center, kendo.diagram.ChildrenLayout.Default, false);
            this.previousRoot = null;
            var startAngle = this.options.startRadialAngle;
            var endAngle = this.options.endRadialAngle;
            if (endAngle <= startAngle) {
                throw "Final angle should not be less than the start angle.";
            }

            this.maxDepth = 0;
            this.origin = new Point(this.center.x, this.center.y);
            this.calculateAngularWidth(this.center, 0);

            // perform the layout
            if (this.maxDepth > 0) {
                this.radialLayout(this.center, this.options.radialFirstLevelSeparation, startAngle, endAngle);
            }

            // update properties of the root node
            this.center.Angle = endAngle - startAngle;
        },

        tipOverTree: function (down, startFromLevel) {
            if (isUndefined(startFromLevel)) {
                startFromLevel = 0;
            }
            this.setChildrenDirection(this.center, kendo.diagram.TreeDirection.Down, false);
            this.setChildrenLayout(this.center, kendo.diagram.ChildrenLayout.Default, false);
            this.setChildrenLayout(this.center, kendo.diagram.ChildrenLayout.Underneath, false, startFromLevel);
            var w = 0, y;
            for (var i = 0; i < down.length; i++) {
                var node = down[i];

                // if (node.IsSpecial) continue;
                node.TreeDirection = kendo.diagram.TreeDirection.Down;
                var s = this.measure(node, Size.Empty);
                w += s.width + this.options.horizontalSeparation;
            }

            w -= this.options.horizontalSeparation;

            // putting the root in the center with respect to the whole diagram is not a nice result, let's put it with respect to the first level only
            w -= down[down.length - 1].width;
            w += down[down.length - 1].associatedShape.bounds().width;

            var x = this.center.x + (this.center.width / 2) - (w / 2);
            y = this.center.y + this.options.verticalSeparation + this.center.height;
            for (var i = 0; i < down.length; i++) {
                var node = down[i];
                // if (node.IsSpecial) continue;
                var p = new Point(x, y);
                this.arrange(node, p);
                x += node.Size.width + this.options.horizontalSeparation;
            }

            /*//let's place the special node, assuming there is only one
             if (down.Count(n => n.IsSpecial) > 0)
             {
             var special = (from n in down where n.IsSpecial select n).First();
             if (special.Children.Count > 0)
             throw new DiagramException("The 'special' element should not have children.");
             special.Data.Location = new Point(Center.Data.Location.X + Center.AssociatedShape.BoundingRectangle.Width + this.options.HorizontalSeparation, Center.Data.Location.Y);
             }*/
        },
        calculateAngularWidth: function (n, d) {
            if (d > this.maxDepth) {
                this.maxDepth = d;
            }

            var aw = 0, w = 1000, h = 1000, diameter = d == 0 ? 0 : Math.sqrt((w * w) + (h * h)) / d;

            if (n.children.length > 0) {
                // eventually with n.IsExpanded
                for (var i = 0, len = n.children.length; i < len; i++) {
                    var child = n.children[i];
                    aw += this.calculateAngularWidth(child, d + 1);
                }
                aw = Math.max(diameter, aw);
            }
            else {
                aw = diameter;
            }

            n.sectorAngle = aw;
            return aw;
        },
        sortChildren: function (n) {
            var basevalue = 0;

            // update basevalue angle for node ordering
            if (n.parents.length > 1) {
                throw "Node is not part of a tree."
            }
            var p = n.parents[0];
            if (p != null) {
                var pl = new Point(p.x, p.y);
                var nl = new Point(n.x, n.y);
                basevalue = this.normalizeAngle(Math.atan2(pl.y - nl.y, pl.x - nl.x));
            }

            var count = n.children.length;
            if (count == 0) {
                return null;
            }

            var angle = [];
            var idx = [];

            for (var i = 0; i < count; ++i) {
                var c = n.children[i];
                var l = new Point(c.x, c.y);
                idx[i] = i;
                angle[i] = this.normalizeAngle(-basevalue + Math.atan2(l.y - l.y, l.x - l.x));
            }

            Array.prototype.bisort(angle, idx);
            var col = []; // list of nodes
            var children = n.children;
            for (var i = 0; i < count; ++i) {
                col.add(children[idx[i]]);
            }

            return col;
        },

        normalizeAngle: function (angle) {
            while (angle > Math.PI * 2) {
                angle -= 2 * Math.PI;
            }
            while (angle < 0) {
                angle += Math.PI * 2;
            }
            return angle;
        },
        radialLayout: function (node, radius, startAngle, endAngle) {
            var deltaTheta = endAngle - startAngle;
            var deltaThetaHalf = deltaTheta / 2.0;
            var parentSector = node.sectorAngle;
            var fraction = 0;
            var sorted = this.sortChildren(node);
            for (var i = 0, len = sorted.length; i < len; i++) {
                var childNode = sorted[i];
                var cp = childNode;
                var childAngleFraction = cp.sectorAngle / parentSector;
                if (childNode.children.length > 0) {
                    this.radialLayout(childNode,
                        radius + this.options.radialSeparation,
                        startAngle + (fraction * deltaTheta),
                        startAngle + ((fraction + childAngleFraction) * deltaTheta));
                }

                this.setPolarLocation(childNode, radius, startAngle + (fraction * deltaTheta) + (childAngleFraction * deltaThetaHalf));
                cp.angle = childAngleFraction * deltaTheta;
                fraction += childAngleFraction;
            }
        },
        setPolarLocation: function (node, radius, angle) {
            node.x = this.origin.x + (radius * Math.cos(angle));
            node.y = this.origin.y + (radius * Math.sin(angle));
            node.BoundingRectangle = new Rect(node.x, node.y, node.width, node.height);
        },

        /**
         * Sets the children direction recursively.
         * @param node
         * @param direction
         * @param includeStart
         */
        setChildrenDirection: function (node, direction, includeStart) {
            var rootDirection = node.treeDirection;
            this.graph.depthFirstTraversal(node, function (n) {
                n.treeDirection = direction;
            });
            if (!includeStart) {
                node.treeDirection = rootDirection;
            }
        },

        /**
         * Sets the children layout recursively.
         * @param node
         * @param layout
         * @param includeStart
         * @param startFromLevel
         */
        setChildrenLayout: function (node, layout, includeStart, startFromLevel) {
            if (isUndefined(startFromLevel)) {
                startFromLevel = 0;
            }
            var rootLayout = node.childrenLayout;
            if (startFromLevel > 0) {
                // assign levels to the Node.Level property
                this.graph.assignLevels(node);

                // assign the layout on the condition that the level is at least the 'startFromLevel'
                this.graph.depthFirstTraversal(
                    node, function (s) {
                        if (s.level >= startFromLevel + 1) {
                            s.childrenLayout = layout;
                        }
                    }
                )
            }
            else {
                this.graph.depthFirstTraversal(node, function (s) {
                    s.childrenLayout = layout;
                });

                // if the start should not be affected we put the state back
                if (!includeStart) {
                    node.childrenLayout = rootLayout;
                }
            }
        },

        /**
         * Returns the actual size of the node. The given size is the allowed space wherein the node can lay out itself.
         * @param node
         * @param givenSize
         * @returns {Size}
         */
        measure: function (node, givenSize) {
            var w = 0, h = 0, s;
            var result = new Size(0, 0);
            var b = node.associatedShape.bounds();
            var shapeWidth = b.width;
            var shapeHeight = b.height;
            if (node.parents.length != 1) {
                throw "Node not in a spanning tree.";
            }

            var parent = node.parents[0];
            if (node.treeDirection == kendo.diagram.TreeDirection.Undefined) {
                node.treeDirection = parent.treeDirection;
            }

            if (node.children.isEmpty()) {
                result = new Size(
                    Math.abs(shapeWidth) < Math.epsilon ? 50 : shapeWidth,
                    Math.abs(shapeHeight) < Math.epsilon ? 25 : shapeHeight);
            }
            else if (node.children.length == 1) {
                switch (node.treeDirection) {
                    case kendo.diagram.TreeDirection.Radial:
                        s = this.measure(node.children[0], givenSize); // child size
                        w = shapeWidth + (this.options.radialSeparation * Math.cos(node.AngleToParent)) + s.width;
                        h = shapeHeight + Math.abs(this.options.radialSeparation * Math.sin(node.AngleToParent)) + s.height;
                        break;
                    case kendo.diagram.TreeDirection.Left:
                    case kendo.diagram.TreeDirection.Right:
                        switch (node.childrenLayout) {

                            case kendo.diagram.ChildrenLayout.TopAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.BottomAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.Underneath:
                                s = this.measure(node.children[0], givenSize);
                                w = shapeWidth + s.width + this.options.underneathHorizontalOffset;
                                h = shapeHeight + +this.options.underneathVerticalTopOffset + s.height;
                                break;

                            case kendo.diagram.ChildrenLayout.Default:
                                s = this.measure(node.children[0], givenSize);
                                w = shapeWidth + this.options.horizontalSeparation + s.width;
                                h = Math.max(shapeHeight, s.height);
                                break;

                            default:
                                throw "Unhandled TreeDirection in the Radial layout measuring.";
                        }
                        break;
                    case kendo.diagram.TreeDirection.Up:
                    case kendo.diagram.TreeDirection.Down:
                        switch (node.childrenLayout) {

                            case kendo.diagram.ChildrenLayout.TopAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.BottomAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.Underneath:
                                s = this.measure(node.children[0], givenSize);
                                w = Math.max(shapeWidth, s.width + this.options.underneathHorizontalOffset);
                                h = shapeHeight + this.options.underneathVerticalTopOffset + s.height;
                                break;

                            case kendo.diagram.ChildrenLayout.Default:
                                s = this.measure(node.children[0], givenSize);
                                h = shapeHeight + this.options.verticalSeparation + s.height;
                                w = Math.max(shapeWidth, s.width);
                                break;

                            default:
                                throw "Unhandled TreeDirection in the Down layout measuring.";
                        }
                        break;
                    default:
                        throw "Unhandled TreeDirection in the layout measuring.";
                }

                result = new Size(w, h);
            }
            else {
                switch (node.treeDirection) {
                    case kendo.diagram.TreeDirection.Left:
                    case kendo.diagram.TreeDirection.Right:
                        switch (node.childrenLayout) {

                            case kendo.diagram.ChildrenLayout.TopAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.BottomAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.Underneath:
                                w = shapeWidth;
                                h = shapeHeight + +this.options.underneathVerticalTopOffset;
                                for (var i = 0, len = node.children.length; i < len; i++) {
                                    var childNode = node.children[i];
                                    s = this.measure(childNode, givenSize);
                                    w = Math.max(w, s.width + this.options.underneathHorizontalOffset);
                                    h += s.height + this.options.underneathVerticalSeparation;
                                }

                                h -= this.options.underneathVerticalSeparation;
                                break;

                            case kendo.diagram.ChildrenLayout.Default:
                                w = shapeWidth;
                                h = 0;
                                for (var i = 0, len = node.children.length; i < len; i++) {
                                    var childNode = node.children[i];
                                    s = this.measure(childNode, givenSize);
                                    w = Math.max(w, shapeWidth + this.options.horizontalSeparation + s.width);
                                    h += s.height + this.options.verticalSeparation;
                                }
                                h -= this.options.verticalSeparation;
                                break;

                            default:
                                throw "Unhandled TreeDirection in the Right layout measuring.";
                        }

                        break;
                    case kendo.diagram.TreeDirection.Up:
                    case kendo.diagram.TreeDirection.Down:

                        switch (node.childrenLayout) {

                            case kendo.diagram.ChildrenLayout.TopAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.BottomAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.Underneath:
                                w = shapeWidth;
                                h = shapeHeight + +this.options.underneathVerticalTopOffset;
                                for (var i = 0, len = node.children.length; i < len; i++) {
                                    var childNode = node.children[i];
                                    s = this.measure(childNode, givenSize);
                                    w = Math.max(w, s.width + this.options.underneathHorizontalOffset);
                                    h += s.height + this.options.underneathVerticalSeparation;
                                }

                                h -= this.options.underneathVerticalSeparation;
                                break;

                            case kendo.diagram.ChildrenLayout.Default:
                                w = 0;
                                h = 0;
                                for (var i = 0, len = node.children.length; i < len; i++) {
                                    var childNode = node.children[i];
                                    s = this.measure(childNode, givenSize);
                                    w += s.width + this.options.horizontalSeparation;
                                    h = Math.max(h, s.height + this.options.verticalSeparation + shapeHeight);
                                }

                                w -= this.options.horizontalSeparation;
                                break;

                            default:
                                throw "Unhandled TreeDirection in the Down layout measuring.";
                        }

                        break;
                    default:
                        throw "Unhandled TreeDirection in the layout measuring.";
                }

                result = new Size(w, h);
            }

            node.SectorAngle = Math.sqrt((w * w / 4) + (h * h / 4));
            node.Size = result;
            return result;
        },
        arrange: function (n, p) {
            var b = n.associatedShape.bounds();
            var shapeWidth = b.width;
            var shapeHeight = b.height;
            if (n.children.isEmpty()) {
                n.x = p.x;
                n.y = p.y;
                n.BoundingRectangle = new Rect(p.x, p.y, shapeWidth, shapeHeight);
            }
            else {
                var x, y;
                var selfLocation;
                switch (n.treeDirection) {
                    case kendo.diagram.TreeDirection.Left:
                        switch (n.childrenLayout) {
                            case kendo.diagram.ChildrenLayout.TopAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.BottomAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.Underneath:
                                selfLocation = p;
                                n.x = selfLocation.x;
                                n.y = selfLocation.y;
                                n.BoundingRectangle = new Rect(n.x, n.y, n.width, n.height);
                                y = p.y + shapeHeight + this.options.underneathVerticalTopOffset;
                                for (var i = 0, len = node.children.length; i < len; i++) {
                                    var node = node.children[i];
                                    x = selfLocation.x - node.associatedShape.width - this.options.underneathHorizontalOffset;
                                    var pp = new Point(x, y);
                                    this.arrange(node, pp);
                                    y += node.Size.height + this.options.underneathVerticalSeparation;
                                }
                                break;

                            case kendo.diagram.ChildrenLayout.Default:
                                selfLocation = new Point(p.x + n.Size.width - shapeWidth, p.y + ((n.Size.height - shapeHeight) / 2));
                                n.x = selfLocation.x;
                                n.y = selfLocation.y;
                                n.BoundingRectangle = new Rect(n.x, n.y, n.width, n.height);
                                x = selfLocation.x - this.options.horizontalSeparation; // alignment of children
                                y = p.y;
                                for (var i = 0, len = n.children.length; i < len; i++) {
                                    var node = n.children[i];
                                    var pp = new Point(x - node.Size.width, y);
                                    this.arrange(node, pp);
                                    y += node.Size.height + this.options.verticalSeparation;
                                }
                                break;

                            default:
                                throw new ArgumentOutOfRangeException("n");
                        }

                        break;
                    case kendo.diagram.TreeDirection.Right:
                        switch (n.childrenLayout) {
                            case kendo.diagram.ChildrenLayout.TopAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.BottomAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.Underneath:
                                selfLocation = p;
                                n.x = selfLocation.x;
                                n.y = selfLocation.y;
                                n.BoundingRectangle = new Rect(n.x, n.y, n.width, n.height);
                                x = p.x + shapeWidth + this.options.underneathHorizontalOffset;

                                // alignment of children left-underneath the parent
                                y = p.y + shapeHeight + this.options.underneathVerticalTopOffset;
                                for (var i = 0, len = n.children.length; i < len; i++) {
                                    var node = n.children[i];
                                    var pp = new Point(x, y);
                                    this.arrange(node, pp);
                                    y += node.Size.height + this.options.underneathVerticalSeparation;
                                }

                                break;

                            case kendo.diagram.ChildrenLayout.Default:
                                selfLocation = new Point(p.x, p.y + ((n.Size.height - shapeHeight) / 2));
                                n.x = selfLocation.x;
                                n.y = selfLocation.y;
                                n.BoundingRectangle = new Rect(n.x, n.y, n.width, n.height);
                                x = p.x + shapeWidth + this.options.horizontalSeparation; // alignment of children
                                y = p.y;
                                for (var i = 0, len = n.children.length; i < len; i++) {
                                    var node = n.children[i];
                                    var pp = new Point(x, y);
                                    this.arrange(node, pp);
                                    y += node.Size.height + this.options.verticalSeparation;
                                }
                                break;

                            default:
                                throw new ArgumentOutOfRangeException("n");
                        }

                        break;
                    case kendo.diagram.TreeDirection.Up:
                        selfLocation = new Point(p.x + ((n.Size.width - shapeWidth) / 2), p.y + n.Size.height - shapeHeight);
                        n.x = selfLocation.x;
                        n.y = selfLocation.y;
                        n.BoundingRectangle = new Rect(n.x, n.y, n.width, n.height);
                        if (Math.abs(selfLocation.x - p.x) < Math.epsilon) {
                            var childrenwidth = 0;
                            // means there is an aberration due to the oversized Element with respect to the children
                            for (var i = 0, len = n.children.length; i < len; i++) {
                                var child = n.children[i];
                                childrenwidth += child.Size.width + this.options.horizontalSeparation;
                            }
                            childrenwidth -= this.options.horizontalSeparation;
                            x = p.x + ((shapeWidth - childrenwidth) / 2);
                        }
                        else {
                            x = p.x;
                        }

                        for (var i = 0, len = n.children.length; i < len; i++) {
                            var node = n.children[i];
                            y = selfLocation.y - this.options.verticalSeparation - node.Size.height;
                            var pp = new Point(x, y);
                            this.arrange(node, pp);
                            x += node.Size.width + this.options.horizontalSeparation;
                        }
                        break;

                    case kendo.diagram.TreeDirection.Down:

                        switch (n.childrenLayout) {
                            case kendo.diagram.ChildrenLayout.TopAlignedWithParent:
                                break;
                            case kendo.diagram.ChildrenLayout.BottomAlignedWithParent:
                                break;
                            case kendo.diagram.ChildrenLayout.Underneath:
                                selfLocation = p;
                                n.x = selfLocation.x;
                                n.y = selfLocation.y;
                                n.BoundingRectangle = new Rect(n.x, n.y, n.width, n.height);
                                x = p.x + this.options.underneathHorizontalOffset; // alignment of children left-underneath the parent
                                y = p.y + shapeHeight + this.options.underneathVerticalTopOffset;
                                for (var i = 0, len = n.children.length; i < len; i++) {
                                    var node = n.children[i];
                                    var pp = new Point(x, y);
                                    this.arrange(node, pp);
                                    y += node.Size.height + this.options.underneathVerticalSeparation;
                                }
                                break;

                            case    kendo.diagram.ChildrenLayout.Default:
                                selfLocation = new Point(p.x + ((n.Size.width - shapeWidth) / 2), p.y);
                                n.x = selfLocation.x;
                                n.y = selfLocation.y;
                                n.BoundingRectangle = new Rect(n.x, n.y, n.width, n.height);
                                if (Math.abs(selfLocation.x - p.x) < Math.epsilon) {
                                    var childrenwidth = 0;
                                    // means there is an aberration due to the oversized Element with respect to the children
                                    for (var i = 0, len = n.children.length; i < len; i++) {
                                        var child = n.children[i];
                                        childrenwidth += child.Size.width + this.options.horizontalSeparation;
                                    }

                                    childrenwidth -= this.options.horizontalSeparation;
                                    x = p.x + ((shapeWidth - childrenwidth) / 2);
                                }
                                else {
                                    x = p.x;
                                }

                                for (var i = 0, len = n.children.length; i < len; i++) {
                                    var node = n.children[i];
                                    y = selfLocation.y + this.options.verticalSeparation + shapeHeight;
                                    var pp = new Point(x, y);
                                    this.arrange(node, pp);
                                    x += node.Size.width + this.options.horizontalSeparation;
                                }
                                break;

                            default:
                                throw new ArgumentOutOfRangeException("n");
                        }
                        break;

                    case kendo.diagram.TreeDirection.None:
                        break;

                    default:
                        throw new ArgumentOutOfRangeException("n");
                }
            }
        },
        layoutSwitch: function () {
            if (this.center == null) {
                return;
            }

            if (this.center.children.isEmpty()) {
                return;
            }

            var type = this.options.TreeLayoutType;
            if (isUndefined(type)) {
                type = kendo.diagram.TreeLayoutType.TreeDown;
            }
            var single, male, female, leftcount;
            var children = this.center.children;
            switch (type) {
                case kendo.diagram.TreeLayoutType.RadialTree:
                    this.layoutRadialTree();
                    break;

                case kendo.diagram.TreeLayoutType.MindmapHorizontal:
                    single = this.center.children;

                    if (this.center.children.length == 1) {
                        this.layoutRight(single);
                    }
                    else {
                        // odd number will give one more at the right
                        leftcount = children.length / 2;
                        male = this.center.children.where(function (n) {
                            return children.indexOf(n) < leftcount;
                        });
                        female = this.center.children.where(function (n) {
                            return children.indexOf(n) >= leftcount;
                        });

                        this.layoutLeft(male);
                        this.layoutRight(female);
                    }
                    break;

                case kendo.diagram.TreeLayoutType.MindmapVertical:
                    single = this.center.children;

                    if (this.center.children.length == 1) {
                        this.layoutDown(single);
                    }
                    else {
                        // odd number will give one more at the right
                        leftcount = children.length / 2;
                        male = this.center.children.where(function (n) {
                            return children.indexOf(n) < leftcount
                        });
                        female = this.center.children.where(function (n) {
                            return children.indexOf(n) >= leftcount
                        });
                        this.layoutUp(male);
                        this.layoutDown(female);
                    }
                    break;

                case kendo.diagram.TreeLayoutType.TreeRight:
                    this.layoutRight(this.center.children);
                    break;

                case kendo.diagram.TreeLayoutType.TreeLeft:
                    this.layoutLeft(this.center.children);
                    break;

                case kendo.diagram.TreeLayoutType.TreeUp:
                    this.layoutUp(this.center.children);
                    break;

                case kendo.diagram.TreeLayoutType.TreeDown:
                    this.layoutDown(this.center.children);
                    break;

                case kendo.diagram.TreeLayoutType.TipOverTree:
                    if (this.options.tipOverTreeStartLevel < 0) {
                        throw  "The tip-over level should be a positive integer.";
                    }
                    this.tipOverTree(this.center.children, this.options.tipOverTreeStartLevel);
                    break;

                case kendo.diagram.TreeLayoutType.Undefined:
                    break;
            }
        }
    });

    /**
     * The various tree layout algorithms.
     * @type {*}
     */
    var TreeLayout = LayoutBase.extend({
        init: function (diagram) {
            var that = this;
            LayoutBase.fn.init.call(that);
            if (isUndefined(diagram)) {
                throw "No diagram specified.";
            }
            this.diagram = diagram;
        },

        /**
         * Arranges the diagram in a tree-layout with the specified options and tree subtype.
         */
        layout: function (options) {

            this.transferOptions(options);

            // transform the diagram into a Graph
            var adapter = new DiagramToHyperTreeAdapter(this.diagram);

            /**
             * The Graph reduction from the given diagram.
             * @type {*}
             */
            this.graph = adapter.convert();
            var initialState = this.graph.clone(); // enabling animations
            this.layoutComponents();
            var finalState = this.graph.clone();

            //var layoutUnit = new diagram.LayoutUnit(initialState, finalState);

            // run the unit in the undo service and get some rest
        },

        layoutComponents: function () {
            if (this.graph.isEmpty()) {
                return;
            }

            // split into connected components
            var components = this.graph.getConnectedComponents();
            if (components.isEmpty()) {
                return;
            }

            var layout = new TreeLayoutProcessor(this.options);
            var trees = [];
            // find a spanning tree for each component
            for (var i = 0; i < components.length; i++) {
                var component = components[i];

                var treeGraph = this.getTree(component);
                if (treeGraph == null) {
                    throw "Failed to find a spanning tree for the component.";
                }
                var root = treeGraph.root;
                var tree = treeGraph.tree;
                layout.layout(tree, root);

                for (var j = 0; j < tree.nodes.length; j++) {
                    var node = tree.nodes[j];
                    var shape = node.associatedShape;
                    shape.bounds(new Rect(node.x, node.y, node.width, node.height));
                }
                trees.push(tree);
            }

            this.gridLayoutComponents(trees);

        },

        /**
         * Gets a spanning tree (and root) for the given graph.
         * Ensure that the given graph is connected!
         * @param graph
         * @returns {*} A literal object consisting of the found root and the spanning tree.
         */
        getTree: function (graph) {
            var root = null;
            if (this.options.roots.length > 0) {
                for (var i = 0, len = graph.nodes.length; i < len; i++) {
                    var node = graph.nodes[i];
                    for (var j = 0, len = this.options.roots.length; j < len; j++) {
                        var givenRootShape = this.options.roots[j];
                        if (givenRootShape == node.associatedShape) {
                            root = node;
                            break;
                        }
                    }
                }
            }
            if (root == null) {
                // finds the most probable root on the basis of the longest path in the component
                root = graph.root();
                // should not happen really
                if (root == null) {
                    throw "Unable to find a root for the tree.";
                }
            }
            return this.getTreeForRoot(graph, root);
        },

        getTreeForRoot: function (graph, root) {

            var tree = graph.getSpanningTree(root);
            if (isUndefined(tree) || tree.isEmpty()) {
                return null;
            }
            return {
                tree: tree,
                root: tree.root
            };
        }

    });

    var ChildrenLayout = {
        /*
         * The topmost child will be aligned with the parent.
         */
        TopAlignedWithParent: 0,

        /*
         *
         */
        BottomAlignedWithParent: 1,

        /*
         * If the children are at the <see cref="TreeDirection.Right"/> or <see cref="TreeDirection.Left"/> this will furthermore
         * specify that they should be placed underneath the parent rather than at the distance from the right, respectively left of the parent.
         */
        Underneath: 2,

        /*
         * Default layout.
         */
        Default: 3
    }

    var LayoutTypes = {

        /**
         * The tree layout and its various variations.
         * See also the TreeLayoutType for subtypes of this.
         */
        TreeLayout: 0,

        /**
         * The Sugiyama aka layered layout.
         */
        LayeredLayout: 1,

        /*
         * Spring-embedder aka force-directed layout.
         */
        ForceDirectedLayout: 2,
        /**
         * Unspecified layout.
         */
        None: 3
    }

    var TreeDirection = {
        /*
         * Children evolve to the left.
         */
        Left: 0,

        /*
         * Children evolve to the right.
         */
        Right: 1,

        /*
         * Children evolve upwards.
         */
        Up: 2,

        /*
         * Children evolve downwards.
         */
        Down: 3,

        /*
         * No direction specified:0, this usually means the root node and it's a mind mapping root.
         */
        None: 4,

        /*
         * Radial layout.
         */
        Radial: 5,

        /*
         * Undefine layout.
         */
        Undefined: 6
    }

    var TreeLayoutType = {

        /*
         * The standard mind mapping layout.
         */
        MindmapHorizontal: 0,

        /*
         * The standard mind mapping layout but with the two wings laid out vertically.
         */
        MindmapVertical: 1,

        /*
         * Standard tree layout with the children positioned at the right of the root.
         */
        TreeRight: 2,

        /*
         * Standard tree layout with the children positioned at the left of the root.
         */
        TreeLeft: 3,

        /*
         *  Standard tree layout with the children positioned on top of the root.
         */
        TreeUp: 4,

        /*
         * Standard tree layout with the children positioned below the root.
         */
        TreeDown: 5,

        /*
         * Top-down layout with the children on the second level positioned as a tree view underneath the first level.
         */
        TipOverTree: 6,

        /*
         * Experimental radial tree layout.
         */
        RadialTree: 7,

        /*
         * Unspecified layout. This is not an algorithm but just a tag for the host application to tell that the user has not specified any layout yet.
         */
        Undefined: 8
    }

    var LayeredLayoutType = {
        Up: 0,
        Down: 1,
        Left: 2,
        Right: 3
    }

    /**
     * The Sugiyama aka layered layout algorithm.
     * @type {*}
     */
    var LayeredLayout = LayoutBase.extend({
        init: function (diagram) {
            var that = this;
            LayoutBase.fn.init.call(that);
            if (isUndefined(diagram)) {
                throw "Diagram is not specified.";
            }
            this.diagram = diagram;
        },

        layout: function (options) {

            this.transferOptions(options);

            var adapter = new DiagramToHyperTreeAdapter(this.diagram);
            var graph = adapter.convert(options);
            if (graph.isEmpty()) {
                return;
            }
            // split into connected components
            var components = graph.getConnectedComponents();
            if (components.isEmpty()) {
                return;
            }
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                this.layoutGraph(component, options);
            }
            this.gridLayoutComponents(components);
            for (var i = 0, len = graph.nodes.length; i < len; i++) {
                var node = graph.nodes[i];
                var shape = node.associatedShape;
                shape.bounds(new Rect(node.x, node.y, node.width, node.height));
            }
            for (var i = 0; i < graph.links.length; i++) {
                var link = graph.links[i];
                var p = []
                if (link.points != null) {
                    p.addRange(link.points);
                }
                var sb = link.source.associatedShape.bounds();
                p.prepend(new diagram.Point(sb.x, sb.y));
                var eb = link.target.associatedShape.bounds();
                p.append(new diagram.Point(eb.x, eb.y));
                // todo: when multipoint connections are ready this needs to be plugged in again
                //link.associatedConnection.points(p);
            }
        },

        /**
         * Initializes the runtime data properties of the layout.
         * @private
         */
        _initRuntimeProperties: function () {
            for (var k = 0; k < this.graph.nodes.length; k++) {
                var node = this.graph.nodes[k];
                node.layer = -1;
                node.downstreamLinkCount = 0;
                node.upstreamLinkCount = 0;

                node.isVirtual = false;

                node.uBaryCenter = 0.0;
                node.dBaryCenter = 0.0;

                node.upstreamPriority = 0;
                node.downstreamPriority = 0;

                node.gridPosition = 0;
            }
        },
        _prepare: function (graph, options) {
            for (var l = 0; l < graph.links.length; l++) {
                // of many dummies have been inserted to make things work
                graph.links[l].depthOfDumminess = 0;
            }


            var current = [];

            // defines a mapping of a node to the layer index
            var layerMap = new Dictionary();

            graph.nodes.forEach(function (node) {
                if (node.incoming.length == 0) {
                    layerMap.set(node, 0);
                    current.push(node);
                }
            });

            while (current.length > 0) {
                var next = current.shift();
                next.outgoing.forEach(function (link) {
                    var target = link.target;

                    if (layerMap.containsKey(target)) {
                        layerMap.set(target, Math.max(layerMap.get(next) + 1, layerMap.get(target)));
                    } else {
                        layerMap.set(target, layerMap.get(next) + 1);
                    }

                    if (!current.contains(target)) {
                        current.push(target);
                    }
                });
            }

            // the node count in the map defines how many layers w'll need
            var layerCount = 0;
            layerMap.forEachValue(function (nodecount) {
                layerCount = Math.max(layerCount, nodecount);
            });

            var sortedNodes = [];
            sortedNodes.addRange(layerMap.keys());
            sortedNodes.sort(function (o1, o2) {
                var o1layer = layerMap.get(o1);
                var o2layer = layerMap.get(o2);
                return Math.sign(o2layer - o1layer);
            });

            for (var n = 0; n < sortedNodes.length; ++n) {
                var node = sortedNodes[n];
                var minLayer = Number.MAX_VALUE;

                if (node.outgoing.length == 0) {
                    continue;
                }

                for (var l = 0; l < node.outgoing.length; ++l) {
                    var link = node.outgoing[l];
                    minLayer = Math.min(minLayer, layerMap.get(link.target));
                }

                if (minLayer > 1) {
                    layerMap.set(node, minLayer - 1);
                }
            }

            this.layers = [];
            for (var i = 0; i < layerCount + 1; i++) {
                this.layers.push([]);
            }

            layerMap.forEach(function (node, layer) {
                node.layer = layer;
                this.layers[layer].push(node);
            }, this);

            // set initial grid positions
            for (var l = 0; l < this.layers.length; l++) {
                var layer = this.layers[l];
                for (var i = 0; i < layer.length; i++) {
                    layer[i].gridPosition = i;
                }
            }
        },

        /**
         * Performs the layout of a single component.
         */
        layoutGraph: function (graph, options) {
            if (isUndefined(graph)) {
                throw "No graph given or graph analysis of the diagram failed.";
            }
            if (isDefined(options)) {
                this.transferOptions(options);
            }
            this.graph = graph;

            // sets unique indices on the nodes
            graph.setItemIndices();

            // ensures no cycles present for this layout
            var reversedEdges = graph.makeAcyclic();

            // define the runtime props being used by the layout algorithm
            this._initRuntimeProperties();

            this._prepare(graph, options);
                        
            this._dummify();
            
            this._optimizeCrossings();
            
            this._swapPairs();
            
            this.arrangeNodes();
            
            this._moveThingsAround();
            
            this._dedummify();
            
            // rereverse the links which were switched earlier 
            reversedEdges.forEach(function (e) {
                if (e.points) {
                    e.points.reverse();
                }
            });
        },

        setMinDist: function (m, n, minDist) {
            var l = m.layer;
            var i = m.layerIndex;
            this.minDistances[l][i] = minDist;
        },

        getMinDist: function (m, n) {
            var dist = 0,
                i1 = m.layerIndex,
                i2 = n.layerIndex,
                l = m.layer,
                min = Math.min(i1, i2),
                max = Math.max(i1, i2);
            // use Sum()?
            for (var k = min; k < max; ++k) {
                dist += this.minDistances[l][k];
            }
            return dist;
        },

        placeLeftToRight: function (leftClasses) {
            var leftPos = new Dictionary();
            for (var c = 0; c < this.layers.length; ++c) {
                var classNodes = leftClasses[c];
                if (classNodes == null) {
                    continue;
                }

                for (var n = 0; n < classNodes.length; n++) {
                    var node = classNodes[n];
                    if (!leftPos.containsKey(node)) {
                        this.placeLeft(node, leftPos, c);
                    }
                }

                // adjust class
                var d = Number.POSITIVE_INFINITY;
                for (var n = 0; n < classNodes.length; n++) {
                    var node = classNodes[n];
                    var rightSibling = this.rightSibling(node);
                    if (rightSibling != null && this.nodeLeftClass.get(rightSibling) != c) {
                        d = Math.min(d, leftPos.get(rightSibling) - leftPos.get(node) - this.getMinDist(node, rightSibling));
                    }
                }
                if (d == Number.POSITIVE_INFINITY) {
                    var D = [];
                    for (var n = 0; n < classNodes.length; n++) {
                        var node = classNodes[n];
                        var neighbors = [];
                        neighbors.addRange(this.upNodes.get(node));
                        neighbors.addRange(this.downNodes.get(node));

                        for (var e = 0; e < neighbors.length; e++) {
                            var neighbor = neighbors[e];
                            if (this.nodeLeftClass.get(neighbor) < c) {
                                D.push(leftPos.get(neighbor) - leftPos.get(node));
                            }
                        }
                    }
                    D.sort();
                    if (D.length == 0) {
                        d = 0;
                    }
                    else if (D.length % 2 == 1) {
                        d = D[this.intDiv(D.length, 2)];
                    }
                    else {
                        d = (D[this.intDiv(D.length, 2) - 1] + D[this.intDiv(D.length, 2)]) / 2;
                    }
                }
                for (var n = 0; n < classNodes.length; n++) {
                    var node = classNodes[n];
                    leftPos.set(node, leftPos.get(node) + d);
                }
            }
            return leftPos;
        },

        placeRightToLeft: function (rightClasses) {
            var rightPos = new Dictionary();
            for (var c = 0; c < this.layers.length; ++c) {
                var classNodes = rightClasses[c];
                if (classNodes == null) {
                    continue;
                }

                for (var n = 0; n < classNodes.length; n++) {
                    var node = classNodes[n];
                    if (!rightPos.containsKey(node)) {
                        this.placeRight(node, rightPos, c);
                    }
                }

                // adjust class
                var d = Number.NEGATIVE_INFINITY;
                for (var n = 0; n < classNodes.length; n++) {
                    var node = classNodes[n];
                    var leftSibling = this.leftSibling(node);
                    if (leftSibling != null && this.nodeRightClass.get(leftSibling) != c) {
                        d = Math.max(d, rightPos.get(leftSibling) - rightPos.get(node) + this.getMinDist(leftSibling, node));
                    }
                }
                if (d == Number.NEGATIVE_INFINITY) {
                    var D = [];
                    for (var n = 0; n < classNodes.length; n++) {
                        var node = classNodes[n];
                        var neighbors = [];
                        neighbors.addRange(this.upNodes.get(node));
                        neighbors.addRange(this.downNodes.get(node));

                        for (var e = 0; e < neighbors.length; e++) {
                            var neighbor = neighbors[e];
                            if (this.nodeRightClass.get(neighbor) < c) {
                                D.push(rightPos.get(node) - rightPos.get(neighbor));
                            }
                        }
                    }
                    D.sort();
                    if (D.length == 0) {
                        d = 0;
                    }
                    else if (D.length % 2 == 1) {
                        d = D[this.intDiv(D.length, 2)];
                    }
                    else {
                        d = (D[this.intDiv(D.length, 2) - 1] + D[this.intDiv(D.length, 2)]) / 2;
                    }
                }
                for (var n = 0; n < classNodes.length; n++) {
                    var node = classNodes[n];
                    rightPos.set(node, rightPos.get(node) + d);
                }
            }
            return rightPos;
        },

        _getLeftWing: function () {
            var leftWing = { value: null };
            var result = this.computeClasses(leftWing, 1);
            this.nodeLeftClass = leftWing.value;
            return result;
        },

        _getRightWing: function () {
            var rightWing = { value: null };
            var result = this.computeClasses(rightWing, -1);
            this.nodeRightClass = rightWing.value;
            return result;
        },

        computeClasses: function (wingPair, d) {
            var currentWing = 0,
                wing = wingPair.value = new Dictionary();

            for (var l = 0; l < this.layers.length; ++l) {
                currentWing = l;

                var layer = this.layers[l];
                for (var n = d == 1 ? 0 : layer.length - 1; 0 <= n && n < layer.length; n += d) {
                    var node = layer[n];
                    if (!wing.containsKey(node)) {
                        wing.set(node, currentWing);
                        if (node.isVirtual) {
                            this._nodesInLink(node).forEach(function (vnode) {
                                wing.set(vnode, currentWing);
                            });
                        }
                    }
                    else {
                        currentWing = wing.get(node);
                    }
                }
            }

            var wings = [];
            for (var i = 0; i < this.layers.length; i++) {
                wings.push(null);
            }
            wing.forEach(function (node, classIndex) {
                if (wings[classIndex] === null) {
                    wings[classIndex] = [];
                }
                wings[classIndex].push(node);
            });

            return wings;
        },
        _isVerticalLayout: function () {
            return this.options.layeredLayoutType == kendo.diagram.LayeredLayoutType.Up || this.options.layeredLayoutType == kendo.diagram.LayeredLayoutType.Down;
        },

        _isHorizontalLayout: function () {
            return this.options.layeredLayoutType == kendo.diagram.LayeredLayoutType.Right || this.options.layeredLayoutType == kendo.diagram.LayeredLayoutType.Left;
        },
        _isIncreasingLayout: function () {
            // meaning that the visiting of the layers goes in the natural order of increasing layer index
            return this.options.layeredLayoutType == kendo.diagram.LayeredLayoutType.Right || this.options.layeredLayoutType == kendo.diagram.LayeredLayoutType.Down;
        },
        _moveThingsAround: function () {
            // sort the layers by their grid position
            for (var l = 0; l < this.layers.length; ++l) {
                var layer = this.layers[l];
                layer.sort(this._gridPositionComparer);
            }

            this.minDistances = [];
            for (var l = 0; l < this.layers.length; ++l) {
                var layer = this.layers[l];
                this.minDistances[l] = [];
                for (var n = 0; n < layer.length; ++n) {
                    var node = layer[n];
                    node.layerIndex = n;
                    this.minDistances[l][n] = this.options.nodeDistance;
                    if (n < layer.length - 1) {
                        if (this._isVerticalLayout()) {
                            this.minDistances[l][n] += (node.width + layer[n + 1].width) / 2;
                        }
                        else {
                            this.minDistances[l][n] += (node.height + layer[n + 1].height) / 2;
                        }
                    }
                }
            }

            this.downNodes = new Dictionary();
            this.upNodes = new Dictionary();
            this.graph.nodes.forEach(function (node) {
                this.downNodes.set(node, []);
                this.upNodes.set(node, []);
            }, this);
            this.graph.links.forEach(function (link) {
                var origin = link.source;
                var dest = link.target;
                var down = null, up = null;
                if (origin.layer > dest.layer) {
                    down = link.source;
                    up = link.target;
                }
                else {
                    up = link.source;
                    down = link.target;
                }
                this.downNodes.get(up).push(down);
                this.upNodes.get(down).push(up);
            }, this);
            this.downNodes.forEachValue(function (list) {
                list.sort(this._gridPositionComparer);
            });
            this.upNodes.forEachValue(function (list) {
                list.sort(this._gridPositionComparer);
            });

            for (var l = 0; l < this.layers.length - 1; ++l) {
                var layer = this.layers[l];
                for (var w = 0; w < layer.length - 1; w++) {
                    var currentNode = layer[w];
                    if (!currentNode.isVirtual) {
                        continue;
                    }

                    var currDown = this.downNodes.get(currentNode)[0];
                    if (!currDown.isVirtual) {
                        continue;
                    }

                    for (var n = w + 1; n < layer.length; ++n) {
                        var node = layer[n];
                        if (!node.isVirtual) {
                            continue;
                        }

                        var downNode = this.downNodes.get(node)[0];
                        if (!downNode.isVirtual) {
                            continue;
                        }

                        if (currDown.gridPosition > downNode.gridPosition) {
                            var pos = currDown.gridPosition;
                            currDown.gridPosition = downNode.gridPosition;
                            downNode.gridPosition = pos;
                            var i1 = currDown.layerIndex;
                            var i2 = downNode.layerIndex;
                            this.layers[l + 1][i1] = downNode;
                            this.layers[l + 1][i2] = currDown;
                            currDown.layerIndex = i2;
                            downNode.layerIndex = i1;
                        }
                    }
                }
            }


            var leftClasses = this._getLeftWing();
            var rightClasses = this._getRightWing();


            var leftPos = this.placeLeftToRight(leftClasses);
            var rightPos = this.placeRightToLeft(rightClasses);
            var x = new Dictionary();
            this.graph.nodes.forEach(function (node) {
                x.set(node, (leftPos.get(node) + rightPos.get(node)) / 2);
            });


            var order = new Dictionary();
            var placed = new Dictionary;
            for (var l = 0; l < this.layers.length; ++l) {
                var layer = this.layers[l];
                var sequenceStart = -1, sequenceEnd = -1;
                for (var n = 0; n < layer.length; ++n) {
                    var node = layer[n];
                    order.set(node, 0);
                    placed.set(node, false);
                    if (node.isVirtual) {
                        if (sequenceStart == -1) {
                            sequenceStart = n;
                        }
                        else if (sequenceStart == n - 1) {
                            sequenceStart = n;
                        }
                        else {
                            sequenceEnd = n;
                            order.set(layer[sequenceStart], 0);
                            if (x.get(node) - x.get(layer[sequenceStart]) == this.getMinDist(layer[sequenceStart], node)) {
                                placed.set(layer[sequenceStart], true);
                            }
                            else {
                                placed.set(layer[sequenceStart], false);
                            }
                            sequenceStart = n;
                        }
                    }
                }
            }
            var directions = [1, -1];
            directions.forEach(function (d) {
                var start = d == 1 ? 0 : this.layers.length - 1;
                var end = d == 1 ? this.layers.length - 1 : 0;
                for (var l = start; 0 <= l && l < this.layers.length; l += d) {
                    var layer = this.layers[l];
                    var virtualStartIndex = this._firstVirtualNode(layer);
                    var virtualStart = null;
                    var sequence = null;
                    if (virtualStartIndex != -1) {
                        virtualStart = layer[virtualStartIndex];
                        sequence = [];
                        for (var i = 0; i < virtualStartIndex; i++) {
                            sequence.push(layer[i]);
                        }
                    }
                    else {
                        virtualStart = null;
                        sequence = layer;
                    }
                    if (sequence.length > 0) {
                        this._sequencer(x, null, virtualStart, d, sequence);
                        for (var i = 0; i < sequence.length - 1; ++i) {
                            this.setMinDist(sequence[i], sequence[i + 1], x.get(sequence[i + 1]) - x.get(sequence[i]));
                        }
                        if (virtualStart != null) {
                            this.setMinDist(sequence[sequence.length - 1], virtualStart, x.get(virtualStart) - x.get(sequence[sequence.length - 1]));
                        }
                    }

                    while (virtualStart != null) {
                        var virtualEnd = this.nextVirtualNode(layer, virtualStart);
                        if (virtualEnd == null) {
                            virtualStartIndex = virtualStart.layerIndex;
                            sequence = [];
                            for (var i = virtualStartIndex + 1; i < layer.length; i++) {
                                sequence.push(layer[i]);
                            }
                            if (sequence.length > 0) {
                                this._sequencer(x, virtualStart, null, d, sequence);
                                for (var i = 0; i < sequence.length - 1; ++i) {
                                    this.setMinDist(sequence[i], sequence[i + 1], x.get(sequence[i + 1]) - x.get(sequence[i]));
                                }
                                this.setMinDist(virtualStart, sequence[0], x.get(sequence[0]) - x.get(virtualStart));
                            }
                        }
                        else if (order.get(virtualStart) == d) {
                            virtualStartIndex = virtualStart.layerIndex;
                            var virtualEndIndex = virtualEnd.layerIndex;
                            sequence = [];
                            for (var i = virtualStartIndex + 1; i < virtualEndIndex; i++) {
                                sequence.push(layer[i]);
                            }
                            if (sequence.length > 0) {
                                this._sequencer(x, virtualStart, virtualEnd, d, sequence);
                            }
                            placed.set(virtualStart, true);
                        }
                        virtualStart = virtualEnd;
                    }
                    this.adjustDirections(l, d, order, placed);
                }
            }, this);


            var fromLayerIndex = this._isIncreasingLayout() ? 0 : this.layers.length - 1;
            var reachedFinalLayerIndex = function (k, ctx) {
                if (ctx._isIncreasingLayout()) {
                    return k < ctx.layers.length;
                }

                else {
                    return k >= 0;
                }
            }
            var layerIncrement = this._isIncreasingLayout() ? +1 : -1,
                offset = 0;

            /**
             * Calcs the max height of the given layer.
             */
            function maximumHeight(layer, ctx) {
                var height = Number.MIN_VALUE;
                for (var n = 0; n < layer.length; ++n) {
                    var node = layer[n];
                    if (ctx._isVerticalLayout()) {
                        height = Math.max(height, node.height);
                    }
                    else {
                        height = Math.max(height, node.width);
                    }
                }
                return height;
            }

            for (var i = fromLayerIndex; reachedFinalLayerIndex(i, this); i += layerIncrement) {
                var layer = this.layers[i];
                var height = maximumHeight(layer, this);

                for (var n = 0; n < layer.length; ++n) {
                    var node = layer[n];
                    var gridPosition = node.gridPosition;
                    if (this._isVerticalLayout()) {
                        node.x = x.get(node);
                        node.y = offset + height / 2;
                    }
                    else {
                        node.x = offset + height / 2;
                        node.y = x.get(node);
                    }
                }

                offset += this.options.layerDistance + height;
            }
        },

        adjustDirections: function (l, d, order, placed) {
            if (l + d < 0 || l + d >= this.layers.length) {
                return;
            }

            var prevBridge = null, prevBridgeTarget = null;
            var layer = this.layers[l + d];
            for (var n = 0; n < layer.length; ++n) {
                var nextBridge = layer[n];
                if (nextBridge.isVirtual) {
                    var nextBridgeTarget = this.getNeighborOnLayer(nextBridge, l);
                    if (nextBridgeTarget.isVirtual) {
                        if (prevBridge != null) {
                            var p = placed.get(prevBridgeTarget);
                            var clayer = this.layers[l];
                            var i1 = prevBridgeTarget.layerIndex;
                            var i2 = nextBridgeTarget.layerIndex;
                            for (var i = i1 + 1; i < i2; ++i) {
                                if (clayer[i].isVirtual) {
                                    p = p && placed.get(clayer[i]);
                                }
                            }
                            if (p) {
                                order.set(prevBridge, d);
                                var j1 = prevBridge.layerIndex;
                                var j2 = nextBridge.layerIndex;
                                for (var j = j1 + 1; j < j2; ++j) {
                                    if (layer[j].isVirtual) {
                                        order.set(layer[j], d);
                                    }
                                }
                            }
                        }
                        prevBridge = nextBridge;
                        prevBridgeTarget = nextBridgeTarget;
                    }
                }
            }
        },

        getNeighborOnLayer: function (node, l) {
            var neighbor = this.upNodes.get(node)[0];
            if (neighbor.layer == l) {
                return neighbor;
            }
            neighbor = this.downNodes.get(node)[0];
            if (neighbor.layer == l) {
                return neighbor;
            }
            return null;
        },

        _sequencer: function (x, virtualStart, virtualEnd, dir, sequence) {
            if (sequence.length == 1) {
                this._sequenceSingle(x, virtualStart, virtualEnd, dir, sequence[0]);
            }

            if (sequence.length > 1) {
                var r = sequence.length, t = this.intDiv(r, 2);
                this._sequencer(x, virtualStart, virtualEnd, dir, sequence.slice(0, t));
                this._sequencer(x, virtualStart, virtualEnd, dir, sequence.slice(t));
                this.combineSequences(x, virtualStart, virtualEnd, dir, sequence);
            }
        },

        _sequenceSingle: function (x, virtualStart, virtualEnd, dir, node) {
            var neighbors = dir == -1 ? this.downNodes.get(node) : this.upNodes.get(node);

            var n = neighbors.length;
            if (n != 0) {
                if (n % 2 == 1) {
                    x.set(node, x.get(neighbors[this.intDiv(n, 2)]));
                }
                else {
                    x.set(node, (x.get(neighbors[this.intDiv(n, 2) - 1]) + x.get(neighbors[this.intDiv(n, 2)])) / 2);
                }

                if (virtualStart != null) {
                    x.set(node, Math.max(x.get(node), x.get(virtualStart) + this.getMinDist(virtualStart, node)));
                }
                if (virtualEnd != null) {
                    x.set(node, Math.min(x.get(node), x.get(virtualEnd) - this.getMinDist(node, virtualEnd)));
                }
            }
        },

        combineSequences: function (x, virtualStart, virtualEnd, dir, sequence) {
            var r = sequence.length, t = this.intDiv(r, 2);

            // collect left changes
            var leftHeap = [];
            for (var i = 0; i < t; ++i) {
                var c = 0;
                var neighbors = dir == -1 ? this.downNodes.get(sequence[i]) : this.upNodes.get(sequence[i]);
                for (var n = 0; n < neighbors.length; ++n) {
                    var neighbor = neighbors[n];
                    if (x.get(neighbor) >= x.get(sequence[i])) {
                        c++;
                    }
                    else {
                        c--;
                        leftHeap.push({ k: x.get(neighbor) + this.getMinDist(sequence[i], sequence[t - 1]), v: 2 });
                    }
                }
                leftHeap.push({ k: x.get(sequence[i]) + this.getMinDist(sequence[i], sequence[t - 1]), v: c });
            }
            if (virtualStart != null) {
                leftHeap.push({ k: x.get(virtualStart) + this.getMinDist(virtualStart, sequence[t - 1]), v: Number.MAX_VALUE });
            }
            leftHeap.sort(this._positionDescendingComparer);

            // collect right changes
            var rightHeap = [];
            for (var i = t; i < r; ++i) {
                var c = 0;
                var neighbors = dir == -1 ? this.downNodes.get(sequence[i]) : this.upNodes.get(sequence[i]);
                for (var n = 0; n < neighbors.length; ++n) {
                    var neighbor = neighbors[n];
                    if (x.get(neighbor) <= x.get(sequence[i])) {
                        c++;
                    }
                    else {
                        c--;
                        rightHeap.push({ k: x.get(neighbor) - this.getMinDist(sequence[i], sequence[t]), v: 2 });
                    }
                }
                rightHeap.push({ k: x.get(sequence[i]) - this.getMinDist(sequence[i], sequence[t]), v: c });
            }
            if (virtualEnd != null) {
                rightHeap.push({ k: x.get(virtualEnd) - this.getMinDist(virtualEnd, sequence[t]), v: Number.MAX_VALUE });
            }
            rightHeap.sort(this._positionAscendingComparer);

            var leftRes = 0, rightRes = 0;
            var m = this.getMinDist(sequence[t - 1], sequence[t]);
            while (x.get(sequence[t]) - x.get(sequence[t - 1]) < m) {
                if (leftRes < rightRes) {
                    if (leftHeap.length == 0) {
                        x.set(sequence[t - 1], x.get(sequence[t]) - m);
                        break;
                    }
                    else {
                        var pair = leftHeap.shift();
                        leftRes = leftRes + pair.v;
                        x.set(sequence[t - 1], pair.k);
                        x.set(sequence[t - 1], Math.max(x.get(sequence[t - 1]), x.get(sequence[t]) - m));
                    }
                }
                else {
                    if (rightHeap.length == 0) {
                        x.set(sequence[t], x.get(sequence[t - 1]) + m);
                        break;
                    }
                    else {
                        var pair = rightHeap.shift();
                        rightRes = rightRes + pair.v;
                        x.set(sequence[t], pair.k);
                        x.set(sequence[t], Math.min(x.get(sequence[t]), x.get(sequence[t - 1]) + m));
                    }
                }
            }
            for (var i = t - 2; i >= 0; i--) {
                x.set(sequence[i], Math.min(x.get(sequence[i]), x.get(sequence[t - 1]) - this.getMinDist(sequence[i], sequence[t - 1])));
            }
            for (var i = t + 1; i < r; i++) {
                x.set(sequence[i], Math.max(x.get(sequence[i]), x.get(sequence[t]) + this.getMinDist(sequence[i], sequence[t])));
            }
        },

        placeLeft: function (node, leftPos, leftClass) {
            var pos = Number.NEGATIVE_INFINITY;
            this._getComposite(node).forEach(function (v) {
                var leftSibling = this.leftSibling(v);
                if (leftSibling != null && this.nodeLeftClass.get(leftSibling) == this.nodeLeftClass.get(v)) {
                    if (!leftPos.containsKey(leftSibling)) {
                        this.placeLeft(leftSibling, leftPos, leftClass);
                    }
                    pos = Math.max(pos, leftPos.get(leftSibling) + this.getMinDist(leftSibling, v));
                }
            }, this);
            if (pos == Number.NEGATIVE_INFINITY) {
                pos = 0;
            }
            this._getComposite(node).forEach(function (v) {
                leftPos.set(v, pos);
            });
        },

        placeRight: function (node, rightPos, rightClass) {
            var pos = Number.POSITIVE_INFINITY;
            this._getComposite(node).forEach(function (v) {
                var rightSibling = this.rightSibling(v);
                if (rightSibling != null && this.nodeRightClass.get(rightSibling) == this.nodeRightClass.get(v)) {
                    if (!rightPos.containsKey(rightSibling)) {
                        this.placeRight(rightSibling, rightPos, rightClass);
                    }
                    pos = Math.min(pos, rightPos.get(rightSibling) - this.getMinDist(v, rightSibling));
                }
            }, this);
            if (pos == Number.POSITIVE_INFINITY) {
                pos = 0;
            }
            this._getComposite(node).forEach(function (v) {
                rightPos.set(v, pos);
            });
        },

        leftSibling: function (node) {
            var layer = this.layers[node.layer],
                layerIndex = node.layerIndex;
            return layerIndex == 0 ? null : layer[layerIndex - 1];
        },

        rightSibling: function (node) {
            var layer = this.layers[node.layer];
            var layerIndex = node.layerIndex;
            return layerIndex == layer.length - 1 ? null : layer[layerIndex + 1];

        },

        _getComposite: function (node) {
            return node.isVirtual ? this._nodesInLink(node) : [node];
        },

        arrangeNodes: function () {
            // Initialize node's base priority
            for (var l = 0; l < this.layers.length; l++) {
                var layer = this.layers[l];

                for (var ni = 0; ni < layer.length; ni++) {
                    var node = layer[ni];
                    node.upstreamPriority = node.upstreamLinkCount;
                    node.downstreamPriority = node.downstreamLinkCount;
                }
            }

            // Layout is invoked after MinimizeCrossings
            // so we may assume node's barycenters are initially correct

            var maxLayoutIterations = 2;
            for (var it = 0; it < maxLayoutIterations; it++) {
                for (var i = this.layers.length - 1; i >= 1; i--) {
                    this.layoutLayer(false, i);
                }

                for (var i = 0; i < this.layers.length - 1; i++) {
                    this.layoutLayer(true, i);
                }
            }

            // Offset the whole structure so that there are no gridPositions < 0
            var gridPos = Number.MAX_VALUE;
            for (var l = 0; l < this.layers.length; l++) {
                var layer = this.layers[l];

                for (var ni = 0; ni < layer.length; ni++) {
                    var node = layer[ni];
                    gridPos = Math.min(gridPos, node.gridPosition);
                }
            }

            if (gridPos < 0) {
                for (var l = 0; l < this.layers.length; l++) {
                    var layer = this.layers[l];

                    for (var ni = 0; ni < layer.length; ni++) {
                        var node = layer[ni];
                        node.gridPosition = node.gridPosition - gridPos;
                    }
                }
            }
        },

        /// <summary>
        /// Layout of a single layer.
        /// </summary>
        /// <param name="layerIndex">The layer to organize.</param>
        /// <param name="movingDownwards">If set to <c>true</c> we move down in the layer stack.</param>
        /// <seealso cref="OptimizeCrossings()"/>
        layoutLayer: function (down, layer) {
            var iconsidered;
            var considered;

            if (down) {
                considered = this.layers[iconsidered = layer + 1];
            }
            else {
                considered = this.layers[iconsidered = layer - 1];
            }

            // list containing the nodes in the considered layer sorted by priority
            var sorted = [];
            for (var n = 0; n < considered.length; n++) {
                sorted.push(considered[n]);
            }
            sorted.sort(function (n1, n2) {
                var n1Priority = (n1.upstreamPriority + n1.downstreamPriority) / 2;
                var n2Priority = (n2.upstreamPriority + n2.downstreamPriority) / 2;

                if (Math.abs(n1Priority - n2Priority) < 0.0001) {
                    return 0;
                }
                if (n1Priority < n2Priority) {
                    return 1;
                }
                return -1;
            });

            // each node strives for its barycenter; high priority nodes start first
            sorted.forEach(function (node) {
                var nodeGridPos = node.gridPosition;
                var nodeBaryCenter = this.calcBaryCenter(node);
                var nodePriority = (node.upstreamPriority + node.downstreamPriority) / 2;

                if (Math.abs(nodeGridPos - nodeBaryCenter) < 0.0001) {
                    // This node is exactly at its barycenter -> perfect
                    return;
                }

                if (Math.abs(nodeGridPos - nodeBaryCenter) < 0.25 + 0.0001) {
                    // This node is close enough to the barycenter -> should work
                    return;
                }

                if (nodeGridPos < nodeBaryCenter) {
                    // Try to move the node to the right in an
                    // attempt to reach its barycenter
                    while (nodeGridPos < nodeBaryCenter) {
                        if (!this.moveRight(node, considered, nodePriority)) {
                            break;
                        }

                        nodeGridPos = node.gridPosition;
                    }
                }
                else {
                    // Try to move the node to the left in an
                    // attempt to reach its barycenter
                    while (nodeGridPos > nodeBaryCenter) {
                        if (!this.moveLeft(node, considered, nodePriority)) {
                            break;
                        }

                        nodeGridPos = node.gridPosition;
                    }
                }
            }, this);

            // after the layer has been rearranged we need to recalculate the barycenters
            // of the nodes in the surrounding layers
            if (iconsidered > 0) {
                this.calcDownData(iconsidered - 1);
            }
            if (iconsidered < this.layers.length - 1) {
                this.calcUpData(iconsidered + 1);
            }
        },

        /// <summary>
        /// Moves the node to the right and returns <c>true</c> if this was possible.
        /// </summary>
        /// <param name="node">The node.</param>
        /// <param name="layer">The layer.</param>
        /// <returns>Returns <c>true</c> if the shift was possible, otherwise <c>false</c>.</returns>
        moveRight: function (node, layer, priority) {
            var index = layer.indexOf(node);
            if (index == layer.length - 1) {
                // this is the last node in the layer, so we can move to the right without troubles
                node.gridPosition = node.gridPosition + 0.5;
                return true;
            }

            var rightNode = layer[index + 1];
            var rightNodePriority = (rightNode.upstreamPriority + rightNode.downstreamPriority) / 2;

            // check if there is space between the right and the current node
            if (rightNode.gridPosition > node.gridPosition + 1) {
                node.gridPosition = node.gridPosition + 0.5;
                return true;
            }

            // we have reached a node with higher priority; no movement is allowed
            if (rightNodePriority > priority ||
                Math.abs(rightNodePriority - priority) < 0.0001) {
                return false;
            }

            // the right node has lower priority - try to move it
            if (this.moveRight(rightNode, layer, priority)) {
                node.gridPosition = node.gridPosition + 0.5;
                return true;
            }

            return false;
        },

        /// <summary>
        /// Moves the node to the left and returns <c>true</c> if this was possible.
        /// </summary>
        /// <param name="node">The node.</param>
        /// <param name="layer">The layer.</param>
        /// <returns>Returns <c>true</c> if the shift was possible, otherwise <c>false</c>.</returns>
        moveLeft: function (node, layer, priority) {
            var index = layer.indexOf(node);
            if (index == 0) {
                // this is the last node in the layer, so we can move to the left without troubles
                node.gridPosition = node.gridPosition - 0.5;
                return true;
            }

            var leftNode = layer[index - 1];
            var leftNodePriority = (leftNode.upstreamPriority + leftNode.downstreamPriority) / 2;

            // check if there is space between the left and the current node
            if (leftNode.gridPosition < node.gridPosition - 1) {
                node.gridPosition = node.gridPosition - 0.5;
                return true;
            }

            // we have reached a node with higher priority; no movement is allowed
            if (leftNodePriority > priority ||
                Math.abs(leftNodePriority - priority) < 0.0001) {
                return false;
            }

            // The left node has lower priority - try to move it
            if (this.moveLeft(leftNode, layer, priority)) {
                node.gridPosition = node.gridPosition - 0.5;
                return true;
            }

            return false;
        },

        mapVirtualNode: function (node, link) {
            this.nodeToLinkMap.set(node, link);
            if (!this.linkToNodeMap.containsKey(link)) {
                this.linkToNodeMap.set(link, []);
            }
            this.linkToNodeMap.get(link).push(node);
        },

        _nodesInLink: function (node) {
            return this.linkToNodeMap.get(this.nodeToLinkMap.get(node));
        },

        /// <summary>
        /// Inserts dummy nodes to break long links.
        /// </summary>
        _dummify: function () {
            this.linkToNodeMap = new Dictionary();
            this.nodeToLinkMap = new Dictionary();

            var links = this.graph.links.slice(0);
            for (var l = 0; l < links.length; l++) {
                var link = links[l];
                var o = link.source;
                var d = link.target;

                var oLayer = o.layer;
                var dLayer = d.layer;
                var oPos = o.gridPosition;
                var dPos = d.gridPosition;

                var step = (dPos - oPos) / Math.abs(dLayer - oLayer);

                var p = o;
                if (oLayer - dLayer > 1) {
                    for (var i = oLayer - 1; i > dLayer; i--) {
                        var newNode = new Node();
                        newNode.x = o.x;
                        newNode.y = o.y;
                        newNode.width = o.width / 100;
                        newNode.height = o.height / 100;

                        var layer = this.layers[i];
                        var pos = (i - dLayer) * step + oPos;
                        if (pos > layer.length) {
                            pos = layer.length;
                        }

                        // check if origin and dest are both last
                        if (oPos >= this.layers[oLayer].length - 1 &&
                            dPos >= this.layers[dLayer].length - 1) {
                            pos = layer.length;
                        }

                        // check if origin and destination are both first
                        else if (oPos == 0 && dPos == 0) {
                            pos = 0;
                        }

                        newNode.layer = i;
                        newNode.uBaryCenter = 0.0;
                        newNode.dBaryCenter = 0.0;
                        newNode.upstreamLinkCount = 0;
                        newNode.downstreamLinkCount = 0;
                        newNode.gridPosition = pos;
                        newNode.isVirtual = true;

                        layer.insert(newNode, pos);

                        // translate rightwards nodes' positions
                        for (var r = pos + 1; r < layer.length; r++) {
                            var node = layer[r];
                            node.gridPosition = node.gridPosition + 1;
                        }

                        var newLink = new Link(p, newNode);
                        newLink.depthOfDumminess = 0;
                        p = newNode;

                        // add the new node and the new link to the graph
                        this.graph.nodes.push(newNode);
                        this.graph.addLink(newLink);

                        newNode.index = this.graph.nodes.length - 1;
                        this.mapVirtualNode(newNode, link);
                    }

                    // set the origin of the real arrow to the last dummy
                    link.changeSource(p);
                    link.depthOfDumminess = oLayer - dLayer - 1;
                }

                if (oLayer - dLayer < -1) {
                    for (var i = oLayer + 1; i < dLayer; i++) {
                        var newNode = new Node();
                        newNode.x = o.x;
                        newNode.y = o.y;
                        newNode.width = o.width / 100;
                        newNode.height = o.height / 100;

                        var layer = this.layers[i];
                        var pos = (i - oLayer) * step + oPos;
                        if (pos > layer.length) {
                            pos = layer.length;
                        }

                        // check if origin and dest are both last
                        if (oPos >= this.layers[oLayer].length - 1 &&
                            dPos >= this.layers[dLayer].length - 1) {
                            pos = layer.length;
                        }

                        // check if origin and destination are both first
                        else if (oPos == 0 && dPos == 0) {
                            pos = 0;
                        }

                        newNode.layer = i;
                        newNode.uBaryCenter = 0.0;
                        newNode.dBaryCenter = 0.0;
                        newNode.upstreamLinkCount = 0;
                        newNode.downstreamLinkCount = 0;
                        newNode.gridPosition = pos;
                        newNode.isVirtual = true;

                        pos = pos & pos; // truncates to int
                        layer.insert(newNode, pos);

                        // translate rightwards nodes' positions
                        for (var r = pos + 1; r < layer.length; r++) {
                            var node = layer[r];
                            node.gridPosition = node.gridPosition + 1;
                        }

                        var newLink = new Link(p, newNode);
                        newLink.depthOfDumminess = 0;
                        p = newNode;

                        // add the new node and the new link to the graph
                        this.graph.nodes.push(newNode);
                        this.graph.addLink(newLink);

                        newNode.index = this.graph.nodes.length - 1;
                        this.mapVirtualNode(newNode, link);
                    }

                    // Set the origin of the real arrow to the last dummy
                    link.changeSource(p);
                    link.depthOfDumminess = dLayer - oLayer - 1;
                }
            }
        },

        /// <summary>
        /// Removes the dummy nodes inserted earlier to break long links.
        /// </summary>
        /// <remarks>The virtual nodes are effectively turned into intermediate connection points.</remarks>
        _dedummify: function () {
            var dedum = true;
            while (dedum) {
                dedum = false;

                for (var l = 0; l < this.graph.links.length; l++) {
                    var link = this.graph.links[l];
                    if (link.depthOfDumminess == 0) {
                        continue;
                    }

                    var points = [];

                    // add points in reverse order
                    points.prepend({ x: link.target.x, y: link.target.y });
                    points.prepend({ x: link.source.x, y: link.source.y });

                    // _dedummify the link
                    var temp = link;
                    var depthOfDumminess = link.depthOfDumminess;
                    for (var d = 0; d < depthOfDumminess; d++) {
                        var node = temp.source;
                        var prevLink = node.incoming[0];

                        points.prepend({ x: prevLink.source.x, y: prevLink.source.y });

                        temp = prevLink;
                    }

                    // restore the original link origin
                    link.changeSource(temp.source);

                    // reset dummification flag
                    link.depthOfDumminess = 0;

                    // set link points
                    link.points = points;

                    // we are not going to delete the dummy elements;
                    // they won't be needed anymore anyway.

                    dedum = true;
                    break;
                }
            }
        },

        /// <summary>
        /// Optimizes/reduces the crossings between the layers by turning the crossing problem into a (combinatorial) number ordering problem.
        /// </summary>
        _optimizeCrossings: function () {
            var moves = -1;
            var maxIterations = 3;
            var iter = 0;

            while (moves != 0) {
                if (iter++ > maxIterations) {
                    break;
                }

                moves = 0;

                for (var i = this.layers.length - 1; i >= 1; i--) {
                    moves += this.optimizeLayerCrossings(false, i);
                }

                for (var i = 0; i < this.layers.length - 1; i++) {
                    moves += this.optimizeLayerCrossings(true, i);
                }
            }
        },

        calcUpData: function (layer) {
            if (layer == 0) {
                return;
            }

            var considered = this.layers[layer];
            var upLayer = new Set();
            var temp = this.layers[layer - 1];
            for (var i = 0; i < temp.length; i++) {
                upLayer.add(temp[i]);
            }

            for (var i = 0; i < considered.length; i++) {
                var node = considered[i];

                // calculate barycenter
                var sum = 0;
                var total = 0;

                for (var l = 0; l < node.incoming.length; l++) {
                    var link = node.incoming[l];
                    if (upLayer.contains(link.source)) {
                        total++;
                        sum += link.source.gridPosition;
                    }
                }

                for (var l = 0; l < node.outgoing.length; l++) {
                    var link = node.outgoing[l];
                    if (upLayer.contains(link.target)) {
                        total++;
                        sum += link.target.gridPosition;
                    }
                }

                if (total > 0) {
                    node.uBaryCenter = sum / total;
                    node.upstreamLinkCount = total;
                }
                else {
                    node.uBaryCenter = i;
                    node.upstreamLinkCount = 0;
                }
            }
        },

        calcDownData: function (layer) {
            if (layer == this.layers.length - 1) {
                return;
            }

            var considered = this.layers[layer];
            var downLayer = new Set();
            var temp = this.layers[layer + 1];
            for (var i = 0; i < temp.length; i++) {
                downLayer.add(temp[i]);
            }

            for (var i = 0; i < considered.length; i++) {
                var node = considered[i];

                // calculate barycenter
                var sum = 0;
                var total = 0;

                for (var l = 0; l < node.incoming.length; l++) {
                    var link = node.incoming[l];
                    if (downLayer.contains(link.source)) {
                        total++;
                        sum += link.source.gridPosition;
                    }
                }

                for (var l = 0; l < node.outgoing.length; l++) {
                    var link = node.outgoing[l];
                    if (downLayer.contains(link.target)) {
                        total++;
                        sum += link.target.gridPosition;
                    }
                }

                if (total > 0) {
                    node.dBaryCenter = sum / total;
                    node.downstreamLinkCount = total;
                }
                else {
                    node.dBaryCenter = i;
                    node.downstreamLinkCount = 0;
                }
            }
        },

        /// <summary>
        /// Optimizes the crossings.
        /// </summary>
        /// <remarks>The big trick here is the usage of weights or values attached to connected nodes which turn a problem of crossing links
        /// to an a problem of ordering numbers.</remarks>
        /// <param name="layerIndex">The layer index.</param>
        /// <param name="movingDownwards">If set to <c>true</c> we move down in the layer stack.</param>
        /// <returns>The number of nodes having moved, i.e. the number of crossings reduced.</returns>
        optimizeLayerCrossings: function (down, layer) {
            var iconsidered;
            var considered;

            if (down) {
                considered = this.layers[iconsidered = layer + 1];
            }
            else {
                considered = this.layers[iconsidered = layer - 1];
            }

            // remember what it was
            var presorted = considered.slice(0);

            // calculate barycenters for all nodes in the considered layer
            if (down) {
                this.calcUpData(iconsidered);
            }
            else {
                this.calcDownData(iconsidered);
            }

            // sort nodes within this layer according to the barycenters
            Array.prototype.sort.call(this, considered, function (n1, n2) {
                var n1BaryCenter = this.calcBaryCenter(n1);
                var n2BaryCenter = this.calcBaryCenter(n2);

                if (Math.abs(n1BaryCenter - n2BaryCenter) < 0.0001) {
                    // in case of coinciding barycenters compare by the count of in/out links
                    if (n1.degree() == n2.degree()) {
                        return this.compareByIndex(n1, n2);
                    }
                    else if (n1.degree() < n2.degree()) {
                        return 1;
                    }
                    return -1;
                }

                var compareValue = (n2BaryCenter - n1BaryCenter) * 1000;
                if (compareValue > 0) {
                    return -1;
                }
                else if (compareValue < 0) {
                    return 1;
                }
                return this.compareByIndex(n1, n2);
            });

            // count relocations
            var moves = 0;
            for (var i = 0; i < considered.length; i++) {
                if (considered[i] != presorted[i]) {
                    moves++;
                }
            }

            if (moves > 0) {
                // now that the boxes have been arranged, update their grid positions
                var inode = 0;
                for (var i = 0; i < considered.length; i++) {
                    var node = considered[i];
                    node.gridPosition = inode++;
                }
            }

            return moves;
        },

        /// <summary>
        /// Swaps a pair of nodes in a layer.
        /// </summary>
        /// <param name="layerIndex">Index of the layer.</param>
        /// <param name="n">The Nth node in the layer.</param>
        _swapPairs: function () {
            var maxIterations = this.options.siftingRounds;
            var iter = 0;

            while (true) {
                if (iter++ > maxIterations) {
                    break;
                }

                var downwards = (iter % 4 <= 1);
                var secondPass = (iter % 4 == 1);

                for (var l = (downwards ? 0 : this.layers.length - 1);
                     downwards ? l <= this.layers.length - 1 : l >= 0; l += (downwards ? 1 : -1)) {
                    var layer = this.layers[l];
                    var hasSwapped = false;

                    // there is no need to recalculate crossings if they were calculated
                    // on the previous step and nothing has changed
                    var calcCrossings = true;
                    var memCrossings = 0;

                    for (var n = 0; n < layer.length - 1; n++) {
                        // count crossings
                        var up = 0;
                        var down = 0;
                        var crossBefore = 0;

                        if (calcCrossings) {
                            if (l != 0) {
                                up = this.countLinksCrossingBetweenTwoLayers(l - 1, l);
                            }
                            if (l != this.layers.length - 1) {
                                down = this.countLinksCrossingBetweenTwoLayers(l, l + 1);
                            }
                            if (downwards) {
                                up *= 2;
                            }
                            else {
                                down *= 2;
                            }

                            crossBefore = up + down;
                        }
                        else {
                            crossBefore = memCrossings;
                        }

                        if (crossBefore == 0) {
                            continue;
                        }

                        // Swap nodes
                        var node1 = layer[n];
                        var node2 = layer[n + 1];

                        var node1GridPos = node1.gridPosition;
                        var node2GridPos = node2.gridPosition;
                        layer[n] = node2;
                        layer[n + 1] = node1;
                        node1.gridPosition = node2GridPos;
                        node2.gridPosition = node1GridPos;

                        // count crossings again and if worse than before, restore swapping
                        up = 0;
                        if (l != 0) {
                            up = this.countLinksCrossingBetweenTwoLayers(l - 1, l);
                        }
                        down = 0;
                        if (l != this.layers.length - 1) {
                            down = this.countLinksCrossingBetweenTwoLayers(l, l + 1);
                        }
                        if (downwards) {
                            up *= 2;
                        }
                        else {
                            down *= 2;
                        }
                        var crossAfter = up + down;

                        var revert = false;
                        if (secondPass) {
                            revert = crossAfter >= crossBefore;
                        }
                        else {
                            revert = crossAfter > crossBefore;
                        }

                        if (revert) {
                            node1 = layer[n];
                            node2 = layer[n + 1];

                            node1GridPos = node1.gridPosition;
                            node2GridPos = node2.gridPosition;
                            layer[n] = node2;
                            layer[n + 1] = node1;
                            node1.gridPosition = node2GridPos;
                            node2.gridPosition = node1GridPos;

                            // nothing has changed, remember the crossings so that
                            // they are not calculated again on the next step
                            memCrossings = crossBefore;
                            calcCrossings = false;
                        }
                        else {
                            hasSwapped = true;
                            calcCrossings = true;
                        }
                    }

                    if (hasSwapped) {
                        if (l != this.layers.length - 1) {
                            this.calcUpData(l + 1);
                        }
                        if (l != 0) {
                            this.calcDownData(l - 1);
                        }
                    }
                }
            }
        },

        /// <summary>
        /// Counts the number of links crossing between two layers.
        /// </summary>
        /// <param name="layerIndex1">The layer index.</param>
        /// <param name="layerIndex2">Another layer index.</param>
        /// <returns></returns>
        countLinksCrossingBetweenTwoLayers: function (ulayer, dlayer) {
            var crossings = 0;

            var upperLayer = new Set();
            var temp1 = this.layers[ulayer];
            for (var i = 0; i < temp1.length; i++) {
                upperLayer.add(temp1[i]);
            }

            var lowerLayer = new Set();
            var temp2 = this.layers[dlayer];
            for (var i = 0; i < temp2.length; i++) {
                lowerLayer.add(temp2[i]);
            }

            // collect the links located between the layers
            var dlinks = new Set();
            var links = [];
            var temp = [];

            upperLayer.forEach(function (node) {
                //throw "";
                temp.addRange(node.incoming);
                temp.addRange(node.outgoing);
            });

            for (var ti = 0; ti < temp.length; ti++) {
                var link = temp[ti];

                if (upperLayer.contains(link.source) &&
                    lowerLayer.contains(link.target)) {
                    dlinks.add(link);
                    links.push(link);
                }
                else if (lowerLayer.contains(link.source) &&
                    upperLayer.contains(link.target)) {
                    links.push(link);
                }
            }

            for (var l1 = 0; l1 < links.length; l1++) {
                var link1 = links[l1];
                for (var l2 = 0; l2 < links.length; l2++) {
                    if (l1 == l2) {
                        continue;
                    }

                    var link2 = links[l2];

                    var n11, n12;
                    var n21, n22;

                    if (dlinks.contains(link1)) {
                        n11 = link1.source;
                        n12 = link1.target;
                    }
                    else {
                        n11 = link1.target;
                        n12 = link1.source;
                    }

                    if (dlinks.contains(link2)) {
                        n21 = link2.source;
                        n22 = link2.target;
                    }
                    else {
                        n21 = link2.target;
                        n22 = link2.source;
                    }

                    var n11gp = n11.gridPosition;
                    var n12gp = n12.gridPosition;
                    var n21gp = n21.gridPosition;
                    var n22gp = n22.gridPosition;

                    if ((n11gp - n21gp) * (n12gp - n22gp) < 0) {
                        crossings++;
                    }
                }
            }

            return crossings / 2;
        },

        calcBaryCenter: function (node) {
            var upstreamLinkCount = node.upstreamLinkCount;
            var downstreamLinkCount = node.downstreamLinkCount;
            var uBaryCenter = node.uBaryCenter;
            var dBaryCenter = node.dBaryCenter;

            if (upstreamLinkCount > 0 && downstreamLinkCount > 0) {
                return (uBaryCenter + dBaryCenter) / 2;
            }
            if (upstreamLinkCount > 0) {
                return uBaryCenter;
            }
            if (downstreamLinkCount > 0) {
                return dBaryCenter;
            }

            return 0;
        },

        _gridPositionComparer: function (x, y) {
            if (x.gridPosition < y.gridPosition) {
                return -1;
            }
            if (x.gridPosition > y.gridPosition) {
                return 1;
            }
            return 0;
        },

        _positionAscendingComparer: function (x, y) {
            return x.k < y.k ? -1 : x.k > y.k ? 1 : 0;
        },

        _positionDescendingComparer: function (x, y) {
            return x.k < y.k ? 1 : x.k > y.k ? -1 : 0;
        },

        _firstVirtualNode: function (layer) {
            for (var c = 0; c < layer.length; c++) {
                if (layer[c].isVirtual) {
                    return c;
                }
            }
            return -1;
        },

        compareByIndex: function (o1, o2) {
            var i1 = o1.index;
            var i2 = o2.index;

            if (i1 < i2) {
                return 1;
            }

            if (i1 > i2) {
                return -1;
            }

            return 0;
        },

        intDiv: function (numerator, denominator) {
            return (numerator - numerator % denominator) / denominator;
        },

        nextVirtualNode: function (layer, node) {
            var nodeIndex = node.layerIndex;
            for (var i = nodeIndex + 1; i < layer.length; ++i) {
                if (layer[i].isVirtual) {
                    return layer[i];
                }
            }
            return null;
        }

    });

    deepExtend(diagram, {
        init: function (element) {
            kendo.init(element, kendo.diagram.ui);
        },
        SpringLayout: SpringLayout,
        TreeLayout: TreeLayout,
        GraphAdapter: DiagramToHyperTreeAdapter,
        ChildrenLayout: ChildrenLayout,
        LayoutTypes: LayoutTypes,
        TreeLayoutType: TreeLayoutType,
        TreeDirection: TreeDirection,
        LayeredLayout: LayeredLayout,
        LayeredLayoutType: LayeredLayoutType,
        LayoutBase: LayoutBase
    })
})
    (window.kendo.jQuery)