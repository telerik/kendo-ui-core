(function($, window) {
    var kendo = window.kendo;

    function Pager(element, options) {
        var that = this;
        that.element = element;
        that.wrapper = $(element);
        that.dataSource = options.dataSource;
        that.buttonCount = options.buttonsCount || 10;
        that.dataSource.bind("kendo:change", $.proxy(that.render, that));
        that.wrapper.delegate("a:not(.currentPage)", "click",  $.proxy(that._click, that));
    }

    Pager.prototype = {
        render: function() {
            var that = this,
                dataSource = that.dataSource,
                total = dataSource.total(),
                idx,
                buttonCount = that.buttonCount,
                end,
                start = 1,
                html = "",
                reminder;

            that.pageSize = dataSource.pageSize() || 0,
            page = that.page = dataSource.page() || 0;
            totalPages = that.totalPages = Math.ceil(total/that.pageSize);

            if (page > buttonCount) {
                reminder = (page % buttonCount);

                start = (reminder == 0) ? (page - buttonCount) + 1 : (page - reminder) + 1;
            }

            end = Math.min((start + buttonCount) - 1, totalPages);

            if(start > 1) {
                html += '<li><a href="#" + data-page="' + (start - 1) + '">...</a></li>';
            }

            for(idx = start; idx <= end; idx++) {
                html += '<li><a href="#"' + (idx == that.page ? 'class="currentPage"' : '') + ' data-page="' + idx + '"><span>Page</span>' + idx + '</a></li>';
            }

            if(end < totalPages) {
                html += '<li><a href="#" + data-page="' + idx +'">...</a></li>';
            }
            that.wrapper.empty().append(html);
        },
        _click: function(e) {
            var page = $(e.currentTarget).data("page");
            e.preventDefault();

            this.dataSource.page(page);

            this.wrapper.trigger("kendo:change", [page]);
        }
    }

    $.fn.kendoPager = function(options) {
        $(this).each(function() {
            $(this).data("kendoPager", new Pager(this, options));
        });

        return this;
    }

    kendo.ui.Pager = Pager;

})(jQuery, window);
