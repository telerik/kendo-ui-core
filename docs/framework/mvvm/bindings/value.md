---
title: Value
page_title: Value | Kendo UI MVVM
description: "Learn how to keep the value of a DOM widget and the value of a View-Model field in sync by using the value binding in Kendo UI MVVM."
slug: valuebinding_mvvm_kendoui
---

# Value Binding

The `value` binding keeps the value of a DOM element or widget and the value of a View-Model field in sync. When the end-user changes the value of the DOM element or widget, the bound View-Model value is updated. If the View-Model value is updated from code, then the value of the bound DOM element or widget is updated visually.

> **Important**
>
> Value binding supports only DOM elements with a `value` property and widgets that have a `value()` method. The DOM element or widget also must fire a `change` event when the user changes its value. Changing the widget's value programmatically via the `value()` method must not fire the `change` event.

The elements that are supported are `input`, `textarea`, and `select`. The widgets that are supported are all that have the notion of a value&mdash;Kendo UI AutoComplete, ColorPicker, ComboBox, DropDownList, DatePicker, DateTimePicker, Editor, MaskedTextBox, MultiSelect, NumericTextBox, Slider, TimePicker, and Upload.

If you want to set the text or HTML content of a DOM element, use the `text` or `html` bindings instead of the `value` binding.

Checkboxes (`<input type="checkbox" />`) and radio buttons (`<input type="radio" />`) should use the [`checked`]({% slug checkedbinding_mvvm_kendoui %}) binding instead.

## Value Binding of Elements: input and textarea

Kendo UI MVVM displays the View-Model value as the value of an `input` or `textarea` element.

The example below demonstrates how to use the `value` binding with an `input` or `textarea` element.

###### Example

    <div id="view">
        <input data-bind="value: inputValue" />
        <textarea data-bind="value: textareaValue"></textarea>
    </div>
    <script>
    var viewModel = kendo.observable({
        inputValue: "Input value",
        textareaValue: "Textarea value"
    });

    kendo.bind($("#view"), viewModel);
    </script>

After calling `kendo.bind` the `input` element displays the value of the `inputValue` field. The `textarea` displays the value of the `textareaValue` field. If the value of the `input` changes, the `inputValue` field changes as well. Likewise, if the value of the `textarea` changes, so is `textareaValue`. Changing `inputValue` or `textareaValue` View-Model fields from code visually updates the value of the bound elements.

### Control upon View-Model Update

By default the `value` binding relies on the `change` DOM event, which is raised after blurring the element whose value has changed. This means that the value from the View-Model is updated when the element loses focus. The `data-value-update` attribute can be used to specify a different DOM event, such as `keyup` or `keypress`. The `keydown` event is not supported, because the DOM element value is not yet updated when that event triggers.

