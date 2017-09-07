---
title: Markup Widget Initialization
page_title: Markup Widget Initialization | Kendo UI Getting Started
previous_url: /data-attribute-initialization, /howto/declarative_initialization, /basics/markup, /intro/markup
description: "Initialize Kendo UI widgets from markup, add Kendo UI frameworks to your application, and use AngularJS or MVVM to configure Kendo UI."
slug: initialize_widgets_using_markup_installation
position: 7
---

# Markup Widget Initialization

In addition to the [jQuery plugin syntax]({% slug initialize_widgets_using_jquery_plugins_installation %}), the Kendo UI widgets might be instantiated based on custom HTML attributes.

## Overview

You can initialize widgets based on custom HTML attributes in the following ways:

* **Option 1** The [View]({% slug viewclass_kendoui_singlepageapplication %}) and the [mobile Application]({% slug overview_hybridapplication %}) instantiate widgets based on the `role` HTML5 `data` attributes. Both use the [MVVM]({% slug overview_mvvmpattern_kendoui %}) internally.  
* **Option 2** The `kendo.bind` method scans the passed DOM element contents for the `data-role` attributes and instantiates the respective widgets.  
* **Option 3** The Kendo UI [AngularJS]({% slug angularjs_integration_directives %}) directives support declarative initialization based on custom element attributes or custom tag names.

> **Important**
>
> The `data` attribute initialization is not designed to be combined with the Kendo UI server wrappers. The usage of wrappers is equivalent to [jQuery plug-in syntax initialization]({% slug initialize_widgets_using_jquery_plugins_installation %}). To create Kendo UI widget instances through the [MVVM]({% slug overview_mvvmpattern_kendoui %}) or [AngularJS]({% slug angularjs_integration_directives %}) mechanisms, do not use server wrappers for these instances.

While it is theoretically possible to initialize several different Kendo UI widgets from the same DOM element through the [jQuery plug-in syntax]({% slug initialize_widgets_using_jquery_plugins_installation %}), it is not supported with the declarative initialization from markup.

> **Important**
>
> It is strongly recommended to initialize the Kendo UI widgets from HTML elements, which are part of the DOM tree. The creation of widgets from [document fragments](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) might cause undesired side effects or lead to JavaScript errors.

## Declarative Initialization

You can declaratively initialize widgets:
* In [Single-Page-Application (SPA) Views](#in-spa-views).
* In the [Model-View-ViewModel (MVVM) architectural pattern](#in-mvvm).
* In [Hybrid UI Applications](#in-hybrid-ui-applications).

### In SPA Views

The following example refers to a (SPA) View with an AutoComplete widget in the template. For more information on the SPA View, refer to the [article on building Single Page Applications]({% slug overview_kendoui_singlepageapplication %}).

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

### In MVVM

The following example refers to an MVVM-bound DOM element with an AutoComplete widget.

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
> The `data-bind` attribute syntax establishes a two-way binding between the widget options&mdash;in this case, the Data Source&mdash;and the view model field (the `source`). For more information, refer to the [introductory article on MVVM]({% slug overview_mvvmpattern_kendoui %}).

### In Hybrid UI Applications

The following example refers to a Kendo UI hybrid Application with a View and an AutoComplete widget. For more information about the Hybrid UI applications, refer to the [article on building hybrid mobile applications]({% slug overview_hybridkendoui %}).

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

To configure widgets that are declaratively initialized, you need to be aware of some specifics such as the parsing of the `data` attributes and the AngularJS directives.  

### The data Attributes

In addition to the `data-role` attribute, the declarative initialization parses other `data` attributes and passes them as configuration options to the widget constructor. For more information on the supported data attributes and on how to bind them to widget events, refer to the [section on data attributes]({% slug dataattributes_configuration_installation %}).

### AngularJS Directives

The following example refers to the AngularJS directive in the Kendo UI AutoComplete. For more information on the features of the Kendo UI AngularJS directives, refer to the [introductory article on AngularJS]({% slug angularjs_integration_directives %}).

###### Example

```

    <div ng-app="myApp">
        <div ng-controller="MyController">
            <input kendo-autocomplete k-data-source="dataSource" />
        </div>
    </div>

    <script>
        var myApp = angular
  			            .module("myApp", [ "kendo.directives" ])
          			    .controller("MyController", function($scope) {
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
