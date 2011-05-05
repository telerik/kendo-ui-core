(function($, window, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,        
        tbodySupportsInnerHtml = kendo.support.tbodyInnerHtml,
        Component = ui.Component,
        extend = $.extend,
        isPlainObject = $.isPlainObject,
        map = $.map;

    function Grid(element, options) {
        var that = this,
            dataSource,
            pageable;

        options = $.isArray(options) ? { data: options } : options;

        Component.call(that, element, options);

        that._element();

        that._columns(that.options.columns);

        that._dataSource();

        that._tbody();

        that._thead();

        that._wrapper();

        that._templates();

        that._pager();

        that.dataSource.read();

        that.element.kendoNavigatable({
            filter: ">tbody>tr>td",
            home: function(element) {
                return element.find("td:first");
            }
        });
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
                    template: column.template
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
                tr;

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
                    html += "<th>" + columns[idx].field + "</th>";
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
