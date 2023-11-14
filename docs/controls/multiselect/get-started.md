---
title: Getting Started
page_title: jQuery MultiSelect Documentation - Getting Started with the MultiSelect
description: "Get started with the jQuery MultiSelect by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_multiselect_widget
position: 1
---

# Getting Started with the MultiSelect

This guide demonstrates how to get up and running with the Kendo UI for jQuery MultiSelect.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <select id="customers"></select>
    <script>
      $("#customers").kendoMultiSelect({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        dataSource: {
          type: "odata",
          transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
          },
        },
        label: { 
          content: "Customers",
          floating: true
        },
        height: 150,
        fillMode: "flat"
      });
    </script>
```

## 1. Create a select Element

First, create an `<select>` element on the page that will be used to initialize the component.

```html
 <select id="customers"></select>
```

## 2. Initialize the MultiSelect 

In this step, you will Initialize the MultiSelect from an existing `<select>` element with defined data items.

    <select id="multiselect">
        <option>Item 1</option>
        <option>Item 2</option>
        <option>Item 3</option>
    </select>

    <script>
        $(document).ready(function(){
            $("#multiselect").kendoMultiSelect();
        });
    </script>


Upon its initialization, the MultiSelect wraps the `<select>` element with a `<div>` tag.

```html
<select id="customers"></select>

<script>
    // Target the select element by using jQuery and then call the kendoMultiSelect() method.
    $("#customers").kendoMultiSelect({
        // Add some basic configurations such as a height.
        height: 150
    });
</script>
```

## 2. Specify a Data Source

Here, you will specify a [`dataSource`](/api/javascript/ui/multiselect/configuration/datasource) configuration for the component which is used to display a list of values.

```html
<select id="customers"></select>

<script>
    // Target the select element by using jQuery and then call the kendoMultiSelect() method.
    $("#customers").kendoMultiSelect({
        dataTextField: "ContactName", // The field of the data item that provides the text content of the list items. 
        dataValueField: "CustomerID", // The field of the data item that provides the value of the component.
        dataSource: {
          type: "odata",
          transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
          },
        },
        height: 150
    });
</script>
```

## 4. Apply Some Styling

The MultiSelect provides several options that enable you to modify its appearance. The following example demonstrates how to apply a flat [`fillMode`](/api/javascript/ui/multiselect/configuration/fillmode) configuration to the component.

```html
<select id="customers"></select>

<script>
    $("#customers").kendoMultiSelect({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        dataSource: {
          type: "odata",
          transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
          },
        },
        height: 150,
        fillMode: "flat" // Apply a flat fillMode.
    });
</script>
```

## 5. Configure the Label 

The MultiSelect enables you to configure the label by using its [`label`](https://docs.telerik.com/kendo-ui/api/javascript/ui/mulstiselect/configuration/label) property.

```html
<select id="customers"></select>

<script>
    $("#customers").kendoMultiSelect({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        dataSource: {
          type: "odata",
          transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
          },
        },
        height: 150,
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
* [Demo Page for the MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/index)

## See Also 

* [JavaScript API Reference of the MultiSelect](/api/javascript/ui/multiselect)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
