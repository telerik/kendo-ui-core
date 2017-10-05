---
title: How do I capture the add new row event?
description: An example on how to capture the add event of the Grid
type: how-to
page_title: How to Capture the Add Event of the Grid
slug: how-to-capture-the-add-event-of-the-grid
position:
tags: add, event, grid
ticketid: 1097353
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
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
  <td>2017.3.913</td>
 </tr>
</table>


## Description

I have enabled the add new row button in the toolbar, but I'd like to capture that event so that I can insert my own values (ie. current datetime) into one of the grid fields.

## Solution

Currently, the Kendo UI Grid does not support an event which is fired when the Add record button is clicked.

Still, I can suggest using jQuery to attach an event handler to the button using its class "k-grid-add". The event handler can be attached to the dataBound event of the Grid.

Please check the example demonstrating this:

````html
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
              $('.k-grid-add').click(function(){
                console.log("Handle the add button click")
              })
            },
            pageable: true,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
              { field: "UnitsInStock", title: "Units In Stock", width: 120 },
              { field: "Discontinued", width: 120, editor: customBoolEditor },
              { command: "destroy", title: "&nbsp;", width: 150 }],
            editable: true
          });
        });

        function customBoolEditor(container, options) {
          $('<input class="k-checkbox" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
          $('<label class="k-checkbox-label">​</label>').appendTo(container);
        }
      </script>
    </div>
````