(function ($, undefined) {
    var kendo = window.kendo,
        Observable = kendo.Observable,
        ObservableObject = kendo.data.ObservableObject,
        ObservableArray = kendo.data.ObservableArray,
        toString = {}.toString,
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

    var Binding = Observable.extend( {
        init: function(root, source, path) {
            var that = this;

            Observable.fn.init.call(that);

            that.root = root;
            that.source = source;
            that.path = path;
            that.dependencies = {};
            that.dependencies[path] = true;
            that.observable = that.source instanceof Observable;

            that._access = function(e) {
                that.dependencies[e.field] = true;
            };

            if (that.observable) {
                that._change = function(e) {
                    that.change(e);
                };

                that.source.bind("change", that._change);
            }
        },

        change: function(e) {
            var dependency,
                idx,
                ch,
                that = this;

            if (that.path === "this") {
                that.trigger("change", e);
            } else {
                for (dependency in that.dependencies) {
                    idx = dependency.indexOf(e.field);

                    if (idx === 0) {
                       ch = dependency.charAt(e.field.length);

                       if (!ch || ch === "." || ch === "[") {
                            that.trigger("change", e);
                            break;
                       }
                    }
                }
            }
        },

        start: function() {
            if (this.observable) {
                this.source.bind("get", this._access);
            }
        },

        stop: function() {
            if (this.observable) {
                this.source.unbind("get", this._access);
            }
        },

        get: function() {
            var that = this,
                result = that.source;

            that.start();

            if (that.observable) {
                result = that.source.get(that.path);

                if (typeof result === "function") {
                    result = $.proxy(result, that.source);

                    result = result();
                }
            }

            that.stop();

            return result;
        },

        set: function(value) {
            this.source.set(this.path, value);
        },

        destroy: function() {
            if (this.observable) {
                this.source.unbind("change", this._change);
            }
        }
    });

    var EventBinding = Binding.extend( {
        get: function() {
            var source = this.source,
                handler = source.get(this.path);

            if (handler === undefined) {
                handler = this.root.get(this.path);
                source = this.root;
            }

            return $.proxy(handler, source);
        }
    });

    var TemplateBinding = Binding.extend( {
        init: function(root, source, path, template) {
            var that = this;

            Binding.fn.init.call(that, source, path);

            that.template = template;
        },

        render: function(value) {
            var html;

            this.start();

            html = kendo.render(this.template, value);

            this.stop();

            return html;
        }
    });

    var Binder = Class.extend({
        init: function(element, bindings, options) {
            this.element = element;
            this.bindings = bindings;
            this.options = options;
        },

        destroy: function() {
        }
    });

    var binders = {};

    binders.attr = Binder.extend({
        refresh: function(key) {
            this.element.setAttribute(key, this.bindings.attr[key].get());
        }
    });

    binders.style = Binder.extend({
        refresh: function(key) {
            this.element.style[key] = this.bindings.style[key].get();
        }
    });

    binders.enabled = Binder.extend({
        refresh: function() {
            if (this.bindings.enabled.get()) {
                this.element.removeAttribute("disabled");
            } else {
                this.element.setAttribute("disabled", "disabled");
            }
        }
    });

    binders.disabled = Binder.extend({
        refresh: function() {
            if (this.bindings.disabled.get()) {
                this.element.setAttribute("disabled", "disabled");
            } else {
                this.element.removeAttribute("disabled");
            }
        }
    });

    binders.events = Binder.extend({
        init: function(element, bindings, options) {
            Binder.fn.init.call(this, element, bindings, options);
            this.handlers = {};
        },

        refresh: function(key) {
            var binding = this.bindings.events[key],
                handler = this.handlers[key] = binding.get();

            $(this.element).bind(key, binding.source, handler);
        },

        destroy: function() {
            var element = $(this.element),
                handler;

            for (handler in this.handlers) {
                element.unbind(handler, this.handlers[handler]);
            }
        }
    });

    binders.text = Binder.extend({
        refresh: function() {
            this.element[innerText] = this.bindings["text"].get();
        }
    });

    binders.visible = Binder.extend({
        refresh: function() {
            if (this.bindings["visible"].get()) {
                this.element.style.display = "";
            } else {
                this.element.style.display = "none";
            }
        }
    });

    binders.invisible = Binder.extend({
        refresh: function() {
            if (!this.bindings["invisible"].get()) {
                this.element.style.display = "";
            } else {
                this.element.style.display = "none";
            }
        }
    });

    binders.html = Binder.extend({
        refresh: function() {
            this.element.innerHTML = this.bindings["html"].get();
        }
    });

    binders.value = Binder.extend({
        init: function(element, bindings, options) {
            Binder.fn.init.call(this, element, bindings, options);

            this._change = $.proxy(this.change, this);
            this.eventName = options.valueUpdate || "change";

            $(this.element).bind(this.eventName, this._change);
        },

        change: function() {
            this.bindings["value"].set(this.element.value);
        },

        refresh: function() {
            this.element.value = this.bindings["value"].get();
        },

        destroy: function() {
            $(this.element).unbind(this.eventName, this._change);
        }
    });

    binders.source = Binder.extend({
        init: function(element, bindings, options) {
            Binder.fn.init.call(this, element, bindings, options);

            var source = bindings["source"].get();
        },

        refresh: function(e) {
            var that = this,
                source = that.bindings.source.get();

            if (source instanceof ObservableArray) {
                e = e || {};

                if (e.action == "add") {
                    that.add(e.index, e.items);
                } else if (e.action == "remove") {
                    that.remove(e.index, e.items);
                } else if (e.action != "itemchange") {
                    that.render();
                }
            } else {
                that.render();
            }
        },

        container: function() {
            var element = this.element;

            if (element.nodeName.toLowerCase() == "table") {
                if (!element.tBodies[0]) {
                    element.appendChild(document.createElement("tbody"));
                }
                element = element.tBodies[0];
            }

            return element;
        },

        template: function() {
            var options = this.options,
                template = options.template,
                nodeName = this.container().nodeName.toLowerCase();

            if (!template) {
                if (nodeName == "select") {
                    if (options.valueField || options.textField) {
                        template = kendo.format('<option value="#:{0}#">#:{1}#</option>',
                            options.valueField || options.textField, options.textField || options.valueField);
                    } else {
                        template = "<option>#:data#</option>";
                    }
                } else if (nodeName == "tbody") {
                    template = "<tr><td>#:data#</td></tr>"
                } else if (nodeName == "ul" || nodeName == "ol") {
                    template = "<li>#:data#</li>"
                } else {
                    template = "#:data#";
                }

                template = kendo.template(template);
            }

            return template;
        },

        destroy: function() {
            var source = this.bindings.source.get();

            source.unbind("change", this._change);
        },

        add: function(index, items) {
            var element = this.container(),
                idx,
                length,
                child,
                clone = element.cloneNode(false),
                reference = element.children[index];

            $(clone).html(kendo.render(this.template(), items));

            if (clone.children.length) {
                for (idx = 0, length = items.length; idx < length; idx++) {
                    child = clone.children[0];
                    element.insertBefore(child, reference || null);
                    if (this.bindings.template) {
                        bindElement(child, this.bindings.source.root, items[idx]);
                    } else {
                        bindElement(child, items[idx]);
                    }
                }
            }
        },

        remove: function(index, items) {
            var idx,
            element = this.container();

            for (idx = 0; idx < items.length; idx++) {
                element.removeChild(element.children[index]);
            }
        },

        render: function() {
            var source = this.bindings["source"].get();
            var idx, length;
            var element = this.container();
            var template = this.template();

            if (!(source instanceof ObservableArray) && toString.call(source) !== "[object Array]") {
                source = new ObservableArray([source]);
            }

            if (this.bindings.template) {
                $(element).html(this.bindings.template.render(source));

                if (element.children.length) {
                    for (idx = 0, length = source.length; idx < length; idx++) {
                        bindElement(element.children[idx], this.bindings.source.root, source[idx]);
                    }
                }
            }
            else {
                $(element).html(kendo.render(template, source));
            }
        }
    });

    binders.input = {
        checked: Binder.extend({
            init: function(element, bindings, options) {
                Binder.fn.init.call(this, element, bindings, options);
                this._change = $.proxy(this.change, this);

                $(this.element).change(this._change);
            },
            change: function() {
                var element = this.element;
                var value = this.value();

                if (element.type == "radio") {
                    this.bindings["checked"].set(value);
                } else if (element.type == "checkbox") {
                    var source = this.bindings["checked"].get();
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
                        this.bindings["checked"].set(value);
                    }
                }
            },

            refresh: function() {
                var value = this.bindings["checked"].get();
                var element = this.element;

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
            },

            value: function() {
                var element = this.element;
                var value = element.value;

                if (element.type == "checkbox") {
                    if (value == "on" || value == "off") {
                        value = element.checked;
                    }
                }

                return value;
            },
            destroy: function() {
                $(this.element).unbind("change", this._change);
            }
        })
    }

    binders.select = {
        value: Binder.extend({
            init: function(target, bindings, options) {
                Binder.fn.init.call(this, target, bindings, options);

                this._change = $.proxy(this.change, this);
                $(this.element).change(this._change);
            },

            change: function() {
                var values = [],
                    element = this.element,
                    source,
                    field = this.options.valueField || this.options.textField,
                    option, value,
                    idx,
                    length;

                for (idx = 0, length = element.options.length; idx < length; idx++) {
                    option = element.options[idx];

                    if (option.selected) {
                        value = option.attributes.value;

                        if (value && value.specified) {
                            value = option.value;
                        } else {
                            value = option.text;
                        }

                        values.push(value);
                    }
                }

                if (field) {
                    source = this.bindings.source.get();
                    for (var valueIndex = 0; valueIndex < values.length; valueIndex++) {
                        for (idx = 0, length = source.length; idx < length; idx++) {
                            if (source[idx].get(field) == values[valueIndex]) {
                                values[valueIndex] = source[idx];
                                break;
                            }
                        }
                    }
                }

                var value = this.bindings["value"].get();
                if (value instanceof ObservableArray) {
                    value.splice.apply(value, [0, value.length].concat(values));
                } else if (value instanceof ObservableObject || !field) {
                    this.bindings["value"].set(values[0]);
                } else {
                    this.bindings["value"].set(values[0].get(field));
                }
            },
            refresh: function() {
                var optionIndex,
                    element = this.element,
                    options = element.options,
                    value = this.bindings["value"].get(),
                    values = value,
                    field = this.options.valueField || this.options.textField,
                    optionValue;

                if (!(values instanceof ObservableArray)) {
                    values = new ObservableArray([value]);
                }

                for (var valueIndex = 0; valueIndex < values.length; valueIndex++) {
                    value = values[valueIndex];

                    if (field && value instanceof ObservableObject) {
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
            },
            destroy: function() {
                $(this.element).unbind("change", this._change);
            }
        })
    }

    binders.widget = {
        events : Binder.extend({
            init: function(widget, bindings, options) {
                Binder.fn.init.call(this, widget.element[0], bindings, options);
                this.widget = widget;
                this.handlers = {};
            },

            refresh: function(key) {
                var binding = this.bindings.events[key],
                    handler = this.handlers[key] = binding.get();

                this.widget.bind(key, handler);
            },

            destroy: function() {
                var handler;

                for (handler in this.handlers) {
                    this.element.unbind(handler, this.handlers[handler]);
                }
            }
        }),

        checked: Binder.extend({
            init: function(widget, bindings, options) {
                Binder.fn.init.call(this, widget.element[0], bindings, options);

                this.widget = widget;
                this._change = $.proxy(this.change, this);
                this.widget.bind("change", this._change);
            },
            change: function() {
                this.bindings["checked"].set(this.value());
            },

            refresh: function() {
                this.widget.check(this.bindings["checked"].get() === true);
            },

            value: function() {
                var element = this.element,
                    value = element.value;

                if (value == "on" || value == "off") {
                    value = element.checked;
                }

                return value;
            },

            destroy: function() {
                this.widget.unbind("change", this._change);
            }
        }),

        enabled: Binder.extend({
            init: function(widget, bindings, options) {
                Binder.fn.init.call(this, widget.element[0], bindings, options);

                this.widget = widget;
            },

            refresh: function() {
                if (this.widget.enable) {
                    this.widget.enable(this.bindings.enabled.get());
                }
            }
        }),

        disabled: Binder.extend({
            init: function(widget, bindings, options) {
                Binder.fn.init.call(this, widget.element[0], bindings, options);

                this.widget = widget;
            },

            refresh: function() {
                if (this.widget.enable) {
                    this.widget.enable(!this.bindings.disabled.get());
                }
            }
        }),

        source: Binder.extend({
            init: function(widget, bindings, options) {
                Binder.fn.init.call(this, widget.element[0], bindings, options);

                this.widget = widget;
                this._dataBinding = $.proxy(this.dataBinding, this);
                this._dataBound = $.proxy(this.dataBound, this);
            },

            dataBinding: function() {
                var idx,
                    length,
                    widget = this.widget,
                    items = widget.items();

                for (idx = 0, length = items.length; idx < length; idx++) {
                    unbindElementTree(items[idx]);
                }
            },

            dataBound: function() {
                var idx,
                    length,
                    widget = this.widget,
                    items = widget.items(),
                    dataSource = widget.dataSource,
                    view = dataSource.view(),
                    groups = dataSource.group() || [];

                if (items.length) {
                    if (groups.length) {
                        view = flattenGroups(view);
                    }

                    for (idx = 0, length = view.length; idx < length; idx++) {
                        bindElement(items[idx], this.bindings.source.root, view[idx]);
                    }
                }
            },

            refresh: function(e) {
                var that = this,
                    widget = that.widget;

                e = e || {};

                if (!e.action) {
                    that.destroy();

                    widget.bind("dataBinding", that._dataBinding);
                    widget.bind("dataBound", that._dataBound);

                    if (widget.dataSource instanceof kendo.data.DataSource) {
                        var source = this.bindings.source.get();
                        if (source instanceof kendo.data.DataSource) {
                            widget.setDataSource(source);
                        } else {
                            widget.dataSource.data(source);
                        }
                    }
                }
            },

            destroy: function() {
                var widget = this.widget;

                widget.unbind("dataBinding", this._dataBinding);
                widget.unbind("dataBound", this._dataBound);
            }
        }),

        value: Binder.extend({
            init: function(widget, bindings, options) {
                Binder.fn.init.call(this, widget.element[0], bindings, options);

                this.widget = widget;
                this._change = $.proxy(this.change, this);
                this.widget.bind("change", this._change);

                var value = this.bindings.value.get();
                this._valueIsObservableObject = value === undefined || value === null || value instanceof ObservableObject;
            },

            change: function() {
                var value = this.widget.value();
                var idx, length;

                var field = this.options.dataValueField || this.options.dataTextField;

                if (field) {
                    var source,
                        isObservableObject = this._valueIsObservableObject;

                    if (this.bindings.source) {
                        source = this.bindings.source.get();
                    } else {
                        source = this.widget.dataSource.view();
                    }

                    for (idx = 0, length = source.length; idx < length; idx++) {
                        if (source[idx].get(field) == value) {
                            if (isObservableObject) {
                                value = source[idx];
                            } else {
                                value = source[idx].get(field);
                            }
                            break;
                        }
                    }
                }

                this.bindings.value.set(value);
            },

            refresh: function() {
                var field = this.options.dataValueField || this.options.dataTextField;
                var value = this.bindings.value.get();

                if (field && value instanceof ObservableObject) {
                    value = value.get(field);
                }

                this.widget.value(value);
            },

            destroy: function() {
                this.widget.unbind("change", this._change);
            }
        })
    };

    var BindingTarget = Class.extend( {
        init: function(target, options) {
            this.target = target;
            this.options = options;
            this.toDestroy = [];
        },

        bind: function(bindings) {
            var that = this,
                nodeName = this.target.nodeName.toLowerCase(),
                key,
                specificBinders = binders[nodeName] || {};

            for (key in bindings) {
                this.applyBinding(key, bindings, specificBinders);
            }
        },

        applyBinding: function(name, bindings, specificBinders) {
            var binder = specificBinders[name] || binders[name],
                toDestroy = this.toDestroy,
                binding = bindings[name];

            if (binder) {
                binder = new binder(this.target, bindings, this.options);

                toDestroy.push(binder);

                if (binding instanceof Binding) {
                    binding.bind("change", function(e){
                        binder.refresh(e);
                    });
                    binder.refresh();
                    toDestroy.push(binding);
                } else {
                    for (var attribute in binding) {
                        (function(attribute) {
                            binding[attribute].bind("change", function() {
                                binder.refresh(attribute);
                            });
                        })(attribute);
                        binder.refresh(attribute);
                        toDestroy.push(binding[attribute])
                    }
                }
            } else if (name !== "template") {
                throw new Error("The " + name + " binding is not supported by the " + this.target.nodeName.toLowerCase() + " element");
            }
        },

        destroy: function() {
            var idx,
                length,
                toDestroy = this.toDestroy;


            for (idx = 0, length = toDestroy.length; idx < length; idx++) {
                toDestroy[idx].destroy();
            }
        }
    });

    var WidgetBindingTarget = BindingTarget.extend( {
        bind: function(bindings) {
            var that = this,
                binding,
                hasValue = false,
                hasSource = false;

            for (binding in bindings) {
                if (binding == "value") {
                    hasValue = true;
                } else if (binding == "source") {
                    hasSource = true;
                } else {
                    this.applyBinding(binding, bindings);
                }
            }

            if (hasSource) {
                this.applyBinding("source", bindings);
            }

            if (hasValue) {
                this.applyBinding("value", bindings);
            }
        },

        applyBinding: function(name, bindings) {
            var binder = binders.widget[name],
                toDestroy = this.toDestroy,
                binding = bindings[name];

            if (binder) {
                binder = new binder(this.target, bindings, this.target.options);

                toDestroy.push(binder);


                if (binding instanceof Binding) {
                    binding.bind("change", function(e) {
                        binder.refresh(e);
                    });

                    binder.refresh();

                    toDestroy.push(binding);
                } else {
                     for (var attribute in binding) {
                        (function(attribute) {
                            binding[attribute].bind("change", function() {
                                binder.refresh(attribute);
                            });
                        })(attribute);
                        binder.refresh(attribute);
                        toDestroy.push(binding[attribute])
                    }

                }
            } else {
                throw new Error("The " + name + " binding is not supported by the " + this.target.options.name + " widget");
            }
        }
    });

    function flattenGroups(data) {
        var idx, lenght, result = [];

        for (idx = 0, length = data.length; idx < length; idx++) {
            if (data[idx].hasSubgroups) {
                result = result.concat(flattenGroups(data[idx].items));
            } else {
                result = result.concat(data[idx].items);
            }
        }
        return result;
    }

    function bindingTargetForRole(role, element, namespace) {
        var type = namespace.roles[role];

        if (type) {
            return new WidgetBindingTarget(kendo.initWidget(element, type.options, namespace));
        }
    }

    var keyValueRegExp = /\w+:({([^}]*)}|[^,}]+)/g;
    var whiteSpaceRegExp = /\s/g;

    function parseBindings(bind) {
        var result = {},
            idx,
            length,
            token,
            colonIndex,
            key,
            value,
            tokens;

        tokens = bind.match(keyValueRegExp);

        for (idx = 0, length = tokens.length; idx < length; idx++) {
            token = tokens[idx];
            colonIndex = token.indexOf(":");

            key = token.substring(0, colonIndex);
            value = token.substring(colonIndex + 1);

            if (value.charAt(0) == "{") {
                value = parseBindings(value);
            }

            result[key] = value;
        }

        return result;
    }

    function createBindings(bindings, root, source, type) {
        var binding,
            result = {};

        for (binding in bindings) {
            result[binding] = new type(root, source, bindings[binding]);
        }

        return result;
    }

    function bindElement(element, root, source, namespace) {
        var role = element.getAttribute("data-" + kendo.ns + "role"),
            idx,
            length,
            bind = element.getAttribute("data-" + kendo.ns + "bind"),
            children = element.children,
            deep = true,
            bindings,
            options = {},
            target;

        if (!namespace) {
            namespace = kendo.ui;
        }

        if (role || bind) {
            unbindElement(element);
        }

        if (role) {
            target = bindingTargetForRole(role, element, namespace);
        }

        if (bind) {
            bind = parseBindings(bind.replace(whiteSpaceRegExp, ""));

            if (!target) {
                options = kendo.parseOptions(element, { textField: "", valueField: "", template: "", valueUpdate: "change" });
                target = new BindingTarget(element, options);
            }

            target.source = source;

            bindings = createBindings(bind, root, source, Binding);

            if (options.template) {
                bindings.template = new TemplateBinding(root, source, "", options.template);
            }

            if (bindings.click) {
                bind.events = bind.events || {};
                bind.events.click = bind.click;
                delete bindings.click;
            }

            if (bindings.source) {
                deep = false;
            }

            if (bind.attr) {
                bindings.attr = createBindings(bind.attr, root, source, Binding);
            }

            if (bind.style) {
                bindings.style = createBindings(bind.style, root, source, Binding);
            }

            if (bind.events) {
                bindings.events = createBindings(bind.events, root, source, EventBinding);
            }

            target.bind(bindings);
        }

        if (target) {
            element.kendoBindingTarget = target;
        }

        if (deep && children) {
            for (idx = 0; idx < children.length; idx++) {
                bindElement(children[idx], root, source, namespace);
            }
        }
    }

    function bind(dom, object, namespace) {
        var idx, length;

        object = kendo.observable(object);
        dom = $(dom);

        for (idx = 0, length = dom.length; idx < length; idx++ ) {
            bindElement(dom[idx], object, object, namespace);
        }
    }

    function unbindElement(element) {
        var bindingTarget = element.kendoBindingTarget;

        if (bindingTarget) {
            bindingTarget.destroy();

            if ($.support.deleteExpando) {
                delete element.kendoBindingTarget;
            } else if (element.removeAttribute) {
                element.removeAttribute("kendoBindingTarget");
            } else {
                element.kendoBindingTarget = null;
            }
        }
    }

    function unbindElementTree(element) {
        var idx,
            length,
            children = element.children;

        unbindElement(element);

        if (children) {
            for (idx = 0, length = children.length; idx < length; idx++) {
                unbindElementTree(children[idx]);
            }
        }
    }

    function unbind(dom) {
        var idx, length;

        dom = $(dom);

        for (idx = 0, length = dom.length; idx < length; idx++ ) {
            unbindElementTree(dom[idx]);
        }
    }

    function notify(widget, namespace) {
        var element = widget.element,
            bindingTarget = element[0].kendoBindingTarget;

        if (bindingTarget) {
            bind(element, bindingTarget.source, namespace);
        }
    }

    kendo.unbind = unbind;
    kendo.bind = bind;
    kendo.data.binders = binders;
    kendo.data.Binder = Binder;
    kendo.notify = notify;

    kendo.observable = function(object) {
        if (!(object instanceof ObservableObject)) {
            object = new ObservableObject(object);
        }

        return object;
    };

})(jQuery);
