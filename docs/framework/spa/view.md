---
title: View
page_title: View | Kendo UI Single-Page Application
description: "Learn how to handle the view class in a Kendo UI Single-Page Application."
slug: viewclass_kendoui_singlepageapplication
position: 4
---

# View

The `View` class instantiates and handles the events of a certain screen from the application.

Widget and DOM event handling and data binding can be performed through MVVM or declarative data attribute initialization.

## Getting Started

By default, the view wraps its content in a `div` element. The element type can be changed using the `tagName` configuration option. The view content may be specified either:
* As a string containing HTML, or
* By passing the id of the script element containing the HTML markup

### Creating Views from HTML String

The following example demonstrates how to create a view from an HTML string.

    <script>
        var index = new kendo.View('<span>Hello World!</span>');
    </script>

### Creating Views as Script Template

The following example demonstrates how to create a view by passing the id of the script element containing the HTML markup.

    <script id="index" type="text/x-kendo-template">
        <span>Hello World!</span>
    </script>

    <script>
        var index = new kendo.View('index');
    </script>

## Rendering Views

The view renders its contents using the `render` method, which accepts a jQuery selector, or object, to which the contents is appended. Alternatively, the render method can be called without parameters in order to retrieve the `View` element for manual insertion or further manipulation. The view instantiates its content the first time its `render` method is called. If the content is retrieved from a script element, the script element should be present in the DOM when the rendering is performed. In most cases, views should be rendered in the router `init` event handler, or in the router route callbacks.

### Rendering Views in Containers

The following example demonstrates how to render a view in a container.

    <div id="app"></div>

    <script>
        var index = new kendo.View('<span>Hello World!</span>');

        index.render("#app");
    </script>

### Appending the view Element

Note that subsequent `render` calls will not re-instantiate the `view` element, but will append it to the given container (if provided), or return a reference to the existing view element if no container is provided, as shown below.

    <div id="app"></div>

    <script>
        var index = new kendo.View('<span>Hello World!</span>');

        $("#app").append(index.render());
    </script>


## Integrating Views with MVVM

If an `observable` object is passed as a `model` configuration option to the `view` constructor, the view binds it to the element when instantiated. If no `model` is present, the content will be processed using [`data` attribute initialization]({% slug initialize_widgets_using_markup_installation %}).

If the view `evalTemplate` configuration option is set to `true`, the template is treated as a [Kendo UI Template]({% slug overview_kendoui_templatescomponent %}) and evaluated against the passed model instance when the view is rendered initially.

> Changing the `viewModel` fields does not re-render the view template. To display dynamic data, use the `data-bind` syntax.

The following example demonstrates an MVVM-bound view.

    <script id="index" type="text/x-kendo-template">
        <div>Hello <span data-bind="text:foo"></span>!</div>
    </script>

    <script>
        var model = kendo.observable({foo: "World"});
        var index = new kendo.View('index', {model: model});
    </script>

The following example demonstrates an MVVM-bound view with an evaluated template.

    <div id="container"></div>

    <script id="index" type="text/x-kendo-template">
        #: foo #
        <div>Hello <span data-bind="text:foo"></span>!</div>
    </script>

    <script>
        var model = kendo.observable({foo: "World"});
        var index = new kendo.View('index', {model: model, evalTemplate: true});
        index.render("#container");
    </script>

## Removing and Destroying Views

In certain scenarios, you can destroy a view to free browser resources. When destroyed, its element will be removed from the DOM and its MVVM bindings will be removed.

> If a certain view is used to display different data in the same format, such as item details from a list, it is recommended to reuse a view instance and change its contents through MVVM bindings instead of re-creating a new instance each time such a detail is displayed.

## See Also

* [Single-Page Application Overview]({% slug overview_kendoui_singlepageapplication %})
* [SPA Router]({% slug router_kendoui_singlepageapplication %})
* [SPA Layout]({% slug layout_kendoui_singlepageapplication %})
