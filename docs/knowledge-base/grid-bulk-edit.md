---
title: Use Bulk Editing in the Data Grid
page_title: Apply Bulk Editing to Empty Fields in the Data Grid - jQuery Data Grid
description: "Learn how to apply the bulk editing feature in the empty fields in the Kendo UI for jQuery Data Grid."
type: how-to
slug: grid-bulk-edit
tags: grid, edit, dialog, textarea, radiogroup, kendoui, jquery
ticketid: 1597711
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
</table>


## Description

I have a Grid with a custom button at its bottom. When I select one or more rows in the Data Grid, how can I fill in its empty cells by using a Dialog that contains RadioGroup components and a TextArea?

## Solution

To achieve the desired scenario, use the following implementation.  

```dojo
      <div id="grid"></div>
      <div id="bottom-toolbar"></div>
      <div id='dialog'>

        <div id='statusRow' >
          <div id='status'>STATUS</div>
          <div id='statusEditor'></div>
        </div>
        <div id='remarkRow' >
          <div id='remark'>REMARK</div>
          <div id='remarkEditorContainer'>
            <div id='remarkEditor'></div>
            <textarea  id='textarea'></textarea >
          </div>
        </div>
      </div>
      <script>
        $(document).ready(function () {
          var selectedDataItems = [];
          $("#textarea").kendoTextArea({
            size:"large"
          });
          $("#remarkEditor").kendoRadioGroup({
            items: ["Do not change (retain existing values)", "Change all to:"]
          })
          $("#statusEditor").kendoRadioGroup({
            items: ["Do not change (retain existing values)", "Change all to Open", "Change all to Rejected"],
            layout: "vertical"
          });
          $("#subGrid").kendoGrid({
            columns: [
              {field: "UserStatus", title: "Status"},
              { field: "UserRemark", title: "Remarks", width: 150 },
            ]
          })
          var dialog = $("#dialog").kendoDialog({
            width: 650,
            height:500,
            visible:false,
            actions: [{
              text: "OK",
              action: function(e){
                var statusValue = $("#statusEditor").data("kendoRadioGroup").value();
                var textAreaValue = $("#textarea").data("kendoTextArea").value();
                var remarkValue = $("#remarkEditor").data("kendoRadioGroup").value() === "Do not change (retain existing values)" ? "Do not change (retain existing values)" : textAreaValue ;

                selectedDataItems.forEach(function(element){
                  element.set("UserStatus", statusValue);
                  element.set("UserRemark", remarkValue);
                });
              },
              primary: true
            },{
              text: "Cancel"
            }]

          }).data("kendoDialog")
          $("#bottom-toolbar").kendoToolBar({
            items: [
              {
                type: "button",
                text: "Bulk Edit",
                enabled: false,
                click: function(e) {
                  // Logic for custom popup editing. First click on a row to select it.
                  let grid = $("#grid").data("kendoGrid"),
                      selected = grid.select(),
                      dataItem = grid.dataItem(selected);

                  if(!dataItem) {
                    kendo.alert("select a row first");
                    return;
                  }

                  dialog.open();

                }
              }
            ]
          });

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
                      SelectAll: { type: "boolean" },
                      ProductID: { editable: false, nullable: true },
                      ProductName: { validation: { required: true } },
                      UnitPrice: { type: "number", validation: { required: true, min: 1} },                      
                      UnitsInStock: { type: "number", validation: { min: 0, required: true } },
                      UserStatus: { defaultValue: "OPEN" },
                      UserRemark: { defaultValue: "" }
                    }
                  }
                }
              });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            navigatable: true,
            pageable: true,
            selectable: "multiple",
            change:function(){

              if(this.select().length > 0){
                // Enable button
                $("#bottom-toolbar>button").data("kendoButton").enable()
              }

              var selectedRows = this.select();

              for (var i = 0; i < selectedRows.length; i++) {
                var dataItem = this.dataItem(selectedRows[i]);
                selectedDataItems.push(dataItem);
              }
            },
            height: 550,
            toolbar: [
              "save",
              { name: "custom", text: "Custom Command" }
            ],
            columns: [
              { selectable:true },
              { field: "UserStatus", title: "Status", width: 80 },
              { field: "UserRemark", title: "Remarks", width: 150 },
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
              { field: "UnitsInStock", title: "Units In Stock", width: 120 },              
              { command: "destroy", title: "&nbsp;", width: 150 }],
            editable: true
          });
        });
      </script>
    <style>

    #statusRow, #remarkRow {
      position: relative;
      height: 50%;
      border: 1px solid;      
    }

    #status, #remark{
      width:40%;
      height:100%;
      background-color: rgb(211,211,211);
    }

    #statusEditor, #remarkEditor , .k-textarea {
      margin-top:15px;
      width: auto;
      left: 42% !important;
      position:absolute;
    }

    #statusEditor, #remarkEditor{
      top:0;
    }
    .k-textarea{
      top:30%;
    }
  </style>
```

## See Also

* [JavaScript API Reference of the Kendo UI for jQuery Data Grid](/api/javascript/ui/grid)
* [jQuery UI Data Grid Overview (Demo)](https://demos.telerik.com/kendo-ui/grid/index)
* [Data Grid Overview (Documentation)]({% slug overview_kendoui_grid_widget %})
