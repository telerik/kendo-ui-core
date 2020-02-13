---
title: Initializing with MVVM
page_title: Initializing with MVVM | Working with Widgets | Kendo UI for jQuery
previous_url: /framework/data-attribute-initialization, /intro/widget-basics/data-attribute-initialization
description: "Get started with Kendo UI for jQuery and initialize and configure the widgets by using the MVVM pattern"
slug: mvvm_initialization_kendoui
position: 3
---

# Initializing with MVVM

You can initialize and configure each Kendo UI widget [through the `data` attributes](#using-data-attributes) or based on [custom HTML attributes](#using-markup).

The [Kendo UI Hybrid Application]({% slug overview_hybridapplication %}), the [Single-Page-Application (SPA) `view` component]({% slug viewclass_kendoui_singlepageapplication %}), and the [Model View View-Model (MVVM) `kendo.bind` method]({% slug overview_mvvmpattern_kendoui %}) use the declarative approach to automatically instantiate multiple widgets in an existing DOM element.

## Using the data Attributes

Initialization from `data` attributes is convenient when there are a lot of Kendo UI widgets on the page because the widget configuration is declared within the target element.

The following example demonstrates how to initialize a Kendo UI widget by using the `data` attributes. The `kendo.bind($("#container"))` statement finds all elements that have the `role` data attribute set and initializes the respective Kendo UI widgets.

> The value of the `role` data attribute is the lower-case name of the widget&mdash;`"autocomplete"`, `"dropdownlist"`, and so on.

<div id="container">
<input data-role="numerictextbox" />
</div>

<script>
kendo.bind($("#container"), {});
  </script>

### Initializing in Hybrid Applications

You can initialize widgets from `data` attributes in hybrid applications and within given elements, and then also configure the `data-*` options. By default, to avoid ambiguity, `kendo.bind` initializes only widgets from the `kendo.ui` namespace, excluding the hybrid widgets. This behavior can be changed by passing additional namespaces as parameters. Note that the [hybrid Kendo UI Application](/controls/hybrid/application) initializes widgets from the `kendo.mobile.ui` namespace first. This means that an element with `data-role="listview"` is automatically initialized as a hybrid ListView widget in the hybrid Application context.

> The `data-role` attribute also accepts a full widget class name (with its namespace) as a value.

The following example demonstrates how to instantiate a Kendo UI ListView in a hybrid Application by using the full class path of the widget.

    <div data-role="view">
        <!-- specify the Kendo UI Web ListView widget -->
        <div data-role="kendo.ui.ListView"></div>
    </div>
    <script>
    var app = new kendo.mobile.Application();
    </script>

### Initializing in Specific Elements

The following example demonstrates how to instantiate Kendo UI widgets in a specific element.

    <div id="container">
        <input data-role="numerictextbox" />
        <button data-role="button">Mobile button</button>
    </div>
    <script>
    kendo.bind($("#container"), {}, kendo.ui, kendo.mobile.ui);
    </script>

### Setting the data Options

Each configuration option can be set with the `data` attribute of the target element. Add the `"data-"` prefix to the name of the configuration option and specify the option value&mdash;for example, `data-delay="100"`.

> The camelCase options are set through dash-separated attributes. For example, the [`ignoreCase`](/api/javascript/ui/autocomplete/configuration/ignorecase) option of the AutoComplete is set through `data-ignore-case`.

Options which start with `data` do not require an additional `"data"` in the attribute name. For example, the `dataTextField` option is set through the `data-text-field` attribute and `dataSource` is set through the `data-source` attribute. Complex configuration options are set as JavaScript object literals&mdash;for example, `data-source="{data: [{name: 'John Doe'},{name: 'Jane Doe'}]}"`.

The following example demonstrates how to configure Kendo UI widgets with data attributes.

    <div id="container">
        <input data-role="autocomplete"
               data-ignore-case="true"
               data-text-field="name"
               data-source="{data: [{name: 'John Doe'},{name: 'Jane Doe'}]}" />
    </div>

    <script>
        kendo.bind($("#container"), {});
    </script>

### Subscribing to Events

You are able to subscribe to Kendo UI widget events with data attributes. The value of the data attribute is resolved to a JavaScript function, available in the global scope. The following example demonstrates how to subscribe to a Kendo UI widget event through a `data` attribute.

    <div id="container">
        <input data-role="numerictextbox" data-change="numerictextbox_change" />
    </div>

    <script>
        function numerictextbox_change(e) {
            // Handle the "change" event.
        }
        kendo.bind($("#container"));
    </script>

### Setting the Event Handlers

You can also set event handlers to member functions. For example, an event `data` attribute can be set to `foo.bar`, which is resolved as the `bar` method of the `foo` object available in the global scope.

The following example demonstrates how to use a member function as an event handler.

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

### Setting the Data Source

The Data Source of data-bound Kendo UI widgets can also be set through a data attribute. The value can be a JavaScript object, array, or a variable available in the global scope.

The following example demonstrates how to set the data source of a Kendo UI widget to a JavaScript object.

    <div id="container">
        <input data-role="autocomplete" data-source="{data:['One', 'Two']}" />
    </div>
    <script>
    kendo.bind($("#container"));
    </script>

The following example demonstrates how to set the data source of a Kendo UI widget to a JavaScript array.

    <div id="container">
        <input data-role="autocomplete" data-source="['One', 'Two']" />
    </div>
    <script>
    kendo.bind($("#container"));
    </script>

The following example demonstrates how to set the data source of a Kendo UI widget to a variable available in the global scope.

    <div id="container">
        <input data-role="autocomplete" data-source="dataSource" />
    </div>
    <script>
    var dataSource = new kendo.data.DataSource( {
        data: [ "One", "Two" ]
    });
    kendo.bind($("#container"));
    </script>

### Using Templates

By using the `data` attributes, you can also set the template configuration. The attribute value is resolved as the `id` attribute of a `script` element with the template contents.

The following example demonstrates how to set the template of a Kendo UI widget.

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

## Using Markup

You can initialize widgets based on custom HTML attributes in any of the following ways:

* The [View]({% slug viewclass_kendoui_singlepageapplication %}) and the [mobile Application]({% slug overview_hybridapplication %}) instantiate widgets based on the `role` HTML5 `data` attributes. Both use the [MVVM]({% slug overview_mvvmpattern_kendoui %}) internally.  
* The `kendo.bind` method scans the passed DOM element contents for the `data-role` attributes and instantiates the respective widgets.  
* The Kendo UI [AngularJS]({% slug angularjs_integration_directives %}) directives support declarative initialization based on custom element attributes or custom tag names.

While it is theoretically possible to initialize several different Kendo UI widgets from the same DOM element through the [jQuery plugin syntax]({% slug initialize_widgets_using_jquery_plugins_installation %}), it is not supported with the declarative initialization from markup.

> * The `data` attribute initialization is not designed to be combined with the Kendo UI server wrappers. The usage of wrappers is equivalent to [jQuery plugin syntax initialization]({% slug initialize_widgets_using_jquery_plugins_installation %}). To create Kendo UI widget instances through the [MVVM]({% slug overview_mvvmpattern_kendoui %}) or [AngularJS]({% slug angularjs_integration_directives %}) mechanisms, do not use server wrappers for these instances.
> * Initialize the Kendo UI widgets from HTML elements which are part of the DOM tree. The creation of widgets from [document fragments](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) might cause undesired side effects or lead to JavaScript errors.

You can declaratively initialize widgets:
* In [Single-Page-Application (SPA) Views](#in-spa-views)
* In the [Model-View-ViewModel (MVVM) architectural pattern](#in-mvvm)
* In [Hybrid UI Applications](#in-hybrid-ui-applications)

### Initializing in SPA Views

The following example refers to a (SPA) View with an AutoComplete widget in the template. For more information on the SPA View, refer to the [article on building Single Page Applications]({% slug overview_kendoui_singlepageapplication %}).

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

### Initializing in MVVM

The following example refers to an MVVM-bound DOM element with an AutoComplete widget.

> The `data-bind` attribute syntax establishes a two-way binding between the widget options&mdash;in this case, the Data Source&mdash;and the view model field (the `source`). For more information, refer to the [introductory article on MVVM]({% slug overview_mvvmpattern_kendoui %}).

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

### Initializing in Hybrid UI Applications

The following example refers to a Kendo UI hybrid Application with a View and an AutoComplete widget. For more information about the Hybrid UI applications, refer to the [article on building hybrid mobile applications]({% slug overview_hybridkendoui %}).

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

## See Also

* [Creating Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Getting Up and Running with Kendo UI (Guide)]({% slug getting_started_installation_kendoui %})
