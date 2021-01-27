---
title: Grid Search and Pager on the Top
description: An example on how to have the search panel and the pager in a single row at the top of the Kendo UI Grid.
type: how-to
page_title: Combine Search and Pager in the Grid | Kendo UI Grid for jQuery
slug: grid-search-and-pager-in-a-single-row
tags: kendoui, kendo, grid, search, panel, pager, combine, single, one, same, row
res_type: kb
ticketid: 1501208
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
  <td>Created with version</td>
  <td>2020.3.1118</td>
 </tr>
</table>

## Description

I had a request to combine the paging bar and search bar into a single div/row. Can we define an HTML template for the pager like we can for the search? Do you think combining the pager and search box in a single row is even possible? 

## Solution

Indeed, there is no pager template and the toolbar and pager are separate divs (siblings). I was able to achieve an outcome similar to the one you shared with us with the following steps:

1. Pager Settings
    - [`pageable.position`](/api/javascript/ui/grid/configuration/pageable.position) set to `top`
    - [`pageable.responsive`](/api/javascript/ui/grid/configuration/pageable.responsive) set to `false`
1. In the `document.ready` event, get the grid instance and use its `dataBound` event to wrap the pager and toolbar elements with another div. This will give us the chance to control them together in a container and reorder them.

    ```
        var grid = $("#grid").data("kendoGrid");
        grid.one("dataBound", function(e){
            $(".k-grid-toolbar, .k-grid-pager").wrapAll($("<div class='pager-toolbar-container'/>"))
        });
    ```
    ```
        <style>
            .pager-toolbar-container{
              display: flex;
              flex-direction: row;
            }
            .k-grid-toolbar{
              order: 1; 
              width: 35%;
            }
            .k-grid-pager{
              order: 2; 
              width: 65%;
              border-bottom-color:rgba(0, 0, 0, 0.08)
            }

            .k-grid .k-grid-search {
              width: auto;
            }
            </style>
    ```


```dojo
    <div id="example">
      <div id="grid"></div>

      <style>
        .pager-toolbar-container{
          display: flex;
          flex-direction: row;
        }
        .k-grid-toolbar{
          order: 1; 
          width: 35%;
        }
        .k-grid-pager{
          order: 2; 
          width: 65%;
          border-bottom-color:rgba(0, 0, 0, 0.08)
        }

        .k-grid .k-grid-search {
          width: auto;
        }
      </style>

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
                pageSize: 10,
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
            height: 400,
            filterable: true,
            pageable: {
              position: "top",
              pageSizes: true,
              info:false,
              buttonCount:4,
              responsive:false,
              messages: {
                itemsPerPage: "/page"
              }
            },
            toolbar: ["search"],
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
              { field: "UnitsInStock", title: "Units In Stock", width: 120 },
              { field: "Discontinued", width: 120 },
              { command: "destroy", title: "&nbsp;", width: 150 }],
            editable: true
          });

          var grid = $("#grid").data("kendoGrid");
          grid.one("dataBound", function(e){
            $(".k-grid-toolbar, .k-grid-pager").wrapAll($("<div class='pager-toolbar-container'/>"))
          })
        });

      </script>
    </div>
```
