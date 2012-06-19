(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        NUMERICTEXTBOX = "kendoNumericTextBox",
        DATEPICKER = "kendoDatePicker",
        proxy = $.proxy,
        POPUP = "kendoPopup",
        EQ = "Is equal to",
        NEQ = "Is not equal to",
        Widget = ui.Widget;

    var booleanTemplate =
            '<div>' +
                '<div class="k-filter-help-text">#=messages.info#</div>'+
                '<label>#=messages.isTrue#'+
                    '<input type="radio" data-#=ns#bind="checked: filters[0].value" value="true" name="filters[0].value"/>' +
                '</label>' +
                '<label>#=messages.isFalse#'+
                    '<input type="radio" data-#=ns#bind="checked: filters[0].value" value="false" name="filters[0].value"/>' +
                '</label>' +
                '<button type="submit" class="k-button">#=messages.filter#</button>'+
                '<button type="reset" class="k-button">#=messages.clear#</button>'+
            '</div>';

    var defaultTemplate =
            '<div>' +
                '<div class="k-filter-help-text">#=messages.info#</div>'+
                '<select data-#=ns#bind="value: filters[0].operator" data-#=ns#role="dropdownlist">'+
                    '#for(var op in operators){#'+
                        '<option value="#=op#">#=operators[op]#</option>'+
                    '#}#'+
                '</select>'+
                '#if(values){#' +
                    '<select data-#=ns#bind="value:filters[0].value" data-#=ns#role="dropdownlist" data-#=ns#option-label="#=messages.selectValue#">' +
                        '#for(var idx=0, length=values.length; idx < length; idx++){#'+
                            '#var value = values[idx].value != null ? values[idx].value : (values[idx].text || values[idx])#;'+
                            '<option value="#=value#">#=values[idx].text || values[idx].value || values[idx]#</option>'+
                        '#}#'+
                    '</select>' +
                '#}else{#' +
                    '<input data-#=ns#bind="value:filters[0].value" class="k-textbox" type="text" data-#=ns#type="#=type#"/>'+
                '#}#' +
                '#if(extra){#'+
                    '<select class="k-filter-and" data-#=ns#bind="value: logic" data-#=ns#role="dropdownlist">'+
                        '<option value="and">#=messages.and#</option>'+
                        '<option value="or">#=messages.or#</option>'+
                    '</select>'+
                    '<select data-#=ns#bind="value: filters[1].operator" data-#=ns#role="dropdownlist">'+
                        '#for(var op in operators){#'+
                            '<option value="#=op#">#=operators[op]#</option>'+
                        '#}#'+
                    '</select>'+
                    '#if(values){#' +
                        '<select data-#=ns#bind="value:filters[1].value" data-#=ns#role="dropdownlist" data-#=ns#option-label="#=messages.selectValue#">' +
                            '#for(var idx=0, length=values.length; idx < length; idx++){#'+
                                '<option value="#=values[idx].value || values[idx].text || values[idx]#">#=values[idx].text || values[idx].value || values[idx]#</option>'+
                            '#}#'+
                        '</select>' +
                    '#}else{#' +
                        '<input data-#=ns#bind="value: filters[1].value" class="k-textbox" type="text" data-#=ns#type="#=type#"/>'+
                    '#}#' +
                '#}#'+
                '<button type="submit" class="k-button">#=messages.filter#</button>'+
                '<button type="reset" class="k-button">#=messages.clear#</button>'+
            '</div>';

    function removeFiltersForField(expression, field) {
        if (expression.filters) {
            expression.filters = $.grep(expression.filters, function(filter) {
                removeFiltersForField(filter, field);
                if (filter.filters) {
                    return filter.filters.length;
                } else {
                    return filter.field != field;
                }
            });
        }
    }

    var FilterMenu = Widget.extend({
        init: function(element, options) {
            var that = this,
                type = "string",
                link,
                field,
                operators;

            Widget.fn.init.call(that, element, options);

            operators = options.operators || {};
            element = that.element;
            options = that.options;

            link = element.addClass("k-filterable").find(".k-grid-filter");

            if (!link[0]) {
                link = element.prepend('<a class="k-grid-filter" href="#"><span class="k-icon k-filter"/></a>').find(".k-grid-filter");
            }
            that._clickHandler = proxy(that._click, that);
            link.click(that._clickHandler);

            that.dataSource = options.dataSource.bind("change", proxy(that.refresh, that));

            that.field = element.attr(kendo.attr("field"));

            that.model = that.dataSource.reader.model;

            that._parse = function(value) {
                 return value + "";
            };

            if (that.model && that.model.fields) {
                field = that.model.fields[that.field];

                if (field) {
                    type = field.type || "string";
                    that._parse = proxy(field.parse, field);
                }
            }

            if (options.values) {
                type = "enums";
            }

            operators = operators[type] || options.operators[type];

            that.form = $('<form class="k-filter-menu k-group"/>');
            that.form.html(kendo.template(type === "boolean" ? booleanTemplate : defaultTemplate)({
                field: that.field,
                ns: kendo.ns,
                messages: options.messages,
                extra: options.extra,
                operators: operators,
                type: type,
                values: options.values
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
                .find("[" + kendo.attr("type") + "=number]")
                .removeClass("k-textbox")
                [NUMERICTEXTBOX]()
                .end()
                .find("[" + kendo.attr("type") + "=date]")
                .removeClass("k-textbox")
                [DATEPICKER]();


            that.refresh();
        },

        refresh: function() {
            var that = this,
                expression = that.dataSource.filter() || { filters: [], logic: "and" };

            that.filterModel = kendo.observable({
                logic: "and",
                filters: [{ field: that.field, operator: "eq", value: "" }, { field: that.field, operator: "eq", value: "" }]
            });

            kendo.bind(that.form, that.filterModel);

            if (that._bind(expression)) {
                that.link.addClass("k-state-active");
            } else {
                that.link.removeClass("k-state-active");
            }
        },

        destroy: function() {
            kendo.unbind(this.form);

            this.form.remove();

            this.form.removeData(POPUP);
            this.link.unbind("click", this._clickHandler);
            this.element.removeData("kendoFilterMenu");
        },

        _bind: function(expression) {
            var that = this,
                filters = expression.filters,
                idx,
                length,
                found = false,
                current = 0,
                filterModel = that.filterModel,
                currentFilter,
                filter;

            for (idx = 0, length = filters.length; idx < length; idx++) {
                filter = filters[idx];
                if (filter.field == that.field) {
                    filterModel.set("logic", expression.logic);

                    currentFilter = filterModel.filters[current];
                    currentFilter.set("value", that._parse(filter.value));
                    currentFilter.set("operator", filter.operator);

                    current++;
                    found = true;
                } else if (filter.filters) {
                    found = found || that._bind(filter);
                }
            }

            return found;
        },

        _merge: function(expression) {
            var that = this,
                logic = expression.logic || "and",
                filters = expression.filters,
                filter,
                result = that.dataSource.filter() || { filters:[], logic: "and" },
                idx,
                length;

            removeFiltersForField(result, that.field);

            filters = $.grep(filters, function(filter) {
                return filter.value !== "";
            });

            for (idx = 0, length = filters.length; idx < length; idx++) {
                filter = filters[idx];
                filter.value = that._parse(filter.value);
            }

            if (filters.length) {
                if (result.filters.length) {
                    expression.filters = filters;

                    if (result.logic !== "and") {
                        result.filters = [ { logic: result.logic, filters: result.filters }];
                        result.logic = "and";
                    }

                    if (filters.length > 1) {
                        result.filters.push(expression);
                    } else {
                        result.filters.push(filters[0]);
                    }
                } else {
                    result.filters = filters;
                    result.logic = logic;
                }
            }

            return result;
        },

        filter: function(expression) {
            expression = this._merge(expression);

            if (expression.filters.length) {
                this.dataSource.filter(expression);
            }
        },

        clear: function() {
            var that = this,
                expression = that.dataSource.filter() || { filters:[] };

            expression.filters = $.grep(expression.filters, function(filter) {
                if (filter.filters) {
                    filter.filters = $.grep(filter.filters, function(expr) {
                        return expr.field != that.field;
                    });

                    return filter.filters.length;
                }

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

            that.filter(that.filterModel.toJSON());

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
                    doesnotcontain: "Does not contain",
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
                },
                enums: {
                    eq: EQ,
                    neq: NEQ
                }
            },
            messages: {
                info: "Show items with value that:",
                isTrue: "is true",
                isFalse: "is false",
                filter: "Filter",
                clear: "Clear",
                and: "And",
                or: "Or"
                selectValue: "-Select value-"
            }
        }
    });

    ui.plugin(FilterMenu);
})(jQuery);
