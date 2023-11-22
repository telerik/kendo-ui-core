---
title: Getting Started
page_title: jQuery CheckBoxGroup Documentation - Getting Started with the CheckBoxGroup
description: "Get started with the jQuery CheckBoxGroup by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_checkboxgroup_widget
position: 2
---

# Getting Started with the CheckBoxGroup

This guide demonstrates how to get up and running with the Kendo UI for jQuery CheckBoxGroup.

After the completion of this guide, you will achieve the following end result:

```dojo
   <ul id="checkboxgroup"></ul>

    <script>
        $(document).ready(function(){
            $("#checkboxgroup").kendoCheckBoxGroup({
              items: ["English", "German", "Italian", "Russian", "Spanish"],
              layout: "horizontal",
              value: ["English", "German"]
            });
        });
    </script>
```

## 1. Create an Empty \<ul> Element

First, create an `<ul>` element on the page that will serve as the initialization element of the CheckBoxGroup component.

```html
  <ul id="checkboxgroup"></ul>
```

## 2. Initialize the CheckBoxGroup

In this step, you will initialize the CheckBoxGroup from the `<ul>` element. All settings of the CheckBoxGroup will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
   <ul id="checkboxgroup"></ul>

    <script>
        $(document).ready(function(){
            $("#checkboxgroup").kendoCheckBoxGroup();
        });
    </script>
```

## 3. Apply Configuration Settings

Once the basic initialization is completed, you can start adding additional configurations to the CheckBoxGroup. The component allows you to configure properties such as [`items`](/api/javascript/ui/checkboxgroup/configuration/items), [`layout`](/api/javascript/ui/checkboxgroup/configuration/layout), and [`value`](/api/javascript/ui/checkboxgroup/configuration/value).

```html
   <ul id="checkboxgroup"></ul>

    <script>
        $(document).ready(function(){
            $("#checkboxgroup").kendoCheckBoxGroup({
              items: ["English", "German", "Italian", "Russian", "Spanish"], // Array of items to be rendered as checkboxes in the CheckBoxGroup.
              layout: "horizontal", // The checkboxes will be rendered on the same line ("horizontal").
              value: ["English", "German"] // The selected (checked) checkbox values
            });
        });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the CheckBoxGroup](https://demos.telerik.com/kendo-ui/checkboxgroup/index)

## See Also

* [JavaScript API Reference of the CheckBoxGroup](/api/javascript/ui/checkboxgroup)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
