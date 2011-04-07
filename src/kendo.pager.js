(function($, window) {
    var kendo = window.kendo;

    function Pager(element, options) {
        var that = this;
        that.element = element;
        that.wrapper = $(element);
        that.dataSource = options.dataSource;
        that.dataSource.bind("kendo:change", $.proxy(that.render, that));
        that.wrapper.delegate("a", "click",  $.proxy(that.pageClick, that));
    }

    Pager.prototype = {
        defaults: {
        },
        render: function() {
            var that = this,
                dataSource = that.dataSource,
                total = dataSource.total(),
                pageSize = dataSource.pageSize() || 0,
                page = dataSource.page() || 0,
                idx,
                html;

            for(idx = 1, pages = Math.ceil(total/pageSize); idx <= pages; idx++) {
                html += '<li><a href="#"' + (idx == page ? 'class="currentPage"' : '') + ' data-index="' + idx + '"><span>Page</span>' + idx + '</a></li>';
            }

            that.wrapper.empty().append(html);
        },
        pageClick: function(ev) {
            debugger;
            var index = $(ev.currentTarget).data("index");
            ev.preventDefault();

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
