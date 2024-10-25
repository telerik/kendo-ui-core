---
title: Getting Started
page_title: jQuery ComboBox Documentation - Getting Started with the ComboBox
description: "Get started with the jQuery ComboBox by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_combobox_widget
position: 1
---

# Getting Started with the ComboBox

This guide demonstrates how to get up and running with the Kendo UI for jQuery ComboBox.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
  <input id="combobox" />
  <script>
  $("#combobox").kendoComboBox({
    dataSource: [
      { id: 1, name: "Apples" },
      { id: 2, name: "Oranges" }
    ],
    dataTextField: "name",
    label: { 
      content: "Fruits",
      floating: true 
    },
    clearButton: false
  });
</script>
```

## 1. Create an input Element

First, create an `<input>` element on the page that will be used to initialize the component.

```html
<input id="combobox" />
```

## 2. Initialize the ComboBox 

In this step, you will initialize the ComboBox from the `<input>` element. Upon its initialization, the ComboBox wraps the `<input>` element with a `<span>` tag.

```html
<input id="combobox" />

<script>
    // Target the input element by using jQuery and then call the kendoComboBox() method.
    $("#combobox").kendoComboBox({
      // Add some basic configurations such as a clear button.
      clearButton: false
    });
</script>
```

## 3. Specify the Data Source

Here, you will specify a [`dataSource`](/api/javascript/ui/combobox/configuration/datasource) configuration for the component which is used to display the list of values.

```html
  <input id="combobox" />

  <script>
  $("#combobox").kendoComboBox({
    // Add an array of elements to the DataSource.
    dataSource: [
      { id: 1, name: "Apples" },
      { id: 2, name: "Oranges" }
    ],
    dataTextField: "name", //The field of the data item that provides the text content of the list items.
    clearButton: false
  });
</script>
```

## 4. Apply Some Styling

The ComboBox provides several options that enable you to modify its appearance. In this example, you will apply a flat [`fillMode`](/api/javascript/ui/combobox/configuration/fillmode) configuration to the component.

```html
<input id="combobox" />

<script>
    $("#combobox").kendoComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      clearButton: false,
      fillMode: "flat" // Apply a flat fillMode.
    });
</script>
```

## 5. Configure the Label 

The ComboBox enables you to configure its label by using its [`label`](/api/javascript/ui/combobox/configuration/label) property.

```html
<input id="combobox" />

<script>
    $("#combobox").kendoComboBox({
        dataSource: [
          { id: 1, name: "Apples" },
          { id: 2, name: "Oranges" }
        ],
        dataTextField: "name",
        clearButton: false,
        fillMode: "flat",
        label: { 
          content: "Customers", // Specify the label content.
          floating: true // Allow the label to float.
        }
    });
</script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the ComboBox](https://demos.telerik.com/kendo-ui/combobox/index)

## See Also 

* [JavaScript API Reference of the ComboBox](/api/javascript/ui/combobox)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
