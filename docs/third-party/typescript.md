---
title: TypeScript
page_title: TypeScript | Kendo UI Third-Party Tools
description: "Learn how to enable strongly-typed access to the Kendo UI widgets and their configuration."
previous_url: /howto/typescript/overview, /typescript
slug: typescript_integration_kendoui
position: 5
---

# TypeScript

Kendo UI provides a [TypeScript](http://www.typescriptlang.org/) definitions file which enables strongly-typed access to the Kendo UI widgets and their configuration.

## Installation

### From Redistributable Package

Each Kendo UI distribution includes a `typescript` directory which contains a `.d.ts` file, i.e. `kendo.all.d.ts`. Copy this file to your project and in your TypeScript file add a reference to it as demonstrated below:

    /// <reference path="kendo.all.d.ts" />

You are able to optionally include the latest jQuery TypeScript definition file as well:

    /// <reference path="jquery-1.8.d.ts" />
    /// <reference path="kendo.all.d.ts" />

### As NuGet Package

The Kendo UI TypeScript definitions are available on https://www.nuget.org/ as [`kendo-ui.TypeScript.DefinitelyTyped`](https://www.nuget.org/packages/kendo-ui.TypeScript.DefinitelyTyped/). The package is maintained via the [DefinitelyTyped](http://definitelytyped.org/) project.

## Features

### Get Instance of Existing Widgets

![Get instance of existing Kendo UI widget](/images/get-instance.png)

### Initialize and Configure Widgets

![All Kendo UI widgets](/images/init.png)

### Initialize Kendo UI DataSource

![Initialize a Kendo DataSource](/images/datasource.png)

### Create Widgets via TypeScript Inheritance

The example below demonstrates how to inherit from an existing Kendo UI widget.

###### Example

    /// <reference path="jquery.d.ts" />
    /// <reference path="kendo.all.d.ts" />

    module KendoWidgets {
        // (Optional) Extend the default widget options
        export interface MyDatePickerOptions extends kendo.ui.DatePickerOptions {
        }

        // Create a class which inherits from the Kendo UI widget
        export class MyDatePicker extends kendo.ui.DatePicker {
            constructor(element: Element, options?: MyDatePickerOptions) {
                super(element, options);
            }
            // (Otional) Override a widget method
            open() {
                // Log to the console (optional)
                console.log("open");

                // Invoke a base widget method

                super.open();
            }
        }
        // Create an alias of the prototype (required by kendo.ui.plugin)
        MyDatePicker.fn = MyDatePicker.prototype;
        // Deep clone the widget default options
        MyDatePicker.fn.options = $.extend(true, {}, kendo.ui.DatePicker.fn.options);
        // Specify the name of your Kendo UI widget. Used to create the corresponding jQuery plugin.
        MyDatePicker.fn.options.name = "MyDatePicker";
        // Create a jQuery plugin.
        kendo.ui.plugin(MyDatePicker);
    }
    // Expose the newly created jQuery plugin to TypeScript
    interface JQuery {
        kendoMyDatePicker(options?: kendo.ui.DatePickerOptions): JQuery;
    }
    $(function () {
        // Initialize your custom widget
        $("#datepicker").kendoMyDatePicker();
        // Get a reference to the widget instance
        var myDatePicker = <KendoWidgets.MyDatePicker>$("#datepicker").data("kendoMyDatePicker");
        // Call a widget method
        myDatePicker.open();
    });

### Use Kendo UI MVVM in TypeScript

When inheriting from `kendo.data.ObservableObject` in TypeScript you should call the `super.init` method to properly set up dependency tracking.

The following example shows how to use Kendo UI MVVM in TypeScript.

    /// <reference path="jquery.d.ts" />
    /// <reference path="kendo.all.d.ts" />

    class Person extends kendo.data.ObservableObject {
        name = "John Doe";

        constructor() {
            super();

            super.init(this);
        }
    }

    class ViewModel extends kendo.data.ObservableObject {
        person = new Person();

        constructor() {
            super();

            super.init(this);
        }
    }

    $(function () {
        var viewModel = new ViewModel();

        kendo.bind(document.body, viewModel);

        viewModel.set("person.name", "Jane Doe");
    });

## See Also

Other articles on Kendo UI integration with third-party tools and frameworks:

* [Angular 2.0]({% slug angular2support_integration_kendoui %})
* [Twitter Bootstrap]({% slug twitterbootstrapintegration_integration_kendoui %})
* [Web Components]({% slug webcomponents_integration_kendoui %})
* [RequireJS]({% slug requirejs_integration_kendoui %})
* [Visual Studio IntelliSense]({% slug visualstudiointellisense_integration_kendoui %})
* [Telerik Data Access]({% slug bindtotelerikdataaccesstool_integration_kendoui %})
* [SystemJS Support]({% slug systemjs_integration_kendoui %})
* [Webpack Support]({% slug webpacksupport_integration_kendoui %})
* [Aurelia]({% slug aurelia_integration_kendoui %})
