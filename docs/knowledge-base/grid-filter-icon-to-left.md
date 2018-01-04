---
title: Moving Kendo UI Grid Filter Icon To Left
description: Displaying filter icon at most left position in the Grid header
type: how-to
page_title: How To Display Filter Icon Before the Title in the Grid Header
slug: grid-filter-icon-to-left
position: 
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
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>


## Description
When I tab through the application, the filter icon in the headers is focused before the header title, although that it is visually displayed before it. I want to display the filter icon before the title.

## Solution
Due to the way that the filter icon is positioned in the header, it receives the focus before the title, because it is actually rendered first in the DOM. However, we can easily change the position with the following CSS:

	<style>
	  .k-grid-header .k-grid-filter, .k-grid-header .k-header-column-menu{
		margin-left: -5px!important;
		margin-right: 0!important;
		
	  }
	  
	  .k-grid-header .k-grid-filter, .k-grid-header .k-header-column-menu{
		float: left!important;
	  }
	</style>

	
#### Example
````html
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
````
