(function ($) {
    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        template = kendo.template,
        Component = kendo.ui.Component,
        proxy = $.proxy,
        SELECT = "select",
        EXPAND = "expand",
        COLLAPSE = "collapse",
        CHECKED = "checked",
        ERROR = "error",
        LOAD = "load",
        DATABINDING = "dataBinding",
        DATABOUND = "dataBound",
        NODEDRAGGING = "nodeDragging",
        NODEDRAGCANCELLED = "nodeDragCancelled",
        NODEDROP = "nodeDrop",
        NODEDROPPED = "nodeDropped",
        CLICK = "click",
        CHANGE = "change",
        VISIBILITY = "visibility",
        TSTATEHOVER = "t-state-hover",
        TTREEVIEW = "t-treeview",
        TITEM = "t-item",
        VISIBLE = ":visible",
        NODE = ".t-item",
        SUBGROUP = ">.t-group,>.t-animation-container>.t-group",
        NODECONTENTS = SUBGROUP + ",>.t-content,>.t-animation-container>.t-content";

    var TreeView = Component.extend({
        init: function (element, options) {
            var that = this,
                element = $(element),
                clickableItems = ".t-in:not(.t-state-selected,.t-state-disabled)",
                dataInit;

            options = $.isArray(options) ? (dataInit = true, { dataSource: options }) : options;

            Component.prototype.init.call(that, element, options);

            options = that.options;

            if (options.animation === false) {
                options.animation = {
                    expand: { show: true, effects: {} },
                    collapse: { hide: true, effects: {} }
                };
            }

            that.rendering = new TreeViewRendering(that);

            // render treeview if it's not already rendered
            if (!element.hasClass(TTREEVIEW)) {
                that._wrapper();

                if (!that.root.length) { // treeview initialized from empty element
                    that.root = that.wrapper.html(that.rendering.renderGroup({
                        items: options.dataSource,
                        group: {
                            isFirstLevel: true,
                            isExpanded: true
                        },
                        treeview: {}
                    })).children("ul");
                } else {
                    that._group(that.wrapper);
                }
            } else {
                // otherwise just initialize properties
                that.wrapper = element;
                that.root = element.children("ul").eq(0);
            }

            that.wrapper
                .delegate(".t-in.t-state-selected", "mouseenter", function(e) { e.preventDefault(); })
                .delegate(clickableItems, "mouseenter", function () { $(this).addClass(TSTATEHOVER); })
                .delegate(clickableItems, "mouseleave", function () { $(this).removeClass(TSTATEHOVER); })
                .delegate(clickableItems, CLICK, proxy(that._nodeClick, that))
                .delegate("div:not(.t-state-disabled) .t-in", "dblclick", proxy(that._toggleButtonClick, that))
                .delegate(".t-plus,.t-minus", CLICK, proxy(that._toggleButtonClick, that));

            if (options.dragAndDrop) {
                that.bind([NODEDRAGGING, NODEDRAGCANCELLED, NODEDROP, NODEDROPPED], options);
                that.dragging = new TreeViewDragAndDrop(that);
            }

            that.bind([EXPAND, COLLAPSE, CHECKED, ERROR, LOAD, DATABINDING, DATABOUND, SELECT], options);
        },

        options: {
            dataSource: {},
            animation: {
                expand: {
                    effects: "expandVertical",
                    duration: 200,
                    show: true
                },
                collapse: {
                    duration: 100,
                    show: false,
                    hide: true
                }
            }
        },

        _trigger: function (eventName, node) {
            return this.trigger(eventName, {
                item: node.closest(NODE)[0]
            });
        },

        _toggleButtonClick: function (e) {
            this.toggle($(e.target).closest(NODE));
        },

        _nodeClick: function (e) {
            var that = this,
                node = $(e.target),
                contents = node.closest(NODE).find(NODECONTENTS),
                href = node.attr("href"),
                shouldNavigate;

            if (href) {
                shouldNavigate = href == "#" || href.indexOf("#" + this.element.id + "-") >= 0;
            } else {
                shouldNavigate = contents.length > 0 && contents.children().length == 0;
            }

            if (shouldNavigate) {
                e.preventDefault();
            }

            if (!node.hasClass(".t-state-selected") && !that._trigger("select", node)) {
                that.select(node);
            }
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper, root,
                wrapperClasses = "t-widget t-treeview t-reset";

            if (element.is("div")) {
                wrapper = element.addClass(wrapperClasses);
                root = wrapper.children("ul").eq(0);
            } else { // element is ul
                wrapper = element.wrap('<div class="' + wrapperClasses + '" />').parent();
                root = element;
            }

            that.wrapper = wrapper;
            that.root = root;
        },

        _group: function(item) {
            var that = this,
                isFirstLevel = item.hasClass(TTREEVIEW),
                group = {
                    isFirstLevel: isFirstLevel,
                    isExpanded: isFirstLevel || item.data("expanded") === true
                },
                groupElement = item.find("> ul");

            groupElement
                .addClass(that.rendering.helpers.groupCssClass(group))
                .css("display", group.isExpanded ? "" : "none");

            that._items(groupElement, group);
        },

        _items: function(groupElement, groupData) {
            var that = this,
                items = groupElement.find("> li"),
                nodeData;

            groupData = extend({ length: items.length }, groupData);

            items.each(function(i, node) {
                node = $(node);

                nodeData = { index: i, expanded: node.data("expanded") === true };

                that._updateNodeHtml(node);

                that._updateNodeClasses(node, groupData, nodeData);

                // iterate over child items
                that._group(node);
            });
        },

        _updateNodeHtml: function(node) {
            var helpers = this.rendering.helpers,
                wrapper = node.find(">div"),
                subGroup = node.find(">ul"),
                toggleButton = wrapper.find(">.t-icon"),
                innerWrapper = wrapper.find(">.t-in");

            if (!wrapper.length) {
                wrapper = $("<div />").prependTo(node);
            }

            if (!toggleButton.length && subGroup.length) {
                toggleButton = $("<span class='t-icon' />").prependTo(wrapper);
            } else if (!subGroup.length || !subGroup.children().length) {
                toggleButton.remove();
                subGroup.remove();
            }

            if (!innerWrapper.length) {
                innerWrapper = $("<span class='t-in' />").appendTo(wrapper)[0];

                // move all non-group content in the t-in container
                currentNode = wrapper[0].nextSibling;
                innerWrapper = wrapper.find(".t-in")[0];

                while (currentNode && currentNode.nodeName.toLowerCase() != "ul") {
                    tmp = currentNode;
                    currentNode = currentNode.nextSibling;
                    innerWrapper.appendChild(tmp);
                }
            }
        },

        _updateNodeClasses: function(node, groupData, nodeData) {
            var helpers = this.rendering.helpers,
                wrapper = node.find(">div"),
                subGroup = node.find(">ul"),
                toggleButton = wrapper.find(">.t-icon"),
                innerWrapper = wrapper.find(">.t-in");

            if (!nodeData) {
                nodeData = {
                    expanded: !(subGroup.css("display") == "none"),
                    index: node.index(),
                    enabled: !innerWrapper.hasClass("t-state-disabled")
                };
            }

            if (!groupData) {
                groupData = {
                    isFirstLevel: node.parent().parent().hasClass(TTREEVIEW),
                    length: node.parent().children().length
                };
            }

            // li
            node.removeClass("t-first t-last")
                .addClass(helpers.wrapperCssClass(groupData, nodeData));

            // div
            wrapper.removeClass("t-top t-mid t-bot")
                   .addClass(helpers.cssClass(groupData, nodeData));

            // toggle button
            if (subGroup.length) {
                toggleButton.removeClass("t-plus t-minus t-plus-disabled t-minus-disabled")
                    .addClass(helpers.toggleButtonClass(nodeData));

                subGroup.addClass("t-group");
            }
        },

        processItems: function(items, callback) {
            var that = this;
            that.element.find(items).each(function(index, item) {
                callback.call(that, index, $(item).closest(NODE));
            });
        },

        expand: function (items) {
            this.processItems(items, function (index, item) {
                var contents = item.find(NODECONTENTS);

                if (contents.length > 0 && !contents.is(VISIBLE)) {
                    this.toggle(item);
                }
            });
        },

        collapse: function (items) {
            this.processItems(items, function (index, item) {
                var contents = item.find(NODECONTENTS);

                if (contents.length > 0 && contents.is(VISIBLE)) {
                    this.toggle(item);
                }
            });
        },

        enable: function (items, enable) {
            enable = arguments.length == 2 ? !!enable : true;

            this.processItems(items, function (index, item) {
                var isCollapsed = !item.find(NODECONTENTS).is(VISIBLE);

                if (!enable) {
                    this.collapse(item);
                    isCollapsed = true;
                }

                item.find("> div > .t-in")
                        .toggleClass("t-state-default", enable)
                        .toggleClass("t-state-disabled", !enable)
                    .end()
                    .find("> div > .t-checkbox > :checkbox")
                        .attr("disabled", enable ? "" : "disabled")
                    .end()
                    .find("> div > .t-icon")
                        .toggleClass("t-plus", isCollapsed && enable)
                        .toggleClass("t-plus-disabled", isCollapsed && !enable)
                        .toggleClass("t-minus", !isCollapsed && enable)
                        .toggleClass("t-minus-disabled", !isCollapsed && !enable);
            });
        },

        select: function (node) {
            node = $(node).closest(NODE);

            if (node.length) {
                this.element.find(".t-in").removeClass("t-state-hover t-state-selected");

                node.find(".t-in:first").addClass("t-state-selected");
            }
        },

        selected: function() {
            return this.element.find(".t-state-selected").closest(NODE);
        },

        toggle: function (node) {
            if (node.find(".t-minus,.t-plus").length == 0) {
                return;
            }

            if (node.find("> div > .t-state-disabled").length) {
                return;
            }

            var that = this,
                contents = node.find(NODECONTENTS),
                isExpanding = !contents.is(VISIBLE)
                animationSettings = that.options.animation,
                animation = animationSettings.expand,
                collapse = animationSettings.collapse,
                hasCollapseAnimation = collapse && 'effects' in collapse;

            if (!isExpanding) {
                animation = hasCollapseAnimation ? collapse
                                    : extend({ reverse: true }, animation, { show: false, hide: true });
            }

            if (contents.children().length > 0) {
                if (!that._trigger(isExpanding ? "expand" : "collapse", node)) {
                    node.find("> div > .t-icon")
                        .toggleClass("t-minus", isExpanding)
                        .toggleClass("t-plus", !isExpanding);

                    if (!isExpanding) {
                        contents.css("height", contents.height()).css("height");
                    }

                    contents.kendoStop(true, true).kendoAnimate(animation);
                }
            }
        },

        text: function (node) {
            return $(node).closest(NODE).find(">div>.t-in").text();
        },

        _insertNode: function(nodeData, parentNode, group, insertCallback) {
            var that = this,
                updatedGroupLength = group.children().length + 1,
                groupData = {
                    isFirstLevel: parentNode.hasClass(TTREEVIEW),
                    isExpanded: true,
                    length: updatedGroupLength
                },
                node = $(that.rendering.renderItem({
                    group: groupData,
                    item: nodeData
                }));

            if (!group.length) {
                group = $(that.rendering.renderGroup({
                    group: groupData
                })).appendTo(parentNode);
            }

            insertCallback(node, group);

            if (parentNode.hasClass("t-item")) {
                that._updateNodeHtml(parentNode);
                that._updateNodeClasses(parentNode);
            }

            that._updateNodeClasses(node.prev(), groupData);
            that._updateNodeClasses(node.next(), groupData);

            return node;
        },

        insertBefore: function (nodeData, referenceNode) {
            var group = referenceNode.parent();

            nodeData = extend(nodeData, { index: referenceNode.index() });

            return this._insertNode(nodeData, group.parent(), group, function(item, group) {
                item.insertBefore(referenceNode);
            });
        },

        append: function (nodeData, parentNode) {
            parentNode = parentNode || this.element;

            var group = parentNode.find(SUBGROUP);

            nodeData = extend(nodeData, { index: group.children().length });

            return this._insertNode(nodeData, parentNode, group, function(item, group) {
                item.appendTo(group);
            });
        },

        remove: function (node) {
            node = $(node);

            var that = this,
                parentNode = node.parent().parent(),
                prevSibling = node.prev(),
                nextSibling = node.next();

            node.remove();

            if (parentNode.hasClass("t-item")) {
                that._updateNodeHtml(parentNode);
                that._updateNodeClasses(parentNode);
            }

            that._updateNodeClasses(prevSibling);
            that._updateNodeClasses(nextSibling);
        },

        findByText: function (text) {
            var result;

            $(".t-in", this.element).each(function() {
                var that = $(this);
                if (that.text() == text) {
                    result = that.closest(NODE);
                    return false;
                }
            });

            return result;
        }
    });

    function TreeViewDragAndDrop(treeview) {
        var that = this;

        that.treeview = treeview;

        that._draggable = new kendo.ui.Draggable(treeview.element, {
           filter: "div:not(.t-state-disabled) .t-in",
           hint: function(node) {
                return "<div class='t-header t-drag-clue'><span class='t-icon t-drag-status'></span>" + node.text() + "</div>";
           },
           dragstart: proxy(that.dragstart, that),
           drag: proxy(that.drag, that),
           dragend: proxy(that.dragend, that)
        });
    }

    TreeViewDragAndDrop.prototype = {
        dragstart: function (e) {
            var that = this,
                treeview = that.treeview;

            //if (treeview.trigger("nodeDragStart", { item: e.currentTarget.closest(NODE)[0] })) {
                //return false;
            //}

            that.dropHint = $("<div class='t-drop-hint' />")
                .css(VISIBILITY, "hidden")
                .appendTo(treeview.element);
        },
        drag: function (e) {
            var that = this,
                status,
                treeview = that.treeview;

            that.dropTarget = $(e.target);

            if (!$.contains(treeview.element[0], e.target)) {
                // dragging node outside of treeview
                status = "t-denied";
            } else if ($.contains(that._draggable.currentTarget.closest(NODE)[0], e.target)) {
                // dragging node within itself
                status = "t-denied";
            } else {
                // moving or reordering node
                status = "t-insert-middle";

                that.dropHint.css(VISIBILITY, "visible");

                var hoveredItem = that.dropTarget.closest(".t-top,.t-mid,.t-bot");

                if (hoveredItem.length > 0) {
                    var itemHeight = hoveredItem.outerHeight();
                    var itemTop = hoveredItem.offset().top;
                    var itemContent = that.dropTarget.closest(".t-in");
                    var delta = itemHeight / (itemContent.length > 0 ? 4 : 2);

                    var insertOnTop = e.pageY < (itemTop + delta);
                    var insertOnBottom = (itemTop + itemHeight - delta) < e.pageY;
                    var addChild = itemContent.length > 0 && !insertOnTop && !insertOnBottom;

                    itemContent.toggleClass(TSTATEHOVER, addChild);
                    that.dropHint.css(VISIBILITY, addChild ? "hidden" : "visible");

                    if (addChild) {
                        status = "t-add";
                    } else {
                        var hoveredItemPos = hoveredItem.position();
                        hoveredItemPos.top += insertOnTop ? 0 : itemHeight;

                        that.dropHint
                            .css(hoveredItemPos)
                            [insertOnTop ? "prependTo" : "appendTo"](that.dropTarget.closest(NODE).find("> div:first"));

                        if (insertOnTop && hoveredItem.hasClass("t-top")) {
                            status = "t-insert-top";
                        }

                        if (insertOnBottom && hoveredItem.hasClass("t-bot")) {
                            status = "t-insert-bottom";
                        }
                    }
                }
            }

            //treeview.trigger("nodeDragging", {
                //pageY: e.pageY,
                //pageX: e.pageX,
                //dropTarget: e.target,
                //status: status.substring(2),
                //setStatusClass: function (value) { status = value },
                //item: e.currentTarget.closest(NODE)[0]
            //});

            if (status.indexOf("t-insert") != 0) {
                that.dropHint.css(VISIBILITY, "hidden");
            }

            that._draggable.hint.find(".t-drag-status")[0].className = "t-icon t-drag-status " + status;
        },

        dragend: function (e) {
            var that = this,
                treeview = that.treeview,
                dropPosition = "over", destinationItem;

            if (e.keyCode == kendo.keys.ESC){
                that.dropHint.remove();
                treeview.trigger("nodeDragCancelled", { item: e.currentTarget.closest(NODE)[0] });
            } else {
                if (that.dropHint.css(VISIBILITY) == "visible") {
                    dropPosition = that.dropHint.prevAll(".t-in").length > 0 ? "after" : "before";
                    destinationItem = that.dropHint.closest(NODE).find("> div");
                } else if (that.dropTarget) {
                    destinationItem = that.dropTarget.closest(".t-top,.t-mid,.t-bot");
                }

                that._draggable.dropped = true;

                var isValid = !that._draggable.hint.find(".t-drag-status").hasClass("t-denied");
                    //isDropPrevented = treeview.trigger("nodeDrop", {
                        //isValid: isValid,
                        //dropTarget: e.target,
                        //destinationItem: destinationItem.parent()[0],
                        //dropPosition: dropPosition,
                        //item: e.currentTarget.closest(NODE)[0]
                    //});

                if (!isValid) {
                that.dropHint.remove();
                    return false;
                }

                //if (isDropPrevented || !$.contains(treeview.element, e.target)) {
                    //return !isDropPrevented;
                //}

                var sourceItem = e.currentTarget.closest(".t-top,.t-mid,.t-bot");
                var movedItem = sourceItem.parent(); // .t-item
                var sourceGroup = sourceItem.closest(".t-group");
                // dragging item within itself
                if ($.contains(movedItem[0], e.target)) {
                    that.dropHint.remove();
                    return false;
                }
                // normalize source group
                if (movedItem.hasClass("t-last")) {
                    movedItem.removeClass("t-last")
                            .prev()
                            .addClass("t-last")
                            .find("> div")
                            .removeClass("t-top t-mid")
                            .addClass("t-bot");
                }

                // perform reorder / move
                if (that.dropHint.css(VISIBILITY) == "visible") {
                    destinationItem.parent()[dropPosition](movedItem);
                } else {
                    var targetGroup = destinationItem.next(".t-group");

                    if (targetGroup.length === 0) {
                        targetGroup = $("<ul class='t-group' />").appendTo(destinationItem.parent());

                        destinationItem.prepend("<span class='t-icon t-minus' />");
                    }

                    targetGroup.append(movedItem);

                    if (destinationItem.find("> .t-icon").hasClass("t-plus")) {
                        treeview.toggle(destinationItem.parent(), true);
                    }
                }

                that.dropHint.remove();

                var level = movedItem.parents(".t-group").length;

                function normalizeClasses(item) {
                    var isFirstItem = item.prev().length === 0;
                    var isLastItem = item.next().length === 0;

                    item.toggleClass("t-first", isFirstItem && level === 1)
                        .toggleClass("t-last", isLastItem)
                        .find("> div")
                            .toggleClass("t-top", isFirstItem && !isLastItem)
                            .toggleClass("t-mid", !isFirstItem && !isLastItem)
                            .toggleClass("t-bot", isLastItem);
                };

                normalizeClasses(movedItem);
                normalizeClasses(movedItem.prev());
                normalizeClasses(movedItem.next());

                // remove source group if it is empty
                if (sourceGroup.children().length === 0) {
                    sourceGroup.prev("div").find(".t-plus,.t-minus").remove();
                    sourceGroup.remove();
                }

                //treeview.trigger("nodeDropped", {
                    //destinationItem: destinationItem.closest(NODE)[0],
                    //dropPosition: dropPosition,
                    //item: sourceItem.parent(NODE)[0]
                //});

                return false;
            }
        }
    };

    // client-side rendering
    TreeViewRendering = function () {};

    TreeViewRendering.prototype = {
        helpers: {
            wrapperCssClass: function (group, item) {
                var result = "t-item",
                    index = item.index;

                if (group.isFirstLevel && index == 0) {
                    result += " t-first"
                }

                if (index == group.length-1) {
                    result += " t-last";
                }

                return result;
            },
            cssClass: function(group, item) {
                var result = "",
                    index = item.index,
                    groupLength = group.length - 1;

                if (group.isFirstLevel && index == 0) {
                    result += "t-top ";
                }

                if (index == 0 && index != groupLength) {
                    result += "t-top";
                } else if (index == groupLength) {
                    result += "t-bot";
                } else {
                    result += "t-mid";
                }

                return result;
            },
            textClass: function(item) {
                var result = "t-in";

                if (item.enabled === false) {
                    result += " t-state-disabled";
                }

                if (item.selected === true) {
                    result += " t-state-selected";
                }

                return result;
            },
            textAttributes: function(item) {
                return item.url ? " href='" + item.url + "'" : "";
            },
            toggleButtonClass: function(item) {
                var result = "t-icon";

                if (item.expanded !== true) {
                    result += " t-plus";
                } else {
                    result += " t-minus";
                }

                if (item.enabled === false) {
                    result += "-disabled";
                }

                return result;
            },
            text: function(item) {
                return item.encoded === false ? item.text : kendo.htmlEncode(item.text);
            },
            tag: function(item) {
                return item.url ? "a" : "span";
            },
            groupAttributes: function(group) {
                return group.isExpanded !== true ? " style='display:none'" : "";
            },
            groupCssClass: function(group) {
                var cssClass = "t-group";

                if (group.isFirstLevel) {
                    cssClass += " t-treeview-lines";
                }

                return cssClass;
            }
        },

        renderItem: function (options) {
            options = $.extend({ treeview: {}, group: {} }, options);

            var templates = TreeView.templates,
                empty = templates.empty,
                item = options.item,
                treeview = options.treeview;

            return templates.item($.extend(options, {
                image: item.imageUrl ? templates.image : empty,
                sprite: item.spriteCssClass ? templates.sprite : empty,
                itemWrapper: templates.itemWrapper,
                toggleButton: item.items ? templates.toggleButton : empty,
                checkbox: (treeview.showCheckboxes && item.checkable !== false) ? templates.checkbox : empty,
                checkboxValues: item.checked === true ? templates.checkboxValues : empty,
                subGroup: $.proxy(this.renderGroup, this)
            }, this.helpers));
        },

        renderItems: function(options) {
            var html = "",
                i = 0,
                items = options.items,
                len = items ? items.length : 0,
                group = $.extend({ length: len }, options.group);

            for (; i < len; i++) {
                html += this.renderItem($.extend(options, {
                    group: group,
                    item: $.extend({ index: i }, items[i])
                }));
            }

            return html;
        },

        renderGroup: function (options) {
            var that = this;

            return TreeView.templates.group($.extend({
                renderItems: $.proxy(that.renderItems, that)
            }, options, that.helpers));
        }
    };

    TreeView.TreeViewRendering = TreeViewRendering;

    TreeView.templates = {
        group: template(
            "<ul class='<#= groupCssClass(group) #>'<#= groupAttributes(group) #>>" +
                "<#= renderItems(data); #>" +
            "</ul>"
        ),
        itemWrapper: template(
            "<div class='<#= cssClass(group, item) #>'>" +
                "<#= toggleButton(data) #>" +
                "<#= checkbox(data) #>" +
                "<<#= tag(item) #> class='<#= textClass(item) #>'<#= textAttributes(item) #>>" +
                    "<#= image(item) #><#= sprite(item) #><#= text(item) #>" +
                "</<#= tag(item) #>>" +
            "</div>"
        ),
        item: template(
            "<li class='<#= wrapperCssClass(group, item) #>'>" +
                "<#= itemWrapper(data) #>" +
                "<# if (item.items) { #>" +
                "<#= subGroup({ items: item.items, treeview: treeview, group: { isExpanded: item.expanded } }) #>" +
                "<# } #>" +
            "</li>"
        ),
        image: template("<img class='t-image' alt='' src='<#= imageUrl #>' />"),
        value: template("<input type='hidden' class='t-input' name='value' value='<#= value #>' />"),
        toggleButton: template("<span class='<#= toggleButtonClass(item) #>'></span>"),
        checkbox: template(
            "<# var arrayName = treeview.id + '_checkedNodes', absoluteIndex = (group.level ? group.level + ':' : '') + item.index; #>" +
            "<span class='t-checkbox'>" +
            "<input type='hidden' value='<#= absoluteIndex #>' name='<#= arrayName #>.Index' class='t-input' />" +
                "<input type='checkbox' value='<#= item.checked ? 'True' : 'False' #>' " +
                    "name='<#= arrayName #>[<#= absoluteIndex #>].Checked' class='t-input' " +
                    "<#= item.enabled === false ? 'disabled ' : '' #>" +
                    "<#= item.checked === true ? 'checked ' : '' #>" +
                "/>" +
                "<#= checkboxValues(data) #>" +
            "</span>"
        ),
        checkboxValues: template(
            "<# var arrayItem = treeview.id + '[' + group.level + ']'; #>" +
            "<input type='hidden' value='<#= item.value #>' name='<#= arrayItem #>.Value' class='t-input' />" +
            "<input type='hidden' value='<#= item.text #>' name='<#= arrayItem #>.Text' class='t-input' />"
        ),
        sprite: template("<span class='t-sprite <#= spriteCssClass #>'></span>"),
        empty: template("")
    };

    kendo.ui.plugin("TreeView", TreeView);

})(jQuery);

