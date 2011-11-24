(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DROPDOWNLIST = "kendoDropDownList",
        NUMERICTEXTBOX = "kendoNumericTextBox",
        DATEPICKER = "kendoDatePicker",
        proxy = $.proxy,
        POPUP = "kendoPopup",
        EQ = "Is equal to",
        NEQ = "Is not equal to",
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
                '<input name="filters[0].value" class="k-widget k-input k-autocomplete" type="text" data-type="#=type#"/>'+
                '#if(extra){#'+
                    '<select name="logic" class="k-filter-and">'+
                        '<option value="and">And</option>'+
                        '<option value="or">Or</option>'+
                    '</select>'+
                    '<select name="filters[1].operator">'+
                        '#for(var op in operators){#'+
                            '<option value="#=op#">#=operators[op]#</option>'+
                        '#}#'+
                    '</select>'+
                    '<input name="filters[1].value" class="k-widget k-input k-autocomplete" type="text" data-type="#=type#"/>'+
                '#}#'+
                '<button type="submit" class="k-button">#=messages.filter#</button>'+
                '<button type="reset" class="k-button">#=messages.clear#</button>'+
            '</div>'+
        '</form>';

    function value(dom, value) {
        var widget = dom.data(DROPDOWNLIST) || dom.data(NUMERICTEXTBOX) || dom.data(DATEPICKER);

        if (widget) {
            widget.value(value);
        } else {
            dom.val(value);
        }
    }

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

    var FilterMenu = Widget.extend({
        init: function(element, options) {
            var that = this,
                type,
                link,
                operators;

            Widget.fn.init.call(that, element, options);

            operators = options.operators || {};
            element = that.element;
            options = that.options;

            link = element.addClass("k-filterable").find("k-grid-filter");

            if (!link[0]) {
                link = element.prepend('<a class="k-grid-filter" href="#"><span class="k-icon k-filter"/></a>').find(".k-grid-filter");
            }

            link.click(proxy(that._click, that));

            that.dataSource = options.dataSource.bind("change", proxy(that.refresh, that));

            that.field = element.attr(kendo.attr("field"));

            that.model = that.dataSource.reader.model;

            type = that.model.fields[that.field].type;

            operators = operators[type] || options.operators[type];

            that.form = $(kendo.template(template)({
                field: that.field,
                messages: options.messages,
                extra: options.extra,
                operators: operators,
                type: type
            }));

            that.popup = that.form[POPUP]({
                anchor: link,
                open: proxy(that._open, that)
            }).data(POPUP);

            that.link = link;

            that.form
                .bind({
                    submit: proxy(that._submit, that),
                    reset: proxy(that._reset, that)
                })
                .find("select")
                [DROPDOWNLIST]()
                .end()
                .find("[data-type=number]")
                [NUMERICTEXTBOX]()
                .end()
                .find("[data-type=date]")
                [DATEPICKER]();

            that.refresh();
        },

        refresh: function() {
            var that = this,
                form = that.form,
                expression = that.dataSource.filter() || { filters: [], logic: "and" },
                filters = expression.filters,
                filter,
                idx,
                length,
                current = 0;

            for (idx = 0, length = filters.length; idx < length; idx++) {
                filter = filters[idx];
                if (filter.field == that.field) {
                    value(form.find("[name='filters[" + current + "].value']"), filter.value);
                    value(form.find("[name='filters[" + current + "].operator']"), filter.operator);
                    current++;
                }
            }

            if (current > 0) {
                value(form.find("[name=logic]"), expression.logic);
                that.link.addClass("k-state-active");
            } else {
                that.link.removeClass("k-state-active");
            }
        },

        _merge: function(expression) {
            var that = this,
                logic = expression.logic || "and",
                filters = expression.filters,
                filter,
                result = that.dataSource.filter() || { filters:[], logic: logic },
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
            this.dataSource.filter(this._merge(expression));
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
            var that = this;

            e.preventDefault();

            that.filter(toObject(that.form.serializeArray()));

            that.popup.close();
        },

        _reset: function(e) {
            this.clear();
            this.popup.close();
        },

        _click: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.popup.toggle();
        },

        _open: function() {
            $(".k-filter-menu").not(this.form).each(function() {
                $(this).data(POPUP).close();
            });
        },

        options: {
            name: "FilterMenu",
            extra: true,
            type: "string",
            operators: {
                string: {
                    eq: EQ,
                    neq: NEQ,
                    startswith: "Starts with",
                    contains: "Contains",
                    endswith: "Ends with"
                },
                number: {
                    eq: EQ,
                    neq: NEQ,
                    gte: "Is greater than or equal to",
                    gt: "Is greater than",
                    lte: "Is less than or equal to",
                    lt: "Is less than"
                },
                date: {
                    eq: EQ,
                    neq: NEQ,
                    gte: "Is after or equal to",
                    gt: "Is after",
                    lte: "Is before or equal to",
                    lt: "Is before"
                }
            },
            messages: {
                info: "Show rows with value that:",
                filter: "Filter",
                clear: "Clear"
            }
        }
    });

    ui.plugin(FilterMenu);
})(jQuery);
