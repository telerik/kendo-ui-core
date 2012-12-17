kendo_module({
    id: "multiselect",
    name: "MultiSelect",
    category: "web",
    description: "The MultiSelect widget allows the selection from pre-defined values.",
    depends: [ "list" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        CHANGE = "change",
        ns = ".kendoMultiSelect";

    var MultiSelect = Widget.extend({

        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that._wrapper();
            that._resultList();
            that._input();

            that.input.on("click" + ns, function() {
                that.popup.open();
            });

            that._templates();
            that._dataSource();

            that._list();
            that._popup();

            that.element.hide();

            if (that.options.autoBind) {
                that.dataSource.fetch();
            }
        },

        options: {
            name: "MultiSelect",
            autoBind: true
        },

        events: [

        ],

        destroy: function() {
            var that = this,
                ns = that.ns;

            Widget.fn.destroy.call(that);

            that._unbindDataSource();

            /*that.ul.off(ns);
            that.list.off(ns);
            that.resultList.off(ns);*/

            that.popup.destroy();

            /*if (that._form) {
                that._form.off("reset", that._resetHandler);
            }*/
        },

        refresh: function() {
            var that = this,
                data = that.dataSource.view();

            that.ul[0].innerHTML = kendo.render(that.itemTemplate, data);
        },

        _popup: function() {
            var that = this,
                list = that.list,
                options = that.options,
                wrapper = that.wrapper;

            that.popup = new ui.Popup(list, $.extend({}, options.popup, {
                anchor: wrapper,
                isRtl: kendo.support.isRtl(wrapper)
            }));
        },

        _templates: function() {
            var that = this,
                options = that.options,
                itemTemplate = options.itemTemplate,
                tagTemplate = options.tagTemplate,
                hasDataSource = options.dataSource;

            if (that.element.is("select") && that.element[0].length) {
                if (!hasDataSource) {
                    options.dataTextField = options.dataTextField || "text";
                    options.dataValueField = options.dataValueField || "value";
                }
            }

            if (!itemTemplate) {
                that.itemTemplate = kendo.template('<li tabindex="-1" role="option" unselectable="on" class="k-item">${data' + (options.dataTextField ? "." : "") + options.dataTextField + "}</li>", { useWithBlock: false });
            } else {
                itemTemplate = kendo.template(itemTemplate);
                that.itemTemplate = function(data) {
                    return '<li tabindex="-1" role="option" unselectable="on" class="k-item">' + itemTemplate(data) + "</li>";
                };
            }

            //TODO: use options.tagTemplate if defined
            that.tagTemplate = kendo.template('<li><span class="">#:data' + (options.dataTextField ? "." : "") + options.dataTextField + '#</span><span class="k-icon k-delete">delete</span></li>', { useWithBlock: false });
        },

        _unbindDataSource: function() {
            var that = this;

            that.dataSource.unbind(CHANGE, that._refreshHandler);
                           //.unbind(PROGRESS, that._progressHandler)
                           //.unbind(REQUESTEND, that._requestEndHandler);
        },

        _dataSource: function() {
            var that = this,
                element = that.element,
                options = that.options,
                dataSource = options.dataSource || {},
                idx;

            dataSource = $.isArray(dataSource) ? {data: dataSource} : dataSource;

            /*if (element.is(SELECT)) {
                idx = element[0].selectedIndex;
                if (idx > -1) {
                    options.index = idx;
                }

                dataSource.select = element;
                dataSource.fields = [{ field: options.dataTextField },
                                     { field: options.dataValueField }];
            }*/

            dataSource.select = element;
            dataSource.fields = [{ field: options.dataTextField },
                                 { field: options.dataValueField }];

            if (that.dataSource && that._refreshHandler) {
                that._unbindDataSource();
            } else {
                that._refreshHandler = $.proxy(that.refresh, that);
                //that._progressHandler = proxy(that._showBusy, that);
                //that._requestEndHandler = proxy(that._requestEnd, that);
            }

            that.dataSource = kendo.data.DataSource.create(dataSource)
                                   .bind(CHANGE, that._refreshHandler);
                                   //.bind(PROGRESS, that._progressHandler)
                                   //.bind(REQUESTEND, that._requestEndHandler);
        },

        _input: function() {
            this.input = $('<input class="k-input" style="width: 100%" />')
                            .appendTo(this._innerWraper);
        },

        _resultList: function() {
            var that = this;

            that.resultList = $('<ul unselectable="on" />')
                                .appendTo(that._innerWraper)
                                .on("click" + ns, ".k-delete", function(e) {
                                    var item = $(e.target).closest("li");
                                    $(that.ul[0].children[item.data("index")]).show();
                                    item.remove();
                                });
        },

        _click: function(e) {
            var li = $(e.currentTarget),
                data = this.dataSource.view(),
                index = li.index(),
                tag = $(this.tagTemplate(data[index]));

            this.resultList.append(tag);
            tag.data("index", index);

            li.hide();
            this.popup.close(); //TODO: create close() API
        },

        _list: function() {
            this.ul = $('<ul unselectable="on" class="k-list k-reset"/>')
                        .on("click", "li.k-item", $.proxy(this._click, this));

            this.list = $("<div class='k-list-resultList'/>")
                        .append(this.ul);
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper = element.parent("span.k-multiselect");

            if (!wrapper[0]) {
                wrapper = element.wrap('<div class="k-widget k-multiselect k-header" />').parent();
                wrapper[0].style.cssText = element[0].style.cssText;

                $('<div class="k-multiselect-wrap" />').insertBefore(element);
            }

            that.wrapper = wrapper.addClass(element[0].className)
                                  .css("display", "");

            that._innerWraper = $(wrapper[0].firstChild);
        }
    });

    ui.plugin(MultiSelect);

})(window.kendo.jQuery);
