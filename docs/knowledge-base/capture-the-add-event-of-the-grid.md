---
title: Capture the Event for Adding New Rows
page_title: Capture the add Event | Kendo UI Grid for jQuery
description: An example on how to capture the add event of the Kendo UI Grid.
type: how-to
slug: how-to-capture-the-add-event-of-the-grid
previous_url: /knowledge-base/how-to-capture-the-add-event-of-the-grid
tags: add, event, grid
ticketid: 1097353
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>56</td>
 </tr>
  <tr>
  <td>Made with version</td>
  <td>2020.3.1021</td>
 </tr>
</table>

## Description

I have a Kendo UI Grid which displays an **Add New Row** button in its toolbar.

How can I capture the `add` event behind the button functionality and be able to insert own values in a field&mdash;for example, date and time?

## Solution

The Kendo UI Grid does not provide a built-in solution for capturing its `add` event when the user clicks the button. However, you can work around this issue by using jQuery.

Attach an event handler for the **Add New Row** button to the `dataBound` event of the Grid by using its `k-grid-add` class.

```dojo
      <div id="example">
      <div id="grid"></div>

       <script>
        $(document).ready(function () {
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
              dataSource = new kendo.data.DataSource({
                transport: {
                  read:  {
                    url: crudServiceBaseUrl + "/Products",
                    dataType: "jsonp"
                  },
                  update: {
                    url: crudServiceBaseUrl + "/Products/Update",
                    dataType: "jsonp"
                  },
                  destroy: {
                    url: crudServiceBaseUrl + "/Products/Destroy",
                    dataType: "jsonp"
                  },
                  create: {
                    url: crudServiceBaseUrl + "/Products/Create",
                    dataType: "jsonp"
                  },
                  parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                      return {models: kendo.stringify(options.models)};
                    }
                  }
                },
                batch: true,
                pageSize: 20,
                schema: {
                  model: {
                    id: "ProductID",
                    fields: {
                      ProductID: { editable: false, nullable: true },
                      ProductName: { validation: { required: true } },
                      UnitPrice: { type: "number", validation: { required: true, min: 1} },
                      Discontinued: { type: "boolean" },
                      UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                  }
                }
              });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            navigatable: true,
            dataBound:function(e){
              $('.k-grid-add').unbind("click");

              $('.k-grid-add').bind("click", function(){
                console.log("Handle the add button click")
              });
            },
            pageable: true,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
              { field: "UnitsInStock", title: "Units In Stock", width: 120 },
              { field: "Discontinued", width: 120 },
              { command: "destroy", title: "&nbsp;", width: 150 }],
            editable: true
          });
        });
      </script>
    </div>
```
