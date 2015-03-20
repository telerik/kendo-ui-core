---
title: TypeScript Definitions
page_title: Kendo UI TypeScript Definitions
previous_url: /howto/typescript/overview
position: 230
---

# Kendo UI TypeScript Support

Kendo UI provides a [TypeScript](http://www.typescriptlang.org/) definitions file which enables strongly-typed access to the Kendo UI widgets and their configuration.

## Installation

Each Kendo UI distribution includes a *typescript* directory which contains a `.d.ts` file i.e. `kendo.all.d.ts`. Copy that file in your project.
In your TypeScript file add a reference to that file:

    /// <reference path="kendo.all.d.ts" />

You can optionally include the latest jQuery TypeScript definition file as well:

    /// <reference path="jquery-1.8.d.ts" />
    /// <reference path="kendo.all.d.ts" />

## Features

### Get instance of existing Kendo UI widgets

![Get instance of existing Kendo UI widget](/images/get-instance.png)

### Initialize and configure any Kendo UI widget

![All Kendo UI widgets](/images/init.png)

### Initialize a Kendo DataSource

![Initialize a Kendo DataSource](/images/datasource.png)

## Create Kendo UI widget via TypeScript inheritance

The following code example shows how to inherit from an existing Kendo UI Widget.

    /// <reference path="jquery.d.ts" />
    /// <reference path="kendo.all.d.ts" />

    module KendoWidgets {
        // Extend the default widget options (optional)
        export interface MyDatePickerOptions extends kendo.ui.DatePickerOptions {
        }

        // Create a class which inherits from the Kendo UI widget
        export class MyDatePicker extends kendo.ui.DatePicker {
            constructor(element: Element, options?: MyDatePickerOptions) {
                super(element, options);
            }
            //Override a widget method (optional)
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
        // Get a reference to the widget instance.
        var myDatePicker = <KendoWidgets.MyDatePicker>$("#datepicker").data("kendoMyDatePicker");
        // Call a widget method
        myDatePicker.open();
    });

## Use Kendo UI MVVM in TypeScript

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

