---
title: Always visible select all checkbox
description: The Grid should always show the select all checkbox when filtering with the multi filter checkbox. 
type: how-to
page_title: Grid select all should always be visible when filtering | Kendo UI Grid
slug: grid-keep-the-select-all-checkbox-when-filtering
tags: grid, selctall, multi, filter, show, check, checkbox
ticketid: 1498839
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
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
</table>


## Description

The search all checkbox disappears when a filter is applied in the FilterMultiCheck menu.

## Cause

Currently, there is no built-in way in which we can keep the  'Select All' checkbox. You will need to override some Kendo internal functions that will help keep the select all checkbox visible and its state updated accordingly. We have a logged Feature request for this behaviour to be built-in, so you can upvote it in our [Feedback Portal](https://feedback.telerik.com/kendo-jquery-ui/1498839-keep-the-select-all-option-when-filtering)

## Solution

Override the `checkAll` function and the `updateCheckAllState` function before the grid is initialized.  

```
    kendo.ui.FilterMultiCheck.fn.checkAll = function(){
            var state = this.checkBoxAll.is(":checked");
            this.container.find(":checkbox:visible").prop("checked", state);
    }

    kendo.ui.FilterMultiCheck.fn.updateCheckAllState =  function() {
        if (this.options.messages.selectedItemsFormat) {
            this.form.find(".k-filter-selected-items").text(kendo.format(this.options.messages.selectedItemsFormat, this.container.find(":checked:not(.k-check-all)").length));
        }

        if (this.checkBoxAll) {
            var state = this.container.find(":checkbox:not(.k-check-all):visible").length == this.container.find(":checked:not(.k-check-all):visible").length && this.container.find(":checkbox:not(.k-check-all):visible").length !==0;
            this.checkBoxAll.prop("checked", state);
        }
    }
```

And add the styles

```
     <style>
      .k-multicheck-wrap .k-item:first-child {
        display:inline-block !important;
      }
        .k-multicheck-wrap {
          overflow-x: hidden;
        }
    </style>
```

```dojo
    <style>
      .k-multicheck-wrap .k-item:first-child {
        display:inline-block !important;
      }
    </style>
    <div id="example">
      <style>
        .k-multicheck-wrap {
          overflow-x: hidden;
        }
      </style>
      <div class="demo-section k-content wide">
        <h4>Client Operations</h4>
        <div id="client"></div>
      </div>
      <script>
        $(document).ready(function() {

          kendo.ui.FilterMultiCheck.fn.checkAll = function(){
            var state = this.checkBoxAll.is(":checked");
            this.container.find(":checkbox:visible").prop("checked", state);
          }

          kendo.ui.FilterMultiCheck.fn.updateCheckAllState =  function() {
            if (this.options.messages.selectedItemsFormat) {
              this.form.find(".k-filter-selected-items").text(kendo.format(this.options.messages.selectedItemsFormat, this.container.find(":checked:not(.k-check-all)").length));
            }
            if (this.checkBoxAll) {
              var state = this.container.find(":checkbox:not(.k-check-all):visible").length == this.container.find(":checked:not(.k-check-all):visible").length && this.container.find(":checkbox:not(.k-check-all):visible").length !==0;
              this.checkBoxAll.prop("checked", state);
            }
          }


          var telerikWebServiceBase = "https://demos.telerik.com/kendo-ui/service/";

          $("#client").kendoGrid({
            dataSource: {
              transport: {
                read:  {
                  url: telerikWebServiceBase + "/Products",
                  dataType: "jsonp"
                },
                update: {
                  url: telerikWebServiceBase + "/Products/Update",
                  dataType: "jsonp"
                },
                destroy: {
                  url: telerikWebServiceBase + "/Products/Destroy",
                  dataType: "jsonp"
                },
                create: {
                  url: telerikWebServiceBase + "/Products/Create",
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
            },
            filterable: true,
            pageable: true,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
              { field: "ProductName", filterable: { multi: true, search: true} },
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120, filterable: false },
              { field: "UnitsInStock", title: "Units In Stock", width: 120, filterable: false },
              { field: "Discontinued", width: 120, filterable: false},
              { command: "destroy", title: "&nbsp;", width: 150}],
            editable: true,
            filterMenuInit: function(e){
              var filterMultiCheck = this.thead.find("[data-field=" + e.field + "]").data("kendoFilterMultiCheck");
              filterMultiCheck.searchTextBox.on('keydown', function(ev){
                setTimeout(function(){
                  filterMultiCheck.updateCheckAllState();
                },300);                
              });
            }
          });
        });
      </script>
    </div>
```
