(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget;

    var template =
        '<form class="k-filter-menu k-group">'+
            '<div class="k-filter-help-text">#=messages.info#</div>'+
                '<select name="#=field#[0].operator">'+
                    '#for(var op in operators){#'+
                        '<option value="#=op#">#=operators[op]#</option>'+
                    '#}#'+
                '</select>'+
                '<input name="#=field#[0].value" class="k-input k-autocomplete" type="text"/>'+
                '#if(extra){#'+
                    '<select name="#=field#.logic">'+
                        '<option value="and">And</option>'+
                        '<option value="or">Or</option>'+
                    '</select>'+
                    '<select name="#=field#[1].operator">'+
                        '#for(var op in operators){#'+
                            '<option value="#=op#">#=operators[op]#</option>'+
                        '#}#'+
                    '</select>'+
                    '<input name="#=field#[1].value" class="k-input k-autocomplete" type="text"/>'+
                '#}#'+
                '<button type="submit" class="k-button">#=messages.filter#</button>'+
                '<button type="reset" class="k-button">#=messages.clear#</button>'+
            '</div>'+
        '</form>';

    var Filterable = Widget.extend({
        init: function(element, options) {
            var that = this,
                link,
                type,
                operators;

            Widget.fn.init.call(that, element, options);

            operators = options.operators || {};
            element = that.element;
            options = that.options;

            link = element.addClass("k-filterable").find("k-grid-filter");

            if (!link[0]) {
                link = element.prepend('<a class="k-grid-filter" href="#"><span class="k-icon k-filter"/></a>').find(".k-grid-filter");
            }

            that.dataSource = options.dataSource.bind("change", $.proxy(that.refresh, that));

            field = element.data("field");

            type = that.dataSource.reader.model.fields[field].type;

            operators = operators[type] || options.operators[type];

            that.form = $(kendo.template(template)({
                field: field,
                messages: options.messages,
                extra: options.extra,
                operators: operators
            }));

            that.popup = new ui.Popup(that.form,{
                anchor: link,
                toggleTarget: link
            });

            that.form
                .bind({
                    submit: $.proxy(that._submit, that),
                    reset: $.proxy(that._reset, that)
                })
                .find("select")
                .kendoDropDownList();
        },

        refresh: function() {
        },

        _submit: function(e) {
            e.preventDefault();
            this.popup.close();
        },

        _reset: function(e) {
            e.preventDefault();
            this.popup.close();
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
                clear: "Clear"
            }
        }
    });

    ui.plugin(Filterable);
})(jQuery)
