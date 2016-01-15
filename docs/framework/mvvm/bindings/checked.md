---
title: Checked
page_title: Checked | Kendo UI MVVM
description: "Learn how to change the behavior of a checkbox or a radio button based on the value from the View-Model in Kendo UI MVVM."
slug: checkedbinding_mvvm_kendoui
---

# Checked Binding

The Kendo UI Checked (`checked`) binding checks or unchecks a checkbox (`<input type="checkbox" />`) or a radio button (`<input type="radio" />`) based on a value from the View-Model.

> **Important**
>
> The `checked` binding supports only checkable DOM elements and widgets.

To set the value of other `input` elements use the `value` binding.

## Checkboxes

The [Kendo UI MVVM](http://demos.telerik.com/kendo-ui/mvvm/index) displays a bound checkbox in `checked` state if the value from the View-Model is `true`. If the checkbox is checked by the end-user, the value from the View-Model is set to `true`. Unchecking the checkbox sets the value from the View-Model to `false`. Setting the value from the View-Model via code checks or unchecks the checkbox depending on the new value.

### Use with Checkboxes

The example below demonstrates how to use the `checked` binding with a checkbox.

###### Example

    <input type="checkbox" data-bind="checked: isChecked" />
    <script>
    var viewModel = kendo.observable({
        isChecked: false
    });

    kendo.bind($("input"), viewModel);
    </script>

In the example, the checkbox is initially displayed as unchecked because the value of the `isChecked` field is `false`. If the user checks the checkbox, the `isChecked` field is set to `true`. Setting `isChecked` to `true` from code checks the checkbox. Setting `isChecked` to `false` unchecks it.

### Bind List of Checkboxes to Array

The `checked` binding also supports binding a list of checkboxes to a View-Model value of an array type. Checking a checkbox from the list appends its `value` attribute to the array specified by the `checked` binding. Unchecking a checkbox removes its `value` attribute from the array.

The example below demonstrates how to use the `checked` binding with a list of checkboxes.

###### Example

    <input type="checkbox" value="Red"   data-bind="checked: colors" />
    <input type="checkbox" value="Green" data-bind="checked: colors" />
    <input type="checkbox" value="Blue"  data-bind="checked: colors" />
    <script>
    var viewModel = kendo.observable({
        colors: ["Red"]
    });

    kendo.bind($("input"), viewModel);
    </script>

In the example, the first checkbox is checked after calling `kendo.bind` because its `value` attribute (`"Red"`) is present in the `colors` array specified by the `checked` binding. Checking another checkbox from the list, e.g. `"Blue"`, would append its `value` attribute (`"Blue"`) to the `colors` array. Unchecking a checkbox from the list would remove its `value` attribute from the `colors` array.

## Radio Buttons

The [Kendo UI MVVM](http://demos.telerik.com/kendo-ui/mvvm/index) displays a radio button in `checked` state only if its `value` attribute is equal to the value from the View-Model. If the user checks a radio button, its `value` attribute updates the corresponding value from the View-Model. Updating the value from the View-Model via code checks the radio button whose `value` attribute is equal to the new value.

### Use with Radio Buttons

The example below demonstrates how to use the `checked` binding with a group of radio buttons.

###### Example

    <input type="radio" value="Red"   name="color" data-bind="checked: selectedColor" />
    <input type="radio" value="Green" name="color" data-bind="checked: selectedColor" />
    <input type="radio" value="Blue"  name="color" data-bind="checked: selectedColor" />
    <script>
    var viewModel = kendo.observable({
        selectedColor: "Green"
    });

    kendo.bind($("input"), viewModel);
    </script>

In the example, the second radio button is checked after calling `kendo.bind` because its `value` attribute (`"Green"`) is equal to the value of `selectedColor`. Checking another radio button, i.e. `"Blue"`, updates `selectedColor` (to "Blue"). Note that the `name` attribute of all radio buttons is the same.

> **Important**
>
> All radio buttons acting as a group should have the same `name` attribute. Only then checking a radio button from the group unchecks the previously checked one.

## Strongly-Typed checked Binding

Checkbox inputs bound to an array and radio buttons also support [strong typing](http://demos.telerik.com/kendo-ui/mvvm/types), which uses the same principles applied to the [strongly typed value binding](value#strongly-typed-value-binding).

### Use with Data-Type Attributes

The example below demonstrates how to use the data-type attribute.

###### Example

```html
    <div id="view">
        <input type="checkbox" name="items" data-bind="checked: items" value="bike"/>
        <input type="checkbox" name="items" data-bind="checked: items" value="-1" data-type="number"/>
        <input type="checkbox" name="items" data-bind="checked: items" value="true" data-type="boolean"/>
        <input type="checkbox" name="items" data-bind="checked: items" value="2015-01-31" data-type="date"/>

        <input type="radio" name="group" data-type="date" data-bind="checked: group" value="2015-01-31"/>
        <input type="radio" name="group" data-type="datetime-local" data-bind="checked: group" value="2013-06-05T23:13:40"/>
        <input type="radio" name="group" data-type="text" data-bind="checked: group" value="Hello"/>
        <input type="radio" name="group" data-type="number" data-bind="checked: group" value="3.14"/>
        <input type="radio" name="group" data-type="boolean" data-bind="checked: group" value="false"/>
    </div>
    <script>
        var viewModel = kendo.observable({
            items: [-1, true],
            group: kendo.parseDate("2015-01-31", "yyyy-MM-dd")
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
* [Overview of the Value Binding]({% slug valuebinding_mvvm_kendoui %})
* [Overview of the Visible Binding]({% slug visiblebinding_mvvm_kendoui %})
