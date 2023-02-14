---
title: Filter a Column with a DropDownList Editor When the Column Is Bound To a Complex Object
description: Learn how to filter Kendo UI Grid columns with complex objects.
type: how-to
page_title: Filter Columns with Complex Objects - Kendo UI Grid for jQuery
slug: grid-filter-column-with-dropdownlist
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
		<td>Progress® Kendo UI® Grid for jQuery</td> 
	</tr>
</table>

## Description

How can I filter a column with a drop-down editor when the column is bound to a complex object?

## Solution

Programmatically apply the filters on the [`filter`](/api/javascript/ui/grid/events/filter) event of the Grid. This approach  also requires you to programmatically clear the filters for that column when the user clicks the **Clear** button.

```dojo
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
                  ProductName: { validation: { required: true },editable: false, defaultValue:"Default value" },
                  Category: { defaultValue: { CategoryID: 0, CategoryName: "Select Category..."}},
                  UnitPrice: { type: "number", validation: { required: true, min: 1}, editable: false }
                }
              }
            }
          });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            filterMenuInit:function(e){
              if(e.field === "Category"){
                $(e.container).find('[type="reset"]').click(function(event) {
                  var filters = e.sender.dataSource.filter().filters;
                  for (let i = 0; i < filters.length; i++) {
                    if (filters[i].field == "Category.CategoryID") {
                      filters.splice(i, 1);
                      e.sender.dataSource.filter(filters);
                    }
                  }
                })
              }
            },
            pageable: true,
            filterable: {
              extra: false
            },
            filter:function(e){
              if(e.field == "Category" && e.filter !== null){
                var currentFilter = [];
                var filtersCount = e.filter.filters[0].length;
                var value = e.filter.filters[0].value;
                if(e.sender.dataSource.filter() !== undefined && e.sender.dataSource.filter() !== null) {
                  currentFilter = e.sender.dataSource.filter().filters; // Retain the other filters
                }
                for (let i = 0; i < currentFilter.length; i++) { 
                  if (currentFilter[i].field == "Category.CategoryID"){
                    currentFilter.splice(i, 1);
                  }
                }
                currentFilter.push({field:"Category.CategoryID", operator:"eq", value:value});
                e.preventDefault();
                e.sender.dataSource.filter(currentFilter);
                $("th[data-field='Category']").find('a').addClass("k-active");
                $("[data-filter-field='Category']").data("kendoDropDownList").value(value);
              }
              else if (e.sender.dataSource.filter()){
                var filters = e.sender.dataSource.filter().filters;
                if (filters) {
                  for (let i = 0; i < filters.length; i++) {
                    if (filters[i].field == "Category.CategoryID") {
                      setTimeout(function() {
                        $("th[data-field='Category']").find('a').addClass("k-active");
                        $("[data-filter-field='Category']").data("kendoDropDownList").value(value);
                      })
                    }
                  }
                }
              }
            },
            height: 550,
            toolbar: ["create"],
            columns: [
              { field:"ProductName",title:"Product Name" },
              { field: "Category", title: "Category", width: "180px", editor: categoryDropDownEditor, template: "#=Category.CategoryName#", filterable: {ui:categoryFilter} },
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
            optionLabel:{ CategoryID: 0, CategoryName: "Select Category..."},
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

        function categoryFilter(element){
          element.kendoDropDownList({
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
              }
            },
            optionLabel: "--Select Value--"
          });
          element.attr("data-filter-field", "Category");
        }
      </script>
    </div>
```
