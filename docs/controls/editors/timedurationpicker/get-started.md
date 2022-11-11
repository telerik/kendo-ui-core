---
title: Getting Started
page_title: jQuery TimeDurationPicker Documentation - Getting Started with the TimeDurationPicker
description: "Get started with the jQuery TimeDurationPicker by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_timedurationpicker_widget
position: 1
---

# Getting Started with the TimeDurationPicker

This guide demonstrates how to get up and running with the Kendo UI for jQuery TimeDurationPicker.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <input id="timedurationpicker" />

    <script>
        $("#timedurationpicker").kendoTimeDurationPicker({
            columns: [
                { name: "hours", format: "## hours", min: 8, max: 11 },
                { name: "minutes", format: "## minutes", min: 15, max: 45, step: 5 },
                { name: "seconds", format: "## seconds", min: 10, max: 50, step: 10 }
            ],
            separator: " || "
        });
    </script>
```

## 1. Create an input Element

First, create an `<input>` element on the page that will be used to initialize the component.

```html
<input id="timedurationpicker" />
```

## 2. Initialize the TimeDurationPicker 

In this step, you will initialize the TimeDurationPicker from the `<input>` element.

```html
<input id="timedurationpicker" />

<script>
    // Target the input element by using jQuery and then call the kendoTimeDurationPicker() method.
    $("#timedurationpicker").kendoTimeDurationPicker({
    });
</script>
```

## 3. Configure the Columns

Now, you will set the [`columns`](/api/javascript/ui/timedurationpicker/configuration/columns) configuration, which:

* Is a fundamental and mandatory setting for the TimeDurationPicker&mdash;the component will not work without it. 
* Allows you to specify which time portion columns will be visible when the drop-down is expanded. 
* Enables you to specify a [`format`](/api/javascript/ui/timedurationpicker/configuration/columns.format), [`min`](/api/javascript/ui/timedurationpicker/configuration/columns.min) and [`max`](/api/javascript/ui/timedurationpicker/configuration/columns.max) allowed values, and [`step`](/api/javascript/ui/timedurationpicker/configuration/columns.step) for each individual column.

```html
<input id="timedurationpicker" />

<script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        columns: [
            { name: "hours", format: "## hours", min: 8, max: 11 },
            { name: "minutes", format: "## minutes", min: 15, max: 45, step: 5 },
            { name: "seconds", format: "## seconds", min: 10, max: 50, step: 10 }
        ]
    });
</script>
```

## 4. Configure the Separator

The TimeDurationPicker enables you to specify your own [`separator`](/api/javascript/ui/timedurationpicker/configuration/separator) that will be used to divide the individual time portions such as hours, minutes, and seconds.

```html
<input id="timedurationpicker" />

<script>
    $("#timedurationpicker").kendoTimeDurationPicker({
        separator: " || ",
        columns: [
            { name: "hours", format: "## hours", min: 8, max: 11 },
            { name: "minutes", format: "## minutes", min: 15, max: 45, step: 5 },
            { name: "seconds", format: "## seconds", min: 10, max: 50, step: 10 }
        ]
    });
</script>
```


## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the TimeDurationPicker](https://demos.telerik.com/kendo-ui/timedurationpicker/index)

## See Also 

* [JavaScript API Reference of the TimeDurationPicker](/api/javascript/ui/timedurationpicker)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>