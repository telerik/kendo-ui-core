(function(window) {
    var selectorCache = {}
    var type = {}.toString
    var parser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g, attrParser = /\[(.+?)(?:=("|'|)(.+?)\2)?\]/

//    window.selectorCache = selectorCache;

    kendo.dom = m = function(tag, attrs, children) {
        //var args = arguments

        var hasAttrs = type.call(attrs) == "[object Object]";

        //var attrs = hasAttrs ? args[1] : {}

        //var classAttrName = "class" in attrs ? "class" : "className"

        //var cell = selectorCache[tag];

        //if (cell === undefined) {
         //   selectorCache[tag] = cell = {tag: tag, attrs: {}}

          //  var match, classes = []

            /*
            while (match = parser.exec(tag)) {
                if (match[1] == "") cell.tag = match[2]
                else if (match[1] == "#") cell.attrs.id = match[2]
                else if (match[1] == ".") classes.push(match[2])
                else if (match[3][0] == "[") {
                    var pair = attrParser.exec(match[3])
                    cell.attrs[pair[1]] = pair[3] || true
                }
            }
            */
            //if (classes.length > 0) cell.attrs[classAttrName] = classes.join(" ")
        //}
        var cell = {
            tag: tag,
            attrs: hasAttrs ? attrs : {},
            children: hasAttrs ? children : attrs
        };

        //cell = clone(cell)
        //cell.attrs = clone(cell.attrs)
        //cell.children = hasAttrs ? args[2] : args[1];
        //for (var attrName in attrs) {
        //    if (attrName == classAttrName) cell.attrs[attrName] = (cell.attrs[attrName] || "") + " " + attrs[attrName]
        //    else cell.attrs[attrName] = attrs[attrName]
        //}
        return cell;
    }
    function build(parent, data, cached) {
        if (data === null || data === undefined) {
            return;
        }

        var cachedType = type.call(cached);

        var dataType = type.call(data);

        if (cachedType != dataType) {
            if (cached !== null && cached !== undefined) {
                clear(cached.nodes);
            }

            cached = new data.constructor;

            cached.nodes = [];
        }

        if (dataType == "[object Array]") {
            var nodes = [];

            var intact = cached.length === data.length;

            for (var i = 0; i < data.length; i++) {
                var item = build(parent, data[i], cached[i]);

                if (!item.nodes.intact) {
                    intact = false;
                }

                cached[i] = item;
            }

            if (!intact) {
                for (var i = 0; i < data.length; i++)  {
                    nodes = nodes.concat(cached[i].nodes);
                }

                for (var i = nodes.length, node; node = cached.nodes[i]; i++)  {
                    if (node.parentNode !== null) {
                        node.parentNode.removeChild(node);
                    }
                }

                for (var i = cached.nodes.length, node; node = nodes[i]; i++) {
                    if (node.parentNode === null) {
                        parent.appendChild(node);
                    }
                }

                cached.length = data.length;
                cached.nodes = nodes;
            }
        } else if (dataType == "[object Object]") {

            if (data.tag != cached.tag || Object.keys(data.attrs).join() != Object.keys(cached.attrs).join()) {
                clear(cached.nodes);
            }

            var node;

            var isNew = cached.nodes.length === 0;

            if (isNew) {
                node = document.createElement(data.tag);
                cached = {
                    tag: data.tag,
                    attrs: setAttributes(node, data.attrs, {}),
                    children: build(node, data.children, cached.children),
                    nodes: [node]
                };
                parent.appendChild(node)
            } else {
                node = cached.nodes[0];
                setAttributes(node, data.attrs, cached.attrs);
                cached.children = build(node, data.children, cached.children);
                cached.nodes.intact = true;
            }

            //if (type.call(data.attrs["config"]) == "[object Function]") data.attrs["config"](node, !isNew)
        } else {
            var node;

            if (cached.nodes.length === 0) {
            /*
                if (data.$trusted) {
                    var lastChild = parent.lastChild;
                    parent.insertAdjacentHTML("beforeend", data);
                    node = lastChild ? lastChild.nextSibling : parent.firstChild;
                } else */ {

                    node = document.createTextNode(data)
                    parent.appendChild(node)
                }
                cached = "string number boolean".indexOf(typeof data) > -1 ? new data.constructor(data) : data
                cached.nodes = [node];
            } else if (cached.valueOf() !== data.valueOf()) {
                /*
                if (data.$trusted) {
                    var current = cached.nodes[0];
                    var nodes = [current];

                    if (current) {
                        while (current = current.nextSibling)  {
                            nodes.push(current);
                        }

                        clear(nodes);

                        var lastChild = parent.lastChild;

                        parent.insertAdjacentHTML("beforeend", data);

                        node = lastChild ? lastChild.nextSibling : parent.firstChild;
                    } else  {
                        parent.innerHTML = data;
                    }
                } else */{
                    node = cached.nodes[0];
                    parent.appendChild(node);
                    node.nodeValue = data;
                }
                cached = new data.constructor(data);
                cached.nodes = [node];
            } else  {
                cached.nodes.intact = true;
            }
        }

        return cached;
    }

    function setAttributes(node, dataAttrs, cachedAttrs) {
        for (var attrName in dataAttrs) {
            var dataAttr = dataAttrs[attrName];
            if (!(attrName in cachedAttrs) || cachedAttrs[attrName] !== dataAttr) {
                cachedAttrs[attrName] = dataAttr;
                //if (attrName == "config") continue
                //if (attrName.indexOf("on") == 0 && typeof dataAttr == "function") dataAttr = autoredraw(dataAttr, node)

                if (attrName == "style") {
                    for (var rule in dataAttr) {
                        node.style[rule] = dataAttr[rule];
                    }
                } else if (attrName in node) {
                    node[attrName] = dataAttr;
                } else {
                    node.setAttribute(attrName, dataAttr);
                }
            }
        }

        return cachedAttrs;
    }

    function clear(nodes) {
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].parentNode.removeChild(nodes[i]);
        }

        nodes.length = 0;
    }

/*
    function clone(object) {
        var result = {}
        for (var prop in object) result[prop] = object[prop]
        return result
    }
    function autoredraw(callback, object) {
        return function() {
            m.startComputation()
            var output = callback.apply(object || window, arguments)
            m.endComputation()
            return output
        }
    }

*/
    var html;
    /*
    var documentNode = {
        insertAdjacentHTML: function(_, data) {
            window.document.write(data)
            window.document.close()
        },
        appendChild: function(node) {
            if (html === undefined) html = window.document.createElement("html")
            if (node.nodeName == "HTML") html = node
            else html.appendChild(node)
            if (window.document.documentElement !== html) {
                window.document.replaceChild(html, window.document.documentElement)
            }
        }
    };
    */

    var nodeCache = [], cellCache = {};

    window.nodeCache = nodeCache;

    window.cellCache = cellCache;

    m.render = function(root, cell) {
        var index = nodeCache.indexOf(root)
        var id = index < 0 ? nodeCache.push(root) - 1 : index
        //var node = root == window.document || root == window.document.documentElement ? documentNode : root
        var node = root;
        cellCache[id] = build(node, cell, cellCache[id])
    }

/*
    m.trust = function(value) {
        value = new String(value)
        value.$trusted = true
        return value
    }
*/

    //var currentRoot, currentModule = {view: function() {}}, currentController = {}, now = 0, lastRedraw = 0, lastRedrawId = 0
    var now = 0, lastRedraw = 0, lastRedrawId = 0;

/*
    m.module = function(root, module) {
        m.startComputation()
        currentRoot = root
        currentModule = module
        currentController = new module.controller
        m.endComputation()
    }
    m.redraw = function() {
        m.render(currentRoot || window.document, currentModule.view(currentController))
        lastRedraw = now
    }
*/
    function redraw() {
        now = window.performance && window.performance.now ? window.performance.now() : new window.Date().getTime()
        if (now - lastRedraw > 16) m.redraw()
        else {
            var cancel = window.cancelAnimationFrame || window.clearTimeout
            var defer = window.requestAnimationFrame || window.setTimeout
            cancel(lastRedrawId)
            lastRedrawId = defer(m.redraw, 0)
        }
    }

    var pendingRequests = 0, computePostRedrawHook = null
    m.startComputation = function() {pendingRequests++}
    m.endComputation = function() {
        pendingRequests = Math.max(pendingRequests - 1, 0)
        if (pendingRequests == 0) {
            redraw()
            if (computePostRedrawHook) {
                computePostRedrawHook()
                computePostRedrawHook = null
            }
        }
    }

/*
    m.withAttr = function(prop, withAttrCallback) {
        return function(e) {withAttrCallback(prop in e.currentTarget ? e.currentTarget[prop] : e.currentTarget.getAttribute(prop))}
    }
*/
}(this));
