---
title: Getting Started
page_title: jQuery CheckBox Documentation - Getting Started with the CheckBox
description: "Get started with the jQuery CheckBox by Kendo UI and learn how to create, initialize, and enable the component."
components: ["checkbox"]
slug: getting_started_kendoui_checkbox_widget
position: 2
---

# Getting Started with the CheckBox

This guide demonstrates how to get up and running with the Kendo UI for jQuery CheckBox.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <input id="checkbox" />

    <script>

      $("#checkbox").kendoCheckBox({ 
        label: "Checkbox",
        rounded:"large",
        size:"large",
        checked: true
      });
    </script>
```

## 1. Create an Empty input Element

First, create an `<input/>` element on the page that will serve as the initialization element of the CheckBox component.

```html
<input id='checkbox'/>
```

## 2. Initialize the CheckBox

In this step, you will initialize the CheckBox from the `<input>` element. All settings of the CheckBox will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<input id="checkbox"/>

<script>
    // Target the input element by using jQuery and then call the kendoCheckBox() method.
    $("#checkbox").kendoCheckBox();
</script>
```

## 3. Define the CheckBox Appearance

Once the basic initialization is completed, you can start adding additional configurations to the CheckBox. The component allows you to specify various styling options.

```html
<input id="checkbox"/>

<script>

  // Target the input element by using jQuery and then call the kendoCheckBox() method.
  $("#checkbox").kendoCheckBox({
        size:"large",
        rounded:"large"
  });
</script>
```

## 4. Configure the CheckBox Label

The CheckBox allows you to configure the text of the label rendered next to the box through the [label](/api/javascript/ui/checkbox/configuration/label).

```html
<input id="checkbox"/>

<script>

  // Target the input element by using jQuery and then call the kendoCheckBox() method.
  $("#checkbox").kendoCheckBox({
        label:"Checkbox"
        size:"large",
        rounded:"large"
  });
</script>
```

## 5. Define the Checked State

You can specify whether the CheckBox will be checked by default or not.

```html
<input id="checkbox"/>

<script>

  // Target the input element by using jQuery and then call the kendoCheckBox() method.
  $("#checkbox").kendoCheckBox({
        label: "Checkbox"
        size: "large",
        rounded: "large"
        checked: true
  });
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the CheckBox](https://demos.telerik.com/kendo-ui/checkbox/index)

## See Also

* [JavaScript API Reference of the CheckBox](/api/javascript/ui/checkbox)
* [Knowledge Base Section](/knowledge-base)


