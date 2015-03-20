---
title:  Data Attributes Explained
page_title: Data Attribute Initialization and Configuration
description: Learn how to initialize and configure each Kendo UI widget using data attributes.
Publish: true
---

# Data Attribute Initialization

In addition to the jQuery plugin initialization, each kendo widget may be initialized and configured via data attributes.
The mobile application, the SPA view component, and the MVVM `kendo.bind` method use the declarative approach to automatically instantiate multiple widgets in an existing DOM element.

Data attribute initialization is convenient when there are a lot of Kendo UI widgets in the page, since the widget configuration is declared within the target element.

### Example - initialize a Kendo UI widget using data attributes

    <div id="container">
        <input data-role="numerictextbox" />
    </div>

    <script>
    kendo.bind($("#container"), {});
    </script>

The `kendo.bind($("#container"))` statement finds all elements that have the `role` data attribute set and initializes the respective Kendo UI widgets.

> The value of the `role` data attribute is the name of the widget in lower case e.g. "autocomplete", "dropdownlist" etc.

By default, `kendo.bind` initializes only widgets from the `kendo.ui` namespace, excluding the mobile widgets to avoid ambiguity. This behavior can be
changed by passing additional namespaces as parameters.  The Kendo UI mobile [Application](/mobile/application) initializes
widgets *from the `kendo.mobile.ui` namespace first*. This means that an element with `data-role="listview"` will
be automatically be initialized as a mobile listview widget in the mobile application context.

> The data-role attribute also accepts full widget class name (with its namespace) as value.

### Instantiate a web listview in a mobile application using the widget full class path
    <div data-role="view">
        <!-- specify the Kendo UI Web ListView widget -->
        <div data-role="kendo.ui.ListView"></div>
    </div>
    <script>
    var app = new kendo.mobile.Application();
    </script>

### Example - instantiate mobile and web widgets in a given element

    <div id="container">
        <input data-role="numerictextbox" />
        <button data-role="button">Mobile button</button>
    </div>
    <script>
    kendo.bind($("#container"), {}, kendo.ui, kendo.mobile.ui);
    </script>

## Configuration

Each widget configuration option can be set with a data attribute of the target element. **Add the "data-" prefix to the name of the configuration option** and specify the option value e.g. `data-delay="100"`.

> Camel-cased options are set via dash-separated attributes. For example, the [ignoreCase](/api/web/autocomplete#configuration-ignoreCase) option of the AutoComplete is set via `data-ignore-case`.

Options, which start with `data` do not require an additional "data" in the attribute name e.g. the `dataTextField` option is set via the `data-text-field` attribute and `dataSource` is set via the
`data-source` attribute.

Complex configuration options are set as JavaScript object literals: `data-source="{data: [{name: 'John Doe'},{name: 'Jane Doe'}]}"`.

### Example - configure Kendo UI Widget with data attributes

    <div id="container">
        <input data-role="autocomplete"
               data-ignore-case="true"
               data-text-field="name"
               data-source="{data: [{name: 'John Doe'},{name: 'Jane Doe'}]}" />
    </div>

    <script>
        kendo.bind($("#container"), {});
    </script>

## Events

You may subscribe to Kendo UI widget events with data attributes. The value of the data attribute will be resolved to a JavaScript function, available in the global scope.

### Example - subscribe to a Kendo UI widget event via data attribute

    <div id="container">
        <input data-role="numerictextbox" data-change="numerictextbox_change" />
    </div>

    <script>
        function numerictextbox_change(e) {
            // Handle the "change" event
        }
        kendo.bind($("#container"));
    </script>

Event handlers can also be set to member functions. For example, an event data attribute can be set to `foo.bar` which is resolved as the `bar` method of the `foo` object available in the global scope.

### Example - use member function as event handler

    <div id="container">
        <input data-role="numerictextbox" data-change="handler.numerictextbox_change" />
    </div>
    <script>
    var handler = {
        numerictextbox_change: function (e) {
            // Handle the "change" event
        }
    };
    kendo.bind($("#container"));
    </script>

## DataSource

The data source of data-bound Kendo UI widgets can also be set via data attribute. The value can be a JavaScript object, array, or a variable available in the global scope.

### Example - set the data source of a Kendo UI widget to a JavaScript object

    <div id="container">
        <input data-role="autocomplete" data-source="{data:['One', 'Two']}" />
    </div>
    <script>
    kendo.bind($("#container"));
    </script>

### Example - set the data source of a Kendo UI widget to a JavaScript array

    <div id="container">
        <input data-role="autocomplete" data-source="['One', 'Two']" />
    </div>
    <script>
    kendo.bind($("#container"));
    </script>

### Example - set the data source of a Kendo UI widget to a variable available in the global scope

    <div id="container">
        <input data-role="autocomplete" data-source="dataSource" />
    </div>
    <script>
    var dataSource = new kendo.data.DataSource( {
        data: [ "One", "Two" ]
    });
    kendo.bind($("#container"));
    </script>

## Templates

Template configuration can be set via data attributes as well. The attribute value will be resolved as the `id` attribute of a `script` element with the
template contents.

### Example - set the template of a Kendo UI widget

    <div id="container">
        <input data-role="autocomplete"
               data-source="[{firstName:'John', lastName: 'Doe'}, {firstName:'Jane', lastName: 'Doe'}]"
               data-text-field="firstName"
               data-template="template" />
    </div>

    <script id="template" type="text/x-kendo-template">
        <span>#: firstName # #: lastName #</span>
    </script>

    <script>
        kendo.bind($("#container"));
    </script>
