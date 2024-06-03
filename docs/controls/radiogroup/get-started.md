---
title: Getting Started
page_title: jQuery RadioGroup Documentation - Getting Started with the RadioGroup
description: "Get started with the jQuery RadioGroup by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_radiogroup
position: 1
---

# Getting Started with the RadioGroup

This guide demonstrates how to get up and running with the Kendo UI for jQuery RadioGroup.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
	<ul id="radiogroup"></ul>

    <script>
      $("#radiogroup").kendoRadioGroup({
        value: "two",
        items: [{
          value: "one",
          label: "Label one",
          attributes: {
            "data-test": "custom"
          },
          cssClass: "custom-class"
        },{
          value: "two",
          label: "Label two"
        },{
          value: "three",
          label: "Label three",
          enabled: false
        }]
      });
    </script>
    <style>
      .custom-class {
        background-color:lightgreen;
      }
    </style>
```

## 1. Create a UL Element

First, create a `<ul>` element on the page where you want to initialize the RadioGroup component.

```html
    <ul id="radiogroup"></ul>
```

## 2. Initialize the RadioGroup

In this step, initialize the RadioGroup from the `<ul>` element. When you initialize the component, all settings of the RadioGroup will be provided in the script statement. You have to describe its configuration and event handlers in JavaScript.

```html
<ul id="radiogroup"></ul>

<script>
    // Target the ul element by using jQuery and then call the kendoRadioGroup() method.
    $("#radiogroup").kendoRadioGroup();
</script>
```

After the basic initialization is completed, you can start adding additional configurations to the RadioGroup.

## 3. Add the Items

The buttons you will see in the RadioGroup are configured through the [`items`](/api/javascript/ui/radiogroup/configuration/items) option. It exposes various settings such as `attributes`, `cssClass`, `enabled`, and others. 

```html
<ul id="radiogroup"></ul>

<script>
    // Target the ul element by using jQuery and then call the kendoRadioGroup() method.
    $("#radiogroup").kendoRadioGroup({
        items: [{
          value: "one",
          label: "Label one",
          attributes: {
            "data-test": "custom"
          },
          cssClass: "custom-class"
        },{
          value: "two",
          label: "Label two"
        },{
          value: "three",
          label: "Label three",
          enabled: false
        }]
    });
</script>
<style>
    .custom-class {
      background-color:lightgreen;
    }
</style>
```

## 4. Set the RadioGroup Value

You can preset the value of the component using the [`value`](/api/javascript/ui/radiogroup/configuration/value) option.

```html
<ul id="radiogroup"></ul>
<script>
    $("#radiogroup").kendoRadioGroup({
    value: "two", 
    items: [{
        value: "one",
        label: "Label one",
        attributes: {
        "data-test": "custom"
        },
        cssClass: "custom-class"
    },{
        value: "two",
        label: "Label two"
    },{
        value: "three",
        label: "Label three",
        enabled: false
    }]
    });
</script>
<style>
    .custom-class {
        background-color:lightgreen;
    }
</style>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the RadioGroup](https://demos.telerik.com/kendo-ui/radiogroup/index)

## See Also

* [JavaScript API Reference of the RadioGroup](/api/javascript/ui/radiogroup)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>