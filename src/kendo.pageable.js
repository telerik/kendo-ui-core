(function($, undefined) {
    var kendo = window.kendo,
        Component = kendo.ui.Component,
        proxy = $.proxy;

    var Pageable = Component.extend( {
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            options = that.options;
            that.dataSource = options.dataSource;
            that.linkTemplate = kendo.template(that.options.linkTemplate);
            that.selectTemplate = kendo.template(that.options.selectTemplate);

            that.dataSource.bind("change", proxy(that.refresh, that));
            that.list = $('<ul class="k-pager k-reset k-numeric" />').appendTo(that.element).html(that.selectTemplate({ text: 1 }));
            that.element.delegate("a", "click",  proxy(that._click, that));
        },

        options: {
            selectTemplate: '<li><span class="k-state-active"><#= text #></span></li>',
            linkTemplate: '<li><a href="#" class="k-link" data-page="<#= idx #>"><#= text #></a></li>',
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

            that.list.empty().append(html);
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

    kendo.ui.plugin("Pageable", Pageable);
})(jQuery);
