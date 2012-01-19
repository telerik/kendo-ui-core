(function ($, undefined) {
    var kendo = window.kendo,
        Observable = kendo.Observable,
        ObservableObject = kendo.data.ObservableObject,
        ObservableArray = kendo.data.ObservableArray,
        data = kendo.data,
        Model = data.Model,
        push = [].push,
        splice = [].splice,
        slice = [].slice,
        unshift = [].unshift,
        toString = {}.toString,
        GET = "get",
        CHANGE = "change";

    var cssRegExp = /([^:]+):\s*\${([^}]*)};?/g;

    var Binding = kendo.Class.extend( {
        init: function(element, object, field, binding) {
            var that = this;

            that.observers = {};
            that.element = element;
            that.observable = object;
            that.field = field;

            if (binding)
                that.bind = binding;

            if (field !== "this") {
                that.observe(field);
                that.observable.bind("get", function(e) { that.observe(e.field) });
            }
        },

        observe: function(field) {
            var that = this;

            var observer = that.observers[field];

            if (observer === undefined) {
                var observer = that.createObserver(field);
                that.observable.bind(CHANGE, observer);
                that.observers[field] = observer;
            }
        },

        value: function() {
            if (this.observable instanceof kendo.data.ObservableObject) {
                var result = this.observable.get(this.field);
                if (typeof result === "function") {
                    result = result.call(this.observable);
                }
                return result;
            } else {
                return this.observable;
            }
        },

        destroy: function() {
            if (this.field !== "this") {
                for (var key in this.observers) {
                    this.observable.unbind("change", this.observers[key]);
                }
            }
        },

        createObserver: function(field) {
            var that = this;
            return function(e) {
                if (field.indexOf(e.field) === 0) {
                    if (e.action && e.action in that) {
                        that[e.action].call(that, e.index, e.items);
                    } else {
                        that.bind();
                    }
                }
            };
        }
    });

    var TextBinding = Binding.extend( {
        bind: function() {
            $(this.element).text(this.value());
        }
    });

    var HtmlBinding = Binding.extend( {
        bind: function() {
            $(this.element).html(this.value());
        }
    });

    var AttributeBinding = Binding.extend({
        bind: function() {
            $(this.element).attr(this.attribute, this.value());
        }
    });

    var TemplateBinding = Binding.extend({
        defaultTemplate: "#:data#",

        template: function() {
            var templateId = this.element.getAttribute("data-template"),
                template = this.defaultTemplate,
                templateElement;

            if (templateId) {
                templateElement = document.getElementById(templateId);

                if (templateElement) {
                    template = $(templateElement).html();
                }
            }

            return template;
        },

        bind: function() {
            if (!this.element.getAttribute("data-source")) {
                var template = kendo.template(this.template());

                $(this.element).html(template(this.observable));
            }
        }
    });

    var StyleBinding = Binding.extend( {
        bind: function() {
            var that = this;
            this.element.style.cssText = this.field.replace(cssRegExp, function(match, css, field) {
                that.observable.bind("change", function(e) {
                    if (e.field === field && e.initiator !== that.element) {
                        $(that.element).css(css, that.observable.get(field));
                    }
                });

                return css + ":" + that.observable.get(field) + ";";
            });
        }
    });

    var CheckedBinding = Binding.extend( {
        init: function() {
            var that = this;

            Binding.fn.init.apply(this, arguments);

            $(that.element).change(function() {
                var container = that.observable.get(that.field),
                    checked = $(this).is(":checked"),
                    value = this.value;

                if (container instanceof kendo.data.ObservableArray) {
                    if (!checked) {
                        container.splice(that._find(container, value), 1);
                    } else {
                        container.push(value);
                    }
                } else {
                    if (that.element.type.toLowerCase() === "radio") {
                        checked = that.element.value;
                    }
                    that.observable.set(that.field, checked, this);
                }
            });
        },

        _find: function(array, value) {
            var idx,
                length;

            for (idx = 0, length = array.length; idx < length; idx++) {
                if (array[idx] === value) {
                    return idx;
                }
            }
            return -1;
        },

        bind: function() {
            var that = this,
                idx,
                length,
                element = $(that.element),
                value = that.value();

            if (value instanceof kendo.data.ObservableArray && that._find(value, element.val()) > -1) {
                value = true;
            }
            if (element.is(":radio")) {
                if (value === element.val()) { // radio button groups will be reset when checked is set
                    element.attr("checked", true);
                }
            } else {
                element.attr("checked", value === true);
            }
        }
    });

    var ValueBinding = Binding.extend( {
        init: function() {
            var that = this;

            Binding.fn.init.apply(this, arguments);

            $(that.element).change(function() {
                that.observable.set(that.field, this.value, this);
            });
        },

        bind: function() {
           $(this.element).val(this.value());
        }
    });

    var SelectValueBinding = Binding.extend( {
        init: function() {
            var that = this;

            Binding.fn.init.apply(this, arguments);

            this._change = function() {
                that.observable.set(that.field, $.data(this.options[this.selectedIndex], "value"), this);
            };

            $(that.element).change(this._change);
        },

        destroy: function() {
            Binding.fn.destroy.call(this);

            $(this.element).unbind("change", this._change);
        },

        bind: function() {
            var that = this, element = this.element;
            var value = this.value();

            $(element)
                .find("option").filter(function() { return $.data(this, "value") === value; })
                .attr("selected", "selected");
        }
    });

    var SourceBinding = TemplateBinding.extend( {
        container: function() {
            return this.element;
        },

        add: function(index, items) {
            var element = this.element,
                observable = this.observable,
                template = kendo.template(this.template()),
                container = this.container(),
                source = this.value();

            if (container.children.length < 1) {
                $(container).html(kendo.render(template, source));
            } else {
                $(container.children[index - 1])
                .after(kendo.render(template, items));
            }
        },

        remove: function(index, items) {
            var element = this.element,
                observable = this.observable,
                template = kendo.template(this.template()),
                children,
                idx = 0,
                length,
                container = this.container(),
                source = this.value();

            children = $.makeArray(container.children).splice(index, items.length);

            for (length = children.length; idx < length; idx ++) {
                container.removeChild(children[idx]);
            }
        },

        bind: function() {
            var element = this.element,
                observable = this.observable,
                template = kendo.template(this.template()),
                child,
                children,
                idx = 0,
                length,
                container = this.container(),
                source = this.value();

            $(container).html(kendo.render(template, source));

            for (container = container.firstChild; container; container = container.nextSibling) {
                if (container.nodeType === 1) {
                    bindElement(container, source[idx]);
                    $.data(container, "value", source[idx++]);
                }
            }
        }
    });

    var TableSourceBinding = SourceBinding.extend({
        defaultTemplate:  "<tr><td>${data}</td></tr>",
        container: function() {
            var element = this.element;
            if (!element.tBodies[0]) {
                element.appendChild(document.createElement("tbody"))
            }
            return element.tBodies[0];
        }
    });

    var EventBinding = kendo.Class.extend({
        init: function(element, object, field) {
            var that = this;
            that.element = element;
            that.observable = object;
            that.field = field;
        },

        bind: function() {
            var that = this,
                callback = this.observable.get(this.field);

            $(this.element).bind(this.event, function(e) {
                if (that.preventDefault) {
                    e.preventDefault();
                }
                callback.call(that.observable, e);
            });
        }
    });

    var commonBindings = {
        title: AttributeBinding.extend({ attribute: "title" }),
        style: StyleBinding,
        click: EventBinding.extend({ event: "click", preventDefault: true })
    }

    var contentBindings = $.extend({}, commonBindings, {
        text: TextBinding,
        html: HtmlBinding,
        template: TemplateBinding,
        source: SourceBinding
    });

    var inputBindings = $.extend({}, commonBindings, {
        value: ValueBinding,
        change: EventBinding.extend({ event: "change" }),
        checked: CheckedBinding
    });

    var listBindings = $.extend({}, commonBindings, {
        source: SourceBinding.extend({defaultTemplate: "<li>${data}</li>" })
    });

    var selectBindings = $.extend({}, commonBindings, {
        source: SourceBinding.extend({defaultTemplate: "<option>${data}</option>" }),
        value: SelectValueBinding,
        change: EventBinding.extend({ event: "change" })
    });

    var optionBindings = {
        text: TextBinding,
        value: ValueBinding
    };

    var tableBindings = $.extend({}, commonBindings, {
        source: TableSourceBinding
    });

    var imgBindings = $.extend({}, commonBindings, {
        alt:    AttributeBinding.extend({ attribute: "alt" }),
        src:    AttributeBinding.extend({ attribute: "src" }),
    });

    var linkBindings = $.extend({}, commonBindings, {
        href:   AttributeBinding.extend({ attribute: "href" })
    });

    var bindings = {
        "img": imgBindings,
        "a": linkBindings,
        "input": inputBindings,
        "textarea": inputBindings,
        "select": selectBindings,
        "option": optionBindings,
        "table": tableBindings,
        "ul": listBindings,
        "ol": listBindings
    };

    function bindElement(element, object) {
        var field, key, binding;

        var elementBindings = bindings[element.nodeName.toLowerCase()] || contentBindings;

        var role = element.getAttribute("data-role");


        if (role && kendo.widgetBinders[role]) {
            $.data(element, "context", object);
            kendo.widgetBinders[role](element, object);
        } else {
            var bound= [];

            for (key in elementBindings) {
                field = element.getAttribute("data-" + key);

                if (field) {
                    binding = elementBindings[key];
                    binding = new binding(element, object, field);
                    binding.bind();

                    bound.push(binding);
                }
            }

            if (bound.length) {
                $.data(element, "bindings", bound);
                $.data(element, "context", object);
            }

            if (!element.getAttribute("data-source")) {
                for (var i = 0; i < element.children.length; i++) {
                    bindElement(element.children[i], object);
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

    kendo.bindings = bindings;

    kendo.bind = function(dom, object) {
        bind(dom, kendo.observable(object));
    }

    kendo.observable = function(object) {
        if (!(object instanceof ObservableObject)) {
            object = new ObservableObject(object);
        }

        return object;
    };
})(jQuery);
