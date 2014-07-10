(function(f, define){
    define([ "./kendo.autocomplete", "./kendo.datepicker", "./kendo.numerictextbox", "./kendo.combobox", "./kendo.dropdownlist" ], f);
})(function(){

var __meta__ = {
    id: "filtercell",
    name: "Row filter",
    category: "framework",
    depends: [ "autocomplete" ],
    advanced: true
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        Widget = ui.Widget,
        CHANGE = "change",
        BOOL = "boolean",
        ENUM = "enums",
        STRING = "string",
        NS = ".kendoFilterCell",
        EQ = "Is equal to",
        NEQ = "Is not equal to",
        proxy = $.proxy;

    function findFilterForField(filter, field) {
        var filters = [];
        if ($.isPlainObject(filter)) {
            if (filter.hasOwnProperty("filters")) {
                filters = filter.filters;
            } else if(filter.field == field) {
                return filter;
            }
        }
        if (($.isArray(filter))) {
           filters = filter;
        }

        for (var i = 0; i < filters.length; i++) {
          var result = findFilterForField(filters[i], field);
          if (result) {
             return result;
          }
        }
    }

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

    function removeDuplicates (dataSelector, dataTextField) {
        return function(e) {
            var items = dataSelector(e),
                result = [],
                index = 0,
                seen = {};

            while (index < items.length) {
                var item = items[index++],
                    text = item[dataTextField];
                if(!seen.hasOwnProperty(text)){
                    result.push(item);
                    seen[text] = true;
                }
            }

            return result;
        };
    }

    var FilterCell = Widget.extend( {
        init: function(element, options) {
            element = $(element).addClass("grid-filter-header");
            var wrapper = this.wrapper = $("<span/>").appendTo(element);
            var that = this,
                dataSource,
                suggestDataSource,
                viewModel,
                type,
                operators = that.operators = options.operators || {},
                input = that.input = $("<input/>")
                    .attr(kendo.attr("bind"), "value: value")
                    .appendTo(wrapper);

            Widget.fn.init.call(that, element[0], options);
            options = that.options;
            dataSource = that.dataSource = options.dataSource;

            //gets the type from the dataSource or sets default to string
            that.model = dataSource.options.schema.model;
            type = options.type = kendo.getter("options.schema.model.fields['" + options.field + "'].type", true)(dataSource) || STRING;
            if (options.values) {
                options.type = type = ENUM;
            }

            operators = operators[type] || options.operators[type];

            that._parse = function(value) {
                 return value + "";
            };

            if (that.model && that.model.fields) {
                var field = that.model.fields[options.field];

                if (field) {
                    if (field.parse) {
                        that._parse = proxy(field.parse, field);
                    }
                }
            }

            that.viewModel = viewModel = kendo.observable({
                operator: options.operator,
                value: null,
                operatorVisible: function() {
                    var val = this.get("value");
                    return  val !== null && val !== undefined && val != "undefined";
                }
            });
            viewModel.bind(CHANGE, proxy(that.updateDsFilter, that));

            that._setInputType(options, type);

            if (type != BOOL && options.showOperators !== false) {
                that._createOperatorDropDown(operators);
            }

            that._createClearIcon();

            kendo.bind(this.wrapper, viewModel);

            if (type == STRING) {
                suggestDataSource = that.suggestDataSource = options.suggestDataSource;

                if (!(suggestDataSource instanceof DataSource)) {
                    suggestDataSource =
                        that.suggestDataSource =
                            DataSource.create($.extend(suggestDataSource, { group: [] }));
                }

                that.setSuggestDataSource(suggestDataSource);
            }

            if (type == ENUM) {
                that.setComboBoxSource(that.options.values);
            }

            that._refreshUI();

            that._refreshHandler = proxy(that._refreshUI, that);

            that.dataSource.bind(CHANGE, that._refreshHandler);

        },

        _setInputType: function(options, type) {
            var that = this,
                input = that.input;

            if (typeof (options.template) == "function") {
                options.template.call(that.viewModel, that.input);
            } else if (type == STRING) {
                input.attr(kendo.attr("role"), "autocomplete")
                        .attr(kendo.attr("text-field"), that.options.dataTextField || that.options.field)
                        .attr(kendo.attr("delay"), this.options.delay)
                        .attr(kendo.attr("value-primitive"), true);
            } else if (type == "date") {
                input.attr(kendo.attr("role"), "datepicker");
            } else if (type == BOOL) {
                var wrapper = this.wrapper;
                var inputName = kendo.guid();

                var labelTrue = $("<label/>").text(this.options.messages.isTrue).append(input);
                input.attr(kendo.attr("bind"), "checked:value")
                    .attr("name", inputName)
                    .val("true")
                    .attr("type", "radio");

                var labelFalse = labelTrue.clone().text(this.options.messages.isFalse);
                        input.clone().val("false").appendTo(labelFalse);
                wrapper.append([labelTrue, labelFalse]);

            } else if (type == "number") {
                input.attr(kendo.attr("role"), "numerictextbox");
            } else if (type == ENUM) {
                input.attr(kendo.attr("role"), "combobox")
                        .attr(kendo.attr("text-field"), "text")
                        .attr(kendo.attr("suggest"), true)
                        .attr(kendo.attr("filter"), "contains")
                        .attr(kendo.attr("value-field"), "value")
                        .attr(kendo.attr("value-primitive"), true);
            }
        },

        _createOperatorDropDown: function(operators) {
            var items = [];
            for (var prop in operators) {
                items.push({
                    text: operators[prop],
                    value: prop
                });
            }
            var dropdown = $('<input style="width:24px" ' + kendo.attr("bind") + '="value: operator"/>').appendTo(this.wrapper);
            this.operatorDropDown = dropdown.kendoDropDownList({
                dataSource: items,
                dataTextField: "text",
                dataValueField: "value",
                open: function() {
                    //TODO calc this
                    this.popup.element.width(150);
                },
                valuePrimitive: true
            }).data("kendoDropDownList");

            this.operatorDropDown.wrapper.find(".k-i-arrow-s").removeClass("k-i-arrow-s").addClass("k-filter");
        },

        setSuggestDataSource: function(dataSource) {
            if (!this.options.customDataSource) {
                dataSource._pageSize = undefined;
                dataSource.reader.data = removeDuplicates(dataSource.reader.data, this.options.field);
            }
            this.suggestDataSource = dataSource;
            var autoComplete = this.input.data("kendoAutoComplete");
            if (autoComplete) {
                autoComplete.setDataSource(dataSource);
            }
        },

        setComboBoxSource: function(values) {
            var dataSource = DataSource.create({
                data: values
            });
            var comboBox = this.input.data("kendoComboBox");
            if (comboBox) {
                comboBox.setDataSource(dataSource);
            }
        },

        _refreshUI: function(e) {
            var that = this,
                filter = findFilterForField(that.dataSource.filter(), this.options.field) || {},
                viewModel = that.viewModel;

            that.manuallyUpdatingVM = true;

            //MVVM check binding does not update the UI when changing the value to null/undefined
            if (that.options.type == BOOL) {
                filter.value = filter.value + "";
                that.wrapper.find(":radio").prop("checked", false);
            }

            if (filter.operator) {
                viewModel.set("operator", filter.operator);
            }
            viewModel.set("value", filter.value);
            that.manuallyUpdatingVM = false;
        },

        updateDsFilter: function(e) {
            var that = this,
                model = that.viewModel;

            if (that.manuallyUpdatingVM) {
                return;
            }

            var currentFilter = $.extend({}, that.viewModel.toJSON(), { field: that.options.field });

            var expression = {
                logic: "and",
                filters: []
            };
            if (currentFilter.value !== undefined && currentFilter.value !== null) {
                expression.filters.push(currentFilter);
            }
            var mergeResult = that._merge(expression);
            if (mergeResult.filters.length) {
                that.dataSource.filter(mergeResult);
            } else {
                that.dataSource.filter({});
            }
        },

        _merge: function(expression) {
            var that = this,
                logic = expression.logic || "and",
                filters = expression.filters,
                filter,
                result = that.dataSource.filter() || { filters:[], logic: "and" },
                idx,
                length;

            removeFiltersForField(result, that.options.field);

            for (idx = 0, length = filters.length; idx < length; idx++) {
                filter = filters[idx];
                filter.value = that._parse(filter.value);
            }

            filters = $.grep(filters, function(filter) {
                return filter.value !== "" && filter.value !== null;
            });

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

        _createClearIcon: function() {
            var that = this;

            $("<button type='button' class='k-button k-button-icon'/>")
                .attr(kendo.attr("bind"), "visible:operatorVisible")
                .html("<span class='k-icon k-i-close'/>")
                .click(proxy(that.clearFilter, that))
                .appendTo(that.wrapper);
        },

        clearFilter: function() {
            this.viewModel.set("value", null);
        },

        destroy: function() {
            var that = this;

            that.filterModel = null;

            Widget.fn.destroy.call(that);

            kendo.destroy(that.element);
        },

        events: [
            CHANGE
        ],

        options: {
            name: "FilterCell",
            delay: 200,
            values: undefined,
            customDataSource: false,
            field: "",
            dataTextField: "",
            type: "string",
            suggestDataSource: null,
            operator: "eq",
            showOperators: true,
            template: null,
            messages: {
                isTrue: "is true",
                isFalse: "is false",
                filter: "Filter",
                clear: "Clear",
                operator: "Operator"
            },
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
            }
        }
    });

    ui.plugin(FilterCell);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
