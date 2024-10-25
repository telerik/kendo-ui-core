---
title: Getting Started
page_title: jQuery DateInput Documentation - Getting Started with the DateInput
description: "Get started with the jQuery DateInput by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_dateinput_component
position: 2
---

# Getting Started with the DateInput

This guide demonstrates how to get up and running with the Kendo UI for jQuery DateInput.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <input id="dateinput" style="width: 150px;"/>
    <script>
      $("#dateinput").kendoDateInput({
        value: new Date(2024, 0, 3),
		min: new Date(2024, 0, 1),
		max: new Date(2024, 5, 30),
        format: "yyyy-MM-dd",
        size: "medium",
        rounded: "large",
        fillMode: "solid"
      });
    </script>
```

## 1. Create an Input Element

First, create an `<input>` element on the page from which the DateInput component will be initialized. 

```html
<input id="dateinput"/>
```

## 2. Initialize the DateInput 

In this step, you will initialize the DateInput from the `<input>` element. When you initialize the component, all settings of the DateInput will be provided in the script statement. You have to describe its layout, configuration, and event handlers in JavaScript.


```html
    <input id="dateinput"/>
    <script>
      $("#dateinput").kendoDateInput({
        value: new Date(2022, 0, 3)
      });
    </script>
```

Once the basic initialization is completed, you can start adding additional configurations to the DateInput. 

## 3. Set the Min and Max Dates

The DateInput can restrict the date range that can be entered in the input by configuring the [`min`](/api/javascript/ui/dateinput/configuration/min) and [`max`](/api/javascript/ui/dateinput/configuration/max) options.

```html
    <input id="dateinput"/>
    <script>
      $("#dateinput").kendoDateInput({
		min: new Date(2024, 0, 1),
		max: new Date(2024, 5, 30),
      });
    </script>
```

## 4. Set the Format

You can customize the format of the displayed date by setting the [`format`](/api/javascript/ui/dateinput/configuration/format) configuration of the DateInput.

```html
    <input id="dateinput" style="width: 150px;"/>
    <script>
      $("#dateinput").kendoDateInput({
		min: new Date(2024, 0, 1),
		max: new Date(2024, 5, 30),
        format: "yyyy-MM-dd"
      });
    </script>
```

## 5. Apply Styling Settings

In this step, you can apply different styling settings to the component such as [`size`](/api/javascript/ui/dateinput/configuration/size), [`rounded`](/api/javascript/ui/dateinput/configuration/rounded), and [`fillMode`](/api/javascript/ui/dateinput/configuration/fillmode).

```dojo
    <input id="dateinput" style="width: 150px;"/>
    <script>
      $("#dateinput").kendoDateInput({
		min: new Date(2024, 0, 1),
		max: new Date(2024, 5, 30),
        format: "yyyy-MM-dd",
        size: "medium", // Apply 'medium' size of the component
        rounded: "large", // Apply 'large' border radius
        fillMode: "solid" // Apply 'solid' border color
      });
    </script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the DateInput](https://demos.telerik.com/kendo-ui/dateinput/index)

## See Also 

* [JavaScript API Reference of the DateInput](/api/javascript/ui/dateinput)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
