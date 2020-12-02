---
title: Search Panel with Multiple Values
description: How to Filter Grid with Multiple Values
type: how-to
page_title: How to Filter Grid with Multiple Values and a Single TextBox | Kendo UI Grid for jQuery
slug: grid-search-panel-with-multiple-values
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

This sample demonstrates how you can use multiple values in the built-in Search Panel of the Grid, achieving multi-column and multi-value filtering with a single textbox input.

The separation logic of the different values can be controlled the following variable:

`var separator = ",";`

## Solution

```dojo
  
    <div id="grid"></div>
    <script>

      kendo.ui.Grid.fn._toolbarOrg = kendo.ui.Grid.fn._toolbar;
      kendo.ui.Grid.fn._toolbar = function(){
        this._toolbarOrg();

        var that = this;
        var container = this.wrapper.find(".k-grid-toolbar");
        container.off("input",".k-grid-search input").on("input",".k-grid-search input",function(e) {

          var input = e.currentTarget;
          clearTimeout(that._searchTimeOut);
          that._searchTimeOut = setTimeout(function () {
            that._searchTimeOut = null;
            var options = that.options;
            var searchFields = options.search ? options.search.fields : null;
            var expression = { filters:[], logic:"or" };
            var separator = ",";
            var values = input.value.split(separator);

            if (!searchFields) {
              searchFields = getColumnsFields(options.columns);
            }

            if (that.dataSource.options.endless) {
              that.dataSource.options.endless = null;
              that._endlessPageSize = that.dataSource.options.pageSize;
            }

            if (values.length) {
              for (var i = 0; i < searchFields.length; i++) {

                for (var k = 0; k < searchFields.length; k++) {
                  if(values[k] && values[k].trim()){
                    expression.filters.push({ field: searchFields[i], operator: "contains", value: values[k].trim() });
                  }
                }
              }
            } else {
              expression = {};
            }

            that.dataSource.filter(expression);

          }, 300);
        });
      };

      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" },
          { field: "country"}
        ],
        dataSource: [ { name: "Jane", age: 30, country: "Germany" }, { name: "John", age: 33, country: "Germany" }],
        toolbar:["search"],
        search: {
          fields: ["name", "age", "country"] // Or, specify multiple fields by adding them to the array, e.g ["name", "age"]
        }
      });
    </script>

``` 
