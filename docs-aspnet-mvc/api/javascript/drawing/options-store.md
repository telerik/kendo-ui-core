---
title: OptionsStore
page_title: API reference for Kendo UI Drawing API Options Store
---

# kendo.drawing.OptionsStore : kendo.Class
Stores nested settings and notifies an (optional) observer of changes.

###### Example - initializing an options store
    <script>
        var options = new kendo.drawing.OptionsStore({
            foo: {
                bar: true
            }
        });
    </script>

## Constructor Parameters

### options `Object`
The initial values of all options.

## Fields

### observer `Object`
An optional observer for the options store.

Upon field modification, the optionsChange(e) method on the observer will be called
with a single argument containing two fields:
* field - The fully qualified field name
* value - The new field value

## Methods

### get
Gets the value of the specified option.

#### Example - retrieving an option value
    <script>
        var options = new kendo.drawing.OptionsStore({
            foo: {
                bar: true
            }
        });

        // The bar variable will be set to true by any of these statements:
        var bar = options.get("foo.bar");
        var bar = options.foo.get("bar");
        var bar = options.foo.bar;
    </script>

#### Parameters

##### field `String`
The field name to retrieve.
Must be a fully qualified name (e.g. "foo.bar") for nested options.

#### Returns
`Object` The current option value.


### set
Sets the value of the specified option.

#### Example - retrieving an option value
    <script>
        var options = new kendo.drawing.OptionsStore({
            foo: {
                bar: true
            }
        });

        // The foo.bar setting will be set to false by any of these statements:
        options.set("foo.bar", false);
        options.foo.set("bar", false);

        // The following statement will succeed,
        // but will not trigger optionsChange on the observer (if any).
        options.foo.bar = false;
    </script>

#### Parameters

##### field `String`
The name of the option to set.
Must be a fully qualified name (e.g. "foo.bar") for nested options.

##### value `Object`

The new option value.

If the new value is exactly the same as the new value the operation
will not trigger options change on the observer (if any).
