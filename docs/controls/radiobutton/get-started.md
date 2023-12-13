---
title: Getting Started
page_title: jQuery RadioButton Documentation - Getting Started with the RadioButton
description: "Get started with the jQuery RadioButton by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_radiobutton_widget
position: 1
---

# Getting Started with the RadioButton

This guide demonstrates how to get up and running with the Kendo UI for jQuery RadioButton.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
   <input type="radio" id="radiobutton">

   <script>
       $("#radiobutton").kendoRadioButton({
            label: "Label One",
            enabled: false
       }); 
    </script> 
```

## 1. Create an Input Element

Create an `<input type="radio">` element on the page and use it as an initialization element for the RadioButton.

```html
   <input type="radio" id="radiobutton">
```

## 2. Initialize the RadioButton

In this step, you will initialize the RadioButton from the `<input>` element. All settings of the RadioButton will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
   <input type="radio" id="radiobutton">

   <script>
       $("#radiobutton").kendoRadioButton(); 
    </script>
```

## 3. Add a Label for the RadioButton

Next, you can add a label next to the RadioButton by using the [`label`](/api/javascript/ui/radiobutton/configuration/label) option.

```html
   <input type="radio" id="radiobutton">

   <script>
       $("#radiobutton").kendoRadioButton({
            label: "Label One"
       }); 
    </script> 
```

## 4. Set the Enabled State

The RadioButton component allows you to define whether it will be enabled or disabled.

```html
   <input type="radio" id="radiobutton">

   <script>
       $("#radiobutton").kendoRadioButton({
            label: "Label One",
            enabled:false
       }); 
    </script> 
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery RadioButton](https://demos.telerik.com/kendo-ui/radiobutton/index)

## See Also

* [JavaScript API Reference of the jQuery RadioButton](/api/javascript/ui/radiobutton)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
