(function(f, define){
    define([ "./kendo.datepicker", "./kendo.numerictextbox", "./kendo.dropdownlist" ], f);
})(function(){

var __meta__ = {
    id: "filtermenu",
    name: "Filtering Menu",
    category: "framework",
    depends: [ "datepicker", "numerictextbox", "dropdownlist" ],
    advanced: true
};

/* jshint eqnull: true */
(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        proxy = $.proxy,
        POPUP = "kendoPopup",
        INIT = "init",
        NS = ".kendoFilterMenu",
        EQ = "Is equal to",
        NEQ = "Is not equal to",
        roles = {
            "number": "numerictextbox",
            "date": "datepicker"
        },
        mobileRoles = {
            "string": "text",
            "number": "number",
            "date": "date"
        },
        isFunction = kendo.isFunction,
        Widget = ui.Widget;

    var booleanTemplate =
            '<div>' +
                '<div class="k-filter-help-text">#=messages.info#</div>'+
                '<label>'+
                    '<input type="radio" data-#=ns#bind="checked: filters[0].value" value="true" name="filters[0].value"/>' +
                    '#=messages.isTrue#' +
                '</label>' +
                '<label>'+
                    '<input type="radio" data-#=ns#bind="checked: filters[0].value" value="false" name="filters[0].value"/>' +
                    '#=messages.isFalse#' +
                '</label>' +
                '<div>' +
                '<button type="submit" class="k-button k-primary">#=messages.filter#</button>' +
                '<button type="reset" class="k-button">#=messages.clear#</button>'+
                '</div>' +
            '</div>';

    var defaultTemplate =
            '<div>' +
                '<div class="k-filter-help-text">#=messages.info#</div>'+
                '<select data-#=ns#bind="value: filters[0].operator" data-#=ns#role="dropdownlist">'+
                    '#for(var op in operators){#'+
                        '<option value="#=op#">#=operators[op]#</option>' +
                    '#}#'+
                '</select>'+
                '#if(values){#' +
                    '<select data-#=ns#bind="value:filters[0].value" data-#=ns#text-field="text" data-#=ns#value-field="value" data-#=ns#source=\'#=kendo.stringify(values).replace(/\'/g,"&\\#39;")#\' data-#=ns#role="dropdownlist" data-#=ns#option-label="#=messages.selectValue#">' +
                    '</select>' +
                '#}else{#' +
                    '<input data-#=ns#bind="value:filters[0].value" class="k-textbox" type="text" #=role ? "data-" + ns + "role=\'" + role + "\'" : ""# />'+
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
                        '<select data-#=ns#bind="value:filters[1].value" data-#=ns#text-field="text" data-#=ns#value-field="value" data-#=ns#source=\'#=kendo.stringify(values).replace(/\'/g,"&\\#39;")#\' data-#=ns#role="dropdownlist" data-#=ns#option-label="#=messages.selectValue#">' +
                        '</select>'+
                    '#}else{#' +
                        '<input data-#=ns#bind="value: filters[1].value" class="k-textbox" type="text" #=role ? "data-" + ns + "role=\'" + role + "\'" : ""#/>'+
                    '#}#' +
                '#}#'+
                '<div>'+
                '<button type="submit" class="k-button k-primary">#=messages.filter#</button>'+
                '<button type="reset" class="k-button">#=messages.clear#</button>'+
                '</div>'+
            '</div>';

        var defaultMobileTemplate =
            '<div data-#=ns#role="view" data-#=ns#init-widgets="false" class="k-grid-filter-menu">'+
                '<div data-#=ns#role="header" class="k-header">'+
                    '<button class="k-button k-cancel">#=messages.cancel#</button>'+
                    '#=field#'+
                    '<button type="submit" class="k-button k-submit">#=messages.filter#</button>'+
                '</div>'+
                '<form class="k-filter-menu k-mobile-list">'+
                    '<ul class="k-filter-help-text"><li><span class="k-link">#=messages.info#</span>'+
                    '<ul>'+
                        '<li class="k-item"><label class="k-label">#=messages.operator#'+
                            '<select data-#=ns#bind="value: filters[0].operator">'+
                                '#for(var op in operators){#'+
                                    '<option value="#=op#">#=operators[op]#</option>' +
                                '#}#'+
                            '</select>'+
                        '</label></li>' +
                        '<li class="k-item"><label class="k-label">#=messages.value#'+
                            '#if(values){#' +
                                '<select data-#=ns#bind="value:filters[0].value">'+
                                    '<option value="">#=messages.selectValue#</option>' +
                                    '#for(var val in values){#'+
                                        '<option value="#=values[val].value#">#=values[val].text#</option>' +
                                    '#}#'+
                                '</select>' +
                            '#}else{#' +
                                '<input data-#=ns#bind="value:filters[0].value" class="k-textbox" type="#=inputType#" '+
                                '#=useRole ? "data-" + ns + "role=\'" + role + "\'" : ""# />'+
                            '#}#' +
                        '</label></li>'+
                        '#if(extra){#'+
                        '</ul>'+
                        '<ul class="k-filter-help-text"><li><span class="k-link"></span>'+
                            '<li class="k-item"><label class="k-label"><input type="radio" name="logic" class="k-check" data-#=ns#bind="checked: logic" value="and" />#=messages.and#</label></li>'+
                            '<li class="k-item"><label class="k-label"><input type="radio" name="logic" class="k-check" data-#=ns#bind="checked: logic" value="or" />#=messages.or#</label></li>'+
                        '</ul>'+
                        '<ul class="k-filter-help-text"><li><span class="k-link"></span>'+
                            '<li class="k-item"><label class="k-label">#=messages.operator#'+
                                '<select data-#=ns#bind="value: filters[1].operator">'+
                                    '#for(var op in operators){#'+
                                        '<option value="#=op#">#=operators[op]#</option>' +
                                    '#}#'+
                                '</select>'+
                            '</label></li>'+
                            '<li class="k-item"><label class="k-label">#=messages.value#'+
                                '#if(values){#' +
                                    '<select data-#=ns#bind="value:filters[1].value">'+
                                        '<option value="">#=messages.selectValue#</option>' +
                                        '#for(var val in values){#'+
                                            '<option value="#=values[val].value#">#=values[val].text#</option>' +
                                        '#}#'+
                                    '</select>' +
                                '#}else{#' +
                                    '<input data-#=ns#bind="value:filters[1].value" class="k-textbox" type="#=inputType#" '+
                                    '#=useRole ? "data-" + ns + "role=\'" + role + "\'" : ""# />'+
                                '#}#' +
                            '</label></li>'+
                        '#}#'+
                        '</ul>'+
                        '</li><li class="k-button-container">' +
                            '<button type="reset" class="k-button">#=messages.clear#</button>'+
                        '</li></ul>' +
                    '</div>'+
                '</form>'+
            '</div>';

    var booleanMobileTemplate =
            '<div data-#=ns#role="view" data-#=ns#init-widgets="false" class="k-grid-filter-menu">'+
                '<div data-#=ns#role="header" class="k-header">'+
                    '<button class="k-button k-cancel">#=messages.cancel#</button>'+
                    '#=field#'+
                    '<button type="submit" class="k-button k-submit">#=messages.filter#</button>'+
                '</div>'+
                '<form class="k-filter-menu k-mobile-list">'+
                    '<ul class="k-filter-help-text"><li><span class="k-link">#=messages.info#</span>'+
                    '<ul>'+
                        '<li class="k-item"><label class="k-label">'+
                            '<input class="k-check" type="radio" data-#=ns#bind="checked: filters[0].value" value="true" name="filters[0].value"/>' +
                            '#=messages.isTrue#' +
                        '</label></li>' +
                        '<li class="k-item"><label class="k-label">'+
                            '<input class="k-check" type="radio" data-#=ns#bind="checked: filters[0].value" value="false" name="filters[0].value"/>' +
                            '#=messages.isFalse#' +
                        '</label></li>' +
                    '</ul>'+
                    '</li><li class="k-button-container">' +
                        '<button type="reset" class="k-button">#=messages.clear#</button>'+
                    '</li></ul>' +
                '</form>'+
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

    function convertItems(items) {
        var idx,
            length,
            item,
            value,
            text,
            result;

        if (items && items.length) {
            result = [];
            for (idx = 0, length = items.length; idx < length; idx++) {
                item = items[idx];
                text = item.text || item.value || item;
                value = item.value == null ? (item.text || item) : item.value;

                result[idx] = { text: text, value: value };
            }
        }
        return result;
    }


    function clearFilter(filters, field) {
        return $.grep(filters, function(expr) {
            if (expr.filters) {
                expr.filters = $.grep(expr.filters, function(nested) {
                    return nested.field != field;
                });

                return expr.filters.length;
            }
            return expr.field != field;
        });
    }

    var FilterMenu = Widget.extend({
        init: function(element, options) {
            var that = this,
                type = "string",
                operators,
                initial,
                link,
                field;

            Widget.fn.init.call(that, element, options);

            operators = that.operators = options.operators || {};

            element = that.element;
            options = that.options;

            if (!options.appendToElement) {
                link = element.addClass("k-with-icon k-filterable").find(".k-grid-filter");

                if (!link[0]) {
                    link = element.prepend('<a class="k-grid-filter" href="#"><span class="k-icon k-filter"/></a>').find(".k-grid-filter");
                }

                link.attr("tabindex", -1).on("click" + NS, proxy(that._click, that));
            }

            that.link = link || $();

            that.dataSource = options.dataSource;

            that.field = options.field || element.attr(kendo.attr("field"));

            that.model = that.dataSource.reader.model;

            that._parse = function(value) {
                 return value + "";
            };

            if (that.model && that.model.fields) {
                field = that.model.fields[that.field];

                if (field) {
                    type = field.type || "string";
                    if (field.parse) {
                        that._parse = proxy(field.parse, field);
                    }
                }
            }

            if (options.values) {
                type = "enums";
            }

            that.type = type;

            operators = operators[type] || options.operators[type];

            for (initial in operators) { // get the first operator
                break;
            }

            that._defaultFilter = function() {
                return { field: that.field, operator: initial || "eq", value: "" };
            };

            that._refreshHandler = proxy(that.refresh, that);

            that.dataSource.bind("change", that._refreshHandler);

            if (options.appendToElement) { // force creation if used in column menu
                that._init();
            } else {
                that.refresh(); //refresh if DataSource is fitered before menu is created
            }
        },

        _init: function() {
            var that = this,
                ui = that.options.ui,
                setUI = isFunction(ui),
                role;

            that.pane = that.options.pane;
            if (that.pane) {
                that._isMobile = true;
            }

            if (!setUI) {
                role = ui || roles[that.type];
            }

            if (that._isMobile) {
                that._createMobileForm(role);
            } else {
                that._createForm(role);
            }

            that.form
                .on("submit" + NS, proxy(that._submit, that))
                .on("reset" + NS, proxy(that._reset, that));

            if (setUI) {
                that.form.find(".k-textbox")
                    .removeClass("k-textbox")
                    .each(function() {
                        ui($(this));
                    });
            }

            that.form
                 .find("[" + kendo.attr("role") + "=numerictextbox]")
                 .removeClass("k-textbox")
                 .end()
                 .find("[" + kendo.attr("role") + "=datetimepicker]")
                 .removeClass("k-textbox")
                 .end()
                 .find("[" + kendo.attr("role") + "=timepicker]")
                 .removeClass("k-textbox")
                 .end()
                 .find("[" + kendo.attr("role") + "=datepicker]")
                 .removeClass("k-textbox");

            that.refresh();

            that.trigger(INIT, { field: that.field, container: that.form });
        },

        _createForm: function(role) {
            var that = this,
                options = that.options,
                operators = that.operators || {},
                type = that.type;

            operators = operators[type] || options.operators[type];

            that.form = $('<form class="k-filter-menu"/>')
                .html(kendo.template(type === "boolean" ? booleanTemplate : defaultTemplate)({
                    field: that.field,
                    format: options.format,
                    ns: kendo.ns,
                    messages: options.messages,
                    extra: options.extra,
                    operators: operators,
                    type: type,
                    role: role,
                    values: convertItems(options.values)
                }));

            if (!options.appendToElement) {
                that.popup = that.form[POPUP]({
                    anchor: that.link,
                    open: proxy(that._open, that),
                    activate: proxy(that._activate, that),
                    close: function() {
                        if (that.options.closeCallback) {
                            that.options.closeCallback(that.element);
                        }
                    }
                }).data(POPUP);
            } else {
                that.element.append(that.form);
                that.popup = that.element.closest(".k-popup").data(POPUP);
            }

            that.form
                .on("keydown" + NS, proxy(that._keydown, that));
        },

        _createMobileForm: function(role) {
            var that = this,
                options = that.options,
                operators = that.operators || {},
                type = that.type;

            operators = operators[type] || options.operators[type];

            that.form = $("<div />")
                .html(kendo.template(type === "boolean" ? booleanMobileTemplate : defaultMobileTemplate)({
                    field: that.field,
                    format: options.format,
                    ns: kendo.ns,
                    messages: options.messages,
                    extra: options.extra,
                    operators: operators,
                    type: type,
                    role: role,
                    useRole: (!kendo.support.input.date && type === "date") || type === "number",
                    inputType: mobileRoles[type],
                    values: convertItems(options.values)
                }));

            that.view = that.pane.append(that.form.html());
            that.form = that.view.element.find("form");

            that.view.element
                .on("click", ".k-submit", function(e) {
                    that.form.submit();
                    e.preventDefault();
                })
                .on("click", ".k-cancel", function(e) {
                    that._closeForm();
                    e.preventDefault();
                });
        },

        refresh: function() {
            var that = this,
                expression = that.dataSource.filter() || { filters: [], logic: "and" };

            that.filterModel = kendo.observable({
                logic: "and",
                filters: [ that._defaultFilter(), that._defaultFilter()]
            });

            if (that.form) {
                //NOTE: binding the form element directly causes weird error in IE when grid is bound through MVVM and column is sorted
                kendo.bind(that.form.children().first(), that.filterModel);
            }

            if (that._bind(expression)) {
                that.link.addClass("k-state-active");
            } else {
                that.link.removeClass("k-state-active");
            }
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            if (that.form) {
                kendo.unbind(that.form);
                kendo.destroy(that.form);
                that.form.unbind(NS);
                if (that.popup) {
                    that.popup.destroy();
                    that.popup = null;
                }
                that.form = null;
            }

            if (that.view) {
                that.view.purge();
                that.view = null;
            }

            that.link.unbind(NS);

            if (that._refreshHandler) {
                that.dataSource.unbind("change", that._refreshHandler);
                that.dataSource = null;
            }

            that.element = that.link = that._refreshHandler = that.filterModel = null;
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
                    if (!currentFilter) {
                        filterModel.filters.push({ field: that.field });
                        currentFilter = filterModel.filters[current];
                    }
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
                return filter.value !== "" && filter.value != null;
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
                    filter.filters = clearFilter(filter.filters, that.field);

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
            e.preventDefault();
            e.stopPropagation();

            this.filter(this.filterModel.toJSON());

            this._closeForm();
        },

        _reset: function() {
            this.clear();

            this._closeForm();
        },

        _closeForm: function() {
            if (this._isMobile) {
                this.pane.navigate("", this.options.animations.right);
            } else {
                this.popup.close();
            }
        },

        _click: function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (!this.popup && !this.pane) {
                this._init();
            }

            if (this._isMobile) {
                this.pane.navigate(this.view, this.options.animations.left);
            } else {
                this.popup.toggle();
            }
        },

        _open: function() {
            var popup;

            $(".k-filter-menu").not(this.form).each(function() {
                popup = $(this).data(POPUP);
                if (popup) {
                    popup.close();
                }
            });
        },

        _activate: function() {
            this.form.find(":kendoFocusable:first").focus();
        },

        _keydown: function(e) {
            if (e.keyCode == kendo.keys.ESC) {
                this.popup.close();
            }
        },

        events: [ INIT ],

        options: {
            name: "FilterMenu",
            extra: true,
            appendToElement: false,
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
                or: "Or",
                selectValue: "-Select value-",
                operator: "Operator",
                value: "Value",
                cancel: "Cancel"
            },
            animations: {
                left: "slide",
                right: "slide:right"
            }
        }
    });

    ui.plugin(FilterMenu);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
