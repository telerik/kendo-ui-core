(function($, window, undefined) {
    var kendo = window.kendo,
        DataSource = kendo.data.DataSource;

    function Grid(element, options) {
        var that = this,
            dataSource;

        that.options = options = $.extend({}, that.options, options);
        that.dataSource = dataSource = DataSource.create(options);
        that.element = element;
        that.table = $(element);
        that.tbody = that.table.find(">tbody");

        that._columns();

        that._templates();

        dataSource.bind("kendo:change", $.proxy(that.refresh, that));
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
            var rowTemplate = this.options.rowTemplate,
                settings = $.extend({}, kendo.core.Template, this.options.templateSettings);

            if (!$.isFunction(rowTemplate)) {

                if (!rowTemplate) {
                    rowTemplate = "<tr>";

                    $.each(this.columns, function() {
                        var value = this.template ? this.template :
                                       settings.begin + "=" + (settings.useWithBlock ? "" : settings.paramName + ".") + this.field + settings.end;

                        rowTemplate += "<td>" + value + "</td>";
                    });

                    rowTemplate += "</tr>";
                }

                rowTemplate = kendo.core.template(rowTemplate, settings);
            }

            this.rowTemplate = rowTemplate;
        },

        refresh: function() {
           var count, idx, html = "", data = this.dataSource.view();

           for (idx = 0, count = data.length; idx < count; idx++) {
               var dataItem = data[idx];
               html += "<tr ";
               html += "data-id='" + this.dataSource.id(dataItem);
               html += "'>";
               for (var member in dataItem) {
                    html += "<td>";
                    html += dataItem[member];
                    html += "</td>";
               }
               html += "</tr>";
           }
           this.tbody.html(html);
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