> **Important**
> * The [`input` DOM event](https://developer.mozilla.org/en-US/docs/Web/Events/input) may be used if you need to update the ViewModel value on each keypress and when the user pastes content in the field. Keep in mind that the input event is supported in Internet Explorer 9 and later.
> * This is applicable only when the `value` binding is applied to a DOM element. The widgets do not support this attribute, because they do not expose a specific `keyup` event.

The example below demonstrates how to use the data-value-update attribute.

###### Example

    <div id="view">
        <input data-value-update="keyup" data-bind="value: inputValue" />
    </div>
    <script>
    var viewModel = kendo.observable({
        inputValue: "Input value"
    });

    kendo.bind($("#view"), viewModel);
    </script>

## Value Binding of Elements: select

When the `select` element has a set of predefined options, Kendo UI MVVM selects the `option` whose `value` attribute is equal to the value of the View-Model field.

### Select with Predefined Options

The example below demonstrates how to use the `value` binding with a `select` element with predefined options.

###### Example

    <select data-bind="value: selectedColor">
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
    </select>
    <script>
    var viewModel = kendo.observable({
        selectedColor: "green"
    });

    kendo.bind($("select"), viewModel);
    </script>

In the example, the second `option` is selected because its `value` attribute is equal to the value of the `selectedColor` View-Model field. Changing the selected `option` updates the value of the `selectedColor` View-Model field.

### Select with Non-Value Predefined Options

If the `value` attribute of an `option` is not set, its text content is used instead.

The example below demonstrates how to use the `value` binding with a `select` element with predefined options that have no value.

###### Example

    <select data-bind="value: selectedColor">
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
    </select>
    <script>
    var viewModel = kendo.observable({
        selectedColor: "Blue"
    });

    kendo.bind($("select"), viewModel);
    </script>

In this case, the third `option` is selected because its text content is equal to the value of the `selectedColor` View-Model field.

### Select with Options Created by Source Binding

When the `select` element options are created by the [`source` binding]({% slug sourceblebinding_mvvm_kendoui %}), Kendo UI MVVM selects the `option` which corresponds to the View-Model value specified by the `value` binding. The `data-value-field` attribute specifies the field of the current item to which the `option` value is bound.

The example below demonstrates how to use the `value` binding with a `select` element, whose options are created by the `source` binding.

###### Example

    <select data-value-field="id" data-text-field="name"
           data-bind="value: selectedProduct, source: products">
    </select>
    <script>
    var viewModel = kendo.observable({
        selectedProduct: null,
        products: [
            { id: 1, name: "Coffee" },
            { id: 2, name: "Tea" },
            { id: 3, name: "Juice" }
        ]
    });

    viewModel.selectedProduct = viewModel.products[1];

    kendo.bind($("select"), viewModel);
    </script>

In the example, the second `option` is selected after calling the `kendo.bind` method. Its `value` attribute is equal to the value of the `id` field of the `selectedProduct`. If the user selects another option, the `selectedProduct` is set to the corresponding item from the `products` array.

Below is another example that demonstrates how to use the `value` binding with a `select` element whose options are created by the `source` binding.

###### Example

    <select data-value-field="id" data-text-field="name"
        data-bind="value: selectedProduct, source: products">
    </select>
    <script>
    var viewModel = kendo.observable({
        selectedProduct: 2, // note that the "id" of the second product is 2\. Thus the second product will be selected
        products: [
            { id: 1, name: "Coffee" },
            { id: 2, name: "Tea" },
            { id: 3, name: "Juice" }
        ]
    });

    kendo.bind($("select"), viewModel);
    </script>

Again the second `option` is selected because its `value` is equal to the `selectedProduct` View-Model field. If the user selects another option, the `id` field of the corresponding item from the `products` array is set as the `selectedProduct`.

## Data-Bound Widgets and Value Binding

Kendo UI `select` widgets, such as `AutoComplete`, `DropDownList`, `ComboBox`, and `MultiSelect`, have a built-in [auto-binding](/api/javascript/ui/dropdownlist#configuration-autoBind) feature that defers the data loading. The `value` binding honors that option and behaves differently when the widget is forced to defer its loading.

There are two basic cases based on the `autoBind` configuration value&mdash;`autoBind: true` (default) and `autoBind: false`.

### Basic Case&mdash;autoBind: true

The `autoBind: true` is the default basic case configuration. When the [`autoBind` option](/api/javascript/ui/dropdownlist#configuration-autoBind) is set to `true`, the `value` binding sets the widget value using its [`value`](/api/javascript/ui/dropdownlist#methods-value) method. If the data is not loaded, then the widget first loads the data.

###### Example

    <select data-role="dropdownlist"
            data-value-field="id"
            data-text-field="name"
            data-value-primitive="true"
            data-bind="value: selectedProductId, source: products, events: { dataBound: widgetBound }">
    </select>
    <script>
    var viewModel = kendo.observable({
        selectedProductId: 2,
        products: new kendo.data.DataSource({
            data: [
                { id: 1, name: "Coffee" },
                { id: 2, name: "Tea" },
                { id: 3, name: "Juice" }
            ]
        }),
        widgetBound: function() {
            alert("Widget is bound!");
        }
    });

    kendo.bind($("select"), viewModel);
    </script>

### Basic Case&mdash;autoBind: false

When the [`autoBind` option](/api/javascript/ui/dropdownlist#configuration-autoBind) is set to `false`, the `value` binding does not force the data loading, unless the `model` field is a [primitive value](#use-the-value-binding-with-a-select-widget-to-update-the-view-model-field-with-the-value-field-when-the-initial-value-is-null). In other words, if the `model` field, bound to the widget, is a complex object, then the `value` binding retrieves the [`dataValueField`](/api/javascript/ui/dropdownlist#configuration-dataTextField) and [`dataTextField`](/api/javascript/ui/dropdownlist#configuration-dataValueField) values without forcing the widget to request its data. If the `model` field is a primitive value, however, then the binding forces the data loading, it calls the widget's [`value`](/api/javascript/ui/dropdownlist#methods-value) method.

#### Object Value Not Forcing Binding

The example demonstrates a widget with the `autoBind: false` configuration when the object value does not force binding.

###### Example

    <!-- widget is not bound on load, even though the selected item is shown -->
    <select data-role="dropdownlist"
            data-value-field="id"
            data-text-field="name"
            data-auto-bind="false"
            data-bind="value: selectedProductId, source: products, events: { dataBound: widgetBound }">
    </select>
    <script>
    var viewModel = kendo.observable({
        selectedProductId: { id: 2, name: "Tea" },
        products: new kendo.data.DataSource({
            data: [
                { id: 1, name: "Coffee" },
                { id: 2, name: "Tea" },
                { id: 3, name: "Juice" }
            ]
        }),
        widgetBound: function() {
            alert("Widget is bound!");
        }
    });

    kendo.bind($("select"), viewModel);
    </script>

#### Primitive Value Forcing Binding

The example demonstrates a widget with the `autoBind: false` when the primitive value forces binding.

###### Example

    <!-- widget is not bound on load, even though the selected item is shown -->
    <select data-role="dropdownlist"
            data-value-field="id"
            data-text-field="name"
            data-auto-bind="false"
            data-value-primitive="true"
            data-bind="value: selectedProductId, source: products, events: { dataBound: widgetBound }">
    </select>
    <script>
    var viewModel = kendo.observable({
        selectedProductId: 2,
        products: new kendo.data.DataSource({
            data: [
                { id: 1, name: "Coffee" },
                { id: 2, name: "Tea" },
                { id: 3, name: "Juice" }
            ]
        }),
        widgetBound: function() {
            alert("Widget is bound!");
        }
    });

    kendo.bind($("select"), viewModel);
    </script>

### View-Model Fields with Value Field of Primitive Value

You can also use the `value` binding with a View-Model field which is of primitive type.

The example below demonstrates how to use the `value` binding with `select` to update the View-Model field with the value field when the initial value is `null`.

###### Example

    <select data-role="dropdownlist" data-option-label="Select product..." data-value-primitive="true"
      data-value-field="id" data-text-field="name" data-bind="value: selectedProductId, source: products">
    </select>
    <script>
    var viewModel = kendo.observable({
        selectedProductId: null,
        products: [
            { id: 1, name: "Coffee" },
            { id: 2, name: "Tea" },
            { id: 3, name: "Juice" }
        ]
    });

    kendo.bind($("select"), viewModel);
    </script>

By default, the `value` binding for the `select` widgets&mdash;`AutoComplete`, `DropDownList`, `ComboBox`, `MultiSelect`&mdash;uses the selected item from the data to update the View-Model field when the initial value is `null`.
The `data-value-primitive` attribute, that sets [valuePrimitive](/api/javascript/ui/dropdownlist#configuration-valuePrimitive) option, can be used to specify that the View-Model field should be updated with the item value field instead.

## Multiple Selections

Kendo UI MVVM supports `select` elements with multiple selection enabled. The bound View-Model field should be an array. Here are a few examples showing different configuration scenarios&mdash;with and without the `source` binding.

### Multiple Selection with Predefined Options

###### Example

    <select data-bind="value: selectedColors" multiple="multiple">
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
    </select>
    <script>
    var viewModel = kendo.observable({
        selectedColors: ["Blue"];
    });

    kendo.bind($("select"), viewModel);
    </script>

The third `option` is displayed as selected. Selecting another `option` appends its `value`, or text content if the value is not set, to the `selectedColors` array. Unselecting an `option` removes it from the `selectedColors` array.

### Multiple Selection with Options Created by Source Binding

###### Example

    <select data-value-field="id" data-text-field="name"
       data-bind="value: selectedProducts, source: products" multiple="multiple">
    </select>
    var viewModel = kendo.observable({
        selectedProducts: [],
        products: [
            { id: 1, name: "Coffee" },
            { id: 2, name: "Tea" },
            { id: 3, name: "Juice" }
        ]
    });

    viewModel.selectedProducts.push(viewModel.products[1]);

    kendo.bind($("select"), viewModel);
    </script>

The second `option` is displayed as selected. Selecting another `option` appends the corresponding item from the `products` array to the `selectedProducts` array. Unselecting an `option` removes its corresponding item from the `selectedProducts` array.

## Strongly Typed Value Binding

By default, the View-Model fields are updated with string values as this is what the `value` property of the DOM element contains. Since the 2015 Q1 release, Kendo UI MVVM allows strongly-typed `value` binding by parsing the value of the element before updating the View-Model field bound to it. The supported types are `text`, `number`, `date`, `datetime-local`, and `boolean`.

> **Important**
> * To be correctly parsed, the `date` and `datetime-local` values should use strict formatting rules, including the leading zeroes:
>   * `date`&mdash;"yyyy-MM-dd"
>   * `datetime-local`&mdash;"yyyy-MM-ddTHH:mm:ss"

### Use the type Attribute

Kendo UI MVVM automatically uses strongly-typed `value` binding based on the `type` attribute of the `input` element.

###### Example

```html
    <div id="view">
        <input type="number" data-bind="value: Quantity"/>
        <input type="date" data-bind="value: ArrivalDate"/>
    </div>
    <script>
        var viewModel = kendo.observable({
            Quantity: 22,
            ArrivalDate : new Date()
        });
        kendo.bind($("#view"), viewModel);
        viewModel.bind("change", function(e){
            console.log(e.field, "=", this.get(e.field));
        });
    </script>
```

### Use the data-type Attribute

Explicitly specifying the `data-type` is also supported via the `data-type` attribute.

###### Example

```html
    <div id="view">
        <input type="text" data-type="number" data-bind="value: Quantity"/>
        <input type="date" data-type="text" data-bind="value: ArrivalDate"/>

        <select multiple="multiple" data-type="number" data-bind="value: number">
            <option value="3.14">Pi</option>
            <option value="1.41">Pythagoras' constant</option>
            <option value="1.61">Golden ratio</option>
        </select>

        <select data-type="date" data-bind="value: Birthday">
            <option value="2015-01-01">John</option>
            <option value="2014-12-31">Jane</option>
        </select>
    </div>
    <script>
        var viewModel = kendo.observable({
            Quantity: 22,
            ArrivalDate : kendo.toString(new Date(), "yyyy-MM-dd"),
            Birthday: kendo.parseDate("2014-12-31", "yyyy-MM-dd"),
            number: [1.61, 3.14]
        });
        kendo.bind($("#view"), viewModel);
        viewModel.bind("change", function(e){
            console.log(e.field, "=", this.get(e.field));
        });
    </script>
```

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
* [Overview of the Source Binding]({% slug sourceblebinding_mvvm_kendoui %})
* [Overview of the Style Binding]({% slug stylebinding_mvvm_kendoui %})
* [Overview of the Text Binding]({% slug textbinding_mvvm_kendoui %})
* [Overview of the Visible Binding]({% slug visiblebinding_mvvm_kendoui %})
