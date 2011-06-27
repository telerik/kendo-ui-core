(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        tbodySupportsInnerHtml = kendo.support.tbodyInnerHtml,
        Component = ui.Component,
        keys = kendo.keys,
        isPlainObject = $.isPlainObject,
        extend = $.extend,
        map = $.map,
        isArray = $.isArray,
        proxy = $.proxy,
        CELL_SELECTOR =  ">tbody>tr>td",
        FIRST_CELL_SELECTOR = "td:first",
        CHANGE = "change",
        DATABOUND = "dataBound",
        FOCUSED = "t-state-focused",
        FOCUSABLE = "t-focusable",
        STRING = "string";

    var Grid = Component.extend({
        init: function(element, options) {
            var that = this;

            options = isArray(options) ? { dataSource: options } : options;

            Component.fn.init.call(that, element, options);

            that.bind([CHANGE,DATABOUND], that.options);

            that._element();

            that._columns(that.options.columns);

            that._dataSource();

            that._tbody();

            that._pageable();

            that._thead();

            that._templates();

            that._navigatable();

            that._selectable();

            if (that.options.autoBind){
                that.dataSource.query();
            }
        },

        options: {
            columns: [],
            autoBind: true,
            scrollable: true,
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

        _selectable: function() {
            var that = this,
                multi,
                cell,
                selectable = that.options.selectable;

            if (selectable) {
                multi = typeof selectable === STRING && selectable.toLowerCase().indexOf("multiple") > -1;
                cell = typeof selectable === STRING && selectable.toLowerCase().indexOf("cell") > -1;

                that.selectable = new kendo.ui.Selectable(that.element, {
                    filter: cell ? CELL_SELECTOR : ">tbody>tr",
                    multi: multi,
                    change: function() {
                        that.trigger(CHANGE);
                    }
                });

                that.element.keydown(function(e) {
                    if (e.keyCode === keys.SPACEBAR) {
                        var current = that.current();

                        if (!multi || !e.ctrlKey) {
                            that.selectable.clear();
                        }
                        that.selectable.value(cell ? current : current.parent());
                    }
                });
            }
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
                element = that.element;

            element.bind({
                focus: function() {
                    that.current(element.find(FIRST_CELL_SELECTOR));
                },
                blur: function() {
                    if (that._current) {
                        that._current.removeClass(FOCUSED);
                        that._current = null;
                    }
                },
                keydown: function(e) {
                    var key = e.keyCode,
                        current = that.current(),
                        dataSource = that.dataSource,
                        pageable = that.options.pageable;

                    if (keys.UP === key) {
                        that.current(current ? current.parent().prev().children().eq(current.index()) : element.find(FIRST_CELL_SELECTOR));
                    } else if (keys.DOWN === key) {
                        that.current(current ? current.parent().next().children().eq(current.index()) : element.find(FIRST_CELL_SELECTOR));
                    } else if (keys.LEFT === key) {
                        that.current(current ? current.prev() : element.find(FIRST_CELL_SELECTOR));
                    } else if (keys.RIGHT === key) {
                        that.current(current ? current.next() : element.find(FIRST_CELL_SELECTOR));
                    } else if (pageable && keys.PAGEUP == key) {
                        that._current = null;
                        dataSource.page(dataSource.page() + 1);
                    } else if (pageable && keys.PAGEDOWN == key) {
                        that._current = null;
                        dataSource.page(dataSource.page() - 1);
                    }
                }
            });

            element.addClass(FOCUSABLE)
                  .delegate("." + FOCUSABLE + CELL_SELECTOR, "mousedown", function(e) {
                      that.current($(e.currentTarget));
                  });
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

                if(that.content.is(".t-grid-table-wrap")) {
                    that.content = that.content.parent();
                }

                if (!that.content.is(".t-grid-content, .t-grid-table-wrap")) {
                    that.content = $('<div class="t-grid-content" />');
                    that.table.wrap(that.content);

                    if (scrollable !== true && scrollable.virtual) {
                        that.tableWrap = $('<div class="t-grid-table-wrap"/>');
                        that.table.wrap(that.tableWrap);
                    }
                }

                height -= header.outerHeight();

                if (that.pager) {
                    height -= that.pager.element.outerHeight();
                }

                that.content.height(height);

                if (scrollable !== true && scrollable.virtual) {
                    that.content.css( {
                        width: "auto",
                        paddingRight: scrollbar,
                        overflow: "hidden"
                    });

                    that.verticalScrollbar = $('<div class="t-scrollbar t-scrollbar-vertical" />')
                        .css({
                            width: scrollbar
                        }).appendTo(that.content)
                        .bind("scroll", proxy(that._scroll, that));

                    that.bind(DATABOUND, proxy(that._dataBound, that));
                }
            }
        },

        _scroll: function(e) {
            var that = this,
                scrollTop = e.currentTarget.scrollTop,
                dataSource = that.dataSource,
                rowHeight = that._rowHeight,
                skip = dataSource.skip() || 0,
                take = dataSource.take(),
                firstRowIndex = Math.floor(scrollTop / rowHeight);
                lastRowIndex = Math.floor((scrollTop + take * rowHeight) / rowHeight);

            if (firstRowIndex < skip) {
                skip = Math.max(0, lastRowIndex - take);

                dataSource.range(skip, take);

                that._scrollTop = 0;
            } else if (lastRowIndex > skip + take) {
                skip = firstRowIndex;

                dataSource.range(skip, take);

                that._scrollTop = rowHeight;
            } else {
                that._scrollTop = scrollTop - (skip * rowHeight);
            }
        },

        _dataBound: function() {
            var that = this,
                rowHeight,
                totalHeight,
                html = "",
                idx,
                maxHeight = 250000;

            that._rowHeight = rowHeight = that.table[0].rows[0].offsetHeight;

            totalHeight = that.dataSource.total() * rowHeight;

            for (idx = 0; idx < Math.floor(totalHeight / maxHeight); idx++) {
                html += '<div style="width:1px;height:' + maxHeight + 'px"></div>';
            }

            if (totalHeight % maxHeight) {
                html += '<div style="width:1px;height:' + (totalHeight % maxHeight) + 'px"></div>';
            }

            that.verticalScrollbar.html(html);

            that.tableWrap.scrollTop(that._scrollTop);
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

            that.dataSource = DataSource.create(dataSource).bind(CHANGE, proxy(that.refresh, that));
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

                if (typeof pageable === "object" && pageable instanceof kendo.ui.Pagable) {
                    that.pager = pageable;
                } else {
                    that.pager = new kendo.ui.Pagable(wrapper, extend({}, pageable, { dataSource: that.dataSource }));
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
            var that = this;

            // using HTML5 data attributes as a configuration option e.g. <th data-field="foo">Foo</foo>
            columns = columns.length ? columns : map(that.table.find("th"), function(th) {
                var th = $(th),
                    field = th.data("field");

                if (!field) {
                   field = th.text().replace(/\s|[^A-z0-9]/g, "");
                }

                return {
                    field: field,
                    template: th.data("template")
                };
            });

            that.columns = map(columns, function(column) {
                column = typeof column === STRING ? { field: column } : column;
                return extend({ encoded: true }, column);
            });
        },

        _tmpl: function(start, rowTemplate) {
            var that = this,
                settings = extend({}, kendo.Template, that.options.templateSettings);

            if (!$.isFunction(rowTemplate)) {

                if (!rowTemplate) {
                    rowTemplate = start;

                    $.each(that.columns, function() {
                        var column = this, template = column.template, field = column.field;

                        if (!template) {
                            if (column.encoded === true) {
                                template = "${" + (settings.useWithBlock ? "" : settings.paramName + ".") + field + "}";
                            } else {
                                template = settings.begin + "=" + (settings.useWithBlock ? "" : settings.paramName + ".") + field + settings.end;
                            }
                        }

                        rowTemplate += "<td>" + template + "</td>";
                    });

                    rowTemplate += "</tr>";
                }

                rowTemplate = kendo.template(rowTemplate, settings);
            }

            return rowTemplate;
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

            tr.appendTo(thead);

            that.thead = thead;

            that._sortable();

            that._scrollable();
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

        refresh: function() {
            var that = this,
                length,
                idx,
                html = "",
                data = that.dataSource.view(),
                tbody,
                placeholder,
                rowTemplate,
                altRowTemplate;

            if (!that.columns.length) {
                that._autoColumns(data[0]);
            }

            rowTemplate = that.rowTemplate,
            altRowTemplate = that.altRowTemplate;

            for (idx = 0, length = data.length; idx < length; idx++) {
                if (idx % 2) {
                   html += altRowTemplate(data[idx]);
                } else {
                   html += rowTemplate(data[idx]);
                }
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
})(jQuery);
