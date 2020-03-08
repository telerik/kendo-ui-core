---
title: Move Filter Icons in the Grid to the Left
description: An example on how to display the filter icon in the leftmost position of the Kendo UI Grid header.
type: how-to
page_title: Display Filter Icon before the Title in the Header | Kendo UI Grid for jQuery
slug: grid-filter-icon-to-left
previous_url: /knowledge-base/grid_filter_icon_to_left
tags: Grid, Filter icon, Left position
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2017.2 621</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Grid</td>
	</tr>
</table>


## Description

When I tab through the application, the filter icon in the Grid headers is focused before the header title although the header title is visually displayed before the filter icon.

How can I display the Grid filter icon before the title?

## Solution

Due to the way the filter icon is positioned in the header, the filter icon receives the focus before the title because it is rendered in the DOM before the title. To change the position of the filter icon, use CSS.

```dojo
	<style>
	  .k-grid-header .k-grid-filter, .k-grid-header .k-header-column-menu{
		margin-left: -5px!important;
		margin-right: 0!important;

	  }

	  .k-grid-header .k-grid-filter, .k-grid-header .k-header-column-menu{
		float: left!important;
	  }
	</style>
```

The following example demonstrates the full implementation of the suggested approach.

```dojo
<base href="https://demos.telerik.com/kendo-ui/grid/local-data-binding">
  <style>
      .k-grid-header .k-grid-filter, .k-grid-header .k-header-column-menu{
        margin-left: -5px!important;
        margin-right: 0!important;

      }

      .k-grid-header .k-grid-filter, .k-grid-header .k-header-column-menu{
        float: left!important;
      }
    </style>

        <script src="../content/shared/js/people.js"></script>
        <div id="example">
        <div id="grid"></div>

            <script>
                $(document).ready(function() {
                    $("#grid").kendoGrid({
                      sortable: true,
                        dataSource: {
                            data: createRandomData(50),
                            schema: {
                                model: {
                                    fields: {
                                        City: { type: "string" },
                                        Title: { type: "string" },
                                        BirthDate: { type: "date" }
                                    }
                                }
                            },
                            pageSize: 15
                        },
                        height: 550,
                        scrollable: true,
                        filterable: {
                            extra: false,
                            operators: {
                                string: {
                                    startswith: "Starts with",
                                    eq: "Is equal to",
                                    neq: "Is not equal to"
                                }
                            }
                        },
                        pageable: true,
                        columns: [
                            {
                                title: "Name",
                                width: 160,
                                filterable: false,
                                template: "#=FirstName# #=LastName#"
                            },
                            {
                                field: "City",
                                width: 130,
                                filterable: {
                                    ui: cityFilter
                               }
                            },
                            {
                                field: "Title",
                                filterable: {
                                    ui: titleFilter
                                }
                            },
                            {
                                field: "BirthDate",
                                title: "Birth Date",
                                format: "{0:MM/dd/yyyy HH:mm tt}",
                                filterable: {
                                    ui: "datetimepicker"
                                }
                            }
                       ]
                    });
                });

                function titleFilter(element) {
                    element.kendoAutoComplete({
                        dataSource: titles
                    });
                }

                function cityFilter(element) {
                    element.kendoDropDownList({
                        dataSource: cities,
                        optionLabel: "--Select Value--"
                    });
                }

            </script>
        </div>
```
