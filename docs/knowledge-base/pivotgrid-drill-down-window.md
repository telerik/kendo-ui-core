---
title: PivotGrid Drill Down Window
description: How to Implement Drill Down Navigation
type: how-to
page_title: How to Implement Drill Down Functionality | Kendo UI PivotGrid for jQuery
slug: pivotgrid-drill-down-window
position: 
tags: 
ticketid: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>PivotGrid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

This sample demonstrates how to implement a Drill Down Window for the PivotGrid, which will display additional details for a given cell.

## Solution

The key part is creating a secondary **drillDownDataSource**, which will request and hold only a subset of the data related to the clicked cell. This is achieved using multiple [filters](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/filter#filterfilters).

```dojo
   <style>
      #pivotgrid {
        display: inline-block;
        vertical-align: top;
      }
      .k-fieldselector{
        display: none !important;
      }
      .dataCell,
      .totalCell{
        text-decoration: underline !important;
        color: initial !important;
      }
    </style>

    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <div class='drill-down-container'></div>

    <div id="example">
      <div class="hidden-on-narrow" id="configurator"></div>
      <div class="hidden-on-narrow" id="pivotgrid"></div>

      <div class="responsive-message"></div>

      <script>
        $(document).ready(function () {
          var pivotgrid = $("#pivotgrid").kendoPivotGrid({
            filterable: true,
            sortable: true,
            columnWidth: 120,
            height: 350,
            dataCellTemplate: $("#dataCellTemplate").html(),
            dataSource: {
              data: products,
              schema: {
                model: {
                  fields: {
                    ProductName: { type: "string" },
                    UnitPrice: { type: "number" },
                    UnitsInStock: { type: "number" },
                    Discontinued: { type: "boolean" },
                    CategoryName: { field: "Category.CategoryName" }
                  }
                },
                cube: {
                  dimensions: {
                    ProductName: { caption: "All Products" },
                    CategoryName: { caption: "All Categories" },
                    Discontinued: { caption: "Discontinued" }
                  },
                  measures: {
                    "Sum": { field: "UnitPrice", format: "{0:c}", aggregate: "sum" },
                    "Average": { field: "UnitPrice", format: "{0:c}", aggregate: "average" }
                  }
                }
              },
              columns: [{ name: "CategoryName", expand: true }, { name: "ProductName" } ],
              rows: [{ name: "Discontinued", expand: true }],
              measures: ["Sum"]
            }
          }).data("kendoPivotGrid");
        });

        var dataSource;

        function showDrillDown(link, event){
          var pivot = $("#pivotgrid").data().kendoPivotGrid;
          dataSource = pivot.dataSource;
          var cell = link.parentElement;
          var cellInfo = pivot.cellInfoByElement(cell);
          var rowMembers = cellInfo.rowTuple.members;
          var columnMembers = cellInfo.columnTuple.members;
          var filterDetails = { logic: "and", filters: [] };

          for (var i = rowMembers.length - 1; i >= 0; i--) {
            var rowLevelInfo = rowMembers[i];
            var fieldName = rowLevelInfo.parentName;

            if(fieldName)
            {
              var value = parseValue(fieldName, rowLevelInfo.caption);
              filterDetails.filters.push({ field: fieldName, operator: "eq", value: value });
            }
          }

          for (var i = columnMembers.length - 1; i >= 0; i--) {
            var columnLevelInfo = columnMembers[i];
            var fieldName = columnLevelInfo.parentName;

            if(fieldName)
            {
              var value = parseValue(fieldName, columnLevelInfo.name.replace(fieldName + "&",""));

              filterDetails.filters.push({ field: fieldName, operator: "eq", value: value });
            }
          }

          var drillDownDataSource = new kendo.data.DataSource({
            data: dataSource._pristineData,
            schema: dataSource.schema,
            filter: filterDetails
          });

          showWindow(drillDownDataSource);
        }

        function showWindow(drillDownDataSource){
          var container = $(".drill-down-container");
          container.append("<div class='drill-down-window'><div id='grid'></div></div>");

          var window = container.find(".drill-down-window").kendoWindow({
            width: "600px",
            title: "Drill Down Details",
            close: onClose,
            scrollable: true,
            open: function (e) {
              $("html, body").css("overflow", "hidden");
            },
            modal: {
              preventScroll: true
            },
          }).data().kendoWindow;

          var gridColumns = [];
          var fields = dataSource.options.schema.model.fields;

          for (var fieldName in fields) {
            gridColumns.push({field: fieldName, type: fields[fieldName]});
          }

          var grid = window.element.find("#grid").kendoGrid({
            dataSource: drillDownDataSource,
            columns: gridColumns,
            scrollable: true,
            height: 200
          }).data().kendoGrid;

          window.center();
        }
        function onClose(e){
          setTimeout(function(){
            e.sender.destroy();
            $(".drill-down-container").empty();
          }, 250);
        }
        function parseValue(fieldName, value){
          var type = dataSource.options.schema.model.fields[fieldName].type;

          if(value && value != '')
          {
            if(type == "number") {
              return parseFloat(value);
            } 
            else if(type == "boolean")
            {
              return (value == 'true');
            }
            else if(type == "string"){
              var parsedDate = kendo.parseDate(value);
              if (parsedDate) {
                return parsedDate;
              }
            }
          }
          return value;
        }

      </script>
      <script id="dataCellTemplate" type="text/x-kendo-tmpl">
                # var columnMember = columnTuple ? columnTuple.members[0] : { children: [] }; #
                # var rowMember = rowTuple ? rowTuple.members[0] : { children: [] }; #
                # var value = kendo.toString(kendo.parseFloat(dataItem.value) || "N/A", "c2"); #

                # if (rowMember.children.length) { #
                    <a class='dataCell' href="javascript:void(0);" onclick='showDrillDown(this);'>#: value # (total)</em>
                     # } else if(columnMember.children.length){ #
                      <a class='dataCell' href="javascript:void(0);" onclick='showDrillDown(this);'>#: value # (total)</em>
                # } else { #
                     <a class='totalCell' href="javascript:void(0);" onclick='showDrillDown(this); return false;'>#: value #</em>
                # } #
      </script>
    </div>
``` 
