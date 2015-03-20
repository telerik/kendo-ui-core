---
title: Value
page_title: Value binding in Kendo UI MVVM | Kendo UI Documentation
description: Keep the value of a DOM widget and the value of a View-Model field in sync by using value binding in Kendo UI MVVM.
---

# Value binding

The `value` binding keeps the value of a DOM element or widget and the value of a View-Model field in sync.
When the end-user changes the value of the DOM element (or widget) the bound View-Model value is updated. If the
View-Model value is updated from code the value of the bound DOM element (or widget) is updated visually.

** Important: the value binding supports only DOM elements or widgets that have a "value" **

Supported elements are `input`, `textarea` and
`select`. All widgets that have the notion of a value are supported i.e. `AutoComplete`,
`DropDownList`, `ComboBox`, `DatePicker`, `TimePicker`, `NumericTextBox`, `Slider`.

If you want to set the text or html content of a DOM element use the `text` or `html`
bindings instead of the `value` binding.

Checkboxes (`<input type="checkbox" />`) and radio buttons (`<input type="radio" />`) should use
the [checked](checked) binding instead.

## Input and textarea value binding

Kendo MVVM will display the View-Model value as the value of an `input` or `textarea` element.

### Use the value binding with an input and a textarea

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

After calling `kendo.bind` the `input` element would display the value of the `inputValue` field.
The `textarea` will display the value of the `textareaValue` field. If the value of the `input`
changes the `inputValue` field will change as well.
Likewise, if the value of the `textarea` changes so will `textareaValue`. Changing `inputValue` or
`textareaValue` View-Model fields from code will visually update the value of the bound elements.

### Controlling when the View-Model is updated

By default the `value` binding relies on the `change` DOM event which is raised after blurring the element whose value has changed. This means that the value from the View-Model will be updated when the element loses focus. The `data-value-update` attribute can be used to specify a different DOM event e.g. `keyup` or `keypress`. The `keydown` event is **not** supported because the DOM element value is not yet updated when that event triggers.

> The [input DOM event](https://developer.mozilla.org/en-US/docs/Web/Events/input) may be used in case you need to update the viewmodel value on each keypress *and* when the user pastes content in the field. Keep in mind that the input event is supported in IE9+.

### Using the data-value-update attribute

    <div id="view">
        <input data-value-update="keyup" data-bind="value: inputValue" />
    </div>
    <script>
    var viewModel = kendo.observable({
        inputValue: "Input value"
    });

    kendo.bind($("#view"), viewModel);
    </script>

## Select value binding

When the `select` element has a set of predefined options
Kendo MVVM will select the `option` whose `value` attribute is equal to value of the View-Model field.

### Use the value binding with a select with predefined options

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


In this example the second `option` will be selected because its `value` attribute is equal to the value of the `selectedColor` View-Model field.
Changing the selected `option` will update the value of the `selectedColor` View-Model field.

If the `value` attribute of an `option` is not set its text content will be used instead:

### Use the value binding with a select with predefined options that don't have a value

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

In this case the third `option` will be selected because its text content is equal to the value of the `selectedColor` View-Model field.

When the `select` element options are created by the [source](source) binding
Kendo MVVM will select the `option` which corresponds to the View-Model value specified by the `value` binding.
The `data-value-field` attribute specifies the field of the current item to which the `option` value is bound.

### Use the value binding with a select whose options are created by the source binding

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


In this example the second `option` will be selected after calling `kendo.bind`. It's `value` attribute is equal to the value of the `id`
field of the `selectedProduct`. If the user selects another option the `selectedProduct` will be set to the corresponding item from the `products` array.

You can also use the `value` binding with a View-Model field which is of primitive type.

### Use the value binding with a select widget to update the View-Model field with the value field when the initial value is null.

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

By default the value binding for the select widgets(`AutoComplete`, `DropDownList`, `ComboBox`, `MultiSelect`) uses the selected item from the data to update the View-Model field when the initial value is `null`. The `data-value-primitive` attribute can be used to specify that the View-Model field should be updated with the item value field instead.

### Use the value binding with a select whose options are created by the source binding

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


Again the second `option` will be selected because its `value` is equal to the `selectedProduct` View-Model field.
If the user selects another option the `id` field of the corresponding item from the `products` array will be set as the `selectedProduct`.

### Multiple selection

Kendo MVVM supports select elements with multiple selection enabled. The bound View-Model field should be an array. Here are a few examples
showing different configuration scenarios - with and without the `source` binding.

#### Multiple selection with predefined options

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

The third `option` will be displayed as selected. Selecting another `option` will append its `value` (or text content if the value is not set) to the
`selectedColors` array. Unselecting an `option` will remove it from the `selectedColors` array.

#### Multiple selection with options created by the source binding

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

The second `option` will be displayed as selected. Selecting another `option` will append the corresponding item from the `products` array to the
`selectedProducts` array. Unselecting an `option` will remove its corresponding item from the `selectedProducts` array.

## Strongly typed value binding
By default the View-Model fields are updated with string values, as this is what the DOM element's value property contains. Since the 2015 Q1 release, Kendo MVVM allows strongly typed value binding by parsing the element's value before updating the View-Model field bound to it. Supported types are `text`, `number`, `date`, `datetime-local` and `boolean`.  

> To be correctly parsed, the `date` and `datetime-local` values should use strict formatting rules, including the leading zeroes:
> 
> - `date` - "yyyy-MM-dd"
> - `datetime-local` - "yyyy-MM-ddTHH:mm:ss"


### Using the type attribute
Kendo MVVM automatically uses strongly typed value binding based on the input element's `type` attribute.
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

### Using the data-type attribute
Explicitly specifying the data type is also supported, via the `data-type` attribute.
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