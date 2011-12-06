(function ($, undefined) {
    var kendo = window.kendo,
        Observable = kendo.Observable,
        data = kendo.data,
        Model = data.Model,
        push = [].push,
        splice = [].splice,
        slice = [].slice,
        unshift = [].unshift,
        CHANGE = "change";

    function extendArray(array) {
        return $.extend(array, new Observable(), {
            push: function() {
                var index = this.length,
                    items = arguments,
                    result;

                result = push.apply(this, items);

                this.trigger(CHANGE, {
                    action: "add",
                    index: index,
                    items: items
                });

                return result;
            },

            splice: function(index, howMany, element) {
                var result = splice.apply(this, arguments);

                if (result.length) {
                    this.trigger(CHANGE, {
                        action: "remove",
                        index: index,
                        items: result
                    });
                }

                if (element) {
                    this.trigger(CHANGE, {
                        action: "add",
                        index: index,
                        items: slice.call(arguments, 2)
                    });
                }
                return result;
            },

            unshift: function() {
                var index = this.length,
                    items = arguments,
                    result;

                result = unshift.apply(this, items);

                this.trigger(CHANGE, {
                    action: "add",
                    index: 0,
                    items: items
                });

                return result;
            }
        });
    }

    var ViewModel = Observable.extend( {
        init: function(data) {
            var that = this,
                field,
                member;

            Observable.fn.init.call(that);

            for (field in data) {
                member = data[field];

                if ($.isPlainObject(member)) {
                    member = new ViewModel(member);
                } else if ($.isArray(member)) {
                    member = extendArray(member);
                }

                that[field] = member;
            }
        },

        set: function(field, value) {
            this[field] = value;

            this.trigger(CHANGE, {
                field: field
            });
        }
    });

    function bindSelect(select, model) {
        select = $(select);

        var text = select.attr(kendo.attr("text-field")),
            value = select.attr(kendo.attr("value-field")),
            source = select.attr(kendo.attr("source"));

        if (model[source]) {
            source = model[source].call(model);
        } else {
            try {
                source = eval(source);
            } catch(e) {
                return;
            }
        }

        if ($.isArray(source)) {
            select.html(kendo.render(kendo.template('<option value="${'+ value +'}">${' + text + '}</option>'), source));
        }
    }

    var ModelViewBinder = Observable.extend({
        init: function(element, model, options) {
            var that = this;

            that.element = $(element);
            that.options = options || {};

            Observable.fn.init.call(that);

            that.model = model instanceof Model ? model : new (Model.define())(model);

            that.bind([CHANGE], that.options);

            var elements = that.element.find("input,select,textarea");
            if (!elements.length) {
                elements = that.element;
            }

            elements.bind(CHANGE, $.proxy(that._change, that))
                .each(function() {
                    var mapping = that._map(this);
                    if (mapping) {
                        mapping.bindView();
                    }
                });
        },

        bindModel: function() {
            var that = this,
                valid = true;

            that.element.find("input,select,textarea")
                .each(function() {
                    var mapping = that._map(this);
                    if (mapping) {
                        return valid = mapping.bindModel();
                    }
                });

            return valid;
        },

        _change: function(e) {
            var that = this,
                mapping = that._map(e.target);

            if (mapping) {
                mapping.bindModel();
            }
        },

        _map: function(target) {
            var that = this,
                model = that.model,
                options = that.options,
                element = $(target),
                field = element.attr(kendo.attr("field")) || element.attr("name"),
                setting = options[field] || {};

            if (field) {
                return {
                    bindView: function() {
                        var value = model.get(field);

                        if (setting.format) {
                            value = setting.format(value);
                        }

                        if (target.nodeName.toLowerCase() === "select") {
                            bindSelect(target, model);
                        }

                        if (element.is(":checkbox")) {
                            element.attr("checked", value === true);
                        } else {
                            element.val(value);
                        }
                    },
                    bindModel: function() {
                        var value = element.is(":checkbox") ? element.is(":checked") : target.value,
                            values = {};

                        if (setting.parse) {
                           value = setting.parse(value);
                        }

                        values[field] = value;

                        if (!that.trigger(CHANGE, { values: values })) {
                            model.set(field, value);
                            return true;
                        }

                        return false;
                    }
                }
            }
        }
    });

    data.ModelViewBinder = ModelViewBinder;

    kendo.ViewModel = ViewModel;
})(jQuery);
