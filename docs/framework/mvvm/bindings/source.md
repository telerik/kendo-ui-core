---
title: Source
page_title: Source | Kendo UI MVVM
description: "Learn how to use source binding in Kendo UI MVVM to set the HTML5 content of the target element by rendering a Kendo UI template with a View-Model value."
slug: sourceblebinding_mvvm_kendoui
---

# Source Binding

The [Kendo UI Source (`source`) binding](http://demos.telerik.com/kendo-ui/mvvm/source) sets the HTML content of the target element by rendering a Kendo UI template with a View-Model value. If the View-Model value changes, the HTML content of the target element is updated.

The template is specified by the `data-template` attribute of the element. The value of that attribute should be the value of the `id` of an existing `script` element which defines the Kendo UI template. If a template is not specified, a default template is used depending on the element tag name.

> **Important**
>
> The `source` binding does not support nesting widgets with source binding such as `treeview` with source binding to the view model. The nested widgets trigger a source change, which forces the root source binging to re-render its content, leading to infinitive loops. The proper way to nest widgets with source is to use the `data-source` attribute[demo]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %}).

## Source Binding to Array

### Source Binding to Root Elements

When the View-Model value is an array, the `source` binding iterates all array items and renders the template. The accumulated output of the template is set as the HTML content of the target element. The context inside the template is the current array item.

Adding or removing items from the array updates the HTML contents of the target element.

> **Important**
>
> A single root element should be used in the template when binding to an array. Having two first-level DOM elements is going to result in an erratic behavior.

The example below is a correct instance of a template with a single root element.

###### Example

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

The example below is an unsupported instance of a template with multiple first-level DOM elements.

###### Example

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

### Source Binding to Array of Objects

> **Important**
>
> Source binding requires the result set to be either an [`ObservableArray`](/api/javascript/data/observablearray) or a list of [`ObservableObject`](/api/javascript/data/observableobject) instances.

###### Example

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

This example will output three `li` elements&mdash;one for every item in the `products` array.

The example below demonstrates the final output. Note that all `data` attributes are removed for clarity.

###### Example

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

### Source Binding to Array of Primitive Objects

If the array contains primitive objects, such as `Number`, `String`, and `Date`, the `this` reserved word should be used inside the template declaration to refer to the current item.

###### Example

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

The example below demonstrates the final output. Note that all `data` attributes are removed for clarity.

###### Example

    <ul>
        <li>Coffee</li>
        <li>Tea</li>
        <li>Juice</li>
    </ul>

## Source Binding to Non-Array Values

The `source` binding also supports non-array values. In this case the specified template is applied by using the value of the View-Model field and the output is set as the HTML contents of the target element. The context inside the template will be the value of the View-Model field.

###### Example

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

The example results in the output below. Note that all `data` attributes are removed for clarity.

###### Example

    <div>
        Name: <span>John Doe</span>
    </div>

### Source Binding to DataSource

The `source` binding to a Kendo UI DataSource instance can be used for Kendo UI widgets, which can normally be databound to a Kendo UI DataSource outside an MVVM scenario. This binding can also be used with elements, which are containers for items, such as `<ul>`, `<table>`, `<select>`, and others. In this case an item template must be defined via `data-template`.

The `source` binding does not work for plain HTML elements that are not meant to be bound to collections of data items, such as textboxes.

###### Example

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

### Source Binding to View-Model

If you want to use the View-Model itself, use the `this` reserved word, as shown below.

###### Example

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

The output is exactly the same as in the previous case.

###### Example

    <div>
    Name: <span>John Doe</span>
    </div>

### Important Notes on Non-Array Source Binding

#### The this Keyword Conveys Different Meaning in Different Scenarios

The `this` reserved keyword should:

* Be specified in the `source` binding if and only if the entire View-Model object is used as a value.
* Be used inside a template only when the `source` binding is using an array of primitive objects.
* Always be used on its own. The example below is not supported.

###### Example

    <div data-bind="text: this.bogus"></div>

    <script id="bogus-template" type="text/x-kendo-template">
        <span data-bind="text: this.bogus"></span>
    </script>

## Source Binding of select Elements

When applied to a `select` element, the `source` binding creates `option` elements.

### Select Source Binding to Primitive Values

The example below demonstrates source binding of a `select` element to an array of primitive objects.

###### Example

    <select data-bind="source: colors"></select>
    <script>
    var viewModel = kendo.observable({
        colors: [ "Red", "Green", "Blue" ]
    });

    kendo.bind($("select"), viewModel);
    </script>

The `source` binding creates an `option` element for every item in the `colors` array and sets its HTML contents to the value of that item. This results in the output below.

###### Example

    <select>
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
    </select>


### Select Source Binding to Non-Primitive Values

The `source` binding could also populate a `select` element from an array of non-primitive objects. The `data-text-field` and `data-value-field` attributes are used to specify how the value and content of the `option` elements are going to be bound.

The example below demonstrates source binding of a `select` element to an array of non-primitive values.

###### Example

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

This results in the output below.

###### Example

    <select>
        <option value="1">Coffee</option>
        <option value="2">Tea</option>
        <option value="3">Juice</option>
    </select>


If the `data-text-field` and `data-value-field` attributes are not set and the `select` is bound to an array of non-primitive objects, the content of the `option` elements is set to `[object Object]`.

## See Also

Other articles on the Kendo UI MVVM component and bindings:

* [MVVM Overview]({% slug overview_mvvmpattern_kendoui %})
* [Overview of the Attribute Binding]({% slug attributebinding_mvvm_kendoui %})
* [Overview of the Checked Binding]({% slug checkedbinding_mvvm_kendoui %})
* [Overview of the Click Binding]({% slug clickbinding_mvvm_kendoui %})
* [Overview of the CSS Binding]({% slug cssbinding_mvvm_kendoui %})
* [Overview of the Custom Binding]({% slug custombinding_mvvm_kendoui %})
* [Overview of the Disabled Binding]({% slug disabledbinding_mvvm_kendoui %})
* [Overview of the Enabled Binding]({% slug enabledbinding_mvvm_kendoui %})
* [Overview of the Events Binding]({% slug eventsbinding_mvvm_kendoui %})
* [Overview of the HTML Binding]({% slug htmlbinding_mvvm_kendoui %})
* [Overview of the Invisible Binding]({% slug invisiblebinding_mvvm_kendoui %})
* [Overview of the Style Binding]({% slug stylebinding_mvvm_kendoui %})
* [Overview of the Text Binding]({% slug textbinding_mvvm_kendoui %})
* [Overview of the Value Binding]({% slug valuebinding_mvvm_kendoui %})
* [Overview of the Visible Binding]({% slug visiblebinding_mvvm_kendoui %})
