---
title: Initializing with MVVM
page_title: Initializing with MVVM - Working with Components 
previous_url: /framework/data-attribute-initialization, /intro/widget-basics/data-attribute-initialization
description: "Get started with Kendo UI for jQuery and initialize and configure the components by using the MVVM pattern"
slug: mvvm_initialization_kendoui
position: 3
---

# Initializing with MVVM

You can initialize and configure each Kendo UI component through the [`data` attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes).

Initialization from `data` attributes is convenient when you have a lot of Kendo UI components on the page, because the component configuration is declared within the target element.

The [Model View View-Model (MVVM) `kendo.bind` method]({% slug overview_mvvmpattern_kendoui %}) uses the declarative approach to automatically instantiate multiple components in an existing DOM element.

The following example demonstrates how to initialize a Kendo UI NumericTextBox and a DropDownList by using the `data` attributes. The `kendo.bind($("#container"))` statement finds all elements that have the `role` data attribute set and initializes the respective Kendo UI components.

    <div id="container">
    <input data-role="numerictextbox" />
    <input data-role="dropdownlist" style="width: 100%;" />
    </div>

    <script>
        kendo.bind($("#container"), {});
    </script>

> The value of the `role` data attribute is the lower-case name of the component&mdash;`"autocomplete"`, `"dropdownlist"`, and so on.

By using the `data` attribute you can also perform the following operations:

* [Set up the configuration options](#setting-the-configuration-objects)
* [Subscribe to events](#subscribing-to-events)
* [Set up the event handlers](#setting-the-event-handlers)
* [Set up the data source](#setting-the-data-source)
* [Manage the templates](#managing-the-templates)

## Setting the Configuration Options

Each configuration option can be set with the `data` attribute of the target element. Add the `"data-"` prefix to the name of the configuration option and specify the option value&mdash;for example, `data-delay="100"`.

> The camelCase options are set through dash-separated attributes. For example, the [`ignoreCase`](/api/javascript/ui/autocomplete/configuration/ignorecase) option of the AutoComplete is set through `data-ignore-case`.

Options which start with `data` do not require an additional `"data"` in the attribute name. For example, the `dataTextField` option is set through the `data-text-field` attribute and `dataSource` is set through the `data-source` attribute. Complex configuration options are set as JavaScript object literals&mdash;for example, `data-source="{data: [{name: 'John Doe'},{name: 'Jane Doe'}]}"`.

The following example demonstrates how to configure Kendo UI components with `data` attributes.

    <div id="container">
        <input data-role="autocomplete"
               data-ignore-case="true"
               data-text-field="name"
               data-source="{data: [{name: 'John Doe'},{name: 'Jane Doe'}]}" />
    </div>

    <script>
        kendo.bind($("#container"), {});
    </script>

## Subscribing to Events

You can subscribe to Kendo UI component events by using `data` attributes. The value of the `data` attribute is resolved to a JavaScript function that is available in the global scope.

The following example demonstrates how to subscribe to a Kendo UI component event through a `data` attribute.

    <div id="container">
        <input data-role="numerictextbox" data-change="numerictextbox_change" />
    </div>

    <script>
        function numerictextbox_change(e) {
            // Handle the "change" event.
        }
        kendo.bind($("#container"));
    </script>

## Setting the Event Handlers

You can also set event handlers to member functions. For example, an event `data` attribute can be set to `foo.bar` which is resolved as the `bar` method of the `foo` object that is available in the global scope.

The following example demonstrates how to use a member function as an event handler.

    <div id="container">
        <input data-role="numerictextbox" data-change="handler.numerictextbox_change" />
    </div>
    <script>
    var handler = {
        numerictextbox_change: function (e) {
            // Handle the "change" event.
        }
    };
    kendo.bind($("#container"));
    </script>

## Setting the Data Source

You can also set the Data Source of data-bound Kendo UI components through a `data` attribute. The value can be a JavaScript object, array, or a variable available in the global scope.

The following example demonstrates how to set the data source of a Kendo UI component to a JavaScript object.

    <div id="container">
        <input data-role="autocomplete" data-source="{data:['One', 'Two']}" />
    </div>
    <script>
    kendo.bind($("#container"));
    </script>

The following example demonstrates how to set the data source of a Kendo UI component to a JavaScript array.

    <div id="container">
        <input data-role="autocomplete" data-source="['One', 'Two']" />
    </div>
    <script>
    kendo.bind($("#container"));
    </script>

The following example demonstrates how to set the data source of a Kendo UI component to a variable that is available in the global scope.

    <div id="container">
        <input data-role="autocomplete" data-source="dataSource" />
    </div>
    <script>
    var dataSource = new kendo.data.DataSource( {
        data: [ "One", "Two" ]
    });
    kendo.bind($("#container"));
    </script>

## Managing Templates

By using the `data` attributes, you can also set the template configuration. The attribute value is resolved as the `id` attribute of a `script` element with the template contents.

The following example demonstrates how to set the template of a Kendo UI component by using the `data` attribute.

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

## See Also

* [Creating Custom Components]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Getting Up and Running with Kendo UI (Guide)]({% slug getting_started_installation_kendoui %})
