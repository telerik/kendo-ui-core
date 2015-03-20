---
title: Checked
page_title: Checked binding in Kendo UI MVVM | Kendo UI Documentation
description: Based on the value from the View-model, checked binding in Kendo UI MVVM changes the behaviour of a checkbox or a radio button.
---

# Checked binding

The `checked` binding checks or unchecks a checkbox (`<input type="checkbox" />`) or
radio button (`<input type="radio" />`) based on a value from the View-Model.

## Note: the checked binding supports only checkable DOM elements and widgets

To set the value of other input elements use the `value` binding.

## Checkbox checked binding

Kendo MVVM will display a bound checkbox in checked state if the value from the View-Model is `true`.
If the checkbox is checked by the end-user the value from the View-Model will be set to `true`.
Unchecking the checkbox will set the value from the View-Model to `false`. Setting the value from
the View-Model via code will check or uncheck the checkbox depending on the new value.

### Using the `checked` binding with a checkbox

    <input type="checkbox" data-bind="checked: isChecked" />
    <script>
    var viewModel = kendo.observable({
        isChecked: false
    });

    kendo.bind($("input"), viewModel);
    </script>


In this example the checkbox is initially displayed as unchecked because the value of the `isChecked` field is `false`.
If the user checks the checkbox the `isChecked` field will be set to `true`. Setting
`isChecked` to `true` from code will check the checkbox. Setting `isChecked` to `false` unchecks it.

### Binding a list of checkboxes to array

The `checked` binding also supports binding a list of checkboxes to a View-Model value of array type.
Checking a checkbox from the list will append its `value` attribute to the array specified by the `checked` binding.
Unchecking a checkbox will remove its `value` attribute from the array. Here is an example:

#### Using the `checked` binding with a list of checkboxes

    <input type="checkbox" value="Red"   data-bind="checked: colors" />
    <input type="checkbox" value="Green" data-bind="checked: colors" />
    <input type="checkbox" value="Blue"  data-bind="checked: colors" />
    <script>
    var viewModel = kendo.observable({
        colors: ["Red"]
    });

    kendo.bind($("input"), viewModel);
    </script>


In this example the first checkbox would be checked after calling `kendo.bind` because its `value`
attribute ("Red") is present in the `colors` array specified by the `checked` binding. Checking another
checkbox from the list (e.g. "Blue") would append its `value` attribute ("Blue") to the `colors` array.
Unchecking a checkbox from the list would remove its `value` attribute from the `colors` array.

## Radio button checked binding

Kendo MVVM will display a radio button in checked state only if its `value` attribute is equal to
the value from the View-Model. If the user checks a radio button its `value` attribute would update the
corresponding value from the View-Model. Updating the value from the View-Model via code would check the radio button whose `value`
attribute is equal to the new value.

### Using the `checked` binding with a group of radio buttons

    <input type="radio" value="Red"   name="color" data-bind="checked: selectedColor" />
    <input type="radio" value="Green" name="color" data-bind="checked: selectedColor" />
    <input type="radio" value="Blue"  name="color" data-bind="checked: selectedColor" />
    <script>
    var viewModel = kendo.observable({
        selectedColor: "Green"
    });

    kendo.bind($("input"), viewModel);
    </script>

In this example the second radio button would be checked after calling `kendo.bind` because its `value` attribute
("Green") is equal to the value of `selectedColor`. Checking another radio button (i.e. "Blue") will update
`selectedColor` (to "Blue"). Note that the `name` attribute of all radio buttons is the same.

### Important: a group of radio buttons should have the same name attribute

All radio buttons acting as a group should have the same `name` attribute. Only then checking a radio button from the group will uncheck the previously checked one.


## Strongly typed checked binding
Checkbox inputs bound to an array and radio buttons also support strong typing, using the same principles applied to the [strongly typed value binding](value#strongly-typed-value-binding).

### Using the data-type attribute
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