(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        proxy = $.proxy,
        extend = $.extend,
        grep = $.grep,
        map = $.map,
        ACTIVE = "k-state-active",
        ASC = "asc",
        DESC = "desc",
        CLICK = "click",
        CHANGE = "change",
        POPUP = "kendoPopup",
        FILTERMENU = "kendoFilterMenu",
        MENU = "kendoMenu",
        Widget = ui.Widget;

    var messages = {
        sort: {
            asc: "Sort Ascending",
            desc: "Sort Descending"
        },
        filter: "Filter",
        columns: "Columns"
    };

    var ColumnMenu = Widget.extend({
        init: function(element, options) {
            var that = this,
                link;

            Widget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;
            that.columns = options.columns;
            that._mergeOptions(messages);

            that.field = element.attr(kendo.attr("field"));
            link = element.find(".k-header-column-menu");
            if (!link[0]) {
                link = element.prepend('<a class="k-header-column-menu" href="#"><span class="k-icon k-menu"/></a>').find(".k-header-column-menu");
            }
            that._clickHandler = proxy(that._click, that);
            link.click(that._clickHandler);
            that.link = link;

            that.wrapper = $('<div class="k-column-menu"/>');
            that.wrapper.html(kendo.template(template)({
                ns: kendo.ns,
                messages: options.messages,
                columns: that.columns()
            }));

            that.popup = that.wrapper[POPUP]({
                anchor: link,
                open: proxy(that._open, that)
            }).data(POPUP);

            that._menu();

            that._sort();

            that._columns();

            that._filter();
        },

        options: {
            name: "ColumnMenu",
            messages: messages,
            sortable: true,
            filterable: true
        },

        events: [ CHANGE ],

        _mergeOptions: function(defaults) {
            var options =  this.options.messages;

            if (options.sort === true) {
                options.sort = defaults.sort;
            }

            if (options.filter === true) {
                options.filter = defaults.filter;
            }

            if (options.columns === true) {
                options.columns = defaults.columns;
            }

            this.options.messages = options;
        },

        destroy: function() {
            var that = this;

            if (that.filterMenu) {
                that.filterMenu.destroy();
                that.filterMenu = null;
            }

            that.wrapper.children().removeData(MENU);
            that.wrapper.removeData(POPUP).remove();
            that.link.unbind(CLICK, that._clickHandler);
            that.element.removeData("kendoColumnMenu");
            that.columns = null;
        },

        _click: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.popup.toggle();
        },

        _open: function() {
            $(".k-column-menu").not(this.wrapper).each(function() {
                $(this).data(POPUP).close();
            });
        },

        _menu: function() {
            var dropdown = "[" + kendo.attr("role") + "=dropdownlist]",
                datepicker = "[" + kendo.attr("role") + "=datepicker]";

            this.menu = this.wrapper.children()[MENU]({
                orientation: "vertical",
                openOnClick: true,
                close: function(e) {
                    var item = $(e.item);
                    if (item.hasClass("k-filter-item")) {
                        item.find(dropdown).kendoDropDownList("close");
                        item.find(datepicker).kendoDatePicker("close");
                    }
                }
            }).data(MENU);
        },

        _sort: function() {
            var that = this;

            that.options.dataSource.bind(CHANGE, proxy(that.refresh, that));

            that.menu.element.delegate(".k-sort-asc, .k-sort-desc", CLICK, function() {
                var item = $(this),
                    dir = item.hasClass("k-sort-asc") ? ASC : DESC;

                item.parent().find(".k-sort-" + (dir == ASC ? DESC : ASC)).removeClass(ACTIVE);

                that._sortDataSource(item, dir);
            });
        },

        _sortDataSource: function(item, dir) {
            var that = this,
                sortable = that.options.sortable,
                dataSource = that.options.dataSource,
                idx,
                length,
                sort = dataSource.sort() || [];

            if (item.hasClass(ACTIVE) && sortable && sortable.allowUnsort !== false) {
                item.removeClass(ACTIVE);
                dir = undefined;
            } else {
                item.addClass(ACTIVE);
            }

            if (sortable === true || sortable.mode === "single") {
                sort = [ { field: that.field, dir: dir } ];
            } else {
                for (idx = 0, length = sort.length; idx < length; idx++) {
                    if (sort[idx].field === that.field) {
                        sort.splice(idx, 1);
                        break;
                    }
                }
                sort.push({ field: that.field, dir: dir });
            }

            dataSource.sort(sort);
        },

        _columns: function() {
            var that = this;

            that.menu.bind("open", function() {
                var visible = grep(that.columns(), function(field) {
                        return !field.hidden;
                    });

                var selector = map(visible, function(field) {
                    return "[" + kendo.attr("field") + "=" + field.field + "]";
                }).join(",");

                that.wrapper.find(selector).attr("checked", true).attr("disabled", visible.length == 1);
            });

            that.wrapper.delegate("[type=checkbox]", CHANGE , function(e) {
                var input = $(this),
                    args = {
                        field: input.attr(kendo.attr("field")),
                        hidden: true
                    };

                if (input.is(":checked")) {
                    args.hidden = false;
                }

                that.trigger(CHANGE, args);

                //that.menu.close(that.menu.element);
                //that.popup.close();
            });
        },

        _filter: function() {
            var that = this,
                options = that.options;

            if (options.filterable !== false) {
                that.filterMenu = that.wrapper.find(".k-filterable")[FILTERMENU](
                    extend(true, {}, {
                        appendToElement: true,
                        dataSource: options.dataSource,
                        values: options.values,
                        field: that.field
                    },
                    options.filterable)
                ).data(FILTERMENU);
            }
        },

        refresh: function() {
            var that = this,
                sort = that.options.dataSource.sort() || [],
                descriptor,
                field = that.field,
                idx,
                length;

            that.wrapper.find(".k-sort-asc, .k-sort-desc").removeClass(ACTIVE);

            for (idx = 0, length = sort.length; idx < length; idx++) {
               descriptor = sort[idx];

               if (field == descriptor.field) {
                   that.wrapper.find(".k-sort-" + descriptor.dir).addClass(ACTIVE);
               }
            }
        }
    });

    var template = '<ul>'+
                    '#if(messages.sort){#'+
                        '<li class="k-item k-sort-asc"><span class="k-link"><span class="k-sprite historyIcon"></span>${messages.sort.asc}</span></li>'+
                        '<li class="k-item k-sort-desc"><span class="k-link"><span class="k-sprite historyIcon"></span>${messages.sort.desc}</span></li>'+
                        '#if(messages.columns || messages.filter){#'+
                            '<li class="k-separator"></li>'+
                        '#}#'+
                    '#}#'+
                    '#if(messages.columns){#'+
                        '<li class="k-item k-columns-item"><span class="k-link"><span class="k-sprite historyIcon"></span>${messages.columns}</span><ul>'+
                        '#for (var col in columns) {#'+
                            '<li><label><input type="checkbox" data-#=ns#field="#=columns[col].field#"/>#=columns[col].title#</label></li>'+
                        '#}#'+
                        '</ul></li>'+
                        '#if(messages.filter){#'+
                            '<li class="k-separator"></li>'+
                        '#}#'+
                    '#}#'+
                    '#if(messages.filter){#'+
                        '<li class="k-item k-filter-item"><span class="k-link"><span class="k-sprite historyIcon"></span>${messages.filter}</span><ul>'+
                            '<li><div class="k-filterable"></div></li>'+
                        '</ul></li>'+
                    '#}#'+
                    '</ul>';

    ui.plugin(ColumnMenu);
})(jQuery);
