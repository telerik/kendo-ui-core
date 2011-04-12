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

        dataSource.bind("kendo:change", $.proxy(that._dataSourceChange, that));
        dataSource.query();
    }

    Grid.prototype = {
        options: {
        },

        dataBind: function(data) {
           var count, idx, html = "";

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
       },

       _dataSourceChange: function() {
           this.dataBind(this.dataSource.view());
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
