(function($, window) {
    var kendo = window.kendo;

    function Pager(element, options) {
        var that = this;
        that.element = element;
        that.wrapper = $(element);
        that.dataSource = options.dataSource;
        that.dataSource.bind("kendo:change", $.proxy(that.render, that));
        that.wrapper.delegate("a:not(.currentPage)", "click",  $.proxy(that.pageClick, that));
    }

    Pager.prototype = {
        render: function() {
            var that = this,
                dataSource = that.dataSource,
                total = dataSource.total(),
                idx,
                html;

            that.pageSize = dataSource.pageSize() || 0,
            that.page = dataSource.page() || 0;
            that.totalPages = Math.ceil(total/that.pageSize);

            for(idx = 1, pages = that.totalPages; idx <= pages; idx++) {
                html += '<li><a href="#"' + (idx == that.page ? 'class="currentPage"' : '') + ' data-index="' + idx + '"><span>Page</span>' + idx + '</a></li>';
            }

            that.wrapper.empty().append(html);
        },
        pageClick: function(ev) {
            var index = $(ev.currentTarget).data("index");
            ev.preventDefault();

            this.dataSource.page(index);

            this.wrapper.trigger("kendo:change", [index]);
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
