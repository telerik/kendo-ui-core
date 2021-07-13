---
title: Add Records from External Form
description: How to Add Items from External Form
type: how-to
page_title: How to Add Items from External Form | Kendo UI Grid for jQuery
slug: grid-add-records-from-external-form
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
			<td>Grid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

This sample demonstrates how you add a new record using an external input element.

## Solution

```dojo
  
      <button id="openBtn">Open</button>

      <div id="tabstrip">
        <ul>
          <li id="tab1">Grid</li>
          <li id="tab2">Add New</li>
        </ul>
        <div><div id="grid"></div></div>
        <div>Add new record<br/>
          <input id='newName'/>
          <button onclick='addNew();'>Submit</button>
        </div>
      </div>

      <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
      <script>
        var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");

        var grid = $("#grid").kendoGrid({
          dataSource: {
            data: products,
            pageSize: 5
          },
          height: 200,
          editable: true,
          pageable: true,
          scrollable: true,
          columns: [
            "ProductName",
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px" },
            { field: "UnitsInStock", title: "Units In Stock", width: "130px" },
            { field: "Discontinued", width: "130px" }
          ]
        }).data("kendoGrid");

        //apply the activate event, which is thrown only after the animation is played out
        tabstrip.one("activate", function() {
          grid.resize();
        });

        $("#openBtn").click(function(e) {
          tabstrip.activateTab($("#tab1"));
        });
        function addNew(){
          var dataSource = $("#grid").data().kendoGrid.dataSource;
          dataSource.add({ ProductName: $("#newName").val(), UnitPrice: 1,UnitsInStock: 3 });
          tabstrip.activateTab($("#tab1"));

          var items = dataSource.data().length;
          var pageSize = dataSource.pageSize();
          var pageNum = parseInt(items / pageSize) + 1;

          dataSource.page(pageNum);
        }
      </script>
      
``` 
