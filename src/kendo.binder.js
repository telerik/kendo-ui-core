(function ($, undefined) {
    var kendo = window.kendo,
        Observable = kendo.Observable,
        ObservableObject = kendo.data.ObservableObject,
        ObservableArray = kendo.data.ObservableArray,
        data = kendo.data,
        Class = kendo.Class,
        GET = "get",
        innerText,
        CHANGE = "change";

    (function() {
        var a = document.createElement("a");
        if (a.innerText !== undefined) {
            innerText = "innerText"
        } else if (a.textContent !== undefined) {
            innerText = "textContent";
        }
    })();

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
            that._change = $.proxy(that.change, that);

            if (path != "this") {
                that.source.bind("change", that._change);
            }
        },

        change: function(e) {
            if (this.dependencies[e.field] && !e.isDefaultPrevented()) {
                this.trigger("change");
            }
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
            this.start();

            var result = this.source;

            if (this.path != "this") {
                result = this.source.get(this.path);

                if (typeof result === "function") {
                    result = $.proxy(result, this.source);
                }
            }
            this.stop();

            console.log(this.dependencies);
            return result;
        },

        set: function(value) {
            this.source.set(this.path, value);
        },

        destroy: function() {
            if (this.path != "this") {
                this.source.unbind("change", this._change);
            }
        }
    });

    var binders = {
        attr: {
            init: function(element, bindings, options) {
            },

            update: function(element, bindings, options) {
                var attribute, attributes = bindings.attr;

                for (attribute in attributes) {
                    element.setAttribute(attribute, attributes[attribute].get());
                }
            }
        },
        enabled: {
            init: function() {
            },

            update: function(element, bindings) {
                if (bindings.enabled.get()) {
                    element.removeAttribute("disabled");
                } else {
                    element.setAttribute("disabled", "disabled");
                }
            }
        },
        disabled: {
            init: function() {
            },

            update: function(element, bindings) {
                if (bindings.disabled.get()) {
                    element.setAttribute("disabled", "disabled");
                } else {
                    element.removeAttribute("disabled");
                }
            }
        },
        event: {
            init: function() {
            },
            update: function(element, bindings, options) {
                var event, events = bindings.event;

                for (event in events) {
                    $(element).bind(event, events[event].get());
                }
            }
        },
        click: {
            init: function() {
            },
            update: function(element, bindings, options) {
                $(element).click(bindings.click.get());
            }
        },
        text: {
            init: function(element, bindings, options) {
            },
            update: function(element, bindings, options) {
                //TODO: evaluate the function in some common place
                var text = bindings["text"].get();

                if (typeof text == "function") {
                    text = text();
                }

                element[innerText] = text;
            }
        },

        visible: {
            init: function() {
            },

            update: function(element, bindings, options) {
                if (bindings["visible"].get()) {
                    element.style.display = "";
                } else {
                    element.style.display = "none";
                }
            }
        },

        html: {
            init: function(element, bindings, options) {
            },
            update: function(element, bindings, options) {
                var template = options.template,
                    html = bindings["html"].get();

                if (template) {
                   html = template(html);
                }

                element.innerHTML = html;
            }
        },

        value: {
            init: function(element, bindings, options) {
                $(element).change(function() {
                    bindings["value"].set(this.value);
                });
            },

            update: function(element, bindings, options) {
                element.value = bindings["value"].get();
            }
        },

        source: {
            init: function(element, bindings, options) {
                var source = bindings["source"].get(),
                that = this,
                template = options.template;

                source.bind(0, "change", function(e) {
                    e.preventDefault();

                    if (e.action == "add") {
                        that.add(element, e.index, kendo.render(template, e.items));
                    } else if (e.action == "remove") {
                        that.remove(element, e.index, e.items.length);
                    }
                });
            },

            add: function(element, index, html) {
                var clone = element.cloneNode(false),
                reference = element.children[index];

                $(clone).html(html);

                if (reference) {
                    while (clone.firstChild) {
                        element.insertBefore(clone.firstChild, reference);
                    }
                } else {
                    while (clone.firstChild) {
                        element.appendChild(clone.firstChild);
                    }
                }
            },

            remove: function(element, index, length) {
                var idx;

                for (idx = 0; idx < length; idx++) {
                    element.removeChild(element.children[index]);
                }
            },

            update: function(element, bindings, options) {
                var source = bindings["source"].get();
                var idx, length;
                var template = options.template;

                if (element.nodeName.toLowerCase() == "table") {
                   if (!element.tBodies[0]) {
                        element.appendChild(document.createElement("tbody"));
                   }
                   element = element.tBodies[0];
                }

                $(element).html(kendo.render(template, source));

                for (idx = 0, length = source.length; idx < length; idx++) {
                    bindElement(element.children[idx], source[idx]);
                }
            }
        },
        input: {
            checked: {
                init: function(element, bindings, options) {
                    var that = this;
                    $(element).change(function() {
                        var value = that.value(this);
                        if (this.type == "radio") {
                            bindings["checked"].set(value);
                        } else if (this.type == "checkbox") {
                            var source = bindings["checked"].get();
                            var index;

                            if (source instanceof ObservableArray) {
                                if (value !== false && value !== true) {
                                    index = source.indexOf(value);
                                    if (index > -1) {
                                        source.splice(index, 1);
                                    } else {
                                        source.push(value);
                                    }
                                }
                            } else {
                                bindings["checked"].set(value);
                            }
                        }
                    });
                },

                value: function(element) {
                    var value = element.value;

                    if (element.type == "checkbox") {
                        if (value == "on" || value == "off") {
                            value = element.checked;
                        }
                    }

                    return value;
                },

                update: function(element, bindings, options) {
                    var value = bindings["checked"].get();

                    if (element.type == "checkbox") {
                        if (value instanceof ObservableArray) {
                            if (value.indexOf(this.value(element)) >= 0) {
                                value = true;
                            }
                        }

                        element.checked = value === true;
                    } else if (element.type == "radio") {
                        if (element.value == value) {
                            element.checked = true;
                        }
                    }
                }
            }
        },
        select: {
            value: {
                init: function(element, bindings, options) {
                },

                update: function(element, bindings, options) {
                    var optionIndex,
                        value = bindings["value"].get(),
                        values = value,
                        field = options.valueField || options.textField,
                        optionValue;

                    if (!(values instanceof ObservableArray)) {
                        values = new ObservableArray([value]);
                    }

                    options = element.options;

                    for (var valueIndex = 0; valueIndex < values.length; valueIndex++) {
                        value = values[valueIndex];

                        if (field) {
                            value = value.get(field);
                        }

                        for (optionIndex = 0; optionIndex < options.length; optionIndex++) {
                            optionValue = options[optionIndex].value;
                            if (optionValue === "" && value !== "") {
                                optionValue = options[optionIndex].text;
                            }

                            if (optionValue == value) {
                                options[optionIndex].selected = true;
                            }
                        }
                    }
                }
            }
        }
    };

    var BindingTarget = Class.extend( {
        init: function(target) {
            this.target = target;
            this.options = {};
            this.expressions = [];
        },

        setOptions: function(options) {
            if (options.template) {
                options.template = kendo.template(options.template);
            }
            $.extend(this.options, options);
        },

        bind: function(bindings) {
           var that = this;
           var nodeName = this.target.nodeName.toLowerCase();
           var specificBinders = binders[nodeName] || {};

           for (var key in bindings) {
                var binder = specificBinders[key] || binders[key];
                var binding = bindings[key];
                if (binder) {
                   binder.init(this.target, bindings, this.options);

                   binder.update(this.target, bindings, this.options);

                   if (key == "attr" || key == "event") {
                       for (var attribute in binding) {
                            binding[attribute].bind("change", function(e) {
                                binder.update(that.target, bindings, that.options);
                            });
                       }
                   } else {
                       binding.bind("change", function(e) {
                           binder.update(that.target, bindings, that.options);
                       });
                   }
                }
           }
        },

        configuration: function() {
            return {
                options: ["textField", "valueField"],
                properties: ["text", "checked", "template", "disabled", "enabled", "click", "visible", "html", "source", "value"],
                props: {
                    text: TextProperty,
                    html: HtmlProperty,
                    enabled: EnableProperty,
                    disabled: DisableProperty,
                    visible: VisibleProperty
                }
            };
        },

        setStyleBinding: function(path, binding) {
            var that = this,
                property = new StyleProperty(that.target, path);

            var expression = property.createExpression(binding);
            that.expressions.push(expression);

            expression.updateTarget(that.options);

            binding.bind("change", function() {
                expression.updateTarget(that.options);
            });
        },

        setBinding: function(path, binding) {
            var property = this.createProperty(path),
                that = this;

            if (property) {
                var expression = property.createExpression(binding);

                this.expressions.push(expression);

                expression.updateTarget(this.options);

                property.bind("change", function() {
                    expression.updateSource(that.options);
                });

                binding.bind("change", function() {
                    expression.updateTarget(that.options);
                });
            }
        },

        createProperty: function(path) {
            var properties = this.configuration().props;

            if (path in properties) {
                return new properties[path](this.target);
            }

            if (/click/.test(path)) {
                return new EventProperty(this.target, path);
            }

            if (path == "template") {
                return new TemplateProperty(this.target, "innerHTML");
            }

            if (path == "checked") {
                if (this.target.type === "radio") {
                    return new RadioCheckedProperty(this.target, path);
                } else if(this.target.type === "checkbox") {
                    return new CheckBoxCheckedProperty(this.target, path);
                }
            }

            if (path == "value") {
                return new TwoWayProperty(this.target, path);
            }
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

        createProperty: function(path) {
            if (path == "source") {
                return new SourceProperty(this.target, "innerHTML");
            }

            if (path == "template") {
                return null;
            }

            return BindingTarget.fn.createProperty.call(this, path);
        }
    });

    var SelectBindingTarget = SourceBindingTarget.extend( {
        init: function(target) {
            SourceBindingTarget.fn.init.call(this, target);

            this.options.template = kendo.template("<option>#:data#</option>");
        },

        setOptions: function(options) {
            if (options.valueField && !options.template) {
                options.template = kendo.template(kendo.format('<option value="#:{0}#">#:{1}#</option>', options.valueField, options.textField || options.valueField));
            }

            BindingTarget.fn.setOptions.call(this, options);
        },

        createProperty: function(path) {
            if (path == "value") {
                if (this.target.getAttribute("multiple")) {
                    return new MultipleSelectValueProperty(this.target, path);
                }

                return new SelectValueProperty(this.target, path);
            }

            return SourceBindingTarget.fn.createProperty.call(this, path);
        }
    });

    var ListBindingTarget = SourceBindingTarget.extend( {
        init: function(target) {
            SourceBindingTarget.fn.init.call(this, target);
            this.options.template = kendo.template("<li>#:data#</li>");
        }
    });

    var TableBindingTarget = SourceBindingTarget.extend( {
        init: function(target) {
            SourceBindingTarget.fn.init.call(this, target);
            this.options.template = kendo.template("<tr><td>#:data#</td></tr>");
        },

        createProperty: function(path) {
            if (path == "source") {
                var tbody = this.target.tBodies[0];

                if (!tbody) {
                    tbody = document.createElement("tbody");
                    this.target.appendChild(tbody);
                }

                return new SourceProperty(tbody, "innerHTML");
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
                field = options.valueField || options.textField,
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

        applyToTarget: function(options) {
            var value = this.binding.get(),
                field = options.valueField || options.textField;

            if (field) {
                value = value.get(field);
            }

            this.property.set(value);
        }
    });

    var MultipleSelectValueExpression = BindingExpression.extend( {
        updateSource: function(options) {
            var source = this.binding.get();
            var target = this.property.get();

            if (options.valueField) {
                for (var idx = 0; idx < target.length; idx++) {
                    for (var sourceIdx = 0; sourceIdx < options.source.length; sourceIdx++) {
                        if (options.source[sourceIdx].get(options.valueField) == target[idx]) {
                            target[idx] = options.source[sourceIdx];
                            break;
                        }
                    }
                }
            }

            source.splice.apply(source, [0, source.length].concat(target));
        },

        applyToTarget: function(options) {
            var value = this.binding.get();

            if (options.valueField) {
                var values = [];

                for (var idx = 0; idx < value.length; idx++) {
                    values[idx] = value[idx].get(options.valueField)
                }

                value = values;
            }

            this.property.set(value);
        }
    });

    var Property = Class.extend( {
        init: function(target, path) {
            this.target = target;
            this.path = path;
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

    var TextProperty = Property.extend( {
        set: function(value) {
            this.target[innerText] = value;
        }
    });

    var HtmlProperty = Property.extend( {
        set: function(value) {
            this.target.innerHTML = value;
        }
    });

    var AttributeProperty = Property.extend( {
        set: function(value) {
            this.target.setAttribute(this.path, value);
        }
    });

    var StyleProperty = Property.extend( {
        set: function(value) {
            $(this.target).css(this.path, value);
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
        createExpression: function(binding) {
            return new TemplateBindingExpression(this, binding);
        }
    });

    var TemplateBindingExpression = BindingExpression.extend( {
        applyToTarget: function(options) {
            var source = this.binding.get();
            var template = options.template;
            this.property.set(template(source));
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
        init: function(target, path) {
            TwoWayProperty.fn.init.apply(this, arguments);
        },

        get: function() {
            var optionIndex, value = [];

            for (optionIndex = 0; optionIndex < this.target.length; optionIndex++) {
                if (this.target[optionIndex].selected) {
                    value.push(this.target[optionIndex].value || this.target[optionIndex].text);
                }
            }

            return value;
        },

        set: function(value) {
            var valueIndex, optionIndex, options = this.target.options, optionValue;

            for (valueIndex = 0; valueIndex < value.length; valueIndex++) {
                for (optionIndex = 0; optionIndex < options.length; optionIndex++) {
                    optionValue = options[optionIndex].value;

                    if (optionValue === "" && value !== "") {
                        optionValue = options[optionIndex].text;
                    }

                    if (optionValue == value[valueIndex]) {
                        options[optionIndex].selected = true;
                    }
                }
            }
        },
        createExpression: function(binding) {
            return new MultipleSelectValueExpression(this, binding);
        }
    });

    var SelectValueProperty = TwoWayProperty.extend({
        set: function(value) {
            var optionIndex, options = this.target.options, optionValue;

            for (optionIndex = 0; optionIndex < options.length; optionIndex++) {
                optionValue = options[optionIndex].value;
                if (optionValue === "" && value !== "") {
                    optionValue = options[optionIndex].text;
                }

                if (optionValue == value) {
                    options[optionIndex].selected = true;
                    break;
                }
            }
        },
        get: function() {
            var option = this.target.options[this.target.selectedIndex];
            return option.value || option.text;
        },
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
            var value = this.target.value;

            if (value !== "on" && value !== "off") {
                return value;
            }

            return this.target.checked;
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
        bindChildren: function(value) {
            var idx, length;

            for (idx = 0, length = value.length; idx < length; idx++) {
                bindElement(this.target.children[idx], value[idx]);
            }
        },

        set: function(html) {
            $(this.target).html(html);
        },

        add: function(index, html) {
            var clone = this.target.cloneNode(false), reference = this.target.children[index];

            $(clone).html(html);

            if (reference) {
                while (clone.firstChild) {
                    this.target.insertBefore(clone.firstChild, reference);
                }
            } else {
                while (clone.firstChild) {
                    this.target.appendChild(clone.firstChild);
                }
            }
        },

        remove: function(index, length) {
            var idx;

            for (idx = 0; idx < length; idx++) {
                this.target.removeChild(this.target.children[index]);
            }
        },

        createExpression: function(binding) {
            return new SourceBindingExpression(this, binding);
        }
    });

    var SourceBindingExpression = BindingExpression.extend({
        applyToTarget: function(options) {
            var that = this;
            var source = that.binding.get();
            var template = options.template;
            var property = that.property;

            options.source = source;

            source.bind(0, "change", function(e) {
                e.preventDefault();

                if (e.action == "add") {
                    property.add(e.index, kendo.render(template, e.items));
                } else if (e.action == "remove") {
                    property.remove(e.index, e.items.length);
                }
            });

            that.property.set(kendo.render(template, source));
            that.property.bindChildren(source);
        }
    });

    var DataSourceBindingExpression = BindingExpression.extend({
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

        setOptions: function(options) {
            this.options = options;
            this.target.setOptions(options);
        },

        createProperty: function(path) {
            if (path == "template") {
                return null;
            }

            if (path == "source") {
                return new DataSourceWidgetProperty(this.target);
            }

            if (path == "value") {
                return new WidgetValueProperty(this.target, path);
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
        },

        destroy: function() {
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

    function flattenGroups(data) {
        var idx,
            lenght,
            result = [];

        for (idx = 0, length = data.length; idx < length; idx++) {
            if (data[idx].hasSubgroups) {
                result = result.concat(flattenGroups(data[idx].items));
            } else {
                result = result.concat(data[idx].items);
            }
        }
        return result;
    }

    var DataSourceWidgetProperty = Class.extend({
        init: function(target) {
            this.target = target;

            this._dataBindingHandler = $.proxy(this._dataBinding, this);
            this._dataBoundHandler = $.proxy(this._dataBound, this);
        },

        bind: function() {
        },

        _dataBinding: function() {
            var idx,
                length,
                widget = this.target,
                items = widget.items();

            for (idx = 0, length = items.length; idx < length; idx++) {
                unbindElementTree(items[idx]);
            }
        },

        _dataBound: function() {
            var idx,
                length,
                widget = this.target,
                items = widget.items(),
                dataSource = widget.dataSource,
                view = dataSource.view(),
                groups = dataSource.group() || [];

            if (groups.length) {
                view = flattenGroups(view);
            }

            for (idx = 0, length = view.length; idx < length; idx++) {
                bindElement(items[idx], view[idx]);
            }
        },

        set: function(value) {
            var widget = this.target;

            widget.bind("dataBinding", this._dataBindingHandler);

            widget.bind("dataBound", this._dataBoundHandler);

            widget.dataSource.data(value);
        },

        createExpression: function(binding) {
            return new DataSourceBindingExpression(this, binding);
        },

        destroy: function() {
            var widget = this.target;

            widget.unbind("dataBinding", this._dataBindingHandler);
            widget.unbind("dataBound", this._dataBoundHandler);
        }
    });

    function bindingTargetForRole(role, element) {
        var options = {},
            option,
            type,
            name,
            idx,
            length,
            value;

        type = kendo.roles[role];

        if (type) {
            name = type.fn.options.name;
            element = $(element);

            for (option in type.fn.options) {
                value =  element.data(kendo.ns + option.toLowerCase());

                if (value === undefined) {
                    value = element.data(kendo.ns + option.replace("data", "").toLowerCase()); //setting options that start with "data"
                }

                if (value !== undefined) {
                    options[option] = value;
                }
            }

            for (idx = 0, length = type.fn.events.length; idx < length; idx++) {
                option = type.fn.events[idx];

                value = element.data(kendo.ns + option.toLowerCase());

                if (value === null) {
                    value = element.data(kendo.ns + option.replace("data", "").toLowerCase()); //setting options that start with "data"
                }

                if (value !== null) {
                    options[option] = window[value];
                }
            }

            var widget = element.data("kendo" + name);

            if (!widget) {
                widget = new kendo.ui[name](element, options);
            } else {
                widget.setOptions(options);
            }

            return new WidgetBindingTarget(widget);
        }
    }

    var attrRegExp = /attr\s*:\s*{([^}]*)}/ig;
    var eventRegExp = /event\s*:\s*{([^}]*)}/ig;
    var styleRegExp = /style\s*:\s*{([^}]*)}/ig;

    function parseAttributeList(bind) {
        var result = {},
            attr,
            event,
            style;

        bind = bind.replace(attrRegExp, function($0, $1) {
            attr = attr || {};
            appendAttributes(attr, $1);
        });

        if (attr) {
            result.attr = attr;
        }

        bind = bind.replace(styleRegExp, function($0, $1) {
            style = style || {};
            appendAttributes(style, $1);
        });

        if (style) {
            result.style = style;
        }

        bind = bind.replace(eventRegExp, function($0, $1) {
            event = event || {};
            appendAttributes(event, $1);
        });

        if (event) {
            result.event = event;
        }

        appendAttributes(result, bind);

        return result;
    }

    function appendAttributes(attributes, commaSeparatedAttributes) {
        var keyValuePairs, keyValuePair, idx, length;

        keyValuePairs = commaSeparatedAttributes.split(",");

        for (idx = 0, length = keyValuePairs.length; idx < length; idx++) {
           keyValuePair = keyValuePairs[idx].split(":");

           if (keyValuePair.length === 2) {
               attributes[$.trim(keyValuePair[0]).toLowerCase()] = $.trim(keyValuePair[1]);
           }
        }
    }

    function bindElement(element, source) {
        var role = element.getAttribute("data-role"),
            idx,
            length,
            path,
            sourcePath,
            nodeName = element.nodeName.toLowerCase(),
            bind,
            configuration,
            deep = true,
            value,
            bindings,
            options = {},
            option,
            target;

        unbindElement(element);

        if (role) {
            target = bindingTargetForRole(role, element);
        }

        bind = element.getAttribute("data-" + kendo.ns + "bind");

        if (bind) {
            if (!target) {
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

            target.source = source;

            bind = parseAttributeList(bind);

            configuration = target.configuration();

            if (bind.template) {
                options.template = $("#" + bind.template).html();
            }

            for (idx = 0, length = configuration.options.length; idx < length; idx++) {
                path = configuration.options[idx];
                option = element.getAttribute("data-" + kendo.ns + path.toLowerCase());

                if (option) {
                    options[path] = option;
                }
            }

            target.setOptions(options);

            var bindings = {};

            if (bind.attr) {
                bindings.attr = {
                };

                for (path in bind.attr) {
                    bindings.attr[path] = new Binding(source, bind.attr[path]);
                }
            }

            if (bind.style) {
                for (path in bind.style) {
                    target.setStyleBinding(path, new Binding(source, bind.style[path]));
                }
            }
            if (bind.event) {
                bindings.event = {
                };
                for (path in bind.event) {
                    bindings.event[path] = new Binding(source, bind.event[path]);
                }
            }

            for (idx = 0, length = configuration.properties.length; idx < length; idx++) {
                path = configuration.properties[idx];

                sourcePath = bind[path];

                if (sourcePath) {
                    if (path == "source") {
                       deep = false;
                    } else if (path == "template") {
                        sourcePath = "";
                    }

                    bindings[path] = new Binding(source, sourcePath);
                }
            }

            if (bindings.template && !bindings.source) {
                bindings["html"] = new Binding(source, "");
            }

            target.bind(bindings);
        }

        if (target) {
            $.data(element, "kendoBindingTarget", target);
        }

        if (deep) {
            for (idx = 0; idx < element.children.length; idx++) {
                bindElement(element.children[idx], source);
            }
        }
    }

    function bind(dom, object) {
        var idx, length;

        object = kendo.observable(object);
        dom = $(dom);

        for (idx = 0; idx < dom.length; idx++ ) {
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

    function unbindElementTree(element) {
        var idx,
            length,
            children = element.children;

        unbindElement(element);

        for (idx = 0, length = children.length; idx < length; idx++) {
            unbindElementTree(children[idx]);
        }
    }

    function unbind(dom) {
        var idx, length;

        dom = $(dom);

        for (idx = 0, length = dom.length; idx < length; idx++ ) {
            unbindElementTree(dom[idx]);
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
