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
            if (!e.isDefaultPrevented()) {
                var dependency;

                for (dependency in this.dependencies) {
                    if (dependency.indexOf(e.field) == 0) {
                        this.trigger("change");
                        break;
                    }
                }
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

                    result = result();
                }
            }

            this.stop();

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

    var EventBinding = Binding.extend( {
        get: function() {
            return $.proxy(this.source.get(this.path), this.source);
        }
    });

    var TemplateBinding = Binding.extend( {
        init: function(source, path, template) {
            var that = this;

            Binding.fn.init.call(that, source, path);

            that.template = template;
        },

        invoke: function(value) {
            var html;

            this.start();

            html = this.template(value);

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
        update: function() {
            var attribute, attributes = this.bindings.attr;

            for (attribute in attributes) {
                this.element.setAttribute(attribute, attributes[attribute].get());
            }
        }
    });

    binders.style = Binder.extend({
        update: function() {
            var key, style = this.bindings.style;

            for (key in style) {
                this.element.style[key] = style[key].get();
            }
        }
    });

    binders.enabled = Binder.extend({
        update: function() {
            if (this.bindings.enabled.get()) {
                this.element.removeAttribute("disabled");
            } else {
                this.element.setAttribute("disabled", "disabled");
            }
        }
    });

    binders.disabled = Binder.extend({
        update: function() {
            if (this.bindings.disabled.get()) {
                this.element.setAttribute("disabled", "disabled");
            } else {
                this.element.removeAttribute("disabled");
            }
        }
    });

    binders.event = Binder.extend({
        update: function() {
            var event, events = this.bindings.event;

            for (event in events) {
                $(this.element).bind(event, events[event].get());
            }
        }
    });

    binders.click = Binder.extend({
        update: function() {
            $(this.element).click(this.bindings.click.get());
        }
    });

    binders.text = Binder.extend({
        update: function() {
            this.element[innerText] = this.bindings["text"].get();
        }
    });

    binders.visible = Binder.extend({
        update: function() {
            if (this.bindings["visible"].get()) {
                this.element.style.display = "";
            } else {
                this.element.style.display = "none";
            }
        }
    });

    binders.template = Binder.extend({
        update: function() {
            this.element.innerHTML = this.bindings.template.invoke(this.bindings.template.get());
        }
    });

    binders.html = Binder.extend({
        update: function() {
            this.element.innerHTML = this.bindings["html"].get();
        }
    });

    binders.value = Binder.extend({
        init: function(element, bindings, options) {
            Binder.fn.init.call(this, element, bindings, options);

            this._change = $.proxy(this.change, this);
            $(this.element).change(this._change)
        },

        change: function() {
            this.bindings["value"].set(this.element.value);
        },

        update: function() {
            this.element.value = this.bindings["value"].get();
        },

        destroy: function() {
            $(this.element).unbind("change", this._change);
        }
    });

    binders.source = Binder.extend({
        init: function(element, bindings, options) {
            Binder.fn.init.call(this, element, bindings, options);

            var source = bindings["source"].get(),
                that = this;

            that._change = $.proxy(that.change, that);
            source.bind(0, "change", that._change)
        },

        change: function(e) {
            e.preventDefault();

            if (e.action == "add") {
                this.add(e.index, kendo.render(this.template(), e.items));
            } else if (e.action == "remove") {
                this.remove(e.index, e.items.length);
            }
        },

        template: function() {
            var options = this.options,
                template = options.template,
                nodeName = this.element.nodeName.toLowerCase();

            if (!template) {
                if (nodeName == "select") {
                    if (options.valueField) {
                        template = kendo.format('<option value="#:{0}#">#:{1}#</option>',
                        options.valueField, options.textField || options.valueField);
                    } else {
                        template = "<option>#:data#</option>";
                    }
                } else if (nodeName == "table") {
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

        add: function(index, html) {
            var clone = this.element.cloneNode(false),
            reference = this.element.children[index];

            $(clone).html(html);

            if (reference) {
                while (clone.firstChild) {
                    this.element.insertBefore(clone.firstChild, reference);
                }
            } else {
                while (clone.firstChild) {
                    this.element.appendChild(clone.firstChild);
                }
            }
        },

        remove: function(index, length) {
            var idx;

            for (idx = 0; idx < length; idx++) {
                this.element.removeChild(this.element.children[index]);
            }
        },

        update: function() {
            var source = this.bindings["source"].get();
            var idx, length;
            var element = this.element;
            var template = this.template();

            if (element.nodeName.toLowerCase() == "table") {
                if (!element.tBodies[0]) {
                    element.appendChild(document.createElement("tbody"));
                }
                element = element.tBodies[0];
            }

            $(element).html(kendo.render(template, source));

            if (element.children.length) {
                for (idx = 0, length = source.length; idx < length; idx++) {
                    bindElement(element.children[idx], source[idx]);
                }
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

            update: function() {
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
                    source = this.bindings.source.get(),
                    field = this.options.valueField || this.options.textField,
                    idx,
                    length;

                for (idx = 0, length = element.options.length; idx < length; idx++) {
                    if (element.options[idx].selected) {
                        values.push(element.options[idx].value || element.options[idx].text);
                    }
                }
                if (field) {
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
                } else {
                    this.bindings["value"].set(values[0]);
                }
            },
            update: function() {
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
            },
            destroy: function() {
                $(this.element).unbind("change", this._change);
            }
        })
    }

    binders.widget = {
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
                        bindElement(items[idx], view[idx]);
                    }
                }
            },

            update: function() {
                var widget = this.widget;

                widget.bind("dataBinding", this._dataBinding);

                widget.bind("dataBound", this._dataBound);

                widget.dataSource.data(this.bindings.source.get());
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
            },

            change: function() {
                var value = this.widget.value();
                var idx, length;

                var field = this.options.valueField || this.options.textField;

                if (field) {
                    var source = this.bindings.source.get();

                    for (idx = 0, length = source.length; idx < length; idx++) {
                        if (source[idx].get(field) == value) {
                            value = source[idx];
                            break;
                        }
                    }
                }

                this.bindings.value.set(value);
            },

            update: function() {
                var field = this.options.valueField || this.options.textField;
                var value = this.bindings.value.get();

                if (field) {
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
        init: function(target) {
            this.target = target;
            this.options = {};
            this.binders = [];
            this.bindings = [];
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
                this.applyBinding(key, bindings, specificBinders);
            }
        },

        applyBinding: function(name, bindings, specificBinders) {
            var binder = specificBinders[name] || binders[name],
                binding = bindings[name];

            if (binder) {
                binder = new binder(this.target, bindings, this.options);

                this.binders.push(binder);

                var update = function() {
                    binder.update();
                };

                update();

                if (name == "attr" || name == "event" || name == "style") {
                    for (var attribute in binding) {
                        binding[attribute].bind("change", update);
                        this.bindings.push(binding[attribute])
                    }
                } else {
                    binding.bind("change", update);
                    this.bindings.push(binding);
                }
            }
        },

        configuration: function() {
            return {
                options: ["textField", "valueField"]
            };
        },

        destroy: function() {
            var idx, length;


            for (idx = 0, length = this.binders.length; idx < length; idx++) {
                this.binders[idx].destroy();
            }

            for (idx = 0, length = this.bindings.length; idx < length; idx++) {
                this.bindings[idx].destroy();
            }
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

        bind: function(bindings) {
            var that = this, hasValue = false, hasSource = false;

            var specificBinders = binders.widget;

            for (var key in bindings) {
                if (key == "value") {
                    hasValue = true;
                    continue;
                }

                if (key == "source") {
                    hasSource = true;
                    continue;
                }

                this.applyBinding(key, bindings);
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
            binding = bindings[name];

            if (binder) {
                binder = new binder(this.target, bindings, this.options);

                this.binders.push(binder);

                var update = function() {
                    binder.update();
                };

                update();

                binding.bind("change", update);

                this.bindings.push(binding);
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
                attributes[$.trim(keyValuePair[0])] = $.trim(keyValuePair[1]);
            }
        }
    }

    function bindElement(element, source) {
        var role = element.getAttribute("data-" + kendo.ns+ "role"),
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
                target = new BindingTarget(element);
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

            for (path in bind) {
                sourcePath = bind[path];

                bindings[path] = new Binding(source, sourcePath);
            }

            if (bindings.template) {
                bindings.template = new TemplateBinding(source, "", options.template);
            }

            if (bindings.click) {
                bindings.click = new EventBinding(source, bind.click);
            }

            if (bindings.source) {
                deep = false;
                delete bindings.template;
            }

            if (bind.attr) {
                bindings.attr = {
                };

                for (path in bind.attr) {
                    bindings.attr[path] = new Binding(source, bind.attr[path]);
                }
            }

            if (bind.style) {
                bindings.style = {
                };

                for (path in bind.style) {
                    bindings.style[path] = new Binding(source, bind.style[path]);
                }
            }
            if (bind.event) {
                bindings.event = {
                };
                for (path in bind.event) {
                    bindings.event[path] = new EventBinding(source, bind.event[path]);
                }
            }

            target.bind(bindings);
        }

        if (target) {
            $.data(element, "kendoBindingTarget", target);
        }

        if (deep && element.children) {
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

    function notify(widget) {
        var element = widget.element;
        var bindingTarget = element.data("kendoBindingTarget");

        if (bindingTarget) {
            bind(element, bindingTarget.source);
        }
    }

    kendo.unbind = unbind;
    kendo.bind = bind;
    kendo.data.binders = binders;
    kendo.notify = notify;

    kendo.observable = function(object) {
        if (!(object instanceof ObservableObject)) {
            object = new ObservableObject(object);
        }

        return object;
    };

})(jQuery);
