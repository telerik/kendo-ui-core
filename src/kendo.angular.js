(function(f, define){
    define([ "./kendo.core" ], f);
})(function() {

var __meta__ = { // jshint ignore:line
    id: "angular",
    name: "AngularJS Directives",
    category: "framework",
    description: "Adds Kendo UI for AngularJS directives",
    depends: [ "core" ],
    defer: true
};

(function ($, angular, undefined) {
    "use strict";

    // Angular2 exposes a global angular object, but it does not have an injector...
    if (!angular || !angular.injector) {
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
            PivotGrid   : 'PivotDataSource',
            PivotConfigurator   : 'PivotDataSource',
            PanelBar    : 'HierarchicalDataSource',
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
            var current = scope.$eval(source);
            var ds = toDataSource(current, type);

            scope.$watch(source, function(mew) {
                var widget = kendoWidgetInstance(element);

                if (widget && typeof widget.setDataSource == "function") {
                    if (mew !== current) {
                        var ds = toDataSource(mew, type);
                        widget.setDataSource(ds);
                        current = mew;
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

    function createWidget(scope, element, attrs, widget, origAttr, controllers) {
        /* jshint latedef: false */
        if (!(element instanceof jQuery)) {
            throw new Error("The Kendo UI directives require jQuery to be available before AngularJS. Please include jquery before angular in the document.");
        }

        var kNgDelay = attrs.kNgDelay,
            delayValue = scope.$eval(kNgDelay);

        controllers = controllers || [];

        var ngModel = controllers[0],
            ngForm = controllers[1];

        var ctor = $(element)[widget];

        if (!ctor) {
            window.console.error("Could not find: " + widget);
            return null;
        }

        var parsed = parseOptions(scope, element, attrs, widget, ctor);

        var options = parsed.options;

        if (parsed.unresolved.length) {
            var promises = [];

            for (var i = 0, len = parsed.unresolved.length; i < len; i++) {

                var unresolved = parsed.unresolved[i];

                var promise = $.Deferred(function(d) {
                    var unwatch = scope.$watch(unresolved.path, function(newValue) {
                        if (newValue !== undefined) {
                            unwatch();
                            d.resolve();
                        }
                    });
                }).promise();

                promises.push(promise);
            }

            $.when.apply(null, promises).then(createIt);

            return;
        }

        if (kNgDelay && !delayValue) {
            var root = scope.$root || scope;

            var register = function() {
                var unregister = scope.$watch(kNgDelay, function(newValue) {
                        if (newValue !== undefined) {
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

            // re-parse the options here.
            options = parseOptions(scope, element, attrs, widget, ctor).options;

            if (element.is("select")) {
                (function(options){
                    if (options.length > 0) {
                        var first = $(options[0]);
                        if (!/\S/.test(first.text()) && /^\?/.test(first.val())) {
                            first.remove();
                        }

                        for (var i = 0; i < options.length; i++) {
                            $(options[i]).off("$destroy");
                        }
                    }
                }(element[0].options));
            }

            var object = ctor.call(element, OPTIONS_NOW = options).data(widget);

            exposeWidget(object, scope, attrs, widget, origAttr);

            scope.$emit("kendoWidgetCreated", object);

            var destroyRegister = destroyWidgetOnScopeDestroy(scope, object);

            if (attrs.kRebind) {
                setupRebind(object, scope, element, originalElement, attrs.kRebind, destroyRegister, attrs);
            }

            if (attrs.kNgDisabled) {
                var kNgDisabled = attrs.kNgDisabled;
                var isDisabled = scope.$eval(kNgDisabled);
                if (isDisabled) {
                    object.enable(!isDisabled);
                }
                bindToKNgDisabled(object, scope, element, kNgDisabled);
            }

            if (attrs.kNgReadonly) {
                var kNgReadonly = attrs.kNgReadonly;
                var isReadonly = scope.$eval(kNgReadonly);
                if (isReadonly) {
                    object.readonly(isReadonly);
                }
                bindToKNgReadonly(object, scope, element, kNgReadonly);
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


    function parseOptions(scope, element, attrs, widget, ctor) {
        var role = widget.replace(/^kendo/, '');
        var unresolved = [];
        var optionsPath = attrs.kOptions || attrs.options;
        var optionsValue = scope.$eval(optionsPath);

        if (optionsPath && optionsValue === undefined) {
            unresolved.push({ option: "options", path: optionsPath });
        }

        var options = angular.extend({}, attrs.defaultOptions, optionsValue);

        function addOption(name, value) {
            var scopeValue = angular.copy(scope.$eval(value));
            if (scopeValue === undefined) {
                unresolved.push({ option: name, path: value });
            } else {
                options[name] = scopeValue;
            }
        }


        var widgetOptions = ctor.widget.prototype.options;
        var widgetEvents = ctor.widget.prototype.events;


        $.each(attrs, function(name, value) {
            if (name === "source" || name === "kDataSource" || name === "kScopeField" || name === "scopeField") {
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
                addOption(dataName, value);
            } else if (widgetOptions.hasOwnProperty(name) && !ignoredOwnProperties[name]) {
                addOption(name, value);
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
                        addOption(optionName, value);
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

        return {
            options: options,
            unresolved: unresolved
        };
    }

    function bindToKNgDisabled(widget, scope, element, kNgDisabled) {
        if ((kendo.ui.PanelBar && widget instanceof kendo.ui.PanelBar) || (kendo.ui.Menu && widget instanceof kendo.ui.Menu)) {
            $log.warn("k-ng-disabled specified on a widget that does not have the enable() method: " + (widget.options.name));
            return;
        }
        scope.$watch(kNgDisabled, function(newValue, oldValue) {
            if (newValue != oldValue) {
                widget.enable(!newValue);
            }
        });
    }

    function bindToKNgReadonly(widget, scope, element, kNgReadonly) {
        if (typeof widget.readonly != "function") {
            $log.warn("k-ng-readonly specified on a widget that does not have the readonly() method: " + (widget.options.name));
            return;
        }
        scope.$watch(kNgReadonly, function(newValue, oldValue) {
            if (newValue != oldValue) {
                widget.readonly(newValue);
            }
        });
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
        // Some widgets trigger "change" on the input field
        // and this would result in two events sent (#135)
        var haveChangeOnElement = false;

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
        var viewRender = function() {
            // Update the widget with the view value.

            // delaying with setTimout for cases where the datasource is set thereafter.
            // https://github.com/kendo-labs/angular-kendo/issues/304
            var val = ngModel.$viewValue;
            if (val === undefined) {
                val = ngModel.$modelValue;
            }

            if (val === undefined) {
                val = null;
            }

            haveChangeOnElement = true;
            setTimeout(function(){
                haveChangeOnElement = false;
                if (widget) { // might have been destroyed in between. :-(
                    var kNgModel = scope[widget.element.attr("k-ng-model")];

                    if (kNgModel) {
                        val = kNgModel;
                    }

                    if (widget.options.autoBind === false && !widget.listView.bound()) {
                        if (val) {
                            widget.value(val);
                        }
                    } else {
                        widget.value(val);
                    }
                }
            }, 0);
        };

        ngModel.$render = viewRender;
        setTimeout(function() {
            if (ngModel.$render !== viewRender) {
                ngModel.$render = viewRender;
                ngModel.$render();
            }
        });

        if (isForm(element)) {
            element.on("change", function() {
                haveChangeOnElement = true;
            });
        }

        var onChange = function(pristine) {
            return function() {
                var formPristine;
                if (haveChangeOnElement && !element.is("select")) {
                    return;
                }
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
        widget.first("spin", onChange(false));

        if (!(kendo.ui.AutoComplete && widget instanceof kendo.ui.AutoComplete)) {
            widget.first("dataBound", onChange(true));
        }

        var currentVal = value();

        // if the model value is undefined, then we set the widget value to match ( == null/undefined )
        // In telerik/kendo-ui-core#1027 we discovered that after the timeout the $viewValue arives as NaN in some weird, default form.
        // Hence the check below.
        if (!isNaN(ngModel.$viewValue) && currentVal != ngModel.$viewValue) {
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

        var form  = $(widget.element).parents("ng-form, form").first();
        var ngForm = kendo.getter(form.attr("name"), true)(scope);
        var getter = $parse(kNgModel);
        var setter = getter.assign;
        var updating = false;

        var valueIsCollection = kendo.ui.MultiSelect && widget instanceof kendo.ui.MultiSelect ||
                                kendo.ui.RangeSlider && widget instanceof kendo.ui.RangeSlider;

        var length = function(value) {
            //length is irrelevant when value is not collection
            return value && valueIsCollection ? value.length : 0;
        };

        var currentValueLength = length(getter(scope));

        widget.$angular_setLogicValue(getter(scope));

        // keep in sync
        var watchHandler = function(newValue, oldValue) {
            if (newValue === undefined) {
                // because widget's value() method usually checks if the new value is undefined,
                // in which case it returns the current value rather than clearing the field.
                // https://github.com/telerik/kendo-ui-core/issues/299
                newValue = null;
            }

            //compare values by reference if a collection
            if (updating || (newValue == oldValue && length(newValue) == currentValueLength)) {
                return;
            }

            currentValueLength = length(newValue);
            widget.$angular_setLogicValue(newValue);
        };

        if (valueIsCollection) {
            scope.$watchCollection(kNgModel, watchHandler);
        } else {
            scope.$watch(kNgModel, watchHandler);
        }

        var changeHandler = function() {
            updating = true;

            if (ngForm && ngForm.$pristine) {
                ngForm.$setDirty();
            }

            digest(scope, function(){
                setter(scope, widget.$angular_getLogicValue());
                currentValueLength = length(getter(scope));
            });

            updating = false;
        };

        widget.first("change", changeHandler);
        widget.first("spin", changeHandler);
    }

    function destroyWidgetOnScopeDestroy(scope, widget) {
        var deregister = scope.$on("$destroy", function() {
            deregister();
            if (widget) {
                kendo.destroy(widget.element);
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
                        if (typeof widget.enable == "function" && !widget.element.attr("readonly")) {
                            widget.enable(!$(chg.target).attr("disabled"));
                        }
                        break;

                    case "readonly":
                        if (typeof widget.readonly == "function" && !widget.element.attr("disabled")) {
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

    function setupRebind(widget, scope, element, originalElement, rebindAttr, destroyRegister, attrs) {
        // watch for changes on the expression passed in the k-rebind attribute
        var unregister = scope.$watch(rebindAttr, function(newValue, oldValue) {
            if (!widget._muteRebind && newValue !== oldValue) {
                unregister(); // this watcher will be re-added if we compile again!

                if (attrs._cleanUp) {
                    attrs._cleanUp();
                }

                var templateOptions = WIDGET_TEMPLATE_OPTIONS[widget.options.name];

                if (templateOptions) {
                    templateOptions.forEach(function(name) {
                        var templateContents = scope.$eval(attrs["k" + name]);

                        if (templateContents) {
                            originalElement.append($(templateContents).attr(kendo.toHyphens("k" + name), ""));
                        }
                    });
                }

                var _wrapper = $(widget.wrapper)[0];
                var _element = $(widget.element)[0];
                var isUpload = widget.options.name === "Upload";

                if (isUpload) {
                    element = $(_element);
                }

                var compile = element.injector().get("$compile");
                widget._destroy();

                if (destroyRegister) {
                    destroyRegister();
                }

                widget = null;

                if (_element) {
                    if (_wrapper) {
                        _wrapper.parentNode.replaceChild(_element, _wrapper);
                    }
                    $(element).replaceWith(originalElement);
                }

                compile(originalElement)(scope);
            }
        }, true); // watch for object equality. Use native or simple values.
        digest(scope);
    }

    function bind(f, obj) {
        return function(a, b) {
            return f.call(obj, a, b);
        };
    }

    function setTemplate(key, value) {
        this[key] = kendo.stringify(value); // jshint ignore:line
    }

    module.factory('directiveFactory', [ '$compile', function(compile) {
        var kendoRenderedTimeout;
        var RENDERED = false;

        // caching $compile for the dirty hack upstairs. This is awful, but we happen to have elements outside of the bootstrapped root :(.
        $defaultCompile = compile;

        var create = function(role, origAttr) {
            return {
                // Parse the directive for attributes and classes
                restrict: "AC",
                require: [ "?ngModel", "^?form" ],
                scope: false,

                controller: [ '$scope', '$attrs', '$element', function($scope, $attrs) {
                    this.template = bind(setTemplate, $attrs);
                    $attrs._cleanUp = bind(function(){
                        this.template = null;
                        $attrs._cleanUp = null;
                    }, this);
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

                    $element.attr(roleattr, $element.attr("data-" + roleattr));
                    $element[0].removeAttribute("data-" + roleattr);

                    var widget = createWidget(scope, element, attrs, role, origAttr, controllers);

                    if (!widget) {
                        return;
                    }

                    if (kendoRenderedTimeout) {
                        clearTimeout(kendoRenderedTimeout);
                    }

                    kendoRenderedTimeout = setTimeout(function() {
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
        MobileListView: "ul",
        PanelBar       : "ul",
        TreeView       : "ul",
        Menu           : "ul",
        ContextMenu    : "ul",
        ActionSheet    : "ul"
    };

    var SKIP_SHORTCUTS = [
        'MobileView',
        'MobileDrawer',
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
                link: function(scope, element, attrs) {
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
                            var scopeField = attributes.kScopeField || attributes.scopeField;

                            return "<" + tag + " " + dashed + (scopeField ? ('="' + scopeField + '"') : "") + ">" + element.html() + "</" + tag + ">";
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
                .removeData("$$kendoScope")
                .removeData("$isolateScope")
                .removeData("$isolateScopeNoTemplate")
                .removeClass("ng-scope");
        }
    }

    var encode = kendo.htmlEncode;
    var open = /{{/g;
    var close = /}}/g;
    var encOpen = '{&#8203;{';
    var encClose = '}&#8203;}';

    kendo.htmlEncode = function(str) {
        return encode(str)
            .replace(open, encOpen)
            .replace(close, encClose);
    };

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

    kendo.onWidgetRegistered(function(entry){
        pendingPatches = $.grep(pendingPatches, function(args){
            return !defadvice.apply(null, args);
        });
        createDirectives(entry.widget, entry.prefix == "Mobile");
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

        var scope = self.$angular_scope;

        if (scope) {
            withoutTimeout(function(){
                var x = arg(), elements = x.elements, data = x.data;
                if (elements.length > 0) {
                    switch (cmd) {

                      case "cleanup":
                        angular.forEach(elements, function(el){
                            var itemScope = $(el).data("$$kendoScope");

                            if (itemScope && itemScope !== scope && itemScope.$$kendoScope) {
                                destroyScope(itemScope, el);
                            }
                        });
                        break;

                      case "compile":
                        var injector = self.element.injector();
                        var compile = injector ? injector.get("$compile") : $defaultCompile;

                        angular.forEach(elements, function(el, i){
                            var itemScope;
                            if (x.scopeFrom) {
                                itemScope = x.scopeFrom;
                            } else {
                                var vars = data && data[i];
                                if (vars !== undefined) {
                                    itemScope = $.extend(scope.$new(), vars);
                                    itemScope.$$kendoScope = true;
                                } else {
                                    itemScope = scope;
                                }
                            }

                            $(el).data("$$kendoScope", itemScope);
                            compile(el)(itemScope);
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
        var item = this.self.dataItem(),
            valueField = this.self.options.dataValueField;

        if (item) {
            if (this.self.options.valuePrimitive) {
                if (!!valueField) {
                    return item[valueField];
                } else {
                    return item;
                }
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
        var text = options.text || "";

        if (val === undefined) {
            val = "";
        }

        if (valueField && !options.valuePrimitive && val) {
            text = val[options.dataTextField] || "";
            val = val[valueField || options.dataTextField];
        }

        if (self.options.autoBind === false && !self.listView.bound()) {
            if (!text && val && options.valuePrimitive) {
                self.value(val);
            } else {
                self._preselect(val, text);
            }
        } else {
            self.value(val);
        }
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

        var self = this.self;
        var options = self.options;
        var valueField = options.dataValueField;
        var data = val;

        if (valueField && !options.valuePrimitive) {
            val = $.map(val, function(item) {
                return item[valueField];
            });
        }

        if (options.autoBind === false && !options.valuePrimitive && !self.listView.bound()) {
            self._preselect(data, val);
        } else {
            self.value(val);
        }
    });

    /* AutoComplete's getter and setter are removed!
       By design, AutoComplete should be bound only to primitive string
       value and data items are bound only to serve the list of suggestions.

       Binding multiple data items is supported by the MultiSelect widget.
    */

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
    defadvice([ "ui.Grid", "ui.ListView", "ui.TreeView", "ui.PanelBar" ], "$angular_makeEventHandler", function(event, scope, handler){
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
            if (widget._checkBoxSelection) {
                multiple = true;
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
                locals.angularDataItem = kendo.proxyModelSetters(locals.dataItem);
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
            link: function(scope, element, attrs) {
                createWidget(scope, element, attrs, 'kendoMobileApplication', 'kendoMobileApplication');
            }
        };
    }).directive('kendoMobileView', function() {
        return {
            scope: true,
            link: {
                pre: function(scope, element, attrs) {
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
                pre: function(scope, element, attrs) {
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
                pre: function(scope, element, attrs) {
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
                pre: function(scope, element, attrs) {
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
                pre: function(scope, element, attrs) {
                    attrs.defaultOptions = scope.viewOptions;
                    createWidget(scope, element, attrs, 'kendoMobilePane', 'kendoMobilePane');
                }
            }
        };
    }).directive('kendoMobileLayout', function() {
        return {
            link: {
                pre: function (scope, element, attrs) {
                    createWidget(scope, element, attrs, 'kendoMobileLayout', 'kendoMobileLayout');
                }
            }
        };
    }).directive('kendoMobileActionSheet', function() {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
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
                pre: function(scope, element, attrs) {
                    attrs.defaultOptions = scope.viewOptions;
                    createWidget(scope, element, attrs, 'kendoMobilePopOver', 'kendoMobilePopOver');
                }
            }
        };
    }).directive('kendoViewTitle', function(){
        return {
            restrict : "E",
            replace  : true,
            template : function(element) {
                return "<span data-" + kendo.ns + "role='view-title'>" + element.html() + "</span>";
            }
        };
    }).directive('kendoMobileHeader', function() {
            return {
                restrict: "E",
                link: function(scope, element) {
                    element.addClass("km-header").attr("data-role", "header");
                }
            };
    }).directive('kendoMobileFooter', function() {
            return {
                restrict: 'E',
                link: function(scope, element) {
                    element.addClass("km-footer").attr("data-role", "footer");
                }
            };
    }).directive('kendoMobileScrollViewPage', function(){
        return {
            restrict : "E",
            replace  : true,
            template : function(element) {
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
        "Scheduler": ["AllDayEventTemplate", "DateHeaderTemplate", "EventTemplate", "MajorTimeHeaderTemplate", "MinorTimeHeaderTemplate"],
        "PanelBar": [ "Template" ],
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
                                element.remove();
                            }
                        };
                    }
                };
            });
        });

    })();


})(window.kendo.jQuery, window.angular);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
