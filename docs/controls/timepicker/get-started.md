---
title: Getting Started
page_title: jQuery TimePicker Documentation - Getting Started with the TimePicker
description: "Get started with the jQuery TimePicker by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_timepicker_widget
position: 1
---

# Getting Started with the TimePicker

This guide demonstrates how to get up and running with the Kendo UI for jQuery TimePicker.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <input id="timepicker" title="TimePicker"/>

    <script>
      // create TimePicker from input HTML element
      $("#timepicker").kendoTimePicker({
        value: new Date(2023, 0, 1, 10, 30),
        min: new Date(2023, 0, 1, 8, 0, 0), //date part is ignored
        min: new Date(2023, 0, 1, 22, 0, 0), //date part is ignored
        format: "HH:mm"
      });
    </script>
```

## 1. Create an Input Element

First, create an `<input>` element on the page from which the TimePicker component will be initialized. 

Note that the TimePicker copies any styles and CSS classes from the `input` element to the `wrapper` element and visible input. 

```html
<input id="timepicker" />
```

## 2. Initialize the TimePicker 

In this step, you will initialize the TimePicker from the `<input>` element. When you initialize the component, all settings of the TimePicker will be provided in the script statement. You have to describe its layout, configuration, and event handlers in JavaScript.

```html
<input id="timepicker" />

<script>
    // Target the input element by using jQuery and then call the kendoTimePicker() method.
    $("#timepicker").kendoTimePicker({
        // Add some basic configuration.
        value: new Date(2023, 0, 1, 10, 30),
    });
</script>
```

Once the basic initialization is completed, you can start adding additional configurations to the TimePicker. 

## 3. Set the Minimum and Maximum Time 

You can configure the TimePicker to display only dates in a specific range. Use the [`min`](/api/javascript/ui/timepicker/configuration/min) and [`max`](/api/javascript/ui/timepicker/configuration/max) options to set this range.

```html
<input id="timepicker" />

<script>    
    $("#timepicker").kendoTimePicker({        
        value: new Date(2023, 0, 1, 10, 30),
        min: new Date(2023, 0, 1, 8, 0, 0), //date part is ignored
        min: new Date(2023, 0, 1, 22, 0, 0), //date part is ignored
    });
</script>
```

## 4. Set the Format

You can customize the format of the displayed time by setting the [`format`](/api/javascript/ui/timepicker/configuration/format) configuration of the TimePicker.

```html
<input id="timepicker" />

<script>    
    $("#timepicker").kendoTimePicker({        
        value: new Date(2023, 0, 1, 10, 30),
        min: new Date(2023, 0, 1, 8, 0, 0), //date part is ignored
        min: new Date(2023, 0, 1, 22, 0, 0), //date part is ignored
        format: "HH:mm"
    });
</script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the jQuery TimePicker](https://demos.telerik.com/kendo-ui/timepicker/index)

## See Also 

* [JavaScript API Reference of the jQuery TimePicker](/api/javascript/ui/timepicker)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>