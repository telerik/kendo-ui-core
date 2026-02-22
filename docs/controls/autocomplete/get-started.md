---
title: Getting Started
page_title: jQuery AutoComplete Documentation - Getting Started with the AutoComplete
description: "Get started with the jQuery AutoComplete by Kendo UI and learn how to create, initialize, and enable the component."
components: ["autocomplete"]
slug: getting_started_kendoui_autocomplete_component
position: 1
---

# Getting Started with the AutoComplete

This guide demonstrates how to get up and running with the Kendo UI for jQuery AutoComplete.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
  <input id="autocomplete" />
  <script>
    $("#autocomplete").kendoAutoComplete({
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
<input id="autocomplete" />
```

## 2. Initialize the AutoComplete 

In this step, you will initialize the AutoComplete from the `<input>` element. Upon its initialization, the AutoComplete wraps the `<input>` element with a `<span>` tag.

```html
<input id="autocomplete" />

<script>
    // Target the input element by using jQuery and then call the kendoAutoComplete() method.
    $("#autocomplete").kendoAutoComplete({
      // Add some basic configurations such as a clear button.
      clearButton: false
    });
</script>
```

## 3. Specify the Data Source

Here, you will specify a [`dataSource`](/api/javascript/ui/autocomplete/configuration/datasource) configuration for the component which is used to display the list of values.

```html
  <input id="autocomplete" />

  <script>
  $("#autocomplete").kendoAutoComplete({
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

The AutoComplete provides several options that enable you to modify its appearance. In this example, you will apply a flat [`fillMode`](/api/javascript/ui/autocomplete/configuration/fillmode) configuration to the component.

```html
<input id="autocomplete" />

<script>
    $("#autocomplete").kendoAutoComplete({
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

The AutoComplete enables you to configure its label by using its [`label`](/api/javascript/ui/autocomplete/configuration/label) property.

```html
<input id="autocomplete" />

<script>
    $("#autocomplete").kendoAutoComplete({
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
* [Demo Page for the Kendo UI for jQuery AutoComplete](https://demos.telerik.com/kendo-ui/autocomplete/index)

## See Also 

* [JavaScript API Reference of the jQuery AutoComplete](/api/javascript/ui/autocomplete)
* [Knowledge Base Section](/knowledge-base)


