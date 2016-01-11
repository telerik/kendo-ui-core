---
title: Source
page_title: Source Binding in Model View ViewModel | Kendo UI Documentation
description: How to use source binding in Kendo UI MVVM to set the HTML5 content of the target element by rendering a Kendo template with a View-Model value.
---

# Source binding

The `source` binding sets the HTML content of the target element by rendering a Kendo template with a View-Model value. If the View-Model value changes
the HTML content of the target element will be updated.

The template is specified by the `data-template` attribute of the element. The value of that attribute should be the value of the `id` of
an existing `script` element which defines the Kendo template. If a template is not specified a default template will be
used depending on element tag name.

> *Important*: `Source` binding does not support nesting widgets with source binding, e.g. `treeview` with source binding to the view model.
The nested widgets will trigger **source change**, which will force the root source binging to re-render its content, leading to infinitive loops.
The proper way to nest widgets with source is to use `data-source` attribute [demo]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %}).

## Source binding to array

When the View-Model value is an array the `source` binding will iterate all array items and render the template. The accumulated output of the template
will be set as the HTML content of the target element. The context inside the template will be the current array item.

Adding or removing items from the array will update the HTML contents of the target element.

> *Important:* A single root element should be used in the template when binding to an array. Having two first level DOM elements will result in an erratic behavior.

### Correct: template with a single root element
    <ul data-template="ul-template" data-bind="source: products">
    </ul>
    <script id="ul-template" type="text/x-kendo-template">
        <li>
            id: <span data-bind="text: id"></span>
        </li>
    </script>
    <script>
        var viewModel = kendo.observable({ products: [ { id: 1 }, { id: 2 }, { id: 3 } ] });
        kendo.bind($("ul"), viewModel);
    </script>

#### Unsupported: template with multiple first level DOM elements.
    <ul data-template="ul-template" data-bind="source: products">
    </ul>
    <!-- Bindings will not work as expected -->
    <script id="ul-template" type="text/x-kendo-template">
        <li> id: <span data-bind="text: id"></span> </li>
        <li> details: <span data-bind="text: id"></span> </li>
    </script>

    <script>
        var viewModel = kendo.observable({ products: [ { id: 1 }, { id: 2 }, { id: 3 } ] });
        kendo.bind($("ul"), viewModel);
    </script>

### Source binding to array of objects

> *Important:* Source binding requires the result set to be either an [ObservableArray](/api/javascript/data/observablearray) or
a list of [ObservableObject](/api/javascript/data/observableobject) instances.

    <ul data-template="ul-template" data-bind="source: products">
    </ul>
    <script id="ul-template" type="text/x-kendo-template">
        <li>
            id: <span data-bind="text: id"></span>
            name: <span data-bind="text: name"></span>
        </li>
    </script>
    <script>
    var viewModel = kendo.observable({
        products: [
            { id: 1, name: "Coffee" },
            { id: 2, name: "Tea" },
            { id: 3, name: "Juice" }
        ]
    });

    kendo.bind($("ul"), viewModel);
    </script>


This example will output three `li` elements - one for every item in the `products` array.
Below is the final output (all `data` attributes are removed for clarity):

    <ul>
        <li>
            id: <span>1</span>
            name: <span>Coffee</span>
        </li>
        <li>
            id: <span>2</span>
            name: <span>Tea</span>
        </li>
        <li>
            id: <span>3</span>
            name: <span>Juice</span>
        </li>
    </ul>

If the array contains primitive objects (Number, String, Date) the `this` reserved word should be used inside the template declaration to refer to the current item:

### Source binding to array of primitive objects

    <ul data-template="ul-template" data-bind="source: products">
    </ul>
    <script id="ul-template" type="text/x-kendo-template">
        <li data-bind="text: this"></li>
    </script>
    <script>
    var viewModel = kendo.observable({
        products: [ "Coffee", "Tea", "Juice" ]
    });

    kendo.bind($("ul"), viewModel);
    </script>


Below is the final output (all `data` attributes are removed for clarity):

    <ul>
        <li>Coffee</li>
        <li>Tea</li>
        <li>Juice</li>
    </ul>


## Source binding to non-array value

The `source` binding also supports non-array values. In this case the specified template will be applied using the value of the View-Model field and the output will be set
as the HTML contents of the target element. The context inside the template will be the value of the View-Model field.

    <div data-template="div-template" data-bind="source: person">
        <script id="div-template" type="text/x-kendo-template">
        Name: <span data-bind="text: name"></span>
        </script>
    </div>
    <script>
    var viewModel = kendo.observable({
        person: {
            name: "John Doe"
        }
    });

    kendo.bind($("div"), viewModel);
    </script>

