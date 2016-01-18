---
title: Initialize Widgets Using Markup
page_title: Initialize Widgets Using Markup | Kendo UI Installation
previous_url: /data-attribute-initialization, /howto/declarative_initialization, /basics/markup, /intro/markup
description: "Initialize Kendo UI widgets from markup, add Kendo UI frameworks to your application, and use AngularJS or MVVM to configure Kendo UI."
slug: initialize_widgets_using_markup_installation
position: 7
---

# Initialize Widgets Using Markup

In addition to the [jQuery plugin syntax](/intro/installation/jquery-initialization), the Kendo UI widgets may be instantiated based on custom HTML attributes in several ways:

**Option 1** The [View](/framework/spa/view) and the [mobile Application](/controls/hybrid/application) instantiate widgets based on the `role` HTML 5 data attributes. Both use the [MVVM](/framework/mvvm/overview) internally.  
**Option 2** The `kendo.bind` method will scan the passed DOM element contents for the `data-role` attributes and will instantiate the respective widgets.  
**Option 3** The Kendo UI [AngularJS]({% slug angularjs_integration_directives %}) directives support declarative initialization based on custom element attributes or custom tag names.

> **Important**  
>
> The `data` attribute initialization is not designed to be combined with the Kendo UI server wrappers. Using wrappers is equivalent to [jQuery plug-in syntax initialization]({% slug initialize_widgets_using_jquery_plugins_installation %}). If you want to create Kendo UI widget instances via the [MVVM](/framework/mvvm/overview) or [AngularJS]({% slug angularjs_integration_directives %}) mechanisms, then do not use server wrappers for these instances.

While it is theoretically possible to initialize several different Kendo UI widgets from the same DOM element via [jQuery plugin syntax]({% slug initialize_widgets_using_jquery_plugins_installation %}), this is not recommended and is not supported with declarative initialization from markup.

> **Important**  
>
> It is strongly recommended to initialize Kendo UI widgets from HTML elements, which are part of the DOM tree.
Creating widgets from [document fragments](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) may cause undesired side effects or Javascript errors.

## Declarative Widgets

### In SPA View

Below is an example referring to a SPA View with an AutoComplete widget in the template. More information about the SPA View may be found in the [Buliding Single Page Applications help section]({% slug overview_kendoui_singlepageapplication %}).

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

Here is an example referring to an MVVM-bound DOM element with an AutoComplete widget.

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
> The `data-bind` attribute syntax establishes a two-way binding between the widget options (in that case, the data source) and the view model field (the `source`). For more information, refer to the [MVVM introduction help topic]({% slug overview_mvvmpattern_kendoui }).

### In Hybrid UI Application

Below is an example referring to Kendo Hybrid UI application with a view and an AutoComplete widget. More information about Hybrid UI applications is available in the [Building Hybrid Mobile Applications topic]({% slug overview_kendoui_singlepageapplication %}).

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

In addition to the `data-role` attribute, the declarative initialization parses other data attributes and passes them as configuration options to the widget constructor. You can find out more about the supported data attributes and how to bind them to widget events in the [data attributes explained](/framework/data-attribute-initialization) section.

### AngularJS Directives

Below is an example referring to the Kendo UI AngularJS AutoComplete directive. To learn more about the features of the Kendo UI AngularJS directives, visit the [ introductory article on AngularJS]({% slug angularjs_integration_directives %}).

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

* [Getting Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Include Only What You Need]({% slug include_only_what_you_need_kendoui_installation %})
* [JavaScript Prerequisites]({% slug javascript_prerequisites_kendoui_installation %})
* [Initialize Widgets Using jQuery Plug-Ins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
