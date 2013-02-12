kendo_module({
    id: "treeview",
    name: "TreeView",
    category: "web",
    description: "The TreeView widget displays hierarchical data in a traditional tree structure,with support for interactive drag-and-drop operations.",
    depends: [ "data", "draganddrop" ]
});

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
        NAVIGATE = "navigate",
        EXPAND = "expand",
        CHANGE = "change",
        CHECKED = "checked",
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

    subGroup = contentChild(".k-group");
    nodeContents = contentChild(".k-group,.k-content");
    nodeIcon = function(node) {
        return node.children("div").children(".k-icon");
    };

    function checkboxes(node) {
        return node.children("div").find(":checkbox:first");
    }

    function updateNodeHtml(node) {
        var wrapper = node.children("div"),
            group = node.children("ul"),
            toggleButton = wrapper.children(".k-icon"),
            checkbox = node.children(":checkbox"),
            innerWrapper = wrapper.children(".k-in"),
            currentNode, tmp;

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
            innerWrapper = $("<span class='k-in' />").appendTo(wrapper)[0];

            // move all non-group content in the k-in container
            currentNode = wrapper[0].nextSibling;
            innerWrapper = wrapper.find(".k-in")[0];

            while (currentNode && currentNode.nodeName.toLowerCase() != "ul") {
                tmp = currentNode;
                currentNode = currentNode.nextSibling;

                if (tmp.nodeType == 3) {
                    tmp.nodeValue = $.trim(tmp.nodeValue);
                }

                innerWrapper.appendChild(tmp);
            }
        }
    }

    TreeView = Widget.extend({
        init: function (element, options) {
            var that = this,
                dataInit,
                inferred = false;

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

            inferred = element.is("ul") || element.hasClass(KTREEVIEW);

            if (inferred) {
                options.dataSource.list = element.is("ul") ? element : element.children("ul");
            }

            that._animation();

            that._accessors();

            that._templates();

            // render treeview if it's not already rendered
            if (!element.hasClass(KTREEVIEW)) {
                that._wrapper();

                if (inferred) {
                    that.root = element;
                    that._group(that.wrapper);
                }
            } else {
                // otherwise just initialize properties
                that.wrapper = element;
                that.root = element.children("ul").eq(0);
            }

            that._tabindex();

            if (!that.wrapper.filter("[role=tree]").length) {
                that.wrapper.attr("role", "tree");
            }

            that._dataSource(inferred);

            that._attachEvents();

            if (options.dragAndDrop) {
                that.dragging = new TreeViewDragAndDrop(that);
            }

            if (!inferred) {
                if (options.autoBind) {
                    that._progress(true);
                    that.dataSource.fetch();
                }
            } else {
                that._attachUids();
            }

            if (options.checkboxes && options.checkboxes.checkChildren) {
                that._updateIndeterminateInitial(that.wrapper);
            }

            if (that.element[0].id) {
                that._ariaId = kendo.format("{0}_tv_active", that.element[0].id);
            }
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
                .on("click" + NS, function(e) {
                    if (!$(e.target).is(":focusable")) {
                        that.focus();
                    }
                });
        },

        _checkboxClick: function(e) {
            var checkbox = $(e.target);

            if (checkbox.data("indeterminate")) {
                checkbox
                    .data("indeterminate", false)
                    .prop("indeterminate", false)
                    .prop(CHECKED, true);

                this._checkboxChange(e);
            }
        },

        _attachUids: function(root, dataSource) {
            var that = this,
                data,
                uidAttr = kendo.attr("uid");

            root = root || that.root;
            dataSource = dataSource || that.dataSource;

            data = dataSource.view();

            root.children("li").each(function(index, item) {
                item = $(item).attr(uidAttr, data[index].uid);
                item.attr("role", "treeitem");
                that._attachUids(item.children("ul"), data[index].children);
            });
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

        _templates: function() {
            var that = this,
                options = that.options,
                fieldAccessor = proxy(that._fieldAccessor, that);

            if (options.template && typeof options.template == STRING) {
                options.template = template(options.template);
            } else if (!options.template) {
                options.template = template(
                    "# var text = " + fieldAccessor("text") + "(item); #" +
                    "# if (typeof item.encoded != 'undefined' && item.encoded === false) {#" +
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
                    return group.expanded !== true ? " style='display:none'" : "";
                },
                groupCssClass: function(group) {
                    var cssClass = "k-group";

                    if (group.firstLevel) {
                        cssClass += " k-treeview-lines";
                    }

                    return cssClass;
                },
                dragClue: template(
                    "<div class='k-header k-drag-clue'>" +
                        "<span class='k-icon k-drag-status'></span>" +
                        "#= treeview.template(data) #" +
                    "</div>"
                ),
                group: template(
                    "<ul class='#= r.groupCssClass(group) #'#= r.groupAttributes(group) # role='group'>" +
                        "#= renderItems(data) #" +
                    "</ul>"
                ),
                itemContent: template(
                    "# var imageUrl = " + fieldAccessor("imageUrl") + "(item); #" +
                    "# var spriteCssClass = " + fieldAccessor("spriteCssClass") + "(item); #" +
                    "# if (imageUrl) { #" +
                        "<img class='k-image' alt='' src='#= imageUrl #'>" +
                    "# } #" +

                    "# if (spriteCssClass) { #" +
                        "<span class='k-sprite #= spriteCssClass #'></span>" +
                    "# } #" +

                    "#= treeview.template(data) #"
                ),
                itemElement: template(
                    "# var url = " + fieldAccessor("url") + "(item); #" +
                    "<div class='#= r.cssClass(group, item) #'>" +
                        "# if (item.hasChildren) { #" +
                            "<span class='#= r.toggleButtonClass(item) #' role='presentation'></span>" +
                        "# } #" +

                        "# if (treeview.checkboxes) { #" +
                            "<span class='k-checkbox' role='presentation'>" +
                                "#= treeview.checkboxes.template(data) #" +
                            "</span>" +
                        "# } #" +

                        "# var tag = url ? 'a' : 'span'; #" +
                        "# var textAttr = url ? ' href=\\'' + url + '\\'' : ''; #" +

                        "<#=tag#  class='#= r.textClass(item) #'#= textAttr #>" +
                            "#= r.itemContent(data) #" +
                        "</#=tag#>" +
                    "</div>"
                ),
                item: template(
                    "<li role='treeitem' class='#= r.wrapperCssClass(group, item) #'" +
                        " " + kendo.attr("uid") + "='#= item.uid #'" +
                        "#=item.selected ? \"aria-selected='true'\" : ''#" +
                        "#=item.enabled === false ? \"aria-disabled='true'\" : ''#" +
                    ">" +
                        "#= r.itemElement(data) #" +
                    "</li>"
                ),
                loading: template(
                    "<div class='k-icon k-loading' /> Loading..."
                )
            };
        },

        items: function() {
            return this.element.find(".k-item");
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;

            this._dataSource();

            this.dataSource.fetch();
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

            if (that.dataSource && that._refreshHandler) {
                that.dataSource.unbind(CHANGE, that._refreshHandler);
            } else {
                that._refreshHandler = proxy(that.refresh, that);
            }

            if (!dataSource.fields) {
                dataSource.fields = [
                    { field: "text" },
                    { field: "url" },
                    { field: "spriteCssClass" },
                    { field: "imageUrl" }
                ];
            }

            that.dataSource = HierarchicalDataSource.create(dataSource);

            if (silentRead) {
                that.dataSource.fetch();

                recursiveRead(that.dataSource.view());
            }

            that.dataSource.bind(CHANGE, that._refreshHandler);
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
            NAVIGATE
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
            dragAndDrop: false,
            checkboxes: false,
            autoBind: true,
            loadOnDemand: true,
            template: ""
        },

        _accessors: function() {
            var that = this,
                options = that.options,
                i, field, textField,
                element = that.element;

            for (i in bindings) {
                field = options[bindings[i]];
                textField = element.attr(kendo.attr(i + "-field"));

                if (textField) {
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

        _fieldAccessor: function(fieldName) {
            var fieldBindings = this.options[bindings[fieldName]],
                count = fieldBindings.length,
                result = "(function(item) {";

            if (count === 0) {
                result += "return item['" + fieldName + "'];";
            } else {
                result += "var level = item.level();" +
                          "var levels = [" +
                            $.map(fieldBindings, function(x) {
                                return "function(d){ return " + kendo.expr(x) + "}";
                            }).join(",") + "];";

                // generates levels[level < 3 ? level : 2](item);
                result += "return levels[Math.min(level, " + count + "-1)](item)";
            }

            result += "})";

            return result;
        },

        setOptions: function(options) {
            var that = this;

            if (("dragAndDrop" in options) && options.dragAndDrop && !that.options.dragAndDrop) {
                that.dragging = new TreeViewDragAndDrop(that);
            }

            Widget.fn.setOptions.call(that, options);

            that._animation();

            that._templates();
        },

        _trigger: function (eventName, node) {
            return this.trigger(eventName, {
                node: node.closest(NODE)[0]
            });
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

            if (length > 1) {
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

            checkboxes(node)
                .data("indeterminate", !all)
                .prop("indeterminate", !all)
                .prop(CHECKED, all && siblings[0].checked);
        },

        _updateIndeterminateInitial: function(node) {
            var subnodes = subGroup(node).children(), i;

            if (subnodes.length) {
                for (i = 0; i < subnodes.length; i++) {
                    this._updateIndeterminateInitial(subnodes.eq(i));
                }

                this._setIndeterminate(node);
            }
        },

        _updateIndeterminate: function(node) {
            var parentNode = this.parent(node);

            if (parentNode.length) {
                this._setIndeterminate(parentNode);
                this._updateIndeterminate(parentNode);
            }
        },

        _checkboxChange: function(e) {
            var checkbox = $(e.target),
                isChecked = checkbox.prop(CHECKED),
                node = checkbox.closest(NODE),
                that = this;

            if (that.options.checkboxes.checkChildren) {
                node.find(":checkbox").each(function() {
                    that.dataItem(this).set(CHECKED, isChecked);
                });
            } else {
                that.dataItem(node).set(CHECKED, isChecked);
            }
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
                scrollTop,
                body = document.body;

            do {
                scrollContainer = scrollContainer.parentNode;
            } while (scrollContainer.scrollHeight <= scrollContainer.clientHeight && scrollContainer != body);

            scrollTop = scrollContainer.scrollTop;

            wrapper.focus();

            scrollContainer.scrollTop = scrollTop;
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

            if (!node.length || !node.is(":visible")) {
                result = that.root.children().eq(0);
            } else if (expanded) {
                result = subGroup(node).children().first();
            } else {
                while (node.length && !node.next().length) {
                    node = that.parent(node);
                }

                if (node.next().length) {
                    result = node.next();
                } else {
                    result = node;
                }
            }

            if (!that._enabled(result)) {
                result = that._nextVisible(result);
            }

            return result;
        },

        _previousVisible: function(node) {
            var that = this,
                result;

            if (!node.length || node.prev().length) {
                if (node.length) {
                    result = node.prev();
                } else {
                    result = that.root.children().last();
                }

                while (that._expanded(result)) {
                    result = subGroup(result).children().last();
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
                checkbox = focused.find(":checkbox:first"),
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
                    .data("indeterminate", false)
                    .prop("indeterminate", false);

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
                node = $(e.target),
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

            if (element.is("div")) {
                wrapper = element;
                root = wrapper.children("ul").eq(0);
            } else { // element is ul
                wrapper = element.wrap('<div />').parent();
                root = element;
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
            var options = this.options,
                checkboxOptions = options.checkboxes,
                checkboxTemplate;

            if (checkboxOptions || options.checkboxTemplate) {

                if (options.checkboxTemplate) {
                    checkboxTemplate = options.checkboxTemplate;
                } else {
                    checkboxTemplate = "<input type='checkbox' #= item.checked ? 'checked' : '' #";

                    if (checkboxOptions.name) {
                        checkboxTemplate += " name='" + checkboxOptions.name + "'";
                    }

                    checkboxTemplate += " />";
                }

                checkboxOptions = extend({
                    template: checkboxTemplate
                }, options.checkboxes);

                if (typeof checkboxOptions.template == STRING) {
                    checkboxOptions.template = template(checkboxOptions.template);
                }

                options.checkboxes = checkboxOptions;
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
                context = { treeview: that.options, item: item };

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
                for (i = 0; i < items.length; i++) {
                    context.item = item = items[i];

                    if (field == "spriteCssClass" || field == "imageUrl" ||
                        $.inArray(field, that.options.dataTextField) >= 0) {
                        that.findByUid(item.uid).find(">div>.k-in").html(that.templates.itemContent(context));
                    } else if (field == CHECKED) {
                        node = that.findByUid(item.uid);

                        node.children("div").find(":checkbox")
                            .prop(CHECKED, item[field])
                            .data("indeterminate", false)
                            .prop("indeterminate", false);

                        if (that.options.checkboxes.checkChildren) {
                            that._updateIndeterminate(node);
                        }
                    } else if (field == "expanded") {
                        that._toggle(that.findByUid(item.uid), item, item[field]);
                    }
                }
            }
        },

        refresh: function(e) {
            var that = this,
                parentNode = that.wrapper,
                node = e.node,
                action = e.action,
                items = e.items,
                index = e.index,
                options = that.options,
                loadOnDemand = options.loadOnDemand,
                checkChildren = options.checkboxes && options.checkboxes.checkChildren,
                i;

            function append(items, parentNode) {
                var group = subGroup(parentNode),
                    children = group.children(),
                    collapsed = !that._expanded(parentNode);

                if (typeof index == UNDEFINED) {
                    index = children.length;
                }

                that._insertNode(items, index, parentNode, function(item, group) {
                    // insert node into DOM
                    if (index == children.length) {
                        item.appendTo(group);
                    } else {
                        item.insertBefore(children.eq(index));
                    }
                }, collapsed);

                if (that._expanded(parentNode)) {
                    that._updateNodeClasses(parentNode);
                    subGroup(parentNode).css("display", "block");
                }
            }

            if (e.field) {
                return that._updateNode(e.field, items);
            }

            if (node) {
                parentNode = that.findByUid(node.uid);
                that._progress(parentNode, false);
            }

            if (checkChildren && action != "remove" && node && node.checked) {
                for (i = 0; i < items.length; i++) {
                    items[i].checked = true;
                }
            }

            if (action == "add") {
                append(items, parentNode);
            } else if (action == "remove") {
                that._remove(that.findByUid(items[0].uid), false);
            } else {
                if (node) {
                    subGroup(parentNode).empty();

                    append(items, parentNode);
                } else {
                    that.root = that.wrapper.html(that._renderGroup({
                        items: items,
                        group: {
                            firstLevel: true,
                            expanded: true
                        }
                    })).children("ul");
                }
            }

            for (i = 0; i < items.length; i++) {
                if (!loadOnDemand || items[i].expanded) {
                    items[i].load();
                }
            }

            that.trigger(DATABOUND, {
                node: node ? parentNode : undefined
            });
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
                var isCollapsed = !nodeContents(item).is(VISIBLE),
                    dataItem = this.dataItem(item);

                item.removeAttr(ARIADISABLED);

                if (!enable) {
                    if (dataItem.selected) {
                        dataItem.set("selected", false);
                    }

                    this.collapse(item);
                    isCollapsed = true;
                    item.removeAttr(ARIASELECTED);
                    item.attr(ARIADISABLED, true);
                }

                this._updateNodeClasses(item, {}, { enabled: enable, expanded: !isCollapsed });
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
        },

        _toggle: function(node, dataItem, expand) {
            var that = this,
                options = that.options,
                contents = nodeContents(node),
                direction = expand ? "expand" : "collapse",
                animation = options.animation[direction],
                loaded;

            if (contents.data("animating")) {
                return;
            }

            if (!that._trigger(direction, node)) {
                that._expanded(node, expand);

                loaded = dataItem && dataItem.loaded();

                if (loaded && contents.children().length > 0) {
                    that._updateNodeClasses(node, {}, { expanded: expand });

                    if (contents.css("display") == (expand ? "block" : "none")) {
                        return;
                    }

                    if (!expand) {
                        contents.css("height", contents.height()).css("height");
                    }

                    contents.kendoStop(true, true).kendoAnimate(extend({ reset: true }, animation, {
                        complete: function() {
                            if (expand) {
                                contents.css("height", "");
                            }
                        }
                    }));
                } else if (dataItem) {
                    if (options.loadOnDemand) {
                        that._progress(node, true);
                    }

                    contents.remove();
                    dataItem.load();
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

            that.element.off(NS);

            if (that.dragging) {
                that.dragging.destroy();
            }

            kendo.destroy(that.element);
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

            if (arguments.length == 1) {
                showProgress = node;

                if (showProgress) {
                    element.html(this.templates.loading);
                } else {
                    element.empty();
                }
            } else {
                nodeIcon(node).toggleClass("k-loading", showProgress);
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
            var dataItem,
                referenceDataItem, i,
                destTreeview = this._objectOrSelf(parentNode || group),
                destDataSource = destTreeview.dataSource;

            if (parentNode && parentNode[0] != destTreeview.element[0]) {
                referenceDataItem = destTreeview.dataItem(parentNode);

                if (!referenceDataItem.loaded()) {
                    destTreeview._progress(parentNode, true);
                    referenceDataItem.load();
                }

                if (parentNode != this.root) {
                    destDataSource = referenceDataItem.children;
                }
            }

            nodeData = this._toObservableData(nodeData);

            if (isArray(nodeData) || nodeData instanceof data.ObservableArray){
                // insert array of nodes
                for (i = 0; i < nodeData.length; i++) {
                    dataItem = callback(destDataSource, nodeData[i]);
                }
            } else {
                // insert single node from data
                dataItem = callback(destDataSource, nodeData);
            }

            return dataItem && this.findByUid(dataItem.uid);
        },

        _toObservableData: function(node) {
            var dataItem = node, dataSource, uid;

            if (node instanceof window.jQuery || isDomElement(node)) {
                dataSource = this._objectOrSelf(node).dataSource,

                uid = $(node).attr(kendo.attr("uid"));
                dataItem = dataSource.getByUid(uid);

                if (dataItem) {
                    dataItem = dataSource.remove(dataItem);
                }
            }

            return dataItem;
        },

        insertAfter: function (nodeData, referenceNode) {
            var group = referenceNode.parent(),
                parentNode;

            if (group.parent().is("li")) {
                parentNode = group.parent();
            }

            return this._dataSourceMove(nodeData, group, parentNode, function (dataSource, model) {
                return dataSource.insert(referenceNode.index() + 1, model);
            });
        },

        insertBefore: function (nodeData, referenceNode) {
            var group = referenceNode.parent(),
                parentNode;

            if (group.parent().is("li")) {
                parentNode = group.parent();
            }

            return this._dataSourceMove(nodeData, group, parentNode, function (dataSource, model) {
                return dataSource.insert(referenceNode.index(), model);
            });
        },

        append: function (nodeData, parentNode) {
            var that = this,
                group = that.root;

            if (parentNode) {
                group = subGroup(parentNode);
            }

            return that._dataSourceMove(nodeData, group, parentNode, function (dataSource, model) {
                function add() {
                    if (parentNode) {
                        that._expanded(parentNode, true);
                    }

                    return dataSource.add(model);
                }

                if (!dataSource.data()) {
                    dataSource.one(CHANGE, add);

                    return null;
                } else {
                    return add();
                }
            });
        },

        _remove: function (node, keepData) {
            var that = this,
                parentNode,
                prevSibling, nextSibling;

            node = $(node, that.element);

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
               top: kendo.support.touch ? -40 / kendo.support.zoomLevel() : 10
           },
           dragstart: proxy(that.dragstart, that),
           dragcancel: proxy(that.dragcancel, that),
           drag: proxy(that.drag, that),
           dragend: proxy(that.dragend, that)
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
                    itemTop = hoveredItem.offset().top;
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
                valid, dropPrevented;

            if (dropHint.css(VISIBILITY) == "visible") {
                dropPosition = dropHint.prevAll(".k-in").length > 0 ? "after" : "before";
                destinationNode = dropHint.closest(NODE);
            } else if (dropTarget) {
                destinationNode = dropTarget.closest(NODE);

                // moving node to root element
                if (!destinationNode.length) {
                    destinationNode = dropTarget.closest(".k-treeview");
                }
            }

            valid = that._hintStatus() != "k-denied";

            dropPrevented = treeview.trigger(DROP, {
                sourceNode: sourceNode[0],
                destinationNode: destinationNode[0],
                valid: valid,
                setValid: function(newValid) { valid = newValid; },
                dropTarget: dropTarget[0],
                dropPosition: dropPosition
            });

            dropHint.remove();
            that._removeTouchHover();

            if (!valid || dropPrevented) {
                that._draggable.dropped = valid;
                return;
            }

            that._draggable.dropped = true;

            // perform reorder / move
            if (dropPosition == "over") {
                sourceNode = treeview.append(sourceNode, destinationNode);
            } else if (dropPosition == "before") {
                sourceNode = treeview.insertBefore(sourceNode, destinationNode);
            } else if (dropPosition == "after") {
                sourceNode = treeview.insertAfter(sourceNode, destinationNode);
            }

            treeview.trigger(DRAGEND, {
                sourceNode: sourceNode && sourceNode[0],
                destinationNode: destinationNode[0],
                dropPosition: dropPosition
            });
        },

        destroy: function() {
            this._draggable.destroy();
        }
    };

    ui.plugin(TreeView);
})(window.kendo.jQuery);
