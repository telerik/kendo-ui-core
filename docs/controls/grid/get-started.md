---
title: Getting Started
page_title: jQuery Grid Documentation - Getting Started with the Grid
description: "Get started with the jQuery Grid by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_grid_widget
position: 1
---

# Getting Started with the Grid

This guide demonstrates how to get up and running with the Kendo UI for jQuery Grid.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="my-grid"></div>

    <script>
      let myDataArray = [
        {ID: 1, Name: "Tom", Date: "10/15/2022"},
        {ID: 2, Name: "John", Date: "11/25/2022"},
        {ID: 3, Name: "Annie", Date: "05/09/2022"},
        {ID: 4, Name: "Rachel", Date: "08/06/2022"},
        {ID: 5, Name: "Klemens", Date: "10/07/2022"},
        {ID: 6, Name: "Micah", Date: "05/19/2022"},
        {ID: 7, Name: "Junie", Date: "04/04/2022"},
        {ID: 8, Name: "Krishnah", Date: "07/19/2022"},
        {ID: 9, Name: "Enrichetta", Date: "01/11/2022"},
        {ID: 10, Name: "Marten", Date: "02/13/2022"},
        {ID: 11, Name: "Rosmunda", Date: "08/15/2022"},
      ];

      // Target the div element by using jQuery and then call the kendoGrid() method.
      $("#my-grid").kendoGrid({
        height: "400px",
        columns: [
          // The field matches the ID property in the data array.
          { field: "ID", title: "Personal Id", width: "70px" },
          { field: "Name", title: "First Name", width: "150px" },
          { field: "Date", title: "Hire Date", width: "200px", format: "{0:dd-MM-yyyy}" }
        ],
        toolbar: ["create", "save"],
        // Enable the filtering functionality.
        filterable: true,
        // Enable the editing functionality (incell by default).
        editable: true,
        dataSource: {
          data: myDataArray,
          schema: {
            model: {
              id: "ID", // The ID field is a unique identifier that allows the dataSource to distinguish different elements.
              fields: {
                ID: { type: "number", editable: false }, // The ID field in this case is a number. Additionally, do not allow users to edit this field.
                Name: { type: "string" },
                Date: { type: "date" }
              }
            }
          }
        }
      });
    </script>
```

## 1. Create an Empty Div Element

First, create an empty `<div>` element on the page that will serve as the main container of the Grid component.

```html
<div id="my-grid"></div>
```

## 2. Initialize the Grid

In this step, you will initialize the Grid from the empty `<div>` element. When you initialize the component from an empty `div`, all settings of the Grid will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

For more information about the alternative initialization approach, refer to the article on [initializing the Grid from an HTML table]({% slug html_table_kendoui_grid_widget %}).

```html
<div id="my-grid"></div>

<script>
    // Target the div element by using jQuery and then call the kendoGrid() method.
    $("#my-grid").kendoGrid({
        // Add some basic configurations such as width and height.
        width: "700px",
        height: "400px"
    });
</script>
```

## 3. Bind the Grid to Data

Once the basic initialization is completed, you can start adding additional configurations to the Grid. The first and most important configuration is the [`dataSource`]({% slug overview_kendoui_datasourcecomponent %}).

```html
<div id="my-grid"></div>

<script>
  let myDataArray = [
    {ID: 1, Name: "Tom", Date: "10/15/2022"},
    {ID: 2, Name: "John", Date: "11/25/2022"},
    {ID: 3, Name: "Annie", Date: "05/09/2022"},
    {ID: 4, Name: "Rachel", Date: "08/06/2022"},
    {ID: 5, Name: "Klemens", Date: "10/07/2022"},
    {ID: 6, Name: "Micah", Date: "05/19/2022"},
    {ID: 7, Name: "Junie", Date: "04/04/2022"},
    {ID: 8, Name: "Krishnah", Date: "07/19/2022"},
    {ID: 9, Name: "Enrichetta", Date: "01/11/2022"},
    {ID: 10, Name: "Marten", Date: "02/13/2022"},
    {ID: 11, Name: "Rosmunda", Date: "08/15/2022"},
  ];

  // Target the div element by using jQuery and then call the kendoGrid() method.
  $("#my-grid").kendoGrid({
    width: "700px",
    height: "400px",
    dataSource: {
      data: myDataArray,
      schema: {
        model: {
          id: "ID", // The ID field is a unique identifier that allows the dataSource to distinguish different elements.
          fields: {
            ID: { type: "number", editable: false }, // The ID field in this case is a number. Additionally, do not allow users to edit this field.
            Name: { type: "string", editable: false },
            Date: { type: "date", editable: false }
          }
        }
      }
    }
  });
