---
title: Getting Started
page_title: jQuery DropDownList Documentation | Getting Started with the DropDownList
description: "Get started with the jQuery DropDownList by Kendo UI and learn how to create, initialize, and enable the widget."
slug: getting_started_kendoui_dropdownlist_widget
position: 1
---

# Getting Started with the DropDownList

This guide demonstrates how to get up and running with the Kendo UI for jQuery DropDownList. 

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <select id="dropdownlist"></select>

    <script>
    let data = [
        {ID: 1, ProductName: "Beds" },
        {ID: 2, ProductName: "Chairs" },
        {ID: 3, ProductName: "Sofas"},
        {ID: 4, ProductName: "Dining Tables" },
        {ID: 5, ProductName: "TV stoves" }
    ];
    
    // Target the select element by using jQuery and then call the kendoDropDownList() method.
    $("#dropdownlist").kendoDropDownList({
        dataTextField:"ProductName",
        dataValueField:"ID",
        height: "400px",
        dataSource: data,
        filter:"contains"
    });
    </script>
```

## 1. Create a select Element

First, create a `<select>` element on the page from which the DropDownList widget will be initialized.

```html
<select id="dropdownlist"></select>
```

## 2. Initialize the DropDownList 

In this step, you will initialize the DropDownList from the `<select>` element. When you initialize the widget, all settings of the DropDownList will be provided in the script statement. You have to describe its layout, configuration, and event handlers in JavaScript.


```html
<select id="dropdownlist"></select>

<script>
    // Target the select element by using jQuery and then call the kendoDropDownList() method.
    $("#dropdownlist").kendoDropDownList({
        // Add some basic configuration.
        height: "400px"
    });
</script>
```

## 3. Bind the DropDownList to Data

Once the basic initialization is completed, you can start adding additional configurations to the DropDownList. The first and most important configuration is the [`dataSource`]({% slug overview_kendoui_datasourcecomponent %}).

```html
<select id="dropdownlist"></select>

<script>
  let data = [
    {ID: 1, ProductName: "Beds" },
    {ID: 2, ProductName: "Chairs" },
    {ID: 3, ProductName: "Sofas"},
    {ID: 4, ProductName: "Dining Tables" },
    {ID: 5, ProductName: "TV stoves" }
  ];
  
  // Target the select element by using jQuery and then call the kendoDropDownList() method.
  $("#dropdownlist").kendoDropDownList({
    dataTextField:"ProductName",
    dataValueField:"ID",
    height: "400px",
    dataSource: data
  });
</script>
```

## 4. Add Filtering

Among other functionalities, the DropDownList supports filtering. The filtering configuration allows users to filter the data inside the DropDownList.

```html
<select id="dropdownlist"></select>

<script>
  let data = [
    {ID: 1, ProductName: "Beds" },
    {ID: 2, ProductName: "Chairs" },
    {ID: 3, ProductName: "Sofas"},
    {ID: 4, ProductName: "Dining Tables" },
    {ID: 5, ProductName: "TV stoves" }
  ];
  
  // Target the select element by using jQuery and then call the kendoDropDownList() method.
  $("#dropdownlist").kendoDropDownList({
    dataTextField:"ProductName",
    dataValueField:"ID",
    height: "400px",
    dataSource: data,
    filter:"contains"
  });
</script>
```

## Next Steps 

* [Referencing Existing Widget Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/index)

## See Also 

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
* [Knowledge Base Section](/knowledge-base)