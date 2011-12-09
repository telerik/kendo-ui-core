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

    function extendObject(object) {
        var field, member;

        for (field in object) {
            member = object[field];

            if ($.isPlainObject(member)) {
                object[field] = extendObject(member);
            } else if ($.isArray(member)) {
                object[field] = extendArray(member);
            }
        }

        object._events = {};
        object.bind = Observable.fn.bind;
        object.trigger = Observable.fn.trigger;

        object.set = function(field, value) {
            this[field] = value;

            this.trigger(CHANGE, {
                field: field
            });
        }

        return object;
    }

    var innerText = (function() {
        var a = document.createElement("a");

        if (a.textContent !== undefined) {
            return "textContent";
        }

        return "innerText";
    })();

    function templateFor(element) {
        var templateId = element.getAttribute("data-template"),
            template = "<option>${data}</option>",
            templateElement;

        if (templateId) {
            templateElement = document.getElementById(templateId);

            if (templateElement) {
                template = templateElement[innerText];
            }
        }

        return template;
    }

    var bindings = {
        text: function(element, value) {
            element[innerText] = value;
        },
        html: function(element, value) {
            element.innerHTML = value;
        },
        value: function(element, value) {
            element.value = value;
        },
        source: function(element, value) {
            var template = templateFor(element);

            element.innerHTML = kendo.render(kendo.template(template), value);
        }
    };

    $.each("title alt src href".split(" "), function(index, attr) {
        bindings[attr] = function(element, value) {
            element.setAttribute(attr, value);
        }
    });

    $.each("click change".split(" "), function(index, eventName) {
        bindings[eventName] = function(element, value) {
            $(element).bind(eventName, $.proxy(value, this));
        }
    });

    function observe(element, object, field, binding) {
        object.bind("change", function(e) {
            if (e.field === field) {
                binding(element, object[field]);
            }
        });
    }

    function bindElement(element, object) {
        var field;

        for (binding in kendo.bindings) {
            field = element.getAttribute("data-" + binding);

            if (field) {
                binding = $.proxy(kendo.bindings[binding], object);

                binding(element, object[field]);

                observe(element, object, field, binding);
            }
        }
    }

    function bindChildren(element, object) {
        var idx, length, children = element.getElementsByTagName("*");

        for (idx = 0, length = children.length; idx < length; idx++ ) {
            bindElement(children[idx], object);
        }
    }

    function bind(dom, object) {
        var idx, length;

        for (idx = 0, length = dom.length; idx < length; idx++ ) {
            bindElement(dom[idx], object);
            bindChildren(dom[idx], object);
        }
    }

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

    kendo.bindings = bindings;

    kendo.bind = function(dom, object) {
        if (object.bind === undefined) {
            object = extendObject(object);
        }

        bind(dom, object);
    }

    kendo.observable = function(object) {
        return extendObject(object);
    };
})(jQuery);
