---
title: Grid Search and Highlight Rows
page_title: Search and Highlight Rows in the Grid
description: "An example showcasing how to search and highlight rows in the Kendo UI Grid."
type: how-to
slug: grid-search-highlight-rows
tags: telerik, kendoui, kendo, grid, search, highlight, row
res_type: kb
ticketid: 1446645
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
  <td>Created with version</td>
  <td>2022.2.510</td>
 </tr>
</table>

## Description

I want to use a search input to find data on the current page of the Grid. I also want to:
 * Highlight the rows that match the search criteria.
 * Select which columns can be searched.

## Solution

The search will work only with string values. Numbers and dates will also be treated as strings when a value is typed in the searchbox.

1. Create a Grid [`toolbar.template`](/api/javascript/ui/grid/configuration/toolbar.template) with a search input and an icon for the column menu.
1. Create a `div` element for the column menu. The purpose of the column menu is to allow the user to select which columns can be searched.
1. Initialize the Grid.
1. Attach an event handler to the [`dataBound`](/api/javascript/ui/grid/events/databound) event of the Grid.
1. Inside the dataBound event, attach an [`input`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event) event handler to the searchbox and initialize a [`kendo.ui.Popup`](/api/javascript/ui/popup) for the column menu.
1. In the input event of the search box, get all the columns that are selected in the column menu (all by default).
1. Iterate over the data of the Grid, and find any cell values that match the input in the search box. The search behavior is treated as `contains`.
1. Iterate over the found items and highlight them with CSS.

```dojo
     <script type='x-kendo/template' id='toolbar'>
    	<label>Search:</label>
    	<span class="k-input k-textbox k-input-solid k-input-md k-rounded-md">
      <input data-role="textbox" aria-disabled="false" class="search k-input-inner" style='height: 28px;'/>
      </span>
      <span class="search-columns-icon k-icon k-i-gear"></span>
    </script>

    <div id="grid"></div>

    <div class="search-columns-menu">
      <ul class="search-columns-list">
      </ul>
    </div>

    <script>
      $(document).ready(function () {
        $("#grid").kendoGrid({
          toolbar: $("#toolbar").html(),
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            },
            schema: {
              model: {
                fields: {
                  OrderID: { type: "number" },
                  Freight: { type: "number" },
                  ShipName: { type: "string" },
                  OrderDate: { type: "date" },
                  ShipCity: { type: "string" }
                }
              }
            },
            pageSize: 20,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
            filter: [{field: "Freight", operator: "gte", value: 32}]
          },
          filterable: true,
          pageable: true,
          height: 550,
          sortable: {
            mode: "mixed",
            allowUnsort: true,
            showIndexes: true
          },
          search: {
            fields: [
              { name: "OrderID", operator: "eq" },
              { name: "Freight", operator: "gte" },
              { name: "ShipName", operator: "contains" },
              { name: "ShipCity", operator: "contains" },
            ]
          },
          columns: [
            {
              field: "OrderID",
              title: "Order ID",
            },
            "Freight",
            {
              field: "OrderDate",
              title: "Order Date",
              format: "{0:MM/dd/yyyy}"
            }, {
              field: "ShipName",
              title: "Ship Name"
            }, {
              field: "ShipCity",
              title: "Ship City"
            }
          ]
        });

        // Execute the dataBound event once when the Grid loads.
        $("#grid").data("kendoGrid").one("dataBound", onGridBound);

        function onGridBound() {
          let grid = this;

          // Bind the input event to the search box in the toolbar.
          grid.element.find(".search").on("input", search);
          
          // Append a title to the popup.
          $(".search-columns-menu").prepend("<h5 class='search-columns-title'>Columns to search</h5>");
          
          // Initialize a popup for the columns.
          let popup = $(".search-columns-menu").kendoPopup({
            anchor: $(".search-columns-icon"),
          }).data("kendoPopup");

          popup.one("activate", activate);

          // The first time the popup is displayed, populate it with the checkboxes.
          function activate(e) {
            let list = grid.columns.map(c => {
              return "<li><input checked type='checkbox' class='search-checkbox k-checkbox'/>"+c.field+"</li>";
            });

            this.element.find(".search-columns-list").html(list);
            this.element.find(".search-checkbox").on("change", onCheck);
            
            function onCheck() {
              // When a checkbox is checked/unchecked, trigger the input event of the search box in order to update the found results.
              grid.element.find(".search").trigger("input");
            }
          }

          // When the gear icon is clicked, display the popup.
          $(".search-columns-icon").on("click", function (){
            popup.open();
          });
        }

        function search() {
          let grid = $("#grid").data("kendoGrid"),
              defaultFields = grid.columns.map(c => c.field),
              value = $(this).val(),
              searchData = grid.dataSource.data(),
              searchListElements = $(".search-columns-list li");

          // By default all columns will be searched. Once the popup is opened for the first time, the checked columns will be used instead.
          let searchFields = searchListElements.length ? getCheckedColumns(searchListElements) : defaultFields;

          $(".highlighted").removeClass("highlighted");

          let foundItems = searchData.reduce((result, item) => {
            for(let i=0; i<searchFields.length; i++) {
              let field = searchFields[i];
              let fieldValue = item[field];

              // Change the format of the date so it matches the one in the Date column.
              if(fieldValue instanceof Date) {
                fieldValue = kendo.toString(fieldValue, "MM/dd/yyyy");
              }

              if(value.length > 0 && fieldValue.toString().toLowerCase().indexOf(value.toLowerCase()) > - 1) {
                result.push(item);
              }
            }
            return result;
          }, []);

          foundItems.forEach((item) => {
            let row = grid.element.find("[data-uid='"+item.uid+"']");
            // Highlight the found rows.
            row.addClass("highlighted");
          });
        }

        function getCheckedColumns(searchListElements) {
          let searchFields = [];

          for(let i=0; i<searchListElements.length; i++) {
            let element = $(searchListElements[i]);
            let checked = element.find("input:checked").length;

            if(checked) {
              searchFields.push(element.text()); 
            }
          }

          return searchFields;
        }
      });
    </script>

    <style>
      .highlighted {
        background-color: #0071bc;
        color: #ffffff;
      }

      .search-columns-menu {
        font-family: Arial !important;
        width: 150px;
      }

      .search-columns-list {
        list-style: none;
        padding-left: 5px;
      }

      .search-columns-title {
        text-align: center;
      }

      .search-columns-list li {
        padding-bottom: 10px;
      }
    </style>
```