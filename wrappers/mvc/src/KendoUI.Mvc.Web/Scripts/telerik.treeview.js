(function ($, undefined) {

    var $t = $.telerik,
        extend = $.extend,
        SUBGROUP = ">.t-group,>.t-animation-container>.t-group",
        TTREEVIEW = "t-treeview",
        TreeView;

    $t.scripts.push("telerik.treeview.js");

    function markAjaxLoadableNodes($element) {
        $element.find('.t-plus')
                .each(function () {
                    var item = $(this.parentNode);
                    item.parent().data('loaded', item.next('.t-group').length > 0);
                });
    }

    function updateNodeHtml(node) {
        var wrapper = node.find(">div"),
            subGroup = node.find(">ul"),
            toggleButton = wrapper.find(">.t-icon"),
            innerWrapper = wrapper.find(">.t-in"),
            tmp;

        if (node.hasClass("t-treeview")) {
            return;
        }

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
    }

    var rendering = {
        wrapperCssClass: function (group, item) {
            var result = "t-item",
                index = item.itemIndex;
        
            if (group.isFirstLevel && index == 0) {
                result += " t-first"
            }
        
            if (index == group.itemsCount-1) {
                result += " t-last";
            }
        
            return result;
        },
        cssClass: function(group, item) {
            var result = "",
                index = item.itemIndex,
                groupLength = group.itemsCount - 1;
        
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
        toggleButtonClass: function(item) {
            var result = "t-icon";
    
            if (item.isExpanded !== true) {
                result += " t-plus";
            } else {
                result += " t-minus";
            }
    
            if (item.enabled === false) {
                result += "-disabled";
            }
    
            return result;
        }
    };

    function updateNodeClasses(node, groupData, nodeData) {
        var wrapper = node.find(">div"),
            subGroup = node.find(">ul");

        if (node.hasClass("t-treeview")) {
            return;
        }

        if (!nodeData) {
            nodeData = {
                isExpanded: !(subGroup.css("display") == "none"),
                itemIndex: node.index(),
                enabled: !wrapper.find(">.t-in").hasClass("t-state-disabled")
            };
        }

        if (!groupData) {
            groupData = {
                isFirstLevel: node.parent().parent().hasClass(TTREEVIEW),
                itemsCount: node.parent().children().length
            };
        }

        // li
        node.removeClass("t-first t-last")
            .addClass(rendering.wrapperCssClass(groupData, nodeData));

        // div
        wrapper.removeClass("t-top t-mid t-bot")
           .addClass(rendering.cssClass(groupData, nodeData));

        // toggle button
        if (subGroup.length) {
            wrapper.find(">.t-icon")
                .removeClass("t-plus t-minus t-plus-disabled t-minus-disabled")
                .addClass(rendering.toggleButtonClass(nodeData));

            subGroup.addClass("t-group");
        }
    }

    TreeView = $t.treeview = function (element, options) {
        this.element = element;
        var $element = $(element);

        $.extend(this, options);

        var clickableItems = '.t-in:not(.t-state-selected,.t-state-disabled)';

        $('.t-in.t-state-selected', element)
            .live('mouseenter', $t.preventDefault);

        $element
            .delegate(clickableItems, 'mouseenter', $t.hover)
            .delegate(clickableItems, 'mouseleave', $t.leave)
            .delegate(clickableItems, 'click', $t.delegate(this, this.nodeSelect))
            .delegate('div:not(.t-state-disabled) .t-in', 'dblclick', $t.delegate(this, this.nodeClick))
            .delegate(':checkbox', 'click', $.proxy(this.checkboxClick, this))
            .delegate('.t-plus, .t-minus', $t.isTouch ? 'touchend' : 'click', $t.delegate(this, this.nodeClick));

        if (this.isAjax())
            markAjaxLoadableNodes($element);

        if (this.dragAndDrop) {
            $t.bind(this, {
                nodeDragStart: this.onNodeDragStart,
                nodeDragging: this.onNodeDragging,
                nodeDragCancelled: this.onNodeDragCancelled,
                nodeDrop: this.onNodeDrop,
                nodeDropped: this.onNodeDropped
            });

            (function (treeview) {
                var $dropCue = $("<div class='t-drop-clue' />");
                var $dropTarget;

                function start(e) {
                    if ($t.trigger(treeview.element, "nodeDragStart", { item: e.$draggable.closest(".t-item")[0] })) {
                        return false;
                    }

                    $dropCue.appendTo(treeview.element);
                }

                function drag(e) {
                    var status;

                    $dropTarget = $($t.eventTarget(e));

                    if (treeview.dragAndDrop.dropTargets && $dropTarget.closest(treeview.dragAndDrop.dropTargets).length > 0) {
                        // dragging node to a dropTarget area
                        status = "t-add";
                    } else if (!$.contains(treeview.element, $dropTarget[0])) {
                        // dragging node outside of treeview
                        status = "t-denied";
                    } else if ($.contains(e.$draggable.closest(".t-item")[0], $dropTarget[0])) {
                        // dragging node within itself
                        status = "t-denied";
                    } else {
                        // moving or reordering node
                        status = "t-insert-middle";

                        $dropCue.css("visibility", "visible");

                        var hoveredItem = $dropTarget.closest(".t-top,.t-mid,.t-bot");

                        if (hoveredItem.length) {
                            var itemHeight = hoveredItem.outerHeight(),
                                itemTop = hoveredItem.offset().top,
                                itemContent = $dropTarget.closest(".t-in"),
                                delta = itemHeight / (itemContent.length > 0 ? 4 : 2),
                                location = $t.touchLocation(e),

                                insertOnTop = location.y < (itemTop + delta),
                                insertOnBottom = (itemTop + itemHeight - delta) < location.y,
                                addChild = itemContent.length > 0 && !insertOnTop && !insertOnBottom;

                            hoveredItem.siblings(".t-top,.t-mid,.t-bot").children(".t-state-hover").removeClass("t-state-hover");
                            itemContent.toggleClass("t-state-hover", addChild);
                            $dropCue.css("visibility", addChild ? "hidden" : "visible");

                            if (addChild) {
                                status = "t-add";
                            } else {
                                var hoveredItemPos = hoveredItem.position();
                                hoveredItemPos.top += insertOnTop ? 0 : itemHeight;

                                $dropCue
                                    .css(hoveredItemPos)
                                    [insertOnTop ? "prependTo" : "appendTo"]($dropTarget.closest(".t-item").find("> div:first"));

                                if (insertOnTop && hoveredItem.hasClass("t-top")) {
                                    status = "t-insert-top";
                                }

                                if (insertOnBottom && hoveredItem.hasClass("t-bot")) {
                                    status = "t-insert-bottom";
                                }
                            }
                        }
                    }

                    $t.trigger(treeview.element, "nodeDragging", {
                        pageY: e.pageY,
                        pageX: e.pageX,
                        dropTarget: $dropTarget[0],
                        status: status.substring(2),
                        setStatusClass: function (value) { status = value },
                        item: e.$draggable.closest(".t-item")[0]
                    });

                    if (status.indexOf("t-insert") != 0) {
                        $dropCue.css("visibility", "hidden");
                    }

                    $t.dragCueStatus(e.$cue, status);
                }

                function stop(e) {
                    if (e.keyCode == 27) {
                        $t.trigger(treeview.element, 'nodeDragCancelled', { item: e.$draggable.closest('.t-item')[0] });
                    } else {
                        var dropPosition = 'over', destinationItem,
                            target = $t.eventTarget(e);

                        if ($dropCue.css('visibility') == 'visible') {
                            dropPosition = $dropCue.prevAll('.t-in').length > 0 ? 'after' : 'before';
                            destinationItem = $dropCue.closest('.t-item').find('> div');
                        } else if ($dropTarget) {
                            destinationItem = $dropTarget.closest('.t-top,.t-mid,.t-bot');
                        }

                        var isValid = !e.$cue.find('.t-drag-status').hasClass('t-denied'),
                            isDropPrevented = $t.trigger(treeview.element, 'nodeDrop', {
                                isValid: isValid,
                                dropTarget: target,
                                destinationItem: destinationItem.parent()[0],
                                dropPosition: dropPosition,
                                item: e.$draggable.closest('.t-item')[0]
                            });

                        if (!isValid) {
                            return false;
                        }

                        if (isDropPrevented || !$.contains(treeview.element, target)) {
                            return !isDropPrevented;
                        }

                        var sourceItem = e.$draggable.closest('.t-top,.t-mid,.t-bot');
                        var movedItem = sourceItem.parent(); // .t-item
                        var sourceGroup = sourceItem.closest('.t-group');
                        // dragging item within itself
                        if ($.contains(movedItem[0], target)) {
                            return false;
                        }
                        // normalize source group
                        if (movedItem.hasClass('t-last')) {
                            movedItem.removeClass('t-last')
                                    .prev()
                                    .addClass('t-last')
                                    .find('> div')
                                    .removeClass('t-top t-mid')
                                    .addClass('t-bot');
                        }

                        // perform reorder / move
                        if ($dropCue.css('visibility') == 'visible') {
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

                        updateNodeClasses(movedItem);
                        updateNodeClasses(movedItem.prev());
                        updateNodeClasses(movedItem.next());

                        // remove source group if it is empty
                        if (sourceGroup.children().length === 0) {
                            sourceGroup.prev('div').find('.t-plus,.t-minus').remove();
                            sourceGroup.remove();
                        }

                        if ($t.isTouch) {
                            destinationItem.children(".t-in").removeClass("t-state-hover");
                        }

                        $t.trigger(treeview.element, 'nodeDropped', {
                            destinationItem: destinationItem.closest('.t-item')[0],
                            dropPosition: dropPosition,
                            item: sourceItem.parent('.t-item')[0]
                        });

                        return false;
                    }
                }

                new $t.draggable({
                   owner: treeview.element,
                   selector: 'div:not(.t-state-disabled) .t-in',
                   scope: treeview.element.id,
                   cue: function (e) {
                        return $t.dragCue($t.encode(e.$draggable.text()));
                   },
                   start: start,
                   drag: drag,
                   stop: stop,
                   destroy: function (e) {
                        $dropCue.remove();
                        e.$cue.remove();
                   }
                });

            })(this);
        }

        $t.bind(this, {
            expand: this.onExpand,
            collapse: this.onCollapse,
            select: $.proxy(function (e) {
                if (e.target == this.element && this.onSelect) $.proxy(this.onSelect, this.element)(e);
            }, this),
            checked: this.onChecked,
            error: this.onError,
            load: this.onLoad,
            dataBinding: this.onDataBinding,
            dataBound: this.onDataBound
        });
    };

    TreeView.prototype = {

        expand: function (li) {
            $(li, this.element).each($.proxy(function (index, item) {
                var $item = $(item);
                var contents = $item.find('> .t-group, > .t-content');
                if ((contents.length > 0 && !contents.is(':visible')) || (this.isAjax() && $item.data('loaded') === false)) {
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
                     .find('> div > .t-icon')
                        .toggleClass('t-plus', isCollapsed && enable)
                        .toggleClass('t-plus-disabled', isCollapsed && !enable)
                        .toggleClass('t-minus', !isCollapsed && enable)
                        .toggleClass('t-minus-disabled', !isCollapsed && !enable);

                var checkbox = $item.find('> div > .t-checkbox > :checkbox');

                if (enable) {
                    checkbox.removeAttr('disabled');
                } else {
                    checkbox.attr('disabled', 'disabled');
                }

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

            if (!this.shouldNavigate(element))
                e.preventDefault();

            var $element = $(element);

            if (!$element.hasClass('.t-state-selected') &&
                !$t.trigger(this.element, 'select', { item: $element.closest('.t-item')[0] })) {
                $('.t-in', this.element).removeClass('t-state-hover t-state-selected');

                $element.addClass('t-state-selected');
            }
        },

        nodeToggle: function (e, $item, suppressAnimation) {
            if ($item.find('.t-minus').length == 0 && $item.find('.t-plus').length == 0) {
                return;
            }

            if (e != null)
                e.preventDefault();

            if ($item.data('animating')
             || $item.find('> div > .t-in').hasClass('t-state-disabled'))
                return;

            $item.data('animating', !suppressAnimation);

            var contents = $item.find('>.t-group, >.t-content, >.t-animation-container>.t-group, >.t-animation-container>.t-content'),
                isExpanding = !contents.is(':visible');

            if (contents.children().length > 0 && $item.data('loaded') !== false) {
                if (!$t.trigger(this.element, isExpanding ? 'expand' : 'collapse', { item: $item[0] })) {
                    $item.find('> div > .t-icon')
                        .toggleClass('t-minus', isExpanding)
                        .toggleClass('t-plus', !isExpanding);
                    
                    if (!suppressAnimation) {
                        $t.fx[isExpanding ? 'play' : 'rewind'](this.effects, contents, { direction: 'bottom' }, function () {
                            $item.data('animating', false);
                        });
                    } else {
                        contents[isExpanding ? 'show' : 'hide']();
                    }
                } else {
                    $item.data('animating', false);
                }
            } else if (isExpanding && this.isAjax() && (contents.length == 0 || $item.data('loaded') === false)) {
                if (!$t.trigger(this.element, isExpanding ? 'expand' : 'collapse', { item: $item[0] })) {
                    this.ajaxRequest($item);
                } else {
                    $item.data('animating', false);
                }
            }
        },

        nodeClick: function (e, element) {
            var $element = $(element),
                $item = $element.closest('.t-item');

            if ($element.hasClass('t-plus-disabled') || $element.hasClass('t-minus-disabled'))
                return;

            this.nodeToggle(e, $item);
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
                }, this),

                complete: function() {
                    $item.data("animating", false);
                }
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

            if ($t.trigger(this.element, 'dataBinding', e) || (!this.ajax && !this.ws))
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
            $item = $($item); // can be called from user code with dom objects

            var group = $item.find('> .t-group'),
                element = this.element,
                icon = $item.find('> div > .t-icon'),
                hasData = data.length > 0;
            
            if (data.length == 0) {
                icon.remove();
                group.remove();
                $t.trigger(element, 'dataBound', { item: $item[0] });
                return;
            } else {
                if (icon.length == 0) {
                    $item.find("> div").prepend('<span class="t-icon t-plus" />');
                }
            }

            var groupHtml = new $t.stringBuilder(),
                isGroup = group.length == 0,
                groupLevel = $item.find('> div > .t-checkbox :input[name="' + element.id + '_checkedNodes.Index"]').val();

            if (!groupLevel && $item[0] != element) {
                var itemParents = $item.parentsUntil(".t-treeview", ".t-item").andSelf().map(function(x, item) { return $(item).index(); });
                groupLevel = Array.prototype.join.call(itemParents, ":");
            }

            var isExpanded = (isGroup ? $item.eq(0).is('.t-treeview') ? true : data[0].Expanded : false);

            TreeView.getGroupHtml({
                data: data,
                html: groupHtml,
                isAjax: this.isAjax(),
                isFirstLevel: $item.hasClass('t-treeview'),
                showLines: this.showLines,
                showCheckBoxes: this.showCheckBox,
                groupLevel: groupLevel,
                isExpanded: isExpanded,
                renderGroup: isGroup,
                elementId: element.id
            });

            if (group.length > 0 && $item.data('loaded') === false) {
                $(groupHtml.string()).prependTo(group);
            } else if (group.length > 0 && $item.data('loaded') !== false) {
                group.html(groupHtml.string());
            } else if (group.length == 0)
                group = $(groupHtml.string()).appendTo($item);

            $item.data('animating', true);

            $t.fx.play(this.effects, group, { direction: 'bottom' }, function () {
                $item.data('animating', false);
            });

            clearTimeout($item.data('loadingIconTimeout'));

            if ($item.hasClass('t-item')) {
                $item.data('loaded', true)
                    .find('.t-icon:first')
                        .removeClass('t-loading')
                        .removeClass('t-plus')
                        .addClass('t-minus');
            }

            if (this.isAjax()) {
                markAjaxLoadableNodes($item);
            }

            $t.trigger(element, 'dataBound', { item: $item[0] });
        },

        checkboxClick: function (e) {
            var element = $(e.target),
                isChecked = element.is(':checked');

            var isEventPrevented =
                $t.trigger(this.element, 'checked', {
                    item: element.closest('.t-item')[0],
                    checked: isChecked
                });

            if (!isEventPrevented) {
                this.nodeCheck(element, isChecked);
            } else {
                e.preventDefault();
            }
        },

        nodeCheck: function (li, isChecked) {
            $(li, this.element).each($.proxy(function (i, item) {
                var $item = $(item).closest('.t-item'),
                    $checkboxHolder = $("> div > .t-checkbox", $item),
                    arrayName = this.element.id + '_checkedNodes',
                    index = $checkboxHolder.find(':input[name="' + arrayName + '.Index"]').val(),
                    checkbox = $checkboxHolder.find(':checkbox');

                $checkboxHolder.find('[type=hidden]').filter(function() {
                    // use filter because of nested square brackets
                    return ($(this).attr("name").indexOf(arrayName + '[' + index + '].') > -1);
                }).remove();
                
                checkbox.attr('value', isChecked ? "True" : "False");
                
                if (isChecked) {
                    checkbox.attr('checked', 'checked');
                    $(TreeView.getNodeInputsHtml(this.getItemValue($item), this.getItemText($item), arrayName, index))
                        .appendTo($checkboxHolder);
                } else {
                    checkbox.attr('checked', false);
                }
            }, this));
        },

        getItemText: function (item) {
            return $(item).find('> div > .t-in').text();
        },

        getItemValue: function (item) {
            return $(item).find('>div>:input[name="itemValue"]').val() || this.getItemText(item);
        },

        findByText: function(text) {
            return $(this.element).find(".t-in").filter(function(i, element) {
                return $(element).text() == text;
            }).closest(".t-item");
        },

        findByValue: function(value) {
            return $(this.element).find("input[name='itemValue']").filter(function(i, element) {
                return $(element).val() == value;
            }).closest(".t-item");
        },

        _insertNode: function(nodeData, index, parentNode, group, insertCallback) {
            var that = this,
                updatedGroupLength = group.children().length + 1,
                isArrayData = $.isArray(nodeData),
                fromNodeData = isArrayData || $.isPlainObject(nodeData),
                groupData = {
                    showCheckBoxes: that.showCheckBox,
                    isFirstLevel: parentNode.hasClass(TTREEVIEW),
                    isExpanded: true,
                    itemsCount: updatedGroupLength
                }, node, i, html = new $t.stringBuilder();

            if (fromNodeData) {
                if (isArrayData) {
                    for (i = 0; i < nodeData.length; i++) {
                        TreeView.getItemHtml(extend({
                            html: html,
                            itemIndex: index + i,
                            item: nodeData[i]
                        }, groupData));
                    }

                } else {
                    TreeView.getItemHtml(extend({
                        html: html,
                        itemIndex: index,
                        item: nodeData
                    }, groupData));
                }

                node = $(html.string());
            } else {
                node = $(nodeData);

                if (group.children()[index - 1] == node[0]) {
                    return node;
                }

                if (node.closest(".t-treeview")[0] == that.element) {
                    that.remove(node);
                }
            }

            if (!group.length) {
                var groupHtml = new $t.stringBuilder();

                TreeView.getGroupHtml(extend({
                    html: groupHtml,
                    renderGroup: true
                }, groupData));

                group = $(groupHtml.string()).appendTo(parentNode);
            }

            insertCallback(node, group);

            if (parentNode.hasClass("t-item")) {
                updateNodeHtml(parentNode);
                updateNodeClasses(parentNode);
            }

            if (!fromNodeData) {
                updateNodeClasses(node);
            }

            updateNodeClasses(node.prev());
            updateNodeClasses(node.next());

            return node;
        },

        insertAfter: function (nodeData, referenceNode) {
            var group = referenceNode.parent();

            return this._insertNode(nodeData, referenceNode.index() + 1, group.parent(), group, function(item, group) {
                item.insertAfter(referenceNode);
            });
        },

        insertBefore: function (nodeData, referenceNode) {
            var group = referenceNode.parent();

            return this._insertNode(nodeData, referenceNode.index(), group.parent(), group, function(item, group) {
                item.insertBefore(referenceNode);
            });
        },

        append: function (nodeData, parentNode) {
            parentNode = $(parentNode || this.element);

            var group = parentNode.find(SUBGROUP);

            return this._insertNode(nodeData, group.children().length, parentNode, group, function(item, group) {
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
                updateNodeHtml(parentNode);
                updateNodeClasses(parentNode);
            }

            updateNodeClasses(prevSibling);
            updateNodeClasses(nextSibling);
        }
    };

    // client-side rendering
    $.extend(TreeView, {
        getNodeInputsHtml: function (itemValue, itemText, arrayName, value) {
            return new $t.stringBuilder()
                .cat('<input type="hidden" value="')
                .cat(itemValue)
                .cat('" name="' + arrayName + '[').cat(value).cat('].Value" class="t-input">')
                .cat('<input type="hidden" value="')
                .cat(itemText)
                .cat('" name="' + arrayName + '[').cat(value).cat('].Text" class="t-input">')
                .string();
        },

        getItemHtml: function (options) {
            var item = options.item,
                html = options.html,
                isFirstLevel = options.isFirstLevel,
                groupLevel = options.groupLevel,
                itemIndex = options.itemIndex,
                itemsCount = options.itemsCount,
                absoluteIndex = new $t.stringBuilder()
                                    .cat(groupLevel).catIf(':', groupLevel).cat(itemIndex)
                                .string(),
                serializeAttributes = function(attributes) {
                var i ;
                    if (typeof attributes != "undefined") {
                        for (i in attributes) {
                            html.cat(' ').cat(i).cat('="').cat(attributes[i]).cat('"');
                        }
                    }
                },
                htmlAttributes = item.HtmlAttributes || item.htmlAttributes || {};

            html.cat('<li class="t-item')
                    .catIf(' t-first', isFirstLevel && itemIndex == 0)
                    .catIf(' t-last', itemIndex == itemsCount - 1)
                .cat('">')
                .cat('<div class="')
                    .catIf('t-top ', isFirstLevel && itemIndex == 0)
                    .catIf('t-top', itemIndex != itemsCount - 1 && itemIndex == 0)
                    .catIf('t-mid', itemIndex != itemsCount - 1 && itemIndex != 0)
                    .catIf('t-bot', itemIndex == itemsCount - 1)
                    .catIf(' ' + htmlAttributes["class"], htmlAttributes["class"])
                .cat('"');

            delete htmlAttributes["class"];

            serializeAttributes(htmlAttributes);
                
            html.cat('>');

            if ((options.isAjax && item.LoadOnDemand) || (item.Items && item.Items.length > 0))
                html.cat('<span class="t-icon')
                        .catIf(' t-plus', item.Expanded !== true)
                        .catIf(' t-minus', item.Expanded === true)
                        .catIf('-disabled', item.Enabled === false) // t-(plus|minus)-disabled
                    .cat('"></span>');

            if (options.showCheckBoxes && item.Checkable !== false) {
                var arrayName = options.elementId + '_checkedNodes';

                html.cat('<span class="t-checkbox">')
                        .cat('<input type="hidden" value="').cat(absoluteIndex)
                        .cat('" name="').cat(arrayName).cat('.Index')
                        .cat('" class="t-input"/>')

                        .cat('<input type="checkbox" value="').cat(item.Checked === true ? 'True' : 'False')
                        .cat('" class="t-input')
                        .cat('" name="').cat(arrayName).cat('[').cat(absoluteIndex).cat('].Checked"')
                        .catIf(' disabled="disabled"', item.Enabled === false)
                        .catIf(' checked="checked"', item.Checked)
                    .cat('/>');

                if (item.Checked)
                    html.cat(TreeView.getNodeInputsHtml(item.Value, item.Text, arrayName, absoluteIndex));

                html.cat('</span>');
            }

            var navigateUrl = item.NavigateUrl || item.Url;

            html.cat(navigateUrl ? '<a href="' + navigateUrl + '" class="t-link ' : '<span class="')
                    .cat('t-in')
                    .catIf(' t-state-disabled', item.Enabled === false)
                    .catIf(' t-state-selected', item.Selected === true)
                .cat('">');

            if (item.ImageUrl != null) {
                html.cat('<img');

                serializeAttributes($.extend({
                    alt: "",
                    "class": "t-image",
                    src: item.ImageUrl
                }, item.ImageHtmlAttributes || item.imageHtmlAttributes || {}));
                
                html.cat(' />');
            }

            if (item.SpriteCssClasses != null)
                html.cat('<span class="t-sprite ').cat(item.SpriteCssClasses).cat('"></span>');

            html.catIf(item.Text, item.Encoded === false)
                .catIf(item.Text.replace(/</g, '&lt;').replace(/>/g, '&gt;'), item.Encoded !== false)
                .cat(navigateUrl ? '</a>' : '</span>');

            if (item.Value)
                html.cat('<input type="hidden" class="t-input" name="itemValue" value="')
                    .cat(item.Value)
                    .cat('" />');

            html.cat('</div>');

            if (item.Items && item.Items.length > 0)
                TreeView.getGroupHtml({
                    data: item.Items,
                    html: html,
                    isAjax: options.isAjax,
                    isFirstLevel: false,
                    showCheckBoxes: options.showCheckBoxes,
                    groupLevel: absoluteIndex,
                    isExpanded: item.Expanded,
                    elementId: options.elementId
                });

            html.cat('</li>');
        },

        getGroupHtml: function (options) {
            var data = options.data,
                html = options.html,
                showLines = options.showLines,
                isFirstLevel = options.isFirstLevel,
                renderGroup = options.renderGroup;

            if (renderGroup !== false) {
                html.cat('<ul class="t-group')
                    .catIf(' t-treeview-lines', isFirstLevel && (typeof showLines == typeof undefined || showLines))
                    .cat('"')
                    .catIf(' style="display:none"', options.isExpanded !== true)
                    .cat('>');
            }

            if (data && data.length > 0) {
                var getItemHtml = TreeView.getItemHtml;

                for (var i = 0, len = data.length; i < len; i++) {
                    getItemHtml({
                        item: data[i],
                        html: html,
                        isAjax: options.isAjax,
                        isFirstLevel: isFirstLevel,
                        showCheckBoxes: options.showCheckBoxes,
                        groupLevel: options.groupLevel,
                        itemIndex: i,
                        itemsCount: len,
                        elementId: options.elementId
                    });
                }
            }

            if (renderGroup !== false)
                html.cat('</ul>');
        }
    });

    $.fn.tTreeView = function (options) {
        return $t.create(this, {
            name: 'tTreeView',
            init: function (element, options) {
                return new TreeView(element, options);
            },
            options: options,
            success: function (treeView) {
                if (treeView.isAjax() && $(treeView.element).find('.t-item').length == 0)
                    treeView.ajaxRequest();
            }
        });
    };

    $.fn.tTreeView.defaults = {
        effects: $t.fx.property.defaults('height'),
        queryString: {
            text: 'Text',
            value: 'Value',
            checked: 'Checked'
        }
    };
})(jQuery);