</script>
```

## 4. Configure the Grid Columns

The Grid allows you to configure each individual column and apply a set of [column properties](/api/javascript/ui/grid/configuration/columns#related-properties).

```html
<div id="my-grid"></div>

<script>
  let myDataArray = [
    {ID: 1, Name: "Tom", Date: "10/15/2022"},
    {ID: 2, Name: "John", Date: "11/25/2022"},
    {ID: 3, Name: "Annie", Date: "05/09/2022"},
    {ID: 4, Name: "Rachel", Date: "08/06/2022"},
    {ID: 5, Name: "Klemens", Date: "10/07/2022"},
    {ID: 6, Name: "Micah", Date: "05/19/2022"},
    {ID: 7, Name: "Junie", Date: "04/04/2022"},
    {ID: 8, Name: "Krishnah", Date: "07/19/2022"},
    {ID: 9, Name: "Enrichetta", Date: "01/11/2022"},
    {ID: 10, Name: "Marten", Date: "02/13/2022"},
    {ID: 11, Name: "Rosmunda", Date: "08/15/2022"},
  ];

  $("#my-grid").kendoGrid({
    width: "700px",
    height: "400px"
    // The columns configuration is an array of objects.
    columns: [
        // The field matches the ID property in the data array.
        { field: "ID", title: "Personal Id", width: "70px" },
        { field: "Name", title: "First Name", width: "150px" },
        { field: "Date", title: "Hire Date", width: "200px", format: "{0:dd-MM-yyyy}" }
    ],
    dataSource: {
      data: myDataArray,
      schema: {
        model: {
          id: "ID",
          fields: {
            ID: { type: "number", editable: false },
            Name: { type: "string", editable: false },
            Date: { type: "date", editable: false }
          }
        }
      }
    }
  });
</script>
```

## 5. Add Editing and Filtering

Among other functionalities, the Grid supports editing and filtering. The [editing]({% slug editing_kendoui_grid_widget %}) configuration allows users to edit individual Grid cells. The [filtering]({% slug filtering_kendoui_grid_widget %}) configuration allows users to filter the data inside the Grid.

```html
<div id="my-grid"></div>

<script>
  let myDataArray = [
    {ID: 1, Name: "Tom", Date: "10/15/2022"},
    {ID: 2, Name: "John", Date: "11/25/2022"},
    {ID: 3, Name: "Annie", Date: "05/09/2022"},
    {ID: 4, Name: "Rachel", Date: "08/06/2022"},
    {ID: 5, Name: "Klemens", Date: "10/07/2022"},
    {ID: 6, Name: "Micah", Date: "05/19/2022"},
    {ID: 7, Name: "Junie", Date: "04/04/2022"},
    {ID: 8, Name: "Krishnah", Date: "07/19/2022"},
    {ID: 9, Name: "Enrichetta", Date: "01/11/2022"},
    {ID: 10, Name: "Marten", Date: "02/13/2022"},
    {ID: 11, Name: "Rosmunda", Date: "08/15/2022"},
  ];

  $("#my-grid").kendoGrid({
    width: "700px",
    height: "400px"
    // Add toolbar buttons for creating and saving buttons.
    toolbar: ["create", "save"],
    // Enable the filtering functionality.
    filterable: true,
    // Enable the editing functionality (incell by default).
    editable: true,
    // The columns configuration is an array of objects.
    columns: [
        // The field matches the ID property in the data array.
        { field: "ID", title: "Personal Id", width: "70px" },
        { field: "Name", title: "First Name", width: "150px" },
        { field: "Date", title: "Hire Date", width: "200px", format: "{0:dd-MM-yyyy}" }
    ],
    dataSource: {
      data: myDataArray,
      schema: {
        model: {
          id: "ID",
          fields: {
            ID: { type: "number", editable: false },
            Name: { type: "string", editable: false },
            Date: { type: "date", editable: false }
          }
        }
      }
    }
  });
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery Data Grid](https://demos.telerik.com/kendo-ui/grid/index)

## See Also

* [JavaScript API Reference of the jQuery Grid](/api/javascript/ui/grid)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
