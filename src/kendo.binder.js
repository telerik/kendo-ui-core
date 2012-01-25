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
            }
        },

        observe: function(field) {
            var that = this;

            var observer = that.observers[field];

            if (observer === undefined) {
                var observer = that.createObserver(field);
                that.observable.bind(0, CHANGE, observer);
                that.observers[field] = observer;
            }
        },

        value: function() {
            if (this.observable instanceof ObservableObject) {
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

        apply: function() {
            var that = this,
                handler;

            if (that.field !== "this") {
                handler = function(e) { console.log(that, e.field); that.observe(e.field) };
                that.observable.bind("get", handler);
            }

            that.bind();

            if (that.field !== "this") {
                that.observable.unbind("get", handler);
            }
        },

        createObserver: function(field) {
            var that = this;
            return function(e) {
                if (field.indexOf(e.field) === 0) {
                    if (e.action && e.action in that) {
                        that[e.action].call(that, e.index, e.items);
                    } else {
                       e.stopPropagation();
                       that.apply();
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

    var VisibleBinding = Binding.extend( {
        bind: function() {
            $(this.element).toggle(this.value());
        }
    });

    var EnableBinding = Binding.extend( {
        bind: function() {
            $(this.element).attr("disabled", this.value() !== true);
        }
    });

    var DisableBinding = Binding.extend( {
        bind: function() {
            $(this.element).attr("disabled", this.value() === true);
        }
    });

    var CheckedBinding = Binding.extend( {
        init: function() {
            var that = this;

            Binding.fn.init.apply(this, arguments);

            $(that.element).change(function() {
                var container = that.observable.get(that.field),
                    element = $(this),
                    checked = element.is(":checked"),
                    value = this.value;

                if (container instanceof kendo.data.ObservableArray) {
                    if (!checked) {
                        container.splice(container.indexOf(value), 1);
                    } else {
                        container.push(value);
                    }
                } else {
                    if (element.is(":radio")) {
                        checked = that.element.value;
                    }
                    that.observable.set(that.field, checked, this);
                }
            });
        },

        bind: function() {
            var that = this,
                element = $(that.element),
                value = that.value();

            if (value instanceof kendo.data.ObservableArray && value.indexOf(element.val()) > -1) {
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

    var WidgetValueBinding = Binding.extend( {
        init: function(widget, observable, field) {
            var that = this;

            Binding.fn.init.call(that, widget.element, observable, field);

            that.widget = widget.bind(CHANGE, $.proxy(that._change, that));
        },

        _change: function() {
            var that = this,
                widget = that.widget,
                idx,
                length,
                view = widget.dataSource.view(),
                value = that.widget.value();

            for (idx = 0, length = view.length; idx < length; idx++) {
                if (view[idx].get(widget.options.dataValueField) == value) {
                    that.observable.set(that.field, view[idx]);
                    return;
                }
            }

            that.observable.set(that.field, value);
        },

        bind: function() {
            var that = this,
                widget = that.widget,
                value = that.value();

            if (value instanceof ObservableObject) {
                value = value.get(widget.options.dataValueField);
            }

            that.widget.value(value);
        }
    });
    var SelectValueBinding = Binding.extend( {
        init: function() {
            var that = this;

            Binding.fn.init.apply(this, arguments);

            this._change = function() {
                var container = that.observable.get(that.field);
                if (container instanceof kendo.data.ObservableArray) {

                    var args = $(this).find(":selected").map(function() {
                        return $.data(this, "value");
                    }).toArray();

                    container.splice.apply(container, [0, container.length].concat(args));
                } else {
                    that.observable.set(that.field, $.data(this.options[this.selectedIndex], "value"), this);
                }
            };

           $(that.element).change(this._change);
        },

        destroy: function() {
            Binding.fn.destroy.call(this);

            $(this.element).unbind("change", this._change);
        },

        bind: function() {
            var that = this,
                element = that.element,
                value = that.value(),
                isArray = value instanceof kendo.data.ObservableArray;

            $(element)
                .find("option")
                .attr("selected", false)
                .filter(function() {
                    return isArray ? value.indexOf($.data(this, "value")) > -1 : $.data(this, "value") === value;
                })
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
        },

        apply: function() {
            this.bind();
        }
    });

    var commonBindings = {
        title: AttributeBinding.extend({ attribute: "title" }),
        style: StyleBinding,
        visible: VisibleBinding,
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
        checked: CheckedBinding,
        enabled: EnableBinding,
        disabled: DisableBinding
    });

    var listBindings = $.extend({}, commonBindings, {
        source: SourceBinding.extend({defaultTemplate: "<li>${data}</li>" })
    });

    var selectBindings = $.extend({}, commonBindings, {
        source: SourceBinding.extend({defaultTemplate: "<option>${data}</option>" }),
        value: SelectValueBinding,
        change: EventBinding.extend({ event: "change" }),
        enabled: EnableBinding,
        disabled: DisableBinding
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


        if (role && kendo.binders[role]) {
            kendo.binders[role].bind(element, object);
        } else {
            var bound= [];

            for (key in elementBindings) {
                field = element.getAttribute("data-" + key);

                if (field) {
                    binding = elementBindings[key];
                    binding = new binding(element, object, field);
                    binding.apply();

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

    function unbindElement(element) {
        var idx, bindings = $.data(element, "bindings");

        if (bindings) {
            for (idx = 0; idx < bindings.length; idx++) {
                bindings[idx].destroy();
            }
        }

        for (idx = 0; idx < element.children.length; idx++) {
            unbindElement(element.children[idx]);
        }
    }

    kendo.notify = function(widget) {
        var context = widget.element.data("context");

        if (context) {
            kendo.unbind(widget.element[0]);

            bindElement(widget.element[0], context);
        }
    }

    kendo.data.Binding = Binding;
    kendo.data.WidgetValueBinding = WidgetValueBinding;

    kendo.bindings = bindings;

    kendo.bind = function(dom, object) {
        bind($(dom), kendo.observable(object));
    }

    kendo.unbind = function(dom) {
        var idx, length;

        if (dom.length === undefined) {
            dom = [dom];
        }

        for (idx = 0, length = dom.length; idx < length; idx++ ) {
            unbindElement(dom[idx]);
        }
    }

    kendo.observable = function(object) {
        if (!(object instanceof ObservableObject)) {
            object = new ObservableObject(object);
        }

        return object;
    };
})(jQuery);
