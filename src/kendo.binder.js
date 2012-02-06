(function ($, undefined) {
    var kendo = window.kendo,
        Observable = kendo.Observable,
        ObservableObject = kendo.data.ObservableObject,
        ObservableArray = kendo.data.ObservableArray,
        data = kendo.data,
        Class = kendo.Class,
        GET = "get",
        CHANGE = "change";

    kendo.observable = function(object) {
        if (!(object instanceof ObservableObject)) {
            object = new ObservableObject(object);
        }

        return object;
    };

    var Binding = Observable.extend( {
        init: function(source, path) {
            var that = this;

            Observable.fn.init.call(that);

            that.source = source;
            that.path = path;
            that.dependencies = {};
            that.dependencies[path] = true;

            that._access = $.proxy(that.access, that);
            that._changeHandler = function(e) {
                if (that.dependencies[e.field] && !e.isDefaultPrevented()) {
                    that.change();
                }
            };

            if (path != "this") {
                that.source.bind("change", that._changeHandler);
            }
        },

        change: function() {
            this.trigger("change");
        },

        access: function(e) {
            this.dependencies[e.field] = true;
        },

        start: function() {
            if (this.path != "this") {
                this.source.bind("get", this._access);
            }
        },

        stop: function() {
            if (this.path != "this") {
                this.source.unbind("get", this._access);
            }
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
        },

        destroy: function() {
            if (this.path != "this") {
                this.source.unbind("change", this._changeHandler);
            }
        }
    });

    var BindingTarget = Class.extend( {
        init: function(target) {
            this.target = target;
            this.options = {};
            this.expressions = [];
        },

        setOption: function(name, value) {
            this.options[name] = value;
        },

        setTemplate: function(binding, template) {
            var property = new TemplateProperty(this.target, template);

            var expression = property.createExpression(binding);

            this.expressions.push(expression);

            expression.updateTarget(this.options);

            binding.bind("change", function() {
                expression.updateTarget();
            });
        },

        setBinding: function(path, binding) {
            var property = this.createProperty(path),
                that = this;

            var expression = property.createExpression(binding);

            this.expressions.push(expression);

            expression.updateTarget(this.options);

            property.bind("change", function() {
                expression.updateSource(that.options);
            });

            binding.bind("change", function() {
                expression.updateTarget(that.options);
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
        },

        destroy: function() {
            var idx,
                length;

            for (idx = 0, length = this.expressions.length; idx < length; idx++) {
                this.expressions[idx].destroy();
            }
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

        applyToTarget: function(options) {
            var value = this.binding.get();

            if (typeof value === "function") {
                value = value();
            }

            this.property.set(value);
        },

        updateTarget: function(options) {
            this.binding.start();
            this.applyToTarget(options);
            this.binding.stop();
        },

        updateSource: function(options) {
            this.binding.set(this.property.get());
        },

        destroy: function() {
            this.property.destroy();
            this.binding.destroy();
        }
    });

    var EventBindingExpression = BindingExpression.extend( {
        updateTarget: function() {
            this.property.set(this.binding.get());
        }
    });

    var SelectValueExpression = BindingExpression.extend( {
        updateSource: function(options) {
            var target = this.property.get(),
                source = options.source,
                field = this.property.options.valueField || this.property.options.dataValueField,
                idx,
                length;

            if (field) {
                for (idx = 0, length = source.length; idx < length; idx++) {
                    if (source[idx].get(field) == target) {
                        this.binding.set(source[idx]);
                        break;
                    }
                }
            } else {
                this.binding.set(target);
            }
        },

        applyToTarget: function() {
            var value = this.binding.get(),
                field = this.property.options.valueField || this.property.options.dataValueField;

            if (field) {
                value = value.get(field);
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

        applyToTarget: function() {
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
        },

        destroy: function() {
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
            this._changeHandler = $.proxy(this.change, this);
            $(this.target).bind("change", this._changeHandler);
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
        },

        destroy: function() {
           $(this.target).unbind("change", this._changeHandler);
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

        applyToTarget: function() {
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

            value.bind(0, "change", function(e) {
                e.preventDefault();

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
        },

        createExpression: function(binding) {
            return new SourceBindingExpression(this, binding);
        }
    });

    var SourceBindingExpression = BindingExpression.extend({
        applyToTarget: function(options) {
            var source = this.binding.get();

            options.source = source;

            this.property.set(source);
        }
    });

    var WidgetBindingTarget = BindingTarget.extend( {
        init: function(target) {
            BindingTarget.fn.init.apply(this, arguments);
        },

        setTemplate: function(binding, template) {
            this.target.template = template;
        },

        setOptions: function(options) {
            this.target.setOptions(options);
        },

        createProperty: function(path) {
            if (path == "source") {
                return new DataSourceWidgetProperty(this.target);
            }

            if (path == "template") {
                return new TemplateWidgetProperty(this.target, path, template);
            }

            if (path == "value") {
                return new WidgetValueProperty(this.target, path, this.target.options);
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
        },
        createExpression: function(binding) {
            return new BindingExpression(this, binding);
        }
    });

    var WidgetValueProperty = WidgetProperty.extend({
        init: function(target, path, options) {
            WidgetProperty.fn.init.call(this, target, path);
            this.options = options;
        },
        createExpression: function(binding) {
            return new SelectValueExpression(this, binding);
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
        },
        createExpression: function(binding) {
            return new BindingExpression(this, binding);
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
                    bindElement(widget.ul[0].children[idx], view[idx]);
                }
            });

            widget.dataSource.data(value);
        },
        createExpression: function(binding) {
            return new SourceBindingExpression(this, binding);
        }
    });

    function bindingTargetForWidget(name, element) {
        var options = {},
            option,
            value

        for (option in kendo.ui[name].fn.options) {
            value = element.getAttribute("data-" + kendo.ns + option.toLowerCase());

            if (value === null) {
                value = element.getAttribute("data-" + kendo.ns + option.replace("data", "").toLowerCase()); //setting options that start with "data"
            }

            if (value !== null) {
                options[option] = value;
            }
        }

        var widget = $.data(element, "kendo" + name);
        if (!widget) {
            widget = new kendo.ui[name](element);
        }

        widget.setOptions(options);

        return new WidgetBindingTarget(widget);
    }

    function bindElement(element, source) {
        var role = element.getAttribute("data-role"),
            idx,
            nodeName = element.nodeName.toLowerCase(),
            deep = true,
            value,
            option,
            target;

        unbindElement(element);

        if (role) {
            if (role === "dropdownlist") {
                target = bindingTargetForWidget("DropDownList", element);
            } else if (role === "combobox") {
                target = bindingTargetForWidget("ComboBox", element);
            }
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

        $.data(element, "kendoBindingTarget", target);

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
                target.source = source;
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

    function unbindElement(element) {
        var bindingTarget = $.data(element, "kendoBindingTarget");

        if (bindingTarget) {
            bindingTarget.destroy();
            $.removeData(element, "kendoBindingTarget")
        }
    }

    function unbind(dom) {
        var idx, length;

        for (idx = 0, length = dom.length; idx < length; idx++ ) {
            unbindElement(dom[idx]);
        }
    }

    function notify(widget) {
        var element = widget.element;
        var bindingTarget = element.data("kendoBindingTarget");

        if (bindingTarget) {
            bind(element, bindingTarget.source);
        }
    }

    kendo.unbind = unbind;
    kendo.bind = bind;
    kendo.notify = notify;
})(jQuery);
