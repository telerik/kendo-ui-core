(function($, window, undefined) {
    var kendo = window.kendo,
        DataSource = kendo.data.DataSource,
        tbodySupportsInnerHtml = true;

    (function() {
        // Internet Explorer does not support setting the innerHTML of TBODY and TABLE elements
        var table = document.createElement("table");
        try {
            table.innerHTML = "<tr><td></td></tr>";
        } catch (e) {
            tbodySupportsInnerHtml = false;
        }
    })();

    function Grid(element, options) {
        var that = this,
            dataSource;

        options = $.isArray(options) ? { data: options } : options;
        that.options = options = $.extend({}, that.options, options);
        that.dataSource = dataSource = DataSource.create(options);
        that.element = element;
        that.table = $(element);
        that.tbody = that.table.find(">tbody");

        if (!that.tbody.length) {
            that.tbody = $("<tbody />").appendTo(element);
        }

        that._columns();

        that._templates();
        dataSource.bind("change", $.proxy(that.refresh, that));
        dataSource.query();
    }

    Grid.prototype = {
        options: {
            columns: []
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

        _templates: function() {
            var that = this,
                rowTemplate = that.options.rowTemplate,
                settings = $.extend({}, kendo.core.Template, that.options.templateSettings);

            if (!$.isFunction(rowTemplate)) {

                if (!rowTemplate) {
                    rowTemplate = "<tr>";

                    $.each(that.columns, function() {
                        var column = this,
                            value = column.template ? column.template :
                                   settings.begin + "=" + (settings.useWithBlock ? "" : settings.paramName + ".") + column.field + settings.end;

                        rowTemplate += "<td>" + value + "</td>";
                    });

                    rowTemplate += "</tr>";
                }

                rowTemplate = kendo.core.template(rowTemplate, settings);
            }

            that.rowTemplate = rowTemplate;
        },

        refresh: function() {
            var that = this,
                length,
                idx,
                html = "",
                view = that.dataSource.view(),
                tbody,
                placeholder;

            for (idx = 0, length = view.length; idx < length; idx++) {
               html += that.rowTemplate(view[idx]);
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

    $.fn.kendoGrid = function(options) {
        $(this).each(function() {
            $(this).data("kendoGrid", new Grid(this, options));
        });

        return this;
    }

    kendo.ui.Grid = Grid;
})(jQuery, window);
