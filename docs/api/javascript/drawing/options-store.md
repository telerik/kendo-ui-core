---
title: OptionsStore
page_title: API reference for Kendo UI Drawing API Options Store
res_type: api
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


<div class="meta-api-description">
How do I customize the initial configuration of the Kendo UI drawingapi component using the options parameter? Set initial configuration values, define default settings, configure startup options, prepopulate parameters, initialize with custom or partial options, pass initial property values, control default behaviors, supply constructor parameters for presets, establish base settings before use, and customize starting options for the drawing or graphical component setup.
</div>

#### Example

    <script>
        var options = new kendo.drawing.OptionsStore({
            title: "My Chart",
            series: {
                type: "line",
                color: "#ff0000"
            },
            categoryAxis: {
                labels: {
                    font: "12px Arial"
                }
            }
        });
        
        console.log(options.get("title")); // "My Chart"
        console.log(options.get("series.type")); // "line"
    </script>

## Fields

### observer `Object`
An optional observer for the options store.

Upon field modification, the optionsChange(e) method on the observer will be called
with a single argument containing two fields:
* field - The fully qualified field name
* value - The new field value


<div class="meta-api-description">
How do I set up notifications for changes in drawing options using Kendo UI for jQuery's OptionsStore.observer? Configure notifications for changes in drawing options by assigning a listener, observer, or callback object to monitor updates on the options storage. Enable reactive handling or event-driven responses whenever any option or configuration property is modified, triggering a method with details about the specific field name and its updated value. This setup supports observing state changes, tracking option adjustments, and implementing custom behaviors when drawing-related settings are altered, facilitating dynamic updates, option synchronization, or change detection through a handler that receives field identifiers and corresponding new values.
</div>

#### Example

    <script>
        var myObserver = {
            optionsChange: function(e) {
                console.log("Option changed: " + e.field + " = " + e.value);
            }
        };
        
        var options = new kendo.drawing.OptionsStore({
            color: "red",
            size: 10
        });
        
        // Set the observer
        options.observer = myObserver;
        
        // This will trigger the optionsChange callback
        options.set("color", "blue"); // Logs: "Option changed: color = blue"
        options.set("size", 15);      // Logs: "Option changed: size = 15"
    </script>

## Methods

### get
Gets the value of the specified option.


<div class="meta-api-description">
How do I retrieve the current value of a specific option in the Kendo UI drawingapi options collection using the get method? Retrieve or access stored configuration values, settings, or parameters from a component’s options or settings storage by specifying the desired option key or name. This method enables reading stored runtime options, styles, preferences, or configuration data, allowing developers to query, fetch, or obtain the current value of particular settings, properties, or flags within the drawing or UI component’s options collection. Whether you want to get, access, read, or inspect a specific configuration option by its identifier or key, this function provides direct retrieval of stored values for use in conditional logic, dynamic adjustments, or inspection of component state.
</div>

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


<div class="meta-api-description">
How do I dynamically change a Kendo UI for jQuery drawingapi configuration setting at runtime? Change or update a configuration setting dynamically by specifying an option name and its new value, enabling runtime modification of component behavior or settings without reinitialization. Adjust, override, or modify individual configuration options on the fly by calling a method that sets or updates the stored parameters, supporting use cases like toggling features, updating preferences, or controlling component state through targeted updates to option keys. This enables flexible control, quick changes, and programmatic configuration management within an options storage system.
</div>

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