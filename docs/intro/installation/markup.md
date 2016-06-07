---
title: Markup Widget Initialization
page_title: Markup Widget Initialization | Kendo UI Getting Started
previous_url: /data-attribute-initialization, /howto/declarative_initialization, /basics/markup, /intro/markup
description: "Initialize Kendo UI widgets from markup, add Kendo UI frameworks to your application, and use AngularJS or MVVM to configure Kendo UI."
slug: initialize_widgets_using_markup_installation
position: 7
---

# Markup Widget Initialization

In addition to the [jQuery plugin syntax]({% slug initialize_widgets_using_jquery_plugins_installation %}), the Kendo UI widgets might be instantiated based on custom HTML attributes in several ways:

**Option 1** The [View]({% slug viewclass_kendoui_singlepageapplication %}) and the [mobile Application](/controls/hybrid/application) instantiate widgets based on the `role` HTML5 `data` attributes. Both use the [MVVM]({% slug overview_mvvmpattern_kendoui %}) internally.  

**Option 2** The `kendo.bind` method scans the passed DOM element contents for the `data-role` attributes and instantiates the respective widgets.  

**Option 3** The Kendo UI [AngularJS]({% slug angularjs_integration_directives %}) directives support declarative initialization based on custom element attributes or custom tag names.

> **Important**
>
> The `data` attribute initialization is not designed to be combined with the Kendo UI server wrappers. The usage of wrappers is equivalent to [jQuery plug-in syntax initialization]({% slug initialize_widgets_using_jquery_plugins_installation %}). To create Kendo UI widget instances through the [MVVM]({% slug overview_mvvmpattern_kendoui %}) or [AngularJS]({% slug angularjs_integration_directives %}) mechanisms, use no server wrappers for these instances.

While it is theoretically possible to initialize several different Kendo UI widgets from the same DOM element through the [jQuery plug-in syntax]({% slug initialize_widgets_using_jquery_plugins_installation %}), this is not recommended and is not supported with declarative initialization from markup.

> **Important**
>
> It is strongly recommended to initialize Kendo UI widgets from HTML elements, which are part of the DOM tree. The creation of widgets from [document fragments](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) might cause undesired side effects or Javascript errors.

## Declarative Widgets

### In SPA View

The example below refers to a Single-Page-Application (SPA) View with an AutoComplete widget in the template. For more information on the SPA View, see the article on [building Single Page Applications]({% slug overview_kendoui_singlepageapplication %}).

###### Example

```
    <div id="container"></div>
    <script id="index" type="text/x-kendo-template">
        <div>Hello <input data-role="autocomplete" data-source="['foo', 'bar', 'baz']" />!</div>
    </script>

    <script>
        var index = new kendo.View('index');
        index.render("#container");
    </script>
```

### In MVVM Pattern

The example below refers to an MVVM-bound DOM element with an AutoComplete widget.

###### Example

```
    <div id="container">
        <div>Hello <input data-role="autocomplete" data-bind="source: source" />!</div>
    </div>

    <script>
        kendo.bind($("#container"), {
            source: ['foo', 'bar', 'baz']
        });
    </script>
```

> **Important**
>
> The `data-bind` attribute syntax establishes a two-way binding between the widget options&mdash;in that case, the data source&mdash;and the view model field (the `source`). For more information, refer to the [MVVM introduction help topic]({% slug overview_mvvmpattern_kendoui %}).

### In Hybrid UI Applications

The example below refers to a Kendo UI hybrid Application with a view and an AutoComplete widget. For more information about Hybrid UI applications, refer to the article on [building hybrid mobile applications]({% slug overview_hybridkendoui %}).

###### Example

```
    <div data-role="view" data-model="foo">
        <div>
        An autocomplete widget
        <input data-role="autocomplete" data-source="['foo', 'bar', 'baz']" />
        </div>

        <div>
        A widget bound to the mobile view ViewModel dataSource field
        <input data-role="autocomplete" data-bind="source: dataSource" />
        </div>
    </div>

    <script>
        var foo = kendo.observable({
            dataSource: ['foo', 'bar', 'baz']
        });

        new kendo.mobile.Application();
    </script>
```

## Configuration

In addition to the `data-role` attribute, the declarative initialization parses other data attributes and passes them as configuration options to the widget constructor. For more information on the supported data attributes and on how to bind them to widget events, see the [section on data attributes](/framework/data-attribute-initialization).

### AngularJS Directives

The example below refers to the Kendo UI AngularJS AutoComplete directive. For more information on the features of the Kendo UI AngularJS directives, see the [introductory article on AngularJS]({% slug angularjs_integration_directives %}).

###### Example

```
    <div ng-app>
        <div ng-controller="MyController">
            <input kendo-autocomplete k-data-source="dataSource" />
        </div>
    </div>

    <script>
        var myApp = angular.module("myApp", [ "kendo.directives" ]).

        myApp.controller("MyController", function($scope) {
            $scope.dataSource = [
                'foo', 'bar', 'baz'
            ]
        });
    </script>
```

## See Also

Other articles on getting started with Kendo UI:

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Include Only What You Need]({% slug include_only_what_you_need_kendoui_installation %})
* [JavaScript Prerequisites]({% slug javascript_prerequisites_kendoui_installation %})
* [Initialize Widgets Using jQuery Plug-Ins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Access Widget DOM Elements: wrapper and element]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Set Data Attributes]({% slug dataattributes_configuration_installation %})
* [Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
* [Destroy Widgets]({% slug destroywidgets_kendoui_gettingstarted %})
* [Edit Widgets]({% slug kendoui_editing_gettingstarted %})
* [Create Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [NuGet Packages]({% slug kendoui_nuget_packages %})
