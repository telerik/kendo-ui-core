---
title: Tab Navigation for Filter Menu Date Pickers
description: How to Achieve Tab Navigation for Filter Menu Date Pickers
type: how-to
page_title: How to Achieve Tab Navigation for Filter Menu Date Pickers | Kendo UI Grid for jQuery
slug: grid-tab-navigation-for-pickers
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
			<td>Grid, DatePicker for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

This sample demonstrates how to achieve keyboard navigation with Tab press for Date Picker widgets located inside the Filter Menu of the Grid.

## Solution

```dojo
  
    <div id="example">
      <div id="grid"></div>
      <script>
        $(document).ready(function() {
          $("#grid").kendoGrid({
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
            },
            height: 550,
            filterMenuInit: gridFilterInit,
            filterable: true,
            pageable: true,
            columns: 
            [{
              field: "OrderID",
              width: 225,
              filterable: {
                cell: {
                  showOperators: false
                }
              }
            },{
              field: "OrderDate",
              width: 255,
              title: "Order Date",
              format: "{0:MM/dd/yyyy}"
            },
             {
               field: "ShipName",
               width: 500,
               title: "Ship Name",
               filterable: {
                 cell: {
                   operator: "contains",
                   suggestionOperator: "contains"
                 }
               }
             },{
               field: "Freight",
               width: 255,
               filterable: {
                 cell: {
                   operator: "gte"
                 }
               }
             }]
          });
        });

        function gridFilterInit(e){
          $(e.container).find("input[data-role='datepicker']").each(function(i,e){
            var pickerEl = $(this);
            pickerEl.attr("tabindex",(i+1)*2);
            pickerEl.next("span[role='button']").attr("tabindex",(i+1)*2+1).on("keypress",function(e){
              if(e.key == "Enter"){
                pickerEl.data().kendoDatePicker.open();
              }
            });
          });
        }
      </script>
    </div>

``` 
