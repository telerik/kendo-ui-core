(function($, window, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        Navigatable = kendo.ui.Navigatable,
        tbodySupportsInnerHtml = kendo.support.tbodyInnerHtml,
        Component = ui.Component,
        extend = $.extend,
        isPlainObject = $.isPlainObject,
        FOCUSSELECTOR =  ">tbody>tr>td",
        CHANGE = "change",
        map = $.map;

    function Grid(element, options) {
        var that = this,
            dataSource,
            pageable;

        options = $.isArray(options) ? { data: options } : options;

        Component.call(that, element, options);

        that.bind([CHANGE], that.options);

        that._element();

        that._columns(that.options.columns);

        that._dataSource();

        that._tbody();

        that._thead();

        that._wrapper();

        that._templates();

        that._pager();

        that._navigation();

        that._selection();

        that.dataSource.read();
    }

    Grid.prototype = {
        options: {
            columns: [],
            dataSource: {}
        },

        _element: function() {
            var that = this,
                table = that.element;

            if (!table.is("table")) {
                table = $("<table />").appendTo(that.element);
            }

            that.table = table;
        },
        _selection: function() {
            var that = this,
                multi,
                cell,
                selectable = that.options.selectable;

            if(selectable) {
                multi = typeof selectable === "string" && selectable.toLowerCase().indexOf("multiple") > -1;
                cell = typeof selectable === "string" && selectable.toLowerCase().indexOf("cell") > -1;

                that.selectable = new kendo.ui.Selectable(that.element, {
                    filter: cell ? ">tbody>tr>td" : ">tbody>tr",
                    multi: multi,
                    change: function() {
                        that.trigger("change");
                    }
                });
                that.element.keydown(function(e) {
                    if (e.keyCode === kendo.keys.SPACEBAR) {
                        var current = that.navigatable.current;

                        if (!multi || !e.ctrlKey) {
                            that.selectable.clear();
                        }
                        that.selectable.value(cell ? current : current.parent());
                    }
                });
            }
        },
        _navigation: function() {
            var that = this;

            that.navigatable = new Navigatable(that.element, {
                filter: FOCUSSELECTOR,
                home: function(element) {
                    return element.find("td:first");
                },
                down: function(element, current) {
                    return current ? current.parent().next().children().eq(current.index()) : element.find("td:first");
                },
                left: function(element, current) {
                    return current.prev();
                },
                right: function(element, current) {
                    return current.next();
                },
                up: function(element, current) {
                    return current.parent().prev().children().eq(current.index());
                }
            });
            if(that.options.pageable) {
                that.element.keydown(function(e) {
                    if (e.keyCode === kendo.keys.PAGEUP) {
                        that.navigatable.clear();
                        that.dataSource.page(that.dataSource.page() + 1);
                    } else if (e.keyCode === kendo.keys.PAGEDOWN) {
                        that.navigatable.clear();
                        that.dataSource.page(that.dataSource.page() - 1);
                    }
                });
            }
        },
        _wrapper: function() {
            var that = this,
                table = that.table,
                wrapper;

            wrapper = table.parent();

            if (!wrapper.is("div")) {
               wrapper = table.wrap("<div />").parent();
            }

            that.wrapper = wrapper.addClass("t-grid t-widget");
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

        _dataSource: function() {
            var that = this,
                options = that.options,
                dataSource = options.dataSource;

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

            that.dataSource = DataSource.create(dataSource);
            that.dataSource.bind("change", $.proxy(that.refresh, that));
        },

        _pager: function() {
            var that = this,
                wrapper,
                pageable = that.options.pageable;

            if (pageable) {
                wrapper = that.wrapper.children("div.t-grid-pager");

                if (!wrapper.length) {
                    wrapper = $('<div class="t-grid-pager"><ul /></div>').appendTo(that.wrapper);
                }

                that.pager = pageable instanceof kendo.ui.Pager ? pageable : new kendo.ui.Pager(wrapper.children("ul"), extend({}, pageable, { dataSource: that.dataSource }));
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
                column = typeof column === "string" ? { field: column } : column;
                return {
                    field: column.field,
                    template: column.template,
                    title: column.title
                }
            });
        },

        _tmpl: function(start, rowTemplate) {
            var that = this,
                settings = extend({}, kendo.Template, that.options.templateSettings);

            if (!$.isFunction(rowTemplate)) {

                if (!rowTemplate) {
                    rowTemplate = start;

                    $.each(that.columns, function() {
                        var column = this,
                            value = column.template ? column.template :
                                   settings.begin + "=" + (settings.useWithBlock ? "" : settings.paramName + ".") + column.field + settings.end;

                        rowTemplate += "<td>" + value + "</td>";
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

            if (!thead[0]) {
                thead = $("<thead/>").insertBefore(that.tbody);
            }

            tr = that.table.find("tr:has(th)");

            if (!tr[0]) {
                tr = thead.children().first();
                if(!tr[0]) {
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

            tr.appendTo(thead);

            that.thead = thead;

            that._sortable();
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
       }
    }

    ui.plugin("Grid", Grid, Component);
})(jQuery, window);
