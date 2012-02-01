(function ($, undefined) {
    var kendo = window.kendo,
        Observable = kendo.Observable,
        ObservableObject = kendo.data.ObservableObject,
        ObservableArray = kendo.data.ObservableArray,
        data = kendo.data,
        Model = data.Model,
        Class = kendo.Class,
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
                handler = function(e) { that.observe(e.field) };
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
                if (field.indexOf(e.field) === 0 && e.initiator != that.element) {
                    if (e.action && e.action in that) {
                        that[e.action].call(that, e.index, e.items);
                    } else {
                       if (!e.action) {
                          e.stopPropagation();
                       }
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

    /*----------------  NEW ---------------------- */
    var Binding = Observable.extend( {
        init: function(source, path) {
            var that = this;

            Observable.fn.init.call(that);

            that.source = source;
            that.path = path;

            if (path != "this") {
                that.source.bind("change", function(e) {
                    if (that.path.indexOf(e.field) >= 0) {
                        that.change();
                    }
                });
            }
        },

        change: function() {
            this.trigger("change");
        },

        get: function() {
            var result = this.source;

            if (this.path != "this") {
                result = this.source.get(this.path);

                if (typeof result === "function") {
                    result = $.proxy(result, this.source);
                }
            }

            return result;
        },

        set: function(value) {
            this.source.set(this.path, value);
        }
    });

    var BindingTarget = Class.extend( {
        init: function(target) {
            this.target = target;
            this.options = {};
        },

        setOption: function(name, value) {
            this.options[name] = value;
        },

        setTemplate: function(binding, template) {
            var property = new TemplateProperty(this.target, template);

            var expression = property.createExpression(binding);

            expression.updateTarget();

            binding.bind("change", function() {
                expression.updateTarget();
            });
        },

        setBinding: function(path, binding) {
            var property = this.createProperty(path);

            var expression = property.createExpression(binding);

            expression.updateTarget();

            property.bind("change", function() {
                expression.updateSource();
            });

            binding.bind("change", function() {
                expression.updateTarget();
            });
        },

        createProperty: function(path) {
            if (/click|change/.test(path)) {
                return new EventProperty(this.target, path);
            }

            if (path == "visible") {
                return new VisibleProperty(this.target, path);
            }

            if (path == "enabled") {
                return new EnableProperty(this.target, path);
            }

            if (path == "disabled") {
                return new DisableProperty(this.target, path);
            }

            if (path == "checked") {
                if (this.target.type === "radio") {
                    return new RadioCheckedProperty(this.target, path);
                } else if(this.target.type === "checkbox") {
                    return new CheckBoxCheckedProperty(this.target, path);
                }
            }

            path = {
                "text": "innerText",
                "title": "title",
                "html": "innerHTML",
                "alt": "alt",
                "value": "value",
                "href": "href",
                "src": "src"
            }[path] || path;

            if (path == "value") {
                return new TwoWayProperty(this.target, path);
            }

            return new Property(this.target, path);
        }
    });

    var SourceBindingTarget = BindingTarget.extend( {
        init: function(target) {
            BindingTarget.fn.init.call(this, target);
        },

        setTemplate: function(binding, template) {
            this.template = template;
        },

        getTemplate: function() {
            return this.template;
        },

        createProperty: function(path) {
            if (path == "source") {
                return new SourceProperty(this.target, path, this.getTemplate());
            }

            return BindingTarget.fn.createProperty.call(this, path);
        }
    });

    var SelectBindingTarget = SourceBindingTarget.extend( {
        init: function(target) {
            SourceBindingTarget.fn.init.call(this, target);
        },

        getTemplate: function() {
            var valueField = this.options.valueField;

            if (this.template) {
                return this.template;
            }

            if (!valueField) {
                return kendo.template("<option>#:data#</option>");
            }

            return kendo.template(kendo.format('<option value="#:{0}#">#:{0}#</option>', valueField));
        },

        createProperty: function(path) {
            if (path == "value") {
                if (this.target.getAttribute("multiple")) {
                    return new MultipleSelectValueProperty(this.target, path, this.options);
                }

                return new SelectValueProperty(this.target, path, this.options);
            }

            return SourceBindingTarget.fn.createProperty.call(this, path);
        }
    });

    var ListBindingTarget = SourceBindingTarget.extend( {
        init: function(target) {
            SourceBindingTarget.fn.init.call(this, target);
            this.template = kendo.template("<li>#:data#</li>");
        }
    });

    var TableBindingTarget = SourceBindingTarget.extend( {
        init: function(target) {
            SourceBindingTarget.fn.init.call(this, target);
            this.template = kendo.template("<tr><td>#:data#</td></tr>");
        },

        createProperty: function(path) {
            if (path == "source") {
                var tbody = this.target.tBodies[0];

                if (!tbody) {
                    tbody = document.createElement("tbody");
                    this.target.appendChild(tbody);
                }

                return new SourceProperty(tbody, path, this.getTemplate());
            }

            return SourceBindingTarget.fn.createProperty.call(this, path);
        }
    });

    var BindingExpression = Class.extend( {
        init: function(property, binding) {
            this.property = property;
            this.binding = binding;
        },

        updateTarget: function() {
            var value = this.binding.get();

            if (typeof value === "function") {
                value = value();
            }

            this.property.set(value);
        },

        updateSource: function() {
            this.binding.set(this.property.get());
        }
    });

    var EventBindingExpression = BindingExpression.extend( {
        updateTarget: function() {
            this.property.set(this.binding.get());
        }
    });

    var SelectValueExpression = BindingExpression.extend( {
        updateSource: function() {
            var target = this.property.get();

            if (this.property.options.valueField) {
                this.binding.set(this.property.options.valueField, target);
            } else {
                this.binding.set(target);
            }
        },

        updateTarget: function() {
            var value = this.binding.get();

            if (this.property.options.valueField) {
                value = value.get(this.property.options.valueField);
            }

            this.property.set(value);
        }
    });

    var MultipleSelectValueExpression = BindingExpression.extend( {
        updateSource: function() {
            var source = this.binding.get();
            var target = this.property.get();

            source.splice.apply(source, [0, source.length].concat(target));
        },

        updateTarget: function() {
            var value = this.binding.get();

            if (this.property.options.valueField) {
                var values = [];

                for (var idx = 0; idx < value.length; idx++) {
                    values[idx] = value[idx].get(this.property.options.valueField)
                }

                value = values;
            }

            this.property.set(value);
        }
    });

    var Property = Class.extend( {
        init: function(target, path, options) {
            this.target = target;
            this.path = path;
            this.options = options;
        },

        bind: function() {
        },

        set: function(value) {
            this.target[this.path] = value;
        },

        createExpression: function(binding) {
            return new BindingExpression(this, binding);
        }
    });

    var EventProperty = Property.extend({
        set: function(value) {
            $(this.target).bind(this.path, value);
        },

        createExpression: function(binding) {
            return new EventBindingExpression(this, binding);
        }
    });

    var TemplateProperty = Property.extend( {
        init: function(target, template, options) {
            Property.fn.init.apply(this, arguments);
            this.template = template;
        },

        set: function(value) {
            this.target.innerHTML = this.template(value);
        }
    });

    var VisibleProperty = Property.extend( {
        set: function(value) {
            if (value) {
                this.target.style.display = "";
            } else {
                this.target.style.display = "none";
            }
        }
    });

    var EnableProperty = Property.extend( {
        set: function(value) {
            if (value) {
                this.target.removeAttribute("disabled");
            } else {
                this.target.setAttribute("disabled", "disabled");
            }
        }
    });

    var DisableProperty = EnableProperty.extend( {
        set: function(value) {
            EnableProperty.fn.set.call(this, !value);
        }
    });

    var TwoWayProperty = Observable.extend( {
        init: function(target, path, options) {
            Observable.fn.init.call(this);
            this.target = target;
            this.path = path;
            this.options = options;
            $(this.target).bind("change", $.proxy(this.change, this));
        },

        change: function() {
            this.trigger("change");
        },

        get: function() {
            return this.target[this.path];
        },

        set: function(value) {
            this.target[this.path] = value;
        },

        createExpression: function(binding) {
            return new BindingExpression(this, binding);
        }
    });

    var MultipleSelectValueProperty = TwoWayProperty.extend({
        init: function(target, path, options) {
            TwoWayProperty.fn.init.apply(this, arguments);
        },

        get: function() {
            var optionIndex, value = [];

            for (optionIndex = 0; optionIndex < this.target.length; optionIndex++) {
                if (this.target[optionIndex].selected) {
                    value.push(this.target[optionIndex].value);
                }
            }

            return value;
        },

        set: function(value) {
            var valueIndex, optionIndex;

            for (valueIndex = 0; valueIndex < value.length; valueIndex++) {
                for (optionIndex = 0; optionIndex < this.target.length; optionIndex++) {
                    if (this.target[optionIndex].value == value[valueIndex]) {
                        this.target[optionIndex].selected = true;
                    }
                }
            }
        },
        createExpression: function(binding) {
            return new MultipleSelectValueExpression(this, binding);
        }
    });

    var SelectValueProperty = TwoWayProperty.extend({
        createExpression: function(binding) {
            return new SelectValueExpression(this, binding);
        }
    });

    var RadioCheckedProperty = TwoWayProperty.extend({
        get: function() {
            return this.target.value;
        },
        set: function(value) {
            if (this.target.value == value) {
                this.target.checked = true;
            }
        }
    });

    var CheckBoxCheckedProperty = TwoWayProperty.extend({
        get: function() {
            var value = this.target.getAttribute("value");
            return value || this.target.checked;
        },

        set: function(value) {
            this.target.checked = value === true;
        },

        createExpression: function(binding) {
            return new CheckBoxBindingExpression(this, binding);
        }
    });

    var CheckBoxBindingExpression = BindingExpression.extend({
        updateSource:function() {
            var source = this.binding.get();
            var target = this.property.get();
            var index;

            if (source instanceof ObservableArray) {
                if (target !== false && target !== true) {
                    index = source.indexOf(target);
                    if (index > -1) {
                        source.splice(index, 1);
                    } else {
                        source.push(target);
                    }
                }
            } else {
                this.binding.set(target);
            }
        },

        updateTarget: function() {
            var source = this.binding.get();
            var target = this.property.get();

            if (source instanceof ObservableArray) {
                if (source.indexOf(target) >= 0) {
                    source = true;
                }
            }

            this.property.set(source);
        }
    })

    var SourceProperty = Property.extend({
        init: function(target, path, template) {
            this.target = target;
            this.path = path;
            this.template = template;
        },

        set: function(value) {
            var that = this,
                idx,
                length;

            value.bind("change", function(e) {
                if (e.action == "add") {
                    that.add(e.index, e.items);
                } else if (e.action == "remove") {
                    that.remove(e.index, e.items);
                }
            });

            this.target.innerHTML = kendo.render(this.template, value);

            for (idx = 0, length = value.length; idx < length; idx++) {
                bindElement(this.target.children[idx], value[idx]);
            }
        },

        add: function(index, items) {
            var clone = this.target.cloneNode(), reference = this.target.children[index];

            clone.innerHTML = kendo.render(this.template, items);

            while (clone.firstChild) {
                this.target.insertBefore(clone.firstChild, reference);
            }
        },

        remove: function(index, items) {
            var idx, length;

            for (idx = 0, length = items.length; idx < length; idx++) {
                this.target.removeChild(this.target.children[index]);
            }
        }
    });

    var WidgetBindingTarget = BindingTarget.extend( {
        init: function(target) {
            BindingTarget.fn.init.apply(this, arguments);
        },

        setTemplate: function(binding, template) {
            this.target.template = template;
        },

        createProperty: function(path) {
            if (path == "source") {
                return new DataSourceWidgetProperty(this.target);
            }

            if (path == "template") {
                return new TemplateWidgetProperty(this.target, path, template);
            }

            return new WidgetProperty(this.target, path);
        }
    });

    var WidgetProperty = Observable.extend( {
        init: function(target, path) {
            Observable.fn.init.call(this);

            this.target = target;
            this.path = path;

            this.target.bind("change", $.proxy(this.change, this));
        },

        change: function() {
            this.trigger("change");
        },

        get: function() {
            return this.target[this.path]();
        },

        set: function(value) {
            this.target[this.path](value);
        }
    });

    var TemplateWidgetProperty = Class.extend({
        init: function(target, path, template) {
            this.target = target;
            this.template = template;
        },

        bind: function() {
        },

        set: function(value) {
            var target = this.target;
            target.template = template;
        }
    });

    var DataSourceWidgetProperty = Class.extend({
        init: function(target) {
            this.target = target;
        },

        bind: function() {
        },

        set: function(value) {
            var widget = this.target;

            widget.bind("dataBound", function() {
                var idx, length, view = widget.dataSource.view();
                for (idx = 0, length = view.length; idx < length; idx++) {
                    bind(widget.ul[0].children[idx], view[idx]);
                }
            });

            widget.dataSource.data(value);
        }
    });

    function bindElement(element, source) {
        var role = element.getAttribute("data-role"),
            idx,
            nodeName = element.nodeName.toLowerCase(),
            deep = true,
            target;

        if (role) {
            target = new WidgetBindingTarget(new kendo.ui.DropDownList(element));
        } else {
            if (nodeName == "select") {
                target = new SelectBindingTarget(element);
            } else if (nodeName == "table") {
                target = new TableBindingTarget(element);
            } else if (nodeName == "ul" || nodeName == "ol") {
                target = new ListBindingTarget(element);
            } else {
                target = new BindingTarget(element);
            }
        }

        ["valueField"].forEach(function(path) {
            var option = element.getAttribute("data-" + path.toLowerCase());

            if (option) {
                target.setOption(path, option);
            }
        });

        var template = element.getAttribute("data-template");

        if (template) {
            var binding = new Binding(source, "");

            template = kendo.template($("#" + template).html());

            target.setTemplate(binding, template);
        }

        ["text", "checked", "disabled", "enabled", "click", "visible", "change", "src", "href", "alt", "html", "title", "source", "value"].forEach(function(path) {
            var sourcePath = element.getAttribute("data-" + path);

            if (sourcePath) {
                if (path == "source") {
                    deep = false;
                }

                var binding = new Binding(source, sourcePath);

                target.setBinding(path, binding);
            }
        });

        if (deep) {
            for (idx = 0; idx < element.children.length; idx++) {
                bindElement(element.children[idx], source);
            }
        }
    }

    function bind(dom, object) {
        var idx, length;

        object = kendo.observable(object);

        for (idx = 0, length = dom.length; idx < length; idx++ ) {
            bindElement(dom[idx], object);
        }
    }

    kendo.bind = bind;
})(jQuery);
