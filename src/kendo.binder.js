(function(f, define){
    define([ "./kendo.core", "./kendo.data" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "binder",
    name: "MVVM",
    category: "framework",
    description: "Model View ViewModel (MVVM) is a design pattern which helps developers separate the Model (the data) from the View (the UI).",
    depends: [ "core", "data" ]
};

/*jshint eqnull: true */
(function ($, undefined) {
    var kendo = window.kendo,
        Observable = kendo.Observable,
        ObservableObject = kendo.data.ObservableObject,
        ObservableArray = kendo.data.ObservableArray,
        toString = {}.toString,
        binders = {},
        Class = kendo.Class,
        proxy = $.proxy,
        VALUE = "value",
        SOURCE = "source",
        EVENTS = "events",
        CHECKED = "checked",
        CSS = "css",
        deleteExpando = true,
        FUNCTION = "function",
        CHANGE = "change";

    (function() {
        var a = document.createElement("a");

        try {
            delete a.test;
        } catch(e) {
            deleteExpando = false;
        }
    })();

    var Binding = Observable.extend( {
        init: function(parents, path) {
            var that = this;

            Observable.fn.init.call(that);

            that.source = parents[0];
            that.parents = parents;
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

                that.source.bind(CHANGE, that._change);
            }
        },

        _parents: function() {
            var parents = this.parents;
            var value = this.get();

            if (value && typeof value.parent == "function") {
                var parent = value.parent();

                if ($.inArray(parent, parents) < 0) {
                    parents = [parent].concat(parents);
                }
            }

            return parents;
        },

        change: function(e) {
            var dependency,
                ch,
                field = e.field,
                that = this;

            if (that.path === "this") {
                that.trigger(CHANGE, e);
            } else {
                for (dependency in that.dependencies) {
                    if (dependency.indexOf(field) === 0) {
                       ch = dependency.charAt(field.length);

                       if (!ch || ch === "." || ch === "[") {
                            that.trigger(CHANGE, e);
                            break;
                       }
                    }
                }
            }
        },

        start: function(source) {
            source.bind("get", this._access);
        },

        stop: function(source) {
            source.unbind("get", this._access);
        },

        get: function() {

            var that = this,
                source = that.source,
                index = 0,
                path = that.path,
                result = source;

            if (!that.observable) {
                return result;
            }

            that.start(that.source);

            result = source.get(path);

            // Traverse the observable hierarchy if the binding is not resolved at the current level.
            while (result === undefined && source) {

                source = that.parents[++index];

                if (source instanceof ObservableObject) {
                    result = source.get(path);
                }
            }

            // second pass try to get the parent from the object hierarchy
            if (result === undefined) {
                source = that.source; //get the initial source

                while (result === undefined && source) {
                    source = source.parent();

                    if (source instanceof ObservableObject) {
                        result = source.get(path);
                    }
                }
            }

            // If the result is a function - invoke it
            if (typeof result === "function") {
                index = path.lastIndexOf(".");

                // If the function is a member of a nested observable object make that nested observable the context (this) of the function
                if (index > 0) {
                    source = source.get(path.substring(0, index));
                }

                // Invoke the function
                that.start(source);

                if (source !== that.source) {
                    result = result.call(source, that.source);
                } else {
                    result = result.call(source);
                }

                that.stop(source);
            }

            // If the binding is resolved by a parent object
            if (source && source !== that.source) {

                that.currentSource = source; // save parent object

                // Listen for changes in the parent object
                source.unbind(CHANGE, that._change)
                      .bind(CHANGE, that._change);
            }

            that.stop(that.source);

            return result;
        },

        set: function(value) {
            var source = this.currentSource || this.source;

            var field = kendo.getter(this.path)(source);

            if (typeof field === "function") {
                if (source !== this.source) {
                    field.call(source, this.source, value);
                } else {
                    field.call(source, value);
                }
            } else {
                source.set(this.path, value);
            }
        },

        destroy: function() {
            if (this.observable) {
                this.source.unbind(CHANGE, this._change);
                if(this.currentSource) {
                    this.currentSource.unbind(CHANGE, this._change);
                }
            }

            this.unbind();
        }
    });

    var EventBinding = Binding.extend( {
        get: function() {
            var source = this.source,
                path = this.path,
                index = 0,
                handler;

            handler = source.get(path);

            while (!handler && source) {
                source = this.parents[++index];

                if (source instanceof ObservableObject) {
                    handler = source.get(path);
                }
            }

            return proxy(handler, source);
        }
    });

    var TemplateBinding = Binding.extend( {
        init: function(source, path, template) {
            var that = this;

            Binding.fn.init.call(that, source, path);

            that.template = template;
        },

        render: function(value) {
            var html;

            this.start(this.source);

            html = kendo.render(this.template, value);

            this.stop(this.source);

            return html;
        }
    });

    var Binder = Class.extend({
        init: function(element, bindings, options) {
            this.element = element;
            this.bindings = bindings;
            this.options = options;
        },

        bind: function(binding, attribute) {
            var that = this;

            binding = attribute ? binding[attribute] : binding;

            binding.bind(CHANGE, function(e) {
                that.refresh(attribute || e);
            });

            that.refresh(attribute);
        },

        destroy: function() {
        }
    });

    var TypedBinder = Binder.extend({
        dataType: function() {
            var dataType = this.element.getAttribute("data-type") || this.element.type || "text";
            return dataType.toLowerCase();
        },

        parsedValue: function() {
            return this._parseValue(this.element.value, this.dataType());
        },

        _parseValue: function (value, dataType){
            if (dataType == "date") {
                value = kendo.parseDate(value, "yyyy-MM-dd");
            } else if (dataType == "datetime-local") {
                value = kendo.parseDate(value, ["yyyy-MM-ddTHH:mm:ss", "yyyy-MM-ddTHH:mm"] );
            } else if (dataType == "number") {
                value = kendo.parseFloat(value);
            } else if (dataType == "boolean"){
                value = value.toLowerCase();
                if(kendo.parseFloat(value) !== null){
                    value = Boolean(kendo.parseFloat(value));
                }else{
                    value = (value.toLowerCase() === "true");
                }
            }
            return value;
        }
    });

    binders.attr = Binder.extend({
        refresh: function(key) {
            this.element.setAttribute(key, this.bindings.attr[key].get());
        }
    });

    binders.css = Binder.extend({
        init: function(element, bindings, options) {
            Binder.fn.init.call(this, element, bindings, options);
            this.classes = {};
        },
        refresh: function(className) {
            var element = $(this.element),
                binding = this.bindings.css[className],
                hasClass = this.classes[className] = binding.get();
            if(hasClass){
                element.addClass(className);
            }else{
                element.removeClass(className);
            }
        }
    });

    binders.style = Binder.extend({
        refresh: function(key) {
            this.element.style[key] = this.bindings.style[key].get() || "";
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

    binders.readonly = Binder.extend({
       refresh: function() {
            if (this.bindings.readonly.get()) {
                this.element.setAttribute("readonly", "readonly");
            } else {
                this.element.removeAttribute("readonly");
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
            var element = $(this.element),
                binding = this.bindings.events[key],
                handler = this.handlers[key];

            if (handler) {
                element.off(key, handler);
            }

            handler = this.handlers[key] = binding.get();

            element.on(key, binding.source, handler);
        },

        destroy: function() {
            var element = $(this.element),
                handler;

            for (handler in this.handlers) {
                element.off(handler, this.handlers[handler]);
            }
        }
    });

    binders.text = Binder.extend({
        refresh: function() {
            var text = this.bindings.text.get();
            var dataFormat = this.element.getAttribute("data-format") || "";
            if (text == null) {
                text = "";
            }

            $(this.element).text(kendo.toString(text, dataFormat));
        }
    });

    binders.visible = Binder.extend({
        refresh: function() {
            if (this.bindings.visible.get()) {
                this.element.style.display = "";
            } else {
                this.element.style.display = "none";
            }
        }
    });

    binders.invisible = Binder.extend({
        refresh: function() {
            if (!this.bindings.invisible.get()) {
                this.element.style.display = "";
            } else {
                this.element.style.display = "none";
            }
        }
  });

    binders.html = Binder.extend({
        refresh: function() {
            this.element.innerHTML = this.bindings.html.get();
        }
    });

    binders.value = TypedBinder.extend({
        init: function(element, bindings, options) {
            TypedBinder.fn.init.call(this, element, bindings, options);

            this._change = proxy(this.change, this);
            this.eventName = options.valueUpdate || CHANGE;

            $(this.element).on(this.eventName, this._change);

            this._initChange = false;
        },

        change: function() {
            this._initChange = this.eventName != CHANGE;

            this.bindings[VALUE].set(this.parsedValue());

            this._initChange = false;
        },

        refresh: function() {
            if (!this._initChange) {
                var value = this.bindings[VALUE].get();

                if (value == null) {
                    value = "";
                }

                var type = this.dataType();

                if (type == "date") {
                    value = kendo.toString(value, "yyyy-MM-dd");
                } else if (type == "datetime-local") {
                    value = kendo.toString(value, "yyyy-MM-ddTHH:mm:ss");
                }

                this.element.value = value;
            }

            this._initChange = false;
        },

        destroy: function() {
            $(this.element).off(this.eventName, this._change);
        }
    });

    binders.source = Binder.extend({
        init: function(element, bindings, options) {
            Binder.fn.init.call(this, element, bindings, options);

            var source = this.bindings.source.get();

            if (source instanceof kendo.data.DataSource && options.autoBind !== false) {
                source.fetch();
            }
        },

        refresh: function(e) {
            var that = this,
                source = that.bindings.source.get();

            if (source instanceof ObservableArray || source instanceof kendo.data.DataSource) {
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
                    template = "<tr><td>#:data#</td></tr>";
                } else if (nodeName == "ul" || nodeName == "ol") {
                    template = "<li>#:data#</li>";
                } else {
                    template = "#:data#";
                }
                template = kendo.template(template);
            }

            return template;
        },

        add: function(index, items) {
            var element = this.container(),
                parents,
                idx,
                length,
                child,
                clone = element.cloneNode(false),
                reference = element.children[index];

            $(clone).html(kendo.render(this.template(), items));

            if (clone.children.length) {
                parents = this.bindings.source._parents();

                for (idx = 0, length = items.length; idx < length; idx++) {
                    child = clone.children[0];
                    element.insertBefore(child, reference || null);
                    bindElement(child, items[idx], this.options.roles, [items[idx]].concat(parents));
                }
            }
        },

        remove: function(index, items) {
            var idx, element = this.container();

            for (idx = 0; idx < items.length; idx++) {
                var child = element.children[index];
                unbindElementTree(child, true);
                if (child.parentNode == element) {
                    element.removeChild(child);
                }
            }
        },

        render: function() {
            var source = this.bindings.source.get(),
                parents,
                idx,
                length,
                element = this.container(),
                template = this.template();

            if (source == null) {
                return;
            }

            if (source instanceof kendo.data.DataSource) {
                source = source.view();
            }

            if (!(source instanceof ObservableArray) && toString.call(source) !== "[object Array]") {
                source = [source];
            }

            if (this.bindings.template) {
                unbindElementChildren(element, true);

                $(element).html(this.bindings.template.render(source));

                if (element.children.length) {
                    parents = this.bindings.source._parents();

                    for (idx = 0, length = source.length; idx < length; idx++) {
                        bindElement(element.children[idx], source[idx], this.options.roles, [source[idx]].concat(parents));
                    }
                }
            } else {
                $(element).html(kendo.render(template, source));
            }
        }
    });

    binders.input = {
        checked: TypedBinder.extend({
            init: function(element, bindings, options) {
                TypedBinder.fn.init.call(this, element, bindings, options);
                this._change = proxy(this.change, this);

                $(this.element).change(this._change);
            },

            change: function() {
                var element = this.element;
                var value = this.value();

                if (element.type == "radio") {
                    value = this.parsedValue();
                    this.bindings[CHECKED].set(value);
                } else if (element.type == "checkbox") {
                    var source = this.bindings[CHECKED].get();
                    var index;

                    if (source instanceof ObservableArray) {
                        value = this.parsedValue();
                        if (value instanceof Date) {
                            for(var i = 0; i < source.length; i++){
                                if(source[i] instanceof Date && +source[i] === +value){
                                    index = i;
                                    break;
                                }
                            }
                        }else{
                            index = source.indexOf(value);
                        }
                        if (index > -1) {
                            source.splice(index, 1);
                        } else {
                            source.push(value);
                        }
                    } else {
                        this.bindings[CHECKED].set(value);
                    }
                }
            },

            refresh: function() {
                var value = this.bindings[CHECKED].get(),
                    source = value,
                    type = this.dataType(),
                    element = this.element;

                if (element.type == "checkbox") {
                    if (source instanceof ObservableArray) {
                        var index = -1;
                        value = this.parsedValue();
                        if(value instanceof Date){
                            for(var i = 0; i < source.length; i++){
                                if(source[i] instanceof Date && +source[i] === +value){
                                    index = i;
                                    break;
                                }
                            }
                        }else{
                            index = source.indexOf(value);
                        }
                        element.checked = (index >= 0);
                    }else{
                        element.checked = source;
                    }
                } else if (element.type == "radio" && value != null) {
                    if (type == "date") {
                        value = kendo.toString(value, "yyyy-MM-dd");
                    } else if (type == "datetime-local") {
                        value = kendo.toString(value, "yyyy-MM-ddTHH:mm:ss");
                    }
                    if (element.value === value.toString()) {
                        element.checked = true;
                    }else{
                        element.checked = false;
                    }
                }
            },

            value: function() {
                var element = this.element,
                    value = element.value;

                if (element.type == "checkbox") {
                    value = element.checked;
                }

                return value;
            },
            destroy: function() {
                $(this.element).off(CHANGE, this._change);
            }
        })
    };

    binders.select = {
        source: binders.source.extend({
            refresh: function(e) {
                var that = this,
                    source = that.bindings.source.get();

                if (source instanceof ObservableArray || source instanceof kendo.data.DataSource) {
                    e = e || {};
                    if (e.action == "add") {
                        that.add(e.index, e.items);
                    } else if (e.action == "remove") {
                        that.remove(e.index, e.items);
                    } else if (e.action == "itemchange" || e.action === undefined) {
                        that.render();
                        if(that.bindings.value){
                            if (that.bindings.value) {
                                var val = retrievePrimitiveValues(that.bindings.value.get(), $(that.element).data("valueField"));
                                if(val === null) {
                                    that.element.selectedIndex = -1;
                                } else {
                                    that.element.value = val;
                                }
                            }
                        }
                    }
                } else {
                    that.render();
                }
            }
        }),
        value: TypedBinder.extend({
            init: function(target, bindings, options) {
                TypedBinder.fn.init.call(this, target, bindings, options);

                this._change = proxy(this.change, this);
                $(this.element).change(this._change);
            },

            parsedValue : function() {
                var dataType = this.dataType();
                var values = [];
                var value, option, idx, length;
                for (idx = 0, length = this.element.options.length; idx < length; idx++) {
                    option = this.element.options[idx];

                    if (option.selected) {
                        value = option.attributes.value;

                        if (value && value.specified) {
                            value = option.value;
                        } else {
                            value = option.text;
                        }

                        values.push(this._parseValue(value, dataType));
                    }
                }
                return values;
            },

            change: function() {
                var values = [],
                    element = this.element,
                    source,
                    field = this.options.valueField || this.options.textField,
                    valuePrimitive = this.options.valuePrimitive,
                    option,
                    valueIndex,
                    value,
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

                        values.push(this._parseValue(value, this.dataType()));
                    }
                }

                if (field) {
                    source = this.bindings.source.get();
                    if (source instanceof kendo.data.DataSource) {
                        source = source.view();
                    }

                    for (valueIndex = 0; valueIndex < values.length; valueIndex++) {
                        for (idx = 0, length = source.length; idx < length; idx++) {
                            var sourceValue = this._parseValue(source[idx].get(field), this.dataType());
                            var match = (String(sourceValue) === values[valueIndex]);
                            if (match) {
                                values[valueIndex] = source[idx];
                                break;
                            }
                        }
                    }
                }

                value = this.bindings[VALUE].get();
                if (value instanceof ObservableArray) {
                    value.splice.apply(value, [0, value.length].concat(values));
                } else if (!valuePrimitive && (value instanceof ObservableObject || value === null || value === undefined || !field)) {
                    this.bindings[VALUE].set(values[0]);
                } else {
                    this.bindings[VALUE].set(values[0].get(field));
                }
            },
            refresh: function() {
                var optionIndex,
                    element = this.element,
                    options = element.options,
                    value = this.bindings[VALUE].get(),
                    values = value,
                    field = this.options.valueField || this.options.textField,
                    found = false,
                    type = this.dataType(),
                    optionValue;

                if (!(values instanceof ObservableArray)) {
                    values = new ObservableArray([value]);
                }

                element.selectedIndex = -1;

                for (var valueIndex = 0; valueIndex < values.length; valueIndex++) {
                    value = values[valueIndex];


                    if (field && value instanceof ObservableObject) {
                        value = value.get(field);
                    }

                    if (type == "date") {
                        value = kendo.toString(values[valueIndex], "yyyy-MM-dd");
                    } else if (type == "datetime-local") {
                        value = kendo.toString(values[valueIndex], "yyyy-MM-ddTHH:mm:ss");
                    }

                    for (optionIndex = 0; optionIndex < options.length; optionIndex++) {
                        optionValue = options[optionIndex].value;

                        if (optionValue === "" && value !== "") {
                            optionValue = options[optionIndex].text;
                        }

                        if (value != null && optionValue == value.toString()) {
                            options[optionIndex].selected = true;
                            found = true;
                        }
                    }
                }
            },
            destroy: function() {
                $(this.element).off(CHANGE, this._change);
            }
        })
    };

    function dataSourceBinding(bindingName, fieldName, setter) {
        return Binder.extend({
            init: function(widget, bindings, options) {
                var that = this;

                Binder.fn.init.call(that, widget.element[0], bindings, options);

                that.widget = widget;
                that._dataBinding = proxy(that.dataBinding, that);
                that._dataBound = proxy(that.dataBound, that);
                that._itemChange = proxy(that.itemChange, that);
            },

            itemChange: function(e) {
                bindElement(e.item[0], e.data, this._ns(e.ns), [e.data].concat(this.bindings[bindingName]._parents()));
            },

            dataBinding: function(e) {
                var idx,
                    length,
                    widget = this.widget,
                    items = e.removedItems || widget.items();

                for (idx = 0, length = items.length; idx < length; idx++) {
                    unbindElementTree(items[idx], false);
                }
            },

            _ns: function(ns) {
                ns = ns || kendo.ui;
                var all = [ kendo.ui, kendo.dataviz.ui, kendo.mobile.ui ];
                all.splice($.inArray(ns, all), 1);
                all.unshift(ns);

                return kendo.rolesFromNamespaces(all);
            },

            dataBound: function(e) {
                var idx,
                    length,
                    widget = this.widget,
                    items = e.addedItems || widget.items(),
                    dataSource = widget[fieldName],
                    view,
                    parents,
                    hds = kendo.data.HierarchicalDataSource;

                if (hds && dataSource instanceof hds) {
                    // suppress binding of HDS items, because calling view() on root
                    // will return only root items, and widget.items() returns all items
                    return;
                }

                if (items.length) {
                    view = e.addedDataItems || dataSource.flatView();
                    parents = this.bindings[bindingName]._parents();

                    for (idx = 0, length = view.length; idx < length; idx++) {
                        bindElement(items[idx], view[idx], this._ns(e.ns), [view[idx]].concat(parents));
                    }
                }
            },

            refresh: function(e) {
                var that = this,
                    source,
                    widget = that.widget,
                    select, multiselect;

                e = e || {};

                if (!e.action) {
                    that.destroy();

                    widget.bind("dataBinding", that._dataBinding);
                    widget.bind("dataBound", that._dataBound);
                    widget.bind("itemChange", that._itemChange);

                    source = that.bindings[bindingName].get();

                    if (widget[fieldName] instanceof kendo.data.DataSource && widget[fieldName] != source) {
                        if (source instanceof kendo.data.DataSource) {
                            widget[setter](source);
                        } else if (source && source._dataSource) {
                            widget[setter](source._dataSource);
                        } else {
                            widget[fieldName].data(source);

                            select = kendo.ui.Select && widget instanceof kendo.ui.Select;
                            multiselect = kendo.ui.MultiSelect && widget instanceof kendo.ui.MultiSelect;

                            if (that.bindings.value && (select || multiselect)) {
                                widget.value(retrievePrimitiveValues(that.bindings.value.get(), widget.options.dataValueField));
                            }
                        }
                    }
                }
            },

            destroy: function() {
                var widget = this.widget;

                widget.unbind("dataBinding", this._dataBinding);
                widget.unbind("dataBound", this._dataBound);
                widget.unbind("itemChange", this._itemChange);
            }
        });
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
                    handler = this.handlers[key];

                if (handler) {
                    this.widget.unbind(key, handler);
                }

                handler = binding.get();

                this.handlers[key] = function(e) {
                    e.data = binding.source;

                    handler(e);

                    if (e.data === binding.source) {
                        delete e.data;
                    }
                };

                this.widget.bind(key, this.handlers[key]);
            },

            destroy: function() {
                var handler;

                for (handler in this.handlers) {
                    this.widget.unbind(handler, this.handlers[handler]);
                }
            }
        }),

        checked: Binder.extend({
            init: function(widget, bindings, options) {
                Binder.fn.init.call(this, widget.element[0], bindings, options);

                this.widget = widget;
                this._change = proxy(this.change, this);
                this.widget.bind(CHANGE, this._change);
            },
            change: function() {
                this.bindings[CHECKED].set(this.value());
            },

            refresh: function() {
                this.widget.check(this.bindings[CHECKED].get() === true);
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
                this.widget.unbind(CHANGE, this._change);
            }
        }),

        visible: Binder.extend({
            init: function(widget, bindings, options) {
                Binder.fn.init.call(this, widget.element[0], bindings, options);

                this.widget = widget;
            },

            refresh: function() {
                var visible = this.bindings.visible.get();
                this.widget.wrapper[0].style.display = visible ? "" : "none";
            }
        }),

        invisible: Binder.extend({
            init: function(widget, bindings, options) {
                Binder.fn.init.call(this, widget.element[0], bindings, options);

                this.widget = widget;
            },

            refresh: function() {
                var invisible = this.bindings.invisible.get();
                this.widget.wrapper[0].style.display = invisible ? "none" : "";
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

        source: dataSourceBinding("source", "dataSource", "setDataSource"),

        value: Binder.extend({
            init: function(widget, bindings, options) {
                Binder.fn.init.call(this, widget.element[0], bindings, options);

                this.widget = widget;
                this._change = $.proxy(this.change, this);
                this.widget.first(CHANGE, this._change);

                var value = this.bindings.value.get();

                this._valueIsObservableObject = !options.valuePrimitive && (value == null || value instanceof ObservableObject);
                this._valueIsObservableArray = value instanceof ObservableArray;
                this._initChange = false;
            },

            _source: function() {
                var source;

                if (this.widget.dataItem) {
                    source = this.widget.dataItem();
                    if (source && source instanceof ObservableObject) {
                        return [source];
                    }
                }

                if (this.bindings.source) {
                    source = this.bindings.source.get();
                }

                if (!source || source instanceof kendo.data.DataSource) {
                    source = this.widget.dataSource.flatView();
                }

                return source;
            },

            change: function() {
                var value = this.widget.value(),
                    field = this.options.dataValueField || this.options.dataTextField,
                    isArray = toString.call(value) === "[object Array]",
                    isObservableObject = this._valueIsObservableObject,
                    valueIndex, valueLength, values = [],
                    sourceItem, sourceValue,
                    idx, length, source;

                this._initChange = true;

                if (field) {

                    if (value === "" && (isObservableObject || this.options.valuePrimitive)) {
                        value = null;
                    } else {
                        source = this._source();

                        if (isArray) {
                            valueLength = value.length;
                            values = value.slice(0);
                        }

                        for (idx = 0, length = source.length; idx < length; idx++) {
                            sourceItem = source[idx];
                            sourceValue = sourceItem.get(field);

                            if (isArray) {
                                for (valueIndex = 0; valueIndex < valueLength; valueIndex++) {
                                    if (sourceValue == values[valueIndex]) {
                                        values[valueIndex] = sourceItem;
                                        break;
                                    }
                                }
                            } else if (sourceValue == value) {
                                value = isObservableObject ? sourceItem : sourceValue;
                                break;
                            }
                        }

                        if (values[0]) {
                            if (this._valueIsObservableArray) {
                                value = values;
                            } else if (isObservableObject || !field) {
                                value = values[0];
                            } else {
                                value = values[0].get(field);
                            }
                        }
                    }
                }

                this.bindings.value.set(value);
                this._initChange = false;
            },

            refresh: function() {
                if (!this._initChange) {
                    var widget = this.widget;
                    var options = widget.options;
                    var textField = options.dataTextField;
                    var valueField = options.dataValueField || textField;
                    var value = this.bindings.value.get();
                    var text = options.text || "";
                    var idx = 0, length;
                    var values = [];

                    if (value === undefined) {
                        value = null;
                    }

                    if (valueField) {
                        if (value instanceof ObservableArray) {
                            for (length = value.length; idx < length; idx++) {
                                values[idx] = value[idx].get(valueField);
                            }
                            value = values;
                        } else if (value instanceof ObservableObject) {
                            text = value.get(textField);
                            value = value.get(valueField);
                        }
                    }

                    if (options.autoBind === false && !options.cascadeFrom && widget.listView && !widget.listView.bound()) {
                        if (textField === valueField && !text) {
                            text = value;
                        }

                        if (!text && (value || value === 0) && options.valuePrimitive) {
                            widget.value(value);
                        } else {
                            widget._preselect(value, text);
                        }
                    } else {
                        widget.value(value);
                    }
                }

                this._initChange = false;
            },

            destroy: function() {
                this.widget.unbind(CHANGE, this._change);
            }
        }),

        gantt: {
            dependencies: dataSourceBinding("dependencies", "dependencies", "setDependenciesDataSource")
        },

        multiselect: {
            value: Binder.extend({
                init: function(widget, bindings, options) {
                    Binder.fn.init.call(this, widget.element[0], bindings, options);

                    this.widget = widget;
                    this._change = $.proxy(this.change, this);
                    this.widget.first(CHANGE, this._change);
                    this._initChange = false;
                },

                change: function() {
                    var that = this,
                        oldValues = that.bindings[VALUE].get(),
                        valuePrimitive = that.options.valuePrimitive,
                        newValues = valuePrimitive ? that.widget.value() : that.widget.dataItems();

                    var field = this.options.dataValueField || this.options.dataTextField;

                    newValues = newValues.slice(0);

                    that._initChange = true;

                    if (oldValues instanceof ObservableArray) {
                        var remove = [];

                        var newLength = newValues.length;

                        var i = 0, j = 0;
                        var old = oldValues[i];
                        var same = false;
                        var removeIndex;
                        var newValue;
                        var found;

                        while (old !== undefined) {
                            found = false;
                            for (j = 0; j < newLength; j++) {
                                if (valuePrimitive) {
                                    same = newValues[j] == old;
                                } else {
                                    newValue = newValues[j];

                                    newValue = newValue.get ? newValue.get(field) : newValue;
                                    same = newValue == (old.get ? old.get(field) : old);
                                }

                                if (same) {
                                    newValues.splice(j, 1);
                                    newLength -= 1;
                                    found = true;
                                    break;
                                }
                            }

                            if (!found) {
                                remove.push(old);
                                arraySplice(oldValues, i, 1);
                                removeIndex = i;
                            } else {
                                i += 1;
                            }

                            old = oldValues[i];
                        }

                        arraySplice(oldValues, oldValues.length, 0, newValues);

                        if (remove.length) {
                            oldValues.trigger("change", {
                                action: "remove",
                                items: remove,
                                index: removeIndex
                            });
                        }

                        if (newValues.length) {
                            oldValues.trigger("change", {
                                action: "add",
                                items: newValues,
                                index: oldValues.length - 1
                            });
                        }
                    } else {
                        that.bindings[VALUE].set(newValues);
                    }

                    that._initChange = false;
                },

                refresh: function() {
                    if (!this._initChange) {
                        var options = this.options,
                            widget = this.widget,
                            field = options.dataValueField || options.dataTextField,
                            value = this.bindings.value.get(),
                            data = value,
                            idx = 0, length,
                            values = [],
                            selectedValue;

                        if (value === undefined) {
                            value = null;
                        }

                        if (field) {
                            if (value instanceof ObservableArray) {
                                for (length = value.length; idx < length; idx++) {
                                    selectedValue = value[idx];
                                    values[idx] = selectedValue.get ? selectedValue.get(field) : selectedValue;
                                }
                                value = values;
                            } else if (value instanceof ObservableObject) {
                                value = value.get(field);
                            }
                        }

                        if (options.autoBind === false && options.valuePrimitive !== true && !widget._isBound()) {
                            widget._preselect(data, value);
                        } else {
                            widget.value(value);
                        }
                    }
                },

                destroy: function() {
                    this.widget.unbind(CHANGE, this._change);
                }

            })
        },
        scheduler: {
            source: dataSourceBinding("source", "dataSource", "setDataSource").extend({
                dataBound: function(e) {
                    var idx;
                    var length;
                    var widget = this.widget;
                    var elements = e.addedItems || widget.items();
                    var data, parents;

                    if (elements.length) {
                        data = e.addedDataItems || widget.dataItems();
                        parents = this.bindings.source._parents();

                        for (idx = 0, length = data.length; idx < length; idx++) {
                            bindElement(elements[idx], data[idx], this._ns(e.ns), [data[idx]].concat(parents));
                        }
                    }
                }
            })
        }
    };

    var arraySplice = function(arr, idx, remove, add) {
        add = add || [];
        remove = remove || 0;

        var addLength = add.length;
        var oldLength = arr.length;

        var shifted = [].slice.call(arr, idx + remove);
        var shiftedLength = shifted.length;
        var index;

        if (addLength) {
            addLength = idx + addLength;
            index = 0;

            for (; idx < addLength; idx++) {
                arr[idx] = add[index];
                index++;
            }

            arr.length = addLength;
        } else if (remove) {
            arr.length = idx;

            remove += idx;
            while (idx < remove) {
                delete arr[--remove];
            }
        }

        if (shiftedLength) {
            shiftedLength = idx + shiftedLength;
            index = 0;

            for (; idx < shiftedLength; idx++) {
                arr[idx] = shifted[index];
                index++;
            }

            arr.length = shiftedLength;
        }

        idx = arr.length;

        while (idx < oldLength) {
            delete arr[idx];
            idx++;
        }
    };

    var BindingTarget = Class.extend( {
        init: function(target, options) {
            this.target = target;
            this.options = options;
            this.toDestroy = [];
        },

        bind: function(bindings) {
            var key,
                hasValue,
                hasSource,
                hasEvents,
                hasChecked,
                hasCss,
                widgetBinding = this instanceof WidgetBindingTarget,
                specificBinders = this.binders();

            for (key in bindings) {
                if (key == VALUE) {
                    hasValue = true;
                } else if (key == SOURCE) {
                    hasSource = true;
                } else if (key == EVENTS && !widgetBinding) {
                    hasEvents = true;
                } else if (key == CHECKED) {
                    hasChecked = true;
                } else if (key == CSS) {
                    hasCss = true;
                } else {
                    this.applyBinding(key, bindings, specificBinders);
                }
            }
            if (hasSource) {
                this.applyBinding(SOURCE, bindings, specificBinders);
            }

            if (hasValue) {
                this.applyBinding(VALUE, bindings, specificBinders);
            }

            if (hasChecked) {
                this.applyBinding(CHECKED, bindings, specificBinders);
            }

            if (hasEvents && !widgetBinding) {
                this.applyBinding(EVENTS, bindings, specificBinders);
            }

            if (hasCss && !widgetBinding) {
                this.applyBinding(CSS, bindings, specificBinders);
            }
        },

        binders: function() {
            return binders[this.target.nodeName.toLowerCase()] || {};
        },

        applyBinding: function(name, bindings, specificBinders) {
            var binder = specificBinders[name] || binders[name],
                toDestroy = this.toDestroy,
                attribute,
                binding = bindings[name];

            if (binder) {
                binder = new binder(this.target, bindings, this.options);

                toDestroy.push(binder);

                if (binding instanceof Binding) {
                    binder.bind(binding);
                    toDestroy.push(binding);
                } else {
                    for (attribute in binding) {
                        binder.bind(binding, attribute);
                        toDestroy.push(binding[attribute]);
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
        binders: function() {
            return binders.widget[this.target.options.name.toLowerCase()] || {};
        },

        applyBinding: function(name, bindings, specificBinders) {
            var binder = specificBinders[name] || binders.widget[name],
                toDestroy = this.toDestroy,
                attribute,
                binding = bindings[name];

            if (binder) {
                binder = new binder(this.target, bindings, this.target.options);

                toDestroy.push(binder);


                if (binding instanceof Binding) {
                    binder.bind(binding);
                    toDestroy.push(binding);
                } else {
                    for (attribute in binding) {
                        binder.bind(binding, attribute);
                        toDestroy.push(binding[attribute]);
                    }
                }
            } else {
                throw new Error("The " + name + " binding is not supported by the " + this.target.options.name + " widget");
            }
        }
    });

    function bindingTargetForRole(element, roles) {
        var widget = kendo.initWidget(element, {}, roles);

        if (widget) {
            return new WidgetBindingTarget(widget);
        }
    }

    var keyValueRegExp = /[A-Za-z0-9_\-]+:(\{([^}]*)\}|[^,}]+)/g,
        whiteSpaceRegExp = /\s/g;

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

    function createBindings(bindings, source, type) {
        var binding,
            result = {};

        for (binding in bindings) {
            result[binding] = new type(source, bindings[binding]);
        }

        return result;
    }

    function bindElement(element, source, roles, parents) {
        var role = element.getAttribute("data-" + kendo.ns + "role"),
            idx,
            bind = element.getAttribute("data-" + kendo.ns + "bind"),
            children = element.children,
            childrenCopy = [],
            deep = true,
            bindings,
            options = {},
            target;

        parents = parents || [source];

        if (role || bind) {
            unbindElement(element, false);
        }

        if (role) {
            target = bindingTargetForRole(element, roles);
        }

        if (bind) {
            bind = parseBindings(bind.replace(whiteSpaceRegExp, ""));

            if (!target) {
                options = kendo.parseOptions(element, {textField: "", valueField: "", template: "", valueUpdate: CHANGE, valuePrimitive: false, autoBind: true});
                options.roles = roles;
                target = new BindingTarget(element, options);
            }

            target.source = source;

            bindings = createBindings(bind, parents, Binding);

            if (options.template) {
                bindings.template = new TemplateBinding(parents, "", options.template);
            }

            if (bindings.click) {
                bind.events = bind.events || {};
                bind.events.click = bind.click;
                bindings.click.destroy();
                delete bindings.click;
            }

            if (bindings.source) {
                deep = false;
            }

            if (bind.attr) {
                bindings.attr = createBindings(bind.attr, parents, Binding);
            }

            if (bind.style) {
                bindings.style = createBindings(bind.style, parents, Binding);
            }

            if (bind.events) {
                bindings.events = createBindings(bind.events, parents, EventBinding);
            }

            if (bind.css) {
                bindings.css = createBindings(bind.css, parents, Binding);
            }

            target.bind(bindings);
        }

        if (target) {
            element.kendoBindingTarget = target;
        }

        if (deep && children) {
            // https://github.com/telerik/kendo/issues/1240 for the weirdness.
            for (idx = 0; idx < children.length; idx++) {
                childrenCopy[idx] = children[idx];
            }

            for (idx = 0; idx < childrenCopy.length; idx++) {
                bindElement(childrenCopy[idx], source, roles, parents);
            }
        }
    }

    function bind(dom, object) {
        var idx,
            length,
            node,
            roles = kendo.rolesFromNamespaces([].slice.call(arguments, 2));

        object = kendo.observable(object);
        dom = $(dom);

        for (idx = 0, length = dom.length; idx < length; idx++) {
            node = dom[idx];
            if (node.nodeType === 1) {
                bindElement(node, object, roles);
            }
        }
    }

    function unbindElement(element, destroyWidget) {
        var bindingTarget = element.kendoBindingTarget;

        if (bindingTarget) {
            bindingTarget.destroy();

            if (deleteExpando) {
                delete element.kendoBindingTarget;
            } else if (element.removeAttribute) {
                element.removeAttribute("kendoBindingTarget");
            } else {
                element.kendoBindingTarget = null;
            }
        }

        if(destroyWidget) {
            var widget = kendo.widgetInstance($(element));
            if (widget && typeof widget.destroy === FUNCTION) {
                widget.destroy();
            }
        }
    }

    function unbindElementTree(element, destroyWidgets) {
        unbindElement(element, destroyWidgets);

        unbindElementChildren(element, destroyWidgets);
    }

    function unbindElementChildren(element, destroyWidgets) {
        var children = element.children;

        if (children) {
            for (var idx = 0, length = children.length; idx < length; idx++) {
                unbindElementTree(children[idx], destroyWidgets);
            }
        }
    }

    function unbind(dom) {
        var idx, length;

        dom = $(dom);

        for (idx = 0, length = dom.length; idx < length; idx++ ) {
            unbindElementTree(dom[idx], false);
        }
    }

    function notify(widget, namespace) {
        var element = widget.element,
            bindingTarget = element[0].kendoBindingTarget;

        if (bindingTarget) {
            bind(element, bindingTarget.source, namespace);
        }
    }

    function retrievePrimitiveValues(value, valueField) {
        var values = [];
        var idx = 0;
        var length;
        var item;

        if (!valueField) {
            return value;
        }

        if (value instanceof ObservableArray) {
            for (length = value.length; idx < length; idx++) {
                item = value[idx];
                values[idx] = item.get ? item.get(valueField) : item[valueField];
            }
            value = values;
        } else if (value instanceof ObservableObject) {
            value = value.get(valueField);
        }

        return value;
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

    kendo.observableHierarchy = function(array) {
        var dataSource = kendo.data.HierarchicalDataSource.create(array);

        function recursiveRead(data) {
            var i, children;

            for (i = 0; i < data.length; i++) {
                data[i]._initChildren();

                children = data[i].children;

                children.fetch();

                data[i].items = children.data();

                recursiveRead(data[i].items);
            }
        }

        dataSource.fetch();

        recursiveRead(dataSource.data());

        dataSource._data._dataSource = dataSource;

        return dataSource._data;
    };

})(window.kendo.jQuery);

return window.kendo;


}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
