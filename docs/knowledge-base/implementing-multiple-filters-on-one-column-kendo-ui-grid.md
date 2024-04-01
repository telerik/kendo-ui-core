---
title: Implementing Default and CheckBox Filters on One Column
description: Learn how to implement both a standard filter and a multi-filter on a column in Kendo UI Grid.
type: how-to
page_title: Implementing Multiple Filters on One Column - Kendo UI Grid | Kendo UI for jQuery
slug: implementing-multiple-filters-on-one-column-kendo-ui-grid
tags: kendo ui, grid, filter, multiple filters, string filter, multi-filter
res_type: kb
---

## Environment
| Product | Progress Kendo UI |
| ------- | ----------------- |
| Version | 2024.1.319       |

## Description

I need to have both the standard filter and the Multi CheckBox filter in the Grid filter popup. How can I achieve that?

## Solution
To implement both a standard filter and a multi-filter on a column in Kendo UI Grid, follow these steps:

1. Subscribe to the [filterMenuInit](/api/javascript/ui/grid/events/filtermenuinit) event of the Grid to apply custom filter logic.
2. Specify the column(s) with a custom filter menu.
3. Insert the checkbox menu after the filter menu buttons as an HTML element with a specified `dataSource` and [template](/api/javascript/ui/listview/configuration/template).
4. Bind an event handler to the click event of the "Filter" menu button and implement the custom filter logic.

```dojo
<div id="grid"></div>

        <script>
            $(document).ready(function () {
            var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
                dataSource = new kendo.data.DataSource({
                    transport: {
                    read: {
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
                    parameterMap: function (options, operation) {
                        if (operation !== "read" && options.models) {
                        return { models: kendo.stringify(options.models) };
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
                        ProductName: { validation: { required: true} },
                        UnitPrice: { type: "number", validation: { required: true, min: 1} },
                        Discontinued: { type: "boolean" },
                        UnitsInStock: { type: "number", validation: { min: 0, required: true} }
                        }
                    }
                    }
                });

            $("#grid").kendoGrid({
                dataSource: dataSource,
                pageable: true,
                height: 550,
                toolbar: ["create"],
                columns: [
                { field: "ProductName", title: "Product Name", width: "120px"},
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
                { field: "UnitsInStock", title: "Units In Stock", width: "120px" },
                { field: "Discontinued", width: "120px" },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "200px"}],
                editable: "inline",
                filterable: {extra: false},
                filterMenuInit: onFilterMenuInit
            });
            });

            function onFilterMenuInit(e) {
            if (e.field == "ProductName") {
                initCheckboxFilter.call(this, e);
            }
            }

            function initCheckboxFilter(e) {
            	var popup = e.container.data("kendoPopup");
            	var dataSource = this.dataSource;
            	var field = e.field;
            	var checkboxesDataSource = new kendo.data.DataSource({
                data: uniqueForField(dataSource.data(), field)
            	});

            	var element = $("<div class='checkbox-ontainer'></div>").insertBefore(".k-actions").kendoListView({
                dataSource: checkboxesDataSource,
                template: "<div><input type='checkbox' value='#:" + field + "#'/>#:" + field + "#</div>"
            	});
            	e.container.find("[type='submit']").click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                var filter = dataSource.filter() || { logic: "and", filters: [] };
                var fieldFilters = $.map(element.find(":checkbox:checked"), function (input) {            
                	return {
                    field: field,
                    operator: "eq",
                    value: input.value
                	};
                });
              

                var filterOperator1 = $('[data-bind="value: filters[0].operator"]').val();
                var inputBox1 = $('[data-bind="value:filters[0].value"]').val();
                var filterOperator2 = $('[data-bind="value: filters[1].operator"]').val();
                var inputBox2 = $('[data-bind="value: filters[1].value"]').val();
              
                if(filterOperator1 && inputBox1) {
                  fieldFilters.push({field: field, operator: filterOperator1, value: inputBox1});
                }
              
                if(filterOperator2 && inputBox2) {
                  fieldFilters.push({field: field, operator: filterOperator2, value: inputBox2});
                }
              
                if (fieldFilters.length) {
                	removeFiltersForField(filter, field);
                	filter.filters.push(
                  	{
                    	logic: "or",
                    	filters: fieldFilters
                  	});
                	console.log(filter);  
                	dataSource.filter(filter);
                }
                popup.close();
              });
            }

            function removeFiltersForField(expression, field) {
            	if (expression.filters) {
                expression.filters = $.grep(expression.filters, function (filter) { 
                	removeFiltersForField(filter, field);
                	if (filter.filters) {
                    return filter.filters.length;
                	} else {
                    return filter.field != field;
                  }
                });
            	}
            }

            function uniqueForField(data, field) {
            	var map = {};
            	var result = [];
            	var item;
            	for (var i = 0; i < data.length; i++) {
                item = data[i];
                if (!map[item[field]]) {
                	result.push(item.toJSON());
                	map[item[field]] = true;
                }
            	}
            	return result;
            }
        </script>
        <style type="text/css">
            .checkbox-ontainer
            {
            max-height: 200px;
            overflow:auto;
            }
        </style>
```

## See Also
- [Kendo UI Grid Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
