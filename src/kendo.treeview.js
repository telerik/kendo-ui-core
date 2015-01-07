(function(f, define){
    define([ "./kendo.data", "./kendo.draganddrop" ], f);
})(function(){

var __meta__ = {
    id: "treeview",
    name: "TreeView",
    category: "web",
    description: "The TreeView widget displays hierarchical data in a traditional tree structure,with support for interactive drag-and-drop operations.",
    depends: [ "data", "draganddrop" ]
};

/*jshint eqnull: true */
(function($, undefined){
    var kendo = window.kendo,
        ui = kendo.ui,
        data = kendo.data,
        extend = $.extend,
        template = kendo.template,
        isArray = $.isArray,
        Widget = ui.Widget,
        HierarchicalDataSource = data.HierarchicalDataSource,
        proxy = $.proxy,
        keys = kendo.keys,
        NS = ".kendoTreeView",
        SELECT = "select",
        CHECK = "check",
        NAVIGATE = "navigate",
        EXPAND = "expand",
        CHANGE = "change",
        ERROR = "error",
        CHECKED = "checked",
        INDETERMINATE = "indeterminate",
        COLLAPSE = "collapse",
        DRAGSTART = "dragstart",
        DRAG = "drag",
        DROP = "drop",
        DRAGEND = "dragend",
        DATABOUND = "dataBound",
        CLICK = "click",
        VISIBILITY = "visibility",
        UNDEFINED = "undefined",
        KSTATEHOVER = "k-state-hover",
        KTREEVIEW = "k-treeview",
        VISIBLE = ":visible",
        NODE = ".k-item",
        STRING = "string",
        ARIASELECTED = "aria-selected",
        ARIADISABLED = "aria-disabled",
        TreeView,
        subGroup, nodeContents, nodeIcon,
        spriteRe,
        bindings = {
            text: "dataTextField",
            url: "dataUrlField",
            spriteCssClass: "dataSpriteCssClassField",
            imageUrl: "dataImageUrlField"
        },
        isDomElement = function (o){
            return (
                typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
                o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === STRING
            );
        };

    function contentChild(filter) {
        return function(node) {
            var result = node.children(".k-animation-container");

            if (!result.length) {
                result = node;
            }

            return result.children(filter);
        };
    }

    function templateNoWith(code) {
        return kendo.template(code, { useWithBlock: false });
    }

    subGroup = contentChild(".k-group");
    nodeContents = contentChild(".k-group,.k-content");
    nodeIcon = function(node) {
        return node.children("div").children(".k-icon");
    };

    function checkboxes(node) {
        return node.find("> div .k-checkbox [type=checkbox]");
    }

    function insertAction(indexOffset) {
        return function (nodeData, referenceNode) {
            referenceNode = referenceNode.closest(NODE);

            var group = referenceNode.parent(),
                parentNode;

            if (group.parent().is("li")) {
                parentNode = group.parent();
            }

            return this._dataSourceMove(nodeData, group, parentNode, function (dataSource, model) {
                return this._insert(dataSource.data(), model, referenceNode.index() + indexOffset);
            });
        };
    }

    spriteRe = /k-sprite/;

    function moveContents(node, container) {
        var tmp;

        while (node && node.nodeName.toLowerCase() != "ul") {
            tmp = node;
            node = node.nextSibling;

            if (tmp.nodeType == 3) {
                tmp.nodeValue = $.trim(tmp.nodeValue);
            }

            if (spriteRe.test(tmp.className)) {
                container.insertBefore(tmp, container.firstChild);
            } else {
                container.appendChild(tmp);
            }
        }
    }

    function updateNodeHtml(node) {
        var wrapper = node.children("div"),
            group = node.children("ul"),
            toggleButton = wrapper.children(".k-icon"),
            checkbox = node.children(":checkbox"),
            innerWrapper = wrapper.children(".k-in");

        if (node.hasClass("k-treeview")) {
            return;
        }

        if (!wrapper.length) {
            wrapper = $("<div />").prependTo(node);
        }

        if (!toggleButton.length && group.length) {
            toggleButton = $("<span class='k-icon' />").prependTo(wrapper);
        } else if (!group.length || !group.children().length) {
            toggleButton.remove();
            group.remove();
        }

        if (checkbox.length) {
            $("<span class='k-checkbox' />").appendTo(wrapper).append(checkbox);
        }

        if (!innerWrapper.length) {
            innerWrapper = node.children("a").eq(0).addClass("k-in");

            if (!innerWrapper.length) {
                innerWrapper = $("<span class='k-in' />");
            }

            innerWrapper.appendTo(wrapper);

            if (wrapper.length) {
                moveContents(wrapper[0].nextSibling, innerWrapper[0]);
            }
        }
    }

    TreeView = kendo.ui.DataBoundWidget.extend({
        init: function (element, options) {
            var that = this,
                dataInit,
                inferred = false,
                hasDataSource = options && !!options.dataSource,
                list;

            if (isArray(options)) {
                dataInit = true;
                options = { dataSource: options };
            }

            if (options && typeof options.loadOnDemand == UNDEFINED && isArray(options.dataSource)) {
                options.loadOnDemand = false;
            }

            Widget.prototype.init.call(that, element, options);

            element = that.element;
            options = that.options;

            list = (element.is("ul") && element) ||
                   (element.hasClass(KTREEVIEW) && element.children("ul"));

            inferred = !hasDataSource && list.length;

            if (inferred) {
                options.dataSource.list = list;
            }

            that._animation();

            that._accessors();

            that._templates();

            // render treeview if it's not already rendered
            if (!element.hasClass(KTREEVIEW)) {
                that._wrapper();

                if (list) {
                    that.root = element;
                    that._group(that.wrapper);
                }
            } else {
                // otherwise just initialize properties
                that.wrapper = element;
                that.root = element.children("ul").eq(0);
            }

            that._tabindex();

            that.root.attr("role", "tree");

            that._dataSource(inferred);

            that._attachEvents();

            that._dragging();

            if (!inferred) {
                if (options.autoBind) {
                    that._progress(true);
                    that.dataSource.fetch();
                }
            } else {
                that._syncHtmlAndDataSource();
            }

            if (options.checkboxes && options.checkboxes.checkChildren) {
                that.updateIndeterminate();
            }

            if (that.element[0].id) {
                that._ariaId = kendo.format("{0}_tv_active", that.element[0].id);
            }

            kendo.notify(that);
        },

        _attachEvents: function() {
            var that = this,
                clickableItems = ".k-in:not(.k-state-selected,.k-state-disabled)",
                MOUSEENTER = "mouseenter";

            that.wrapper
                .on(MOUSEENTER + NS, ".k-in.k-state-selected", function(e) { e.preventDefault(); })
                .on(MOUSEENTER + NS, clickableItems, function () { $(this).addClass(KSTATEHOVER); })
                .on("mouseleave" + NS, clickableItems, function () { $(this).removeClass(KSTATEHOVER); })
                .on(CLICK + NS, clickableItems, proxy(that._click, that))
                .on("dblclick" + NS, ".k-in:not(.k-state-disabled)", proxy(that._toggleButtonClick, that))
                .on(CLICK + NS, ".k-plus,.k-minus", proxy(that._toggleButtonClick, that))
                .on("keydown" + NS, proxy(that._keydown, that))
                .on("focus" + NS, proxy(that._focus, that))
                .on("blur" + NS, proxy(that._blur, that))
                .on("mousedown" + NS, ".k-in,.k-checkbox :checkbox,.k-plus,.k-minus", proxy(that._mousedown, that))
                .on("change" + NS, ".k-checkbox :checkbox", proxy(that._checkboxChange, that))
                .on("click" + NS, ".k-checkbox :checkbox", proxy(that._checkboxClick, that))
                .on("click" + NS, ".k-request-retry", proxy(that._retryRequest, that))
                .on("click" + NS, function(e) {
                    if (!$(e.target).is(":kendoFocusable")) {
                        that.focus();
                    }
                });
        },

        _checkboxClick: function(e) {
            var checkbox = $(e.target);

            if (checkbox.data(INDETERMINATE)) {
                checkbox
                    .data(INDETERMINATE, false)
                    .prop(INDETERMINATE, false)
                    .prop(CHECKED, true);

                this._checkboxChange(e);
            }
        },

        _syncHtmlAndDataSource: function(root, dataSource) {
            root = root || this.root;
            dataSource = dataSource || this.dataSource;

            var data = dataSource.view();
            var uidAttr = kendo.attr("uid");
            var expandedAttr = kendo.attr("expanded");
            var inferCheckedState = this.options.checkboxes;
            var items = root.children("li");
            var i, item, dataItem;

            for (i = 0; i < items.length; i++) {
                dataItem = data[i];

                item = items.eq(i);

                item.attr("role", "treeitem").attr(uidAttr, dataItem.uid);

                dataItem.expanded = item.attr(expandedAttr) === "true";
                if (inferCheckedState) {
                    dataItem.checked = checkboxes(item).prop(CHECKED);
                }

                this._syncHtmlAndDataSource(item.children("ul"), dataItem.children);
            }
        },

        _animation: function() {
            var options = this.options,
                animationOptions = options.animation;

            if (animationOptions === false) {
                animationOptions = {
                    expand: { effects: {} },
                    collapse: { hide: true, effects: {} }
                };
            } else if (!animationOptions.collapse || !("effects" in animationOptions.collapse)) {
                animationOptions.collapse = extend({ reverse: true }, animationOptions.expand);
            }

            extend(animationOptions.collapse, { hide: true });

            options.animation = animationOptions;
        },

        _dragging: function() {
            var enabled = this.options.dragAndDrop;
            var dragging = this.dragging;

            if (enabled && !dragging) {
                this.dragging = new TreeViewDragAndDrop(this);
            } else if (!enabled && dragging) {
                dragging.destroy();
                this.dragging = null;
            }
        },

        _templates: function() {
            var that = this,
                options = that.options,
                fieldAccessor = proxy(that._fieldAccessor, that);

            if (options.template && typeof options.template == STRING) {
                options.template = template(options.template);
            } else if (!options.template) {
                options.template = templateNoWith(
                    "# var text = " + fieldAccessor("text") + "(data.item); #" +
                    "# if (typeof data.item.encoded != 'undefined' && data.item.encoded === false) {#" +
                        "#= text #" +
                    "# } else { #" +
                        "#: text #" +
                    "# } #"
                );
            }

            that._checkboxes();

            that.templates = {
                wrapperCssClass: function (group, item) {
                    var result = "k-item",
                        index = item.index;

                    if (group.firstLevel && index === 0) {
                        result += " k-first";
                    }

                    if (index == group.length-1) {
                        result += " k-last";
                    }

                    return result;
                },
                cssClass: function(group, item) {
                    var result = "",
                        index = item.index,
                        groupLength = group.length - 1;

                    if (group.firstLevel && index === 0) {
                        result += "k-top ";
                    }

                    if (index === 0 && index != groupLength) {
                        result += "k-top";
                    } else if (index == groupLength) {
                        result += "k-bot";
                    } else {
                        result += "k-mid";
                    }

                    return result;
                },
                textClass: function(item) {
                    var result = "k-in";

                    if (item.enabled === false) {
                        result += " k-state-disabled";
                    }

                    if (item.selected === true) {
                        result += " k-state-selected";
                    }

                    return result;
                },
                toggleButtonClass: function(item) {
                    var result = "k-icon";

                    if (item.expanded !== true) {
                        result += " k-plus";
                    } else {
                        result += " k-minus";
                    }

                    if (item.enabled === false) {
                        result += "-disabled";
                    }

                    return result;
                },
                groupAttributes: function(group) {
                    var attributes = "";

                    if (!group.firstLevel) {
                        attributes = "role='group'";
                    }

                    return attributes + (group.expanded !== true ? " style='display:none'" : "");
                },
                groupCssClass: function(group) {
                    var cssClass = "k-group";

                    if (group.firstLevel) {
                        cssClass += " k-treeview-lines";
                    }

                    return cssClass;
                },
                dragClue: templateNoWith(
                    "<div class='k-header k-drag-clue'>" +
                        "<span class='k-icon k-drag-status' />" +
                        "#= data.treeview.template(data) #" +
                    "</div>"
                ),
                group: templateNoWith(
                    "<ul class='#= data.r.groupCssClass(data.group) #'#= data.r.groupAttributes(data.group) #>" +
                        "#= data.renderItems(data) #" +
                    "</ul>"
                ),
                itemContent: templateNoWith(
                    "# var imageUrl = " + fieldAccessor("imageUrl") + "(data.item); #" +
                    "# var spriteCssClass = " + fieldAccessor("spriteCssClass") + "(data.item); #" +
                    "# if (imageUrl) { #" +
                        "<img class='k-image' alt='' src='#= imageUrl #'>" +
                    "# } #" +

                    "# if (spriteCssClass) { #" +
                        "<span class='k-sprite #= spriteCssClass #' />" +
                    "# } #" +

                    "#= data.treeview.template(data) #"
                ),
                itemElement: templateNoWith(
                    "# var item = data.item, r = data.r; #" +
                    "# var url = " + fieldAccessor("url") + "(item); #" +
                    "<div class='#= r.cssClass(data.group, item) #'>" +
                        "# if (item.hasChildren) { #" +
                            "<span class='#= r.toggleButtonClass(item) #' role='presentation' />" +
                        "# } #" +

                        "# if (data.treeview.checkboxes) { #" +
                            "<span class='k-checkbox' role='presentation'>" +
                                "#= data.treeview.checkboxes.template(data) #" +
                            "</span>" +
                        "# } #" +

                        "# var tag = url ? 'a' : 'span'; #" +
                        "# var textAttr = url ? ' href=\\'' + url + '\\'' : ''; #" +

                        "<#=tag#  class='#= r.textClass(item) #'#= textAttr #>" +
                            "#= r.itemContent(data) #" +
                        "</#=tag#>" +
                    "</div>"
                ),
                item: templateNoWith(
                    "# var item = data.item, r = data.r; #" +
                    "<li role='treeitem' class='#= r.wrapperCssClass(data.group, item) #' " +
                        kendo.attr("uid") + "='#= item.uid #' " +
                        "aria-selected='#= item.selected ? \"true\" : \"false \" #' " +
                        "#=item.enabled === false ? \"aria-disabled='true'\" : ''#" +
                        "# if (item.expanded) { #" +
                        "data-expanded='true' aria-expanded='true'" +
                        "# } #" +
                    ">" +
                        "#= r.itemElement(data) #" +
                    "</li>"
                ),
                loading: templateNoWith(
                    "<div class='k-icon k-loading' /> #: data.messages.loading #"
                ),
                retry: templateNoWith(
                    "#: data.messages.requestFailed # " +
                    "<button class='k-button k-request-retry'>#: data.messages.retry #</button>"
                )
            };
        },

        items: function() {
            return this.element.find(".k-item > div:first-child");
        },

        setDataSource: function(dataSource) {
            var options = this.options;

            options.dataSource = dataSource;

            this._dataSource();

            this.dataSource.fetch();

            if (options.checkboxes && options.checkboxes.checkChildren) {
                this.updateIndeterminate();
            }
        },

        _bindDataSource: function() {
            this._refreshHandler = proxy(this.refresh, this);
            this._errorHandler = proxy(this._error, this);

            this.dataSource.bind(CHANGE, this._refreshHandler);
            this.dataSource.bind(ERROR, this._errorHandler);
        },

        _unbindDataSource: function() {
            var dataSource = this.dataSource;

            if (dataSource) {
                dataSource.unbind(CHANGE, this._refreshHandler);
                dataSource.unbind(ERROR, this._errorHandler);
            }
        },

        _dataSource: function(silentRead) {
            var that = this,
                options = that.options,
                dataSource = options.dataSource;

            function recursiveRead(data) {
                for (var i = 0; i < data.length; i++) {
                    data[i]._initChildren();

                    data[i].children.fetch();

                    recursiveRead(data[i].children.view());
                }
            }

            dataSource = isArray(dataSource) ? { data: dataSource } : dataSource;

            that._unbindDataSource();

            if (!dataSource.fields) {
                dataSource.fields = [
                    { field: "text" },
                    { field: "url" },
                    { field: "spriteCssClass" },
                    { field: "imageUrl" }
                ];
            }

            that.dataSource = dataSource = HierarchicalDataSource.create(dataSource);

            if (silentRead) {
                dataSource.fetch();

                recursiveRead(dataSource.view());
            }

            that._bindDataSource();
        },

        events: [
            DRAGSTART,
            DRAG,
            DROP,
            DRAGEND,

            DATABOUND,

            EXPAND,
            COLLAPSE,
            SELECT,
            CHANGE,
            NAVIGATE,
            CHECK
        ],

        options: {
            name: "TreeView",
            dataSource: {},
            animation: {
                expand: {
                    effects: "expand:vertical",
                    duration: 200
                }, collapse: {
                    duration: 100
                }
            },
            messages: {
                loading: "Loading...",
                requestFailed: "Request failed.",
                retry: "Retry"
            },
            dragAndDrop: false,
            checkboxes: false,
            autoBind: true,
            loadOnDemand: true,
            template: "",
            dataTextField: null
        },

        _accessors: function() {
            var that = this,
                options = that.options,
                i, field, textField,
                element = that.element;

            for (i in bindings) {
                field = options[bindings[i]];
                textField = element.attr(kendo.attr(i + "-field"));

                if (!field && textField) {
                    field = textField;
                }

                if (!field) {
                    field = i;
                }

                if (!isArray(field)) {
                    field = [field];
                }

                options[bindings[i]] = field;
            }
        },

        // generates accessor function for a given field name, honoring the data*Field arrays
        _fieldAccessor: function(fieldName) {
            var fieldBindings = this.options[bindings[fieldName]],
                count = fieldBindings.length,
                result = "(function(item) {";

            if (count === 0) {
                result += "return item['" + fieldName + "'];";
            } else {
                result += "var levels = [" +
                            $.map(fieldBindings, function(x) {
                                return "function(d){ return " + kendo.expr(x) + "}";
                            }).join(",") + "];";

                result += "return levels[Math.min(item.level(), " + count + "-1)](item)";
            }

            result += "})";

            return result;
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);

            this._animation();

            this._dragging();

            this._templates();
        },

        _trigger: function (eventName, node) {
            return this.trigger(eventName, {
                node: node.closest(NODE)[0]
            });
        },

        _setChecked: function(datasource, value) {
            if (!datasource || !$.isFunction(datasource.view)) {
                return;
            }

            for (var i = 0, nodes = datasource.view(); i < nodes.length; i++) {
                nodes[i][CHECKED] = value;

                if (nodes[i].children) {
                    this._setChecked(nodes[i].children, value);
                }
            }
        },

        _setIndeterminate: function(node) {
            var group = subGroup(node),
                siblings, length,
                all = true,
                i;

            if (!group.length) {
                return;
            }

            siblings = checkboxes(group.children());
            length = siblings.length;

            if (!length) {
                return;
            } else if (length > 1) {
                for (i = 1; i < length; i++) {
                    if (siblings[i].checked != siblings[i-1].checked ||
                        siblings[i].indeterminate || siblings[i-1].indeterminate) {
                        all = false;
                        break;
                    }
                }
            } else {
                all = !siblings[0].indeterminate;
            }

            return checkboxes(node)
                .data(INDETERMINATE, !all)
                .prop(INDETERMINATE, !all)
                .prop(CHECKED, all && siblings[0].checked);
        },

        updateIndeterminate: function(node) {
            // top-down update of inital indeterminate state for all nodes
            node = node || this.wrapper;

            var subnodes = subGroup(node).children();
            var i;
            var checkbox;

            if (subnodes.length) {
                for (i = 0; i < subnodes.length; i++) {
                    this.updateIndeterminate(subnodes.eq(i));
                }

                checkbox = this._setIndeterminate(node);

                if (checkbox && checkbox.prop(CHECKED)) {
                    this.dataItem(node).checked = true;
                }
            }
        },

        _bubbleIndeterminate: function(node) {
            // bottom-up setting of indeterminate state of parent nodes
            if (!node.length) {
                return;
            }

            var parentNode = this.parent(node),
                checkbox;

            if (parentNode.length) {
                this._setIndeterminate(parentNode);
                checkbox = parentNode.children("div").find(".k-checkbox :checkbox");

                if (checkbox.prop(INDETERMINATE) === false) {
                    this.dataItem(parentNode).set(CHECKED, checkbox.prop(CHECKED));
                } else {
                    this.dataItem(parentNode).checked = false;
                }

                this._bubbleIndeterminate(parentNode);
            }
        },

        _checkboxChange: function(e) {
            var checkbox = $(e.target);
            var isChecked = checkbox.prop(CHECKED);
            var node = checkbox.closest(NODE);

            this.dataItem(node).set(CHECKED, isChecked);

            this._trigger(CHECK, node);
        },

        _toggleButtonClick: function (e) {
            this.toggle($(e.target).closest(NODE));
        },

        _mousedown: function(e) {
            var node = $(e.currentTarget).closest(NODE);

            this._clickTarget = node;
            this.current(node);
        },

        _focusable: function (node) {
            return node && node.length && node.is(":visible") && !node.find(".k-in:first").hasClass("k-state-disabled");
        },

        _focus: function() {
            var current = this.select(),
                clickTarget = this._clickTarget;

            // suppress initial focus state on touch devices (until keyboard is used)
            if (kendo.support.touch) {
                return;
            }

            if (clickTarget && clickTarget.length) {
                current = clickTarget;
            }

            if (!this._focusable(current)) {
                current = this.current();
            }

            if (!this._focusable(current)) {
                current = this._nextVisible($());
            }

            this.current(current);
        },

        focus: function() {
            var wrapper = this.wrapper,
                scrollContainer = wrapper[0],
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

            wrapper.focus();

            for (i = 0; i < containers.length; i++) {
                containers[i].scrollTop = offsets[i];
            }
        },

        _blur: function() {
            this.current().find(".k-in:first").removeClass("k-state-focused");
        },

        _enabled: function(node) {
            return !node.children("div").children(".k-in").hasClass("k-state-disabled");
        },

        parent: function(node) {
            var wrapperRe = /\bk-treeview\b/,
                itemRe = /\bk-item\b/,
                result,
                skipSelf;

            if (typeof node == STRING) {
                node = this.element.find(node);
            }

            if (!isDomElement(node)) {
                node = node[0];
            }

            skipSelf = itemRe.test(node.className);

            do {
                node = node.parentNode;

                if (itemRe.test(node.className)) {
                    if (skipSelf) {
                        result = node;
                    } else {
                        skipSelf = true;
                    }
                }
            } while (!wrapperRe.test(node.className) && !result);

            return $(result);
        },

        _nextVisible: function(node) {
            var that = this,
                expanded = that._expanded(node),
                result;

            function nextParent(node) {
                while (node.length && !node.next().length) {
                    node = that.parent(node);
                }

                if (node.next().length) {
                    return node.next();
                } else {
                    return node;
                }
            }

            if (!node.length || !node.is(":visible")) {
                result = that.root.children().eq(0);
            } else if (expanded) {
                result = subGroup(node).children().first();

                // expanded node with no children
                if (!result.length) {
                    result = nextParent(node);
                }
            } else {
                result = nextParent(node);
            }

            if (!that._enabled(result)) {
                result = that._nextVisible(result);
            }

            return result;
        },

        _previousVisible: function(node) {
            var that = this,
                lastChild,
                result;

            if (!node.length || node.prev().length) {
                if (node.length) {
                    result = node.prev();
                } else {
                    result = that.root.children().last();
                }

                while (that._expanded(result)) {
                    lastChild = subGroup(result).children().last();

                    if (!lastChild.length) {
                        break;
                    }

                    result = lastChild;
                }
            } else {
                result = that.parent(node) || node;
            }

            if (!that._enabled(result)) {
                result = that._previousVisible(result);
            }

            return result;
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                target,
                focused = that.current(),
                expanded = that._expanded(focused),
                checkbox = focused.find(".k-checkbox:first :checkbox"),
                rtl = kendo.support.isRtl(that.element);

            if (e.target != e.currentTarget) {
                return;
            }

            if ((!rtl && key == keys.RIGHT) || (rtl && key == keys.LEFT)) {
                if (expanded) {
                    target = that._nextVisible(focused);
                } else {
                    that.expand(focused);
                }
            } else if ((!rtl && key == keys.LEFT) || (rtl && key == keys.RIGHT)) {
                if (expanded) {
                    that.collapse(focused);
                } else {
                    target = that.parent(focused);

                    if (!that._enabled(target)) {
                        target = undefined;
                    }
                }
            } else if (key == keys.DOWN) {
                target = that._nextVisible(focused);
            } else if (key == keys.UP) {
                target = that._previousVisible(focused);
            } else if (key == keys.HOME) {
                target = that._nextVisible($());
            } else if (key == keys.END) {
                target = that._previousVisible($());
            } else if (key == keys.ENTER) {
                if (!focused.find(".k-in:first").hasClass("k-state-selected")) {
                    if (!that._trigger(SELECT, focused)) {
                        that.select(focused);
                    }
                }
            } else if (key == keys.SPACEBAR && checkbox.length) {
                checkbox.prop(CHECKED, !checkbox.prop(CHECKED))
                    .data(INDETERMINATE, false)
                    .prop(INDETERMINATE, false);

                that._checkboxChange({ target: checkbox });

                target = focused;
            }

            if (target) {
                e.preventDefault();

                if (focused[0] != target[0]) {
                    that._trigger(NAVIGATE, target);
                    that.current(target);
                }
            }
        },

        _click: function (e) {
            var that = this,
                node = $(e.currentTarget),
                contents = nodeContents(node.closest(NODE)),
                href = node.attr("href"),
                shouldNavigate;

            if (href) {
                shouldNavigate = href == "#" || href.indexOf("#" + this.element.id + "-") >= 0;
            } else {
                shouldNavigate = contents.length && !contents.children().length;
            }

            if (shouldNavigate) {
                e.preventDefault();
            }

            if (!node.hasClass(".k-state-selected") && !that._trigger(SELECT, node)) {
                that.select(node);
            }
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper, root,
                wrapperClasses = "k-widget k-treeview";

            if (element.is("ul")) {
                wrapper = element.wrap('<div />').parent();
                root = element;
            } else {
                wrapper = element;
                root = wrapper.children("ul").eq(0);
            }

            that.wrapper = wrapper.addClass(wrapperClasses);
            that.root = root;
        },

        _group: function(item) {
            var that = this,
                firstLevel = item.hasClass(KTREEVIEW),
                group = {
                    firstLevel: firstLevel,
                    expanded: firstLevel || that._expanded(item)
                },
                groupElement = item.children("ul");

            groupElement
                .addClass(that.templates.groupCssClass(group))
                .css("display", group.expanded ? "" : "none");

            that._nodes(groupElement, group);
        },

        _nodes: function(groupElement, groupData) {
            var that = this,
                nodes = groupElement.children("li"),
                nodeData;

            groupData = extend({ length: nodes.length }, groupData);

            nodes.each(function(i, node) {
                node = $(node);

                nodeData = { index: i, expanded: that._expanded(node) };

                updateNodeHtml(node);

                that._updateNodeClasses(node, groupData, nodeData);

                // iterate over child nodes
                that._group(node);
            });
        },

        _checkboxes: function() {
            var options = this.options;
            var checkboxes = options.checkboxes;
            var defaultTemplate;

            if (checkboxes) {
                defaultTemplate = "<input type='checkbox' #= (item.enabled === false) ? 'disabled' : '' # #= item.checked ? 'checked' : '' #";

                if (checkboxes.name) {
                    defaultTemplate += " name='" + checkboxes.name + "'";
                }

                defaultTemplate += " />";

                checkboxes = extend({
                    template: defaultTemplate
                }, options.checkboxes);

                if (typeof checkboxes.template == STRING) {
                    checkboxes.template = template(checkboxes.template);
                }

                options.checkboxes = checkboxes;
            }
        },

        _updateNodeClasses: function (node, groupData, nodeData) {
            var wrapper = node.children("div"),
                group = node.children("ul"),
                templates = this.templates;

            if (node.hasClass("k-treeview")) {
                return;
            }

            nodeData = nodeData || {};
            nodeData.expanded = typeof nodeData.expanded != UNDEFINED ? nodeData.expanded : this._expanded(node);
            nodeData.index = typeof nodeData.index != UNDEFINED ? nodeData.index : node.index();
            nodeData.enabled = typeof nodeData.enabled != UNDEFINED ? nodeData.enabled : !wrapper.children(".k-in").hasClass("k-state-disabled");

            groupData = groupData || {};
            groupData.firstLevel = typeof groupData.firstLevel != UNDEFINED ? groupData.firstLevel : node.parent().parent().hasClass(KTREEVIEW);
            groupData.length = typeof groupData.length != UNDEFINED ? groupData.length : node.parent().children().length;

            // li
            node.removeClass("k-first k-last")
                .addClass(templates.wrapperCssClass(groupData, nodeData));

            // div
            wrapper.removeClass("k-top k-mid k-bot")
                   .addClass(templates.cssClass(groupData, nodeData));

            // span
            wrapper.children(".k-in").removeClass("k-in k-state-default k-state-disabled")
                .addClass(templates.textClass(nodeData));

            // toggle button
            if (group.length || node.attr("data-hasChildren") == "true") {
                wrapper.children(".k-icon").removeClass("k-plus k-minus k-plus-disabled k-minus-disabled")
                    .addClass(templates.toggleButtonClass(nodeData));

                group.addClass("k-group");
            }
        },


        _processNodes: function(nodes, callback) {
            var that = this;
            that.element.find(nodes).each(function(index, item) {
                callback.call(that, index, $(item).closest(NODE));
            });
        },

        dataItem: function(node) {
            var uid = $(node).closest(NODE).attr(kendo.attr("uid")),
                dataSource = this.dataSource;

            return dataSource && dataSource.getByUid(uid);
        },

        _insertNode: function(nodeData, index, parentNode, insertCallback, collapsed) {
            var that = this,
                group = subGroup(parentNode),
                updatedGroupLength = group.children().length + 1,
                childrenData,
                groupData = {
                    firstLevel: parentNode.hasClass(KTREEVIEW),
                    expanded: !collapsed,
                    length: updatedGroupLength
                }, node, i, item, nodeHtml = "",
                append = function(item, group) {
                    item.appendTo(group);
                };

            for (i = 0; i < nodeData.length; i++) {
                item = nodeData[i];

                item.index = index + i;

                nodeHtml += that._renderItem({
                    group: groupData,
                    item: item
                });
            }

            node = $(nodeHtml);

            if (!node.length) {
                return;
            }

            that.angular("compile", function(){
                return {
                    elements: node.get(),
                    data: nodeData.map(function(item){
                        return { dataItem: item };
                    })
                };
            });

            if (!group.length) {
                group = $(that._renderGroup({
                    group: groupData
                })).appendTo(parentNode);
            }

            insertCallback(node, group);

            if (parentNode.hasClass("k-item")) {
                updateNodeHtml(parentNode);
                that._updateNodeClasses(parentNode);
            }

            that._updateNodeClasses(node.prev().first());
            that._updateNodeClasses(node.next().last());

            // render sub-nodes
            for (i = 0; i < nodeData.length; i++) {
                item = nodeData[i];

                if (item.hasChildren) {
                    childrenData = item.children.data();

                    if (childrenData.length) {
                        that._insertNode(childrenData, item.index, node.eq(i), append, !that._expanded(node.eq(i)));
                    }
                }
            }

            return node;
        },

        _updateNode: function(field, items) {
            var that = this, i, node, item,
                isChecked, isCollapsed,
                context = { treeview: that.options, item: item },
                shouldUpdate = false;

            function access() {
                shouldUpdate = true;
            }

            function setCheckedState(root, state) {
                root.find(".k-checkbox :checkbox")
                    .prop(CHECKED, state)
                    .data(INDETERMINATE, false)
                    .prop(INDETERMINATE, false);
            }

            if (field == "selected") {
                item = items[0];

                node = that.findByUid(item.uid).find(".k-in:first")
                        .removeClass("k-state-hover")
                        .toggleClass("k-state-selected", item[field])
                        .end();

                if (item[field]) {
                    that.current(node);
                    node.attr(ARIASELECTED, true);
                } else {
                    node.attr(ARIASELECTED, false);
                }
            } else {
                if ($.inArray(field, that.options.dataTextField) >= 0) {
                    shouldUpdate = true;
                } else {
                    context.item = items[0];
                    context.item.bind("get", access);
                    that.templates.itemContent(context);
                    context.item.unbind("set", access);
                }

                for (i = 0; i < items.length; i++) {
                    context.item = item = items[i];

                    if (field == "spriteCssClass" || field == "imageUrl" || shouldUpdate) {
                        that.findByUid(item.uid).find(">div>.k-in").html(that.templates.itemContent(context));
                    }

                    if (field == CHECKED) {
                        node = that.findByUid(item.uid);

                        isChecked = item[field];

                        setCheckedState(node.children("div"), isChecked);

                        if (that.options.checkboxes.checkChildren) {
                            setCheckedState(node.children(".k-group"), isChecked);

                            that._setChecked(item.children, isChecked);

                            that._bubbleIndeterminate(node);
                        }
                    } else if (field == "expanded") {
                        that._toggle(that.findByUid(item.uid), item, item[field]);
                    } else if (field == "enabled") {
                        node = that.findByUid(item.uid);

                        node.find(".k-checkbox :checkbox").prop("disabled", !item[field]);

                        isCollapsed = !nodeContents(node).is(VISIBLE);

                        node.removeAttr(ARIADISABLED);

                        if (!item[field]) {
                            if (item.selected) {
                                item.set("selected", false);
                            }

                            if (item.expanded) {
                                item.set("expanded", false);
                            }

                            isCollapsed = true;
                            node.attr(ARIASELECTED, false)
                                .attr(ARIADISABLED, true);
                        }

                        that._updateNodeClasses(node, {}, { enabled: item[field], expanded: !isCollapsed });
                    }
                }
            }
        },

        _appendItems: function(index, items, parentNode) {
            var group = subGroup(parentNode);
            var children = group.children();
            var collapsed = !this._expanded(parentNode);

            if (typeof index == UNDEFINED) {
                index = children.length;
            }

            this._insertNode(items, index, parentNode, function(item, group) {
                // insert node into DOM
                if (index >= children.length) {
                    item.appendTo(group);
                } else {
                    item.insertBefore(children.eq(index));
                }
            }, collapsed);

            if (this._expanded(parentNode)) {
                this._updateNodeClasses(parentNode);
                subGroup(parentNode).css("display", "block");
            }
        },

        refresh: function(e) {
            var parentNode = this.wrapper,
                node = e.node,
                action = e.action,
                items = e.items,
                options = this.options,
                loadOnDemand = options.loadOnDemand,
                checkChildren = options.checkboxes && options.checkboxes.checkChildren,
                i;

            if (e.field) {
                if (!items[0] || !items[0].level) {
                    return;
                }

                return this._updateNode(e.field, items);
            }

            if (node) {
                parentNode = this.findByUid(node.uid);
                this._progress(parentNode, false);
            }

            if (checkChildren && action != "remove") {
                var bubble = false;

                for (i = 0; i < items.length; i++) {
                    if ("checked" in items[i]) {
                        bubble = true;
                        break;
                    }
                }

                if (!bubble && node && node.checked) {
                    for (i = 0; i < items.length; i++) {
                        items[i].checked = true;
                    }
                }
            }

            if (action == "add") {
                this._appendItems(e.index, items, parentNode);
            } else if (action == "remove") {
                this._remove(this.findByUid(items[0].uid), false);
            } else {
                if (node) {
                    subGroup(parentNode).empty();

                    if (!items.length) {
                        updateNodeHtml(parentNode);

                        this.trigger("itemChange", { item: parentNode, data: node, ns: ui });
                    } else {
                        this._appendItems(e.index, items, parentNode);

                        var children = subGroup(parentNode).children();

                        if (loadOnDemand && checkChildren) {
                            this._bubbleIndeterminate(children.last());
                        }

                        for (i = 0; i < children.length; i++) {
                            var child = children.eq(i);
                            this.trigger("itemChange", { item: child, data: this.dataItem(child), ns: ui });
                        }
                    }
                } else {

                    var groupHtml = this._renderGroup({
                            items: items,
                            group: {
                                firstLevel: true,
                                expanded: true
                            }
                        });

                    if (this.root.length) {

                        this._angularItems("cleanup");

                        var group = $(groupHtml);

                        this.root
                            .attr("class", group.attr("class"))
                            .html(group.html());
                    } else {
                        this.root = this.wrapper.html(groupHtml).children("ul");
                    }

                    this.root.attr("role", "tree");

                    this._angularItems("compile");
                }
            }

            for (i = 0; i < items.length; i++) {
                if (!loadOnDemand || items[i].expanded) {
                    items[i].load();
                }
            }

            this.trigger(DATABOUND, {
                node: node ? parentNode : undefined
            });
        },

        _error: function(e) {
            var node = e.node && this.findByUid(e.node.uid);
            var retryHtml = this.templates.retry({ messages: this.options.messages });

            if (node) {
                this._progress(node, false);
                this._expanded(node, false);
                nodeIcon(node).addClass("k-i-refresh");
                e.node.loaded(false);
            } else {
                this._progress(false);
                this.element.html(retryHtml);
            }
        },

        _retryRequest: function(e) {
            e.preventDefault();

            this.dataSource.fetch();
        },

        expand: function (nodes) {
            this._processNodes(nodes, function (index, item) {
                this.toggle(item, true);
            });
        },

        collapse: function (nodes) {
            this._processNodes(nodes, function (index, item) {
                this.toggle(item, false);
            });
        },

        enable: function (nodes, enable) {
            enable = arguments.length == 2 ? !!enable : true;

            this._processNodes(nodes, function (index, item) {
                this.dataItem(item).set("enabled", enable);
            });
        },

        current: function(node) {
            var that = this,
                current = that._current,
                element = that.element,
                id = that._ariaId;

            if (arguments.length > 0 && node && node.length) {
                if (current) {
                    if (current[0].id === id) {
                        current.removeAttr("id");
                    }

                    current.find(".k-in:first").removeClass("k-state-focused");
                }

                current = that._current = $(node, element).closest(NODE);

                current.find(".k-in:first").addClass("k-state-focused");

                id = current[0].id || id;

                if (id) {
                    that.wrapper.removeAttr("aria-activedescendant");
                    current.attr("id", id);
                    that.wrapper.attr("aria-activedescendant", id);
                }

                return;
            }

            if (!current) {
                current = that._nextVisible($());
            }

            return current;
        },

        select: function (node) {
            var that = this,
                element = that.element;

            if (!arguments.length) {
                return element.find(".k-state-selected").closest(NODE);
            }

            node = $(node, element).closest(NODE);

            element.find(".k-state-selected").each(function() {
                var dataItem = that.dataItem(this);
                dataItem.set("selected", false);
                delete dataItem.selected;
            });

            if (node.length) {
                that.dataItem(node).set("selected", true);
            }

            that.trigger(CHANGE);
        },

        _toggle: function(node, dataItem, expand) {
            var options = this.options;
            var contents = nodeContents(node);
            var direction = expand ? "expand" : "collapse";
            var loaded, empty;

            if (contents.data("animating")) {
                return;
            }

            if (!this._trigger(direction, node)) {
                this._expanded(node, expand);

                loaded = dataItem && dataItem.loaded();
                empty = !contents.children().length;

                if (expand && (!loaded || empty)) {
                    if (options.loadOnDemand) {
                        this._progress(node, true);
                    }

                    contents.remove();
                    dataItem.load();
                } else {
                    this._updateNodeClasses(node, {}, { expanded: expand });

                    if (contents.css("display") == (expand ? "block" : "none")) {
                        return;
                    }

                    if (!expand) {
                        contents.css("height", contents.height()).css("height");
                    }

                    contents
                        .kendoStop(true, true)
                        .kendoAnimate(extend(
                            { reset: true },
                            options.animation[direction],
                            { complete: function() {
                                if (expand) {
                                    contents.css("height", "");
                                }
                            } }
                        ));
                }
            }
        },

        toggle: function (node, expand) {
            node = $(node);

            if (!nodeIcon(node).is(".k-minus,.k-plus,.k-minus-disabled,.k-plus-disabled")) {
                return;
            }

            if (arguments.length == 1) {
                expand = !this._expanded(node);
            }

            this._expanded(node, expand);
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.wrapper.off(NS);

            that._unbindDataSource();

            if (that.dragging) {
                that.dragging.destroy();
            }

            kendo.destroy(that.element);

            that.root = that.wrapper = that.element = null;
        },

        _expanded: function(node, value) {
            var expandedAttr = kendo.attr("expanded"),
                dataItem = this.dataItem(node);

            if (arguments.length == 1) {
                return node.attr(expandedAttr) === "true" || (dataItem && dataItem.expanded);
            }

            if (nodeContents(node).data("animating")) {
                return;
            }

            if (dataItem) {
                dataItem.set("expanded", value);
                // necessary when expanding an item yields an error and the item is not expanded as a result
                value = dataItem.expanded;
            }

            if (value) {
                node.attr(expandedAttr, "true");
                node.attr("aria-expanded", "true");
            } else {
                node.removeAttr(expandedAttr);
                node.attr("aria-expanded", "false");
            }
        },

        _progress: function(node, showProgress) {
            var element = this.element;
            var loadingText = this.templates.loading({ messages: this.options.messages });

            if (arguments.length == 1) {
                showProgress = node;

                if (showProgress) {
                    element.html(loadingText);
                } else {
                    element.empty();
                }
            } else {
                nodeIcon(node).toggleClass("k-loading", showProgress).removeClass("k-i-refresh");
            }
        },

        text: function (node, text) {
            var dataItem = this.dataItem(node),
                fieldBindings = this.options[bindings.text],
                level = dataItem.level(),
                length = fieldBindings.length,
                field = fieldBindings[Math.min(level, length-1)];

            if (text) {
                dataItem.set(field, text);
            } else {
                return dataItem[field];
            }
        },

        _objectOrSelf: function (node) {
            return $(node).closest("[data-role=treeview]").data("kendoTreeView") || this;
        },

        _dataSourceMove: function(nodeData, group, parentNode, callback) {
            var referenceDataItem,
                destTreeview = this._objectOrSelf(parentNode || group),
                destDataSource = destTreeview.dataSource;
            var loadPromise = $.Deferred().resolve().promise();

            if (parentNode && parentNode[0] != destTreeview.element[0]) {
                referenceDataItem = destTreeview.dataItem(parentNode);

                if (!referenceDataItem.loaded()) {
                    destTreeview._progress(parentNode, true);
                    loadPromise = referenceDataItem.load();
                }

                if (parentNode != this.root) {
                    destDataSource = referenceDataItem.children;

                    if (!destDataSource || !(destDataSource instanceof HierarchicalDataSource)) {
                        referenceDataItem._initChildren();
                        referenceDataItem.loaded(true);
                        destDataSource = referenceDataItem.children;
                    }
                }
            }

            nodeData = this._toObservableData(nodeData);

            return callback.call(this, destDataSource, nodeData, loadPromise);
        },

        _toObservableData: function(node) {
            var dataItem = node, dataSource, uid;

            if (node instanceof window.jQuery || isDomElement(node)) {
                dataSource = this._objectOrSelf(node).dataSource;
                uid = $(node).attr(kendo.attr("uid"));
                dataItem = dataSource.getByUid(uid);

                if (dataItem) {
                    dataItem = dataSource.remove(dataItem);
                }
            }

            return dataItem;
        },

        _insert: function(data, model, index) {
            if (!(model instanceof kendo.data.ObservableArray)) {
                if (!isArray(model)) {
                    model = [model];
                }
            } else {
                // items will be converted to new Node instances
                model = model.toJSON();
            }

            var parentNode = data.parent();

            if (parentNode && parentNode._initChildren) {
                parentNode.hasChildren = true;
                parentNode._initChildren();
            }

            data.splice.apply(data, [ index, 0 ].concat(model));

            return this.findByUid(data[index].uid);
        },

        insertAfter: insertAction(1),

        insertBefore: insertAction(0),

        append: function (nodeData, parentNode, success) {
            var that = this,
                group = that.root;

            if (parentNode) {
                group = subGroup(parentNode);
            }

            return that._dataSourceMove(nodeData, group, parentNode, function (dataSource, model, loadModel) {
                var inserted;

                function add() {
                    if (parentNode) {
                        that._expanded(parentNode, true);
                    }

                    var data = dataSource.data(),
                        index = Math.max(data.length, 0);

                    return that._insert(data, model, index);
                }

                loadModel.then(function() {
                    inserted = add();
                    success = success || $.noop;
                    success(inserted);
                });

                return inserted || null;
            });
        },

        _remove: function (node, keepData) {
            var that = this,
                parentNode,
                prevSibling, nextSibling;

            node = $(node, that.element);

            this.angular("cleanup", function(){
                return { elements: node.get() };
            });

            parentNode = node.parent().parent();
            prevSibling = node.prev();
            nextSibling = node.next();

            node[keepData ? "detach" : "remove"]();

            if (parentNode.hasClass("k-item")) {
                updateNodeHtml(parentNode);
                that._updateNodeClasses(parentNode);
            }

            that._updateNodeClasses(prevSibling);
            that._updateNodeClasses(nextSibling);

            return node;
        },

        remove: function (node) {
            var dataItem = this.dataItem(node);
            if (dataItem) {
                this.dataSource.remove(dataItem);
            }
        },

        detach: function (node) {
            return this._remove(node, true);
        },

        findByText: function(text) {
            return $(this.element).find(".k-in").filter(function(i, element) {
                return $(element).text() == text;
            }).closest(NODE);
        },

        findByUid: function(uid) {
            return this.element.find(".k-item[" + kendo.attr("uid") + "=" + uid + "]");
        },

        expandPath: function(path, complete) {
            path = path.slice(0);
            var treeview = this;
            var dataSource = this.dataSource;
            var node = dataSource.get(path[0]);
            complete = complete || $.noop;

            // expand loaded nodes
            while (path.length > 0 && (node.expanded || node.loaded())) {
                node.set("expanded", true);
                path.shift();
                node = dataSource.get(path[0]);
            }

            if (!path.length) {
                return complete.call(treeview);
            }

            // expand async nodes
            dataSource.bind("change", function expandLevel(e) {
                // listen to the change event to know when the node has been loaded
                var id = e.node && e.node.id;

                // proceed if the change is caused by the last fetching
                if (id && id === path[0]) {
                    path.shift();

                    if (path.length) {
                        dataSource.get(path[0]).set("expanded", true);
                    } else {
                        complete.call(treeview);
                    }
                }
            });

            node.set("expanded", true);
        },

        _parents: function(node) {
            var parent = node && node.parentNode();
            var parents = [];
            while (parent) {
                parents.push(parent);
                parent = parent.parentNode();
            }

            return parents;
        },

        expandTo: function(node) {
            if (!(node instanceof kendo.data.Node)) {
                node = this.dataSource.get(node);
            }

            var parents = this._parents(node);

            for (var i = 0; i < parents.length; i++) {
                parents[i].set("expanded", true);
            }
        },

        _renderItem: function (options) {
            if (!options.group) {
                options.group = {};
            }

            options.treeview = this.options;

            options.r = this.templates;

            return this.templates.item(options);
        },

        _renderGroup: function (options) {
            var that = this;

            options.renderItems = function(options) {
                    var html = "",
                        i = 0,
                        items = options.items,
                        len = items ? items.length : 0,
                        group = options.group;

                    group.length = len;

                    for (; i < len; i++) {
                        options.group = group;
                        options.item = items[i];
                        options.item.index = i;
                        html += that._renderItem(options);
                    }

                    return html;
                };

            options.r = that.templates;

            return that.templates.group(options);
        }
    });

    function TreeViewDragAndDrop(treeview) {
        var that = this;

        that.treeview = treeview;
        that.hovered = treeview.element;

        that._draggable = new ui.Draggable(treeview.element, {
           filter: "div:not(.k-state-disabled) .k-in",
           hint: function(node) {
               return treeview.templates.dragClue({
                   item: treeview.dataItem(node),
                   treeview: treeview.options
               });
           },
           cursorOffset: {
               left: 10,
               top: kendo.support.mobileOS ? -40 / kendo.support.zoomLevel() : 10
           },
           dragstart: proxy(that.dragstart, that),
           dragcancel: proxy(that.dragcancel, that),
           drag: proxy(that.drag, that),
           dragend: proxy(that.dragend, that),
           $angular: treeview.options.$angular
        });
    }

    TreeViewDragAndDrop.prototype = {
        _removeTouchHover: function() {
            var that = this;

            if (kendo.support.touch && that.hovered) {
                that.hovered.find("." + KSTATEHOVER).removeClass(KSTATEHOVER);
                that.hovered = false;
            }
        },

        _hintStatus: function(newStatus) {
            var statusElement = this._draggable.hint.find(".k-drag-status")[0];

            if (newStatus) {
                statusElement.className = "k-icon k-drag-status " + newStatus;
            } else {
                return $.trim(statusElement.className.replace(/k-(icon|drag-status)/g, ""));
            }
        },

        dragstart: function (e) {
            var that = this,
                treeview = that.treeview,
                sourceNode = that.sourceNode = e.currentTarget.closest(NODE);

            if (treeview.trigger(DRAGSTART, { sourceNode: sourceNode[0] })) {
                e.preventDefault();
            }

            that.dropHint = $("<div class='k-drop-hint' />")
                .css(VISIBILITY, "hidden")
                .appendTo(treeview.element);
        },

        drag: function (e) {
            var that = this,
                treeview = that.treeview,
                sourceNode = that.sourceNode,
                dropTarget = that.dropTarget = $(kendo.eventTarget(e)),
                statusClass, closestTree = dropTarget.closest(".k-treeview"),
                hoveredItem, hoveredItemPos, itemHeight, itemTop, itemContent, delta,
                insertOnTop, insertOnBottom, addChild;

            if (!closestTree.length) {
                // dragging node outside of treeview
                statusClass = "k-denied";
                that._removeTouchHover();
            } else if ($.contains(sourceNode[0], dropTarget[0])) {
                // dragging node within itself
                statusClass = "k-denied";
            } else {
                // moving or reordering node
                statusClass = "k-insert-middle";

                hoveredItem = dropTarget.closest(".k-top,.k-mid,.k-bot");

                if (hoveredItem.length) {
                    itemHeight = hoveredItem.outerHeight();
                    itemTop = kendo.getOffset(hoveredItem).top;
                    itemContent = dropTarget.closest(".k-in");
                    delta = itemHeight / (itemContent.length > 0 ? 4 : 2);

                    insertOnTop = e.y.location < (itemTop + delta);
                    insertOnBottom = (itemTop + itemHeight - delta) < e.y.location;
                    that._removeTouchHover();
                    addChild = itemContent.length && !insertOnTop && !insertOnBottom;
                    that.hovered = addChild ? closestTree : false;

                    that.dropHint.css(VISIBILITY, addChild ? "hidden" : "visible");
                    itemContent.toggleClass(KSTATEHOVER, addChild);

                    if (addChild) {
                        statusClass = "k-add";
                    } else {
                        hoveredItemPos = hoveredItem.position();
                        hoveredItemPos.top += insertOnTop ? 0 : itemHeight;

                        that.dropHint
                            .css(hoveredItemPos)
                            [insertOnTop ? "prependTo" : "appendTo"](dropTarget.closest(NODE).children("div:first"));

                        if (insertOnTop && hoveredItem.hasClass("k-top")) {
                            statusClass = "k-insert-top";
                        }

                        if (insertOnBottom && hoveredItem.hasClass("k-bot")) {
                            statusClass = "k-insert-bottom";
                        }
                    }
                } else if (dropTarget[0] != that.dropHint[0]) {
                    if (closestTree[0] != treeview.element[0]) {
                        // moving node to different treeview without children
                        statusClass = "k-add";
                    } else {
                        statusClass = "k-denied";
                    }
                }
            }

            treeview.trigger(DRAG, {
                sourceNode: sourceNode[0],
                dropTarget: dropTarget[0],
                pageY: e.y.location,
                pageX: e.x.location,
                statusClass: statusClass.substring(2),
                setStatusClass: function (value) {
                    statusClass = value;
                }
            });

            if (statusClass.indexOf("k-insert") !== 0) {
                that.dropHint.css(VISIBILITY, "hidden");
            }

            that._hintStatus(statusClass);
        },

        dragcancel: function() {
            this.dropHint.remove();
        },

        dragend: function () {
            var that = this,
                treeview = that.treeview,
                dropPosition = "over",
                sourceNode = that.sourceNode,
                destinationNode,
                dropHint = that.dropHint,
                dropTarget = that.dropTarget,
                e, dropPrevented;

            if (dropHint.css(VISIBILITY) == "visible") {
                dropPosition = dropHint.prevAll(".k-in").length > 0 ? "after" : "before";
                destinationNode = dropHint.closest(NODE);
            } else if (dropTarget) {
                destinationNode = dropTarget.closest(".k-treeview .k-item");

                // moving node to root element
                if (!destinationNode.length) {
                    destinationNode = dropTarget.closest(".k-treeview");
                }
            }

            e = {
                sourceNode: sourceNode[0],
                destinationNode: destinationNode[0],
                valid: that._hintStatus() != "k-denied",
                setValid: function(newValid) {
                    this.valid = newValid;
                },
                dropTarget: dropTarget[0],
                dropPosition: dropPosition
            };

            dropPrevented = treeview.trigger(DROP, e);

            dropHint.remove();
            that._removeTouchHover();

            if (!e.valid || dropPrevented) {
                that._draggable.dropped = e.valid;
                return;
            }

            that._draggable.dropped = true;

            function triggerDragEnd(sourceNode) {
                treeview.updateIndeterminate();

                treeview.trigger(DRAGEND, {
                    sourceNode: sourceNode && sourceNode[0],
                    destinationNode: destinationNode[0],
                    dropPosition: dropPosition
                });
            }

            // perform reorder / move
            // different handling is necessary because append might be async in remote bound tree
            if (dropPosition == "over") {
                treeview.append(sourceNode, destinationNode, triggerDragEnd);
            } else {
                if (dropPosition == "before") {
                    sourceNode = treeview.insertBefore(sourceNode, destinationNode);
                } else if (dropPosition == "after") {
                    sourceNode = treeview.insertAfter(sourceNode, destinationNode);
                }

                triggerDragEnd(sourceNode);
            }
        },

        destroy: function() {
            this._draggable.destroy();
        }
    };

    ui.plugin(TreeView);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
