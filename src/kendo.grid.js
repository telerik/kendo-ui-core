(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        Groupable = kendo.ui.Groupable,
        tbodySupportsInnerHtml = kendo.support.tbodyInnerHtml,
        Component = ui.Component,
        keys = kendo.keys,
        isPlainObject = $.isPlainObject,
        extend = $.extend,
        map = $.map,
        isArray = $.isArray,
        proxy = $.proxy,
        REQUESTSTART = "requestStart",
        ERROR = "error",
        ROW_SELECTOR = "tr:not(.t-grouping-row):visible",
        CELL_SELECTOR =  ROW_SELECTOR + ">td:not(.t-group-cell)",
        FIRST_CELL_SELECTOR = CELL_SELECTOR + ":first",
        CHANGE = "change",
        DATABOUND = "dataBound",
        FOCUSED = "t-state-focused",
        FOCUSABLE = "t-focusable",
        SELECTED = "t-state-selected",
        STRING = "string";

    var VirtualScrollable =  Component.extend({
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);
            that.dataSource = options.dataSource;
            that.dataSource.bind(CHANGE, proxy(that.refresh, that));
            that.wrap();
        },

        options: {
            itemHeight: $.noop
        },

        wrap: function() {
            var that = this,
                // workaround for IE issue where scroll is not raised if container is same width as the scrollbar
                scrollbar = kendo.support.scrollbar() + 1,
                element = that.element;

            element.css( {
                width: "auto",
                paddingRight: scrollbar,
                overflow: "hidden"
            });
            that.content = element.children().first();
            that.wrapper = that.content.wrap('<div class="t-virtual-scrollable-wrap"/>')
                                .parent()
                                .bind("DOMMouseScroll", proxy(that._wheelScroll, that))
                                .bind("mousewheel", proxy(that._wheelScroll, that));

            that.verticalScrollbar = $('<div class="t-scrollbar t-scrollbar-vertical" />')
                                        .css({
                                            width: scrollbar
                                        }).appendTo(element)
                                        .bind("scroll", proxy(that._scroll, that));
        },

        _wheelScroll: function(e) {
            console.log(e);
            var that = this,
                scrollTop = that.verticalScrollbar.scrollTop(),
                originalEvent = e.originalEvent,
                delta;

            e.preventDefault();

            if (originalEvent.wheelDelta) {
                delta = originalEvent.wheelDelta;
            } else if (originalEvent.detail) {
                delta = -originalEvent.detail;
            } else if ($.browser.opera) {
                delta = -originalEvent.wheelDelta;
            }
            that.verticalScrollbar.scrollTop(scrollTop + (-delta));
        },

        _scroll: function(e) {
            var that = this,
                scrollTop = e.currentTarget.scrollTop,
                dataSource = that.dataSource,
                rowHeight = that.itemHeight,
                skip = dataSource.skip() || 0,
                height = that.element.innerHeight(),
                isScrollingUp = !!(that._scrollbarTop && that._scrollbarTop > scrollTop),
                firstItemIndex = Math.max(Math.floor(scrollTop / rowHeight), 0),
                lastItemIndex = Math.max(firstItemIndex + Math.floor(height / rowHeight), 0);

            that._scrollTop = scrollTop - (skip * rowHeight);
            that._scrollbarTop = scrollTop;

            if (!that._fetch(firstItemIndex, lastItemIndex, isScrollingUp)) {
                that.wrapper[0].scrollTop = that._scrollTop;
            }
        },

        _fetch: function(firstItemIndex, lastItemIndex, scrollingUp) {
            var that = this,
                dataSource = that.dataSource,
                itemHeight = that.itemHeight,
                skip = dataSource.skip() || 0,
                take = dataSource.take(),
                originalSkip = Math.max(Math.round(skip / take), 0) * take,
                fetching = false,
                prefetchAt = 0.33;

            if (firstItemIndex < skip) {
                fetching = true;
                skip = Math.max(0, lastItemIndex - take);
                that._scrollTop = (firstItemIndex - skip) * itemHeight;
                that._page(skip, take);
            } else if (lastItemIndex >= skip + take && !scrollingUp) {
                fetching = true;
                skip = firstItemIndex;
                that._scrollTop = itemHeight;
                that._page(skip, take);
            } else {
                if (firstItemIndex < originalSkip + take * prefetchAt && firstItemIndex > take * prefetchAt) {
                    dataSource.fetchPrevPage();
                }
                if (lastItemIndex > (originalSkip + take) - (take * prefetchAt)) {
                    dataSource.fetchNextPage();
                }
            }
            return fetching;
        },

        _page: function(skip, take) {
            var that = this,
                dataSource = that.dataSource;

            clearTimeout(that._timeout);

            if (dataSource.inRange(skip, take)) {
                dataSource.range(skip, take);
            } else {
                kendo.ui.progress(that.wrapper, true);
                that._timeout = setTimeout(function() {
                    dataSource.range(skip, take);
                }, 100);
            }
        },

        refresh: function() {
            var that = this,
                html = "",
                maxHeight = 250000,
                itemHeight;

            kendo.ui.progress(that.wrapper, false);
            clearTimeout(that._timeout);

            itemHeight = that.itemHeight = that.options.itemHeight() || 0;

            totalHeight = that.dataSource.total() * itemHeight;

            for (idx = 0; idx < Math.floor(totalHeight / maxHeight); idx++) {
                html += '<div style="width:1px;height:' + maxHeight + 'px"></div>';
            }

            if (totalHeight % maxHeight) {
                html += '<div style="width:1px;height:' + (totalHeight % maxHeight) + 'px"></div>';
            }

            that.verticalScrollbar.html(html);
            that.wrapper[0].scrollTop = that._scrollTop;
        }
    });

    function groupCells(count) {
        if (count === 0) {
            return "";
        }

        return new Array(count + 1).join('<td class="t-group-cell"></td>');
    }

    function columnTemplate(column, settings) {
        var template = column.template, field = column.field;

        if (!template) {
            if (column.encoded === true) {
                template = "${" + (settings.useWithBlock ? "" : settings.paramName + ".") + field + "}";
            } else {
                template = settings.begin + "=" + (settings.useWithBlock ? "" : settings.paramName + ".") + field + settings.end;
            }
        }

        return template;
    }

    var Grid = Component.extend({
        init: function(element, options) {
            var that = this;

            options = isArray(options) ? { dataSource: options } : options;

            Component.fn.init.call(that, element, options);

            that._element();

            that._columns(that.options.columns);

            that._dataSource();

            that._tbody();

            that._pageable();

            that._groupable();

            that._thead();

            that._templates();

            that._navigatable();

            that._selectable();

            if (that.options.autoBind) {
                that.dataSource.query();
            }

            that.bind([CHANGE,DATABOUND], that.options);
        },

        options: {
            columns: [],
            autoBind: true,
            scrollable: true,
            groupable: false,
            dataSource: {}
        },

        _element: function() {
            var that = this,
                table = that.element;

            if (!table.is("table")) {
                table = $("<table />").appendTo(that.element);
            }

            that.table = table.attr("cellspacing", 0);

            that._wrapper();
        },

        _groupable: function() {
            var that = this,
                wrapper = that.wrapper,
                groupable = that.options.groupable;

            if (groupable) {
                if(!wrapper.has("div.t-grouping-header")[0]) {
                    $("<div />").addClass("t-grouping-header").prependTo(wrapper);
                }

                that.groupable = new Groupable(wrapper, {
                    filter: "th:not(.t-group-cell)",
                    groupContainer: "div.t-grouping-header",
                    dataSource: that.dataSource
                });
            }

            that.table.delegate(".t-grouping-row .t-collapse, .t-grouping-row .t-expand", "click", function(e) {
                e.preventDefault();
                var element = $(this),
                    group = element.closest("tr");
                if(element.hasClass('t-collapse')) {
                    that.collapseGroup(group);
                } else {
                    that.expandGroup(group);
                }
            });
        },

        _selectable: function() {
            var that = this,
                multi,
                cell,
                selectable = that.options.selectable;

            if (selectable) {
                multi = typeof selectable === STRING && selectable.toLowerCase().indexOf("multiple") > -1;
                cell = typeof selectable === STRING && selectable.toLowerCase().indexOf("cell") > -1;

                that.selectable = new kendo.ui.Selectable(that.table, {
                    filter: cell ? CELL_SELECTOR : ROW_SELECTOR,
                    multi: multi,
                    change: function() {
                        that.trigger(CHANGE);
                    }
                });

                that.wrapper.keydown(function(e) {
                    if (e.keyCode === keys.SPACEBAR) {
                        var current = that.current();
                        current = cell ? current : current.parent();

                        if(multi) {
                            if(!e.ctrlKey) {
                                that.selectable.clear();
                            } else {
                                if(current.hasClass(SELECTED)) {
                                    current.removeClass(SELECTED);
                                    current = null;
                                }
                            }
                        } else {
                            that.selectable.clear();
                        }

                        that.selectable.value(current);
                    }
                });
            }
        },

        clearSelection: function() {
            var that = this;
            that.selectable.clear();
            that.trigger(CHANGE);
        },

        select: function(items) {
            var that = this,
                selectable = that.selectable;

            items = $(items);
            if(items.length) {
                if(!selectable.options.multi) {
                    selectable.clear();
                    items = items.first();
                }
                selectable.value(items);
                return;
            }

            return selectable.value();
        },

        current: function(element) {
            var that = this,
                current = that._current;

            if(element !== undefined && element.length) {
                if (!current || current[0] !== element[0]) {
                    element.addClass(FOCUSED);
                    if (current) {
                        current.removeClass(FOCUSED);
                    }
                    that._current = element;
                }
            } else {
                return that._current;
            }
        },

        _navigatable: function() {
            var that = this,
                wrapper = that.wrapper,
                table = that.table.addClass(FOCUSABLE),
                currentProxy = proxy(that.current, that),
                selector = "." + FOCUSABLE + " " + CELL_SELECTOR,
                clickCallback = function(e) {
                    currentProxy($(e.currentTarget));
                    if(e.type == "click") {
                        wrapper.focus();
                    }
                };

            wrapper.bind({
                focus: function() {
                    if(that._current && that._current.is(":visible")) {
                        that._current.addClass(FOCUSED);
                    } else {
                        currentProxy(that.table.find(FIRST_CELL_SELECTOR));
                    }
                },
                focusout: function() {
                    if (that._current) {
                        that._current.removeClass(FOCUSED);
                    }
                },
                keydown: function(e) {
                    var key = e.keyCode,
                        current = that.current(),
                        dataSource = that.dataSource,
                        pageable = that.options.pageable;

                    if (keys.UP === key) {
                        currentProxy(current ? current.parent().prevAll(ROW_SELECTOR).first().children().eq(current.index()) : table.find(FIRST_CELL_SELECTOR));
                    } else if (keys.DOWN === key) {
                        currentProxy(current ? current.parent().nextAll(ROW_SELECTOR).first().children().eq(current.index()) : table.find(FIRST_CELL_SELECTOR));
                    } else if (keys.LEFT === key) {
                        currentProxy(current ? current.prev(":not(.t-group-cell)") : table.find(FIRST_CELL_SELECTOR));
                    } else if (keys.RIGHT === key) {
                        currentProxy(current ? current.next() : table.find(FIRST_CELL_SELECTOR));
                    } else if (pageable && keys.PAGEUP == key) {
                        that._current = null;
                        dataSource.page(dataSource.page() + 1);
                    } else if (pageable && keys.PAGEDOWN == key) {
                        that._current = null;
                        dataSource.page(dataSource.page() - 1);
                    }
                }
            });

            if($.browser.msie) {
                wrapper.delegate(selector, "click", clickCallback);
            } else {
                wrapper.delegate(selector, "mousedown", clickCallback);
            }
        },

        _wrapper: function() {
            var that = this,
                table = that.table,
                height = that.options.height || table.css("height"),
                wrapper;

            wrapper = table.parent();

            if (!wrapper.is("div")) {
               wrapper = table.wrap("<div />").parent();
            }

            that.wrapper = wrapper.addClass("t-grid t-widget")
                                  .attr("tabIndex", Math.max(table.attr("tabIndex") || 0, 0));

            table.removeAttr("tabIndex");

            if (height && height !== "0px") {
                that.wrapper.css("height", height);
                table.css("height", "auto");
            }
        },

        _tbody: function() {
            var that = this,
                table = that.table,
                tbody;

            tbody = table.find(">tbody");

            if (!tbody.length) {
                tbody = $("<tbody />").appendTo(table);
            }

            that.tbody = tbody;
        },

        _scrollable: function() {
            var that = this,
                header,
                table,
                options = that.options,
                height = that.wrapper.innerHeight(),
                scrollbar = kendo.support.scrollbar(),
                scrollable = options.scrollable;

            if (scrollable) {
                header = that.wrapper.children().filter(".t-grid-header");

                if (!header[0]) {
                    header = $('<div class="t-grid-header" />').insertBefore(that.table);
                }

                header.css("padding-right", scrollbar);
                table = $('<table cellspacing="0" />');
                table.append(that.thead);
                header.empty().append($('<div class="t-grid-header-wrap" />').append(table));

                that.content = that.table.parent();

                if (that.content.is(".t-virtual-scrollable-wrap")) {
                    that.content = that.content.parent();
                }

                if (!that.content.is(".t-grid-content, .t-virtual-scrollable-wrap")) {
                    that.content = that.table.wrap('<div class="t-grid-content" />').parent();

                    if (scrollable !== true && scrollable.virtual) {
                        new VirtualScrollable(that.content, {
                            dataSource: that.dataSource,
                            itemHeight: proxy(that._calculateRowHeight, that)
                        });
                    }
                }

                height -= header.outerHeight();

                if (that.pager) {
                    height -= that.pager.element.outerHeight();
                }

                if(options.groupable) {
                    height -= $(".t-grouping-header").outerHeight();
                }

                that.content.height(height);
            }
        },

        _calculateRowHeight: function() {
            var that = this,
                rowHeight = that._rowHeight;

            if (!that._rowHeight) {
                that._rowHeight = rowHeight = that.table.outerHeight() / that.table[0].rows.length;
                that._sum = rowHeight;
                that._measures = 1;

                totalHeight = Math.round(that.dataSource.total() * rowHeight);
            }

            var currentRowHeight = that.table.outerHeight() / that.table[0].rows.length;

            if (rowHeight !== currentRowHeight) {
                that._measures ++;
                that._sum += currentRowHeight;
                that._rowHeight = that._sum / that._measures;
            }
            return rowHeight;
        },

        _dataSource: function() {
            var that = this,
                options = that.options,
                dataSource = options.dataSource;

            dataSource = isArray(dataSource) ? { data: dataSource } : dataSource;

            if (isPlainObject(dataSource)) {
                extend(dataSource, { table: that.table, fields: that.columns });

                if (options.data) {
                    dataSource.data = options.data;
                }

                pageable = options.pageable;

                if (isPlainObject(pageable) && pageable.pageSize !== undefined) {
                    dataSource.pageSize = pageable.pageSize;
                }
            }

            that.dataSource = DataSource.create(dataSource)
                                .bind(CHANGE, proxy(that.refresh, that))
                                .bind(REQUESTSTART, proxy(that._requestStart, that))
                                .bind(ERROR, proxy(that._error, that));
        },
        _error: function() {
            kendo.ui.progress(this.element.parent(), false);
        },
        _requestStart: function() {
            kendo.ui.progress(this.element.parent(), true);
        },

        _pageable: function() {
            var that = this,
                wrapper,
                pageable = that.options.pageable;

            if (pageable) {
                wrapper = that.wrapper.children("div.t-grid-pager");

                if (!wrapper.length) {
                    wrapper = $('<div class="t-grid-pager"/>').appendTo(that.wrapper);
                }

                if (typeof pageable === "object" && pageable instanceof kendo.ui.Pageable) {
                    that.pager = pageable;
                } else {
                    that.pager = new kendo.ui.Pageable(wrapper, extend({}, pageable, { dataSource: that.dataSource }));
                }
            }
        },

        _sortable: function() {
            var that = this,
                sortable = that.options.sortable;

            if (sortable) {
                that.thead.find("th").kendoSortable(extend({}, sortable, { dataSource: that.dataSource }));
            }
        },

        _columns: function(columns) {
            var that = this,
                table = that.table,
                cols = table.find("col");

            // using HTML5 data attributes as a configuration option e.g. <th data-field="foo">Foo</foo>
            columns = columns.length ? columns : map(table.find("th"), function(th, idx) {
                var th = $(th),
                    field = th.data("field");

                if (!field) {
                   field = th.text().replace(/\s|[^A-z0-9]/g, "");
                }

                return {
                    field: field,
                    template: th.data("template"),
                    width: cols.eq(idx).css("width")
                };
            });

            that.columns = map(columns, function(column) {
                column = typeof column === STRING ? { field: column } : column;
                return extend({ encoded: true }, column);
            });
        },

        _compositeTmpl: function(start, settings) {
            var that = this,
                templates=[],
                idx,
                length,
                groups = (that.dataSource.group() || []).length;

            if (groups > 0) {
                templates.push(function() {
                    return groupCells(groups);
                });
            }

            for (idx = 0, length = that.columns.length; idx < length; idx++) {
                templates.push(kendo.template(columnTemplate(that.columns[idx], settings)));
            }

            return function(data) {
                var html = [start], idx, length;

                for (idx = 0, length = templates.length; idx < length; idx++) {
                    html.push("<td>");
                    html.push(templates[idx](data));
                    html.push("</td>");
                }

                return html.join("") + "</tr>";
            }
        },

        _tmpl: function(start, rowTemplate) {
            var that = this,
                settings = extend({}, kendo.Template, that.options.templateSettings),
                idx,
                length,
                template,
                groups = (that.dataSource.group() || []).length;

            if (!rowTemplate) {
                rowTemplate = start;

                if (groups > 0) {
                    rowTemplate += groupCells(groups);
                }

                for (idx = 0, length = that.columns.length; idx < length; idx++) {
                    template = columnTemplate(that.columns[idx], settings);

                    if ($.isFunction(template)) {
                        return that._compositeTmpl(start, settings);
                    }

                    rowTemplate += "<td>" + template + "</td>";
                }

                rowTemplate += "</tr>";

            }

            return kendo.template(rowTemplate, settings);
        },

        _templates: function() {
            var that = this,
                options = that.options;

            that.rowTemplate = that._tmpl("<tr>", options.rowTemplate);
            that.altRowTemplate = that._tmpl('<tr class="t-alt">', options.altRowTemplate || options.rowTemplate);
        },

        _thead: function() {
            var that = this,
                columns = that.columns,
                idx,
                length,
                html = "",
                thead = that.table.find("thead"),
                tr,
                th;

            if (!thead.length) {
                thead = $("<thead/>").insertBefore(that.tbody);
            }

            tr = that.table.find("tr").filter(":has(th)");

            if (!tr.length) {
                tr = thead.children().first();
                if(!tr.length) {
                    tr = $("<tr/>");
                }
            }

            if (!tr.children().length) {
                for (idx = 0, length = columns.length; idx < length; idx++) {
                    th = columns[idx];
                    html += "<th data-field='" + th.field + "'>" + (th.title || th.field) + "</th>";
                }

                tr.html(html);
            }

            tr.find("th").addClass("t-header");

            if(!that.options.scrollable) {
                thead.addClass("t-grid-header");
            }

            tr.appendTo(thead);

            that.thead = thead;

            that._sortable();

            that._scrollable();

            that._updateCols();
        },

        _updateCols: function() {
            var that = this,
                table = that.thead.parent().add(that.table),
                colgroup = table.find("colgroup"),
                width,
                cols = map(that.columns, function(column) {
                    width = column.width;
                    if(width && parseInt(width) != 0) {
                        return kendo.format('<col style="width:{0}"/>', width);
                    }

                    return "<col />";
                }),
                groups = (that.dataSource.group() || []).length;

            if (colgroup.length) {
                colgroup.remove();
            }

            colgroup = $("<colgroup></colgroup>").append($(new Array(groups + 1).join('<col class="t-group-col">') + cols.join("")));

            table.prepend(colgroup);
        },

        _autoColumns: function(schema) {
            if (schema) {
                var that = this,
                    field;

                for (field in schema) {
                    that.columns.push({
                        field: field
                    });
                }

                that._thead();

                that._templates();
            }
        },
        _rowsHtml: function(data) {
            var that = this,
                html = "",
                idx,
                length,
                rowTemplate = that.rowTemplate,
                altRowTemplate = that.altRowTemplate;

            for (idx = 0, length = data.length; idx < length; idx++) {
                if (idx % 2) {
                    html += altRowTemplate(data[idx]);
                } else {
                    html += rowTemplate(data[idx]);
                }
            }

            return html;
        },
        _groupRowHtml: function(group, colspan, level) {
            var that = this,
                html = "",
                idx,
                length,
                groupItems = group.items;

            html +=  '<tr class="t-grouping-row">' + groupCells(level) +
                      '<td colspan="' + colspan + '">' +
                        '<p class="t-reset">' +
                         '<a class="t-icon t-collapse" href="#"></a>' +
                         group.field + ': ' + group.value +'</p></td></tr>';

            if(group.hasSubgroups) {
                for(idx = 0, length = groupItems.length; idx < length; idx++) {
                    html += that._groupRowHtml(groupItems[idx], colspan - 1, level + 1);
                }
            } else {
                html += that._rowsHtml(groupItems);
            }

            return html;
        },
        collapseGroup: function(group) {
            group = $(group).find(".t-icon").addClass("t-expand").removeClass("t-collapse").end();
            var level = group.find(".t-group-cell").length;

            group.nextUntil(function() {
                return $(".t-group-cell", this).length <= level;
            }).hide();
        },
        expandGroup: function(group) {
            group = $(group).find(".t-icon").addClass("t-collapse").removeClass("t-expand").end();
            var that = this,
                level = group.find(".t-group-cell").length;

            group.nextAll("tr").each(function () {
                var tr = $(this);
                var offset = tr.find(".t-group-cell").length;
                if (offset <= level)
                    return false;

                if (offset == level + 1) {
                    tr.show();

                    if (tr.hasClass("t-grouping-row") && tr.find(".t-icon").hasClass("t-collapse"))
                        that.expandGroup(tr);
                }
            });
        },
        _updateHeader: function(groups) {
            var that = this,
                cells = that.thead.find("th.t-group-cell"),
                length = cells.length;

            if(groups > length) {
                $(new Array(groups - length + 1).join('<th class="t-group-cell t-header">&nbsp;</th>')).prependTo(that.thead.find("tr"));
            } else if(groups < length) {
                length = length - groups;
                $($.grep(cells, function(item, index) { return length > index } )).remove();
            }
        },

        _firstDataItem: function(data, grouped) {
            if(data && grouped) {
                if(data.hasSubgroups) {
                    data = this._firstDataItem(data.items[0], grouped);
                } else {
                    data = data.items[0];
                }
            }
            return data;
        },

        refresh: function() {
            var that = this,
                length,
                idx,
                html = "",
                data = that.dataSource.view(),
                tbody,
                placeholder,
                groups = (that.dataSource.group() || []).length,
                colspan = groups + that.columns.length;

            kendo.ui.progress(that.element.parent(), false);

            if (!that.columns.length) {
                that._autoColumns(that._firstDataItem(data[0], groups));
                colspan = groups + that.columns.length;
            }

            that._group = groups > 0 || that._group;

            if(that._group) {
                that._templates();
                that._updateHeader(groups);
                that._updateCols();
                that._group = groups > 0;
            }

            if(groups > 0) {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    html += that._groupRowHtml(data[idx], colspan, 0);
                }
            } else {
                html += that._rowsHtml(data);
            }

            if (tbodySupportsInnerHtml) {
                that.tbody[0].innerHTML = html;
            } else {
                placeholder = document.createElement("div");
                placeholder.innerHTML = "<table><tbody>" + html + "</tbody></table>";
                tbody = placeholder.firstChild.firstChild;
                that.table[0].replaceChild(tbody, that.tbody[0]);
                that.tbody = $(tbody);
            }
            that.trigger(DATABOUND);
       }
   });

   ui.plugin("Grid", Grid);
   ui.plugin("VirtualScrollable", VirtualScrollable);
})(jQuery);
