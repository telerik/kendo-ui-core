(function ($, undefined) {
    var kendo = window.kendo,
        Observable = kendo.Observable,
        data = kendo.data,
        Model = data.Model,
        push = [].push,
        splice = [].splice,
        slice = [].slice,
        unshift = [].unshift,
        bound = {},
        CHANGE = "change";

    function extendArray(array) {
        var idx, length;

        for (idx = 0, length = array.length; idx < length; idx++) {
            array[idx] = extendObject(array[idx]);
        }

        array._events = {};
        array.bind = Observable.fn.bind;
        array.trigger = Observable.fn.trigger;
        array.push = function() {
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
        };

        array.splice = function(index, howMany, item) {
            var result = splice.apply(this, arguments);

            if (result.length) {
                this.trigger(CHANGE, {
                    action: "remove",
                    index: index,
                    items: result
                });
            }

            if (item) {
                this.trigger(CHANGE, {
                    action: "add",
                    index: index,
                    items: slice.call(arguments, 2)
                });
            }
            return result;
        };

        array.unshift = function() {
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
        };
    }

    function extendObject(object) {
        var field, member;

        for (field in object) {
            member = object[field];

            if ($.isPlainObject(member)) {
                extendObject(member);
            } else if ($.isArray(member)) {
                extendArray(member);

                (function(field) {
                    member.bind(CHANGE, function(e) {
                        e.field = field;
                        object.trigger(CHANGE, e);
                    });
                })(field);
            }
        }

        object._events = {};
        object.bind = Observable.fn.bind;
        object.trigger = Observable.fn.trigger;

        object.set = function(field, value, initiator) {
            var current = this[field];

            this[field] = value;

            this.trigger(CHANGE, {
                field: field,
                initiator: initiator
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

    var templates = {
        select: "<option>${data}</option>",
        table: "<tr><td>${data}</td></tr>",
        ul: "<li>${data}</li>",
        ol: "<li>${data}</li>"
    };

    function templateFor(element) {
        var templateId = element.getAttribute("data-template"),
            template = templates[element.nodeName.toLowerCase()] || "${data}",
            templateElement;

        if (templateId) {
            templateElement = document.getElementById(templateId);

            if (templateElement) {
                template = $(templateElement).html();
            }
        }

        return template;
    }

    function get(object, field) {
        if (field === "this") {
            return object;
        }

        return kendo.getter(field)(object);
    }

    var cssRegExp = /([^:]+):\s*\${([^}]*)};?/g;

    var bindings = {
        text: function(element, object, field) {
            element[innerText] = get(object, field);
        },
        html: function(element, object, field) {
            element.innerHTML = get(object, field);
        },
        value: function(element, object, field) {
            element = $(element);
            element.val(get(object, field))
                   .change(function() {
                        object.set(field, element.val(), this);
                   });
        },
        template: function(element, object) {
            if (!element.getAttribute("data-source")) {
                var template = kendo.template(templateFor(element));

                $(element).html(template(object));
            }
        },
        style: function(element, object, style) {
            element.style.cssText = style.replace(cssRegExp, function(match, css, field) {
                object.bind("change", function(e) {
                    if (e.field === field && e.initiator !== element) {
                        $(element).css(css, get(object, field));
                    }
                });

                return css + ":" + get(object, field) + ";";
            });
        },
        source: function(element, object, field, e) {
            var template = kendo.template(templateFor(element)),
                child,
                children,
                idx = 0,
                length;

            object = get(object, field);

            if (element.nodeName.toLowerCase() === "table") {
                if (!element.tBodies[0]) {
                    element.appendChild(document.createElement("tbody"))
                }
                element = element.tBodies[0];
            }

            if (e) {
                if (e.action === "add") {
                    if (element.children.length < 1) {
                        $(element).html(kendo.render(template, object));
                    } else {
                        $(element.children[e.index - 1])
                              .after(kendo.render(template, e.items));
                    }
                } else if (e.action === "remove") {
                    children = $.makeArray(element.children).splice(e.index, e.items.length);

                    for (length = children.length; idx < length; idx ++) {
                        element.removeChild(children[idx]);
                    }
                }
            } else {
                $(element).html(kendo.render(template, object));

                for (element = element.firstChild; element; element = element.nextSibling) {
                    if (element.nodeType === 1) {
                        bindElement(element, object[idx++]);
                    }
                }
            }
        }
    };

    $.each("title alt src href".split(" "), function(index, attr) {
        bindings[attr] = function(element, object, field) {
            element.setAttribute(attr, get(object, field));
        }
    });

    $.each("click change".split(" "), function(index, eventName) {
        bindings[eventName] = function(element, object, field) {
            $(element).bind(eventName, $.proxy(get(object, field), this));
        }
    });

    function observe(element, object, field, binding) {
        object.bind("change", function(e) {
            if (e.field === field && e.initiator !== element) {
                binding(element, object, field, e);
            }
        });
    }

    function bindElement(element, object) {
        var field, key, binding;

        for (key in kendo.bindings) {
            field = element.getAttribute("data-" + key);

            if (field) {
                binding = $.proxy(kendo.bindings[key], object);

                binding(element, object, field);

                if (field !== "this" && key !== "style") {
                    observe(element, object, field, binding);
                }
            }
        }

        if (!element.getAttribute("data-source")) {
            for (element = element.firstChild; element; element = element.nextSibling) {
                if (element.nodeType === 1) {
                    bindElement(element, object);
                }
            }
        }
    }

    function bind(dom, object) {
        var idx, length;

        for (idx = 0, length = dom.length; idx < length; idx++ ) {
            bindElement(dom[idx], object);
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
