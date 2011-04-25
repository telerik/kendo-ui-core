(function($, window, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        tbodySupportsInnerHtml = kendo.support.tbodyInnerHtml,
        Component = ui.Component,
        extend = $.extend;

    function Grid(element, options) {
        var that = this,
            dataSource,
            table;

        options = $.isArray(options) ? { data: options } : options;

        Component.call(that, element, options);

        that.table = table = that.element;

        that._columns();

        extend(that.options.dataSource, { table: table, columns: that.columns } );

        that.dataSource = dataSource = DataSource.create(that.options);

        that.tbody = table.find(">tbody");

        if (!that.tbody.length) {
            that.tbody = $("<tbody />").appendTo(table);
        }

        that.wrapper = table.parent();

        if (!that.wrapper.is("div.t-grid")) {
           that.wrapper = table.wrap($('<div class="t-grid t-widget" />')).parent();
        }

        that._sortable();

        that._templates();

        that._pager();

        dataSource.bind("change", $.proxy(that.refresh, that));
        dataSource.read();
    }

    Grid.prototype = {
        options: {
            columns: [],
            dataSource: {}
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
                this.table.find("th").kendoSortable(extend({}, sortable, { dataSource: that.dataSource }));
            }
        },

        _columns: function() {
            var columns = this.options.columns;

            // using HTML5 data attributes as a configuration option e.g. <th data-field="foo">Foo</foo>
            columns = columns.length ? columns : $.map(this.table.find("th"), function(th) {
                return {
                    field: $(th).data("field"),
                    template: $(th).data("template")
                };
            });

            this.columns = $.map(columns, function(column) {
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

        refresh: function() {
            var that = this,
                length,
                idx,
                html = "",
                data = that.dataSource.view(),
                tbody,
                placeholder,
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
