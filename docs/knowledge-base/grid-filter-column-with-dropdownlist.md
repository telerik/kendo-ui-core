---
title: Filter Column With DropDownList
description: An example on how to filter column with complex objects
type: how-to
page_title: Filter Column With Complex Objects
slug: grid-filter-column-with-dropdownlist
position: 
tags: grid, filter, dropdownlist
ticketid: 1144229
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>


## Description

How to filter a column with a DropDown editor when it is bound to a complex object?

## Solution

This could be achieved by programmatically applying the filters on the [filter](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/filter) event of the Grid. It will also require to programmatically clear the filters for that column when the clear button is clicked.

Please check the following example demonstrating this:

````html
   <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
    <div id="example">
      <div id="grid"></div>

      <script>

        $(document).ready(function () {
          var dataSource = new kendo.data.DataSource({
            pageSize: 20,
            data: products,
            autoSync: true,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true } },
                  Category: { defaultValue: { CategoryID: 1, CategoryName: "Beverages"} },
                  UnitPrice: { type: "number", validation: { required: true, min: 1} }
                }
              }
            }
          });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            filterMenuInit:function(e){
              if(e.field === "Category"){
                $(e.container).find('[type="reset"]').click(function(event){
                  var filters = e.sender.dataSource.filter().filters
                  for (let i = 0; i <= filters.length; i++){
                    if (filters[i].field == "Category.CategoryName"){
                      filters.splice(i, 1);
                      e.sender.dataSource.filter(filters)
                    }
                  }
                })
              }
            },
            pageable: true,
            filterable:true,
            filter:function(e){
              if(e.field == "Category" && e.filter !== null){
                var currentFilter = []
                var filtersCount = e.filter.filters[0].length
                var value = e.filter.filters[0].value
                if(e.sender.dataSource.filter() !== undefined){
                  currentFilter = e.sender.dataSource.filter().filters // Retain the other filters
                }
                currentFilter.push({field:"Category.CategoryName", operatot:"eq", value:value})
                e.preventDefault()
                e.sender.dataSource.filter(currentFilter)
              }
            },
            height: 550,
            toolbar: ["create"],
            columns: [
              { field:"ProductName",title:"Product Name" },
              { field: "Category", title: "Category", width: "180px", editor: categoryDropDownEditor, template: "#=Category.CategoryName#" },
              { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "130px" },
              { command: "destroy", title: " ", width: "150px" }],
            editable: true
          });
        });

        function categoryDropDownEditor(container, options) {
          $('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
            autoBind: false,
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
              }
            }
          });
        }

      </script>
    </div>   <script src="../content/shared/js/products.js"></script>
    <div id="example">
      <div id="grid"></div>

      <script>

        $(document).ready(function () {
          var dataSource = new kendo.data.DataSource({
            pageSize: 20,
            data: products,
            autoSync: true,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true } },
                  Category: { defaultValue: { CategoryID: 1, CategoryName: "Beverages"} },
                  UnitPrice: { type: "number", validation: { required: true, min: 1} }
                }
              }
            }
          });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            filterMenuInit:function(e){
              if(e.field === "Category"){
                $(e.container).find('[type="reset"]').click(function(event){
                  var filters = e.sender.dataSource.filter().filters
                  for (let i = 0; i <= filters.length; i++){
                    if (filters[i].field == "Category.CategoryName"){
                      filters.splice(i, 1);
                      e.sender.dataSource.filter(filters)
                    }
                  }
                })
              }
            },
            pageable: true,
            filterable:true,
            filter:function(e){
              if(e.field == "Category" && e.filter !== null){
                var currentFilter = []
                var filtersCount = e.filter.filters[0].length
                var value = e.filter.filters[0].value
                if(e.sender.dataSource.filter() !== undefined){
                  currentFilter = e.sender.dataSource.filter().filters // Retain the other filters
                }
                currentFilter.push({field:"Category.CategoryName", operatot:"eq", value:value})
                e.preventDefault()
                e.sender.dataSource.filter(currentFilter)
              }
            },
            height: 550,
            toolbar: ["create"],
            columns: [
              { field:"ProductName",title:"Product Name" },
              { field: "Category", title: "Category", width: "180px", editor: categoryDropDownEditor, template: "#=Category.CategoryName#" },
              { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "130px" },
              { command: "destroy", title: " ", width: "150px" }],
            editable: true
          });
        });

        function categoryDropDownEditor(container, options) {
          $('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
            autoBind: false,
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
              }
            }
          });
        }

      </script>
    </div>
````

