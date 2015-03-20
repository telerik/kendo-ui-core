---
title: Initialize a Kendo UI Widget From Markup
page_title: Use AngularJS or Kendo UI MVVM to instantiate and configure Kendo UI widgets
previous_url: /data-attribute-initialization, /howto/declarative_initialization
description: Learn how to add Kendo UI widgets to your mobile website or web application.
position: 2
---

1. [Declarative Widgets in SPA View](#a-spa-view-with-an-autocomplete-widget-in-the-template)
1. [Declarative Widgets with `kendo.bind`](#mvvm-bound-dom-element-with-an-autocomplete-widget)
1. [Declarative Widgets in a Mobile Application](#kendo-ui-mobile-application-with-a-view-and-an-autocomplete-widget)
1. [Kendo UI AngularJS Directives](#kendo-ui-angularjs-autocomplete-directive)

# Initialize Kendo UI Widgets From Markup

In addition to the [jQuery plugin syntax](/basics/jquery-initialization), the Kendo UI widgets may be instantiated based on custom HTML attributes in several ways:

* The [View](/framework/spa/view) and the [mobile Application](/getting-started/mobile/application) instantiate widgets based on `role` **HTML 5 data attributes**. Both use the [MVVM](/getting-started/framework/mvvm/overview) internally;
* The `kendo.bind` method will scan the passed DOM element contents for `data-role` attributes and will instantiate the respective widgets;
* The Kendo UI [**AngularJS**](/AngularJS/introduction) directives support declarative initialization based on **custom element attributes** or **custom tag names**.

## A SPA View With an AutoComplete Widget in the Template

    <div id="container"></div>
    <script id="index" type="text/x-kendo-template">
        <div>Hello <input data-role="autocomplete" data-source="['foo', 'bar', 'baz']" />!</div>
    </script>

    <script>
        var index = new kendo.View('index');
        index.render("#container");
    </script>

More information about the SPA View may be found in the [Buliding Single Page Applications help section](/framework/spa/overview).

## MVVM Bound DOM Element With an AutoComplete widget

    <div id="container">
        <div>Hello <input data-role="autocomplete" data-bind="source: source" />!</div>
    </div>

    <script>
        kendo.bind($("#container"), {
            source: ['foo', 'bar', 'baz']
        });
    </script>

> The `data-bind` attribute syntax establishes a two-way binding between the widget options (in that case, the data source) and the view model field (the `source`). For more information, refer to the [MVVM introduction help topic](/framework/mvvm/overview).

## Kendo UI Mobile Application With a View and an AutoComplete Widget

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


More information about the Kendo UI Mobile Application is available in the [Building Hybrid Mobile Applications topic](/mobile/application).

## Widget Configuration Options and Event Handlers as Data Attributes

In addition to the `data-role` attribute, the declarative initialization parses other data attributes and passes them as configuration options to the widget constructor.
You can find out more about the supported data attributes and how to bind to widget events in the [data attributes explained](/framework/data-attribute-initialization) section.

## Kendo UI AngularJS AutoComplete Directive

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

To learn more about the features of the Kendo UI AngularJS directives, please visit the [AngularJS](/AngularJS/introduction) help topic.
