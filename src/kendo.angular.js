(function(f, define){
    define([ "./kendo.core" ], f);
})(function() {

(function ($, angular, undefined) {
    "use strict";

    if (!angular) {
        return;
    }

    /*jshint eqnull:true,loopfunc:true,-W052,-W028  */

    var module = angular.module('kendo.directives', []);
    var $parse, $timeout, $compile, $log;

    function withoutTimeout(f) {
        var save = $timeout;
        try {
            $timeout = function(f){ return f(); };
            return f();
        } finally {
            $timeout = save;
        }
    }

    var OPTIONS_NOW;

    var createDataSource = (function() {
        var types = {
            TreeView  : 'HierarchicalDataSource',
            Scheduler : 'SchedulerDataSource',
            PanelBar  : '$PLAIN',
            Menu      : "$PLAIN"
        };
        var toDataSource = function(dataSource, type) {
            if (type == '$PLAIN') {
                return dataSource;
            }
            return kendo.data[type].create(dataSource);
        };
        return function(scope, element, role, source) {
            var type = types[role] || 'DataSource';
            var ds = toDataSource(scope.$eval(source), type);

            // not recursive -- this triggers when the whole data source changed
            scope.$watch(source, function(mew, old){
                if (mew !== old) {
                    var ds = toDataSource(mew, type);
                    var widget = kendoWidgetInstance(element);
                    if (widget && typeof widget.setDataSource == "function") {
                        widget.setDataSource(ds);
                    }
                }
            });
            return ds;
        };
    }());

    var ignoredAttributes = {
        kDataSource : true,
        kOptions    : true,
        kRebind     : true,
        kNgModel    : true,
        kNgDelay    : true
    };

    function addOption(scope, options, name, value) {
        options[name] = angular.copy(scope.$eval(value));
        if (options[name] === undefined && value.match(/^\w*$/)) {
            $log.warn(name + ' attribute resolved to undefined. Maybe you meant to use a string literal like: \'' + value + '\'?');
        }
    }

    function createWidget(scope, element, attrs, widget, origAttr) {
        var role = widget.replace(/^kendo/, '');
        var options = angular.extend({}, scope.$eval(attrs.kOptions || attrs.options));
        var ctor = $(element)[widget];

        if (!ctor) {
            window.console.error("Could not find: " + widget);
            return null;
        }

        var widgetOptions = ctor.widget.prototype.options;
        var widgetEvents = ctor.widget.prototype.events;

        $.each(attrs, function(name, value) {
            if (name === "source" || name === "kDataSource") {
                return;
            }

            var dataName = "data" + name.charAt(0).toUpperCase() + name.slice(1);

            if (name.indexOf("on") === 0) { // let's search for such event.
                var eventKey = name.replace(/^on./, function(prefix) {
                    return prefix.charAt(2).toLowerCase();
                });

                if (widgetEvents.indexOf(eventKey) > -1) {
                    options[eventKey] = value;
                }
            } // don't elsif here - there are on* options

            if (widgetOptions.hasOwnProperty(dataName)) {
                addOption(scope, options, dataName, value);
            } else if (widgetOptions.hasOwnProperty(name) && name != "name") { // `name` must be forbidden. XXX: other names to ignore here?
                addOption(scope, options, name, value);
            } else if (!ignoredAttributes[name]) {
                var match = name.match(/^k(On)?([A-Z].*)/);
                if (match) {
                    var optionName = match[2].charAt(0).toLowerCase() + match[2].slice(1);
                    if (match[1] && name != "kOnLabel" // XXX: k-on-label can be used on MobileSwitch :-\
                       ) {
                        options[optionName] = value;
                    } else {
                        if (name == "kOnLabel") {
                            optionName = "onLabel"; // XXX: that's awful.
                        }
                        addOption(scope, options, optionName, value);
                    }
                }
            }
        });

        // parse the datasource attribute
        var dataSource = attrs.kDataSource || attrs.source;

        if (dataSource) {
            options.dataSource = createDataSource(scope, element, role, dataSource);
        }

        // deepExtend in kendo.core (used in Editor) will fail with stack
        // overflow if we don't put it in an array :-\
        options.$angular = [ scope ];

        if (element.is("select")) {
            (function(options){
                if (options.length > 0) {
                    var first = $(options[0]);
                    if (!/\S/.test(first.text()) && /^\?/.test(first.val())) {
                        first.remove();
                    }
                }
            }(element[0].options));
        }

        var object = ctor.call(element, OPTIONS_NOW = options).data(widget);
        exposeWidget(object, scope, attrs, widget, origAttr);
        scope.$emit("kendoWidgetCreated", object);
        return object;
    }

    function exposeWidget(widget, scope, attrs, kendoWidget, origAttr) {
        if (attrs[origAttr]) {
            // expose the widget object
            var set = $parse(attrs[origAttr]).assign;
            if (set) {
                // set the value of the expression to the kendo widget object to expose its api
                set(scope, widget);
            } else {
                throw new Error(origAttr + ' attribute used but expression in it is not assignable: ' + attrs[kendoWidget]);
            }
        }
    }

    module.factory('directiveFactory', ['$timeout', '$parse', '$compile', '$log', function(timeout, parse, compile, log) {

        $timeout = timeout;
        $parse = parse;
        $compile = compile;
        $log = log;

        var KENDO_COUNT = 0;
        var RENDERED = false;

        var create = function(role, origAttr) {

            return {
                // Parse the directive for attributes and classes
                restrict: "AC",
                require: [ "?ngModel", "^?form" ],
                scope: false,

                transclude: true,
                controller: [ '$scope', '$attrs', '$element', '$transclude', function($scope, $attrs, $element, $transclude) {
                    // Make the element's contents available to the kendo widget to allow creating some widgets from existing elements.
                    $transclude($scope, function(clone){
                        $element.append(clone);
                    });
                }],

                link: function(scope, element, attrs, controllers) {

                    var ngModel = controllers[0];
                    var ngForm = controllers[1];

                    // we must remove data-kendo-widget-name attribute because
                    // it breaks kendo.widgetInstance; can generate all kinds
                    // of funny issues like
                    //
                    //   https://github.com/kendo-labs/angular-kendo/issues/167
                    //
                    // but we still keep the attribute without the
                    // `data-` prefix, so k-rebind would work.
                    var roleattr = role.replace(/([A-Z])/g, "-$1");
                    $(element).attr(roleattr, $(element).attr("data-" + roleattr));
                    $(element)[0].removeAttribute("data-" + roleattr);

                    ++KENDO_COUNT;

                    var kNgDelay = attrs.kNgDelay;

                    $timeout(function createIt() {
                        if (kNgDelay) {
                            return (function(){
                                var unregister = scope.$watch(kNgDelay, function(newValue, oldValue){
                                    if (newValue !== oldValue) {
                                        unregister();
                                        kNgDelay = null;
                                        $timeout(createIt); // XXX: won't work without `timeout` ;-\
                                    }
                                });
                            })();
                        }

                        // if k-rebind attribute is provided, rebind the kendo widget when
                        // the watched value changes
                        if (attrs.kRebind) {
                            var originalElement = attrs.$kendoOrigElement || $(element)[0].cloneNode(true);
                            // watch for changes on the expression passed in the k-rebind attribute
                            var unregister = scope.$watch(attrs.kRebind, function(newValue, oldValue) {
                                if (newValue !== oldValue) {
                                    unregister(); // this watcher will be re-added if we compile again!

                                    /****************************************************************
                                     // XXX: this is a gross hack that might not even work with all
                                     // widgets.  we need to destroy the current widget and get its
                                     // wrapper element out of the DOM, then make the original element
                                     // visible so we can initialize a new widget on it.
                                     //
                                     // kRebind is probably impossible to get right at the moment.
                                     ****************************************************************/

                                    var _wrapper = $(widget.wrapper)[0];
                                    var _element = $(widget.element)[0];
                                    widget.destroy();
                                    widget = null;
                                    if (_wrapper && _element) {
                                        _wrapper.parentNode.replaceChild(_element, _wrapper);
                                        var clone = originalElement.cloneNode(true);
                                        $(element).replaceWith(clone);
                                        element = $(clone);
                                    }
                                    $compile(element)(scope);
                                }
                            }, true); // watch for object equality. Use native or simple values.
                        }

                        var widget = createWidget(scope, element, attrs, role, origAttr);
                        setupBindings();

                        var prev_destroy = null;
                        function setupBindings() {

                            var isFormField = /^(input|select|textarea)$/i.test(element[0].tagName);
                            function formValue(element) {
                                if (/checkbox|radio/i.test(element.attr("type"))) {
                                    return element.prop("checked");
                                }
                                return element.val();
                            }
                            function value() {
                                return isFormField ? formValue(element) : widget.value();
                            }

                            // Cleanup after ourselves
                            if (prev_destroy) {
                                prev_destroy();
                            }
                            prev_destroy = scope.$on("$destroy", function() {
                                if (widget) {
                                    if (widget.element) {
                                        widget = kendoWidgetInstance(widget.element);
                                        if (widget) {
                                            widget.destroy();
                                        }
                                    }
                                    widget = null;
                                }
                            });

                            // 2 way binding: ngModel <-> widget.value()
                            OUT: if (ngModel) {
                                if (!widget.value) {
                                    break OUT;
                                }

                                // Angular will invoke $render when the view needs to be updated with the view value.
                                ngModel.$render = function() {
                                    // Update the widget with the view value.

                                    // delaying with setTimout for cases where the datasource is set thereafter.
                                    // https://github.com/kendo-labs/angular-kendo/issues/304
                                    var val = ngModel.$viewValue;
                                    if (val === undefined) {
                                        val = ngModel.$modelValue;
                                    }
                                    setTimeout(function(){
                                        if (widget) {
                                            widget.value(val);    
                                        }
                                    }, 0);
                                };

                                // Some widgets trigger "change" on the input field
                                // and this would result in two events sent (#135)
                                var haveChangeOnElement = false;
                                if (isFormField) {
                                    element.on("change", function(){
                                        haveChangeOnElement = true;
                                    });
                                }

                                var onChange = function(pristine){
                                    return function(){
                                        var formPristine;
                                        if (haveChangeOnElement) {
                                            return;
                                        }
                                        haveChangeOnElement = false;
                                        if (pristine && ngForm) {
                                            formPristine = ngForm.$pristine;
                                        }
                                        ngModel.$setViewValue(value());
                                        if (pristine) {
                                            ngModel.$setPristine();
                                            if (formPristine) {
                                                ngForm.$setPristine();
                                            }
                                        }
                                    };
                                };

                                widget.first("change", onChange(false));
                                widget.first("dataBound", onChange(true));

                                var currentVal = value();

                                // if the model value is undefined, then we set the widget value to match ( == null/undefined )
                                if (currentVal != ngModel.$viewValue) {
                                    if (!ngModel.$isEmpty(ngModel.$viewValue)) {
                                        widget.value(ngModel.$viewValue);
                                    } else if (currentVal != null && currentVal !== "" && currentVal != ngModel.$viewValue) {
                                        ngModel.$setViewValue(currentVal);
                                    }
                                }

                                ngModel.$setPristine();
                            }

                            // kNgModel is used for the "logical" value
                            OUT2: if (attrs.kNgModel) {
                                if (typeof widget.value != "function") {
                                    $log.warn("k-ng-model specified on a widget that does not have the value() method: " + (widget.options.name));
                                    break OUT2;
                                }
                                var getter = $parse(attrs.kNgModel);
                                var setter = getter.assign;
                                var updating = false;
                                widget.value(getter(scope));

                                // keep in sync
                                scope.$watch(attrs.kNgModel, function(newValue, oldValue){
                                    if (updating) {
                                        return;
                                    }
                                    if (newValue === oldValue) {
                                        return;
                                    }
                                    widget.value(newValue);
                                });
                                widget.first("change", function(){
                                    updating = true;
                                    scope.$apply(function(){
                                        setter(scope, widget.value());
                                    });
                                    updating = false;
                                });
                            }
                        }

                        // mutation observers — propagate the original
                        // element's class to the widget wrapper.
                        (function(){

                            if (!(window.MutationObserver && widget.wrapper)) {
                                return;
                            }

                            var prevClassList = [].slice.call($(element)[0].classList);

                            var mo = new MutationObserver(function(changes){
                                suspend();    // make sure we don't trigger a loop
                                if (!widget) {
                                    return;
                                }

                                changes.forEach(function(chg){
                                    var w = $(widget.wrapper)[0];
                                    switch (chg.attributeName) {

                                      case "class":
                                        // sync classes to the wrapper element
                                        var currClassList = [].slice.call(chg.target.classList);
                                        currClassList.forEach(function(cls){
                                            if (prevClassList.indexOf(cls) < 0) {
                                                w.classList.add(cls);
                                                if (widget instanceof kendo.ui.ComboBox) { // https://github.com/kendo-labs/angular-kendo/issues/356
                                                    widget.input[0].classList.add(cls);
                                                }
                                            }
                                        });
                                        prevClassList.forEach(function(cls){
                                            if (currClassList.indexOf(cls) < 0) {
                                                w.classList.remove(cls);
                                                if (widget instanceof kendo.ui.ComboBox) { // https://github.com/kendo-labs/angular-kendo/issues/356
                                                    widget.input[0].classList.remove(cls);
                                                }
                                            }
                                        });
                                        prevClassList = currClassList;
                                        break;

                                      case "disabled":
                                        if (typeof widget.enable == "function") {
                                            widget.enable(!$(chg.target).attr("disabled"));
                                        }
                                        break;

                                      case "readonly":
                                        if (typeof widget.readonly == "function") {
                                            widget.readonly(!!$(chg.target).attr("readonly"));
                                        }
                                        break;
                                    }
                                });

                                resume();
                            });

                            function suspend() {
                                mo.disconnect();
                            }
                            function resume() {
                                mo.observe($(element)[0], { attributes: true });
                            }
                            resume();
                            widget.first("destroy", suspend);
                        })();

                        --KENDO_COUNT;
                        if (KENDO_COUNT === 0) {
                            if (!RENDERED) {
                                RENDERED = true;
                                scope.$emit("kendoRendered");
                                $("form").each(function(){
                                    var form = $(this).controller("form");
                                    if (form) {
                                        form.$setPristine();
                                    }
                                });
                            }
                        }

                    });
                }
            };
        };

        return {
            create: create
        };
    }]);

    var TAGNAMES = {
        Editor         : "textarea",
        NumericTextBox : "input",
        DatePicker     : "input",
        DateTimePicker : "input",
        TimePicker     : "input",
        AutoComplete   : "input",
        ColorPicker    : "input",
        MaskedTextBox  : "input",
        MultiSelect    : "input",
        Upload         : "input",
        Validator      : "form",
        Button         : "button",
        ListView       : "ul",
        TreeView       : "ul",
        Menu           : "ul",
        ContextMenu    : "ul"
    };

    function createDirectives(klass, isMobile) {
        function make(directiveName, widgetName) {
            module.directive(directiveName, [
                "directiveFactory",
                function(directiveFactory) {
                    return directiveFactory.create(widgetName, directiveName);
                }
            ]);
        }

        var name = isMobile ? "Mobile" : "";
        name += klass.fn.options.name;
        var className = name;
        var shortcut = "kendo" + name.charAt(0) + name.substr(1).toLowerCase();
        name = "kendo" + name;

        // here name should be like kendoMobileListView so kendo-mobile-list-view works,
        // and shortcut like kendoMobilelistview, for kendo-mobilelistview

        make(name, name);
        if (shortcut != name) {
            make(shortcut, name);
        }

        // <kendo-numerictextbox>-type directives
        var dashed = name.replace(/([A-Z])/g, "-$1");
        module.directive(shortcut, function(){
            return {
                restrict : "E",
                replace  : true,
                template : function(element, attributes) {
                    var tag = TAGNAMES[className] || "div";
                    return "<" + tag + " " + dashed + "></" + tag + ">";
                }
            };
        });
    }

    (function(){
        function doAll(isMobile) {
            return function(namespace) {
                angular.forEach(namespace, function(value) {
                    if (value.fn && value.fn.options && value.fn.options.name && (/^[A-Z]/).test(value.fn.options.name)) {
                        createDirectives(value, isMobile);
                    }
                });
            };
        }
        angular.forEach([ kendo.ui, kendo.dataviz && kendo.dataviz.ui ], doAll(false));
        angular.forEach([ kendo.mobile && kendo.mobile.ui ], doAll(true));
    })();

    /* -----[ utils ]----- */

    function kendoWidgetInstance(el) {
        el = $(el);
        return kendo.widgetInstance(el, kendo.ui) ||
            kendo.widgetInstance(el, kendo.mobile.ui) ||
            kendo.widgetInstance(el, kendo.dataviz.ui);
    }

    function digest(scope, func) {
        var root = scope.$root || scope;
        var isDigesting = /^\$(digest|apply)$/.test(root.$$phase);
        if (func) {
            if (isDigesting) {
                func();
            } else {
                scope.$apply(func);
            }
        } else if (!isDigesting) {
            scope.$digest();
        }
    }

    function destroyScope(scope, el) {
        scope.$destroy();
        if (el) {
            // prevent leaks. https://github.com/kendo-labs/angular-kendo/issues/237
            $(el)
                .removeData("$scope")
                .removeData("$isolateScope")
                .removeData("$isolateScopeNoTemplate")
                .removeClass("ng-scope");
        }
    }

    var pendingPatches = [];

    // defadvice will patch a class' method with another function.  That
    // function will be called in a context containing `next` (to call
    // the next method) and `object` (a reference to the original
    // object).
    function defadvice(klass, methodName, func) {
        if ($.isArray(klass)) {
            return angular.forEach(klass, function(klass){
                defadvice(klass, methodName, func);
            });
        }
        if (typeof klass == "string") {
            var a = klass.split(".");
            var x = kendo;
            while (x && a.length > 0) {
                x = x[a.shift()];
            }
            if (!x) {
                pendingPatches.push([ klass, methodName, func ]);
                return false;
            }
            klass = x.prototype;
        }
        var origMethod = klass[methodName];
        klass[methodName] = function() {
            var self = this, args = arguments;
            return func.apply({
                self: self,
                next: function() {
                    return origMethod.apply(self, arguments.length > 0 ? arguments : args);
                }
            }, args);
        };
        return true;
    }

    defadvice(kendo.ui, "plugin", function(klass, register, prefix){
        this.next();
        pendingPatches = $.grep(pendingPatches, function(args){
            return !defadvice.apply(null, args);
        });
        createDirectives(klass, prefix == "Mobile");
    });

    /* -----[ Customize widgets for Angular ]----- */

    defadvice([ "ui.Widget", "mobile.ui.Widget" ], "angular", function(cmd, arg){
        var self = this.self;
        if (cmd == "init") {
            // `arg` here should be the widget options.
            // the Chart doesn't send the options to Widget::init in constructor
            // hence the OPTIONS_NOW hack (initialized in createWidget).
            if (!arg && OPTIONS_NOW) {
                arg = OPTIONS_NOW;
            }
            OPTIONS_NOW = null;
            if (arg && arg.$angular) {
                self.$angular_scope = arg.$angular[0];
                self.$angular_init(self.element, arg);
            }
            return;
        }
        var scope = self.$angular_scope || angular.element(self.element).scope();
        if (scope && $compile) {
            withoutTimeout(function(){
                var x = arg(), elements = x.elements, data = x.data;
                if (elements.length > 0) {
                    switch (cmd) {

                      case "cleanup":
                        angular.forEach(elements, function(el){
                            var itemScope = angular.element(el).scope();
                            if (itemScope && itemScope !== scope) {
                                destroyScope(itemScope, el);
                            }
                        });
                        break;

                      case "compile":
                        angular.forEach(elements, function(el, i){
                            var itemScope;
                            if (x.scopeFrom) {
                                itemScope = angular.element(x.scopeFrom).scope();
                            } else {
                                var vars = data && data[i];
                                if (vars !== undefined) {
                                    itemScope = $.extend(scope.$new(), vars);
                                }
                            }

                            $compile(el)(itemScope || scope);
                        });
                        digest(scope);
                        break;
                    }
                }
            });
        }
    });

    // All event handlers that are strings are compiled the Angular way.
    defadvice("ui.Widget", "$angular_init", function(element, options) {
        var self = this.self;
        if (options && !$.isArray(options)) {
            var scope = self.$angular_scope;
            for (var i = self.events.length; --i >= 0;) {
                var event = self.events[i];
                var handler = options[event];
                if (handler && typeof handler == "string") {
                    options[event] = self.$angular_makeEventHandler(event, scope, handler);
                }
            }
        }
    });

    // most handers will only contain a kendoEvent in the scope.
    defadvice("ui.Widget", "$angular_makeEventHandler", function(event, scope, handler){
        handler = $parse(handler);
        return function(e) {
            digest(scope, function() {
                handler(scope, { kendoEvent: e });
            });
        };
    });

    // for the Grid and ListView we add `data` and `selected` too.
    defadvice([ "ui.Grid", "ui.ListView", "ui.TreeView" ], "$angular_makeEventHandler", function(event, scope, handler){
        if (event != "change") {
            return this.next();
        }
        handler = $parse(handler);
        return function(ev) {
            var widget = ev.sender;
            var options = widget.options;
            var cell, multiple, locals = { kendoEvent: ev }, elems, items, columns, colIdx;

            if (angular.isString(options.selectable)) {
                cell = options.selectable.indexOf('cell') !== -1;
                multiple = options.selectable.indexOf('multiple') !== -1;
            }

            elems = locals.selected = this.select();
            items = locals.data = [];
            columns = locals.columns = [];
            for (var i = 0; i < elems.length; i++) {
                var item = cell ? elems[i].parentNode : elems[i];
                var dataItem = widget.dataItem(item);
                if (cell) {
                    if (angular.element.inArray(dataItem, items) < 0) {
                        items.push(dataItem);
                    }
                    colIdx = angular.element(elems[i]).index();
                    if (angular.element.inArray(colIdx, columns) < 0 ) {
                        columns.push(colIdx);
                    }
                } else {
                    items.push(dataItem);
                }
            }

            if (!multiple) {
                locals.dataItem = locals.data = items[0];
                locals.selected = elems[0];
            }

            digest(scope, function() {
                handler(scope, locals);
            });
        };
    });

    // If no `template` is supplied for Grid columns, provide an Angular
    // template.  The reason is that in this way AngularJS will take
    // care to update the view as the data in scope changes.
    defadvice("ui.Grid", "$angular_init", function(element, options){
        this.next();
        if (options.columns) {
            var settings = $.extend({}, kendo.Template, options.templateSettings);
            angular.forEach(options.columns, function(col){
                if (col.field && !col.template && !col.format && !col.values && (col.encoded === undefined || col.encoded)) {
                    col.template = "<span ng-bind='" +
                        kendo.expr(col.field, "dataItem") + "'>#: " +
                        kendo.expr(col.field, settings.paramName) + "#</span>";
                }
            });
        }
    });

    {
        // mobile/ButtonGroup does not have a "value" method, but looks
        // like it would be useful.  We provide it here.

        defadvice("mobile.ui.ButtonGroup", "value", function(mew){
            var self = this.self;
            if (mew != null) {
                self.select(self.element.children("li.km-button").eq(mew));
                self.trigger("change");
                self.trigger("select", { index: self.selectedIndex });
            }
            return self.selectedIndex;
        });

        defadvice("mobile.ui.ButtonGroup", "_select", function(){
            this.next();
            this.self.trigger("change");
        });
    }

})(window.kendo.jQuery, window.angular);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
