(function($, window) {
    var kendo = window.kendo;

    function Pager(element, options) {
        var that = this;
        that.element = element;
        that.wrapper = $(element);
        that.dataSource = options.dataSource;
        that.buttonsCount = options.buttonsCount || 10;
        that.dataSource.bind("kendo:change", $.proxy(that.render, that));
        that.wrapper.delegate("a:not(.currentPage)", "click",  $.proxy(that.pageClick, that));
    }

    Pager.prototype = {
        render: function() {
            var that = this,
                dataSource = that.dataSource,
                total = dataSource.total(),
                idx,
                numLinkSize = that.buttonsCount,
                numStart = 1,                
                html = "";

            that.pageSize = dataSource.pageSize() || 0,
            page = that.page = dataSource.page() || 0;
            totalPages = that.totalPages = Math.ceil(total/that.pageSize);

            if (page > numLinkSize) {
                var reminder = (page % numLinkSize);

                numStart = (reminder == 0) ? (page - numLinkSize) + 1 : (page - reminder) + 1;
            }

            var numEnd = Math.min((numStart + numLinkSize) - 1, totalPages);

            if(numStart > 1) {
                html += '<li><a href="#" + data-index="' + (numStart - 1) + '">...</a></li>';
            }

            for(idx = numStart; idx <= numEnd; idx++) {
                html += '<li><a href="#"' + (idx == that.page ? 'class="currentPage"' : '') + ' data-index="' + idx + '"><span>Page</span>' + idx + '</a></li>';
            }

            if(numEnd < totalPages) {
                html += '<li><a href="#" + data-index="' + idx +'">...</a></li>';
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
