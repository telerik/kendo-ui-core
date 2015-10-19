---
title: Initialize a Widget Using Markup
page_title: Initialize a Widget Using Markup
previous_url: /data-attribute-initialization, /howto/declarative_initialization, /basics/markup, /intro/markup
description: "Initialize Kendo UI widgets from markup, add Kendo UI widgets to your application, and use AngularJS or MVVM to configure Kendo UI."
position: 7
---

# Initialize a Widget Using Markup

In addition to the [jQuery plugin syntax](/intro/jquery-initialization), the Kendo UI widgets may be instantiated based on custom HTML attributes in several ways:

**Option 1:** The [View](/framework/spa/view) and the [mobile Application](/mobile/application) instantiate widgets based on the `role` HTML 5 data attributes. Both use the [MVVM](/framework/mvvm/overview) internally.  
**Option 2:** The `kendo.bind` method will scan the passed DOM element contents for the `data-role` attributes and will instantiate the respective widgets.  
**Option 3:** The Kendo UI [AngularJS](/AngularJS/introduction) directives support declarative initialization based on custom element attributes or custom tag names.

> **Important**  
> `data` attribute initialization is not designed to be combined with the Kendo UI server wrappers. Using wrappers is equivalent to [jQuery plug-in syntax initialization](/intro/jquery-initialization). If you want to create Kendo UI widget instances via the
[MVVM](/framework/mvvm/overview) or [AngularJS](/AngularJS/introduction) mechanisms, then do not use server wrappers for these instances.

While it is theoretically possible to initialize several different Kendo UI widgets from the same DOM element via [jQuery plugin syntax](/intro/jquery-initialization),
this is not recommended and is not supported with declarative initialization from markup.

> **Important**  
> It is strongly recommended to initialize Kendo UI widgets from HTML elements, which are part of the DOM tree.
Creating widgets from [document fragments](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) may cause undesired side effects or Javascript errors.

## Declarative Widgets in SPA View

Below is an example referring to a SPA View with an AutoComplete widget in the template. More information about the SPA View may be found in the [Buliding Single Page Applications help section](/framework/spa/overview).

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

## Declarative Widgets with `kendo.bind`

Here is an example referring to an MVVM-bound DOM element with an AutoComplete widget: 

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
> The `data-bind` attribute syntax establishes a two-way binding between the widget options (in that case, the data source) and the view model field (the `source`). For more information, refer to the [MVVM introduction help topic](/framework/mvvm/overview).

## Declarative Widgets in a Hybrid UI Application

Below is an example referring to Kendo Hybrid UI application with a view and an AutoComplete widget. More information about Hybrid UI applications is available in the [Building Hybrid Mobile Applications topic](/framework/spa/overview).

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

## Widget Configuration Options and Event Handlers as Data Attributes

In addition to the `data-role` attribute, the declarative initialization parses other data attributes and passes them as configuration options to the widget constructor. You can find out more about the supported data attributes and how to bind them to widget events in the [data attributes explained](/framework/data-attribute-initialization) section.

## Kendo UI AngularJS Directives

Below is an example referring to the Kendo UI AngularJS AutoComplete directive. To learn more about the features of the Kendo UI AngularJS directives, visit the [AngularJS](/AngularJS/introduction) help topic.

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
