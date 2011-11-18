(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget;

    var template =
        '<form class="k-filter-menu k-group">'+
            '<div>' +
                '<input type="hidden" name="filters[0].field" value="#=field#"/>' +
                '<input type="hidden" name="filters[1].field" value="#=field#"/>' +
                '<div class="k-filter-help-text">#=messages.info#</div>'+
                '<select name="filters[0].operator">'+
                    '#for(var op in operators){#'+
                        '<option value="#=op#">#=operators[op]#</option>'+
                    '#}#'+
                '</select>'+
                '<input name="filters[0].value" class="k-input k-autocomplete" type="text"/>'+
                '#if(extra){#'+
                    '<select name="logic">'+
                        '<option value="and">And</option>'+
                        '<option value="or">Or</option>'+
                    '</select>'+
                    '<select name="filters[1].operator">'+
                        '#for(var op in operators){#'+
                            '<option value="#=op#">#=operators[op]#</option>'+
                        '#}#'+
                    '</select>'+
                    '<input name="filters[1].value" class="k-input k-autocomplete" type="text"/>'+
                '#}#'+
                '<button type="submit" class="k-button">#=messages.filter#</button>'+
                '<button type="reset" class="k-button">#=messages.clear#</button>'+
            '</div>'+
        '</form>';

    function toObject(array) {
        var result = {},
            idx,
            length,
            name,
            members,
            member,
            value,
            interimResult,
            previousMember,
            parentResult;

        for (idx = 0, length = array.length; idx < length; idx++) {
            members = array[idx].name.split(/[\.\[\]]+/);

            members = $.grep(members, function(value){ return value });

            value = array[idx].value;

            interimResult = result;

            parentResult = result;

            for (member = 0; member < members.length - 1; member++) {
                name = members[member];

                if (!isNaN(name)) {
                    previousMember = members[member-1];

                    if (!$.isArray(parentResult[previousMember])) {
                        interimResult = parentResult[previousMember] = [];
                    }
                }

                parentResult = interimResult;

                interimResult = interimResult[name] = interimResult[name] || {};
            }

            interimResult[members[member]] = value;
        }

        return result;
    }

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

            that.field = element.data("field");

            that.model = that.dataSource.reader.model;

            type = that.model.fields[that.field].type;

            operators = operators[type] || options.operators[type];

            that.form = $(kendo.template(template)({
                field: that.field,
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

        _normalize: function(expression) {
            var that = this,
                logic = expression.logic || "and",
                filters = expression.filters,
                filter,
                result = this.dataSource.filter() || { filters:[], logic: logic },
                idx,
                field = that.model.fields[that.field],
                length;

            result.filters = $.grep(result.filters, function(filter) {
                return filter.field != that.field;
            });

            for (idx = 0, length = filters.length; idx < length; idx++) {
                filter = filters[idx];

                if (filter.value != "") {
                    filter.value = field.parse(filter.value);
                    result.filters.push(filter);
                }
            }

            return result;
        },

        filter: function(expression) {
            expression = this._normalize(expression);

            this.dataSource.filter(expression);
        },

        clear: function() {
            var that = this,
                expression = that.dataSource.filter() || { filters:[] };

            expression.filters = $.grep(expression.filters, function(filter) {
                return filter.field != that.field;
            });

            if (!expression.filters.length) {
                expression = null;
            }

            that.dataSource.filter(expression);
        },

        _submit: function(e) {
            e.preventDefault();

            this.filter(toObject(this.form.serializeArray()));

            this.popup.close();
        },

        _reset: function(e) {
            this.clear();
            this.popup.close();
        },

        options: {
            name: "Filterable",
            extra: true,
            type: "string",
            operators: {
                string: {
                    eq: "Is equal to",
                    neq: "Is not equal to",
                    startswith: "Starts with",
                    contains: "Contains",
                    endswith: "Ends with"
                },
                number: {
                    eq: "Is equal to",
                    neq: "Is not equal to",
                    gte: "Is greater than or equal to",
                    gt: "Is greater than",
                    lte: "Is less than or equal to",
                    lt: "Is less than"
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
