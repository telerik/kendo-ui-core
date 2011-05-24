(function($, window) {
    var kendo = window.kendo
        Component = kendo.ui.Component,
        proxy = $.proxy;

    var Pager = Component.extend( {
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            that.dataSource = options.dataSource;
            that.options = $.extend({}, that.options, options);
            that.linkTemplate = kendo.template(that.options.linkTemplate);
            that.selectTemplate = kendo.template(that.options.selectTemplate);

            that.dataSource.bind("change", proxy(that.refresh, that));
            that.element.delegate("a:not(.currentPage)", "click",  proxy(that._click, that));
        },

        options: {
            selectTemplate: '<li><a href="#" class="currentPage"><span>Page </span><%=text %></a></li>',
            linkTemplate: '<li><a href="#" data-page="<%=idx %>"><%= isNum ? "<span>Page </span>" : "" %><%=text %></a></li>',
            buttonCount: 10
        },

        refresh: function() {
            var that = this,
                idx,
                end,
                start = 1,
                html = "",
                reminder,
                page = that.page(),
                totalPages = that.totalPages(),
                buttonCount = that.options.buttonCount;

            if (page > buttonCount) {
                reminder = (page % buttonCount);

                start = (reminder == 0) ? (page - buttonCount) + 1 : (page - reminder) + 1;
            }

            end = Math.min((start + buttonCount) - 1, totalPages);

            if(start > 1) {
                html += that.linkTemplate({idx: (start - 1), text: "...", isNum: false });
            }

            for(idx = start; idx <= end; idx++) {
                html += (idx == page) ? that.selectTemplate({ text: idx }) : that.linkTemplate( { idx: idx, text: idx, isNum: true});
            }

            if(end < totalPages) {
                html += that.linkTemplate({idx: idx, text: "...", isNum: false });
            }

            that.element.empty().append(html);
        },

        _click: function(e) {
            var page = $(e.currentTarget).data("page");
            e.preventDefault();

            this.dataSource.page(page);

            this.trigger("change", { index: page });
        },

        totalPages: function() {
            return Math.ceil((this.dataSource.total() || 0) / this.pageSize());
        },

        pageSize: function() {
            return this.dataSource.pageSize() || this.dataSource.total();
        },

        page: function() {
            return this.dataSource.page() || 1;
        }
    });

    kendo.ui.plugin("Pager", Pager);
})(jQuery, window);
