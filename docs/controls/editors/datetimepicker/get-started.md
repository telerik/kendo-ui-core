---
title: Getting Started
page_title: jQuery DateTimePicker Documentation - Getting Started with the DateTimePicker
description: "Get started with the jQuery DateTimePicker by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_datetimepicker_widget
position: 1
---

# Getting Started with the DateTimePicker

This guide demonstrates how to get up and running with the Kendo UI for jQuery DateTimePicker.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <input id="datetimepicker" title="datetimepicker"/>

    <script>
      // create DateTimePicker from input HTML element
      $("#datetimepicker").kendoDateTimePicker({
        value: new Date(),
        min: new Date(2023, 0, 1),
        max: new Date(2023, 0, 25),
        format: "yyyy-MM-dd"
      });
    </script>
```

## 1. Create an input Element

First, create an `<input>` element on the page from which the DateTimePicker component will be initialized. 

Note that the DateTimePicker copies any styles and CSS classes from the `input` element to the `wrapper` element and visible input. Also, the first day of the week in the DateTimePicker calendar depends on the applied [culture]({% slug culture_definition_kendoui_globalization %}).

```html
<input id="datetimepicker" />
```

## 2. Initialize the DateTimePicker 

In this step, you will initialize the DateTimePicker from the `<input>` element. When you initialize the component, all settings of the DateTimePicker will be provided in the script statement. You have to describe its layout, configuration, and event handlers in JavaScript.

```html
<input id="datetimepicker" />

<script>
    // Target the input element by using jQuery and then call the kendoDateTimePicker() method.
    $("#datetimepicker").kendoDateTimePicker({
        // Add some basic configuration.
        value: new Date()
    });
</script>
```

Once the basic initialization is completed, you can start adding additional configurations to the DateTimePicker. 

## 3. Set the Minimum and Maximum Date

The DateTimePicker can display only dates in a specific range through the supported [`min`](/api/javascript/ui/datetimepicker/configuration/min) and [`max`](/api/javascript/ui/datetimepicker/configuration/max) options.

```html
<input id="datetimepicker" />

<script>    
    $("#datetimepicker").kendoDateTimePicker({        
        value: new Date(),
		min: new Date(2023, 0, 1),
		max: new Date(2023, 0, 25)	
    });
</script>
```

## 4. Set the Format

You can customize the format of the displayed date by setting the [`format`](/api/javascript/ui/datetimepicker/configuration/format) configuration of the DateTimePicker.

```html
<input id="datetimepicker" />

<script>    
    $("#datetimepicker").kendoDateTimePicker({        
        value: new Date(),
		min: new Date(2023, 0, 1),
		max: new Date(2023, 5, 30),
		weekNumber: true,
		format: "yyyy-MM-dd"
    });
</script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the jQuery DateTimePicker](https://demos.telerik.com/kendo-ui/datetimepicker/index)

## See Also 

* [JavaScript API Reference of the jQuery DateTimePicker](/api/javascript/ui/datetimepicker)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>