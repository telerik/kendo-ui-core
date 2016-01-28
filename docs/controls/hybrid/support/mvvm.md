---
title: Integration with Kendo UI MVVM
page_title: Integration with Kendo UI MVVM | Kendo UI Hybrid Components
description: "Start using Kendo UI MVVM in a mobile app, bind the mobile widget's configuration options and manage them through a view model."
previous_url: /controls/hybrid/mvvm
slug: mvvmintegration_hybridkendoui
position: 2
---

# Integration with Kendo UI MVVM

The [Kendo UI hybrid mobile Application](http://demos.telerik.com/kendo-ui/m/index#application/transitions) provides a close integration with the [Kendo UI MVVM framework](http://demos.telerik.com/kendo-ui/mvvm/index). The mobile widgets' configuration options can be bound and managed through a view model.

## Getting Started

### Initialization

The recommended way to use the Kendo UI MVVM with the Hybrid UI Application is through the `model` configuration option of the [mobile `view`](/api/javascript/mobile/ui/view#configuration).

###### Example

    <script>
     var foo = { bar: "baz" }
    </script>

    <div data-role="view" data-model="foo">
       <span data-bind="text:bar"></span>
    </div>

A complex model reference can also be specified.

    <script>
     var foo = {
            bar: { baz: "qux" }
     }
    </script>

    <div data-role="view" data-model="foo.bar">
       <span data-bind="text:baz"></span>
    </div>

### MVVM Binding

When initialized, the mobile View calls [`kendo.bind`]({% slug overview_mvvmpattern_kendoui %}) on its child elements, using the provided model.

> **Important**
>
> The mobile View binds all Kendo UI widgets&mdash;hybrid mobile and web widgets as well as the controls for data visualization&mdash;in that same order. This means that if an element with `data-role="listview"` is present, a hybrid mobile (and not web) ListView is going to be initialized. This behavior can be overridden by specifying the full widget class name, together with its namespace, in the `role` attribute.

As of the Kendo UI Q2 2014 release, the mobile view events may be bound to the view model, too, as demonstrated in the example below.

###### Example

    <script>
     var foo = {
         onViewInit: function(e) {
            console.log(e);
         },

         onViewShow: function(e) {
            console.log(e);
         }
     };
    </script>

    <div data-role="view" data-model="foo" data-bind="events: { init: onViewInit, show: onViewShow }>
       <span data-bind="text:bar"></span>
    </div>

## See also

Other articles on the integration of Kendo UI hybrid components:

* [Integration with Kendo UI for the Web]({% slug integrationkendouiweb_hybridkendoui %})
* [AngularJS Support for the Hybrid UI]({% slug angularjssupport_hybridkendoui %})
* [Build Applications with AngularJS and the Hybrid UI]({% slug buildappswithangular_tutorial_hybridkendoui %})
