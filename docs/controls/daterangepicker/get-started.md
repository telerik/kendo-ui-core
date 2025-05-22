---
title: Getting Started
page_title: jQuery DateRangePicker Documentation - Getting Started with the DateRangePicker
description: "Get started with the jQuery DateRangePicker by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_daterangepicker_widget
position: 1
---

# Getting Started with the DateRangePicker

This guide demonstrates how to get up and running with the Kendo UI for jQuery DateRangePicker.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="daterangepicker" title="daterangepicker"></div>

    <script>
      // create DateRangePicker from div HTML element
      $("#daterangepicker").kendoDateRangePicker({
        value: new Date(),
        min: new Date(2023, 0, 1),
        max: new Date(2023, 0, 25),
        format: "yyyy-MM-dd"
      });
    </script>
```

## 1. Create an Empty Div Element

First, create an empty `<div>` element on the page from which the DateRangePicker component will be initialized. 

```html
<div id="daterangepicker" title="daterangepicker"></div>
```

## 2. Initialize the DateRangePicker 

In this step, you will initialize the DateRangePicker from the `<div>` element. When you initialize the component, all settings of the DateRangePicker will be provided in the script statement. You have to describe its layout, configuration, and event handlers in JavaScript.

```html
<div id="daterangepicker" title="daterangepicker"></div>

<script>
    // Target the div element by using jQuery and then call the kendoDateRangePicker() method.
    $("#daterangepicker").kendoDateRangePicker({
        // Add some basic configuration.
        value: new Date()
    });
</script>
```

Once the basic initialization is completed, you can start adding additional configurations to the DateRangePicker. 

## 3. Set the Minimum and Maximum Date

To limit the range of the displayed dates in the DateRangePicker, use the supported [`min`](/api/javascript/ui/daterangepicker/configuration/min) and [`max`](/api/javascript/ui/daterangepicker/configuration/max) options.

```html
<div id="daterangepicker" title="daterangepicker"></div>

<script>    
    $("#daterangepicker").kendoDateRangePicker({        
        value: new Date(),
		min: new Date(2023, 0, 1),
		max: new Date(2023, 0, 25)	
    });
</script>
```

## 4. Set the Format

You can customize the format of the displayed date by setting the [`format`](/api/javascript/ui/daterangepicker/configuration/format) configuration of the DateRangePicker.

```html
<div id="daterangepicker" title="daterangepicker"></div>

<script>    
    $("#daterangepicker").kendoDateRangePicker({        
        value: new Date(),
		min: new Date(2023, 0, 1),
		max: new Date(2023, 0, 25),
        format: "yyyy-MM-dd"
    });
</script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the jQuery DateRangePicker](https://demos.telerik.com/kendo-ui/daterangepicker/index)

## See Also 

* [JavaScript API Reference of the jQuery DateRangePicker](/api/javascript/ui/daterangepicker)
* [Knowledge Base Section](/knowledge-base)

