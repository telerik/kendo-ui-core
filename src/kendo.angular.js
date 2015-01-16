(function(f, define){
    define([ "./kendo.core" ], f);
})(function() {

var __meta__ = {
    id: "angular",
    name: "AngularJS Directives",
    category: "framework",
    description: "Adds Kendo UI for AngularJS directives",
    depends: [ "core" ],
    defer: true
};

(function ($, angular, undefined) {
    "use strict";

    if (!angular) {
        return;
    }

    /*jshint eqnull:true,loopfunc:true,-W052,-W028  */

    var module = angular.module('kendo.directives', []),
        $injector = angular.injector(['ng']),
        $parse = $injector.get('$parse'),
        $timeout = $injector.get('$timeout'),
        $defaultCompile,
        $log = $injector.get('$log');

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
            TreeList    : 'TreeListDataSource',
            TreeView    : 'HierarchicalDataSource',
            Scheduler   : 'SchedulerDataSource',
            PanelBar    : '$PLAIN',
            Menu        : "$PLAIN",
            ContextMenu : "$PLAIN"
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

    var ignoredOwnProperties = {
        // XXX: other names to ignore here?
        name    : true,
        title   : true,
        style   : true
    };

    function addOption(scope, options, name, value) {
        options[name] = angular.copy(scope.$eval(value));
        if (options[name] === undefined && value.match(/^\w*$/)) {
            $log.warn(name + ' attribute resolved to undefined. Maybe you meant to use a string literal like: \'' + value + '\'?');
        }
    }

    function createWidget(scope, element, attrs, widget, origAttr, controllers) {
        var kNgDelay = attrs.kNgDelay,
            delayValue = scope.$eval(kNgDelay);

        controllers = controllers || [];

        var ngModel = controllers[0],
            ngForm = controllers[1];

        if (kNgDelay && !delayValue) {
            var root = scope.$root || scope;

            var register = function() {
                var unregister = scope.$watch(kNgDelay, function(newValue, oldValue) {
                        if (newValue !== oldValue) {
                        unregister();
                        // remove subsequent delays, to make ng-rebind work
                        element.removeAttr(attrs.$attr.kNgDelay);
                        kNgDelay = null;
                        $timeout(createIt); // XXX: won't work without `timeout` ;-\
                    }
                });
            };

            // WARNING: the watchers should be registered in the digest cycle.
            // the fork here is for the timeout/non-timeout initiated widgets.
            if (/^\$(digest|apply)$/.test(root.$$phase)) {
                register();
            } else {
                scope.$apply(register);
            }

            return;
        } else {
            return createIt();
        }

        function createIt() {
            var originalElement;

            if (attrs.kRebind) {
                originalElement = $($(element)[0].cloneNode(true));
            }


            var role = widget.replace(/^kendo/, '');
            var options = angular.extend({}, attrs.defaultOptions, scope.$eval(attrs.kOptions || attrs.options));
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
                } else if (widgetOptions.hasOwnProperty(name) && !ignoredOwnProperties[name]) {
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

            var destroyRegister = destroyWidgetOnScopeDestroy(scope, object);

            if (attrs.kRebind) {
                setupRebind(object, scope, element, originalElement, attrs.kRebind, destroyRegister);
            }

            // kNgModel is used for the "logical" value
            if (attrs.kNgModel) {
                bindToKNgModel(object, scope, attrs.kNgModel);
            }

            // 2 way binding: ngModel <-> widget.value()
            if (ngModel) {
                bindToNgModel(object, scope, element, ngModel, ngForm);
            }

            if (object) {
                propagateClassToWidgetWrapper(object, element);
            }

            return object;
        }
    }

    function exposeWidget(widget, scope, attrs, kendoWidget, origAttr) {
        if (attrs[origAttr]) {
            var set = $parse(attrs[origAttr]).assign;
            if (set) {
                // set the value of the expression to the kendo widget object to expose its api
                set(scope, widget);
            } else {
                throw new Error(origAttr + ' attribute used but expression in it is not assignable: ' + attrs[kendoWidget]);
            }
        }
    }

    function formValue(element) {
        if (/checkbox|radio/i.test(element.attr("type"))) {
            return element.prop("checked");
        }
        return element.val();
    }

    var formRegExp = /^(input|select|textarea)$/i;

    function isForm(element) {
        return formRegExp.test(element[0].tagName);
    }

    function bindToNgModel(widget, scope, element, ngModel, ngForm) {
        if (!widget.value) {
            return;
        }

        var value;

        if (isForm(element)) {
            value = function() {
                return formValue(element);
            };
        } else {
            value = function() {
                return widget.value();
            };
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
                if (widget) { // might have been destroyed in between. :-(
                    widget.value(val);
                }
            }, 0);
        };

        // Some widgets trigger "change" on the input field
        // and this would result in two events sent (#135)
        var haveChangeOnElement = false;

        if (isForm(element)) {
            element.on("change", function() {
                haveChangeOnElement = true;
            });
        }

        var onChange = function(pristine) {
            return function() {
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
                digest(scope);
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

    function bindToKNgModel(widget, scope, kNgModel) {
        if (typeof widget.value != "function") {
            $log.warn("k-ng-model specified on a widget that does not have the value() method: " + (widget.options.name));
            return;
        }

        var getter = $parse(kNgModel);
        var setter = getter.assign;
        var updating = false;

        widget.$angular_setLogicValue(getter(scope));

        // keep in sync
        scope.$apply(function() {
            var watchHandler = function(newValue, oldValue) {
                if (newValue === undefined) {
                    // because widget's value() method usually checks if the new value is undefined,
                    // in which case it returns the current value rather than clearing the field.
                    // https://github.com/telerik/kendo-ui-core/issues/299
                    newValue = null;
                }
                if (updating) {
                    return;
                }
                if (newValue === oldValue) {
                    return;
                }
                widget.$angular_setLogicValue(newValue);
            };
            if (kendo.ui.MultiSelect && widget instanceof kendo.ui.MultiSelect) {
                scope.$watchCollection(kNgModel, watchHandler);
            } else {
                scope.$watch(kNgModel, watchHandler);
            }
        });

        widget.first("change", function(){
            updating = true;
            scope.$apply(function(){
                setter(scope, widget.$angular_getLogicValue());
            });
            updating = false;
        });
    }

    function destroyWidgetOnScopeDestroy(scope, widget) {
        var deregister = scope.$on("$destroy", function() {
            deregister();
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

        return deregister;
    }

    // mutation observers - propagate the original
    // element's class to the widget wrapper.
    function propagateClassToWidgetWrapper(widget, element) {
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
                                if (kendo.ui.ComboBox && widget instanceof kendo.ui.ComboBox) { // https://github.com/kendo-labs/angular-kendo/issues/356
                                    widget.input[0].classList.add(cls);
                                }
                            }
                        });
                        prevClassList.forEach(function(cls){
                            if (currClassList.indexOf(cls) < 0) {
                                w.classList.remove(cls);
                                if (kendo.ui.ComboBox && widget instanceof kendo.ui.ComboBox) { // https://github.com/kendo-labs/angular-kendo/issues/356
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
    }

    function setupRebind(widget, scope, element, originalElement, rebindAttr, destroyRegister) {
        // watch for changes on the expression passed in the k-rebind attribute
        var unregister = scope.$watch(rebindAttr, function(newValue, oldValue) {
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
                var compile = element.injector().get("$compile");
                widget.destroy();

                if (destroyRegister) {
                    destroyRegister();
                }

                widget = null;

                if (_wrapper && _element) {
                    _wrapper.parentNode.replaceChild(_element, _wrapper);
                    $(element).replaceWith(originalElement);
                }

                compile(originalElement)(scope);
            }
        }, true); // watch for object equality. Use native or simple values.
        digest(scope);
    }

    module.factory('directiveFactory', [ '$compile', function(compile) {
        var KENDO_COUNT = 0;
        var RENDERED = false;

        // caching $compile for the dirty hack upstairs. This is awful, but we happen to have elements outside of the bootstrapped root :(.
        $defaultCompile = compile;

        var create = function(role, origAttr) {

            return {
                // Parse the directive for attributes and classes
                restrict: "AC",
                require: [ "?ngModel", "^?form" ],
                scope: false,

                controller: [ '$scope', '$attrs', '$element', function($scope, $attrs, $element) {
                    this.template = function(key, value) {
                        $attrs[key] = kendo.stringify(value);
                    };
                }],

                link: function(scope, element, attrs, controllers) {
                    var $element = $(element);

                    // we must remove data-kendo-widget-name attribute because
                    // it breaks kendo.widgetInstance; can generate all kinds
                    // of funny issues like
                    //
                    //   https://github.com/kendo-labs/angular-kendo/issues/167
                    //
                    // but we still keep the attribute without the
                    // `data-` prefix, so k-rebind would work.
                    var roleattr = role.replace(/([A-Z])/g, "-$1");
                    var isVisible = $element.css("visibility") !== "hidden";

                    $element.attr(roleattr, $element.attr("data-" + roleattr));
                    $element[0].removeAttribute("data-" + roleattr);

                    if (isVisible) {
                        $element.css("visibility", "hidden");
                    }

                    ++KENDO_COUNT;

                    $timeout(function() {
                        if (isVisible) {
                            $element.css("visibility", "");
                        }
                        var widget = createWidget(scope, element, attrs, role, origAttr, controllers);

                        if (!widget) {
                            return;
                        }

                        --KENDO_COUNT;
                        if (KENDO_COUNT === 0) {
                            scope.$emit("kendoRendered");
                            if (!RENDERED) {
                                RENDERED = true;
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
        MobileButton        : "a",
        MobileBackButton    : "a",
        MobileDetailButton  : "a",
        ListView       : "ul",
        MobileListView : "ul",
        TreeView       : "ul",
        Menu           : "ul",
        ContextMenu    : "ul",
        ActionSheet    : "ul"
    };

    var SKIP_SHORTCUTS = [
        'MobileView',
        'MobileLayout',
        'MobileSplitView',
        'MobilePane',
        'MobileModalView'
    ];

    var MANUAL_DIRECTIVES = [
        'MobileApplication',
        'MobileView',
        'MobileModalView',
        'MobileLayout',
        'MobileActionSheet',
        'MobileDrawer',
        'MobileSplitView',
        'MobilePane',
        'MobileScrollView',
        'MobilePopOver'
    ];

    angular.forEach(['MobileNavBar', 'MobileButton', 'MobileBackButton', 'MobileDetailButton', 'MobileTabStrip', 'MobileScrollView', 'MobileScroller'], function(widget) {
        MANUAL_DIRECTIVES.push(widget);
        widget = "kendo" + widget;
        module.directive(widget, function() {
            return {
                restrict: "A",
                link: function(scope, element, attrs, controllers) {
                    createWidget(scope, element, attrs, widget, widget);
                }
            };
        });
    });

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

        // <kendo-numerictextbox>-type directives
        var dashed = name.replace(/([A-Z])/g, "-$1");

        if (SKIP_SHORTCUTS.indexOf(name.replace("kendo", "")) == -1) {
            var names = name === shortcut ? [ name ] : [ name, shortcut ];
            angular.forEach(names, function(directiveName) {
                module.directive(directiveName, function(){
                    return {
                        restrict : "E",
                        replace  : true,
                        template : function(element, attributes) {
                            var tag = TAGNAMES[className] || "div";
                            return "<" + tag + " " + dashed + ">" + element.html() + "</" + tag + ">";
                        }
                    };
                });
            });
        }

        if (MANUAL_DIRECTIVES.indexOf(name.replace("kendo", "")) > -1) {
            return;
        }

        // here name should be like kendoMobileListView so kendo-mobile-list-view works,
        // and shortcut like kendoMobilelistview, for kendo-mobilelistview

        make(name, name);
        if (shortcut != name) {
            make(shortcut, name);
        }

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
                root.$apply(func);
            }
        } else if (!isDigesting) {
            root.$digest();
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

        var scope = self.$angular_scope; //  || angular.element(self.element).scope();

        if (scope) {
            withoutTimeout(function(){
                var x = arg(), elements = x.elements, data = x.data;
                if (elements.length > 0) {
                    switch (cmd) {

                      case "cleanup":
                        angular.forEach(elements, function(el){
                            var itemScope = angular.element(el).scope();
                            if (itemScope && itemScope !== scope && itemScope.$$kendoScope) {
                                destroyScope(itemScope, el);
                            }
                        });
                        break;

                      case "compile":
                        var injector = self.element.injector();
                        // gross gross gross hack :(. Works for popups that may be out of the ng-app directive.
                        // they don't have injectors. Same thing happens in our tests, too.
                        var compile = injector ? injector.get("$compile") : $defaultCompile;

                        angular.forEach(elements, function(el, i){
                            var itemScope;
                            if (x.scopeFrom) {
                                itemScope = angular.element(x.scopeFrom).scope();
                            } else {
                                var vars = data && data[i];
                                if (vars !== undefined) {
                                    itemScope = $.extend(scope.$new(), vars);
                                    itemScope.$$kendoScope = true;
                                }
                            }

                            compile(el)(itemScope || scope);
                        });
                        digest(scope);
                        break;
                    }
                }
            });
        }
    });

    defadvice("ui.Widget", "$angular_getLogicValue", function(){
        return this.self.value();
    });

    defadvice("ui.Widget", "$angular_setLogicValue", function(val){
        this.self.value(val);
    });

    defadvice("ui.Select", "$angular_getLogicValue", function(){
        var item = this.self.dataItem();
        if (item) {
            if (this.self.options.valuePrimitive) {
                return item[this.self.options.dataValueField];
            } else {
                return item.toJSON();
            }
        } else {
            return null;
        }
    });

    defadvice("ui.Select", "$angular_setLogicValue", function(val){
        var self = this.self;
        var options = self.options;
        var valueField = options.dataValueField;

        if (valueField && !options.valuePrimitive) {
            val = val != null ? val[options.dataValueField || options.dataTextField] : null;
        }

        self.value(val);
    });

    defadvice("ui.MultiSelect", "$angular_getLogicValue", function() {
        var value = this.self.dataItems().slice(0);
        var valueField = this.self.options.dataValueField;

        if (valueField && this.self.options.valuePrimitive) {
            value = $.map(value, function(item) {
                return item[valueField];
            });
        }

        return value;
    });

    defadvice("ui.MultiSelect", "$angular_setLogicValue", function(val){
        if (val == null) {
            val = [];
        }
        var self = this.self,
            valueField = self.options.dataValueField;

        if (valueField && !self.options.valuePrimitive) {
            val = $.map(val, function(item) {
                return item[valueField];
            });
        }

        self.value(val);
    });

    defadvice("ui.AutoComplete", "$angular_getLogicValue", function(){
        var options = this.self.options;

        var values = this.self.value().split(options.separator);
        var valuePrimitive = options.valuePrimitive;
        var data = this.self.dataSource.data();
        var dataItems = [];
        for (var idx = 0, length = data.length; idx < length; idx++) {
            var item = data[idx];
            var dataValue = options.dataTextField ? item[options.dataTextField] : item;
            for (var j = 0; j < values.length; j++) {
                if (dataValue === values[j]) {
                    if (valuePrimitive) {
                        dataItems.push(dataValue);
                    } else {
                        dataItems.push(item.toJSON());
                    }

                    break;
                }
            }
        }

        return dataItems;
    });

    defadvice("ui.AutoComplete", "$angular_setLogicValue", function(value) {
        if (value == null) {
            value = [];
        }

        var self = this.self,
            dataTextField = self.options.dataTextField;

        if (dataTextField && !self.options.valuePrimitive) {
            value = $.map(value, function(item){
                return item[dataTextField];
            });
        }

        self.value(value);
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

    // mobile directives
    module
    .directive('kendoMobileApplication', function() {
        return {
            terminal: true,
            link: function(scope, element, attrs, controllers) {
                createWidget(scope, element, attrs, 'kendoMobileApplication', 'kendoMobileApplication');
            }
        };
    }).directive('kendoMobileView', function() {
        return {
            scope: true,
            link: {
                pre: function(scope, element, attrs, controllers) {
                    attrs.defaultOptions = scope.viewOptions;
                    attrs._instance = createWidget(scope, element, attrs, 'kendoMobileView', 'kendoMobileView');
                },

                post: function(scope, element, attrs) {
                    attrs._instance._layout();
                    attrs._instance._scroller();
                }
            }
        };
    }).directive('kendoMobileDrawer', function() {
        return {
            scope: true,
            link: {
                pre: function(scope, element, attrs, controllers) {
                    attrs.defaultOptions = scope.viewOptions;
                    attrs._instance = createWidget(scope, element, attrs, 'kendoMobileDrawer', 'kendoMobileDrawer');
                },

                post: function(scope, element, attrs) {
                    attrs._instance._layout();
                    attrs._instance._scroller();
                }
            }
        };
    }).directive('kendoMobileModalView', function() {
        return {
            scope: true,
            link: {
                pre: function(scope, element, attrs, controllers) {
                    attrs.defaultOptions = scope.viewOptions;
                    attrs._instance = createWidget(scope, element, attrs, 'kendoMobileModalView', 'kendoMobileModalView');
                },

                post: function(scope, element, attrs) {
                    attrs._instance._layout();
                    attrs._instance._scroller();
                }
            }
        };
    }).directive('kendoMobileSplitView', function() {
        return {
            terminal: true,
            link: {
                pre: function(scope, element, attrs, controllers) {
                    attrs.defaultOptions = scope.viewOptions;
                    attrs._instance = createWidget(scope, element, attrs, 'kendoMobileSplitView', 'kendoMobileSplitView');
                },

                post: function(scope, element, attrs) {
                    attrs._instance._layout();
                }
            }
        };
    }).directive('kendoMobilePane', function() {
        return {
            terminal: true,
            link: {
                pre: function(scope, element, attrs, controllers) {
                    attrs.defaultOptions = scope.viewOptions;
                    createWidget(scope, element, attrs, 'kendoMobilePane', 'kendoMobilePane');
                }
            }
        };
    }).directive('kendoMobileLayout', function() {
        return {
            link: {
                pre: function (scope, element, attrs, controllers) {
                    createWidget(scope, element, attrs, 'kendoMobileLayout', 'kendoMobileLayout');
                }
            }
        };
    }).directive('kendoMobileActionSheet', function() {
        return {
            restrict: "A",
            link: function(scope, element, attrs, controllers) {
                element.find("a[k-action]").each(function() {
                    $(this).attr("data-" + kendo.ns + "action", $(this).attr("k-action"));
                });

                createWidget(scope, element, attrs, 'kendoMobileActionSheet', 'kendoMobileActionSheet');
            }
        };
    }).directive('kendoMobilePopOver', function() {
        return {
            terminal: true,
            link: {
                pre: function(scope, element, attrs, controllers) {
                    attrs.defaultOptions = scope.viewOptions;
                    createWidget(scope, element, attrs, 'kendoMobilePopOver', 'kendoMobilePopOver');
                }
            }
        };
    }).directive('kendoViewTitle', function(){
        return {
            restrict : "E",
            replace  : true,
            template : function(element, attributes) {
                return "<span data-" + kendo.ns + "role='view-title'>" + element.html() + "</span>";
            }
        };
    }).directive('kendoMobileHeader', function() {
            return {
                restrict: "E",
                link: function(scope, element, attrs, controllers) {
                    element.addClass("km-header").attr("data-role", "header");
                }
            };
    }).directive('kendoMobileFooter', function() {
            return {
                restrict: 'E',
                link: function(scope, element, attrs, controllers) {
                    element.addClass("km-footer").attr("data-role", "footer");
                }
            };
    }).directive('kendoMobileScrollViewPage', function(){
        return {
            restrict : "E",
            replace  : true,
            template : function(element, attributes) {
                return "<div data-" + kendo.ns + "role='page'>" + element.html() + "</div>";
            }
        };
    });

    angular.forEach(['align', 'icon', 'rel', 'transition', 'actionsheetContext'], function(attr) {
          var kAttr = "k" + attr.slice(0, 1).toUpperCase() + attr.slice(1);

          module.directive(kAttr, function() {
              return {
                  restrict: 'A',
                  priority: 2,
                  link: function(scope, element, attrs) {
                      element.attr(kendo.attr(kendo.toHyphens(attr)), scope.$eval(attrs[kAttr]));
                  }
              };
          });
    });

    var WIDGET_TEMPLATE_OPTIONS = {
        "TreeMap": [ "Template" ],
        "MobileListView": [ "HeaderTemplate", "Template" ],
        "MobileScrollView": [ "EmptyTemplate", "Template" ],
        "Grid": [ "AltRowTemplate", "DetailTemplate", "RowTemplate" ],
        "ListView": [ "EditTemplate", "Template", "AltTemplate" ],
        "Pager": [ "SelectTemplate", "LinkTemplate" ],
        "PivotGrid": [ "ColumnHeaderTemplate", "DataCellTemplate", "RowHeaderTemplate" ],
        "Scheduler": [ "AllDayEventTemplate", "DateHeaderTemplate", "EventTemplate", "MajorTimeHeaderTemplate", "MinorTimeHeaderTemplate" ],
        "TreeView": [ "Template" ],
        "Validator": [ "ErrorTemplate" ]
    };

    (function() {
        var templateDirectives = {};
        angular.forEach(WIDGET_TEMPLATE_OPTIONS, function(templates, widget) {
            angular.forEach(templates, function(template) {
                if (!templateDirectives[template]) {
                    templateDirectives[template] = [ ];
                }
                templateDirectives[template].push("?^^kendo" + widget);
            });
        });

        angular.forEach(templateDirectives, function(parents, directive) {
            var templateName = "k" + directive;
            var attrName = kendo.toHyphens(templateName);

            module.directive(templateName, function() {
                return {
                    restrict: "A",
                    require: parents,
                    terminal: true,
                    compile: function($element, $attrs) {
                        if ($attrs[templateName] !== "") {
                            return;
                        }

                        $element.removeAttr(attrName);
                        var template = $element[0].outerHTML;

                        return function(scope, element, attrs, controllers) {
                            var controller;

                            while(!controller && controllers.length) {
                                controller = controllers.shift();
                            }

                            if (!controller) {
                                $log.warn(attrName + " without a matching parent widget found. It can be one of the following: " + parents.join(", "));
                            } else {
                                controller.template(templateName, template);
                                $element.remove();
                            }
                        };
                    }
                };
            });
        });

    })();


})(window.kendo.jQuery, window.angular);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
