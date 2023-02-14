---
title: Getting Started
page_title: jQuery DatePicker Documentation - Getting Started with the DatePicker
description: "Get started with the jQuery DatePicker by Kendo UI and learn how to create, initialize, and enable the widget."
slug: getting_started_kendoui_datepicker_widget
position: 2
---

# Getting Started with the DatePicker

This guide demonstrates how to get up and running with the Kendo UI for jQuery DatePicker.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <input id="datePicker" />

	<script>    
		$("#datePicker").kendoDatePicker({        
			value: new Date(2022, 0, 3),
			min: new Date(2022, 0, 1),
			max: new Date(2022, 5, 30),
			weekNumber: true,
			format: "yyyy-MM-dd"
		});
	</script>
```

## 1. Create a select Element

First, create an `<input>` element on the page from which the DatePicker widget will be initialized. 

Note that the DatePicker copies any styles and CSS classes from the `input` element to the `wrapper` element and visible input. Also, the first day of the week in the DatePicker calendar depends on the applied [culture]({% slug culture_definition_kendoui_globalization %}).

```html
<input id="datePicker" />
```

## 2. Initialize the DatePicker 

In this step, you will initialize the DatePicker from the `<input>` element. When you initialize the widget, all settings of the DatePicker will be provided in the script statement. You have to describe its layout, configuration and event handlers in JavaScript.


```html
<input id="datePicker" />

<script>
    // Target the input element by using jQuery and then call the kendoDatePicker() method.
    $("#datePicker").kendoDatePicker({
        // Add some basic configuration.
        value: new Date(2022, 0, 3)
    });
</script>
```

Once the basic initialization is completed, you can start adding additional configurations to the DatePicker. 

## 3. Set the Minimum and Maximum Date

The DatePicker can display only dates in a specific range by configuring the [`min`](/api/javascript/ui/datepicker/configuration/min) and [`max`](/api/javascript/ui/datepicker/configuration/max) options.

```html
<input id="datePicker" />

<script>    
    $("#datePicker").kendoDatePicker({        
        value: new Date(2022, 0, 3),
		min: new Date(2022, 0, 1),
		max: new Date(2022, 5, 30)	
    });
</script>
```

## 4. Add a Week Column

The [`weekNumber`](/api/javascript/ui/datepicker/configuration/weeknumber) configuration allows you to display the week of the year on the left side of the calendar.

```html
<input id="datePicker" />

<script>    
    $("#datePicker").kendoDatePicker({        
        value: new Date(2022, 0, 3),
		min: new Date(2022, 0, 1),
		max: new Date(2022, 5, 30),
		weekNumber: true
    });
</script>
```

## 5. Set the Format

You can customize the format of the displayed date by setting the [`format`](/api/javascript/ui/datepicker/configuration/format) configuration of the DatePicker.

```html
<input id="datePicker" />

<script>    
    $("#datePicker").kendoDatePicker({        
        value: new Date(2022, 0, 3),
		min: new Date(2022, 0, 1),
		max: new Date(2022, 5, 30),
		weekNumber: true,
		format: "yyyy-MM-dd"
    });
</script>
```

## Next Steps 

* [Referencing Existing Widget Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the DatePicker](https://demos.telerik.com/kendo-ui/datepicker/index)

## See Also 

* [JavaScript API Reference of the DatePicker](/api/javascript/ui/datepicker)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>