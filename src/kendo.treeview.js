(function ($) {
    var kendo = window.kendo,
        ui = kendo.ui,
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
        CHANGE = "change";

    function markAjaxLoadableNodes($element) {
        $element.find('.t-plus')
                .each(function () {
                    var item = $(this.parentNode);
                    item.parent().data('loaded', item.next('.t-group').length > 0);
                });
    }

    var TreeView = Component.extend({
        init: function (element, options) {
            var that = this,
                $element = $(element),
                clickableItems = '.t-in:not(.t-state-selected,.t-state-disabled)';

            Component.prototype.init.call(that, element, options);

            options = that.options;
            
            that._wrapper();

            $element
                .delegate(".t-in.t-state-selected", "mouseenter", function(e) { e.preventDefault(); })
                .delegate(clickableItems, "mouseenter", function () { $(this).addClass('t-state-hover'); })
                .delegate(clickableItems, "mouseleave", function () { $(this).removeClass('t-state-hover'); })
                .delegate(clickableItems, CLICK, proxy(that.nodeSelect, that))
                .delegate("div:not(.t-state-disabled) .t-in", "dblclick", proxy(that.nodeClick, that))
                .delegate(":checkbox", CLICK, proxy(that.checkboxClick, that))
                .delegate(".t-plus, .t-minus", CLICK, proxy(that.nodeClick, that));

            if (that.isAjax()) {
                markAjaxLoadableNodes($element);
            }

            if (options.dragAndDrop) {
                that.bind([NODEDRAGGING, NODEDRAGCANCELLED, NODEDROP, NODEDROPPED], options);
                that.dragging = new TreeViewDragAndDrop(that);
            }

            var $content = $element.find('.t-item > .t-content');
            if ($content.length > 0 && $($content[0]).children().length == 0)
                $element.find('.t-icon').hide();

            that.bind([EXPAND, COLLAPSE, CHECKED, ERROR, LOAD, DATABINDING, DATABOUND], options);

            // <???>
            that.bind(SELECT, function (e) {
                    if (e.target == that.element && that.onSelect) {
                        that.onSelect(e);
                    }
                });
            // </???>
        },

        options: {
            queryString: {
                text: "text",
                value: "value",
                checked: "checked"
            },
            dataTextField: "text",
            dataValueField: "value"
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper;

            wrapper = element.parent();

            if (!wrapper.is("div")) {
                wrapper = element.wrap("<div />").parent();
            }

            that.wrapper = wrapper.addClass("t-widget t-treeview t-reset");
        },

        expand: function (li) {
            $(li, this.element).each($.proxy(function (index, item) {
                var $item = $(item);
                var contents = $item.find('> .t-group, > .t-content');
                if ((contents.length > 0 && !contents.is(':visible')) || this.isAjax()) {
                    this.nodeToggle(null, $item);
                }
            }, this));
        },

        collapse: function (li) {
            $(li, this.element).each($.proxy(function (index, item) {
                var $item = $(item),
                    contents = $item.find('> .t-group, > .t-content');
                if (contents.length > 0 && contents.is(':visible')) {
                    this.nodeToggle(null, $item);
                }
            }, this));
        },

        enable: function (li) {
            this.toggle(li, true);
        },

        disable: function (li) {
            this.toggle(li, false);
        },

        toggle: function (li, enable) {
            $(li, this.element).each($.proxy(function (index, item) {
                var $item = $(item),
                    isCollapsed = !$item.find('> .t-group, > .t-content').is(':visible');

                if (!enable) {
                    this.collapse($item);
                    isCollapsed = true;
                }

                $item.find('> div > .t-in')
                        .toggleClass('t-state-default', enable)
                        .toggleClass('t-state-disabled', !enable)
                     .end()
                     .find('> div > .t-checkbox > :checkbox')
                        .attr('disabled', enable ? '' : 'disabled')
                     .end()
                     .find('> div > .t-icon')
                        .toggleClass('t-plus', isCollapsed && enable)
                        .toggleClass('t-plus-disabled', isCollapsed && !enable)
                        .toggleClass('t-minus', !isCollapsed && enable)
                        .toggleClass('t-minus-disabled', !isCollapsed && !enable);

            }, this));
        },

        reload: function (li) {
            var treeView = this;
            $(li).each(function () {
                var $item = $(this);
                $item.find('.t-group').remove();
                treeView.ajaxRequest($item);
            });
        },

        shouldNavigate: function (element) {
            var contents = $(element).closest('.t-item').find('> .t-content, > .t-group');
            var href = $(element).attr('href');

            return !((href && (href.charAt(href.length - 1) == '#' || href.indexOf('#' + this.element.id + '-') != -1)) ||
                    (contents.length > 0 && contents.children().length == 0));
        },

        nodeSelect: function (e, element) {

            if (!this.shouldNavigate(element)) {
                e.preventDefault();
            }

            var $element = $(element);

            if (!$element.hasClass('.t-state-selected') &&
                !this.trigger(this.element, 'select', { item: $element.closest('.t-item')[0] })) {
                $('.t-in', this.element).removeClass('t-state-hover t-state-selected');

                $element.addClass('t-state-selected');
            }
        },

        nodeToggle: function (e, $item, suppressAnimation) {
            if ($item.find('.t-minus').length == 0 && $item.find('.t-plus').length == 0) {
                return;
            }

            if (e != null) {
                e.preventDefault();
            }

            if ($item.data('animating') || $item.find('> div > .t-in').hasClass('t-state-disabled')) {
                return;
            }

            $item.data('animating', !suppressAnimation);

            var contents = $item.find('>.t-group, >.t-content, >.t-animation-container>.t-group, >.t-animation-container>.t-content'),
                isExpanding = !contents.is(':visible');

            /// TODO: trigger client event
            if (contents.children().length > 0
             && $item.data('loaded') !== false /*
             && !$item.trigger(this.element, isExpanding ? 'expand' : 'collapse', { item: $item[0] })*/ ) {
                $item.find('> div > .t-icon')
                        .toggleClass('t-minus', isExpanding)
                        .toggleClass('t-plus', !isExpanding);

                $item.data('animating', false);
                /// TODO: animate
                contents[isExpanding ? 'show' : 'hide']();
            } else if (isExpanding && this.isAjax() && (contents.length == 0 || $item.data('loaded') === false)) {
                if (!this.trigger(this.element, isExpanding ? 'expand' : 'collapse', { item: $item[0] }))
                    this.ajaxRequest($item);
            }
        },

        nodeClick: function (e) {
            var icon = $(e.target);

            if (!icon.is('.t-plus-disabled,.t-minus-disabled')) {
                this.nodeToggle(e, icon.closest('.t-item'));
            }
        },

        isAjax: function () {
            return this.ajax || this.ws || this.onDataBinding;
        },

        url: function (which) {
            return (this.ajax || this.ws)[which];
        },

        ajaxOptions: function ($item, options) {
            var result = {
                type: 'POST',
                dataType: 'text',
                error: $.proxy(function (xhr, status) {
                    if ($t.ajaxError(this.element, 'error', xhr, status))
                        return;

                    if (status == 'parsererror')
                        alert('Error! The requested URL did not return JSON.');
                }, this),

                success: $.proxy(function (data) {
                    data = eval("(" + data + ")");
                    data = data.d || data; // Support the `d` returned by MS Web Services
                    this.dataBind($item, data);
                }, this)
            };

            result = $.extend(result, options);

            var node = this.ws ? result.data.node = {} : result.data;

            if ($item.hasClass('t-item')) {
                node[this.queryString.value] = this.getItemValue($item);
                node[this.queryString.text] = this.getItemText($item);

                var itemCheckbox = $item.find('.t-checkbox:first :checkbox');
                if (itemCheckbox.length)
                    node[this.queryString.checked] = itemCheckbox.is(':checked');
            }

            if (this.ws) {
                result.data = $t.toJson(result.data);
                result.contentType = 'application/json; charset=utf-8';
            }

            return result;
        },

        ajaxRequest: function ($item) {

            $item = $item || $(this.element);

            var e = { item: $item[0] };

            if (this.trigger(this.element, 'dataBinding', e) || (!this.ajax && !this.ws))
                return;

            $item.data('loadingIconTimeout', setTimeout(function () {
                $item.find('> div > .t-icon').addClass('t-loading');
            }, 100));

            $.ajax(this.ajaxOptions($item, {
                data: $.extend({}, e.data),
                url: this.url('selectUrl')
            }));
        },

        bindTo: function (data) {
            this.dataBind(this.element, data);
        },

        dataBind: function ($item, data) {
            var that = this;

            $item = $($item); // can be called from user code with dom objects

            if (data.length == 0) {
                $('.t-icon', $item).hide();
                return;
            }

            var group = $item.find('> .t-group'),
                isGroup = group.length == 0;

            var html = TreeView[isGroup ? "getGroupHtml" : "getItemsList"]({
                group: {
                    isExpanded: (isGroup ? $item.eq(0).is('.t-treeview') ? true : data[0].expanded : false),
                    isFirstLevel: $item.hasClass("t-treeview"),
                    level: $item.find('> div > .t-checkbox :input[name="' + this.element.id + '_checkedNodes.Index"]').val()
                },
                treeview: {
                    id: this.element.id,
                    isAjax: this.isAjax(),
                    showCheckboxes: this.showCheckBox
                },
                items: data
            });

            $item.data('animating', true);

            if (group.length > 0 && $item.data('loaded') === false)
                $(html).prependTo(group);
            else if (group.length > 0 && $item.data('loaded') !== false)
                group.html(html);
            else if (group.length == 0)
                group = $(html).appendTo($item);

            /// TODO: play animations
            /*
            $t.fx.play(this.effects, group, { direction: 'bottom' }, function () {*/
                $item.data('animating', false);
            /*});*/

            clearTimeout($item.data('loadingIconTimeout'));

            if ($item.hasClass("t-item"))
                $item.data("loaded", true)
                    .find(".t-icon:first")
                        .removeClass("t-loading")
                        .removeClass("t-plus")
                        .addClass("t-minus");

            if (this.isAjax())
                markAjaxLoadableNodes($item);

            that.trigger(DATABOUND);
        },

        checkboxClick: function (e, element) {
            var isChecked = $(element).is(":checked");

            var isEventPrevented =
                this.trigger(this.element, "checked", {
                    item: $(element).closest('.t-item')[0],
                    checked: isChecked
                });

            if (!isEventPrevented)
                this.nodeCheck(element, isChecked);
            else
                e.preventDefault();

            return isEventPrevented;
        },

        nodeCheck: function (li, isChecked) {
            $(li, this.element).each($.proxy(function (index, item) {
                var $item = $(item).closest('.t-item'),
                    $checkboxHolder = $("> div > .t-checkbox", $item),
                    arrayName = this.element.id + '_checkedNodes',
                    index = $checkboxHolder.find(':input[name="' + arrayName + '.Index"]').val();

                $checkboxHolder.find(':input[name="' + arrayName + '[' + index + '].Text"]').remove();
                $checkboxHolder.find(':input[name="' + arrayName + '[' + index + '].Value"]').remove();

                $checkboxHolder.find(':checkbox')
                               .attr({
                                   checked: isChecked ? 'checked' : '',
                                   value: isChecked
                               });

                if (isChecked)
                    $($t.treeview.getNodeInputsHtml(this.getItemValue($item), this.getItemText($item), arrayName, index))
                        .appendTo($checkboxHolder);

            }, this));
        },

        getItemText: function (item) {
            return $(item).find('> div > .t-in').text();
        },

        getItemValue: function (item) {
            return $(item).find('>div>:input[name="itemValue"]').val() || this.getItemText(item);
        }
    });

    function TreeViewDragAndDrop(treeview) {
        var that = this;

        that.owner = treeview;
        that.$dropCue = $("<div class='t-drop-clue' />");

        that._draggable = new $t.draggable({
           filter: "div:not(.t-state-disabled) .t-in",
           group: treeview.element.id,
           cue: function(e) {
                return $t.dragCue(e.$draggable.text());
           },
           start: $.proxy(that.start, that),
           drag: $.proxy(that.drag, that),
           stop: $.proxy(that.stop, that),
           destroy: function(e) {
                that.$dropCue.remove();
                e.$cue.remove();
           }
        });
    }

    TreeViewDragAndDrop.prototype = {
        start: function (e) {
            var that = this,
                treeview = that.owner;

            if (treeview.trigger(treeview.element, "nodeDragStart", { item: e.$draggable.closest(".t-item")[0] }))
                return false;

            that.$dropCue.appendTo(treeview.element);
        },
        drag: function (e) {
            var that = this,
                status,
                treeview = that.owner;

            that.$dropTarget = $(e.target);

            if (treeview.dragAndDrop.dropTargets && $(e.target).closest(treeview.dragAndDrop.dropTargets).length > 0) {
                // dragging node to a dropTarget area
                status = "t-add";
            } else if (!$.contains(treeview.element, e.target)) {
                // dragging node outside of treeview
                status = "t-denied";
            } else if ($.contains(e.$draggable.closest(".t-item")[0], e.target)) {
                // dragging node within itself
                status = "t-denied";
            } else {
                // moving or reordering node
                status = "t-insert-middle";

                that.$dropCue.css("visibility", "visible");

                var hoveredItem = that.$dropTarget.closest(".t-top,.t-mid,.t-bot");

                if (hoveredItem.length > 0) {
                    var itemHeight = hoveredItem.outerHeight();
                    var itemTop = hoveredItem.offset().top;
                    var itemContent = that.$dropTarget.closest(".t-in");
                    var delta = itemHeight / (itemContent.length > 0 ? 4 : 2);

                    var insertOnTop = e.pageY < (itemTop + delta);
                    var insertOnBottom = (itemTop + itemHeight - delta) < e.pageY;
                    var addChild = itemContent.length > 0 && !insertOnTop && !insertOnBottom;

                    itemContent.toggleClass("t-state-hover", addChild);
                    that.$dropCue.css("visibility", addChild ? "hidden" : "visible");

                    if (addChild) {
                        status = "t-add";
                    } else {
                        var hoveredItemPos = hoveredItem.position();
                        hoveredItemPos.top += insertOnTop ? 0 : itemHeight;

                        that.$dropCue
                            .css(hoveredItemPos)
                            [insertOnTop ? "prependTo" : "appendTo"](that.$dropTarget.closest(".t-item").find("> div:first"));

                        if (insertOnTop && hoveredItem.hasClass("t-top")) {
                            status = "t-insert-top";
                        }

                        if (insertOnBottom && hoveredItem.hasClass("t-bot")) {
                            status = "t-insert-bottom";
                        }
                    }
                }
            }

            treeview.trigger(treeview.element, "nodeDragging", {
                pageY: e.pageY,
                pageX: e.pageX,
                dropTarget: e.target,
                status: status.substring(2),
                setStatusClass: function (value) { status = value },
                item: e.$draggable.closest(".t-item")[0]
            });

            if (status.indexOf("t-insert") != 0) {
                that.$dropCue.css("visibility", "hidden");
            }

            $t.dragCueStatus(e.$cue, status);
        },

        stop: function (e) {
            var that = this,
                treeview = that.owner,
                dropPosition = 'over', destinationItem;

            if (e.keyCode == kendo.keys.ESC){
                treeview.trigger(treeview.element, 'nodeDragCancelled', { item: e.$draggable.closest('.t-item')[0] });
            } else {
                if (that.$dropCue.css('visibility') == 'visible') {
                    dropPosition = that.$dropCue.prevAll('.t-in').length > 0 ? 'after' : 'before';
                    destinationItem = that.$dropCue.closest('.t-item').find('> div');
                } else if (that.$dropTarget) {
                    destinationItem = that.$dropTarget.closest('.t-top,.t-mid,.t-bot');
                }

                var isValid = !e.$cue.find('.t-drag-status').hasClass('t-denied'),
                    isDropPrevented = treeview.trigger(treeview.element, 'nodeDrop', {
                        isValid: isValid,
                        dropTarget: e.target,
                        destinationItem: destinationItem.parent()[0],
                        dropPosition: dropPosition,
                        item: e.$draggable.closest('.t-item')[0]
                    });

                if (!isValid) {
                    return false;
                }

                if (isDropPrevented || !$.contains(treeview.element, e.target)) {
                    return !isDropPrevented;
                }

                var sourceItem = e.$draggable.closest('.t-top,.t-mid,.t-bot');
                var movedItem = sourceItem.parent(); // .t-item
                var sourceGroup = sourceItem.closest('.t-group');
                // dragging item within itself
                if ($.contains(movedItem[0], e.target)) {
                    return false;
                }
                // normalize source group
                if (movedItem.hasClass('t-last'))
                    movedItem.removeClass('t-last')
                            .prev()
                            .addClass('t-last')
                            .find('> div')
                            .removeClass('t-top t-mid')
                            .addClass('t-bot');

                // perform reorder / move
                if (that.$dropCue.css('visibility') == 'visible') {
                    destinationItem.parent()[dropPosition](movedItem);
                } else {
                    var targetGroup = destinationItem.next('.t-group');

                    if (targetGroup.length === 0) {
                        targetGroup = $('<ul class="t-group" />').appendTo(destinationItem.parent());

                        if (!treeview.isAjax()) {
                            destinationItem.prepend('<span class="t-icon t-minus" />');
                        } else {
                            targetGroup.hide();
                            treeview.nodeToggle(null, destinationItem.parent(), true);
                            targetGroup.show();
                        }
                    }

                    targetGroup.append(movedItem);

                    if (destinationItem.find('> .t-icon').hasClass('t-plus'))
                        treeview.nodeToggle(null, destinationItem.parent(), true);
                }

                var level = movedItem.parents('.t-group').length;

                function normalizeClasses(item) {
                    var isFirstItem = item.prev().length === 0;
                    var isLastItem = item.next().length === 0;

                    item.toggleClass('t-first', isFirstItem && level === 1)
                        .toggleClass('t-last', isLastItem)
                        .find('> div')
                            .toggleClass('t-top', isFirstItem && !isLastItem)
                            .toggleClass('t-mid', !isFirstItem && !isLastItem)
                            .toggleClass('t-bot', isLastItem);
                };

                normalizeClasses(movedItem);
                normalizeClasses(movedItem.prev());
                normalizeClasses(movedItem.next());

                // remove source group if it is empty
                if (sourceGroup.children().length === 0) {
                    sourceGroup.prev('div').find('.t-plus,.t-minus').remove();
                    sourceGroup.remove();
                }

                treeview.trigger(treeview.element, 'nodeDropped', {
                    destinationItem: destinationItem.closest('.t-item')[0],
                    dropPosition: dropPosition,
                    item: sourceItem.parent('.t-item')[0]
                });

                return false;
            }
        }
    };

    // client-side rendering
    var renderingContext = {
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
    };
                
    $.extend(TreeView, {
        templates: {
            group: template(
                "<ul class='<%= groupCssClass(group) %>'<%= groupAttributes(group) %>>" +
                    "<%= renderItems(data); %>" +
                "</ul>"
            ),
            item: template(
                "<li class='<%= wrapperCssClass(group, item) %>'>" +
                    "<div class='<%= cssClass(group, item) %>'>" +
                        "<%= toggleButton(data) %>" +
                        "<%= checkbox(data) %>" +
                        "<<%= tag(item) %> class='<%= textClass(item) %>'<%= textAttributes(item) %>>" +
                            "<%= image(item) %><%= sprite(item) %><%= text(item) %><%= value(item) %>" +
                        "</<%= tag(item) %>>" +
                    "</div>" +
                    "<%= subGroup({ items: item.items, treeview: treeview, group: { isExpanded: item.expanded } }) %>" +
                "</li>"
            ),
            image: template("<img class='t-image' alt='' src='<%= imageUrl %>' />"),
            value: template("<input type='hidden' class='t-input' name='itemValue' value='<%= value %>' />"),
            toggleButton: template("<span class='<%= toggleButtonClass(item) %>'></span>"),
            checkbox: template(
                "<% var arrayName = treeview.id + '_checkedNodes', absoluteIndex = (group.level ? group.level + ':' : '') + item.index; %>" + 
                "<span class='t-checkbox'>" + 
                "<input type='hidden' value='<%= absoluteIndex %>' name='<%= arrayName %>.Index' class='t-input' />" +
                    "<input type='checkbox' value='<%= item.checked ? 'True' : 'False' %>' " +
                        "name='<%= arrayName %>[<%= absoluteIndex %>].Checked' class='t-input' " + 
                        "<%= item.enabled === false ? 'disabled ' : '' %>" +
                        "<%= item.checked === true ? 'checked ' : '' %>" + 
                    "/>" +
                    "<%= checkboxValues(data) %>" +
                "</span>"
            ),
            checkboxValues: template(
                "<% var arrayItem = treeview.id + '[' + group.level + ']'; %>" + 
                "<input type='hidden' value='<%= item.value %>' name='<%= arrayItem %>.Value' class='t-input' />" +
                "<input type='hidden' value='<%= item.text %>' name='<%= arrayItem %>.Text' class='t-input' />"
            ),
            sprite: template("<span class='t-sprite <%= spriteCssClass %>'></span>"),
            empty: template("")
        },

        getItemHtml: function (options) {
            options = $.extend({ treeview: {}, group: {} }, options);

            var templates = TreeView.templates,
                empty = templates.empty,
                item = options.item,
                treeview = options.treeview;

            return templates.item($.extend(options, {
                image: item.imageUrl ? templates.image : empty,
                sprite: item.spriteCssClass ? templates.sprite : empty,
                value: item.value ? templates.value : empty,
                toggleButton: ((item.loadOnDemand && treeview.isAjax) || item.items) ? templates.toggleButton : empty,
                checkbox: (treeview.showCheckboxes && item.checkable !== false) ? templates.checkbox : empty,
                checkboxValues: item.checked === true ? templates.checkboxValues : empty,
                subGroup: TreeView.getGroupHtml
            }, renderingContext));
        },

        getItemsList: function (options) {
            var html = "",
                items = options.items,
                getItemHtml = getItemHtml,
                i, len;

            if (items) {
                for (i = 0, len = items.length; i < len; i++)
                    html += TreeView.getItemHtml({
                        treeview: options.treeview,
                        group: $.extend({
                            length: len
                        }, options.group),
                        item: $.extend({
                            index: i
                        }, items[i])
                    });
            }

            return html;
        },

        getGroupHtml: function (options) {
            return TreeView.templates.group($.extend({
                renderItems: TreeView.getItemsList
            }, options, renderingContext));
        }
    });

    kendo.ui.plugin("TreeView", TreeView);

})(jQuery);

