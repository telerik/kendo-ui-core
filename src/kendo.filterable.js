(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget;

    var template =
        '<div class="k-filter-menu k-group">'+
            '<div class="k-filter-help-text">#=messages.info#</div>'+
                '<select>'+
                    '#for(var op in operators){#'+
                        '<option value="#=op#">#=operators[op]#</option>'+
                    '#}#'+
                '</select>'+
                '<input class="k-input k-autocomplete" type="text"/>'+
                '#if(extra){#'+
                    '<select>'+
                        '<option>And</option>'+
                        '<option>Or</option>'+
                    '</select>'+
                    '<select>'+
                        '#for(var op in operators){#'+
                            '<option value="#=op#">#=operators[op]#</option>'+
                        '#}#'+
                    '</select>'+
                    '<input class="k-input k-autocomplete" type="text"/>'+
                '#}#'+
            '<button class="k-button">#=messages.filter#</button><button class="k-button">#=messages.cancel#</button>'+
        '</div>';

    var Filterable = Widget.extend({
        init: function(element, options) {
            var that = this, link, type;

            Widget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            link = element.addClass("k-filterable").find("k-grid-filter");

            if (!link[0]) {
                link = element.prepend('<a class="k-grid-filter" href="#"><span class="k-icon k-filter"/></a>').find(".k-grid-filter");
            }

            that.dataSource = options.dataSource.bind("change", $.proxy(that.refresh, that));

            console.log(that.dataSource.reader.model.fields);

            that.menu = $(kendo.template(template)({
                messages: options.messages,
                extra: options.extra,
                operators: options.operators[options.type]
            }));

            that.popup = new ui.Popup(that.menu,{
                anchor: link,
                toggleTarget: link
            });

            that.menu
                .find("select")
                .kendoDropDownList();
        },

        refresh: function() {
        },

        options: {
            name: "Filterable",
            extra: true,
            type: "string",
            operators: {
                string: {
                    eq: "Is Equal To",
                    neq: "Is Not Equal To"
                }
            },
            messages: {
                info: "Show rows with value that:",
                filter: "Filter",
                cancel: "Cancel"
            }
        }
    });

    ui.plugin(Filterable);
})(jQuery)
