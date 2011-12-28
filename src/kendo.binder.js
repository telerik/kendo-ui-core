(function ($, undefined) {
    var kendo = window.kendo,
        Observable = kendo.Observable,
        data = kendo.data,
        Model = data.Model,
        push = [].push,
        splice = [].splice,
        slice = [].slice,
        unshift = [].unshift,
        toString = {}.toString,
        GET = "get",
        CHANGE = "change";

    var ObservableObject = Observable.extend({
        init: function(value) {
            var that = this,
                member,
                field,
                type;

            Observable.fn.init.call(this);

            for (field in value) {
                member = value[field];
                type = toString.call(member);

                if (type === "[object Object]") {
                    member = new ObservableObject(member);

                    (function(field) {
                        member.bind(GET, function(e) {
                            e.field = field + "." + e.field;
                            that.trigger(GET, e);
                        });

                        member.bind(CHANGE, function(e) {
                            e.field = field + "." + e.field;
                            that.trigger(CHANGE, e);
                        });
                    })(field);
                } else if (type === "[object Array]") {
                    member = new ObservableArray(member);

                    (function(field) {
                        member.bind(CHANGE, function(e) {
                            e.field = field;
                            that.trigger(CHANGE, e);
                        });
                    })(field);
                }

                that[field] = member;
            }
        },

        get: function(field) {
            this.trigger(GET, { field: field });

            return get(this, field);
        },

        set: function(field, value, initiator) {
            var current = this[field];

            if (current != value) {
                set(this, field, value);

                this.trigger(CHANGE, {
                    field: field,
                    initiator: initiator
                });
            }
        }
    });

    var ObservableArray = Observable.extend({
        init: function(array) {
            var that = this,
                member,
                idx;

            Observable.fn.init.call(that);

            that.length = array.length;

            for (idx = 0; idx < that.length; idx++) {
                member = array[idx];

                if ($.isPlainObject(member)) {
                    member = new ObservableObject(member);
                }

                that[idx] = member;
            }
        },

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

        slice: slice,

        splice: function(index, howMany, item) {
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

    function set(object, field, value) {
        return kendo.setter(field)(object, value);
    }

    function get(object, field, call) {
        var result;

        if (field === "this") {
            result = object;
        } else {
            result = kendo.getter(field)(object);

            if (call && typeof result === "function") {
                result = result.call(object);
            }
        }

        return result;
    }

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
            var that = this, result;

            if (this.field === "this") {
                result = this.observable;
            } else {
                result = kendo.getter(this.field)(this.observable);

                if (typeof result === "function") {
                    result = result.call(this.observable);
                }
            }

            return result;
        },

        createObserver: function(field) {
            var that = this;
            return function(e) {
                if (field.indexOf(e.field) === 0) {
                    if (e.action) {
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
                        $(that.element).css(css, get(that.observable, field));
                    }
                });

                return css + ":" + get(that.observable, field) + ";";
            });
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
            var that = this, element = this.element;
            $(element).val(this.value())
        }
    });

    var SelectValueBinding = Binding.extend( {
        init: function() {
            var that = this;

            Binding.fn.init.apply(this, arguments);

            $(that.element).change(function() {
                that.observable.set(that.field, $.data(this.options[this.selectedIndex], "value"), this);
            });
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
                callback = get(this.observable, this.field);

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
        change: EventBinding.extend({ event: "change" })
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

    var widgetBindings = {};

    function bindElement(element, object) {
        var field, key, binding;

        var elementBindings = bindings[element.nodeName.toLowerCase()] || contentBindings;

        var role = element.getAttribute("data-role");

        if (role) {
            var widget = widgetBindings[role];
            var options = {};

            var dataSource = element.getAttribute("data-source");
            if (dataSource) {
                options.dataSource = get(object, dataSource, true);
            }

            console.log(options);

            $(element)["kendo" + widget.fn.options.name](options);
        } else {
            for (key in elementBindings) {
                field = element.getAttribute("data-" + key);

                if (field) {
                    binding = elementBindings[key];
                    binding = new binding(element, object, field);
                    binding.bind();
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
    kendo.widgetBindings = widgetBindings;

    kendo.ObservableObject = ObservableObject;
    kendo.ObservableArray = ObservableArray;

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