This example will output the following (all `data` attributes are removed for clarity):

    <div>
        Name: <span>John Doe</span>
    </div>

### Source binding to a Kendo UI DataSource instance

`source` binding to a Kendo UI DataSource can be used for Kendo UI widgets, which can normally be databound to a Kendo UI DataSource outside an MVVM scenario.
This binding can also be used with elements, which are containers for items (e.g. `<ul>`, `<table>`, `<select>`, etc.). In this case an item template must be defined via `data-template`.

`source` binding will not work for plain HTML elements that are not meant to be bound to collections of data items, such as textboxes.

```html
    <div id="example">
      <p>Kendo UI DropDownList</p>
      <select data-role="dropdownlist"
              data-bind="source: fruits"
              data-text-field="name"
              data-value-field="id"></select>

        <p>Select</p>
        <select data-bind="source: fruits" data-template="select-template"></select>

        <script id="select-template" type="text/x-kendo-template">
            <option value="#: id #">#: name #</option>
        </script>

        <p>Unordered list</p>
        <ul data-bind="source: fruits" data-template="list-template">
            <li></li>
        </ul>

        <script id="list-template" type="text/x-kendo-template">
            <li><strong>ID</strong> #: id #, <strong>Name</strong> #: name #</li>
        </script>

        <p>Table</p>
        <table>
            <thead><th>ID</th><th>Name</th></thead>
            <tbody data-bind="source: fruits" data-template="row-template">
                <tr><td></td><td></td></tr>
            </tbody>
        </table>
        <script id="row-template" type="text/x-kendo-template">
            <tr><td>#: id #</td><td>#: name #</td></tr>
        </script>
    </div>

    <script>

      var viewModel = kendo.observable({
        fruits: new kendo.data.DataSource({
          data: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Oranges" },
            { id: 3, name: "Bananas" }
          ],
          schema: {
            model: {
              fields: {
                id: { type: "number" },
                name: { type: "string" }
              }
            }
          }
        })
      });

      kendo.bind("#example", viewModel);

    </script>

    <style>

        table {
            border-collapse: collapse;
        }

        table th,
        table td {
            border: 1px solid #999;
            padding: .3em .6em;
            text-align: left;
        }

    </style>
```

### Source binding to the View-Model

If you want to use the View-Model itself use the `this` reserved word:

    <div data-template="div-template" data-bind="source: this">
        <script id="div-template" type="text/x-kendo-template">
        Name: <span data-bind="text: name"></span>
        </script>
    </div>
    <script>
    var viewModel = kendo.observable({
        name: "John Doe"
    });

    kendo.bind($("div"), viewModel);
    </script>

The output will be exactly the same as in the previous example:

    <div>
    Name: <span>John Doe</span>
    </div>


### Important: the "this" keyword conveys different meaning in different scenarios

The `this` reserved word should be specified in the `source` binding if and only if the entire View-Model object is used as a value.

The `this` reserved word should be used inside a template only when the `source` binding is using an array of primitive objects.

The `this` reserved word should always be used on its own. The following are **not** supported:


    <div data-bind="text: this.bogus"></div>

    <script id="bogus-template" type="text/x-kendo-template">
        <span data-bind="text: this.bogus"></span>
    </script>


## Source binding of select elements

When applied to a `select` element the `source` binding would create `option` elements.

### Source binding of a select element to array of primitive objects

    <select data-bind="source: colors"></select>
    <script>
    var viewModel = kendo.observable({
        colors: [ "Red", "Green", "Blue" ]
    });

    kendo.bind($("select"), viewModel);
    </script>


The `source` binding would create an `option` element for every item in the `colors` array and set its HTML contents to the value of that item.
The output will look like this:

    <select>
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
    </select>


The `source` binding could also populate a `select` from an array of non-primitive objects. The
`data-text-field` and `data-value-field` attributes are used to specify how the value and content of the `option`
elements would be bound.

### Source binding of a select element to array of non-primitive objects

    <select data-text-field="name" data-value-field="id"
           data-bind="source: products"></select>
    <script>
    var viewModel = kendo.observable({
        products: [
            { id: 1, name: "Coffee" },
            { id: 2, name: "Tea" },
            { id: 3, name: "Juice" }
        ]
    });

    kendo.bind($("select"), viewModel);
    </script>

The output will look like this:

    <select>
        <option value="1">Coffee</option>
        <option value="2">Tea</option>
        <option value="3">Juice</option>
    </select>


If `data-text-field` and `data-value-field` are not set and the `select` is bound to array of non-primitive objects the `option`
elements' content will be set to `[object Object]`.
