---
title: View
position: 4
---

# View Overview

The **View** class instantiates and handles the events of a certain screen from the application. Widget/DOM event handling and data binding can be performed through **MVVM** or **declarative data attribute initialization**.
The view content may be specified as an string containing HTML, or by passing the id of the script element containing the HTML markup.
By default, the view wraps its content in a `div` element. The element type can be changed using the `tagName` configuration option.

## Creating a View from HTML String
    <script>
        var index = new kendo.View('<span>Hello World!</span>');
    </script>

## Creating a View from Script Template
    <script id="index" type="text/x-kendo-template">
        <span>Hello World!</span>
    </script>

    <script>
        var index = new kendo.View('index');
    </script>

## Rendering View Contents

The view renders its contents using the `render` method, which accepts a jQuery selector (or object) to which the contents will be appended.
Alternatively, the render method can be called without parameters in order to retrieve the View element for manual insertion/further manipulation.

The view instantiates its content the first time its `render` method is called. If the content is retrieved from a script element, the script element should be present in the DOM when the rendering is performed.
In most cases, the views should be rendered in the router `init` event handler, or in the router route callbacks.


## Rendering View in a Container

    <div id="app"></div>

    <script>
        var index = new kendo.View('<span>Hello World!</span>');

        index.render("#app");
    </script>

Subsequent `render` calls **will not** re-instantiate the view element, but append it to the given container (if provided),
or return a reference to the existing view element if no container is provided.

## Appending View Element

    <div id="app"></div>

    <script>
        var index = new kendo.View('<span>Hello World!</span>');

        $("#app").append(index.render());
    </script>


## MVVM Integration

If an observable object is passed as a `model` configuration option to the view constructor, the view will bind it to the element when instantiated.
If no model is present, the content will be processed using [Data Attribute Initialization](/data-attribute-initialization).

## MVVM Bound View
    <script id="index" type="text/x-kendo-template">
        <div>Hello <span data-bind="text:foo"></span>!</div>
    </script>

    <script>
        var model = kendo.observable({foo: "World"});
        var index = new kendo.View('index', {model: model});
    </script>

If the view `evalTemplate` configuration option is set to `true`, the template will be treated as [kendo template](/framework/templates/overview) and evaluated against the passed model instance **when the view is rendered initially**.

> Changing the viewModel fields will not re-render the view template. If you want to display dynamic data, you should use the `data-bind` syntax.

## MVVM Bound View with an evaluated template
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

## Removing/Destroying Views

In certain scenarios, A view may be destroyed in order to free browser resources. When destroyed, its element will be removed from the DOM and its MVVM bindings will be removed.

> If a certain view is used to display different data in the same format (for instance - item details from a list),
> it is recommended to reuse a view instance and change its contents through MVVM bindings instead of re-creating a new instance each time such detail is displayed.
